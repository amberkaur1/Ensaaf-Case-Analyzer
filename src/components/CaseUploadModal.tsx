import React, { useState } from 'react';
import { CaseData } from '../types/evidence';
import { X, Upload, FileText, CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import mammoth from 'mammoth';
import { extractCaseFromRawFiles, RawUploadedFile } from '../services/caseExtractor';

interface CaseUploadModalProps {
  onClose: () => void;
  onCaseAdded: (newCase: CaseData) => void;
}

export const CaseUploadModal: React.FC<CaseUploadModalProps> = ({ onClose, onCaseAdded }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Gurdaspur Border Sector, Punjab');
  const [rawText, setRawText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<RawUploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepMessage, setStepMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const PRESETS = [
    {
      title: 'Rajasthan-Punjab Border Transit Disappearance (1992)',
      location: 'Abohar-Ganganagar Border, Punjab/Rajasthan',
      text: `DEPOSITION RECORD & FIELD INTERVIEW NOTES:
Subject: Gurdev Singh (Age 29), resident of Village Balluana.
On 18th May 1992, Gurdev Singh was intercepted at an interstate border checkpoint near Abohar while traveling on a state transport bus. Two plainclothes officers identified as Inspector Sukhdev Singh and SI Gurcharan Singh from Ferozepur CIA forced him off the bus without executing arrest papers.

Witness Statements: Co-passenger Surjit Singh testified that Gurdev Singh was handcuffed and transferred into an unmarked police jeep. When relatives approached the local police post, police officials denied having him in custody. However, a local tout demanded ₹75,000 for his safe release. The family paid ₹30,000, but on 12th July 1992, police published a report claiming Gurdev Singh was killed in an armed encounter near the Indira Gandhi canal feeder in Rajasthan territory while attempting to cross into Pakistan. The body was disposed of without family identification.`
    },
    {
      title: 'Gurdaspur Cordon & Rural Custodial Cluster (1991)',
      location: 'Dera Baba Nanak & Kalanaur, Gurdaspur',
      text: `HUMAN RIGHTS FACT-FINDING REPORT:
Victim: Jasbir Singh (Age 23) and Tarsem Singh (Age 26).
Date of Interception: 14 October 1991.
During a joint pre-dawn cordon and search operation conducted by Punjab Police Special Staff and CRPF units in village Hardochhanni, Jasbir Singh was arrested from his house. No search warrant was shown. 
Custody: Jasbir was transported to Kalanaur police station and later to Batala CIA Staff. Deponents confirmed hearing torture cries. Extortion of ₹50,000 was negotiated via local sarpanch. On 28 October 1991, both youths were reported to have escaped from custody while guiding police to an alleged underground arms dump along the Ravi riverbank. Municipal workers subsequently confirmed two unidentified bodies were cremated at Batala.`
    }
  ];

  const handleSelectPreset = (p: typeof PRESETS[0]) => {
    setError(null);
    setTitle(p.title);
    setLocation(p.location);
    setRawText(p.text);
    setUploadedFiles([{ filename: `${p.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`, text: p.text }]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    const newFiles: RawUploadedFile[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.name.toLowerCase().endsWith('.docx')) {
          const arrayBuffer = await file.arrayBuffer();
          const mammothResult = await mammoth.extractRawText({ arrayBuffer });
          newFiles.push({
            filename: file.name,
            text: mammothResult.value,
          });
        } else {
          // Read .txt, .md, .json, .csv with UTF-8 to preserve Gurmukhi Punjabi characters
          const text = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve((event.target?.result as string) || '');
            reader.onerror = (err) => reject(err);
            reader.readAsText(file, 'UTF-8');
          });
          newFiles.push({
            filename: file.name,
            text,
          });
        }
      }

      setUploadedFiles((prev) => [...prev, ...newFiles]);

      if (!title && newFiles.length > 0) {
        setTitle(newFiles[0].filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }

      // Populate textarea preview
      if (newFiles.length === 1) {
        setRawText(newFiles[0].text);
      } else if (newFiles.length > 1) {
        setRawText((prev) => (prev ? prev + '\n\n' : '') + newFiles.map((f) => `--- ${f.filename} ---\n${f.text}`).join('\n\n'));
      }
    } catch (err: any) {
      console.error('File read error:', err);
      setError(`Failed to read uploaded file(s): ${err?.message || 'Unknown error'}`);
    }
  };

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Determine raw files to pass to extractor
    let filesToProcess: RawUploadedFile[] = [...uploadedFiles];
    if (filesToProcess.length === 0) {
      if (!rawText.trim()) return;
      filesToProcess = [
        {
          filename: `${title ? title.replace(/[^a-zA-Z0-9]/g, '_') : 'case-dossier'}.txt`,
          text: rawText.trim(),
        },
      ];
    } else if (filesToProcess.length === 1 && rawText.trim() && rawText.trim() !== filesToProcess[0].text) {
      filesToProcess[0].text = rawText.trim();
    }

    setIsProcessing(true);
    setStepMessage('Reading raw files, resolving entities & anchoring verbatim provenance...');

    try {
      const extractedCase = await extractCaseFromRawFiles(filesToProcess);

      // Preserve any manual user override of title or location
      if (title.trim()) {
        extractedCase.title = title.trim();
      }
      if (location.trim() && (!extractedCase.primaryLocation || extractedCase.primaryLocation === 'Not stated in source documents')) {
        extractedCase.primaryLocation = location.trim();
      }

      onCaseAdded(extractedCase);
      onClose();
    } catch (err: any) {
      console.error('Extraction error:', err);
      setError(err?.message || 'Extraction failed. Please verify source documents and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Ingest Case Dossier or REDCap Dump
              </h3>
              <p className="text-xs text-slate-300">
                Automated multi-entity extraction with DAG graph generation and provenance citation mapping.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Presets Chips */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Quick Test Dossier Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectPreset(p)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 border border-slate-200 hover:border-amber-300 rounded-lg text-xs font-medium transition-colors text-left"
                >
                  <Sparkles className="w-3 h-3 inline mr-1 text-amber-600" />
                  {p.title.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleProcess} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Case Cluster Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Abohar Border Transit Disappearance (1992)"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Location / District
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Abohar, Ferozepur / Rajasthan Border"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
            </div>

            {/* File Drag/Drop or Paste */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Raw Transcript / REDCap Profile / Police Dossier Text
                </label>
                <label className="cursor-pointer text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Choose .txt / .md / .json / .docx</span>
                  <input
                    type="file"
                    accept=".txt,.md,.json,.csv,.docx"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {uploadedFiles.map((f, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-mono rounded border border-slate-200 flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3 text-amber-600" />
                      {f.filename}
                    </span>
                  ))}
                </div>
              )}

              <textarea
                rows={7}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste witness statements, REDCap dump, or field transcripts here..."
                className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono leading-relaxed"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold block">Extraction Notice:</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-2 animate-pulse">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                  <span>Extracting Entities & Provenance Structure...</span>
                </div>
                <p className="text-xs text-amber-800 font-mono">{stepMessage}</p>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing || !rawText.trim()}
                className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 rounded-md shadow-xs flex items-center gap-2 transition-colors"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Process & Add to Graph</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
