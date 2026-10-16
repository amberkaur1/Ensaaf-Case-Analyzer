import React from 'react';
import { DAGEntity, DAGRelationship, CaseData, EvidenceSource } from '../types/evidence';
import { X, User, MapPin, Calendar, FileText, ArrowRight, Shield, ShieldAlert, Award } from 'lucide-react';

interface EntityDetailDrawerProps {
  entity: DAGEntity | null;
  activeCase: CaseData;
  onClose: () => void;
  onSelectCitation: (source: EvidenceSource, badge?: string) => void;
  onSelectConnectedEntity: (entityId: string) => void;
}

export const EntityDetailDrawer: React.FC<EntityDetailDrawerProps> = ({
  entity,
  activeCase,
  onClose,
  onSelectCitation,
  onSelectConnectedEntity,
}) => {
  if (!entity) return null;

  // Find incoming and outgoing edges for this entity
  const outgoingRels = activeCase.relationships.filter((r) => r.source === entity.id);
  const incomingRels = activeCase.relationships.filter((r) => r.target === entity.id);

  // Map linked citations to actual sources
  const linkedSources = entity.linkedCitations
    .map((citeId) => activeCase.sources.find((s) => s.id === citeId || s.code === citeId))
    .filter(Boolean) as EvidenceSource[];

  // Styling based on entity subType
  const getBadgeStyle = () => {
    switch (entity.subType) {
      case 'victim':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'perpetrator':
        return 'bg-slate-800 text-slate-100 border-slate-700';
      case 'intermediary':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'facility':
      case 'checkpoint':
      case 'bridge':
      case 'village':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'abduction':
      case 'execution':
      case 'cbi_judgment':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getIcon = () => {
    if (entity.type === 'person') {
      return <User className="w-5 h-5 text-amber-600" />;
    }
    if (entity.type === 'place') {
      return <MapPin className="w-5 h-5 text-blue-600" />;
    }
    return <Calendar className="w-5 h-5 text-rose-600" />;
  };

  return (
    <div className="absolute top-0 right-0 bottom-0 w-96 bg-white border-l border-slate-200 shadow-2xl z-30 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 text-xs font-bold rounded border ${getBadgeStyle()}`}>
              {entity.subType ? entity.subType.toUpperCase().replace('_', ' ') : entity.type.toUpperCase()}
            </span>
            {entity.organization && (
              <span className="text-xs text-slate-400 font-medium truncate max-w-[160px]">
                {entity.organization}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            {entity.name}
          </h3>
          {entity.gurmukhi && (
            <p className="text-sm font-serif text-amber-300 font-medium">
              ਗੁਰਮੁਖੀ: {entity.gurmukhi}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          title="Close drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="p-5 overflow-y-auto flex-1 space-y-5 text-sm">
        {/* Aliases & Variations */}
        {entity.aliases && entity.aliases.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Aliases & Spellings in Dossiers
            </span>
            <div className="flex flex-wrap gap-1.5">
              {entity.aliases.map((alias, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-mono rounded border border-slate-200"
                >
                  {alias}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Role & Specific Details */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Role & Background
          </span>
          <p className="text-slate-800 font-medium leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
            {entity.role}
            {entity.details && <span className="block text-slate-600 font-normal mt-1">{entity.details}</span>}
          </p>
        </div>

        {/* Contextual Connection */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            Case Network Context
          </span>
          <p className="text-slate-700 leading-relaxed bg-amber-50/60 p-3 rounded-lg border border-amber-200/60 font-serif text-xs">
            {entity.contextualConnection}
          </p>
        </div>

        {/* Directed Relationships */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Connected Graph Edges ({outgoingRels.length + incomingRels.length})
          </span>
          <div className="space-y-2">
            {outgoingRels.map((rel) => {
              const targetNode = activeCase.entities.find((e) => e.id === rel.target);
              return (
                <div
                  key={rel.id}
                  onClick={() => targetNode && onSelectConnectedEntity(targetNode.id)}
                  className="p-2.5 bg-white border border-slate-200 hover:border-amber-400 rounded-lg shadow-2xs cursor-pointer group transition-all"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="px-1.5 py-0.5 bg-slate-100 font-mono text-slate-700 rounded text-[11px] font-bold">
                      → {rel.label.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-medium">
                      {rel.confidence}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 flex items-center justify-between">
                    <span>{targetNode?.name || rel.target}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-[10px] text-slate-400 truncate block mt-0.5 font-mono">
                    Ref: {rel.citation}
                  </span>
                </div>
              );
            })}

            {incomingRels.map((rel) => {
              const sourceNode = activeCase.entities.find((e) => e.id === rel.source);
              return (
                <div
                  key={rel.id}
                  onClick={() => sourceNode && onSelectConnectedEntity(sourceNode.id)}
                  className="p-2.5 bg-white border border-slate-200 hover:border-amber-400 rounded-lg shadow-2xs cursor-pointer group transition-all"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="px-1.5 py-0.5 bg-slate-100 font-mono text-slate-700 rounded text-[11px] font-bold">
                      ← {rel.label.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-medium">
                      {rel.confidence}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 flex items-center justify-between">
                    <span>{sourceNode?.name || rel.source}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span className="text-[10px] text-slate-400 truncate block mt-0.5 font-mono">
                    Ref: {rel.citation}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Linked Primary Evidence Sources */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Linked Primary Evidence & Judgments
          </span>
          <div className="space-y-1.5">
            {linkedSources.length > 0 ? (
              linkedSources.map((src) => (
                <button
                  key={src.id}
                  onClick={() => onSelectCitation(src, src.code)}
                  className="w-full text-left p-2.5 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-lg transition-colors flex items-start gap-2.5 group"
                >
                  <FileText className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-amber-900 block truncate">
                      {src.code}
                    </span>
                    <span className="text-[11px] text-slate-500 truncate block">
                      {src.title}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">
                Corroborated through aggregate judicial proceedings.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
