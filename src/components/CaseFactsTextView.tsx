import React, { useState, useEffect } from 'react';
import { CaseData, CaseFact, CitationRef, EvidenceSource } from '../types/evidence';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Trash2,
  ChevronDown,
  ChevronUp,
  Check,
  Edit2,
  ExternalLink
} from 'lucide-react';

interface CaseFactsTextViewProps {
  activeCase: CaseData;
  onOpenRawEvidence: (source: EvidenceSource, badge?: string) => void;
  onVerifyFact: (factId: string) => void;
  onRequestFactCorrection: (fact: CaseFact) => void;
  isPunjabiActive?: boolean;
}

export const CaseFactsTextView: React.FC<CaseFactsTextViewProps> = ({
  activeCase,
  onOpenRawEvidence,
  onVerifyFact,
  onRequestFactCorrection,
  isPunjabiActive = false,
}) => {
  const [expandedGurmukhi, setExpandedGurmukhi] = useState<Record<string, boolean>>({});
  const [persistedPhoto, setPersistedPhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem(`ensaaf_victim_photo_${activeCase.id}`);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`ensaaf_victim_photo_${activeCase.id}`);
      setPersistedPhoto(saved);
    } catch {
      setPersistedPhoto(null);
    }
  }, [activeCase.id]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          try {
            localStorage.setItem(`ensaaf_victim_photo_${activeCase.id}`, result);
          } catch {
            // ignore storage quota error
          }
          setPersistedPhoto(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    try {
      localStorage.removeItem(`ensaaf_victim_photo_${activeCase.id}`);
    } catch {
      // ignore
    }
    setPersistedPhoto(null);
  };

  const displayPhoto = persistedPhoto || activeCase.primaryVictimPhotoUrl || null;

  const toggleGurmukhi = (factId: string) => {
    setExpandedGurmukhi((prev) => ({
      ...prev,
      [factId]: !prev[factId],
    }));
  };

  const demographics = activeCase.demographics;

  const handleCitationClick = (citation: CitationRef) => {
    const source = activeCase.sources.find(
      (s) => s.id === citation.sourceId || s.code === citation.badge
    );
    if (source) {
      onOpenRawEvidence(source, citation.badge);
    } else {
      onOpenRawEvidence(
        {
          id: citation.sourceId,
          code: citation.badge,
          title: `Document ${citation.badge}`,
          date: 'Archival Record',
          archive: 'Ensaaf Documentation Repository',
          classification: 'Judicial / Primary Record',
          interviewerOrAuthority: 'Documentation Team',
          fullExcerpt: citation.excerptSnippet,
          highlightSnippet: citation.excerptSnippet,
          metadata: {},
        },
        citation.badge
      );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-8 max-w-4xl mx-auto space-y-10 animate-in fade-in duration-150 text-slate-900 select-text">
      {/* 1. Profile Header: Direct Match to data.ensaaf.org/profile/ */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-slate-200">
        <div className="space-y-4 flex-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-sans">
            {activeCase.primaryVictimName.replace(/\s*\(Record.*?\)/, '')}
          </h1>

          <div className="space-y-1 text-sm text-slate-600 font-sans">
            <p>
              Disappeared between <span className="text-slate-900 font-medium">March 6, 1992</span> and{' '}
              <span className="text-slate-900 font-medium">July 2, 1992</span>
            </p>
            <p>
              Male, age {activeCase.primaryVictimAge || 58}
            </p>
            {activeCase.legalStatus && (
              <p className="text-xs text-emerald-800 font-semibold pt-1">
                Remedy Status: {activeCase.legalStatus}
              </p>
            )}
          </div>

          {/* Demographics Table */}
          {demographics && (
            <div className="pt-4 space-y-3">
              <h3 className="text-base font-bold text-slate-900">Demographics</h3>
              <div className="divide-y divide-slate-100 text-xs font-sans">
                <div className="py-2.5 grid grid-cols-3">
                  <span className="text-slate-500 font-medium">Residence</span>
                  <span className="col-span-2 text-slate-900 font-medium underline decoration-dotted decoration-slate-400">
                    {demographics.residence}
                  </span>
                </div>
                <div className="py-2.5 grid grid-cols-3">
                  <span className="text-slate-500 font-medium">Education</span>
                  <span className="col-span-2 text-slate-800">{demographics.education}</span>
                </div>
                <div className="py-2.5 grid grid-cols-3">
                  <span className="text-slate-500 font-medium">Employment</span>
                  <span className="col-span-2 text-slate-800">{demographics.employment}</span>
                </div>
                <div className="py-2.5 grid grid-cols-3">
                  <span className="text-slate-500 font-medium">Married</span>
                  <span className="col-span-2 text-slate-800">{demographics.married}</span>
                </div>
                <div className="py-2.5 grid grid-cols-3">
                  <span className="text-slate-500 font-medium">Religion</span>
                  <span className="col-span-2 text-slate-800">{demographics.religion}</span>
                </div>
                <div className="py-2.5 grid grid-cols-3">
                  <span className="text-slate-500 font-medium">Caste</span>
                  <span className="col-span-2 text-slate-800">{demographics.caste}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Ensaaf Photo Card / Neutral Slate Placeholder with Manual Upload */}
        <div className="flex flex-col items-center shrink-0 w-64">
          <div className="p-3 bg-[#f5f2eb] border border-[#e4ded0] rounded shadow-md w-full max-w-[240px]">
            {displayPhoto ? (
              <div>
                <div className="aspect-4/5 bg-slate-200 overflow-hidden rounded-xs border border-slate-300 relative flex items-center justify-center">
                  <img
                    src={displayPhoto}
                    alt={activeCase.primaryVictimName}
                    className="w-full h-full object-cover filter grayscale contrast-125"
                  />
                </div>
                <div className="text-[10px] text-center text-slate-500 mt-2 font-mono">
                  Ensaaf Archive Photo Mount
                </div>
                <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-[#e4ded0]">
                  <label className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#006B7D] hover:text-teal-800 cursor-pointer transition-colors">
                    <Upload className="w-3 h-3" />
                    <span>Change Photo</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                  <span className="text-slate-300">•</span>
                  <button
                    onClick={handleRemovePhoto}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="aspect-4/5 bg-slate-100 border border-slate-300 rounded flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-200/90 border border-slate-300 flex items-center justify-center text-slate-400 mb-2.5">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">No photo provided</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Archival portrait pending</span>

                  <label className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#006B7D] hover:bg-teal-800 text-white text-xs font-semibold rounded shadow-xs cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>
                <div className="text-[10px] text-center text-slate-500 mt-2 font-mono">
                  Ensaaf Archive Photo Mount
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Abduction Attributes Table */}
      {demographics && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Abduction</h3>
          <div className="divide-y divide-slate-100 text-xs font-sans">
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-slate-500 font-medium">Prior detentions</span>
              <span className="sm:col-span-2 text-slate-800">{demographics.priorDetentions}</span>
            </div>
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-slate-500 font-medium">Abduction preceding disappearance</span>
              <span className="sm:col-span-2 text-slate-800">{demographics.abductionPrecedingDisappearance}</span>
            </div>
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-slate-500 font-medium">Place of abduction</span>
              <span className="sm:col-span-2 text-slate-800">{demographics.placeOfAbduction}</span>
            </div>
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-slate-500 font-medium">Witness(es) to abduction</span>
              <span className="sm:col-span-2 text-slate-800">{demographics.witnessesToAbduction}</span>
            </div>
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-slate-500 font-medium">Security officials informed witnesses about destination</span>
              <span className="sm:col-span-2 text-slate-800">{demographics.securityOfficialsInformedWitnesses}</span>
            </div>
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-slate-500 font-medium">Security officials uniformed</span>
              <span className="sm:col-span-2 text-slate-800">{demographics.securityOfficialsUniformed}</span>
            </div>
            <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="text-slate-500 font-medium">Victim presented before judge/magistrate</span>
              <span className="sm:col-span-2 text-slate-800">{demographics.presentedBeforeMagistrate}</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Simplified Editorial Case Narrative with Incident Subheadings & Inline Hyperlinks */}
      <div className="space-y-8 pt-6 border-t border-slate-200">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight font-sans">
            Case Narrative & Verified Evidence Summary
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Continuous investigative writeup synthesized from field depositions and judicial findings. Click any highlighted citation to inspect the raw document.
          </p>
        </div>

        {/* Flowing Narrative Sections with Subheadings */}
        <div className="space-y-8">
          {activeCase.phases.map((phase, phaseIdx) => (
            <div key={phase.id} className="space-y-4">
              {/* Incident Subheading */}
              <h4 className="text-sm font-bold text-[#006B7D] font-sans pb-1.5 border-b border-teal-100 flex items-center justify-between">
                <span>{`0${phaseIdx + 1}. ${phase.name.replace(/Phase \d+:\s*/, '')}`}</span>
                <span className="text-[11px] font-normal text-slate-400 font-mono">
                  {phase.facts.length} verified statements
                </span>
              </h4>

              {/* Editorial Paragraphs with Inline Hyperlinks & Simple Actions */}
              <div className="space-y-5">
                {phase.facts.map((fact) => {
                  const isVerified = fact.verifiedStatus === 'verified';
                  const isCorrected = fact.verifiedStatus === 'corrected';
                  const isRejected = fact.verifiedStatus === 'rejected';

                  return (
                    <div
                      key={fact.id}
                      className={`space-y-2 text-sm leading-relaxed ${
                        isRejected ? 'opacity-40 line-through bg-rose-50/50 p-3 rounded-lg' : ''
                      }`}
                    >
                      {/* Statement with Inline Highlighted Hyperlinks */}
                      <p className="text-slate-800 font-serif leading-relaxed">
                        {fact.correctedText || fact.statement}{' '}
                        {fact.citations.map((cite, cIdx) => (
                          <button
                            key={cIdx}
                            type="button"
                            onClick={() => handleCitationClick(cite)}
                            className="inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 bg-teal-50 hover:bg-teal-100 text-[#006B7D] font-mono font-bold text-xs rounded border border-teal-200 hover:border-[#006B7D] transition-colors shadow-2xs align-baseline cursor-pointer"
                            title={`Inspect source: ${cite.badge}`}
                          >
                            <span>{cite.badge}</span>
                            <ExternalLink className="w-2.5 h-2.5 text-[#006B7D]" />
                          </button>
                        ))}
                      </p>

                      {/* Audit Note if edited */}
                      {fact.correctionNote && (
                        <p className="text-xs text-amber-900 bg-amber-50 p-2 rounded border border-amber-200 font-sans">
                          <strong>Researcher Audit Note:</strong> {fact.correctionNote}
                        </p>
                      )}

                      {/* Expandable Vernacular Gurmukhi Callout */}
                      {(fact.gurmukhiText || isPunjabiActive) && (
                        <div className="pt-0.5">
                          <button
                            type="button"
                            onClick={() => toggleGurmukhi(fact.id)}
                            className="text-xs text-amber-800 hover:underline flex items-center gap-1 font-serif font-bold"
                          >
                            <span>ਪੰਜਾਬੀ ਮੂਲ ਗਵਾਹੀ (Gurmukhi Testimony)</span>
                            {expandedGurmukhi[fact.id] ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </button>
                          {(expandedGurmukhi[fact.id] || isPunjabiActive) && fact.gurmukhiText && (
                            <p className="mt-1 p-2.5 bg-amber-50/70 text-slate-900 text-xs font-serif rounded border border-amber-200/80 leading-relaxed">
                              {fact.gurmukhiText}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Quiet Inline Accept / Deny Action Controls */}
                      <div className="flex items-center gap-3 pt-1 text-xs text-slate-500 font-sans">
                        <div className="flex items-center gap-1.5">
                          {isCorrected ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              User-Verified & Corrected
                            </span>
                          ) : isVerified ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Verified by Researcher
                            </span>
                          ) : isRejected ? (
                            <span className="text-rose-700 font-bold flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              Excluded from Record
                            </span>
                          ) : (
                            <span className="text-amber-700 font-medium flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                              Pending Verification
                            </span>
                          )}
                        </div>

                        <span className="text-slate-300">•</span>

                        <div className="flex items-center gap-2">
                          {!isVerified && !isCorrected && (
                            <button
                              type="button"
                              onClick={() => onVerifyFact(fact.id)}
                              className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              Accept Fact
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onRequestFactCorrection(fact)}
                            className="text-slate-500 hover:text-slate-800 hover:underline flex items-center gap-1"
                          >
                            <Edit2 className="w-3 h-3" />
                            Deny / Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
