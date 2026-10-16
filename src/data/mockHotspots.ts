import { InvestigativeTask, CrimeHotspot } from '../types/evidence';

export const INVESTIGATIVE_TASKS: InvestigativeTask[] = [
  {
    id: 'task-1',
    title: 'Audit Unrecorded Custody & Daily Diary Omission in Batala CIA',
    category: 'unrecorded_custody',
    caseId: 'case-kotli-harchand',
    caseTitle: 'The Kotli Harchand Cluster (1991–1992)',
    victimName: 'Baba Hardit Singh & Baba Sohan Singh',
    priority: 'urgent',
    description: 'Verify deponent statement confirming victims were detained from March 6 to July 2, 1992 without statutory Roznamcha entry or judicial magistrate production.',
    assignedTo: 'Legal Verification Cell',
    duePeriod: 'Urgent Review',
    status: 'pending_review',
    evidenceBadges: ['[5121-Source 2: Para 1]', '[CCDP/01147: Details of Occurrence]']
  },
  {
    id: 'task-2',
    title: 'Cross-Examine Bhattian Bridge FIR 43/92 Ballistic Discrepancy',
    category: 'ballistics_discrepancy',
    caseId: 'case-kotli-harchand',
    caseTitle: 'The Kotli Harchand Cluster (1991–1992)',
    victimName: 'Baba Hardit Singh, Baba Sohan Singh, Mohinder Singh',
    priority: 'high',
    description: 'Compare Inspector Dilbagh Singh’s staged encounter claim (crossfire ambush) against CBI special court finding establishing planted weapons and point-blank trajectories.',
    assignedTo: 'Forensic Ballistics Analyst',
    duePeriod: 'Priority Review',
    status: 'in_progress',
    evidenceBadges: ['[5121-Source 1: FIR 43/92]', '[CBI Special Court Mohali 2021]']
  },
  {
    id: 'task-3',
    title: 'Track ₹45,000 Extortion Payment Conduit via Mahant Prem Singh',
    category: 'extortion_audit',
    caseId: 'case-kotli-harchand',
    caseTitle: 'The Kotli Harchand Cluster (1991–1992)',
    victimName: 'Jaswant Kaur (Deponent / Spouse)',
    priority: 'urgent',
    description: 'Audit sworn deposition confirming land and family gold jewelry sale to satisfy ransom demand initiated by SSP Grewal and conveyed through local dera tout.',
    assignedTo: 'Financial Provenance Unit',
    duePeriod: 'Urgent Review',
    status: 'pending_review',
    evidenceBadges: ['[5121-Source 2: Para 2]']
  },
  {
    id: 'task-4',
    title: 'Reconcile Durgiana Mandir Secret Cremation Log (Receipt 441)',
    category: 'secret_cremation',
    caseId: 'case-majitha-road',
    caseTitle: 'Majitha Road Enforced Disappearances (1992)',
    victimName: 'Balkar Singh & Gurmej Singh',
    priority: 'high',
    description: 'Cross-reference police claim of "escape from handcuffs" with municipal firewood supply vouchers listing bodies deposited by Amritsar Rural Special Staff as Lawaris.',
    assignedTo: 'Municipal Archive Liaison',
    duePeriod: 'Priority Review',
    status: 'pending_review',
    evidenceBadges: ['[Cremation Registry Durgiana: Receipt 441]', '[NHRC Mass Cremations Report 2004]']
  },
  {
    id: 'task-5',
    title: 'Verify Harike Pattan Point-Blank Wound Trajectories',
    category: 'ballistics_discrepancy',
    caseId: 'case-tarn-taran',
    caseTitle: 'Tarn Taran Illegal Custodial Remand Cluster (1991)',
    victimName: 'Pritam Singh & Jagtar Singh',
    priority: 'medium',
    description: 'Audit forensic evidence demonstrating victims were immobilized and shot at close range after 46 days of unrecorded remand at PS Sadar Tarn Taran.',
    assignedTo: 'Judicial Review Cell',
    duePeriod: 'Verification Pending',
    status: 'pending_review',
    evidenceBadges: ['[CBI Charge-sheet RC-7(S)/98]', '[CCDP/TT-041: Custody Log]']
  }
];

export const CRIME_HOTSPOTS: CrimeHotspot[] = [
  {
    id: 'hotspot-batala',
    regionName: 'Batala Sub-Division & CIA Complex',
    district: 'Gurdaspur',
    coordinates: { x: 380, y: 190 },
    incidentCount: 842,
    primaryTypology: 'Unrecorded CIA Interrogation & Extortion Touts',
    keyFacilities: ['CIA Staff Batala', 'Dhariwal Police Chowki', 'Kotli Harchand Canal Axis'],
    associatedCaseIds: ['case-kotli-harchand'],
    summary: 'Central node of enforced disappearances in the Majha belt. Over 800 individuals documented as held in unrecorded detention without Daily Diary entries, subjected to roller torture, and extorted through local religious touts.',
    legalExposure: 'Inspector Dilbagh Singh and 4 officers convicted to Life Imprisonment by Special CBI Court Mohali (2021).'
  },
  {
    id: 'hotspot-sri-hargobindpur',
    regionName: 'Bhattian Bridge & Beas Embankment',
    district: 'Gurdaspur / Batala Border',
    coordinates: { x: 420, y: 220 },
    incidentCount: 318,
    primaryTypology: 'Waterway Staged Encounters (Fake Ambush Claims)',
    keyFacilities: ['Bhattian Bridge', 'Beas Canal Syphon', 'PS Sri Hargobindpur'],
    associatedCaseIds: ['case-kotli-harchand'],
    summary: 'Isolated canal bridge crossing repeatedly utilized by Batala police squads between 1:00 AM and 4:00 AM to simulate terrorist ambushes. Victims transferred from holding chowkis were gunned down and claimed as killed in crossfire.',
    legalExposure: 'FIR No. 43/92 proved completely fabricated by forensic investigation and CBI testimony.'
  },
  {
    id: 'hotspot-majitha',
    regionName: 'Majitha Highway & Beas Center',
    district: 'Amritsar Rural',
    coordinates: { x: 320, y: 210 },
    incidentCount: 654,
    primaryTypology: 'Transit Point Snatching & Fabricated Escape Claims',
    keyFacilities: ['Kathunangal Bus Corridor', 'Beas Interrogation Center', 'Durgiana Mandir Crematorium'],
    associatedCaseIds: ['case-majitha-road'],
    summary: 'Systematic targeting of rural youth along transit stops. Standardized police defense claimed detainees broke custody during midnight search operations, followed by immediate cremation as unidentified corpses.',
    legalExposure: 'Flagged under Supreme Court Punjab Mass Cremations Inquiry docket Pb-120.'
  },
  {
    id: 'hotspot-tarn-taran',
    regionName: 'Tarn Taran Sadar & Harike Pattan',
    district: 'Tarn Taran',
    coordinates: { x: 290, y: 270 },
    incidentCount: 978,
    primaryTypology: 'Prolonged Secret Custodial Remand & Waterway Shootouts',
    keyFacilities: ['PS Sadar Tarn Taran', 'Patti Cordon Posts', 'Harike Pattan Barrage'],
    associatedCaseIds: ['case-tarn-taran'],
    summary: 'Highest concentration of unrecorded remands in South Majha. Victims detained up to 50 days in unacknowledged detention cells before staged confrontations along the Sutlej-Beas river confluence.',
    legalExposure: 'CBI Special Court charges framed under IPC 302/364 against sub-divisional police command.'
  },
  {
    id: 'hotspot-abohar',
    regionName: 'Abohar-Rajasthan Feeder Border',
    district: 'Ferozepur / Rajasthan Border',
    coordinates: { x: 190, y: 380 },
    incidentCount: 412,
    primaryTypology: 'Interstate Transfer & Border Canal Staged Encounters',
    keyFacilities: ['Abohar Transit Checkpoint', 'Indira Gandhi Canal Feeder', 'Hindumalkot Outpost'],
    associatedCaseIds: ['case-custom'],
    summary: 'Cross-border corridor where detainees from central Punjab districts were transferred into remote desert canal stretches of Rajasthan to evade High Court habeas corpus bailiff inspections.',
    legalExposure: 'Multi-state jurisdiction used intentionally to delay legal accountability.'
  }
];

export const ENSAAF_MACRO_METRICS = {
  totalDocumented: '5,315',
  verifiedExtrajudicialExecutions: '2,940',
  enforcedDisappearances: '2,375',
  villagesDocumented: '1,720',
  cremationSitesCataloged: '3,842 corpses',
  convictionsSecured: '58 police officers'
};

export const WORKSTATION_KPIS = {
  corpusIntegrity: {
    count: '1,248',
    label: 'Verified Records Under Consensus',
    status: '100% Chain-of-Custody',
    subtext: 'No unresolved disputes'
  },
  legalSubmissions: {
    count: '38',
    label: 'Active Petitions & UN Submissions',
    status: '4 Ready for Filing',
    subtext: 'High Court of Punjab & Haryana'
  },
  triagePriority: {
    count: '14',
    label: 'Case Reviews Awaiting Sign-off',
    status: '3 Depositions Uploaded Today',
    subtext: 'Affidavits signed'
  }
};

export const VIOLATION_TYPOLOGY_BREAKDOWN = [
  { label: 'Enforced Disappearance', count: 774, percentage: 62, color: '#006B7D' },
  { label: 'Extrajudicial Cremation', count: 300, percentage: 24, color: '#10B981' },
  { label: 'Torture / Custodial Death', count: 174, percentage: 14, color: '#F59E0B' }
];

export const DISTRICT_DENSITY = [
  { district: 'Tarn Taran Sub-District', count: 542, max: 600, percentage: 90, color: '#0F172A' },
  { district: 'Amritsar Rural', count: 418, max: 600, percentage: 70, color: '#006B7D' },
  { district: 'Gurdaspur & Batala', count: 288, max: 600, percentage: 48, color: '#475569' }
];
