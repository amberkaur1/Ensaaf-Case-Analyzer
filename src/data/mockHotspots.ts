import { InvestigativeTask, CrimeHotspot } from '../types/evidence';

export const INVESTIGATIVE_TASKS: InvestigativeTask[] = [
  {
    id: 'task-1',
    title: 'Case 1: Baba Hardit Singh Disappearance',
    category: 'unrecorded_custody',
    caseId: 'case-kotli-harchand',
    caseTitle: 'The Kotli Harchand Cluster (1991–1992)',
    victimName: 'Baba Hardit Singh (5121) & Baba Sohan Singh (5120)',
    priority: 'urgent',
    description: 'Verify entity resolution between Inspector Dilbagh Singh (SHO CIA Batala, 8 yrs RI) and ASI Dilbagh Singh (3 yrs RI), and confirm 3-4 months of unrecorded detention at Batala CIA Staff and 25 days at Dhariwal Chowki.',
    assignedTo: 'Entity Resolution & Legal Cell',
    duePeriod: 'Urgent Review',
    status: 'pending_review',
    evidenceBadges: ['[5121-Source 2: Para 1]', '[5121-Source 8: National Courier 2021]']
  },
  {
    id: 'task-2',
    title: 'Case 2: [synthetic-data] Majitha Road Enforced Disappearances (1992)',
    category: 'secret_cremation',
    caseId: 'case-majitha-road',
    caseTitle: '[synthetic-data] Majitha Road Enforced Disappearances (1992)',
    victimName: 'Balkar Singh & Gurmej Singh',
    priority: 'high',
    description: 'Cross-reference police claim of "escape from handcuffs" with municipal firewood supply vouchers listing bodies deposited by Amritsar Rural Special Staff as Lawaris.',
    assignedTo: 'Municipal Archive Liaison',
    duePeriod: 'Priority Review',
    status: 'pending_review',
    evidenceBadges: ['[Cremation Registry Durgiana: Receipt 441]', '[NHRC Mass Cremations Report 2004]']
  },
  {
    id: 'task-3',
    title: 'Case 3: [synthetic-data] Tarn Taran Illegal Custodial Remand Cluster (1991)',
    category: 'ballistics_discrepancy',
    caseId: 'case-tarn-taran',
    caseTitle: '[synthetic-data] Tarn Taran Illegal Custodial Remand Cluster (1991)',
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
    primaryTypology: 'Illegal CIA Detention, Family Hostage-Taking & Extortion Touts',
    keyFacilities: ['CIA Staff Batala', 'Dhariwal Police Chowki', 'Nangal Jhanda Canal Bridge'],
    associatedCaseIds: ['case-kotli-harchand'],
    summary: 'Central hub where Batala CIA Staff detained entire extended families (such as Baba Sohan Singh, Mohinder Singh, and Tarlochan Singh) as hostages to force religious leaders like Baba Hardit Singh to surrender and pay extortion via intermediaries.',
    legalExposure: 'Special CBI Judge Anil Kumar Sood convicted 6 Punjab Police personnel (up to 8 years RI) on Feb 23, 2021.'
  },
  {
    id: 'hotspot-sri-hargobindpur',
    regionName: 'Bhattian Bridge (Sri Hargobindpur River)',
    district: 'Gurdaspur / Batala Border',
    coordinates: { x: 420, y: 220 },
    incidentCount: 318,
    primaryTypology: 'Midnight Bridge Executions & Staged Custodial Escapes',
    keyFacilities: ['Bhattian Bridge', 'Sri Hargobindpur River', 'Dhariwal Police Station'],
    associatedCaseIds: ['case-kotli-harchand'],
    summary: 'On the night of July 2, 1992—one day before IGP Harbans Singh Pannu promised their release—police took Baba Hardit Singh and Baba Sohan Singh from Dhariwal Chowki to Bhattian Bridge, walked them 10-15 meters ahead of the vehicle, and executed them.',
    legalExposure: 'CBI investigation (taken over in 1996) proved police claims of "escape from custody" and "encounter" were fabricated.'
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
    regionName: 'Sri Ganganagar (Rajasthan) Cross-Border Raids',
    district: 'Sri Ganganagar / Rajasthan',
    coordinates: { x: 190, y: 380 },
    incidentCount: 412,
    primaryTypology: 'Interstate Abductions of Farming Relatives (Chak 18-PSD & Chak 7 KNJ)',
    keyFacilities: ['Village Chak 18-PSD (Padampur)', 'Village Chak 7 KNJ (Karanpur)', 'CIA Staff Batala'],
    associatedCaseIds: ['case-kotli-harchand'],
    summary: 'Punjab Police squads crossed state lines into Sri Ganganagar, Rajasthan to abduct farming relatives (like Mohinder Singh from Chak 7 KNJ) and transport them back to Batala CIA Staff as leverage.',
    legalExposure: 'Documented in Proforma GSP2-47 and 2021 Mohali CBI Court convictions.'
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
  { label: 'Extrajudicial Execution', count: 300, percentage: 24, color: '#10B981' },
  { label: 'Illegal Remand & Torture', count: 174, percentage: 14, color: '#F59E0B' }
];

export const DISTRICT_DENSITY = [
  { district: 'Tarn Taran Sub-District', count: 542, max: 600, percentage: 90, color: '#0F172A' },
  { district: 'Amritsar Rural', count: 418, max: 600, percentage: 70, color: '#006B7D' },
  { district: 'Gurdaspur & Batala', count: 288, max: 600, percentage: 48, color: '#475569' }
];
