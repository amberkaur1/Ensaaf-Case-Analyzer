import React, { useState } from 'react';
import { CaseFact } from '../types/evidence';
import { X, AlertTriangle, Trash2, Edit3, CheckCircle2, ShieldAlert } from 'lucide-react';

interface FactCorrectionModalProps {
  fact: CaseFact | null;
  onClose: () => void;
  onRemove: (factId: string) => void;
  onCorrect: (factId: string, correctedText: string, note: string) => void;
}

export const FactCorrectionModal: React.FC<FactCorrectionModalProps> = ({
  fact,
  onClose,
  onRemove,
  onCorrect,
}) => {
  const [mode, setMode] = useState<'choice' | 'edit'>('choice');
  const [correctedText, setCorrectedText] = useState(fact?.correctedText || fact?.statement || '');
  const [correctionNote, setCorrectionNote] = useState(fact?.correctionNote || '');

  if (!fact) return null;

  const handleSaveCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctedText.trim()) return;
    onCorrect(fact.id, correctedText.trim(), correctionNote.trim());
    onClose();
  };

  const handleConfirmRemove = () => {
    onRemove(fact.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Reject Fact or Update Record?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Fact Context */}
        <div className="p-6 space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Active Evidentiary Assertion
            </span>
            <p className="text-sm text-slate-800 leading-snug font-serif">
              &ldquo;{fact.statement}&rdquo;
            </p>
            {fact.gurmukhiText && (
              <p className="text-xs text-amber-900 mt-2 font-mono bg-amber-50 p-1.5 rounded border border-amber-200">
                ਗੁਰਮੁਖੀ: {fact.gurmukhiText}
              </p>
            )}
          </div>

          {mode === 'choice' ? (
            <div className="space-y-4 pt-2">
              <p className="text-xs text-slate-600 leading-relaxed">
                As a human-in-the-loop researcher, you have editorial control over the evidentiary synthesis graph. Choose whether to remove this statement entirely from trusted records or apply a rigorous factual correction with audit notes.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleConfirmRemove}
                  className="p-4 border-2 border-rose-200 hover:border-rose-500 hover:bg-rose-50/50 rounded-xl flex flex-col items-center text-center group transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-2 group-hover:scale-110 transition-transform">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-rose-900 mb-0.5">Remove Fact</span>
                  <span className="text-xs text-rose-600 leading-tight">
                    Strike out & exclude from active DAG graph
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('edit')}
                  className="p-4 border-2 border-amber-200 hover:border-amber-500 hover:bg-amber-50/50 rounded-xl flex flex-col items-center text-center group transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-2 group-hover:scale-110 transition-transform">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-amber-900 mb-0.5">Edit / Correct</span>
                  <span className="text-xs text-amber-700 leading-tight">
                    Provide revised statement & rationale notes
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveCorrection} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Corrected Factual Statement
                </label>
                <textarea
                  rows={4}
                  value={correctedText}
                  onChange={(e) => setCorrectedText(e.target.value)}
                  className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-serif leading-relaxed"
                  placeholder="Enter corrected assertion..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Researcher Notes / Provenance Justification
                </label>
                <input
                  type="text"
                  value={correctionNote}
                  onChange={(e) => setCorrectionNote(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="e.g., Cross-verified with CBI trial transcript Page 42; adjusted date to March 6"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setMode('choice')}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Back to options
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-md shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Save & Mark User-Verified
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
