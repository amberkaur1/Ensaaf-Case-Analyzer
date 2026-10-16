import React, { useState } from 'react';
import { CaseData, CaseFact, CasePhase, CitationRef, EvidenceSource } from '../types/evidence';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  UserX,
  ShieldAlert,
  Skull,
  Scale,
  Check,
  Edit2,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface CaseSummaryTabProps {
  activeCase: CaseData;
  onOpenRawEvidence: (source: EvidenceSource, badge?: string) => void;
  onVerifyFact: (factId: string) => void;
  onRequestFactCorrection: (fact: CaseFact) => void;
}

export const CaseSummaryTab: React.FC<CaseSummaryTabProps> = ({
  activeCase,
  onOpenRawEvidence,
  onVerifyFact,
  onRequestFactCorrection,
}) => {
  // State for tracking which Gurmukhi translations are expanded
  const [expandedGurmukhi, setExpandedGurmukhi] = useState<Record<string, boolean>>({});

  const toggleGurmukhi = (factId: string) => {
    setExpandedGurmukhi((prev) => ({
      ...prev,
      [factId]: !prev[factId],
    }));
  };

  const getPhaseIcon = (phaseId: string) => {
    switch (phaseId) {
      case 'abduction':
        return <UserX className="w-5 h-5 text-amber-500" />;
      case 'detention_extortion':
        return <ShieldAlert className="w-5 h-5 text-orange-500" />;
      case 'killing_disappearance':
        return <Skull className="w-5 h-5 text-rose-500" />;
      case 'legal_proceedings':
        return <Scale className="w-5 h-5 text-emerald-500" />;
      default:
        return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  const handleCitationClick = (citation: CitationRef) => {
    const source = activeCase.sources.find((s) => s.id === citation.sourceId || s.code === citation.badge);
    if (source) {
      onOpenRawEvidence(source, citation.badge);
    } else {
      // Fallback: create virtual source from snippet
      onOpenRawEvidence({
        id: citation.sourceId,
        code: citation.badge,
        title: `Document ${citation.badge}`,
        date: 'Archival Record',
        archive: 'Punjab Human Rights Documentation Repository',
        classification: 'Judicial / Field Evidence Record',
        interviewerOrAuthority: 'Documentation Authority',
        fullExcerpt: citation.excerptSnippet,
        highlightSnippet: citation.excerptSnippet,
        metadata: {}
      }, citation.badge);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Case Header Hero Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold rounded-full font-mono">
              CASE RECORD DOSSIER
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {activeCase.legalStatus}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                {activeCase.title}
              </h2>
              <p className="text-sm text-slate-300 mt-1 flex items-center gap-4 flex-wrap">
                <span className="font-semibold text-amber-200">
                  Primary Victim: {activeCase.primaryVictimName}
                </span>
                <span className="text-slate-400">•</span>
                <span>Location: {activeCase.primaryLocation}</span>
                <span className="text-slate-400">•</span>
                <span>Period: {activeCase.incidentPeriod}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-lg text-center">
                <span className="text-xl font-bold text-amber-400 block">{activeCase.victimCount}</span>
                <span className="text-[11px] text-slate-400 uppercase font-medium">Linked Victims</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-lg text-center">
                <span className="text-xl font-bold text-emerald-400 block">{activeCase.sources.length}</span>
                <span className="text-[11px] text-slate-400 uppercase font-medium">Primary Sources</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-serif border-t border-slate-800 pt-3">
            {activeCase.summary}
          </p>

          {/* Linked Victims Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Victim Profiles:</span>
            {activeCase.victims.map((v) => (
              <span
                key={v.id}
                className="px-2.5 py-1 bg-slate-800/90 text-slate-200 border border-slate-700 rounded-md text-xs font-medium flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="font-bold">{v.name}</span>
                {v.recordId && <span className="text-[10px] text-slate-400 font-mono">({v.recordId})</span>}
                <span className="text-[11px] text-amber-300 font-serif">({v.gurmukhi})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Chronological Summary Workflow: Key Phases */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Scale className="w-5 h-5 text-slate-700" />
              Chronological Fact Breakdown & Judicial Provenance
            </h3>
            <p className="text-xs text-slate-500">
              Every fact is linked to primary affidavits, survivor field notes, or CBI trial judgments.
            </p>
          </div>
          <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Verification Mode: Click citations to open raw document excerpts</span>
          </div>
        </div>

        {/* Phases Container */}
        <div className="space-y-6">
          {activeCase.phases.map((phase) => (
            <div
              key={phase.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow"
            >
              {/* Phase Header */}
              <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    {getPhaseIcon(phase.id)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{phase.name}</h4>
                    <p className="text-xs text-slate-500">{phase.description}</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-medium text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200">
                  {phase.facts.length} Verified Assertions
                </span>
              </div>

              {/* Facts List */}
              <div className="divide-y divide-slate-100 p-6 space-y-4">
                {phase.facts.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">
                    No active facts recorded in this phase (or all facts have been removed by researcher review).
                  </p>
                ) : (
                  phase.facts.map((fact) => {
                    const isRejected = fact.verifiedStatus === 'rejected';
                    const isCorrected = fact.verifiedStatus === 'corrected';
                    const isVerified = fact.verifiedStatus === 'verified';

                    return (
                      <div
                        key={fact.id}
                        className={`pt-4 first:pt-0 transition-all ${
                          isRejected ? 'opacity-40 line-through bg-rose-50/30 p-3 rounded-lg' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          {/* Fact Details */}
                          <div className="space-y-2 flex-1">
                            {/* Verification Badge */}
                            <div className="flex items-center gap-2 flex-wrap">
                              {isCorrected ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  <Check className="w-3.5 h-3.5" />
                                  User-Verified & Corrected
                                </span>
                              ) : isVerified ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  Verified by Researcher
                                </span>
                              ) : isRejected ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-800">
                                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                  Rejected from Provenance Graph
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                  Pending Verification
                                </span>
                              )}

                              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {fact.date}
                              </span>
                            </div>

                            {/* English Statement */}
                            <p className="text-sm font-medium text-slate-800 leading-relaxed font-serif">
                              {fact.correctedText || fact.statement}
                            </p>

                            {/* Correction Note if present */}
                            {fact.correctionNote && (
                              <div className="p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900">
                                <span className="font-bold">Researcher Audit Note: </span>
                                {fact.correctionNote}
                              </div>
                            )}

                            {/* Gurmukhi Accordion / Callout */}
                            {fact.gurmukhiText && (
                              <div className="pt-1">
                                <button
                                  type="button"
                                  onClick={() => toggleGurmukhi(fact.id)}
                                  className="text-xs text-amber-800 hover:text-amber-900 font-medium flex items-center gap-1 py-1 hover:underline"
                                >
                                  <span className="font-mono font-bold text-[11px]">ਗੁਰ</span>
                                  {expandedGurmukhi[fact.id]
                                    ? 'Hide Gurmukhi Punjabi Source Testimony'
                                    : 'Show Gurmukhi Punjabi Source Testimony'}
                                  {expandedGurmukhi[fact.id] ? (
                                    <ChevronUp className="w-3.5 h-3.5" />
                                  ) : (
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                {expandedGurmukhi[fact.id] && (
                                  <div className="mt-1.5 p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-slate-900 text-sm font-serif leading-relaxed animate-in fade-in duration-150">
                                    <div className="text-[10px] text-amber-800 font-bold uppercase tracking-wider mb-1">
                                      ਮੂਲ ਪੰਜਾਬੀ ਬਿਆਨ (Primary Vernacular Record):
                                    </div>
                                    {fact.gurmukhiText}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Interactive Citation Badges */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                                Citations:
                              </span>
                              {fact.citations.map((cite, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => handleCitationClick(cite)}
                                  className="px-2 py-0.5 bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 border border-slate-300 hover:border-amber-400 rounded text-xs font-mono font-bold transition-all shadow-2xs hover:shadow-xs flex items-center gap-1 group cursor-pointer"
                                  title={`Inspect Raw Source Excerpt: ${cite.badge}`}
                                >
                                  <span>{cite.badge}</span>
                                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-600" />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Verification / Denial Action Controls */}
                          <div className="flex items-center gap-1.5 shrink-0 pt-1">
                            {!isVerified && !isCorrected && (
                              <button
                                type="button"
                                onClick={() => onVerifyFact(fact.id)}
                                className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 hover:border-emerald-600 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors"
                                title="Confirm and verify fact"
                              >
                                <Check className="w-3.5 h-3.5" />
                                Verify
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => onRequestFactCorrection(fact)}
                              className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300 rounded-md text-xs font-medium flex items-center gap-1 transition-colors shadow-2xs"
                              title="Reject fact or edit record"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                              Reject / Correct
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
