import React from 'react';
import { CaseData } from '../types/evidence';
import {
  FolderOpen,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
  Scale,
  FileText,
  Search,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface CaseLandingScreenProps {
  cases: CaseData[];
  onSelectCase: (caseId: string) => void;
  onOpenUploadModal: () => void;
}

export const CaseLandingScreen: React.FC<CaseLandingScreenProps> = ({
  cases,
  onSelectCase,
  onOpenUploadModal,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold rounded-full font-mono">
              EVIDENCE-TO-ACTION REPOSITORY
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Human Rights Legal Informatics
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white leading-tight">
            Human Rights Provenance & Discovery Engine
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-serif">
            Investigating enforced disappearances, unrecorded custodial remands, extortion syndicates, and extrajudicial encounter executions during the Punjab conflict. Every factual assertion is cryptographically and judicially tied to primary village panchayat resolutions, survivor field notes, municipal cremation registers, and CBI Special Court convictions.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onSelectCase(cases[0].id)}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-2 transition-colors shadow-lg"
            >
              <span>Explore Primary Case (Kotli Harchand)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenUploadModal}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg text-xs border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>Upload Dossier / REDCap Dump</span>
            </button>
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 mt-6 relative z-10">
          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60">
            <span className="text-[11px] text-slate-400 block font-medium">Documented Case Files</span>
            <span className="text-2xl font-bold text-white mt-0.5 block">{cases.length} Clusters</span>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60">
            <span className="text-[11px] text-slate-400 block font-medium">Indexed Victims</span>
            <span className="text-2xl font-bold text-amber-400 mt-0.5 block">
              {cases.reduce((sum, c) => sum + c.victimCount, 0)} Victims
            </span>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60">
            <span className="text-[11px] text-slate-400 block font-medium">Judicial Precedents</span>
            <span className="text-2xl font-bold text-emerald-400 mt-0.5 block">Special CBI Court</span>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60">
            <span className="text-[11px] text-slate-400 block font-medium">Primary Sources</span>
            <span className="text-2xl font-bold text-blue-400 mt-0.5 block">
              {cases.reduce((sum, c) => sum + c.sources.length, 0)} Primary Excerpts
            </span>
          </div>
        </div>
      </div>

      {/* Case Directory Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-slate-700" />
              Select an Active Case Cluster
            </h2>
            <p className="text-xs text-slate-500">
              Each dossier features chronological fact breakdowns, verifiable citations, and visual DAG networks.
            </p>
          </div>
          <button
            onClick={onOpenUploadModal}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <PlusCircle className="w-4 h-4 text-amber-600" />
            Add New Case
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-slate-200 hover:border-amber-400 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Card Top Banner */}
              <div className="p-5 border-b border-slate-100 space-y-2 bg-gradient-to-b from-slate-50/60 to-white">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold font-mono rounded">
                    {c.incidentPeriod.split('(')[0].trim()}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {c.legalStatus.includes('CBI') ? 'CBI Judgments' : 'Documentation Active'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{c.primaryLocation}</span>
                </p>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 space-y-4 text-xs">
                <p className="text-slate-600 leading-relaxed font-serif line-clamp-3">
                  {c.summary}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      Documented Victims:
                    </span>
                    <span className="font-bold text-slate-800">{c.victimCount} individuals</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      Archival Sources:
                    </span>
                    <span className="font-mono text-slate-800 font-semibold">{c.sources.length} primary docs</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {c.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  {c.entities.length} Network Nodes
                </span>
                <button
                  onClick={() => onSelectCase(c.id)}
                  className="px-3.5 py-1.5 bg-slate-900 group-hover:bg-amber-600 text-white font-semibold rounded-md text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Explore Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
