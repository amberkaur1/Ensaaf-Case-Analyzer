import React, { useState } from 'react';
import {
  Search,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Upload,
  Lock
} from 'lucide-react';
import { CaseData } from '../types/evidence';

interface WorkstationTopBarProps {
  currentScreen: 'landing' | 'case_deep_dive' | 'source_analysis' | 'trend_detail' | 'cross_case';
  activeCase: CaseData;
  allCases: CaseData[];
  onSelectCase: (caseId: string) => void;
  onNavigateScreen: (screen: 'landing' | 'case_deep_dive') => void;
  isPunjabiActive: boolean;
  onTogglePunjabi: () => void;
  onOpenUploadModal: () => void;
  verifiedFactCount: number;
  totalFactCount: number;
}

export const WorkstationTopBar: React.FC<WorkstationTopBarProps> = ({
  currentScreen,
  activeCase,
  allCases,
  onSelectCase,
  onNavigateScreen,
  isPunjabiActive,
  onTogglePunjabi,
  onOpenUploadModal,
  verifiedFactCount,
  totalFactCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCaseSelectorOpen, setIsCaseSelectorOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isCaseFullyVerified = verifiedFactCount === totalFactCount && totalFactCount > 0;

  return (
    <header className="h-14 bg-white border-b border-slate-200 text-slate-800 flex items-center justify-between px-6 shrink-0 z-40 select-none shadow-2xs">
      {/* Left: Dynamic Archive Breadcrumb & Status */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-500 truncate">
          <span className="text-slate-400">Corpus</span>
          <span className="text-slate-700 font-bold">#PJB-8495</span>
          <span className="text-slate-300">/</span>

          {currentScreen === 'landing' ? (
            <span className="text-slate-900 font-bold truncate">
              Investigator Command • Case Review Queue
            </span>
          ) : (
            <>
              <span className="text-slate-400">Dossier</span>
              <span className="text-slate-700 font-bold">#{activeCase.victims[0]?.recordId?.replace('Record ', '') || '5121'}</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 font-bold truncate">
                {activeCase.primaryVictimName.replace(/\s*\(Record.*?\)/, '')}
              </span>
            </>
          )}
        </div>

        {/* Real-time Consensus Status Pill */}
        <div className="hidden md:flex items-center">
          {currentScreen === 'landing' ? (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-mono font-bold rounded uppercase">
              Queue: 5 Items Pending
            </span>
          ) : isCaseFullyVerified ? (
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-mono font-bold rounded uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Status: Verified Consensus
            </span>
          ) : (
            <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold rounded uppercase flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-600" />
              Status: In Triage Verification ({verifiedFactCount}/{totalFactCount})
            </span>
          )}
        </div>
      </div>

      {/* Right Controls: Search, Language, Add Case, Researcher Profile */}
      <div className="flex items-center gap-3">
        {/* Search Input with ⌘K */}
        <div className="relative hidden lg:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search corpus: dates, FIR registers, affidavit IDs..."
            className="w-72 pl-8 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#006B7D] focus:bg-white transition-all font-sans"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono bg-slate-100 px-1 rounded border border-slate-200">
            ⌘K
          </kbd>
        </div>

        {/* Case Switcher - Only inside Case Workspace */}
        {currentScreen !== 'landing' && (
          <div className="relative">
            <button
              onClick={() => setIsCaseSelectorOpen(!isCaseSelectorOpen)}
              className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#006B7D]" />
              <span className="font-bold text-slate-900 truncate max-w-[120px]">
                {activeCase.primaryVictimName.replace(/\s*\(Record.*?\)/, '')}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isCaseSelectorOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Active Victim Dossiers:
                </div>
                <div className="space-y-1 mt-1">
                  {allCases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCase(c.id);
                        setIsCaseSelectorOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                        c.id === activeCase.id
                          ? 'bg-teal-50 text-[#006B7D] border border-teal-200 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold truncate">{c.primaryVictimName}</div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {c.primaryLocation} • {c.victimCount} victims
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Ensaaf Language Switcher (ENG | ਪੰਜਾਬੀ) */}
        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 text-xs font-bold">
          <button
            onClick={() => {
              if (isPunjabiActive) onTogglePunjabi();
            }}
            className={`px-2 py-1 text-[11px] transition-colors ${
              !isPunjabiActive ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ENG
          </button>
          <button
            onClick={() => {
              if (!isPunjabiActive) onTogglePunjabi();
            }}
            className={`px-2.5 py-1 text-[11px] font-serif transition-colors ${
              isPunjabiActive ? 'bg-amber-400 text-slate-950 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ਪੰਜਾਬੀ
          </button>
        </div>

        {/* Add Dossier / Ingest Button */}
        <button
          onClick={onOpenUploadModal}
          className="px-2.5 py-1.5 bg-[#006B7D] hover:bg-[#005566] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          title="Ingest new deposition or judicial file"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ingest File</span>
        </button>

        {/* User Profile Badge (Adv. Amber Kaur, LLM) */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#006B7D] text-white flex items-center justify-center font-bold text-xs shadow-xs relative">
              <span>AK</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div className="hidden xl:flex flex-col text-left leading-tight pr-0.5">
              <span className="text-xs font-bold text-slate-900 truncate">Adv. Amber Kaur, LLM</span>
              <span className="text-[10px] text-slate-500 font-medium">Lead Case Verifier</span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden xl:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-3.5 z-50 animate-in fade-in duration-100">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#006B7D] text-white flex items-center justify-center font-black text-sm shrink-0">
                  AK
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black text-slate-900 truncate">Adv. Amber Kaur, LLM</div>
                  <div className="text-[11px] text-slate-500 truncate">Lead Case Verifier</div>
                  <div className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full mt-1 border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Verified Legal Investigator
                  </div>
                </div>
              </div>

              <div className="pt-2.5 space-y-1.5 text-xs">
                <div className="flex justify-between py-1 text-[11px]">
                  <span className="text-slate-500">Active Jurisdiction</span>
                  <span className="font-semibold text-slate-800">Punjab (1984–1995)</span>
                </div>
                <div className="flex justify-between py-1 text-[11px]">
                  <span className="text-slate-500">Security Tier</span>
                  <span className="font-semibold text-slate-800">Legal Probative</span>
                </div>
                <div className="flex justify-between py-1 text-[11px]">
                  <span className="text-slate-500">Pending Review</span>
                  <span className="font-bold text-[#006B7D] bg-teal-50 px-1.5 py-0.2 rounded border border-teal-100">
                    5 Action Items
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between font-mono">
                <span>Session ID: EN-8858</span>
                <span className="text-emerald-600 font-bold">TLS-1.3 Encrypted</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
