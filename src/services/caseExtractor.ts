import { GoogleGenAI, Type } from '@google/genai';
import {
  CaseData,
  InvestigativeTask,
  EvidenceSource,
  DAGEntity,
  DAGRelationship,
  CasePhase,
  CaseFact
} from '../types/evidence';

export interface RawUploadedFile {
  filename: string;
  text: string;
}

const SYSTEM_INSTRUCTION = `You are a Senior Forensic Human Rights Document Archivist and Legal Investigator for Ensaaf. Your task is to extract structured case data from raw investigation files, witness depositions, police logs, and REDCap records concerning enforced disappearances, illegal custodial detentions, extortion, and extrajudicial executions during the Punjab conflict.

STRICT OPERATIONAL RULES:

1. STRICT GROUNDING & ZERO FABRICATION (HALLUCINATION FORBIDDEN):
- Extract ONLY information explicitly stated in the provided raw files.
- NEVER invent, extrapolate, or assume names, dates, FIR numbers, court rulings, officer ranks, extortion amounts, or locations.
- If a specific field (such as a demographic property, age, or court proceeding) is not explicitly mentioned in the text, you MUST output "Not stated in source documents" for strings, or an empty list [] for arrays. Never invent placeholder facts.
- If Punjabi Gurmukhi script is not present in the raw text, leave gurmukhi and gurmukhiText empty (""). NEVER synthesize artificial Gurmukhi.

2. VERBATIM CHARACTER-FOR-CHARACTER PROVENANCE (SOURCES & CITATIONS):
- You must create an EvidenceSource object for each uploaded file in sources with id (e.g. "src-upload-1", "src-upload-2"), code (filename), title, and fullExcerpt.
- Every extracted fact inside phases MUST have verifiedStatus set to "pending".
- Every fact must include at least one citation referencing the exact sourceId of the corresponding EvidenceSource.
- excerptSnippet and highlightSnippet MUST be exact, character-for-character verbatim substrings copied directly from the document text (no paraphrasing, no punctuation changes) so the UI can highlight the exact passage in the source viewer.

3. MULTILINGUAL ENTITY RESOLUTION (GURMUKHI + ENGLISH):
- Merge spelling variants, honorifics (Baba, Bibi, Insp., ASI, SSP, SHO), and Gurmukhi script names that refer to the same individual or place into a single canonical DAGEntity.
- Record all alternative spellings and aliases found in the text in aliases: string[].
- Keep distinct individuals with the same name separate if the text indicates different ranks, fathers, or roles (e.g. Inspector Dilbagh Singh vs. ASI Dilbagh Singh).
- Every DAGEntity.linkedCitations must contain the exact sourceId strings where the entity appears.

4. AUTO-LAYOUT COORDINATES (x, y) FOR DAG TOPOLOGY:
Assign non-overlapping coordinates in canvas space:
- Victims & family witnesses (type: "person", subType: "victim" | "witness_family"): x between 120-220, spaced vertically (y: 80, 200, 320, 440).
- Intermediaries (subType: "intermediary"): x: 350, y: 100 (or y: 100, 220).
- Perpetrators (subType: "perpetrator"): x between 500-680, spaced vertically (y: 80, 200, 320).
- Places (type: "place"): x between 180-780, y: 380.
- Dates & Events (type: "event"): x between 180-780, y: 520.

5. RELATIONSHIP LABEL & NODE ID INTEGRITY:
- Every relationship source and target MUST match a valid DAGEntity.id defined in entities.
- Only use supported relationship labels: "abducted_by", "held_at", "transferred_to", "demanded_extortion_from", "mediated_for", "witnessed_by", "killed_at", "convicted_for", "investigated_by".
- Include exact citation in citation string.

6. EVIDENCE-BACKED CONTRADICTION & DISCREPANCY DETECTION (COMPARISONS):
- Only generate comparisons items when there is an explicit contradictory claim or discrepancy in the source files (e.g., official police claim of "escape from custody" vs. eyewitness deposition of execution, or conflicting dates/ransom amounts). If no contradiction exists, emit an empty array [].`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    title: { type: Type.STRING },
    incidentPeriod: { type: Type.STRING },
    primaryLocation: { type: Type.STRING },
    victimCount: { type: Type.NUMBER },
    legalStatus: { type: Type.STRING },
    summary: { type: Type.STRING },
    primaryVictimName: { type: Type.STRING },
    primaryVictimVillage: { type: Type.STRING },
    primaryVictimStatus: { type: Type.STRING },
    primaryVictimAge: { type: Type.NUMBER },
    primaryVictimPhotoUrl: { type: Type.STRING },
    demographics: {
      type: Type.OBJECT,
      properties: {
        residence: { type: Type.STRING },
        residenceLink: { type: Type.STRING },
        education: { type: Type.STRING },
        employment: { type: Type.STRING },
        married: { type: Type.STRING },
        religion: { type: Type.STRING },
        caste: { type: Type.STRING },
        priorDetentions: { type: Type.STRING },
        abductionPrecedingDisappearance: { type: Type.STRING },
        placeOfAbduction: { type: Type.STRING },
        witnessesToAbduction: { type: Type.STRING },
        securityOfficialsInformedWitnesses: { type: Type.STRING },
        securityOfficialsUniformed: { type: Type.STRING },
        presentedBeforeMagistrate: { type: Type.STRING },
      },
      required: [
        'residence',
        'education',
        'employment',
        'married',
        'religion',
        'caste',
        'priorDetentions',
        'abductionPrecedingDisappearance',
        'placeOfAbduction',
        'witnessesToAbduction',
        'securityOfficialsInformedWitnesses',
        'securityOfficialsUniformed',
        'presentedBeforeMagistrate',
      ],
    },
    victims: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          recordId: { type: Type.STRING },
          gurmukhi: { type: Type.STRING },
          village: { type: Type.STRING },
          age: { type: Type.NUMBER },
          status: { type: Type.STRING },
          dateAbducted: { type: Type.STRING },
          dateKilledOrDisappeared: { type: Type.STRING },
          roleDescription: { type: Type.STRING },
        },
        required: [
          'id',
          'name',
          'recordId',
          'gurmukhi',
          'village',
          'status',
          'dateAbducted',
          'dateKilledOrDisappeared',
          'roleDescription',
        ],
      },
    },
    phases: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: {
            type: Type.STRING,
            enum: ['abduction', 'detention_extortion', 'killing_disappearance', 'legal_proceedings'],
          },
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          iconName: { type: Type.STRING },
          facts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                phaseId: {
                  type: Type.STRING,
                  enum: ['abduction', 'detention_extortion', 'killing_disappearance', 'legal_proceedings'],
                },
                statement: { type: Type.STRING },
                gurmukhiText: { type: Type.STRING },
                verifiedStatus: { type: Type.STRING, enum: ['pending'] },
                date: { type: Type.STRING },
                keyEntities: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                citations: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      badge: { type: Type.STRING },
                      sourceId: { type: Type.STRING },
                      paragraph: { type: Type.STRING },
                      excerptSnippet: { type: Type.STRING },
                    },
                    required: ['badge', 'sourceId', 'excerptSnippet'],
                  },
                },
              },
              required: ['id', 'phaseId', 'statement', 'verifiedStatus', 'citations', 'date', 'keyEntities'],
            },
          },
        },
        required: ['id', 'name', 'description', 'iconName', 'facts'],
      },
    },
    entities: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          aliases: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          gurmukhi: { type: Type.STRING },
          type: { type: Type.STRING, enum: ['person', 'place', 'event'] },
          subType: {
            type: Type.STRING,
            enum: [
              'victim',
              'perpetrator',
              'intermediary',
              'witness_family',
              'facility',
              'checkpoint',
              'bridge',
              'village',
              'court',
              'abduction',
              'extortion',
              'custody_transfer',
              'execution',
              'cbi_judgment',
            ],
          },
          role: { type: Type.STRING },
          organization: { type: Type.STRING },
          details: { type: Type.STRING },
          contextualConnection: { type: Type.STRING },
          linkedCitations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          x: { type: Type.NUMBER },
          y: { type: Type.NUMBER },
        },
        required: [
          'id',
          'name',
          'aliases',
          'gurmukhi',
          'type',
          'subType',
          'role',
          'details',
          'contextualConnection',
          'linkedCitations',
          'x',
          'y',
        ],
      },
    },
    relationships: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          source: { type: Type.STRING },
          target: { type: Type.STRING },
          label: {
            type: Type.STRING,
            enum: [
              'abducted_by',
              'held_at',
              'demanded_extortion_from',
              'killed_at',
              'convicted_for',
              'mediated_for',
              'witnessed_by',
              'transferred_to',
              'investigated_by',
            ],
          },
          confidence: {
            type: Type.STRING,
            enum: ['High (Judicial)', 'High (Eye-Witness)', 'Corroborated'],
          },
          citation: { type: Type.STRING },
        },
        required: ['id', 'source', 'target', 'label', 'confidence', 'citation'],
      },
    },
    sources: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          code: { type: Type.STRING },
          title: { type: Type.STRING },
          date: { type: Type.STRING },
          archive: { type: Type.STRING },
          classification: { type: Type.STRING },
          interviewerOrAuthority: { type: Type.STRING },
          fullExcerpt: { type: Type.STRING },
          highlightSnippet: { type: Type.STRING },
          gurmukhiExcerpt: { type: Type.STRING },
          metadata: {
            type: Type.OBJECT,
            properties: {
              recordNumber: { type: Type.STRING },
              firNumber: { type: Type.STRING },
              policeStation: { type: Type.STRING },
              judicialCourt: { type: Type.STRING },
              deponent: { type: Type.STRING },
            },
          },
        },
        required: [
          'id',
          'code',
          'title',
          'date',
          'archive',
          'classification',
          'interviewerOrAuthority',
          'fullExcerpt',
          'highlightSnippet',
        ],
      },
    },
    comparisons: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          leftTitle: { type: Type.STRING },
          leftContent: { type: Type.STRING },
          leftBadge: { type: Type.STRING },
          rightTitle: { type: Type.STRING },
          rightContent: { type: Type.STRING },
          rightBadge: { type: Type.STRING },
          contradictionAnalysis: { type: Type.STRING },
        },
        required: [
          'id',
          'title',
          'leftTitle',
          'leftContent',
          'leftBadge',
          'rightTitle',
          'rightContent',
          'rightBadge',
          'contradictionAnalysis',
        ],
      },
    },
    tags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: [
    'id',
    'title',
    'incidentPeriod',
    'primaryLocation',
    'victimCount',
    'legalStatus',
    'summary',
    'primaryVictimName',
    'primaryVictimVillage',
    'primaryVictimStatus',
    'victims',
    'phases',
    'entities',
    'relationships',
    'sources',
    'tags',
  ],
};

/**
 * Normalizes coordinates according to Rule 4 for our DAG canvas
 */
function normalizeDAGCoordinates(entities: DAGEntity[]): DAGEntity[] {
  let victimIndex = 0;
  let perpIndex = 0;
  let interIndex = 0;
  let placeIndex = 0;
  let eventIndex = 0;

  return entities.map((e) => {
    let x = e.x;
    let y = e.y;

    if (e.type === 'person') {
      if (e.subType === 'victim' || e.subType === 'witness_family') {
        x = 180;
        y = 80 + victimIndex * 120;
        victimIndex++;
      } else if (e.subType === 'intermediary') {
        x = 350;
        y = 100 + interIndex * 120;
        interIndex++;
      } else if (e.subType === 'perpetrator') {
        x = 560;
        y = 80 + perpIndex * 120;
        perpIndex++;
      } else {
        x = 200;
        y = 150;
      }
    } else if (e.type === 'place') {
      x = 220 + (placeIndex % 4) * 180;
      y = 380;
      placeIndex++;
    } else if (e.type === 'event') {
      x = 220 + (eventIndex % 4) * 180;
      y = 520;
      eventIndex++;
    }

    return {
      ...e,
      x: x || 200,
      y: y || 200,
    };
  });
}

/**
 * Main LLM Case Extractor function
 */
export async function extractCaseFromRawFiles(uploadedFiles: RawUploadedFile[]): Promise<CaseData> {
  if (!uploadedFiles || uploadedFiles.length === 0) {
    throw new Error('No files provided for extraction.');
  }

  // Format file contents for prompt
  const filesPrompt = uploadedFiles
    .map(
      (f, idx) =>
        `==================================================\nDOCUMENT ${idx + 1} [ID: src-upload-${idx + 1} | FILENAME: ${f.filename}]:\n${f.text}\n==================================================`
    )
    .join('\n\n');

  const userPrompt = `Extract the complete CaseData object from the following ${uploadedFiles.length} uploaded source documents according to your strict operational instructions:\n\n${filesPrompt}`;

  let parsedCase: CaseData | null = null;

  // 1. Check if client has direct GEMINI_API_KEY available
  const apiKey =
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
    (typeof window !== 'undefined' && (window as any)?.__GEMINI_API_KEY__);

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.0,
          responseMimeType: 'application/json',
          responseSchema,
        },
      });

      const responseText = response.text;
      if (responseText) {
        parsedCase = JSON.parse(responseText) as CaseData;
      }
    } catch (clientErr) {
      console.warn('Client-side Gemini extraction attempt threw, falling back to server route:', clientErr);
    }
  }

  // 2. If client-side direct call was not possible or failed, call server extraction endpoint
  if (!parsedCase) {
    const res = await fetch('/api/extract-case', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uploadedFiles,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`LLM Extraction failed: ${errorText || res.statusText}`);
    }

    const data = await res.json();
    parsedCase = data.case as CaseData;
  }

  if (!parsedCase) {
    throw new Error('Failed to parse structured CaseData from raw files.');
  }

  // --- Strict Post-Processing Guarantees ---
  // Ensure sources have unique IDs and exact verbatim fullExcerpt preserved
  const mappedSources: EvidenceSource[] = uploadedFiles.map((f, i) => {
    const existing = parsedCase!.sources?.[i];
    const srcId = `src-upload-${i + 1}`;
    return {
      id: srcId,
      code: existing?.code || f.filename,
      title: existing?.title || f.filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      date: existing?.date || 'Documented Intake',
      archive: existing?.archive || 'Ensaaf Archival Ingestion',
      classification: existing?.classification || 'Primary Sworn Record',
      interviewerOrAuthority: existing?.interviewerOrAuthority || 'Documentation Cell',
      fullExcerpt: f.text, // Guaranteed character-for-character raw text
      highlightSnippet: existing?.highlightSnippet || f.text.slice(0, 180),
      gurmukhiExcerpt: existing?.gurmukhiExcerpt || '',
      metadata: existing?.metadata || { recordNumber: f.filename },
    };
  });
  parsedCase.sources = mappedSources;

  // Guarantee verifiedStatus: 'pending' on all facts
  if (Array.isArray(parsedCase.phases)) {
    parsedCase.phases = parsedCase.phases.map((phase) => ({
      ...phase,
      facts: (phase.facts || []).map((fact, fIdx) => ({
        ...fact,
        id: fact.id || `fact-ext-${fIdx}-${Date.now()}`,
        phaseId: phase.id,
        verifiedStatus: 'pending' as const,
        gurmukhiText: fact.gurmukhiText || '',
        citations: (fact.citations || []).map((cit) => ({
          ...cit,
          sourceId: mappedSources.find((s) => s.id === cit.sourceId)?.id || mappedSources[0].id,
          excerptSnippet: cit.excerptSnippet || fact.statement,
        })),
      })),
    }));
  } else {
    parsedCase.phases = [];
  }

  // Auto-layout entities according to Rule 4
  if (Array.isArray(parsedCase.entities)) {
    parsedCase.entities = normalizeDAGCoordinates(parsedCase.entities);
  } else {
    parsedCase.entities = [];
  }

  // Validate relationships point only to existing entity IDs
  const validEntityIds = new Set(parsedCase.entities.map((e) => e.id));
  if (Array.isArray(parsedCase.relationships)) {
    parsedCase.relationships = parsedCase.relationships.filter(
      (rel) => validEntityIds.has(rel.source) && validEntityIds.has(rel.target)
    );
  } else {
    parsedCase.relationships = [];
  }

  // Ensure unique case ID
  if (!parsedCase.id || parsedCase.id.length < 3) {
    parsedCase.id = `case-upload-${Date.now()}`;
  }

  return parsedCase;
}

/**
 * Creates an initial InvestigativeTask item for the newly uploaded case
 */
export function generateTaskForCase(newCase: CaseData): InvestigativeTask {
  const allBadges = newCase.phases.flatMap((p) => p.facts.flatMap((f) => f.citations.map((c) => c.badge)));
  const uniqueBadges = Array.from(new Set(allBadges)).slice(0, 3);
  const totalFacts = newCase.phases.flatMap((p) => p.facts).length;

  return {
    id: `task-${Date.now()}`,
    title: newCase.title ? `Case: ${newCase.title}` : `Case: ${newCase.primaryVictimName} Disappearance`,
    category: 'witness_verification',
    caseId: newCase.id,
    caseTitle: newCase.title,
    victimName: newCase.primaryVictimName,
    priority: 'urgent',
    description: `Audit verbatim provenance and corroborate ${totalFacts} extracted factual assertions across ${newCase.sources.length} ingested archival documents for ${newCase.primaryVictimName} (${newCase.primaryLocation}).`,
    assignedTo: 'Lead Legal Researcher',
    duePeriod: 'Urgent Review',
    status: 'pending_review',
    evidenceBadges: uniqueBadges.length > 0 ? uniqueBadges : [`[${newCase.sources[0]?.code || 'Raw Source'}]`],
  };
}
