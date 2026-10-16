import React, { useState } from 'react';
import { EvidenceSource, CaseData, SideBySideComparison } from '../types/evidence';
import {
  FileText,
  Volume2,
  Play,
  Pause,
  ArrowLeft,
  Scale,
  HeartPulse,
  Send,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface SourceAnalysisViewProps {
  source: EvidenceSource;
  activeCase: CaseData;
  onBack: () => void;
  onOpenDraftModal: (type: 'op_ed' | 'un_submission' | 'legal_remedy' | 'medical_referral', contextPayload: {
    title: string;
    victimName: string;
    summary: string;
    citations: string[];
  }) => void;
}

export const SourceAnalysisView: React.FC<SourceAnalysisViewProps> = ({
  source,
  activeCase,
  onBack,
  onOpenDraftModal,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(38); // Simulated progress

  // Find relevant side-by-side comparison if available
  const comparison = activeCase.comparisons?.find((c) =>
    source.code.toLowerCase().includes('43/92') || source.code.toLowerCase().includes('fir')
      ? c.id.includes('1') || c.id.includes('fir')
      : true
  ) || activeCase.comparisons?.[0];

  const handlePlayToggle = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Top Breadcrumb & Title */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-[#006B7D] hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Case Overview</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-teal-50 text-[#006B7D] border border-teal-200 text-xs font-mono font-bold rounded">
            {source.code}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {source.classification}
          </span>
        </div>
      </div>

      {/* Source Title & Archival Provenance Card */}
      <div className="space-y-3">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          {source.title}
        </h2>
        <div className="flex flex-wrap gap-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div>
            <span className="font-semibold text-slate-500">Repository Archive: </span>
            <span className="text-slate-900 font-medium">{source.archive}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-500">Recorded Date: </span>
            <span className="text-slate-900 font-medium">{source.date}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-500">Interviewer / Authority: </span>
            <span className="text-slate-900 font-medium">{source.interviewerOrAuthority}</span>
          </div>
        </div>
      </div>

      {/* Simulated Audio Interview Recording Bar */}
      <div className="p-4 bg-slate-900 text-white rounded-xl shadow-md space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-slate-200">
              Archival Field Audio Interview Recording • Jaswant Kaur Deposition
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {isPlayingAudio ? '03:42 / 12:15' : '12:15 Audio Duration'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayToggle}
            className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md transition-colors"
          >
            {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          {/* Visual Waveform Simulator */}
          <div className="flex-1 space-y-1">
            <div className="h-6 flex items-center gap-1">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  style={{ height: `${Math.sin(i * 0.4) * 12 + 14}px` }}
                  className={`w-1 rounded-full transition-colors ${
                    i < audioProgress ? 'bg-amber-400' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${audioProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Text Excerpt */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#006B7D]" />
          Verbatim Primary Transcript Excerpt
        </h3>
        <div className="p-5 bg-amber-50/40 border border-amber-200/80 rounded-xl space-y-3">
          <p className="text-sm text-slate-900 font-serif leading-relaxed whitespace-pre-line">
            {source.fullExcerpt}
          </p>
          {source.gurmukhiExcerpt && (
            <div className="pt-2 border-t border-amber-200/60 text-xs text-amber-950 font-serif">
              <span className="font-bold block mb-1">ਮੂਲ ਪੰਜਾਬੀ ਗਵਾਹੀ:</span>
              {source.gurmukhiExcerpt}
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Contradiction Comparison (Police vs Witness/Court) */}
      {comparison && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Side-by-Side Narrative Contradiction Analysis
            </h3>
            <p className="text-xs text-slate-500">
              Contrasting fabricated official police dispatch claims against forensic and judicial facts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Official Police Claim */}
            <div className="p-5 bg-rose-50/60 border border-rose-200 rounded-xl space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 px-2 py-0.5 bg-rose-100 rounded">
                {comparison.leftBadge}
              </span>
              <h4 className="text-xs font-bold text-rose-950 mt-1">{comparison.leftTitle}</h4>
              <p className="text-xs text-slate-800 leading-relaxed font-serif">
                &ldquo;{comparison.leftContent}&rdquo;
              </p>
            </div>

            {/* Right: Verified Judicial Finding */}
            <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 px-2 py-0.5 bg-emerald-100 rounded">
                {comparison.rightBadge}
              </span>
              <h4 className="text-xs font-bold text-emerald-950 mt-1">{comparison.rightTitle}</h4>
              <p className="text-xs text-slate-800 leading-relaxed font-serif">
                &ldquo;{comparison.rightContent}&rdquo;
              </p>
            </div>
          </div>

          {/* Forensic Finding Summary Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
            <span className="font-bold text-slate-900 block">Forensic Synthesis:</span>
            <p className="text-slate-700 leading-relaxed font-serif">
              {comparison.contradictionAnalysis}
            </p>
          </div>
        </div>
      )}

      {/* Suggested Actions: Policy Advocacy, Medical Assistance, Legal Remedy */}
      <div className="space-y-4 pt-6 border-t border-slate-200 bg-slate-50/60 -mx-8 -mb-8 p-8 rounded-b-xl">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Suggested Direct Evidentiary Actions
          </h3>
          <p className="text-xs text-slate-500">
            Deploy this verified source excerpt directly into actionable legal petitions or medical assistance requests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Action 1: Legal Remedy */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#006B7D]">
                <Scale className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Seek Legal Remedy</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Draft High Court criminal petition under CrPC Section 482 / IPC 302/364 citing verified judicial precedents.
              </p>
            </div>
            <button
              onClick={() =>
                onOpenDraftModal('legal_remedy', {
                  title: 'Criminal Petition & Compensation Claim',
                  victimName: activeCase.primaryVictimName,
                  summary: source.fullExcerpt,
                  citations: [source.code, 'Special CBI Court Mohali 2021'],
                })
              }
              className="w-full py-2 bg-[#006B7D] hover:bg-[#005566] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>Help Draft Legal Petition</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 2: Torture Medical & Clinical Rehabilitation */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <HeartPulse className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Medical Torture Outreach</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Refer family and physical trauma survivors to specialist clinicians (ICRC / Istanbul Protocol trauma rehabilitation).
              </p>
            </div>
            <button
              onClick={() =>
                onOpenDraftModal('medical_referral', {
                  title: 'Urgent Torture Survivor Clinical Referral',
                  victimName: activeCase.primaryVictimName,
                  summary: source.fullExcerpt,
                  citations: [source.code],
                })
              }
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>Help Draft Medical Referral</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 3: Human Rights Advocacy Brief */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Send className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">UN / NGO Urgent Appeal</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Submit an urgent communication dossier to UN Working Group on Enforced Disappearances (WGEID).
              </p>
            </div>
            <button
              onClick={() =>
                onOpenDraftModal('un_submission', {
                  title: 'Urgent Communication to UN WGEID',
                  victimName: activeCase.primaryVictimName,
                  summary: source.fullExcerpt,
                  citations: [source.code, 'CCDP/01147'],
                })
              }
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>Help Draft UN Submission</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
