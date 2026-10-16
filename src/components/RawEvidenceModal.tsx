import React, { useState } from 'react';
import { EvidenceSource } from '../types/evidence';
import { X, FileText, CheckCircle2, Shield, Calendar, MapPin, Copy, Check, ExternalLink, Bookmark } from 'lucide-react';

interface RawEvidenceModalProps {
  source: EvidenceSource | null;
  onClose: () => void;
  citationBadge?: string;
}

export const RawEvidenceModal: React.FC<RawEvidenceModalProps> = ({ source, onClose, citationBadge }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'excerpt' | 'metadata' | 'gurmukhi'>('excerpt');

  if (!source) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Citation: ${citationBadge || source.code}\nSource: ${source.title}\nArchive: ${source.archive}\nExcerpt: "${source.fullExcerpt}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to split fullExcerpt and highlight snippet
  const renderHighlightedExcerpt = () => {
    if (!source.highlightSnippet) {
      return <p className="leading-relaxed text-slate-800 text-sm whitespace-pre-line">{source.fullExcerpt}</p>;
    }

    const snippet = source.highlightSnippet.trim();
    const full = source.fullExcerpt;
    const index = full.toLowerCase().indexOf(snippet.toLowerCase());

    if (index === -1) {
      return (
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded text-amber-950 text-sm">
            <span className="font-semibold block mb-1 flex items-center gap-1.5 text-amber-900">
              <Bookmark className="w-4 h-4 text-amber-600" /> Key Supporting Citation Assertion:
            </span>
            &ldquo;{source.highlightSnippet}&rdquo;
          </div>
          <p className="leading-relaxed text-slate-800 text-sm whitespace-pre-line">{source.fullExcerpt}</p>
        </div>
      );
    }

    const before = full.slice(0, index);
    const highlighted = full.slice(index, index + snippet.length);
    const after = full.slice(index + snippet.length);

    return (
      <div className="leading-relaxed text-slate-800 text-sm whitespace-pre-line font-serif">
        {before}
        <mark className="bg-amber-200/80 text-amber-950 font-medium px-1.5 py-0.5 rounded border border-amber-400 shadow-xs">
          {highlighted}
        </mark>
        {after}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between bg-slate-900 text-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-xs font-bold font-mono rounded tracking-wide">
                {citationBadge || source.code}
              </span>
              <span className="text-xs text-slate-300 font-medium px-2 py-0.5 bg-slate-800 rounded">
                {source.classification}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
              {source.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                {source.archive}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {source.date}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2">
          <button
            onClick={() => setActiveTab('excerpt')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'excerpt'
                ? 'border-amber-600 text-amber-800 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Raw Primary Excerpt (Highlighted)
          </button>
          <button
            onClick={() => setActiveTab('metadata')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'metadata'
                ? 'border-amber-600 text-amber-800 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            Custodial & Legal Metadata
          </button>
          {source.gurmukhiExcerpt && (
            <button
              onClick={() => setActiveTab('gurmukhi')}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'gurmukhi'
                  ? 'border-amber-600 text-amber-800 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="font-mono text-xs text-amber-600 font-bold">ਗੁਰ</span>
              Gurmukhi Source Text
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-white space-y-4">
          {activeTab === 'excerpt' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span className="italic">
                  Target assertion highlighted in <span className="text-amber-800 font-semibold bg-amber-100 px-1 py-0.5 rounded">amber</span> below:
                </span>
                <span className="text-slate-400">Interviewer/Authority: {source.interviewerOrAuthority}</span>
              </div>
              <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-lg">
                {renderHighlightedExcerpt()}
              </div>
            </div>
          )}

          {activeTab === 'metadata' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-xs font-medium text-slate-500 block">Repository Archive</span>
                  <span className="text-sm font-semibold text-slate-800">{source.archive}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-xs font-medium text-slate-500 block">Classification</span>
                  <span className="text-sm font-semibold text-slate-800">{source.classification}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-xs font-medium text-slate-500 block">Recorded Date</span>
                  <span className="text-sm font-semibold text-slate-800">{source.date}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-xs font-medium text-slate-500 block">Recording Officer / Authority</span>
                  <span className="text-sm font-semibold text-slate-800">{source.interviewerOrAuthority}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Detailed Case Record Attributes
                </h4>
                <div className="divide-y divide-slate-200 text-xs">
                  {Object.entries(source.metadata).map(([key, value]) => (
                    <div key={key} className="py-2 flex justify-between">
                      <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-mono font-medium text-slate-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gurmukhi' && source.gurmukhiExcerpt && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-amber-600 text-white text-xs font-bold rounded">
                    ਗੁਰਮੁਖੀ ਮੂਲ ਦਸਤਾਵੇਜ਼
                  </span>
                  <span className="text-xs text-amber-900 font-medium">Original Vernacular Field Excerpt</span>
                </div>
                <p className="text-base text-slate-900 leading-relaxed font-serif">
                  {source.gurmukhiExcerpt}
                </p>
              </div>
              <div className="text-xs text-slate-500 italic p-2 bg-slate-50 rounded">
                Note for Legal Researchers: Gurmukhi testimonies are transcribed verbatim from survivor audio interviews and rural Gram Panchayat affidavits to preserve linguistic nuances and village-level legal terms.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Cryptographically Verified Judicial Provenance Chain</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-md shadow-xs flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Citation & Excerpt
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-md shadow-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
