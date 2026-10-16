import React, { useState } from 'react';
import { CaseData } from '../types/evidence';
import { X, Upload, FileText, CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface CaseUploadModalProps {
  onClose: () => void;
  onCaseAdded: (newCase: CaseData) => void;
}

export const CaseUploadModal: React.FC<CaseUploadModalProps> = ({ onClose, onCaseAdded }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Gurdaspur Border Sector, Punjab');
  const [rawText, setRawText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepMessage, setStepMessage] = useState('');

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
    setTitle(p.title);
    setLocation(p.location);
    setRawText(p.text);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setRawText(content);
    };
    reader.readAsText(file);
  };

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setIsProcessing(true);
    setStepMessage('Parsing document headers & entity references...');

    try {
      // Step simulation for high-fidelity extraction UX
      setTimeout(() => setStepMessage('Identifying victims, commanding officers & tout intermediaries...'), 500);
      setTimeout(() => setStepMessage('Detecting encounter locations & unrecorded detention sites...'), 1100);
      setTimeout(() => setStepMessage('Generating cryptographically linked DAG entity nodes...'), 1600);

      // Call extraction endpoint
      const res = await fetch('/api/extract-entities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: rawText,
          title: title || 'Extracted Disappearance Dossier',
          location: location || 'Punjab Border Belt',
        }),
      });

      if (!res.ok) {
        throw new Error('Extraction failed');
      }

      const data = await res.json();
      setTimeout(() => {
        setIsProcessing(false);
        onCaseAdded(data.case);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
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
                  <span>Choose .txt / .md / .json</span>
                  <input
                    type="file"
                    accept=".txt,.md,.json,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <textarea
                rows={7}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste witness statements, REDCap dump, or field transcripts here..."
                className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono leading-relaxed"
                required
              />
            </div>

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
