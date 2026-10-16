import React from 'react';
import {
  LayoutDashboard,
  Share2,
  Layers,
  FileCheck2,
  ShieldCheck,
  Scale,
  Sparkles,
  Database,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface ForensicSidebarProps {
  activeScreen: 'landing' | 'case_deep_dive' | 'cross_case' | 'source_analysis' | 'trend_detail';
  onNavigateScreen: (screen: 'landing' | 'case_deep_dive' | 'cross_case') => void;
  onOpenSplitViewProof: () => void;
  onOpenUploadModal: () => void;
  activeCaseVictimName: string;
}

export const ForensicSidebar: React.FC<ForensicSidebarProps> = ({
  activeScreen,
  onNavigateScreen,
  onOpenSplitViewProof,
  onOpenUploadModal,
  activeCaseVictimName,
}) => {
  return (
    <aside className="w-64 bg-[#0B0F19] border-r border-slate-800 text-slate-300 flex flex-col shrink-0 select-none z-30 hidden md:flex">
      {/* Brand Header: Ensaaf Archival Core */}
      <div className="p-5 border-b border-slate-800/80 bg-[#080C14]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#006B7D] flex items-center justify-center text-white shadow-xs">
            <Scale className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="text-sm font-black tracking-wider text-white font-sans uppercase">
              Ensaaf
            </div>
            <div className="text-[10px] tracking-widest text-slate-400 font-mono uppercase font-semibold">
              Archival Core
            </div>
          </div>
        </div>

        {/* Active Corpus Badge */}
        <div className="mt-4 p-2.5 rounded-lg bg-[#121826] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="uppercase font-bold tracking-wider">Active Corpus</span>
            <span className="px-1.5 py-0.2 bg-teal-900/60 text-teal-300 border border-teal-700/50 rounded text-[9px] font-bold">
              1984–1995
            </span>
          </div>
          <div className="text-xs font-bold text-white font-sans">
            Punjab Documentation
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Verified Historical Record</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* Section 1: Forensic Workstation */}
        <div className="space-y-1.5">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Forensic Workstation
          </div>

          <button
            onClick={() => onNavigateScreen('landing')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeScreen === 'landing' || activeScreen === 'trend_detail'
                ? 'bg-[#006B7D] text-white shadow-xs font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard & Trends</span>
          </button>

          <button
            onClick={() => onNavigateScreen('case_deep_dive')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeScreen === 'case_deep_dive' || activeScreen === 'source_analysis'
                ? 'bg-[#006B7D] text-white shadow-xs font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3 truncate">
              <Share2 className="w-4 h-4 shrink-0" />
              <span className="truncate">Case Workspace</span>
            </div>
            {activeCaseVictimName && (
              <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-black/40 text-teal-200 truncate max-w-[70px]">
                Active
              </span>
            )}
          </button>

          <button
            onClick={onOpenSplitViewProof}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Split-View Proof</span>
            </div>
            <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-1 py-0.2 rounded border border-amber-500/30">
              Live OCR
            </span>
          </button>
        </div>

        {/* Section 2: Registry & Audit */}
        <div className="space-y-1.5">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Registry & Audit
          </div>

          <button
            onClick={onOpenUploadModal}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            <FileCheck2 className="w-4 h-4 shrink-0 text-teal-400" />
            <span>Affidavits & Depositions</span>
          </button>

          <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Chain-of-Custody Log</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Quick Context Card */}
        <div className="p-3 bg-[#121826]/80 rounded-xl border border-slate-800 text-xs space-y-1.5">
          <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
            Researcher Session
          </div>
          <div className="text-white font-bold text-xs truncate">
            Adv. Amber Kaur
          </div>
          <div className="text-[11px] text-slate-400">
            5 Priority verification items awaiting audit in active docket.
          </div>
        </div>
      </div>

      {/* Bottom Integrity Checksum Footer */}
      <div className="p-3.5 border-t border-slate-800/80 bg-[#080C14] flex items-center justify-between text-[10px] font-mono">
        <span className="text-slate-400">INTEGRITY CHECKSUM</span>
        <span className="text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60">
          SHA-256:0K
        </span>
      </div>
    </aside>
  );
};
