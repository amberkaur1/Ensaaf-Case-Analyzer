import React, { useState } from 'react';
import { INITIAL_CASES } from './data/mockCases';
import { CRIME_HOTSPOTS, INVESTIGATIVE_TASKS } from './data/mockHotspots';
import {
  CaseData,
  CaseFact,
  DAGEntity,
  EvidenceSource,
  CrimeHotspot,
  InvestigativeTask
} from './types/evidence';
import { Navbar } from './components/Navbar';
import { LandingTriageView } from './components/LandingTriageView';
import { CaseDeepDiveView } from './components/CaseDeepDiveView';
import { SourceAnalysisView } from './components/SourceAnalysisView';
import { TrendAnalysisView } from './components/TrendAnalysisView';
import { CrossCaseDashboard } from './components/CrossCaseDashboard';
import { RawEvidenceModal } from './components/RawEvidenceModal';
import { FactCorrectionModal } from './components/FactCorrectionModal';
import { CaseUploadModal } from './components/CaseUploadModal';
import { ActionDraftModal } from './components/ActionDraftModal';
import { CheckCircle, X } from 'lucide-react';

export default function App() {
  const [cases, setCases] = useState<CaseData[]>(INITIAL_CASES);
  const [activeCaseId, setActiveCaseId] = useState<string>('case-kotli-harchand');
  const [activeScreen, setActiveScreen] = useState<
    'landing' | 'case_deep_dive' | 'cross_case' | 'source_analysis' | 'trend_detail'
  >('landing');

  // Selected source for SourceAnalysisView
  const [selectedSourceForAnalysis, setSelectedSourceForAnalysis] = useState<EvidenceSource | null>(null);

  // Selected hotspot for TrendAnalysisView
  const [selectedHotspotForTrend, setSelectedHotspotForTrend] = useState<CrimeHotspot | null>(CRIME_HOTSPOTS[0]);

  // Modals & Drawers state
  const [rawEvidenceModalData, setRawEvidenceModalData] = useState<{
    source: EvidenceSource;
    badge?: string;
  } | null>(null);
  const [factForCorrection, setFactForCorrection] = useState<CaseFact | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Action Drafting Modal state
  const [draftModalData, setDraftModalData] = useState<{
    type: 'op_ed' | 'un_submission' | 'legal_remedy' | 'medical_referral' | 'policy_advocacy';
    payload: {
      title: string;
      victimName: string;
      summary: string;
      citations: string[];
      recipient?: string;
    };
  } | null>(null);

  // Global Gurmukhi Punjabi text toggle
  const [isPunjabiActive, setIsPunjabiActive] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Human-in-the-loop: Verify fact
  const handleVerifyFact = (factId: string) => {
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id !== activeCaseId) return c;
        return {
          ...c,
          phases: c.phases.map((phase) => ({
            ...phase,
            facts: phase.facts.map((fact) =>
              fact.id === factId ? { ...fact, verifiedStatus: 'verified' as const } : fact
            ),
          })),
        };
      })
    );
    showToast('Fact assertion verified and confirmed in active provenance chain.');
  };

  // Human-in-the-loop: Remove fact
  const handleRemoveFact = (factId: string) => {
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id !== activeCaseId) return c;
        return {
          ...c,
          phases: c.phases.map((phase) => ({
            ...phase,
            facts: phase.facts.map((fact) =>
              fact.id === factId ? { ...fact, verifiedStatus: 'rejected' as const } : fact
            ),
          })),
        };
      })
    );
    showToast('Fact removed from trusted evidence graph.');
  };

  // Human-in-the-loop: Correct fact
  const handleCorrectFact = (factId: string, correctedText: string, note: string) => {
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id !== activeCaseId) return c;
        return {
          ...c,
          phases: c.phases.map((phase) => ({
            ...phase,
            facts: phase.facts.map((fact) =>
              fact.id === factId
                ? {
                    ...fact,
                    correctedText,
                    correctionNote: note,
                    verifiedStatus: 'corrected' as const,
                  }
                : fact
            ),
          })),
        };
      })
    );
    showToast('Fact record updated with audit note & marked User-Verified.');
  };

  // Handle task selection from first screen
  const handleSelectTask = (task: InvestigativeTask) => {
    const targetCase = cases.find((c) => c.id === task.caseId) || cases[0];
    setActiveCaseId(targetCase.id);
    setActiveScreen('case_deep_dive');
    showToast(`Loaded dossier for review: ${task.title.slice(0, 32)}...`);
  };

  // Handle hotspot selection from first screen
  const handleSelectHotspot = (hotspot: CrimeHotspot) => {
    setSelectedHotspotForTrend(hotspot);
    setActiveScreen('trend_detail');
  };

  // Handle source click for deep analysis
  const handleSelectSourceForAnalysis = (source: EvidenceSource) => {
    setSelectedSourceForAnalysis(source);
    setActiveScreen('source_analysis');
  };

  // Add new case from Upload Modal
  const handleCaseAdded = (newCase: CaseData) => {
    setCases((prev) => [newCase, ...prev]);
    setActiveCaseId(newCase.id);
    setActiveScreen('case_deep_dive');
    showToast(`New case "${newCase.title.slice(0, 32)}..." added and indexed into evidence network.`);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 text-slate-900 font-sans">
      {/* Ensaaf-Themed Navbar */}
      <Navbar
        cases={cases}
        activeCaseId={activeCaseId}
        onSelectCase={(id) => {
          setActiveCaseId(id);
          setActiveScreen('case_deep_dive');
        }}
        activeScreen={activeScreen}
        onNavigateScreen={(screen) => setActiveScreen(screen)}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        isPunjabiActive={isPunjabiActive}
        onTogglePunjabi={() => setIsPunjabiActive(!isPunjabiActive)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 overflow-hidden p-4 sm:p-6 bg-[#f4f6f8]">
        {/* Screen 1: 50 / 50 Triage Task Queue + Ensaaf Dark Crime Map */}
        {activeScreen === 'landing' && (
          <LandingTriageView
            cases={cases}
            onSelectCase={(caseId) => {
              setActiveCaseId(caseId);
              setActiveScreen('case_deep_dive');
            }}
            onSelectHotspot={handleSelectHotspot}
            onSelectTask={handleSelectTask}
          />
        )}

        {/* Screen 2: Case Deep Dive Workspace (3 Views + Right Sources / Copilot) */}
        {activeScreen === 'case_deep_dive' && (
          <CaseDeepDiveView
            activeCase={activeCase}
            allCases={cases}
            onOpenRawEvidence={(source, badge) => setRawEvidenceModalData({ source, badge })}
            onSelectSourceForAnalysis={handleSelectSourceForAnalysis}
            onVerifyFact={handleVerifyFact}
            onRequestFactCorrection={(fact) => setFactForCorrection(fact)}
            isPunjabiActive={isPunjabiActive}
            onBackToHome={() => setActiveScreen('landing')}
            onOpenDraftModal={(type, payload) => setDraftModalData({ type, payload })}
          />
        )}

        {/* Screen 3: Source Analysis & Comparative View */}
        {activeScreen === 'source_analysis' && selectedSourceForAnalysis && (
          <div className="h-full overflow-y-auto">
            <SourceAnalysisView
              source={selectedSourceForAnalysis}
              activeCase={activeCase}
              onBack={() => setActiveScreen('case_deep_dive')}
              onOpenDraftModal={(type, payload) => setDraftModalData({ type, payload })}
            />
          </div>
        )}

        {/* Screen 4: Macro Trend & Regional Hotspot Deep Dive */}
        {activeScreen === 'trend_detail' && selectedHotspotForTrend && (
          <div className="h-full overflow-y-auto">
            <TrendAnalysisView
              hotspot={selectedHotspotForTrend}
              cases={cases}
              onBack={() => setActiveScreen('landing')}
              onOpenSourceModal={(source) => handleSelectSourceForAnalysis(source)}
              onOpenDraftModal={(type, payload) => setDraftModalData({ type, payload })}
              onSelectCase={(caseId) => {
                setActiveCaseId(caseId);
                setActiveScreen('case_deep_dive');
              }}
            />
          </div>
        )}

        {/* Screen 5: Cross-Case Synthesis & Discovery Dashboard */}
        {activeScreen === 'cross_case' && (
          <div className="h-full overflow-y-auto">
            <CrossCaseDashboard
              cases={cases}
              onSelectCase={(caseId) => {
                setActiveCaseId(caseId);
                setActiveScreen('case_deep_dive');
              }}
              onSendToCopilot={() => {
                setActiveScreen('case_deep_dive');
              }}
            />
          </div>
        )}
      </main>

      {/* Raw Evidence Inspection Modal */}
      {rawEvidenceModalData && (
        <RawEvidenceModal
          source={rawEvidenceModalData.source}
          citationBadge={rawEvidenceModalData.badge}
          onClose={() => setRawEvidenceModalData(null)}
        />
      )}

      {/* Human-in-the-loop Fact Correction / Denial Modal */}
      {factForCorrection && (
        <FactCorrectionModal
          fact={factForCorrection}
          onClose={() => setFactForCorrection(null)}
          onRemove={handleRemoveFact}
          onCorrect={handleCorrectFact}
        />
      )}

      {/* Add / Upload Case Dossier Modal */}
      {isUploadModalOpen && (
        <CaseUploadModal
          onClose={() => setIsUploadModalOpen(false)}
          onCaseAdded={handleCaseAdded}
        />
      )}

      {/* In-Situ AI Action Drafting Modal */}
      {draftModalData && (
        <ActionDraftModal
          initialType={draftModalData.type}
          contextPayload={draftModalData.payload}
          onClose={() => setDraftModalData(null)}
        />
      )}

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-0.5 ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
