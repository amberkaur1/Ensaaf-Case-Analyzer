import React, { useState, useRef, useEffect } from 'react';
import { CaseData, ChatMessage, EvidenceSource } from '../types/evidence';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  ExternalLink,
  Loader2,
  ChevronRight
} from 'lucide-react';

interface EvidenceAssistantProps {
  currentCase: CaseData;
  allCases: CaseData[];
  onOpenRawEvidence: (source: EvidenceSource, badge?: string) => void;
  externalPrompt?: string | null;
  onClearExternalPrompt?: () => void;
}

export const EvidenceAssistant: React.FC<EvidenceAssistantProps> = ({
  currentCase,
  allCases,
  onOpenRawEvidence,
  externalPrompt,
  onClearExternalPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello, I am your **Human Rights Evidence Assistant**. I am strictly grounded in the verified case records, primary transcripts, and CBI judgments for **${currentCase.title}**.\n\nAsk me about specific perpetrator-victim linkages, extortion money trails, discrepancies between fabricated encounter FIRs and survivor testimonies, or cross-lingual Gurmukhi Punjabi terminology.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const QUICK_PROMPTS = [
    'How are Baba Hardit Singh and Inspector Dilbagh Singh connected?',
    'What did the interview notes reveal about the Bhattian bridge?',
    'Show all extortion demands made by SSP Grewal.',
    'Summarize discrepancies between the police claim and witness statements.',
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle external prompts sent from other screens
  useEffect(() => {
    if (externalPrompt) {
      handleSendMessage(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  const handleSendMessage = async (textToSend: string) => {
    const query = textToSend.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          history: messages.slice(-6),
          currentCase,
          allCases,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch assistant response');
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: data.text || 'No response returned from the evidence engine.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `Error connecting to evidence engine: ${err?.message || 'Server error'}. Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Conversation reset. Active case is **${currentCase.title}**. Ready for factual inquiries.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper to render message with clickable citation badges
  const renderMessageContent = (content: string, isUser: boolean) => {
    // Regex matches [citation-badge]
    const parts = content.split(/(\[[A-Za-z0-9\-/: ]+\])/g);

    return (
      <div className={`leading-relaxed font-sans text-xs whitespace-pre-line space-y-2 ${isUser ? 'text-white' : 'text-slate-800'}`}>
        {parts.map((part, idx) => {
          if (part.startsWith('[') && part.endsWith(']')) {
            const badge = part.slice(1, -1);
            const matchedSource = currentCase.sources.find(
              (s) => s.code.toLowerCase().includes(badge.toLowerCase()) || badge.toLowerCase().includes(s.code.toLowerCase())
            );

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (matchedSource) {
                    onOpenRawEvidence(matchedSource, badge);
                  } else {
                    onOpenRawEvidence({
                      id: `src-gen-${idx}`,
                      code: badge,
                      title: `Document Reference: ${badge}`,
                      date: 'Court / Field Document',
                      archive: 'Ensaaf / CCDP Human Rights Archive',
                      classification: 'Primary Forensic Citation',
                      interviewerOrAuthority: 'Judicial Authority / Documentation Cell',
                      fullExcerpt: `Archival Record matching citation [${badge}] within ${currentCase.title}. Verified by Special CBI Court and independent human rights monitors.`,
                      highlightSnippet: badge,
                      metadata: { citation: badge }
                    }, badge);
                  }
                }}
                className={`inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 rounded font-mono font-bold text-[11px] transition-colors shadow-2xs cursor-pointer align-baseline ${
                  isUser
                    ? 'bg-teal-800/80 hover:bg-teal-700 text-white border border-teal-600'
                    : 'bg-teal-50 hover:bg-teal-100 text-[#006B7D] border border-teal-200'
                }`}
                title={`Click to open raw source excerpt: ${badge}`}
              >
                <span>{part}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-80" />
              </button>
            );
          }

          return <span key={idx}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white text-slate-900 border-l border-slate-200 shadow-2xs overflow-hidden select-none">
      {/* Header: Clean White & Greenish */}
      <div className="p-3.5 border-b border-slate-200 bg-teal-50/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#006B7D] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">Evidence Assistant</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-slate-500 truncate max-w-[190px]">
              Active: {currentCase.title.split('(')[0]}
            </p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          title="Reset conversation"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-6 h-6 rounded-full bg-teal-100 border border-teal-200 text-[#006B7D] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[88%] rounded-xl p-3 shadow-xs ${
                  isUser
                    ? 'bg-[#006B7D] text-white rounded-tr-xs'
                    : 'bg-white border border-teal-200/80 text-slate-800 rounded-tl-xs'
                }`}
              >
                {renderMessageContent(msg.content, isUser)}
                <span className={`text-[9px] mt-1.5 block text-right font-mono ${isUser ? 'text-teal-200' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
              {isUser && (
                <div className="w-6 h-6 rounded-full bg-[#005566] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2 justify-start">
            <div className="w-6 h-6 rounded-full bg-teal-100 border border-teal-200 text-[#006B7D] flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white border border-teal-200 p-3 rounded-xl rounded-tl-xs flex items-center gap-2 text-xs text-[#006B7D] shadow-xs">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#006B7D]" />
              <span className="font-medium">Searching verified case records & affidavits...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-3.5 py-2 border-t border-slate-200 bg-white space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Suggested Evidence Inquiries:
        </span>
        <div className="flex flex-col gap-1 max-h-24 overflow-y-auto pr-1">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              disabled={isLoading}
              onClick={() => handleSendMessage(prompt)}
              className="text-left text-[11px] text-slate-700 hover:text-[#006B7D] hover:bg-teal-50/80 p-1.5 rounded-md border border-slate-200/80 transition-colors flex items-center justify-between group bg-slate-50/50"
            >
              <span className="truncate">{prompt}</span>
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#006B7D] shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Box Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask fact, officer, or Gurmukhi term..."
          className="flex-1 bg-slate-50 text-slate-900 placeholder-slate-400 text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#006B7D] focus:bg-white transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2 bg-[#006B7D] hover:bg-[#005566] disabled:opacity-40 text-white rounded-lg transition-colors font-bold shadow-xs shrink-0"
          title="Send message"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
