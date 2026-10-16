import React, { useState } from 'react';
import {
  X,
  FileText,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  Search,
  Maximize2,
  Bookmark,
  CheckCircle2,
  Share2,
  Download
} from 'lucide-react';

interface SplitViewProofModalProps {
  onClose: () => void;
  caseTitle?: string;
  victimName?: string;
}

export const SplitViewProofModal: React.FC<SplitViewProofModalProps> = ({
  onClose,
  caseTitle = 'The Kotli Harchand Cluster (1991–1992)',
  victimName = 'Baba Hardit Singh & Pirthipal Singh',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(522); // 08:42 in seconds
  const totalDuration = 1455; // 24:15 in seconds
  const [activeTab, setActiveTab] = useState<'split' | 'newspaper' | 'audio'>('split');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150 select-none">
      <div className="bg-[#0B0F19] text-white border border-slate-700 w-full max-w-6xl max-h-[94vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="p-4 bg-[#080C14] border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              Dashboard / Case #84-A / Provenance Audit /{' '}
              <strong className="text-teal-400">Evidence Item #EV-89-014</strong>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 font-semibold">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Cryptographic Proof: SHA256-Matched
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Fact Under Evidentiary Inspection Banner */}
        <div className="px-6 py-3 bg-[#121826] border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase font-bold text-amber-300 tracking-wider">
                Fact Under Evidentiary Inspection • Affidavit Cross-Index: § 14(a)
              </span>
            </div>
            <p className="text-sm font-serif italic text-slate-100 font-medium">
              “Subject detained at Tarn Taran & Batala CIA Staff interrogation cells between 14 August 1989 and 2 July 1992.”
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#080C14] border border-teal-800/60 px-3 py-1.5 rounded-lg text-right">
              <span className="text-[9px] uppercase font-mono text-slate-400 block font-bold">
                Corroboration Confidence
              </span>
              <span className="text-xs font-mono font-black text-teal-400">
                98.4% Concordance (2/2 Proofs)
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Segmented Controls */}
        <div className="px-6 py-2 bg-[#0B0F19] border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('split')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                activeTab === 'split'
                  ? 'bg-[#006B7D] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Synchronized Split-View (Press + Oral History)
            </button>
            <button
              onClick={() => setActiveTab('newspaper')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                activeTab === 'newspaper'
                  ? 'bg-[#006B7D] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Focus Punjabi Newspaper Archive (Ajit Daily)
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                activeTab === 'audio'
                  ? 'bg-[#006B7D] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Focus Audio Testimonies (Tape #04)
            </button>
          </div>

          <span className="text-[11px] text-teal-400 font-mono hidden md:inline">
            ● Sync Lock: Active • Bilingual Anchor: Gurmukhi / English
          </span>
        </div>

        {/* Main Content Viewport: 50/50 Split View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#070A10]">
          {/* Left Column: Primary Source 1 - Print Press Ledger */}
          {(activeTab === 'split' || activeTab === 'newspaper') && (
            <div className="bg-[#0B0F19] rounded-xl border border-slate-800 p-4 flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      Primary Source 1 • Print Press Ledger
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    Ajit Daily (ਅਜੀਤ ਅਖ਼ਬਾਰ) — Jalandhar Edition
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    21 August 1989 • Front Page & Col. 3
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#121826] px-2 py-1 rounded border border-slate-800 text-[10px] font-mono text-teal-300">
                  <span>OCR Poly 100%</span>
                </div>
              </div>

              {/* Scanned Microfiche Visual Simulation */}
              <div className="relative aspect-4/3 bg-[#1a1c23] rounded-lg border border-slate-700 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
                {/* Vintage Newspaper Masthead Header */}
                <div className="border-b-2 border-slate-600 pb-2 text-center">
                  <div className="text-xl font-black font-serif tracking-widest text-slate-200 uppercase">
                    ਅਕਾਲੀ ਪੱਤ੍ਰਿਕਾ / ਰੋਜ਼ਾਨਾ ਅਜੀਤ
                  </div>
                  <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                    DAILY AJIT JALANDHAR • VOL. XXXIV NO. 232 • REEL #AJ-89-B
                  </div>
                </div>

                {/* Highlighted OCR Polygon Box */}
                <div className="my-2 p-3 bg-teal-950/80 border-2 border-teal-400/90 rounded relative">
                  <span className="absolute -top-2.5 left-2 px-1.5 py-0.2 bg-teal-600 text-white font-mono text-[9px] font-bold rounded">
                    [!] Polygon #84 • Col 3, Para 2 [p. 4]
                  </span>
                  <p className="text-xs font-serif text-teal-100 font-bold leading-relaxed pt-1">
                    “ਪਿੰਡ ਪੱਟੀ ਤੇ ਕੋਟਲੀ ਹਰਚੰਦ ਦੇ ਨਿਵਾਸੀਆਂ ਨੂੰ ਪੁਲਿਸ ਹਿਰਾਸਤ ਵਿੱਚ ਰੱਖਿਆ ਗਿਆ... ਪਰਿਵਾਰ ਵੱਲੋਂ ਨਜਾਇਜ਼ ਹਿਰਾਸਤ ਖ਼ਿਲਾਫ਼ ਉੱਚ ਅਧਿਕਾਰੀਆਂ ਨੂੰ ਦਰਖਾਸਤਾਂ ਦਿੱਤੀਆਂ ਗਈਆਂ।”
                  </p>
                </div>

                {/* Simulated Columns Text */}
                <div className="grid grid-cols-3 gap-2 opacity-40 text-[8px] font-mono text-slate-400 overflow-hidden h-12">
                  <p>ਪੰਜਾਬ ਵਿੱਚ ਹਾਲਾਤ ਗੰਭੀਰ; ਬੰਦ ਦੇ ਸੱਦੇ ਕਾਰਨ ਕਾਰੋਬਾਰ ਠੱਪ...</p>
                  <p>ਸੁਰੱਖਿਆ ਬਲਾਂ ਵੱਲੋਂ ਸ਼ੱਕੀ ਖੇਤਰਾਂ ਵਿੱਚ ਤਲਾਸ਼ੀ ਮੁਹਿੰਮ ਜਾਰੀ...</p>
                  <p>ਡੀ.ਜੀ.ਪੀ. ਵੱਲੋਂ ਸਰਹੱਦੀ ਚੌਕੀਆਂ ਤੇ ਵਿਸ਼ੇਸ਼ ਗਸ਼ਤ ਦੇ ਹੁਕਮ...</p>
                </div>

                <div className="text-[9px] font-mono text-slate-500 pt-1 border-t border-slate-700 flex justify-between">
                  <span>Negative Frame: Reel #AJ-89-B</span>
                  <span>1200 DPI Optical Ingest</span>
                </div>
              </div>

              {/* Bilingual Concordance Card */}
              <div className="bg-[#121826] p-3.5 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="font-bold text-amber-400 uppercase">Bilingual Concordance Card</span>
                  <span className="text-slate-400">[Ajit 21-Aug-1989 p.4 c.3]</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Original Gurmukhi (ਅਸਲ ਪੰਜਾਬੀ):</span>
                  <p className="text-xs font-serif text-slate-200 bg-black/40 p-2 rounded border border-slate-800 leading-relaxed">
                    “ਪਿੰਡ ਪੱਟੀ ਤੋਂ ਪ੍ਰਿਥੀਪਾਲ ਸਿੰਘ ਨੂੰ ਪੁਲਿਸ ਹਿਰਾਸਤ ਵਿੱਚ ਲਿਆ ਗਿਆ ਅਤੇ ਤਰਨ ਤਾਰਨ ਸੀ.ਆਈ.ਏ. ਸਟਾਫ਼ ਵਿਖੇ ਪੁੱਛਗਿੱਛ ਲਈ ਲਿਆਂਦਾ ਗਿਆ।”
                  </p>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-teal-400 font-mono block font-bold">Certified Legal English Rendering:</span>
                  <p className="text-xs font-serif italic text-teal-100 bg-teal-950/40 p-2 rounded border border-teal-800/50 leading-relaxed">
                    “Pirthipal Singh and co-detainees were taken into police custody from Village Patti and brought directly to the CIA Staff interrogation cell for questioning.”
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Primary Source 2 - Oral Deposition Tape */}
          {(activeTab === 'split' || activeTab === 'audio') && (
            <div className="bg-[#0B0F19] rounded-xl border border-slate-800 p-4 flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      Primary Source 2 • Oral Deposition Tape
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    Tape #04 Survivor Oral History (CCDP Archive)
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Gurmukh Singh (Brother) & Jaswant Kaur (Wife) • FLAC 24-bit / 48kHz
                  </span>
                </div>

                <span className="px-2 py-0.5 bg-teal-900/60 text-teal-300 font-mono text-[10px] rounded border border-teal-700/60 font-bold">
                  Verified Deposition
                </span>
              </div>

              {/* Audio Waveform Player Simulation */}
              <div className="bg-[#121826] p-4 rounded-xl border border-slate-800 space-y-3">
                {/* Waveform Bars */}
                <div className="h-16 flex items-end gap-1 px-2 pt-2 bg-black/40 rounded-lg">
                  {[20, 35, 55, 75, 40, 60, 85, 95, 70, 50, 65, 80, 90, 45, 60, 75, 85, 60, 40, 25, 45, 70, 85, 90, 65, 40, 55, 70, 80, 50, 35, 20].map((h, i) => {
                    const isPassed = i < 16;
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-xs transition-all ${
                          isPassed ? 'bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.5)]' : 'bg-slate-700'
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    );
                  })}
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePlayToggle}
                      className="w-9 h-9 rounded-full bg-[#006B7D] hover:bg-[#005566] text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>

                    <div className="text-xs font-mono text-slate-300">
                      <span className="text-teal-400 font-bold">{formatTime(currentTime)}</span> /{' '}
                      <span className="text-slate-500">{formatTime(totalDuration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">Track: Side A</span>
                    <button
                      onClick={() => setPlaybackSpeed(playbackSpeed === 1.0 ? 1.25 : 1.0)}
                      className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono text-[10px] hover:text-white"
                    >
                      {playbackSpeed}x
                    </button>
                  </div>
                </div>
              </div>

              {/* Whisper ASR Synced Transcription */}
              <div className="bg-[#121826] p-3.5 rounded-lg border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="font-bold text-teal-400 uppercase">
                    Whisper ASR Synced Transcription
                  </span>
                  <span className="text-slate-400">Timestamp: 08:38.20 – 08:49.10 • 97.9% Match</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Spoken Gurmukhi Acoustic Stream (Speaker: Deponent #02):
                  </span>
                  <p className="text-xs font-serif text-teal-200 bg-teal-950/50 p-2.5 rounded border border-teal-800/80 leading-relaxed font-semibold">
                    “ਉਹ ਰਾਤ ਨੂੰ ਆਏ ਸੀ... ਖੇਤੋਂ ਚੁੱਕ ਕੇ ਲੈ ਗਏ... ਸਿੱਧਾ ਤਰਨ ਤਾਰਨ ਸੀ.ਆਈ.ਏ. ਸਟਾਫ਼ ਲੈ ਗਏ, 14 ਅਗਸਤ ਦਾ ਦਿਨ ਸੀ...”
                  </p>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Synchronized English Deposition (Sworn Translator ID #88):
                  </span>
                  <p className="text-xs font-serif italic text-slate-200 bg-black/40 p-2.5 rounded border border-slate-800 leading-relaxed">
                    “They came at night... picked him up from the house... took him straight to the Tarn Taran CIA staff post, it was the 14th of August...”
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer: Immutable Chain of Custody */}
        <div className="p-3.5 bg-[#080C14] border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-[11px]">
              Continuous Audit Trail: Merkle Root <strong className="text-slate-200">0x7f9a...32e18b4</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              ✓ Legal Probative Standard Verified
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#006B7D] hover:bg-[#005566] text-white rounded-md text-xs font-bold transition-colors shadow-xs"
            >
              Close Proof Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
