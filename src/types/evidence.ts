export type EntityType = 'person' | 'place' | 'event';
export type PersonSubtype = 'victim' | 'perpetrator' | 'intermediary' | 'witness_family';
export type PlaceSubtype = 'facility' | 'checkpoint' | 'bridge' | 'village' | 'court';
export type EventSubtype = 'abduction' | 'extortion' | 'custody_transfer' | 'execution' | 'cbi_judgment';

export interface DAGEntity {
  id: string;
  name: string;
  aliases: string[];
  gurmukhi: string;
  type: EntityType;
  subType: PersonSubtype | PlaceSubtype | EventSubtype;
  role: string;
  organization?: string;
  details: string;
  contextualConnection: string;
  linkedCitations: string[];
  x: number;
  y: number;
}

export interface DAGRelationship {
  id: string;
  source: string;
  target: string;
  label: 'abducted_by' | 'held_at' | 'demanded_extortion_from' | 'killed_at' | 'convicted_for' | 'mediated_for' | 'witnessed_by' | 'transferred_to' | 'investigated_by';
  confidence: 'High (Judicial)' | 'High (Eye-Witness)' | 'Corroborated';
  citation: string;
}

export interface CitationRef {
  badge: string;
  sourceId: string;
  paragraph?: string;
  excerptSnippet: string;
}

export interface CaseFact {
  id: string;
  phaseId: 'abduction' | 'detention_extortion' | 'killing_disappearance' | 'legal_proceedings';
  statement: string;
  gurmukhiText?: string;
  verifiedStatus: 'verified' | 'rejected' | 'corrected' | 'pending';
  correctedText?: string;
  correctionNote?: string;
  citations: CitationRef[];
  date: string;
  keyEntities: string[];
}

export interface CasePhase {
  id: 'abduction' | 'detention_extortion' | 'killing_disappearance' | 'legal_proceedings';
  name: string;
  description: string;
  iconName: string;
  facts: CaseFact[];
}

export interface EvidenceSource {
  id: string;
  code: string;
  title: string;
  date: string;
  archive: string;
  classification: string;
  interviewerOrAuthority: string;
  fullExcerpt: string;
  highlightSnippet: string;
  gurmukhiExcerpt?: string;
  audioDuration?: string;
  metadata: {
    recordNumber?: string;
    firNumber?: string;
    policeStation?: string;
    judicialCourt?: string;
    deponent?: string;
    [key: string]: string | undefined;
  };
}

export interface Demographics {
  residence: string;
  residenceLink?: string;
  education: string;
  employment: string;
  married: string;
  religion: string;
  caste: string;
  priorDetentions: string;
  abductionPrecedingDisappearance: string;
  placeOfAbduction: string;
  witnessesToAbduction: string;
  securityOfficialsInformedWitnesses: string;
  securityOfficialsUniformed: string;
  presentedBeforeMagistrate: string;
}

export interface SideBySideComparison {
  id: string;
  title: string;
  leftTitle: string; // e.g. "Police FIR 43/92 Claim"
  leftContent: string;
  leftBadge: string;
  rightTitle: string; // e.g. "Survivor Affidavit & CBI Finding"
  rightContent: string;
  rightBadge: string;
  contradictionAnalysis: string;
}

export interface CaseVictim {
  id: string;
  name: string;
  recordId: string;
  gurmukhi: string;
  village: string;
  age?: number;
  status: string;
  dateAbducted: string;
  dateKilledOrDisappeared: string;
  roleDescription: string;
  photoUrl?: string;
  demographics?: Demographics;
}

export interface CaseData {
  id: string;
  title: string;
  incidentPeriod: string;
  primaryLocation: string;
  victimCount: number;
  legalStatus: string;
  summary: string;
  primaryVictimName: string;
  primaryVictimVillage: string;
  primaryVictimStatus: string;
  primaryVictimAge?: number;
  primaryVictimPhotoUrl?: string;
  demographics?: Demographics;
  victims: CaseVictim[];
  phases: CasePhase[];
  entities: DAGEntity[];
  relationships: DAGRelationship[];
  sources: EvidenceSource[];
  comparisons?: SideBySideComparison[];
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: CitationRef[];
  timestamp: string;
}

export interface ModusOperandiPattern {
  id: string;
  patternTitle: string;
  frequency: string;
  description: string;
  casesInvolved: string[];
  keyTactics: string[];
  legalRelevance: string;
}

export interface PerpetratorOverlap {
  officerName: string;
  rank1991: string;
  station: string;
  implicatedCases: string[];
  actsAlleged: string[];
  status2021: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  caseId: string;
  caseTitle: string;
  title: string;
  location: string;
  type: 'abduction' | 'custody' | 'encounter' | 'judicial';
  description: string;
  citation: string;
}

export interface InvestigativeTask {
  id: string;
  title: string;
  category: 'unrecorded_custody' | 'ballistics_discrepancy' | 'extortion_audit' | 'secret_cremation' | 'witness_verification';
  caseId: string;
  caseTitle: string;
  victimName: string;
  priority: 'high' | 'urgent' | 'medium';
  description: string;
  assignedTo: string;
  duePeriod: string;
  status: 'pending_review' | 'in_progress' | 'verified';
  evidenceBadges: string[];
}

export interface CrimeHotspot {
  id: string;
  regionName: string;
  district: string;
  coordinates: { x: number; y: number }; // Relative SVG positioning
  incidentCount: number;
  primaryTypology: string;
  keyFacilities: string[];
  associatedCaseIds: string[];
  summary: string;
  legalExposure: string;
}

export interface ActionDraft {
  type: 'op_ed' | 'un_submission' | 'legal_remedy' | 'medical_referral';
  title: string;
  recipientOrOutlet: string;
  subject: string;
  body: string;
  citations: string[];
  suggestedActionItems: string[];
}
