import React from 'react';
import { CaseData, TimelineEvent, EvidenceSource } from '../types/evidence';
import { Calendar, MapPin, Scale, ExternalLink, Clock, ShieldAlert, Skull, UserX } from 'lucide-react';

interface CaseTimelineViewProps {
  activeCase: CaseData;
  onOpenRawEvidence: (source: EvidenceSource, badge?: string) => void;
}

export const CaseTimelineView: React.FC<CaseTimelineViewProps> = ({
  activeCase,
  onOpenRawEvidence,
}) => {
  // Collect timeline events from phases & facts
  const timelineEvents = activeCase.phases.flatMap((p) =>
    p.facts.map((f, i) => ({
      id: f.id,
      date: f.date,
      title: p.name.replace(/Phase \d+:\s*/, ''),
      description: f.statement,
      gurmukhi: f.gurmukhiText,
      citations: f.citations,
      phaseId: p.id,
    }))
  );

  const getPhaseIcon = (phaseId: string) => {
    switch (phaseId) {
      case 'abduction':
        return <UserX className="w-4 h-4 text-amber-500" />;
      case 'detention_extortion':
        return <ShieldAlert className="w-4 h-4 text-orange-500" />;
      case 'killing_disappearance':
        return <Skull className="w-4 h-4 text-rose-500" />;
      case 'legal_proceedings':
        return <Scale className="w-4 h-4 text-emerald-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150 text-slate-900 select-text">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#006B7D]" />
          <span>Chronological Incident Timeline & Legal Milestones</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Tracking the trajectory of state deprivation of liberty, custody concealment, staged execution, and judicial resolution for {activeCase.primaryVictimName}.
        </p>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 pl-6 pt-2">
        {timelineEvents.map((event) => (
          <div key={event.id} className="relative group">
            {/* Dot */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#006B7D] shadow-xs flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#006B7D]" />
            </div>

            <div className="p-4 bg-slate-50 hover:bg-teal-50/20 border border-slate-200 hover:border-[#006B7D] rounded-xl transition-all shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[#006B7D] bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                  {event.date}
                </span>
                <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                  {getPhaseIcon(event.phaseId)}
                  {event.title}
                </span>
              </div>

              <p className="text-xs text-slate-800 font-serif leading-relaxed">
                {event.description}
              </p>

              {event.gurmukhi && (
                <p className="text-[11px] text-amber-900 bg-amber-50/70 p-2 rounded border border-amber-200 font-serif leading-relaxed">
                  {event.gurmukhi}
                </p>
              )}

              {/* Citations */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-200/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">Archival Evidence:</span>
                {event.citations.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const matched = activeCase.sources.find((s) => s.code === c.badge || s.id === c.sourceId);
                      if (matched) onOpenRawEvidence(matched, c.badge);
                    }}
                    className="px-2 py-0.5 bg-white hover:bg-teal-50 text-slate-700 hover:text-[#006B7D] text-[11px] font-mono font-semibold rounded border border-slate-200 hover:border-[#006B7D] transition-colors flex items-center gap-1"
                  >
                    <span>{c.badge}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
