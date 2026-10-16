import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CaseData, DAGEntity, DAGRelationship } from '../types/evidence';
import { ZoomIn, ZoomOut, RotateCcw, Filter, Search, Layers, Info } from 'lucide-react';

interface EntityGraphDAGProps {
  activeCase: CaseData;
  onSelectEntity: (entity: DAGEntity) => void;
  selectedEntityId: string | null;
}

export const EntityGraphDAG: React.FC<EntityGraphDAGProps> = ({
  activeCase,
  onSelectEntity,
  selectedEntityId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 40, y: 30 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Entities with calculated positions
  const entities = activeCase.entities;
  const relationships = activeCase.relationships;

  // Highlighted connected set
  const activeFocusId = selectedEntityId || hoveredNodeId;

  const connectedEntityIds = useMemo(() => {
    if (!activeFocusId) return new Set<string>();
    const set = new Set<string>([activeFocusId]);
    relationships.forEach((rel) => {
      if (rel.source === activeFocusId) set.add(rel.target);
      if (rel.target === activeFocusId) set.add(rel.source);
    });
    return set;
  }, [activeFocusId, relationships]);

  const filteredEntities = useMemo(() => {
    return entities.filter((ent) => {
      if (filterType !== 'all') {
        if (filterType === 'victims' && ent.subType !== 'victim') return false;
        if (filterType === 'perpetrators' && ent.subType !== 'perpetrator') return false;
        if (filterType === 'intermediaries' && ent.subType !== 'intermediary' && ent.subType !== 'witness_family') return false;
        if (filterType === 'places' && ent.type !== 'place') return false;
        if (filterType === 'events' && ent.type !== 'event') return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ent.name.toLowerCase().includes(q);
        const matchesAlias = ent.aliases?.some((a) => a.toLowerCase().includes(q));
        const matchesGurmukhi = ent.gurmukhi?.includes(q);
        if (!matchesName && !matchesAlias && !matchesGurmukhi) return false;
      }
      return true;
    });
  }, [entities, filterType, searchQuery]);

  // Handle Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only pan if clicking canvas background
    if ((e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).id === 'dag-bg') {
      setIsPanning(true);
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 40, y: 30 });
  };

  // Node rendering according to STRICT SHAPE SYSTEM:
  // People = Circles (Victims Deep Amber, Perpetrators Steel Slate, Intermediaries Forest Green)
  // Places = Rectangles
  // Events/Dates = Diamonds
  const renderNodeShape = (entity: DAGEntity) => {
    const isSelected = entity.id === selectedEntityId;
    const isHovered = entity.id === hoveredNodeId;
    const isDimmed = activeFocusId && !connectedEntityIds.has(entity.id);

    let fill = '#475569';
    let stroke = '#1e293b';

    if (entity.type === 'person') {
      if (entity.subType === 'victim') {
        fill = '#d97706'; // Deep Amber
        stroke = '#92400e';
      } else if (entity.subType === 'perpetrator') {
        fill = '#1e293b'; // Steel Slate
        stroke = '#0f172a';
      } else {
        fill = '#15803d'; // Forest Green
        stroke = '#14532d';
      }
    } else if (entity.type === 'place') {
      fill = '#1d4ed8'; // Indigo Blue
      stroke = '#1e40af';
    } else if (entity.type === 'event') {
      fill = '#e11d48'; // Rose Red
      stroke = '#9f1239';
    }

    const opacity = isDimmed ? 0.25 : 1;
    const strokeWidth = isSelected ? 4 : isHovered ? 3 : 2;
    const strokeColor = isSelected ? '#3b82f6' : stroke;

    if (entity.type === 'person') {
      // CIRCLE SHAPE
      return (
        <g
          opacity={opacity}
          className="cursor-pointer transition-all duration-150"
          onClick={() => onSelectEntity(entity)}
          onMouseEnter={() => setHoveredNodeId(entity.id)}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {isSelected && (
            <circle
              cx={entity.x}
              cy={entity.y}
              r={36}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={3}
              strokeDasharray="4 3"
              className="animate-spin"
            />
          )}
          <circle
            cx={entity.x}
            cy={entity.y}
            r={28}
            fill={fill}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            className="filter drop-shadow-md hover:scale-105 transition-transform"
          />
          <text
            x={entity.x}
            y={entity.y + 4}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="11"
            fontWeight="700"
            pointerEvents="none"
          >
            {entity.subType === 'victim' ? 'VIC' : entity.subType === 'perpetrator' ? 'POL' : 'INT'}
          </text>
          <text
            x={entity.x}
            y={entity.y + 44}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="12"
            fontWeight="700"
            className="font-sans filter drop-shadow-sm"
          >
            {entity.name}
          </text>
          {entity.gurmukhi && (
            <text
              x={entity.x}
              y={entity.y + 58}
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="10"
              fontWeight="600"
              className="font-serif filter drop-shadow-sm"
            >
              {entity.gurmukhi}
            </text>
          )}
        </g>
      );
    } else if (entity.type === 'place') {
      // RECTANGLE SHAPE
      const width = 110;
      const height = 48;
      return (
        <g
          opacity={opacity}
          className="cursor-pointer transition-all duration-150"
          onClick={() => onSelectEntity(entity)}
          onMouseEnter={() => setHoveredNodeId(entity.id)}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {isSelected && (
            <rect
              x={entity.x - width / 2 - 6}
              y={entity.y - height / 2 - 6}
              width={width + 12}
              height={height + 12}
              rx={10}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="4 3"
            />
          )}
          <rect
            x={entity.x - width / 2}
            y={entity.y - height / 2}
            width={width}
            height={height}
            rx={6}
            fill={fill}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            className="filter drop-shadow-md hover:scale-105 transition-transform"
          />
          <text
            x={entity.x}
            y={entity.y - 4}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="11"
            fontWeight="700"
            pointerEvents="none"
          >
            {entity.name.length > 15 ? entity.name.slice(0, 14) + '...' : entity.name}
          </text>
          <text
            x={entity.x}
            y={entity.y + 12}
            textAnchor="middle"
            fill="#bfdbfe"
            fontSize="9"
            fontWeight="500"
            pointerEvents="none"
          >
            [PLACE / {entity.subType?.toUpperCase()}]
          </text>
          {entity.gurmukhi && (
            <text
              x={entity.x}
              y={entity.y + 36}
              textAnchor="middle"
              fill="#93c5fd"
              fontSize="10"
              fontWeight="600"
              className="font-serif filter drop-shadow-sm"
            >
              {entity.gurmukhi}
            </text>
          )}
        </g>
      );
    } else {
      // DIAMOND SHAPE (EVENT / DATE)
      const size = 32;
      const points = `${entity.x},${entity.y - size} ${entity.x + size},${entity.y} ${entity.x},${entity.y + size} ${entity.x - size},${entity.y}`;
      return (
        <g
          opacity={opacity}
          className="cursor-pointer transition-all duration-150"
          onClick={() => onSelectEntity(entity)}
          onMouseEnter={() => setHoveredNodeId(entity.id)}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {isSelected && (
            <polygon
              points={`${entity.x},${entity.y - size - 8} ${entity.x + size + 8},${entity.y} ${entity.x},${entity.y + size + 8} ${entity.x - size - 8},${entity.y}`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="4 3"
            />
          )}
          <polygon
            points={points}
            fill={fill}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            className="filter drop-shadow-md hover:scale-105 transition-transform"
          />
          <text
            x={entity.x}
            y={entity.y + 4}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="10"
            fontWeight="800"
            pointerEvents="none"
          >
            EVENT
          </text>
          <text
            x={entity.x}
            y={entity.y + 44}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="11"
            fontWeight="700"
            className="filter drop-shadow-sm"
          >
            {entity.name}
          </text>
          {entity.gurmukhi && (
            <text
              x={entity.x}
              y={entity.y + 56}
              textAnchor="middle"
              fill="#fca5a5"
              fontSize="10"
              fontWeight="600"
              className="filter drop-shadow-sm font-serif"
            >
              {entity.gurmukhi}
            </text>
          )}
        </g>
      );
    }
  };

  return (
    <div className="relative w-full h-[650px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex flex-col select-none">
      {/* Top Controls Toolbar */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 shadow-xl">
        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search entity or alias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 bg-slate-800 text-white placeholder-slate-400 text-xs rounded-lg border border-slate-700 focus:outline-hidden focus:border-amber-500 w-44"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700 text-xs">
          {(['all', 'victims', 'perpetrators', 'intermediaries', 'places', 'events'] as const).map(
            (t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  filterType === t
                    ? 'bg-amber-600 text-white font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.15, 2.2))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.15, 0.4))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Reset Pan & Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Shape System Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 shadow-xl text-xs space-y-2 max-w-xs">
        <span className="font-bold text-slate-300 uppercase tracking-wider block text-[10px]">
          Strict DAG Shape Ontology
        </span>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600 shrink-0"></span>
            <span>Circle: Victims</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-3 h-3 rounded-full bg-slate-700 border border-slate-600 shrink-0"></span>
            <span>Circle: Perpetrators</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-3 h-3 rounded-full bg-emerald-600 border border-emerald-500 shrink-0"></span>
            <span>Circle: Intermediaries</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-3 h-2.5 rounded-xs bg-blue-600 border border-blue-500 shrink-0"></span>
            <span>Rectangle: Places</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 col-span-2">
            <span className="w-2.5 h-2.5 rotate-45 bg-rose-600 border border-rose-500 shrink-0"></span>
            <span>Diamond: Events & Court Judgments</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-1.5 flex items-center gap-1">
          <Info className="w-3 h-3 text-amber-400 shrink-0" />
          <span>Click any node to open the Case Network context drawer</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] bg-slate-950"
      >
        <svg
          id="dag-bg"
          width="100%"
          height="100%"
          className="w-full h-full"
          style={{ minHeight: '650px' }}
        >
          <defs>
            {/* Arrow Markers for Directed Edges */}
            <marker
              id="arrowhead-default"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
            <marker
              id="arrowhead-highlight"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
            </marker>
          </defs>

          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Draw Directed Edges */}
            {relationships.map((rel) => {
              const sourceNode = entities.find((e) => e.id === rel.source);
              const targetNode = entities.find((e) => e.id === rel.target);
              if (!sourceNode || !targetNode) return null;

              const isEdgeHighlighted =
                activeFocusId === rel.source || activeFocusId === rel.target;
              const isDimmed = activeFocusId && !isEdgeHighlighted;

              const sx = sourceNode.x;
              const sy = sourceNode.y;
              const tx = targetNode.x;
              const ty = targetNode.y;

              // Calculate curved path midpoint
              const mx = (sx + tx) / 2;
              const my = (sy + ty) / 2 - 15;

              return (
                <g key={rel.id} opacity={isDimmed ? 0.15 : 1} className="transition-opacity duration-150">
                  <path
                    d={`M ${sx} ${sy} Q ${mx} ${my} ${tx} ${ty}`}
                    fill="none"
                    stroke={isEdgeHighlighted ? '#f59e0b' : '#475569'}
                    strokeWidth={isEdgeHighlighted ? 2.5 : 1.5}
                    markerEnd={isEdgeHighlighted ? 'url(#arrowhead-highlight)' : 'url(#arrowhead-default)'}
                    className="transition-all"
                  />
                  {/* Edge Label Badge */}
                  <g transform={`translate(${mx}, ${my})`}>
                    <rect
                      x="-42"
                      y="-10"
                      width="84"
                      height="18"
                      rx="4"
                      fill="#0f172a"
                      stroke={isEdgeHighlighted ? '#f59e0b' : '#334155'}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="2"
                      textAnchor="middle"
                      fill={isEdgeHighlighted ? '#fbbf24' : '#94a3b8'}
                      fontSize="9"
                      fontWeight="600"
                      fontFamily="monospace"
                    >
                      {rel.label.replace(/_/g, ' ')}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Draw Nodes */}
            {filteredEntities.map((ent) => (
              <g key={ent.id}>{renderNodeShape(ent)}</g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};
