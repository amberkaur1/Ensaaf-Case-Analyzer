import React, { useState } from 'react';
import { CaseData, CaseFact, DAGEntity, EvidenceSource } from '../types/evidence';
import { CaseFactsTextView } from './CaseFactsTextView';
import { EntityGraphDAG } from './EntityGraphDAG';
import { CaseTimelineView } from './CaseTimelineView';
import { EvidenceAssistant } from './EvidenceAssistant';
import { EntityDetailDrawer } from './EntityDetailDrawer';
import {
  FileText,
  Share2,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Shield,
  Volume2,
  ArrowLeft,
  Scale,
  HeartPulse,
  Building2
} from 'lucide-react';

interface CaseDeepDiveViewProps {
  activeCase: CaseData;
  allCases: CaseData[];
  onOpenRawEvidence: (source: EvidenceSource, badge?: string) => void;
  onSelectSourceForAnalysis: (source: EvidenceSource) => void;
  onVerifyFact: (factId: string) => void;
  onRequestFactCorrection: (fact: CaseFact) => void;
  isPunjabiActive?: boolean;
  onBackToHome?: () => void;
  onOpenDraftModal?: (
    type: 'op_ed' | 'un_submission' | 'legal_remedy' | 'medical_referral' | 'policy_advocacy',
    contextPayload: {
      title: string;
      victimName: string;
      summary: string;
      citations: string[];
      recipient?: string;
    }
  ) => void;
}

export const CaseDeepDiveView: React.FC<CaseDeepDiveViewProps> = ({
  activeCase,
  allCases,
  onOpenRawEvidence,
  onSelectSourceForAnalysis,
  onVerifyFact,
  onRequestFactCorrection,
  isPunjabiActive = false,
  onBackToHome,
  onOpenDraftModal,
}) => {
  const [activeTab, setActiveTab] = useState<'facts' | 'topology' | 'timeline'>('facts');
  const [rightPanelTab, setRightPanelTab] = useState<'sources' | 'assistant'>('sources');
  const [selectedEntityForDrawer, setSelectedEntityForDrawer] = useState<DAGEntity | null>(null);

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 select-none overflow-hidden">
      {/* Main Left Workspace: 3 Views (70% width on desktop) */}
      <div className="flex-1 flex flex-col overflow-hidden space-y-4">
        {/* Top 3-View Segmented Control Bar */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 sm:gap-2">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-3 py-1.5 text-xs font-semibold text-[#006B7D] hover:bg-teal-50 rounded-lg flex items-center gap-1 mr-1 border border-transparent hover:border-teal-200 transition-colors"
                title="Return to Map & Tasks Queue"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Back to Map & Tasks</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('facts')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'facts'
                  ? 'bg-[#006B7D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Written Summary</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('topology');
                setSelectedEntityForDrawer(null);
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'topology'
                  ? 'bg-[#006B7D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Visual Graph (DAG)</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'timeline'
                  ? 'bg-[#006B7D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium px-2 hidden sm:block">
            <span>{activeCase.primaryLocation}</span>
          </div>
        </div>

        {/* Dynamic Viewport Scroll Area */}
        <div className="flex-1 overflow-y-auto pr-1 relative">
          {activeTab === 'facts' && (
            <CaseFactsTextView
              activeCase={activeCase}
              onOpenRawEvidence={onOpenRawEvidence}
              onVerifyFact={onVerifyFact}
              onRequestFactCorrection={onRequestFactCorrection}
              isPunjabiActive={isPunjabiActive}
            />
          )}

          {activeTab === 'topology' && (
            <div className="relative">
              <EntityGraphDAG
                activeCase={activeCase}
                selectedEntityId={selectedEntityForDrawer?.id || null}
                onSelectEntity={(entity) => setSelectedEntityForDrawer(entity)}
              />

              {/* Entity Detail Sliding Drawer */}
              {selectedEntityForDrawer && (
                <EntityDetailDrawer
                  entity={selectedEntityForDrawer}
                  activeCase={activeCase}
                  onClose={() => setSelectedEntityForDrawer(null)}
                  onSelectCitation={(source, badge) => onOpenRawEvidence(source, badge)}
                  onSelectConnectedEntity={(entId) => {
                    const found = activeCase.entities.find((e) => e.id === entId);
                    if (found) setSelectedEntityForDrawer(found);
                  }}
                />
              )}
            </div>
          )}

          {activeTab === 'timeline' && (
            <CaseTimelineView
              activeCase={activeCase}
              onOpenRawEvidence={onOpenRawEvidence}
            />
          )}
        </div>
      </div>

      {/* Right Persistent Panel (30% width): Sources List + Evidence Assistant Copilot */}
      <div className="w-full lg:w-80 xl:w-96 shrink-0 h-full flex flex-col bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Right Panel Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1">
          <button
            onClick={() => setRightPanelTab('sources')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              rightPanelTab === 'sources'
                ? 'bg-white text-[#006B7D] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Case Sources ({activeCase.sources.length})</span>
          </button>

          <button
            onClick={() => setRightPanelTab('assistant')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              rightPanelTab === 'assistant'
                ? 'bg-white text-amber-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Evidence Assistant</span>
          </button>
        </div>

        {/* Tab 1: Sources List */}
        {rightPanelTab === 'sources' ? (
          <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Primary Archival Dossiers
              </span>
              <p className="text-xs text-slate-600">
                Click any source to open deep transcript analysis and side-by-side entity comparisons.
              </p>
            </div>

            <div className="space-y-2.5">
              {activeCase.sources.map((src) => (
                <div
                  key={src.id}
                  onClick={() => onSelectSourceForAnalysis(src)}
                  className="p-3 bg-slate-50 hover:bg-teal-50/50 border border-slate-200 hover:border-[#006B7D] rounded-xl cursor-pointer transition-all shadow-2xs group space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-white text-[#006B7D] font-mono text-[10px] font-bold rounded border border-slate-200">
                      {src.code}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {src.date}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#006B7D] leading-snug">
                    {src.title}
                  </h4>

                  <p className="text-[11px] text-slate-600 font-serif line-clamp-2 leading-relaxed">
                    {src.highlightSnippet}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px] text-slate-500">
                    <span className="truncate max-w-[170px]">{src.archive}</span>
                    <span className="text-[#006B7D] font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Analyze <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Case Actions & Interventions */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Suggested Case Actions
                </span>
                <span className="text-[10px] font-mono text-slate-400">3 Available</span>
              </div>

              <div className="space-y-2.5">
                {/* Action 1: Seeking Legal Remedy */}
                <div className="p-3 bg-teal-50/50 border border-teal-200/80 rounded-xl space-y-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#006B7D]" />
                      <h5 className="text-xs font-bold text-slate-900">Seeking Legal Remedy</h5>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      High Court Writ Petition / Contempt pleading against implicated commanders.
                    </p>
                  </div>
                  {onOpenDraftModal && (
                    <button
                      onClick={() =>
                        onOpenDraftModal('legal_remedy', {
                          title: `Writ Petition in re: Unlawful Detention & Liquidation of ${activeCase.primaryVictimName}`,
                          victimName: activeCase.primaryVictimName,
                          summary: activeCase.summary,
                          citations: activeCase.sources.map((s) => s.code),
                          recipient: 'High Court of Punjab and Haryana at Chandigarh',
                        })
                      }
                      className="w-full py-1.5 px-2.5 bg-[#006B7D] hover:bg-[#005566] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-200" />
                      <span>Help Draft Legal Petition</span>
                    </button>
                  )}
                </div>

                {/* Action 2: Reach Out for Medical Help / Torture Rehabilitation */}
                <div className="p-3 bg-rose-50/40 border border-rose-200/80 rounded-xl space-y-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
                      <h5 className="text-xs font-bold text-slate-900">Medical / Torture Relief</h5>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Urgent clinical and trauma rehabilitation under Istanbul Protocol standards.
                    </p>
                  </div>
                  {onOpenDraftModal && (
                    <button
                      onClick={() =>
                        onOpenDraftModal('medical_referral', {
                          title: `Clinical Referral & Psychosocial Support for Surviving Kin of ${activeCase.primaryVictimName}`,
                          victimName: activeCase.primaryVictimName,
                          summary: activeCase.summary,
                          citations: activeCase.sources.map((s) => s.code),
                          recipient: 'Red Cross / Specialized Torture Rehabilitation Clinic',
                        })
                      }
                      className="w-full py-1.5 px-2.5 bg-rose-700 hover:bg-rose-800 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-rose-200" />
                      <span>Help Draft Medical Referral</span>
                    </button>
                  )}
                </div>

                {/* Action 3: Policy Advocacy */}
                <div className="p-3 bg-amber-50/50 border border-amber-200/80 rounded-xl space-y-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-amber-700" />
                      <h5 className="text-xs font-bold text-slate-900">Policy & Legislative Advocacy</h5>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Legislative representation on ending unrecorded remand and repeal of immunity.
                    </p>
                  </div>
                  {onOpenDraftModal && (
                    <button
                      onClick={() =>
                        onOpenDraftModal('policy_advocacy', {
                          title: `Policy Brief: Systemic Unrecorded Remand in ${activeCase.primaryLocation}`,
                          victimName: activeCase.primaryVictimName,
                          summary: activeCase.summary,
                          citations: activeCase.sources.map((s) => s.code),
                          recipient: 'Parliamentary Committee on Home Affairs / Law Commission',
                        })
                      }
                      className="w-full py-1.5 px-2.5 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-amber-200" />
                      <span>Help Draft Policy Brief</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: Evidence Assistant */
          <div className="flex-1 h-full overflow-hidden">
            <EvidenceAssistant
              currentCase={activeCase}
              allCases={allCases}
              onOpenRawEvidence={onOpenRawEvidence}
            />
          </div>
        )}
      </div>
    </div>
  );
};
