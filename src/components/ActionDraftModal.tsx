import React, { useState, useEffect } from 'react';
import { ActionDraft } from '../types/evidence';
import {
  X,
  Sparkles,
  Copy,
  Check,
  Download,
  FileText,
  Loader2,
  Scale,
  Newspaper,
  Send,
  HeartPulse,
  RefreshCw,
  Building2
} from 'lucide-react';

interface ActionDraftModalProps {
  initialType: 'op_ed' | 'un_submission' | 'legal_remedy' | 'medical_referral' | 'policy_advocacy';
  contextPayload: {
    title: string;
    victimName: string;
    summary: string;
    citations: string[];
    recipient?: string;
  };
  onClose: () => void;
}

export const ActionDraftModal: React.FC<ActionDraftModalProps> = ({
  initialType,
  contextPayload,
  onClose,
}) => {
  const [draftType, setDraftType] = useState(initialType);
  const [recipient, setRecipient] = useState(contextPayload.recipient || '');
  const [tone, setTone] = useState('Authoritative & Judicial');
  const [draftContent, setDraftContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load initial draft from server
  const fetchDraft = async (typeToFetch = draftType) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/draft-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: typeToFetch,
          caseTitle: contextPayload.title,
          victimName: contextPayload.victimName,
          summary: contextPayload.summary,
          citations: contextPayload.citations,
          recipient: recipient || undefined,
          tone,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate draft');
      const data = await res.json();
      setDraftContent(data.draft || '');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDraft(initialType);
  }, [initialType]);

  const handleCopy = () => {
    navigator.clipboard.writeText(draftContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([draftContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${draftType}_${contextPayload.victimName.replace(/\s+/g, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getTypeLabel = () => {
    switch (draftType) {
      case 'op_ed':
        return 'Investigative Press Op-Ed';
      case 'un_submission':
        return 'UN WGEID Urgent Communication';
      case 'legal_remedy':
        return 'High Court Criminal Petition';
      case 'medical_referral':
        return 'Torture Rehabilitation Referral';
      case 'policy_advocacy':
        return 'Policy & Legislative Oversight Brief';
    }
  };

  const getTypeIcon = () => {
    switch (draftType) {
      case 'op_ed':
        return <Newspaper className="w-5 h-5 text-amber-500" />;
      case 'un_submission':
        return <Send className="w-5 h-5 text-teal-400" />;
      case 'legal_remedy':
        return <Scale className="w-5 h-5 text-blue-400" />;
      case 'medical_referral':
        return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'policy_advocacy':
        return <Building2 className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-800 rounded-lg">
              {getTypeIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                  In-Situ AI Drafting Assistant
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-300 font-medium">
                  Grounded in Verified Citations
                </span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {getTypeLabel()} — {contextPayload.victimName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Type Selector & Settings Toolbar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Action Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
            {(
              [
                ['op_ed', 'Press Op-Ed'],
                ['un_submission', 'UN WGEID Appeal'],
                ['legal_remedy', 'Legal Petition'],
                ['medical_referral', 'Medical Referral'],
                ['policy_advocacy', 'Policy Brief'],
              ] as const
            ).map(([type, label]) => (
              <button
                key={type}
                onClick={() => {
                  setDraftType(type);
                  fetchDraft(type);
                }}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  draftType === type
                    ? 'bg-[#006B7D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tone Selector & Regenerate */}
          <div className="flex items-center gap-2">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="bg-white text-slate-800 border border-slate-300 rounded px-2.5 py-1 text-xs focus:ring-1 focus:ring-amber-500"
            >
              <option>Authoritative & Judicial</option>
              <option>Urgent & Humanitarian</option>
              <option>Investigative Journalism</option>
            </select>

            <button
              onClick={() => fetchDraft(draftType)}
              disabled={isLoading}
              className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {/* Editor Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col space-y-3 bg-white">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Pre-filled draft generated by Gemini from verified archival records. You can directly edit the text below:
            </span>
            <span className="font-mono text-slate-600">
              {draftContent.length} characters • {draftContent.split(/\s+/).length} words
            </span>
          </div>

          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-3 bg-slate-50 border border-slate-200 rounded-xl">
              <Loader2 className="w-8 h-8 animate-spin text-[#006B7D]" />
              <span className="text-xs font-medium text-slate-600">
                Synthesizing verified case citations into structured legal/policy draft...
              </span>
            </div>
          ) : (
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              className="w-full flex-1 min-h-[380px] p-4 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#006B7D] leading-relaxed resize-y"
              placeholder="Draft content..."
            />
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
            <span>Grounding:</span>
            {contextPayload.citations.slice(0, 3).map((c, i) => (
              <span key={i} className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">
                {c}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-bold bg-[#006B7D] hover:bg-[#005566] text-white rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.md)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
