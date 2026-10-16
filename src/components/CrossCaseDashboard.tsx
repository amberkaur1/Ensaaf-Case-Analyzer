import React, { useState } from 'react';
import {
  CaseData,
  ModusOperandiPattern,
  PerpetratorOverlap,
  TimelineEvent,
} from '../types/evidence';
import {
  CROSS_CASE_PATTERNS,
  PERPETRATOR_OVERLAPS,
  COMPARATIVE_TIMELINE,
} from '../data/mockCases';
import {
  GitMerge,
  Layers,
  Scale,
  Calendar,
  Users,
  ShieldAlert,
  FileCheck2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Download,
  AlertTriangle
} from 'lucide-react';

interface CrossCaseDashboardProps {
  cases: CaseData[];
  onSelectCase: (caseId: string) => void;
  onSendToCopilot: (promptText: string) => void;
}

export const CrossCaseDashboard: React.FC<CrossCaseDashboardProps> = ({
  cases,
  onSelectCase,
  onSendToCopilot,
}) => {
  const [activeTab, setActiveTab] = useState<'patterns' | 'perpetrators' | 'timeline' | 'memo'>('patterns');
  const [selectedPattern, setSelectedPattern] = useState<ModusOperandiPattern | null>(CROSS_CASE_PATTERNS[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold rounded-full font-mono">
              CROSS-CASE SYNTHESIS & MACRO-DISCOVERY
            </span>
            <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold rounded-full">
              Triangulating 3 High-Impact Clusters
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Structural Human Rights Pattern Analysis (1991–1992)
          </h2>
          <p className="text-sm text-slate-300 max-w-3xl font-serif">
            Analyzing operational convergence, systemic police command structures, extortion tout networks, and evidentiary fabrication techniques across Batala, Majitha, and Tarn Taran police districts.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
              <span className="text-xs text-slate-400 block font-medium">Aggregated Victims</span>
              <span className="text-xl font-bold text-amber-400">15 Documented</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
              <span className="text-xs text-slate-400 block font-medium">Implicated Officers</span>
              <span className="text-xl font-bold text-slate-200">6 Key Commanders</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
              <span className="text-xs text-slate-400 block font-medium">Modus Operandi Match</span>
              <span className="text-xl font-bold text-emerald-400">100% Correlation</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
              <span className="text-xs text-slate-400 block font-medium">CBI Judgments Secured</span>
              <span className="text-xl font-bold text-blue-400">Life Sentences (2021)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 shadow-2xs">
        <button
          onClick={() => setActiveTab('patterns')}
          className={`px-5 py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'patterns'
              ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          Modus Operandi Breakdown
        </button>
        <button
          onClick={() => setActiveTab('perpetrators')}
          className={`px-5 py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'perpetrators'
              ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          Perpetrator Overlap Matrix
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-5 py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'timeline'
              ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Comparative Chronology
        </button>
        <button
          onClick={() => setActiveTab('memo')}
          className={`px-5 py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'memo'
              ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          Automated AI Legal Memo
        </button>
      </div>

      {/* Tab 1: Modus Operandi Breakdown */}
      {activeTab === 'patterns' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patterns List (Left 1 col) */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Identified Structural Patterns ({CROSS_CASE_PATTERNS.length})
            </span>
            {CROSS_CASE_PATTERNS.map((pat) => {
              const isSelected = selectedPattern?.id === pat.id;
              return (
                <div
                  key={pat.id}
                  onClick={() => setSelectedPattern(pat)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-400 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {pat.frequency}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-slate-400'}`} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{pat.patternTitle}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-serif">
                    {pat.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Pattern Deep Dive Detail Card (Right 2 cols) */}
          {selectedPattern && (
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-6">
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                    Pattern Deep Dive • {selectedPattern.frequency}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{selectedPattern.patternTitle}</h3>
                </div>
                <button
                  onClick={() => onSendToCopilot(`Provide a detailed comparative legal analysis on the pattern: "${selectedPattern.patternTitle}" across all three Punjab case clusters.`)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Query Pattern in Assistant
                </button>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Analytical Description
                </span>
                <p className="text-sm text-slate-800 leading-relaxed font-serif bg-slate-50 p-4 rounded-lg border border-slate-200">
                  {selectedPattern.description}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Key Evidentiary Tactics & Forensic Signatures
                </span>
                <ul className="space-y-2">
                  {selectedPattern.keyTactics.map((tactic, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{tactic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Case Clusters Exhibiting Pattern
                  </span>
                  <div className="space-y-1">
                    {selectedPattern.casesInvolved.map((c, i) => (
                      <span key={i} className="block text-xs font-mono text-slate-800 font-semibold">
                        • {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-amber-50/60 rounded-lg border border-amber-200/80 space-y-1.5">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                    International & Domestic Legal Significance
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-serif">
                    {selectedPattern.legalRelevance}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Perpetrator Overlap Matrix */}
      {activeTab === 'perpetrators' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Implicated Officers & Command Chain Mapping
              </h3>
              <p className="text-xs text-slate-500">
                Mapping police leadership who exercised joint operational command, unrecorded custody, or weapon fabrication across clusters.
              </p>
            </div>
            <button
              onClick={() => onSendToCopilot("Analyze the command structure and shared culpability of Inspector Dilbagh Singh and SSP Gurnek Singh Grewal.")}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Ask Assistant About Overlaps
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Officer Name & 1991 Rank</th>
                  <th className="py-3 px-4">Police District / Facility</th>
                  <th className="py-3 px-4">Implicated Case Clusters</th>
                  <th className="py-3 px-4">Documented Acts / Allegations</th>
                  <th className="py-3 px-4">2021 Judicial Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {PERPETRATOR_OVERLAPS.map((perp, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900">
                      <div className="text-sm font-bold text-slate-900">{perp.officerName}</div>
                      <div className="text-slate-500 font-mono text-[11px]">{perp.rank1991}</div>
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {perp.station}
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        {perp.implicatedCases.map((c, i) => (
                          <span key={i} className="inline-block px-2 py-0.5 bg-slate-100 text-slate-800 rounded text-[10px] font-mono mr-1">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-700 max-w-xs font-serif leading-relaxed">
                      <ul className="list-disc list-inside space-y-0.5">
                        {perp.actsAlleged.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                        perp.status2021.includes('Life Imprisonment')
                          ? 'bg-rose-100 text-rose-900 border border-rose-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        <Scale className="w-3 h-3" />
                        {perp.status2021}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Comparative Chronology Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Comparative Chronology: Parallel State Operations (1991–1992 & Judicial Milestones)
            </h3>
            <p className="text-xs text-slate-500">
              Correlating simultaneous abductions, extortion negotiations, and staged encounters across adjacent police districts.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 pl-6">
            {COMPARATIVE_TIMELINE.map((item) => (
              <div key={item.id} className="relative group">
                {/* Timeline node dot */}
                <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-xs ${
                  item.type === 'abduction' ? 'bg-amber-500' : item.type === 'encounter' ? 'bg-rose-600' : item.type === 'judicial' ? 'bg-emerald-600' : 'bg-blue-500'
                }`} />

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 hover:border-amber-400 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      {item.date}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {item.caseTitle}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-serif">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px] text-slate-500">
                    <span>Location: {item.location}</span>
                    <span className="font-mono text-slate-600">Citation: {item.citation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Automated AI Legal Memo */}
      {activeTab === 'memo' && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-2xs space-y-6">
          <div className="flex items-start justify-between border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Forensic Legal Synthesis Memorandum
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Systemic Enforced Disappearances & Criminal Enterprise in Punjab (1991–1992)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Prepared for Human Rights Advocates, Special CBI Prosecutors, and UN Working Group Submissions
              </p>
            </div>
            <button
              onClick={() => onSendToCopilot("Synthesize an actionable legal memo regarding international evidentiary thresholds under the Rome Statute and Indian Penal Code for the Kotli Harchand, Majitha, and Tarn Taran cases.")}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Regenerate Memo via Assistant
            </button>
          </div>

          <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-4 font-serif text-slate-800">
            <h4 className="text-sm font-bold font-sans text-slate-900 border-b border-slate-100 pb-1">
              1. EXECUTIVE SUMMARY & EVIDENTIARY THRESHOLDS
            </h4>
            <p>
              Triangulation of field affidavits, municipal cremation registries, and the landmark 2021 judgment of the Special CBI Court (SAS Nagar Mohali in RC 3(S)/97) demonstrates that enforced disappearances in the Batala, Majitha, and Tarn Taran corridors were not isolated aberrations. Rather, they formed an institutionalized, systemic pattern of state-executed liquidations governed by common command doctrines, financial extortion mechanisms, and standardized cover-up templates.
            </p>

            <h4 className="text-sm font-bold font-sans text-slate-900 border-b border-slate-100 pb-1 pt-2">
              2. THE 4-PILLAR MODUS OPERANDI ARCHITECTURE
            </h4>
            <p>
              <strong>Pillar I: Plainclothes Daylight Interception:</strong> In all documented cases, victims were seized from transit arteries (canals, highway bus stops, or agricultural paths) by unmarked Maruti gypsies commanded by CIA Inspectors without executing arrest memos or producing detainees before a magistrate within 24 hours (violating Article 22(2) of the Indian Constitution).
            </p>
            <p>
              <strong>Pillar II: Financial Extortion Pipelines via Local Touts:</strong> Senior police commanders (including SSP Gurnek Singh Grewal and Inspector Dilbagh Singh) utilized non-police intermediaries—notably local dera mahants (such as Mahant Prem Singh) and municipal touts—to solicit ransoms ranging from ₹20,000 to ₹1,50,000 under threat of immediate custodial liquidation.
            </p>
            <p>
              <strong>Pillar III: Staged Escape & Encounter Fabrications:</strong> Detainees were transferred covertly between primary interrogation centers (Batala CIA, Beas Interrogation Center) and remote outposts (Dhariwal Chowki) before being gunned down near secluded waterway bridges (Bhattian Bridge, Harike Pattan). Standardized FIRs were lodged alleging that detainees &ldquo;escaped handcuffs&rdquo; or were killed in crossfire.
            </p>
            <p>
              <strong>Pillar IV: Anonymous Municipal Cremations:</strong> Remains were deposited at municipal cremation sites (Batala Municipal Grounds, Durgiana Mandir) designated as &ldquo;Lawaris&rdquo; (ਲਾਵਾਰਿਸ - unclaimed corpses), purposefully destroying physical forensic evidence and denying surviving kin the right to observe funerary rites.
            </p>

            <h4 className="text-sm font-bold font-sans text-slate-900 border-b border-slate-100 pb-1 pt-2">
              3. ACTIONABLE LEGAL ACCOUNTABILITY RECOMMENDATIONS
            </h4>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>
                <strong>Invocation of Rome Statute Article 7(1)(i):</strong> The widespread and systematic character of these attacks against civilian populations satisfies the customary international law threshold for Crimes Against Humanity.
              </li>
              <li>
                <strong>CBI Special Court Precedent Enforcement:</strong> The 2021 conviction of Inspector Dilbagh Singh et al. under IPC Sections 302/364/120-B confirms that retrospective defense claims of crossfire immunity under TADA or police protection statutes fail when custody is proved unrecorded.
              </li>
              <li>
                <strong>Redress & Reparation under ICPPED:</strong> Ongoing documentation must be leveraged to demand state compensation and forensic exhumation investigations for families whose loved ones remain classified as &ldquo;unidentified.&rdquo;
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
