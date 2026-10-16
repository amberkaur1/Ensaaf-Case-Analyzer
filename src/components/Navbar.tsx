import React from 'react';
import { CaseData } from '../types/evidence';
import {
  ChevronDown,
  Upload,
  ArrowLeft
} from 'lucide-react';

interface NavbarProps {
  cases: CaseData[];
  activeCaseId: string;
  onSelectCase: (caseId: string) => void;
  activeScreen: 'landing' | 'case_deep_dive' | 'cross_case' | 'trend_detail' | 'source_analysis';
  onNavigateScreen: (screen: 'landing' | 'case_deep_dive') => void;
  onOpenUploadModal: () => void;
  isPunjabiActive?: boolean;
  onTogglePunjabi?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cases,
  activeCaseId,
  onSelectCase,
  activeScreen,
  onNavigateScreen,
  onOpenUploadModal,
  isPunjabiActive = false,
  onTogglePunjabi,
}) => {
  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  return (
    <header className="h-16 bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between px-6 shrink-0 z-40 select-none shadow-2xs">
      {/* Left: Ensaaf Brand Typography */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigateScreen('landing')}
          className="flex items-baseline gap-2.5 text-left group transition-opacity"
        >
          <span className="text-2xl font-black tracking-tight text-[#006B7D] group-hover:text-[#005566] transition-colors font-sans">
            Ensaaf
          </span>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline tracking-tight">
            Crimes Against Humanity in Punjab, India
          </span>
        </button>

        {activeScreen !== 'landing' && (
          <button
            onClick={() => onNavigateScreen('landing')}
            className="text-xs font-semibold text-[#006B7D] hover:underline flex items-center gap-1 ml-4 pl-4 border-l border-slate-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Map & Tasks Queue</span>
          </button>
        )}
      </div>

      {/* Right: Conditional Case Selector (only when inside a case), Punjabi Button, Add Dossier, and Researcher Profile */}
      <div className="flex items-center gap-2.5">
        {/* Case Selector Dropdown - ONLY shown when inside a case view */}
        {activeScreen !== 'landing' && (
          <div className="relative group hidden md:block">
            <div className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer transition-colors text-xs">
              <span className="text-slate-400 font-medium">Case:</span>
              <span className="font-bold text-slate-900 truncate max-w-[190px]">
                {activeCase.primaryVictimName}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-2 hidden group-hover:block z-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                Documented Victim Clusters:
              </span>
              <div className="space-y-1 mt-1">
                {cases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCase(c.id);
                      onNavigateScreen('case_deep_dive');
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                      c.id === activeCaseId
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
          </div>
        )}

        {/* Ensaaf Signature Gold Punjabi Switcher */}
        <button
          onClick={onTogglePunjabi}
          className={`px-3 py-1 text-xs font-bold font-serif rounded border transition-colors ${
            isPunjabiActive
              ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
              : 'border-amber-400 text-amber-800 bg-amber-50 hover:bg-amber-100'
          }`}
          title="Toggle Gurmukhi Punjabi Translations"
        >
          ਪੰਜਾਬੀ
        </button>

        {/* Add / Upload Dossier Button */}
        <button
          onClick={onOpenUploadModal}
          className="px-3 py-1.5 bg-[#006B7D] hover:bg-[#005566] text-white font-bold rounded-md text-xs flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Dossier</span>
        </button>

        {/* Researcher / Lawyer Profile Icon */}
        <div className="relative group ml-1">
          <button
            type="button"
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer"
            title="Adv. Amber Kaur • Senior Legal Researcher & Fact Verification Lead"
          >
            <div className="w-7 h-7 rounded-full bg-[#006B7D] text-white flex items-center justify-center font-bold text-xs shadow-xs relative">
              <span>AK</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div className="hidden lg:flex flex-col text-left leading-tight pr-0.5">
              <span className="text-xs font-bold text-slate-900 truncate max-w-[110px]">Adv. Amber Kaur</span>
              <span className="text-[10px] text-slate-500 font-medium">Legal Researcher</span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden lg:block" />
          </button>

          {/* Profile Dropdown Details */}
          <div className="absolute right-0 top-full mt-2 w-68 bg-white border border-slate-200 rounded-xl shadow-xl p-3.5 hidden group-hover:block z-50 animate-in fade-in duration-100">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-[#006B7D] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                AK
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-black text-slate-900 truncate">Adv. Amber Kaur</div>
                <div className="text-[11px] text-slate-500 truncate">Senior Legal Researcher</div>
                <div className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full mt-1 border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online • Legal Cell
                </div>
              </div>
            </div>

            <div className="pt-2.5 space-y-2 text-xs">
              <div className="flex justify-between items-center py-0.5 text-[11px]">
                <span className="text-slate-500">Unit</span>
                <span className="font-semibold text-slate-800">Ensaaf Documentation Cell</span>
              </div>
              <div className="flex justify-between items-center py-0.5 text-[11px]">
                <span className="text-slate-500">Jurisdiction</span>
                <span className="font-semibold text-slate-800">Punjab (1984–1995)</span>
              </div>
              <div className="flex justify-between items-center py-0.5 text-[11px]">
                <span className="text-slate-500">Assigned Queue</span>
                <span className="font-bold text-[#006B7D] bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">
                  5 Cases to Review
                </span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Encrypted Session</span>
              <span className="font-mono">ID: EN-8858</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
