import React, { useState } from 'react';
import { CrimeHotspot, EvidenceSource, CaseData } from '../types/evidence';
import {
  MapPin,
  ArrowLeft,
  Sparkles,
  FileText,
  Send,
  Building2,
  Newspaper,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  Layers,
  Scale,
  Users
} from 'lucide-react';

interface TrendAnalysisViewProps {
  hotspot: CrimeHotspot;
  cases: CaseData[];
  onBack: () => void;
  onOpenSourceModal: (source: EvidenceSource) => void;
  onOpenDraftModal: (type: 'op_ed' | 'un_submission' | 'legal_remedy' | 'medical_referral' | 'policy_advocacy', contextPayload: {
    title: string;
    victimName: string;
    summary: string;
    citations: string[];
    recipient?: string;
  }) => void;
  onSelectCase?: (caseId: string) => void;
}

export const TrendAnalysisView: React.FC<TrendAnalysisViewProps> = ({
  hotspot,
  cases,
  onBack,
  onOpenSourceModal,
  onOpenDraftModal,
  onSelectCase,
}) => {
  // Aggregate sources across associated cases
  const associatedCases = cases.filter((c) => hotspot.associatedCaseIds.includes(c.id));
  const macroSources = associatedCases.flatMap((c) => c.sources).slice(0, 4);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-150 text-slate-900 select-text">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-[#006B7D] hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Triage Map & Tasks</span>
        </button>

        <span className="px-2.5 py-0.5 bg-amber-50 text-amber-900 border border-amber-300 text-xs font-mono font-bold rounded">
          {hotspot.district} Regional Pattern
        </span>
      </div>

      {/* Hero Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006B7D]">
          <MapPin className="w-4 h-4" />
          <span>Geographic Crime Cluster Analysis</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          {hotspot.regionName}
        </h1>
        <p className="text-sm text-slate-600 font-serif leading-relaxed max-w-3xl">
          {hotspot.summary}
        </p>
      </div>

      {/* Grid: Trend Metrics & Facility Infrastructure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Cataloged Incidents
          </span>
          <span className="text-2xl font-black text-amber-600 font-mono">
            {hotspot.incidentCount}
          </span>
          <span className="text-[11px] text-slate-500 block">
            Documented disappearances & extrajudicial executions
          </span>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Dominant Typology
          </span>
          <span className="text-sm font-bold text-slate-900 block leading-snug">
            {hotspot.primaryTypology}
          </span>
          <span className="text-[11px] text-slate-500 block">
            Pattern replicated across border sectors
          </span>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Judicial Accountability Status
          </span>
          <span className="text-xs font-bold text-emerald-800 block leading-snug">
            {hotspot.legalExposure}
          </span>
        </div>
      </div>

      {/* Interrogation Centers & Holding Facilities */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Implicated Interrogation Outposts & Staged Encounter Environs
        </h3>
        <div className="flex flex-wrap gap-2">
          {hotspot.keyFacilities.map((facility, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg border border-slate-200 flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{facility}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Associated Macro Archival Sources on Right / Below */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#006B7D]" />
          Corroborating Primary Dossiers & Judicial Records ({macroSources.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {macroSources.map((src) => (
            <div
              key={src.id}
              onClick={() => onOpenSourceModal(src)}
              className="p-3.5 bg-slate-50 hover:bg-teal-50/50 border border-slate-200 hover:border-[#006B7D] rounded-lg cursor-pointer transition-colors shadow-2xs group"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono font-bold text-[#006B7D]">{src.code}</span>
                <span className="text-slate-400 text-[10px]">{src.date}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#006B7D] truncate">
                {src.title}
              </h4>
              <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 font-serif">
                {src.highlightSnippet}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Associated Cases in this Regional Cluster */}
      {associatedCases.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#006B7D]" />
              Associated Victim Dossiers in this Trend Cluster ({associatedCases.length})
            </h3>
            <span className="text-xs text-slate-500 font-medium">Click to inspect individual case dossier</span>
          </div>

          <div className="space-y-2.5">
            {associatedCases.map((c) => (
              <div
                key={c.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4 hover:border-[#006B7D] transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm truncate">
                      {c.primaryVictimName}
                    </span>
                    <span className="px-2 py-0.5 bg-teal-50 text-[#006B7D] font-mono text-[10px] font-bold rounded border border-teal-200">
                      {c.victimCount} Victims
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 truncate max-w-xl">
                    {c.summary}
                  </p>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {c.primaryLocation} • {c.incidentPeriod}
                  </div>
                </div>

                {onSelectCase && (
                  <button
                    onClick={() => onSelectCase(c.id)}
                    className="px-3.5 py-2 bg-[#006B7D] hover:bg-[#005566] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>Open Case Workspace</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Macro Advocacy Actions: Op-Ed, UN Submission, Government Memorandum */}
      <div className="space-y-4 pt-6 border-t border-slate-200 bg-slate-50/80 -mx-8 -mb-8 p-8 rounded-b-xl">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Macro Systemic Advocacy Actions
          </h3>
          <p className="text-xs text-slate-500">
            Escalate this structural regional pattern to international human rights bodies, press editors, and parliamentary delegations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Action 1: Investigative Op-Ed */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#006B7D]">
                <Newspaper className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Publish National / Global Op-Ed</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Draft a high-impact investigative op-ed analyzing the {hotspot.regionName} staged encounter pattern for the press.
              </p>
            </div>
            <button
              onClick={() =>
                onOpenDraftModal('op_ed', {
                  title: `The Thirty-Year Arc of Staged Encounters in ${hotspot.district}`,
                  victimName: `${hotspot.regionName} Victims Cluster`,
                  summary: hotspot.summary,
                  citations: macroSources.map((s) => s.code),
                  recipient: 'National / International Press Editorial Board',
                })
              }
              className="w-full py-2 bg-[#006B7D] hover:bg-[#005566] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>Help Draft Press Op-Ed</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 2: UN WGEID / International NGO Dossier */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Send className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">UN WGEID Urgent Appeal</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Submit an urgent communication detailing systemic command responsibility to the UN Working Group on Enforced Disappearances.
              </p>
            </div>
            <button
              onClick={() =>
                onOpenDraftModal('un_submission', {
                  title: `Systemic Enforced Disappearances in ${hotspot.regionName}`,
                  victimName: `${hotspot.regionName} Detainees`,
                  summary: hotspot.summary,
                  citations: macroSources.map((s) => s.code),
                  recipient: 'UN Working Group on Enforced or Involuntary Disappearances (Geneva)',
                })
              }
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>Help Draft UN Submission</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 3: Regional Government & Ministry Memorandum */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-800">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Government / MHA Memorandum</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Formal representation to State Home Department for exhumation, identification, and forensic archiving of crematorium records.
              </p>
            </div>
            <button
              onClick={() =>
                onOpenDraftModal('legal_remedy', {
                  title: `Representation for Judicial Exhumation & Records Preservation`,
                  victimName: `Unidentified Victims of ${hotspot.regionName}`,
                  summary: hotspot.summary,
                  citations: macroSources.map((s) => s.code),
                  recipient: 'Ministry of Home Affairs & Punjab State Human Rights Commission',
                })
              }
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span>Help Draft Government Memo</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
