import React, { useState } from 'react';
import { CaseData, InvestigativeTask, CrimeHotspot } from '../types/evidence';
import { INVESTIGATIVE_TASKS, CRIME_HOTSPOTS, ENSAAF_MACRO_METRICS } from '../data/mockHotspots';
import {
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Filter,
  BarChart3,
  Layers,
  Sparkles,
  ChevronRight,
  Shield,
  FileText,
  PieChart,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

interface LandingTriageViewProps {
  cases: CaseData[];
  tasks?: InvestigativeTask[];
  onSelectCase: (caseId: string) => void;
  onSelectHotspot: (hotspot: CrimeHotspot) => void;
  onSelectTask: (task: InvestigativeTask) => void;
}

export const LandingTriageView: React.FC<LandingTriageViewProps> = ({
  cases,
  tasks,
  onSelectCase,
  onSelectHotspot,
  onSelectTask,
}) => {
  const currentTasks = tasks || INVESTIGATIVE_TASKS;
  const [districtFilter, setDistrictFilter] = useState('All Districts');
  const [typologyFilter, setTypologyFilter] = useState('All Crime Types');
  const [hoveredHotspot, setHoveredHotspot] = useState<CrimeHotspot | null>(null);
  const [rightViewMode, setRightViewMode] = useState<'trends' | 'map'>('trends');

  const filteredHotspots = CRIME_HOTSPOTS.filter((h) => {
    if (districtFilter !== 'All Districts' && h.district !== districtFilter) return false;
    if (typologyFilter !== 'All Crime Types' && !h.primaryTypology.toLowerCase().includes(typologyFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in duration-150">
      {/* 50 / 50 Split Layout Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[620px]">
        {/* Left 50%: Task Review Queue */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#006B7D]">
                  Assigned Case Review Queue
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {currentTasks.length} Verification Tasks Pending
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight mt-0.5">
                Investigative Task Queue
              </h2>
            </div>
            <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-bold font-mono">
              Action Required
            </span>
          </div>

          {/* Tasks List Scroll Area */}
          <div className="p-5 overflow-y-auto flex-1 divide-y divide-slate-100 space-y-4">
            {currentTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onSelectTask(task)}
                className="pt-4 first:pt-0 group cursor-pointer transition-all"
              >
                <div className="p-4 rounded-xl border border-slate-200 group-hover:border-[#006B7D] group-hover:bg-teal-50/30 transition-all shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          task.priority === 'urgent'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="text-xs text-slate-500 font-mono font-semibold">
                        {task.duePeriod}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#006B7D] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Review Case <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#006B7D] transition-colors leading-snug">
                    {task.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-serif leading-relaxed line-clamp-2">
                    {task.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                      Victim: {task.victimName}
                    </span>
                    <div className="flex items-center gap-1">
                      {task.evidenceBadges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 bg-slate-100 text-slate-700 font-mono text-[10px] rounded border border-slate-200"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer info */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between px-5">
            <span>Click any task to enter the 3-View Case Dossier</span>
            <span className="font-mono text-slate-700 font-semibold">
              Verified Records: 100% Corroborated
            </span>
          </div>
        </div>

        {/* Right 50%: Switchable Violation Trends & Demographics OR Interactive Map */}
        <div className="bg-[#080C14] rounded-xl border border-slate-800 shadow-xl flex flex-col overflow-hidden text-white">
          {/* Header & View Switcher */}
          <div className="p-4 border-b border-slate-800/80 bg-[#0B0F19] flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  EVIDENTIARY TOPOLOGY & ANALYSIS
                </span>
                <span className="px-1.5 py-0.2 bg-teal-500/20 text-teal-300 text-[9px] font-mono rounded">
                  Majha Belt 1989–92
                </span>
              </div>
              <h2 className="text-sm font-bold text-white tracking-tight mt-0.5">
                {rightViewMode === 'trends' ? 'Macro Patterns & Violation Trends' : 'Mapping Crimes Against Humanity'}
              </h2>
            </div>

            {/* Segmented Switcher */}
            <div className="flex items-center gap-1 bg-[#121826] p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setRightViewMode('trends')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  rightViewMode === 'trends'
                    ? 'bg-[#006B7D] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Violation Trends</span>
              </button>
              <button
                onClick={() => setRightViewMode('map')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  rightViewMode === 'map'
                    ? 'bg-[#006B7D] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Interactive Map</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Violation Trends & Demographics (Inspired by Screenshot 3) */}
          {rightViewMode === 'trends' && (
            <div className="flex-1 p-5 overflow-y-auto space-y-6 flex flex-col justify-between">
              {/* Donut Chart & Legend */}
              <div className="bg-[#0B0F19] p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <PieChart className="w-3.5 h-3.5 text-teal-400" />
                    Violation Typology Breakdown
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">1,248 Total Documented Cases</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
                  {/* SVG Donut */}
                  <div className="relative w-40 h-40 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {/* Enforced Disappearance: 62% (offset 0) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#006B7D"
                        strokeWidth="16"
                        strokeDasharray="148 238.7"
                        strokeDashoffset="0"
                        className="hover:stroke-[#00899e] transition-colors cursor-pointer"
                        onClick={() => onSelectHotspot(CRIME_HOTSPOTS[0])}
                      />
                      {/* Secret Cremation: 24% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#10B981"
                        strokeWidth="16"
                        strokeDasharray="57.3 238.7"
                        strokeDashoffset="-148"
                        className="hover:stroke-[#34d399] transition-colors cursor-pointer"
                        onClick={() => onSelectHotspot(CRIME_HOTSPOTS[1] || CRIME_HOTSPOTS[0])}
                      />
                      {/* Torture / Custodial Death: 14% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#F59E0B"
                        strokeWidth="16"
                        strokeDasharray="33.4 238.7"
                        strokeDashoffset="-205.3"
                        className="hover:stroke-[#fbbf24] transition-colors cursor-pointer"
                        onClick={() => onSelectHotspot(CRIME_HOTSPOTS[0])}
                      />
                    </svg>

                    {/* Donut Center Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xl font-black text-white font-mono leading-none">1,248</span>
                      <span className="text-[9px] text-slate-400 font-mono tracking-tight mt-1">TOTAL CASES</span>
                    </div>
                  </div>

                  {/* Legend Cards */}
                  <div className="space-y-2.5 flex-1 min-w-[200px]">
                    <div
                      onClick={() => onSelectHotspot(CRIME_HOTSPOTS[0])}
                      className="p-2 bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-slate-800 hover:border-teal-500/50 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#006B7D]" />
                        <span className="text-xs text-slate-200 font-medium">Enforced Disappearance</span>
                      </div>
                      <span className="text-xs font-bold text-teal-300 font-mono">62% (774)</span>
                    </div>

                    <div
                      onClick={() => onSelectHotspot(CRIME_HOTSPOTS[1] || CRIME_HOTSPOTS[0])}
                      className="p-2 bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-xs text-slate-200 font-medium">Extrajudicial Cremation</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-300 font-mono">24% (300)</span>
                    </div>

                    <div
                      onClick={() => onSelectHotspot(CRIME_HOTSPOTS[0])}
                      className="p-2 bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span className="text-xs text-slate-200 font-medium">Torture / Custodial Death</span>
                      </div>
                      <span className="text-xs font-bold text-amber-300 font-mono">14% (174)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* District Geographic Density Bars (from Screenshot 3) */}
              <div className="space-y-3 bg-[#0B0F19] p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    District Geographic Density
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Verified Count</span>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Tarn Taran */}
                  <div
                    onClick={() => onSelectHotspot(CRIME_HOTSPOTS.find(h => h.id === 'hotspot-sri-hargobindpur') || CRIME_HOTSPOTS[0])}
                    className="group cursor-pointer space-y-1"
                  >
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 group-hover:text-amber-300 font-medium transition-colors">
                        Tarn Taran Sub-District
                      </span>
                      <span className="font-mono font-bold text-white">542 cases</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 group-hover:bg-teal-400 rounded-full transition-all" style={{ width: '88%' }} />
                    </div>
                  </div>

                  {/* Amritsar Rural */}
                  <div
                    onClick={() => onSelectHotspot(CRIME_HOTSPOTS.find(h => h.id === 'hotspot-batala') || CRIME_HOTSPOTS[0])}
                    className="group cursor-pointer space-y-1"
                  >
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 group-hover:text-amber-300 font-medium transition-colors">
                        Amritsar Rural
                      </span>
                      <span className="font-mono font-bold text-white">418 cases</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 group-hover:bg-emerald-400 rounded-full transition-all" style={{ width: '68%' }} />
                    </div>
                  </div>

                  {/* Gurdaspur & Batala */}
                  <div
                    onClick={() => onSelectHotspot(CRIME_HOTSPOTS[0])}
                    className="group cursor-pointer space-y-1"
                  >
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 group-hover:text-amber-300 font-medium transition-colors">
                        Gurdaspur & Batala
                      </span>
                      <span className="font-mono font-bold text-white">288 cases</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 group-hover:bg-amber-400 rounded-full transition-all" style={{ width: '46%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Callout Card (from Screenshot 3) */}
              <div className="bg-[#121A2A] border border-blue-900/60 p-4 rounded-xl space-y-2.5">
                <div className="flex items-center gap-2 text-teal-300">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Interactive Analytical Corridors Available
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Click any pattern, district, or hotspot to open the interactive Trend Deep-Dive & Remedial Action Hub. Cross-reference illegal cremations with municipal register receipts.
                </p>
                <button
                  onClick={() => onSelectHotspot(CRIME_HOTSPOTS[0])}
                  className="w-full py-2 bg-gradient-to-r from-teal-700 to-[#006B7D] hover:from-teal-600 hover:to-[#005566] text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Explore Trend Deep-Dive (Majha Cluster)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Interactive Regional Hotspot Map */}
          {rightViewMode === 'map' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Filter Dropdowns */}
              <div className="p-3 bg-[#0B0F19] border-b border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="bg-[#121826] text-slate-200 border border-slate-700 rounded px-2.5 py-1 text-xs focus:outline-hidden focus:border-amber-400"
                >
                  <option>All Districts</option>
                  <option>Gurdaspur</option>
                  <option>Amritsar Rural</option>
                  <option>Tarn Taran</option>
                  <option>Ferozepur / Rajasthan Border</option>
                </select>

                <select
                  value={typologyFilter}
                  onChange={(e) => setTypologyFilter(e.target.value)}
                  className="bg-[#121826] text-slate-200 border border-slate-700 rounded px-2.5 py-1 text-xs focus:outline-hidden focus:border-amber-400"
                >
                  <option>All Crime Types</option>
                  <option value="unrecorded">Unrecorded Custody</option>
                  <option value="waterway">Waterway Encounters</option>
                  <option value="transit">Transit Snatching</option>
                </select>
              </div>

              {/* Counter Banner */}
              <div className="bg-black/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="font-black text-[#FACC15] tracking-tight">
                  At least {ENSAAF_MACRO_METRICS.totalDocumented} Documented Disappearances
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Click any beacon to open trend</span>
              </div>

              {/* Interactive SVG Dark Map */}
              <div className="relative flex-1 min-h-[360px] bg-[#070A10] p-4 flex items-center justify-center select-none overflow-hidden">
                <svg
                  viewBox="0 0 600 450"
                  className="w-full h-full max-h-[380px]"
                  style={{ filter: 'drop-shadow(0px 0px 8px rgba(0,0,0,0.8))' }}
                >
                  {/* Pakistan Border Dotted Line */}
                  <path
                    d="M 120 40 L 140 100 L 160 160 L 170 210 L 180 260 L 150 330 L 130 410"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <text x="70" y="240" fill="#475569" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                    PAKISTAN BORDER
                  </text>

                  {/* District Boundary Polygons - Clickable */}
                  {/* Gurdaspur / Batala */}
                  <polygon
                    points="260,80 430,70 470,160 400,240 290,210 240,140"
                    fill="#0F172A"
                    stroke="#1E293B"
                    strokeWidth="1.5"
                    className="hover:fill-[#1E293B] cursor-pointer transition-colors"
                    onClick={() => onSelectHotspot(CRIME_HOTSPOTS[0])}
                  />
                  <text
                    x="360"
                    y="140"
                    fill="#94A3B8"
                    fontSize="11"
                    fontWeight="bold"
                    className="cursor-pointer hover:fill-amber-400 transition-colors"
                    onClick={() => onSelectHotspot(CRIME_HOTSPOTS[0])}
                  >
                    GURDASPUR / BATALA
                  </text>

                  {/* Amritsar / Majitha */}
                  <polygon
                    points="210,180 290,210 330,260 270,300 180,260"
                    fill="#0F172A"
                    stroke="#1E293B"
                    strokeWidth="1.5"
                    className="hover:fill-[#1E293B] cursor-pointer transition-colors"
                    onClick={() => onSelectHotspot(CRIME_HOTSPOTS[0])}
                  />
                  <text
                    x="220"
                    y="235"
                    fill="#94A3B8"
                    fontSize="11"
                    fontWeight="bold"
                    className="cursor-pointer hover:fill-amber-400 transition-colors"
                    onClick={() => onSelectHotspot(CRIME_HOTSPOTS[0])}
                  >
                    AMRITSAR RURAL
                  </text>

                  {/* Tarn Taran */}
                  <polygon
                    points="220,270 330,260 380,310 320,350 200,320"
                    fill="#0F172A"
                    stroke="#1E293B"
                    strokeWidth="1.5"
                    className="hover:fill-[#1E293B] cursor-pointer transition-colors"
                    onClick={() => onSelectHotspot(CRIME_HOTSPOTS.find(h => h.id === 'hotspot-sri-hargobindpur') || CRIME_HOTSPOTS[0])}
                  />
                  <text
                    x="250"
                    y="315"
                    fill="#94A3B8"
                    fontSize="11"
                    fontWeight="bold"
                    className="cursor-pointer hover:fill-amber-400 transition-colors"
                    onClick={() => onSelectHotspot(CRIME_HOTSPOTS.find(h => h.id === 'hotspot-sri-hargobindpur') || CRIME_HOTSPOTS[0])}
                  >
                    TARN TARAN
                  </text>

                  {/* Ferozepur / Rajasthan Feeder */}
                  <polygon
                    points="160,330 250,340 280,420 160,430"
                    fill="#0F172A"
                    stroke="#1E293B"
                    strokeWidth="1.5"
                    className="hover:fill-[#1E293B] cursor-pointer transition-colors"
                    onClick={() => onSelectHotspot(CRIME_HOTSPOTS[0])}
                  />
                  <text x="180" y="390" fill="#64748B" fontSize="10" fontWeight="bold">
                    FEROZEPUR / ABOHAR
                  </text>

                  {/* Major Waterways (Beas River Axis) */}
                  <path
                    d="M 450 110 Q 380 200 350 280 Q 320 330 260 350"
                    fill="none"
                    stroke="#1E3A8A"
                    strokeWidth="2.5"
                  />
                  <text x="390" y="200" fill="#3B82F6" fontSize="9" fontWeight="600">
                    Beas River Axis
                  </text>

                  {/* Interactive Hotspot Beacons */}
                  {filteredHotspots.map((hotspot) => {
                    const isHovered = hoveredHotspot?.id === hotspot.id;
                    return (
                      <g
                        key={hotspot.id}
                        className="cursor-pointer group"
                        onClick={() => onSelectHotspot(hotspot)}
                        onMouseEnter={() => setHoveredHotspot(hotspot)}
                        onMouseLeave={() => setHoveredHotspot(null)}
                      >
                        {/* Glowing ping wave */}
                        <circle
                          cx={hotspot.coordinates.x}
                          cy={hotspot.coordinates.y}
                          r={isHovered ? 20 : 14}
                          fill="none"
                          stroke="#FACC15"
                          strokeWidth="1.5"
                          opacity={isHovered ? 0.9 : 0.4}
                          className="animate-ping"
                        />
                        {/* Core yellow beacon */}
                        <circle
                          cx={hotspot.coordinates.x}
                          cy={hotspot.coordinates.y}
                          r={isHovered ? 9 : 7}
                          fill="#FACC15"
                          stroke="#000000"
                          strokeWidth="2"
                        />
                        {/* Location label */}
                        <text
                          x={hotspot.coordinates.x}
                          y={hotspot.coordinates.y - 12}
                          textAnchor="middle"
                          fill="#F8FAFC"
                          fontSize="10"
                          fontWeight="bold"
                          className="group-hover:fill-[#FACC15] transition-colors"
                        >
                          {hotspot.regionName.split('&')[0].trim()}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Inset locator badge */}
                <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-700 p-2 rounded text-[10px] text-slate-300 pointer-events-none">
                  <span className="font-bold text-amber-400 block">Punjab Grid</span>
                  <span>Coordinates: 31.6° N, 75.3° E</span>
                </div>

                {/* Hovered Hotspot Floating Card */}
                {hoveredHotspot && (
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0B0F19]/95 border border-amber-500/60 p-3 rounded-lg shadow-2xl flex items-center justify-between text-xs animate-in fade-in duration-150">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {hoveredHotspot.regionName}
                        </span>
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 font-mono text-[10px] rounded">
                          {hoveredHotspot.incidentCount} Cataloged Crimes
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        Typology: {hoveredHotspot.primaryTypology}
                      </p>
                    </div>
                    <button
                      onClick={() => onSelectHotspot(hoveredHotspot)}
                      className="px-3 py-1.5 bg-[#FACC15] hover:bg-amber-400 text-slate-950 font-bold rounded text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Explore Trend & Sources</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom bar */}
              <div className="p-3 bg-[#0B0F19] border-t border-slate-800 text-xs flex items-center justify-between px-5">
                <span className="text-slate-400">
                  Click any hotspot or district to open macro sources & action hub
                </span>
                <button
                  onClick={() => onSelectHotspot(CRIME_HOTSPOTS[0])}
                  className="text-[#FACC15] hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Trend Deep-Dive</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
