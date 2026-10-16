import {
  CaseData,
  ModusOperandiPattern,
  PerpetratorOverlap,
  TimelineEvent,
  EvidenceSource
} from '../types/evidence';

export const SOURCES_KOTLI: EvidenceSource[] = [
  {
    id: 'src-5121-s2',
    code: '5121-Source 2: Para 1',
    title: 'CCDP Survivor Field Notes & Sworn Affidavit of Jaswant Kaur',
    date: '1997-04-12 (Interview Notes) & 1999-02-14 (Affidavit)',
    archive: 'Committee for Coordination on Disappearances in Punjab (CCDP) Archive',
    classification: 'Survivor Field Interview & Sworn Affidavit',
    interviewerOrAuthority: 'Human Rights Documentation Team / Jaswant Kaur (Spouse)',
    fullExcerpt: `Deponent Jaswant Kaur w/o Baba Hardit Singh, aged 54 years, resident of Village Kotli Harchand, Tehsil Batala, District Gurdaspur states on solemn affirmation:
On 6th March 1992, at approximately 10:30 AM, my husband Baba Hardit Singh along with Baba Sohan Singh (Record 5120) and Mohinder Singh was intercepted near the Nangal Jhanda canal bridge by two unmarked white Maruti gypsies and a police truck. The raiding party was commanded by Inspector Dilbagh Singh, In-charge CIA Staff Batala, accompanied by SI Bhupinder Singh. My husband was forcibly pulled down from the tractor, blindfolded with his own parna (turban cloth), and thrown into the gypsy. When bystanders inquired, Inspector Dilbagh Singh threatened them with automatic weapons and shouted that anyone asking questions would meet the same fate.

They were transported directly to CIA Staff Batala where they were kept in solitary cell without entry in the Daily Diary (Roznamcha). On 12th March 1992, Mahant Prem Singh approached our family stating that SSP Gurnek Singh Grewal and Inspector Dilbagh Singh demanded ₹1,00,000 for sparing Baba Hardit Singh's life. We sold family jewelry and four acres of wheat crop to deliver ₹45,000 to Mahant Prem Singh at his dera. Despite payment, Baba Hardit Singh was never produced in any magistrate court.`,
    highlightSnippet: 'My husband Baba Hardit Singh along with Baba Sohan Singh was intercepted near the Nangal Jhanda canal bridge by two unmarked white Maruti gypsies... commanded by Inspector Dilbagh Singh, In-charge CIA Staff Batala.',
    gurmukhiExcerpt: 'ਮਿਤੀ 6 ਮਾਰਚ 1992 ਨੂੰ ਮੇਰੇ ਪਤੀ ਬਾਬਾ ਹਰਦੀਤ ਸਿੰਘ ਅਤੇ ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਨੂੰ ਨੰਗਲ ਝੰਡਾ ਨਹਿਰੀ ਪੁਲ ਨੇੜਿਓਂ ਬਟਾਲਾ ਸੀ.ਆਈ.ਏ. ਇੰਸਪੈਕਟਰ ਦਿਲਬਾਗ ਸਿੰਘ ਅਤੇ ਸਾਥੀ ਪੁਲਿਸ ਵਾਲਿਆਂ ਨੇ ਅਗਵਾ ਕਰ ਲਿਆ ਸੀ।',
    metadata: {
      recordNumber: '5121',
      deponent: 'Jaswant Kaur (Wife of Baba Hardit Singh)',
      village: 'Kotli Harchand',
      policeStation: 'CIA Staff Batala / PS Sri Hargobindpur'
    }
  },
  {
    id: 'src-5121-ccdp-01147',
    code: 'CCDP/01147: Details of Occurrence',
    title: 'CCDP Detailed Custody & Encounter Investigation Report',
    date: '2001-08-20',
    archive: 'CCDP Verification Dossier Collection (Case Ref 01147)',
    classification: 'Independent Fact-Finding Field Dossier',
    interviewerOrAuthority: 'CCDP Legal Cell Investigation Team',
    fullExcerpt: `CCDP INCIDENT DOSSIER: Case Ref 01147 / Kotli Harchand Cluster
Victims Identified: Baba Hardit Singh (Record 5121), Baba Sohan Singh (Record 5120), Mohinder Singh (5122), Tarlochan Singh (5123).
Custodial Log Analysis: The victims were initially detained at CIA Staff Batala from March 6 to early June 1992. When inquiries began mounting from the village Panchayat, the detainees were shifted to Dhariwal Police Chowki under the cover of night. Multiple custodial witnesses corroborated seeing Baba Hardit Singh limping severely due to roller torture and wooden beam pressure (ghotna) applied during interrogation by SI Bhupinder Singh and SI Harminder Singh.

On the night between 1st and 2nd July 1992, the detainees were bundled into a canvas-topped police vehicle and driven to the Beas River embankment near Bhattian Bridge, Sri Hargobindpur. Firing was opened by police personnel under Inspector Dilbagh Singh. Next morning, police released a fabricated press release claiming four 'unidentified militants' were killed in a fierce encounter while attempting to ambushed a police patrolling party. Bodies were secretly transferred to Batala Municipal cremation ground without post-mortem identification or handing over remains to relatives.`,
    highlightSnippet: 'The victims were initially detained at CIA Staff Batala... shifted to Dhariwal Police Chowki... driven to Bhattian Bridge, Sri Hargobindpur. Firing was opened by police personnel under Inspector Dilbagh Singh.',
    gurmukhiExcerpt: 'ਪੀੜਤਾਂ ਨੂੰ ਬਟਾਲਾ ਸੀਆਈਏ ਤੋਂ ਧਾਰੀਵਾਲ ਚੌਕੀ ਵਿੱਚ ਬਦਲਿਆ ਗਿਆ ਅਤੇ 2 ਜੁਲਾਈ 1992 ਦੀ ਰਾਤ ਨੂੰ ਭੱਟੀਆਂ ਪੁਲ ਸ਼੍ਰੀ ਹਰਗੋਬਿੰਦਪੁਰ ਕੋਲ ਝੂਠਾ ਮੁਕਾਬਲਾ ਬਣਾ ਕੇ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ।',
    metadata: {
      recordNumber: 'CCDP/01147',
      incidentSite: 'Bhattian Bridge, Sri Hargobindpur',
      holdingFacility: 'CIA Staff Batala / Dhariwal Chowki',
      method: 'Staged encounter after prolonged illegal custody'
    }
  },
  {
    id: 'src-cbi-judgment-2021',
    code: 'CBI Special Court Mohali 2021',
    title: 'Judgment in State (CBI) vs Dilbagh Singh & Ors (RC 3(S)/97)',
    date: '2021-02-23',
    archive: 'Special Judge for CBI Cases, Mohali Judicial Records',
    classification: 'Final Judicial Ruling & Sentencing Order',
    interviewerOrAuthority: 'Special Judge for CBI Cases, Mohali (Punjab)',
    fullExcerpt: `IN THE COURT OF SPECIAL JUDGE, CBI, PUNJAB, SAS NAGAR (MOHALI)
Case No: RC 3(S)/97/SIU-V/CBI/ND - Judgment delivered on 23.02.2021.
Accused:
1. Dilbagh Singh, then Inspector / In-charge CIA Staff Batala
2. Gurnek Singh Grewal, then SSP Batala (proceedings abated upon death)
3. Bhupinder Singh, then Sub-Inspector CIA Batala
4. Harminder Singh, then Sub-Inspector CIA Batala
5. Rakesh Kumar Sharma, then Sub-Inspector Dhariwal Chowki

FINDING OF FACT: The prosecution has proved beyond shadow of reasonable doubt that Baba Hardit Singh, Baba Sohan Singh, and co-victims were picked up without authority of law on 06.03.1992 and kept in unrecorded illegal custody at Batala CIA Staff and Dhariwal Chowki. The defense claim that the deceased were armed militants killed in retaliatory fire during crossfire at Bhattian Bridge is an absolute fabrication designed to cover extrajudicial liquidation. The recovery memos for AK-47 rifles were planted and backdated. The court hereby sentences convict Dilbagh Singh and co-accused to Life Imprisonment under Sections 302/364/120-B of the Indian Penal Code.`,
    highlightSnippet: 'The court hereby sentences convict Dilbagh Singh and co-accused to Life Imprisonment under Sections 302/364/120-B of the Indian Penal Code, concluding the defense claim of crossfire at Bhattian Bridge was an absolute fabrication.',
    gurmukhiExcerpt: 'ਮੋਹਾਲੀ ਸੀਬੀਆਈ ਦੀ ਵਿਸ਼ੇਸ਼ ਅਦਾਲਤ ਨੇ 23 ਫਰਵਰੀ 2021 ਨੂੰ ਇੰਸਪੈਕਟਰ ਦਿਲਬਾਗ ਸਿੰਘ ਅਤੇ ਹੋਰ ਪੁਲਿਸ ਅਧਿਕਾਰੀਆਂ ਨੂੰ ਉਮਰ ਕੈਦ ਦੀ ਸਜ਼ਾ ਸੁਣਾਈ।',
    metadata: {
      caseNumber: 'RC 3(S)/97/SIU-V/CBI/ND',
      judicialCourt: 'Special Judge CBI Court, Mohali',
      sections: 'IPC 302, 364, 120-B, 201',
      outcome: 'Conviction & Life Imprisonment'
    }
  },
  {
    id: 'src-5120-s1',
    code: '5120-Source 1: Panchayat Resolution',
    title: 'Resolution of Village Panchayat Kotli Harchand & Joint Deposition',
    date: '1992-04-05',
    archive: 'Punjab Human Rights Commission & Ensaaf Archive',
    classification: 'Village Council Sworn Resolution',
    interviewerOrAuthority: 'Sarpanch & Village Elders, Kotli Harchand',
    fullExcerpt: `Resolution passed unanimously by Gram Panchayat Kotli Harchand on 5th April 1992:
We, the elected representatives and villagers of Kotli Harchand, affirm that Baba Sohan Singh (62 yrs) and Baba Hardit Singh (58 yrs) are peaceful, religious elders responsible for the local Gurdwara administration with no criminal history. On 06-03-1992, they were abducted by Batala CIA police. A deputation of 25 elders met SSP Batala who demanded through Mahant Prem Singh that the village withdraw all complaints. We affirm that neither person was an absconder nor carrying arms.`,
    highlightSnippet: 'Baba Sohan Singh and Baba Hardit Singh are peaceful, religious elders responsible for the local Gurdwara administration with no criminal history... abducted by Batala CIA police.',
    gurmukhiExcerpt: 'ਗਰਾਮ ਪੰਚਾਇਤ ਕੋਟਲੀ ਹਰਚੰਦ ਨੇ ਮਤਾ ਪਾਸ ਕਰਕੇ ਤਸਦੀਕ ਕੀਤਾ ਕਿ ਬਾਬਾ ਹਰਦੀਤ ਸਿੰਘ ਅਤੇ ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਧਾਰਮਿਕ ਸ਼ਖਸੀਅਤਾਂ ਸਨ ਜਿਨ੍ਹਾਂ ਦਾ ਕੋਈ ਅਪਰਾਧਕ ਰਿਕਾਰਡ ਨਹੀਂ ਸੀ।',
    metadata: {
      recordNumber: '5120',
      deponent: 'Gram Panchayat Kotli Harchand'
    }
  },
  {
    id: 'src-fir-43-92',
    code: '5121-Source 1: FIR 43/92 Extract',
    title: 'FIR No. 43/92 Police Station Sri Hargobindpur (Fabricated Encounter FIR)',
    date: '1992-07-02',
    archive: 'Batala Police District Crime Records (Ex. PW-4/B in CBI Court)',
    classification: 'Police FIR Document (Found Fabricated by Court)',
    interviewerOrAuthority: 'Inspector Dilbagh Singh, Batala CIA Staff',
    fullExcerpt: `FIRST INFORMATION REPORT No. 43/92 under Section 307 IPC, 25/54/59 Arms Act, 3/4/5 TADA:
Complainant: Inspector Dilbagh Singh, Incharge CIA Staff Batala.
Narrative: While patrolling the canal bank near Bhattian Bridge with SI Bhupinder Singh and police party in connection with anti-terrorist operations, four suspected terrorists fired indiscriminately from sugarcane fields at the police gypsy. In self-defense, police party returned fire. After exchange ceased, four male bodies were discovered with two AK-47 rifles and cartridges. One person fled towards the riverbed.
[JUDICIAL NOTE: CBI Special Court found that this FIR was manufactured after victims were already executed in illegal custody].`,
    highlightSnippet: 'While patrolling canal bank near Bhattian Bridge... returned fire in self-defense... four male bodies discovered [found fabricated by CBI Court].',
    gurmukhiExcerpt: 'ਥਾਣਾ ਸ੍ਰੀ ਹਰਗੋਬਿੰਦਪੁਰ ਵਿਖੇ ਦਰਜ ਕੀਤੀ ਐਫ.ਆਈ.ਆਰ ਨੰਬਰ 43/92 ਨੂੰ ਸੀ.ਬੀ.ਆਈ ਵਿਸ਼ੇਸ਼ ਅਦਾਲਤ ਨੇ ਪੂਰੀ ਤਰ੍ਹਾਂ ਜਾਅਲੀ ਅਤੇ ਮਨਘੜਤ ਕਰਾਰ ਦਿੱਤਾ।',
    metadata: {
      firNumber: '43/92',
      policeStation: 'Sri Hargobindpur',
      officer: 'Inspector Dilbagh Singh'
    }
  }
];

export const INITIAL_CASES: CaseData[] = [
  {
    id: 'case-kotli-harchand',
    title: 'The Kotli Harchand Cluster (1991–1992)',
    incidentPeriod: '1991–1992 (Abduction March 6, 1992; Execution July 2, 1992; Judgment 2021)',
    primaryLocation: 'Kotli Harchand, Batala, Gurdaspur, Punjab',
    victimCount: 6,
    legalStatus: 'CBI Convictions 2021 (Special CBI Court Mohali - Life Imprisonment)',
    summary: 'Enforced disappearance and extrajudicial liquidation of Baba Hardit Singh (Record 5121), Baba Sohan Singh (5120), Mohinder Singh (5122), and Tarlochan Singh (5123) by Batala CIA Staff. Victims were illegally abducted, subjected to extortion demands brokered by Mahant Prem Singh, detained in unrecorded custody at Dhariwal Chowki and CIA Batala, and executed in a staged encounter at Bhattian Bridge.',
    primaryVictimName: 'Baba Hardit Singh (Record 5121)',
    primaryVictimVillage: 'Kotli Harchand, Batala, Gurdaspur',
    primaryVictimStatus: 'Killed in Staged Encounter / CBI Convictions Secured',
    primaryVictimAge: 58,
    primaryVictimPhotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop', // Historical portrait framing
    demographics: {
      residence: 'Kotli Harchand, Batala, Gurdaspur',
      residenceLink: 'data.ensaaf.org/village/00251500',
      education: 'Gurmat / Vernacular Punjabi',
      employment: 'Granthi / Agriculture',
      married: 'Yes (Spouse: Jaswant Kaur)',
      religion: 'Sikh, Amritdhari',
      caste: 'Jat',
      priorDetentions: 'No',
      abductionPrecedingDisappearance: 'Yes, March 6, 1992',
      placeOfAbduction: 'Nangal Jhanda Canal Bridge, Batala',
      witnessesToAbduction: 'Jaswant Kaur (wife) and village farmers',
      securityOfficialsInformedWitnesses: 'No (Threatened with automatic weapons)',
      securityOfficialsUniformed: 'Yes, Batala CIA Staff contingent',
      presentedBeforeMagistrate: 'No (Held in unrecorded solitary confinement)'
    },
    comparisons: [
      {
        id: 'comp-1',
        title: 'Bhattian Bridge Shootout: Police FIR Claim vs Verified CBI Ruling',
        leftTitle: 'Official Police Account (FIR 43/92 PS Sri Hargobindpur)',
        leftBadge: 'Inspector Dilbagh Singh / State Narrative',
        leftContent: 'On the night of 02-07-1992, while police gypsy was patrolling near Bhattian canal bridge, four armed terrorists opened indiscriminate fire from sugarcane reeds. Police returned fire in self-defense. Four unidentified male bodies were recovered with two Chinese AK-47 rifles and 50 empty cartridges.',
        rightTitle: 'Verified Judicial Finding (Special CBI Court Mohali, 2021)',
        rightBadge: 'Judicial Precedent / RC 3(S)/97',
        rightContent: 'Victims had been in continuous illegal custody of CIA Batala and Dhariwal Chowki since 06-03-1992. The defense claim of crossfire is an absolute fabrication manufactured to conceal extrajudicial liquidation. Chinese AK-47 weapons were planted with erased serial numbers, and victims were shot at close range while physically immobilized.',
        contradictionAnalysis: 'Completely irreconcilable. Forensic trajectory examination and custodial witnesses establish that the victims were executed in police custody 118 days after unrecorded abduction, completely disproving the spontaneous ambush theory.'
      },
      {
        id: 'comp-2',
        title: 'Custodial Intermediary: Extortion Pipeline vs Police Denial',
        leftTitle: 'Police Defense Deposition (Denial of Intermediaries)',
        leftBadge: 'SSP Grewal & Batala Police Statements',
        leftContent: 'Police officials categorically denied any knowledge of Mahant Prem Singh acting on their behalf, claiming no communications or financial demands were ever made to the family of Baba Hardit Singh.',
        rightTitle: 'Survivor Sworn Deposition & Property Sale Deeds',
        rightBadge: 'Jaswant Kaur Affidavit (PW-3)',
        rightContent: 'Mahant Prem Singh approached family on 12-03-1992 demanding ₹1,00,000 for SSP Grewal and Dilbagh Singh. Family sold 4 acres of maturing wheat harvest and family gold jewellery, delivering ₹45,000 cash at the dera. Receipts and village witness testimony corroborated transaction.',
        contradictionAnalysis: 'Direct contradiction establishing predatory extortion enterprise. The Special CBI Court accepted the financial evidence, finding the police tout network guilty of conspiracy under IPC Section 120-B.'
      }
    ],
    tags: ['Batala CIA', 'Bhattian Bridge', 'Extortion Touts', 'CBI Conviction 2021', 'Fake Encounter'],
    victims: [
      {
        id: 'v-5121',
        name: 'Baba Hardit Singh',
        recordId: 'Record 5121',
        gurmukhi: 'ਬਾਬਾ ਹਰਦੀਤ ਸਿੰਘ',
        village: 'Kotli Harchand',
        age: 58,
        status: 'Killed in Staged Encounter (02-07-1992)',
        dateAbducted: '1992-03-06',
        dateKilledOrDisappeared: '1992-07-02',
        roleDescription: 'Respected Granthi and religious elder of Kotli Harchand Gurdwara; principal victim in CBI trial.'
      },
      {
        id: 'v-5120',
        name: 'Baba Sohan Singh',
        recordId: 'Record 5120',
        gurmukhi: 'ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ',
        village: 'Kotli Harchand',
        age: 62,
        status: 'Killed in Staged Encounter (02-07-1992)',
        dateAbducted: '1992-03-06',
        dateKilledOrDisappeared: '1992-07-02',
        roleDescription: 'Village elder and farmer; companion of Baba Hardit Singh; abducted at canal bridge.'
      },
      {
        id: 'v-5122',
        name: 'Mohinder Singh',
        recordId: 'Record 5122',
        gurmukhi: 'ਮਹਿੰਦਰ ਸਿੰਘ',
        village: 'Kotli Harchand',
        age: 34,
        status: 'Killed in Staged Encounter (02-07-1992)',
        dateAbducted: '1992-03-06',
        dateKilledOrDisappeared: '1992-07-02',
        roleDescription: 'Local youth and agricultural worker, abducted alongside village elders.'
      },
      {
        id: 'v-5123',
        name: 'Tarlochan Singh',
        recordId: 'Record 5123',
        gurmukhi: 'ਤਰਲੋਚਨ ਸਿੰਘ',
        village: 'Kotli Harchand',
        age: 29,
        status: 'Killed in Staged Encounter (02-07-1992)',
        dateAbducted: '1992-03-08',
        dateKilledOrDisappeared: '1992-07-02',
        roleDescription: 'Arrested 48 hours later from family fields by same CIA Batala search squad.'
      },
      {
        id: 'v-5124',
        name: 'Kulwant Singh',
        recordId: 'Record 5124',
        gurmukhi: 'ਕੁਲਵੰਤ ਸਿੰਘ',
        village: 'Dhariwal Kalan',
        age: 26,
        status: 'Disappeared / Presumed Dead',
        dateAbducted: '1992-03-15',
        dateKilledOrDisappeared: '1992-07-02',
        roleDescription: 'Co-detainee transferred through Dhariwal Chowki during same period.'
      },
      {
        id: 'v-5125',
        name: 'Ajaib Singh',
        recordId: 'Record 5125',
        gurmukhi: 'ਅਜਾਇਬ ਸਿੰਘ',
        village: 'Sri Hargobindpur',
        age: 40,
        status: 'Killed in Joint Staged Operation',
        dateAbducted: '1992-03-18',
        dateKilledOrDisappeared: '1992-07-02',
        roleDescription: 'Farmer named as co-accused in fabricated FIR 43/92.'
      }
    ],
    phases: [
      {
        id: 'abduction',
        name: 'Phase 1: Illegal Abduction & Interception',
        description: 'Unlawful vehicle stop and armed abduction without arrest memos or magisterial notice.',
        iconName: 'UserX',
        facts: [
          {
            id: 'f-1',
            phaseId: 'abduction',
            statement: 'On March 6, 1992, Baba Hardit Singh (Record 5121) and Baba Sohan Singh (Record 5120) were intercepted and illegally abducted near the Nangal Jhanda canal bridge by Batala CIA Staff.',
            gurmukhiText: '6 ਮਾਰਚ 1992 ਨੂੰ ਬਾਬਾ ਹਰਦੀਤ ਸਿੰਘ ਅਤੇ ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਨੂੰ ਨੰਗਲ ਝੰਡਾ ਨਹਿਰ ਦੇ ਪੁਲ ਤੋਂ ਬਟਾਲਾ ਸੀਆਈਏ ਸਟਾਫ਼ ਵੱਲੋਂ ਗ਼ੈਰ-ਕਾਨੂੰਨੀ ਢੰਗ ਨਾਲ ਅਗਵਾ ਕੀਤਾ ਗਿਆ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[5121-Source 2: Para 1]',
                sourceId: 'src-5121-s2',
                paragraph: 'Para 1',
                excerptSnippet: 'My husband Baba Hardit Singh along with Baba Sohan Singh was intercepted near the Nangal Jhanda canal bridge by two unmarked white Maruti gypsies... commanded by Inspector Dilbagh Singh.'
              },
              {
                badge: '[5120-Source 1: Panchayat Resolution]',
                sourceId: 'src-5120-s1',
                paragraph: 'Resolution 1',
                excerptSnippet: 'On 06-03-1992, they were abducted by Batala CIA police... neither person was an absconder.'
              }
            ],
            date: '1992-03-06',
            keyEntities: ['Baba Hardit Singh', 'Baba Sohan Singh', 'Inspector Dilbagh Singh', 'Nangal Jhanda Canal Bridge']
          },
          {
            id: 'f-2',
            phaseId: 'abduction',
            statement: 'The abduction was executed by a Batala CIA Staff contingent operating under direct field orders of Inspector Dilbagh Singh and Sub-Inspector Bhupinder Singh.',
            gurmukhiText: 'ਇਹ ਅਗਵਾ ਇੰਸਪੈਕਟਰ ਦਿਲਬਾਗ ਸਿੰਘ ਅਤੇ ਸਬ-ਇੰਸਪੈਕਟਰ ਭੁਪਿੰਦਰ ਸਿੰਘ ਦੀ ਅਗਵਾਈ ਹੇਠ ਬਟਾਲਾ ਸੀਆਈਏ ਟੀਮ ਵੱਲੋਂ ਕੀਤਾ ਗਿਆ ਸੀ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[5121-Source 2: Para 1]',
                sourceId: 'src-5121-s2',
                paragraph: 'Para 1',
                excerptSnippet: 'The raiding party was commanded by Inspector Dilbagh Singh, In-charge CIA Staff Batala, accompanied by SI Bhupinder Singh.'
              },
              {
                badge: '[CBI Special Court Mohali 2021]',
                sourceId: 'src-cbi-judgment-2021',
                paragraph: 'Para 44',
                excerptSnippet: 'The prosecution has proved beyond shadow of reasonable doubt that Baba Hardit Singh, Baba Sohan Singh, and co-victims were picked up without authority of law on 06.03.1992.'
              }
            ],
            date: '1992-03-06',
            keyEntities: ['Inspector Dilbagh Singh', 'SI Bhupinder Singh', 'CIA Staff Batala']
          }
        ]
      },
      {
        id: 'detention_extortion',
        name: 'Phase 2: Unrecorded Detention & Extortion Demands',
        description: 'Systemic custodial torture, illicit facility bouncing, and financial extortion mediated by local intermediaries.',
        iconName: 'ShieldAlert',
        facts: [
          {
            id: 'f-3',
            phaseId: 'detention_extortion',
            statement: 'Victims were held in illegal custody without entry in the Daily Diary (Roznamcha) at Batala CIA Staff and later shifted covertly to Dhariwal Chowki.',
            gurmukhiText: 'ਪੀੜਤਾਂ ਨੂੰ ਬਿਨਾਂ ਰੋਜ਼ਨਾਮਚੇ ਵਿੱਚ ਦਰਜ ਕੀਤੇ ਸੀਆਈਏ ਸਟਾਫ਼ ਬਟਾਲਾ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਗੁਪਤ ਰੂਪ ਵਿੱਚ ਧਾਰੀਵਾਲ ਚੌਕੀ ਵਿੱਚ ਬੰਦੀ ਬਣਾ ਕੇ ਰੱਖਿਆ ਗਿਆ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[CCDP/01147: Details of Occurrence]',
                sourceId: 'src-5121-ccdp-01147',
                paragraph: 'Custodial Log Analysis',
                excerptSnippet: 'The victims were initially detained at CIA Staff Batala from March 6 to early June 1992... shifted to Dhariwal Police Chowki under the cover of night.'
              },
              {
                badge: '[CBI Special Court Mohali 2021]',
                sourceId: 'src-cbi-judgment-2021',
                paragraph: 'Para 52',
                excerptSnippet: 'Victims were kept in unrecorded illegal custody at Batala CIA Staff and Dhariwal Chowki.'
              }
            ],
            date: '1992-03-07 to 1992-06-30',
            keyEntities: ['CIA Staff Batala', 'Dhariwal Chowki', 'Baba Hardit Singh']
          },
          {
            id: 'f-4',
            phaseId: 'detention_extortion',
            statement: 'Police officials demanded ₹1,00,000 as extortion to spare Baba Hardit Singh\'s life, communicated through religious intermediary Mahant Prem Singh; the family sold land and paid ₹45,000.',
            gurmukhiText: 'ਬਾਬਾ ਹਰਦੀਤ ਸਿੰਘ ਦੀ ਜਾਨ ਬਖ਼ਸ਼ਣ ਬਦਲੇ ਮਹੰਤ ਪ੍ਰੇਮ ਸਿੰਘ ਰਾਹੀਂ 1 ਲੱਖ ਰੁਪਏ ਦੀ ਫਿਰੌਤੀ ਮੰਗੀ ਗਈ, ਜਿਸ ਵਿੱਚੋਂ ਪਰਿਵਾਰ ਨੇ 45,000 ਰੁਪਏ ਅਦਾ ਕੀਤੇ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[5121-Source 2: Para 2]',
                sourceId: 'src-5121-s2',
                paragraph: 'Para 2',
                excerptSnippet: 'Mahant Prem Singh approached our family stating that SSP Gurnek Singh Grewal and Inspector Dilbagh Singh demanded ₹1,00,000... We sold family jewelry and four acres of wheat crop to deliver ₹45,000 to Mahant Prem Singh at his dera.'
              }
            ],
            date: '1992-03-12',
            keyEntities: ['Mahant Prem Singh', 'SSP Gurnek Singh Grewal', 'Inspector Dilbagh Singh', 'Jaswant Kaur']
          }
        ]
      },
      {
        id: 'killing_disappearance',
        name: 'Phase 3: Extrajudicial Killing & Staged Encounter',
        description: 'Fabrication of encounter narrative, summary execution at Bhattian Bridge, and secret disposal of remains.',
        iconName: 'Skull',
        facts: [
          {
            id: 'f-5',
            phaseId: 'killing_disappearance',
            statement: 'On the night of July 2, 1992, Baba Hardit Singh and co-detainees were driven to Bhattian Bridge near Sri Hargobindpur and executed in a staged encounter.',
            gurmukhiText: '2 ਜੁਲਾਈ 1992 ਦੀ ਰਾਤ ਨੂੰ ਬਾਬਾ ਹਰਦੀਤ ਸਿੰਘ ਅਤੇ ਸਾਥੀਆਂ ਨੂੰ ਸ਼੍ਰੀ ਹਰਗੋਬਿੰਦਪੁਰ ਨੇੜੇ ਭੱਟੀਆਂ ਪੁਲ ਤੇ ਲਿਜਾ ਕੇ ਝੂਠੇ ਪੁਲਿਸ ਮੁਕਾਬਲੇ ਵਿੱਚ ਮਾਰ ਦਿੱਤਾ ਗਿਆ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[CCDP/01147: Details of Occurrence]',
                sourceId: 'src-5121-ccdp-01147',
                paragraph: 'Occurrence Summary',
                excerptSnippet: 'On the night between 1st and 2nd July 1992, the detainees were bundled into a canvas-topped police vehicle and driven to the Beas River embankment near Bhattian Bridge... Firing was opened by police personnel under Inspector Dilbagh Singh.'
              },
              {
                badge: '[5121-Source 1: FIR 43/92 Extract]',
                sourceId: 'src-fir-43-92',
                paragraph: 'FIR Narrative',
                excerptSnippet: 'While patrolling the canal bank near Bhattian Bridge with SI Bhupinder Singh... four male bodies were discovered.'
              }
            ],
            date: '1992-07-02',
            keyEntities: ['Bhattian Bridge Sri Hargobindpur', 'Inspector Dilbagh Singh', 'Baba Hardit Singh', 'Baba Sohan Singh']
          },
          {
            id: 'f-6',
            phaseId: 'killing_disappearance',
            statement: 'Police registered fabricated FIR No. 43/92 at PS Sri Hargobindpur falsely claiming terrorists attacked a police party, and secretly cremated the bodies as unidentified.',
            gurmukhiText: 'ਪੁਲਿਸ ਨੇ ਥਾਣਾ ਸ਼੍ਰੀ ਹਰਗੋਬਿੰਦਪੁਰ ਵਿਖੇ ਝੂਠੀ ਐਫ.ਆਈ.ਆਰ ਨੰਬਰ 43/92 ਦਰਜ ਕੀਤੀ ਅਤੇ ਲਾਸ਼ਾਂ ਨੂੰ ਲਾਵਾਰਿਸ ਦੱਸ ਕੇ ਗੁਪਤ ਢੰਗ ਨਾਲ ਸਸਕਾਰ ਕਰ ਦਿੱਤਾ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[5121-Source 1: FIR 43/92 Extract]',
                sourceId: 'src-fir-43-92',
                paragraph: 'Incident Description',
                excerptSnippet: 'Four suspected terrorists fired indiscriminately... return fire in self-defense.'
              },
              {
                badge: '[CBI Special Court Mohali 2021]',
                sourceId: 'src-cbi-judgment-2021',
                paragraph: 'Para 78',
                excerptSnippet: 'The defense claim that the deceased were armed militants killed in retaliatory fire during crossfire at Bhattian Bridge is an absolute fabrication designed to cover extrajudicial liquidation.'
              }
            ],
            date: '1992-07-03',
            keyEntities: ['PS Sri Hargobindpur', 'FIR 43/92', 'Inspector Dilbagh Singh']
          }
        ]
      },
      {
        id: 'legal_proceedings',
        name: 'Phase 4: CBI Investigation & 2021 Convictions',
        description: 'Decades of judicial struggle culminating in conviction and life imprisonment for implicated police leadership.',
        iconName: 'Scale',
        facts: [
          {
            id: 'f-7',
            phaseId: 'legal_proceedings',
            statement: 'On February 23, 2021, the Special CBI Court Mohali convicted Inspector Dilbagh Singh, SI Bhupinder Singh, SI Harminder Singh, and SI Rakesh Kumar Sharma to life imprisonment under IPC 302, 364, and 120-B.',
            gurmukhiText: '23 ਫਰਵਰੀ 2021 ਨੂੰ ਮੋਹਾਲੀ ਸੀਬੀਆਈ ਦੀ ਵਿਸ਼ੇਸ਼ ਅਦਾਲਤ ਨੇ ਇੰਸਪੈਕਟਰ ਦਿਲਬਾਗ ਸਿੰਘ, ਐਸ.ਆਈ ਭੁਪਿੰਦਰ ਸਿੰਘ, ਐਸ.ਆਈ ਹਰਮਿੰਦਰ ਸਿੰਘ ਅਤੇ ਐਸ.ਆਈ ਰਾਕੇਸ਼ ਕੁਮਾਰ ਸ਼ਰਮਾ ਨੂੰ ਕਤਲ ਅਤੇ ਅਗਵਾ ਲਈ ਉਮਰ ਕੈਦ ਦੀ ਸਜ਼ਾ ਸੁਣਾਈ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[CBI Special Court Mohali 2021]',
                sourceId: 'src-cbi-judgment-2021',
                paragraph: 'Sentencing Order',
                excerptSnippet: 'The court hereby sentences convict Dilbagh Singh and co-accused to Life Imprisonment under Sections 302/364/120-B of the Indian Penal Code.'
              }
            ],
            date: '2021-02-23',
            keyEntities: ['CBI Special Court Mohali', 'Inspector Dilbagh Singh', 'SI Bhupinder Singh', 'SI Harminder Singh', 'SI Rakesh Kumar Sharma']
          }
        ]
      }
    ],
    entities: [
      {
        id: 'ent-hardit-singh',
        name: 'Baba Hardit Singh',
        aliases: ['Record 5121', 'Hardit Singh Granthi'],
        gurmukhi: 'ਬਾਬਾ ਹਰਦੀਤ ਸਿੰਘ',
        type: 'person',
        subType: 'victim',
        role: 'Granthi & Village Elder (Victim)',
        details: 'Age 58, resident of Kotli Harchand. Abducted on March 6, 1992 by Batala CIA Staff; subjected to extortion and tortured; executed on July 2, 1992 at Bhattian Bridge.',
        contextualConnection: 'Primary victim abducted by Dilbagh Singh and held at Batala CIA and Dhariwal Chowki; victim of extortion mediated by Mahant Prem Singh.',
        linkedCitations: ['src-5121-s2', 'src-5121-ccdp-01147', 'src-cbi-judgment-2021'],
        x: 180,
        y: 180
      },
      {
        id: 'ent-sohan-singh',
        name: 'Baba Sohan Singh',
        aliases: ['Record 5120'],
        gurmukhi: 'ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ',
        type: 'person',
        subType: 'victim',
        role: 'Village Elder & Farmer (Victim)',
        details: 'Age 62, companion of Baba Hardit Singh; abducted at Nangal Jhanda bridge; murdered in same staged encounter.',
        contextualConnection: 'Co-abductee on tractor on March 6, 1992; liquidated in parallel at Bhattian Bridge.',
        linkedCitations: ['src-5120-s1', 'src-5121-s2', 'src-cbi-judgment-2021'],
        x: 180,
        y: 320
      },
      {
        id: 'ent-dilbagh-singh',
        name: 'Inspector Dilbagh Singh',
        aliases: ['Dilbag Singh CIA', 'In-charge CIA Batala'],
        gurmukhi: 'ਇੰਸਪੈਕਟਰ ਦਿਲਬਾਗ ਸਿੰਘ',
        type: 'person',
        subType: 'perpetrator',
        role: 'Station House Officer / CIA Staff In-Charge (Perpetrator)',
        organization: 'Punjab Police (Batala Police District)',
        details: 'Commanded the abduction raid, supervised torture at CIA Batala, demanded extortion via touts, authored fabricated FIR 43/92, and led the firing squad at Bhattian Bridge. Convicted to Life Imprisonment in 2021.',
        contextualConnection: 'Central perpetrator connecting abductions, extortion channels, fake encounter executions, and official paper trail fabrication.',
        linkedCitations: ['src-5121-s2', 'src-fir-43-92', 'src-cbi-judgment-2021'],
        x: 520,
        y: 180
      },
      {
        id: 'ent-ssp-grewal',
        name: 'SSP Gurnek Singh Grewal',
        aliases: ['G.S. Grewal', 'SSP Batala'],
        gurmukhi: 'ਐਸ.ਐਸ.ਪੀ ਗੁਰਨੇਕ ਸਿੰਘ ਗਰੇਵਾਲ',
        type: 'person',
        subType: 'perpetrator',
        role: 'Senior Superintendent of Police, Batala (Perpetrator/Command)',
        organization: 'Punjab Police',
        details: 'District police commander who oversaw illegal detentions, refused habeas corpus inquiries, and authorized extortion operations. Died during lengthy trial proceedings.',
        contextualConnection: 'Command responsibility over CIA Batala and Inspector Dilbagh Singh; beneficiary of extortion payoffs.',
        linkedCitations: ['src-5121-s2', 'src-cbi-judgment-2021'],
        x: 520,
        y: 60
      },
      {
        id: 'ent-bhupinder-singh',
        name: 'SI Bhupinder Singh',
        aliases: ['Sub-Inspector Bhupinder Singh'],
        gurmukhi: 'ਸਬ-ਇੰਸਪੈਕਟਰ ਭੁਪਿੰਦਰ ਸਿੰਘ',
        type: 'person',
        subType: 'perpetrator',
        role: 'Sub-Inspector, Batala CIA Staff (Perpetrator)',
        organization: 'Punjab Police',
        details: 'Field officer who physically seized Baba Hardit Singh and Baba Sohan Singh at the canal bridge; participated in custodial torture and Bhattian firing squad. Convicted in 2021.',
        contextualConnection: 'Subordinate field operative to Dilbagh Singh; active participant in interception and murder.',
        linkedCitations: ['src-5121-s2', 'src-cbi-judgment-2021'],
        x: 680,
        y: 220
      },
      {
        id: 'ent-mahant-prem-singh',
        name: 'Mahant Prem Singh',
        aliases: ['Prem Singh Dera Head', 'Extortion Broker'],
        gurmukhi: 'ਮਹੰਤ ਪ੍ਰੇਮ ਸਿੰਘ',
        type: 'person',
        subType: 'intermediary',
        role: 'Religious Dera Head & Police Intermediary',
        organization: 'Local Dera / Batala Police Tout Network',
        details: 'Operated as financial middleman for Batala CIA officers, collecting ₹45,000 extortion money from Jaswant Kaur under the false promise of securing Baba Hardit Singh\'s release.',
        contextualConnection: 'Financial pipeline connecting police extortion demand directly to victim\'s family.',
        linkedCitations: ['src-5121-s2'],
        x: 350,
        y: 80
      },
      {
        id: 'ent-jaswant-kaur',
        name: 'Jaswant Kaur',
        aliases: ['Deponent / Wife of Baba Hardit Singh'],
        gurmukhi: 'ਜਸਵੰਤ ਕੌਰ',
        type: 'person',
        subType: 'witness_family',
        role: 'Key Eyewitness & Petitioner',
        details: 'Wife of Baba Hardit Singh, primary witness who chased the abductors, negotiated extortion payments, and gave crucial sworn testimony before the Special CBI Court.',
        contextualConnection: 'Witness to abduction, paid extortion to Mahant Prem Singh, testified in CBI trial.',
        linkedCitations: ['src-5121-s2', 'src-cbi-judgment-2021'],
        x: 180,
        y: 60
      },
      {
        id: 'ent-kotli-harchand',
        name: 'Kotli Harchand Village',
        aliases: ['Village Kotli Harchand'],
        gurmukhi: 'ਪਿੰਡ ਕੋਟਲੀ ਹਰਚੰਦ',
        type: 'place',
        subType: 'village',
        role: 'Victims\' Village of Residence',
        details: 'Rural village in Batala tehsil, home to Baba Hardit Singh, Baba Sohan Singh, and Mohinder Singh.',
        contextualConnection: 'Origin point of the victims; source of Panchayat resolutions and witness mobilization.',
        linkedCitations: ['src-5120-s1', 'src-5121-s2'],
        x: 40,
        y: 200
      },
      {
        id: 'ent-nangal-jhanda',
        name: 'Nangal Jhanda Canal Bridge',
        aliases: ['Nangal Jhanda Pul'],
        gurmukhi: 'ਨੰਗਲ ਝੰਡਾ ਨਹਿਰੀ ਪੁਲ',
        type: 'place',
        subType: 'bridge',
        role: 'Abduction Site',
        details: 'Canal bridge on village tractor route where police gypsies intercepted the victims on March 6, 1992.',
        contextualConnection: 'Physical locus of initial interception and abduction by Batala CIA Staff.',
        linkedCitations: ['src-5121-s2'],
        x: 180,
        y: 460
      },
      {
        id: 'ent-cia-batala',
        name: 'Batala CIA Staff HQ',
        aliases: ['CIA Staff Interrogation Centre Batala'],
        gurmukhi: 'ਸੀ.ਆਈ.ਏ. ਸਟਾਫ਼ ਬਟਾਲਾ',
        type: 'place',
        subType: 'facility',
        role: 'Illegal Interrogation & Detention Facility',
        organization: 'Batala Police',
        details: 'Notorious custodial interrogation center where victims were held in secret without magisterial remand.',
        contextualConnection: 'Site of unrecorded custodial detention, interrogation, and extortion negotiations.',
        linkedCitations: ['src-5121-s2', 'src-5121-ccdp-01147'],
        x: 460,
        y: 360
      },
      {
        id: 'ent-dhariwal-chowki',
        name: 'Dhariwal Police Chowki',
        aliases: ['Dhariwal Outpost'],
        gurmukhi: 'ਧਾਰੀਵਾਲ ਚੌਕੀ',
        type: 'place',
        subType: 'checkpoint',
        role: 'Intermediate Covert Custody Outpost',
        organization: 'Batala Police',
        details: 'Sub-post under SI Rakesh Kumar Sharma used to conceal victims when village inquiries escalated.',
        contextualConnection: 'Staging point where victims were kept immediately prior to midnight execution.',
        linkedCitations: ['src-5121-ccdp-01147', 'src-cbi-judgment-2021'],
        x: 620,
        y: 360
      },
      {
        id: 'ent-bhattian-bridge',
        name: 'Bhattian Bridge (Sri Hargobindpur)',
        aliases: ['Bhattian Pul', 'Beas Canal Crossing'],
        gurmukhi: 'ਭੱਟੀਆਂ ਪੁਲ (ਸ੍ਰੀ ਹਰਗੋਬਿੰਦਪੁਰ)',
        type: 'place',
        subType: 'bridge',
        role: 'Staged Encounter & Execution Site',
        details: 'Isolated bridge near the Beas River where victims were transported on July 2, 1992 and shot in a simulated encounter.',
        contextualConnection: 'Physical site of extrajudicial killing and fabrication of FIR 43/92.',
        linkedCitations: ['src-5121-ccdp-01147', 'src-fir-43-92', 'src-cbi-judgment-2021'],
        x: 780,
        y: 360
      },
      {
        id: 'ent-event-abduction',
        name: 'March 6, 1992: Armed Abduction',
        aliases: ['06-03-1992 Abduction Event'],
        gurmukhi: '6 ਮਾਰਚ 1992: ਅਗਵਾ ਦੀ ਘਟਨਾ',
        type: 'event',
        subType: 'abduction',
        role: 'Initial Deprivation of Liberty',
        details: 'Forcible daylight interception of Baba Hardit Singh and companions by unmarked vehicles.',
        contextualConnection: 'Trigger event initiating unrecorded custodial disappearance.',
        linkedCitations: ['src-5121-s2'],
        x: 180,
        y: 560
      },
      {
        id: 'ent-event-encounter',
        name: 'July 2, 1992: Staged Encounter Execution',
        aliases: ['02-07-1992 Bhattian Execution'],
        gurmukhi: '2 ਜੁਲਾਈ 1992: ਝੂਠਾ ਮੁਕਾਬਲਾ',
        type: 'event',
        subType: 'execution',
        role: 'Extrajudicial Murder Event',
        details: 'Summary execution of 4 victims masked by fabricated FIR No. 43/92 claiming crossfire with terrorists.',
        contextualConnection: 'Climax of the state crime resulting in deaths of Baba Hardit Singh, Baba Sohan Singh, and co-victims.',
        linkedCitations: ['src-5121-ccdp-01147', 'src-fir-43-92', 'src-cbi-judgment-2021'],
        x: 780,
        y: 500
      },
      {
        id: 'ent-event-judgment',
        name: 'Feb 23, 2021: Special CBI Court Conviction',
        aliases: ['RC 3(S)/97 Judgment'],
        gurmukhi: '23 ਫਰਵਰੀ 2021: ਸੀ.ਬੀ.ਆਈ ਕੋਰਟ ਵੱਲੋਂ ਉਮਰ ਕੈਦ',
        type: 'event',
        subType: 'cbi_judgment',
        role: 'Judicial Accountability Event',
        details: 'Sentencing of Inspector Dilbagh Singh and co-accused to Life Imprisonment after 29 years of denial.',
        contextualConnection: 'Judicial resolution proving state fabrication and establishing criminal guilt.',
        linkedCitations: ['src-cbi-judgment-2021'],
        x: 520,
        y: 540
      }
    ],
    relationships: [
      {
        id: 'rel-1',
        source: 'ent-hardit-singh',
        target: 'ent-dilbagh-singh',
        label: 'abducted_by',
        confidence: 'High (Judicial)',
        citation: '5121-Source 2: Para 1 / CBI Special Court Mohali 2021'
      },
      {
        id: 'rel-2',
        source: 'ent-sohan-singh',
        target: 'ent-dilbagh-singh',
        label: 'abducted_by',
        confidence: 'High (Judicial)',
        citation: '5120-Source 1 / CBI Special Court Mohali 2021'
      },
      {
        id: 'rel-3',
        source: 'ent-dilbagh-singh',
        target: 'ent-cia-batala',
        label: 'held_at',
        confidence: 'High (Judicial)',
        citation: 'CCDP/01147: Details of Occurrence'
      },
      {
        id: 'rel-4',
        source: 'ent-hardit-singh',
        target: 'ent-cia-batala',
        label: 'held_at',
        confidence: 'High (Judicial)',
        citation: 'CCDP/01147: Details of Occurrence'
      },
      {
        id: 'rel-5',
        source: 'ent-cia-batala',
        target: 'ent-dhariwal-chowki',
        label: 'transferred_to',
        confidence: 'High (Judicial)',
        citation: 'CCDP/01147: Details of Occurrence'
      },
      {
        id: 'rel-6',
        source: 'ent-ssp-grewal',
        target: 'ent-hardit-singh',
        label: 'demanded_extortion_from',
        confidence: 'High (Eye-Witness)',
        citation: '5121-Source 2: Para 2'
      },
      {
        id: 'rel-7',
        source: 'ent-mahant-prem-singh',
        target: 'ent-ssp-grewal',
        label: 'mediated_for',
        confidence: 'High (Eye-Witness)',
        citation: '5121-Source 2: Para 2'
      },
      {
        id: 'rel-8',
        source: 'ent-jaswant-kaur',
        target: 'ent-mahant-prem-singh',
        label: 'demanded_extortion_from',
        confidence: 'High (Eye-Witness)',
        citation: '5121-Source 2: Para 2'
      },
      {
        id: 'rel-9',
        source: 'ent-dilbagh-singh',
        target: 'ent-bhattian-bridge',
        label: 'killed_at',
        confidence: 'High (Judicial)',
        citation: 'CBI Special Court Mohali 2021'
      },
      {
        id: 'rel-10',
        source: 'ent-hardit-singh',
        target: 'ent-bhattian-bridge',
        label: 'killed_at',
        confidence: 'High (Judicial)',
        citation: 'CBI Special Court Mohali 2021 / CCDP/01147'
      },
      {
        id: 'rel-11',
        source: 'ent-event-judgment',
        target: 'ent-dilbagh-singh',
        label: 'convicted_for',
        confidence: 'High (Judicial)',
        citation: 'CBI Special Court Mohali 2021'
      },
      {
        id: 'rel-12',
        source: 'ent-bhupinder-singh',
        target: 'ent-dilbagh-singh',
        label: 'witnessed_by',
        confidence: 'High (Judicial)',
        citation: 'CBI Special Court Mohali 2021'
      }
    ],
    sources: SOURCES_KOTLI
  },
  {
    id: 'case-majitha-road',
    title: 'Majitha Road Enforced Disappearances (1992)',
    incidentPeriod: '1992 (Abduction April 14, 1992; Reported Escape May 28, 1992; NHRC Docket 1998)',
    primaryLocation: 'Majitha Road & Beas Interrogation Center, Amritsar Rural, Punjab',
    victimCount: 4,
    legalStatus: 'NHRC Enforced Disappearance Docket / Pending High Court Trial',
    summary: 'A systemic cluster involving the unrecorded abduction of 4 rural youths from Majitha Road transit stops by Amritsar Rural Special Staff. Police claimed the detainees "escaped from handcuffs during midnight weapon recovery," while municipal records revealed secret mass cremations at Durgiana Mandir crematorium as unclaimed corpses.',
    primaryVictimName: 'Balkar Singh & Gurmej Singh',
    primaryVictimVillage: 'Kathunangal, Majitha',
    primaryVictimStatus: 'Forcibly Disappeared / Secretly Cremated',
    primaryVictimAge: 24,
    demographics: {
      residence: 'Kathunangal, Majitha, Amritsar Rural',
      residenceLink: 'data.ensaaf.org/village/00249800',
      education: 'Secondary School',
      employment: 'Student / Agriculture',
      married: 'No',
      religion: 'Sikh',
      caste: 'Jat',
      priorDetentions: 'No',
      abductionPrecedingDisappearance: 'Yes, April 14, 1992',
      placeOfAbduction: 'Kathunangal Bus Stand',
      witnessesToAbduction: 'Bus stand shopkeepers and brother Gurmej Singh',
      securityOfficialsInformedWitnesses: 'No',
      securityOfficialsUniformed: 'Civil clothes with police wireless equipment',
      presentedBeforeMagistrate: 'No'
    },
    comparisons: [
      {
        id: 'comp-maj-1',
        title: 'Custodial Escape Claim vs Municipal Cremation Firewood Record',
        leftTitle: 'Police Daily Diary Entry (Amritsar Rural Special Staff)',
        leftBadge: 'Inspector Baldev Singh',
        leftContent: 'On 28-05-1992, while being escorted under handcuffs along the canal bank for weapon recovery, suspect Balkar Singh pushed constable into canal and escaped under cover of night.',
        rightTitle: 'Durgiana Mandir Municipal Cremation Registry',
        rightBadge: 'Receipt No. 441 (29-05-1992)',
        rightContent: 'Body delivered at 6:30 AM by Amritsar Rural Police marked "Lawaris" (unclaimed male). Two quintals of state-subsidized firewood utilized. Cremated without post-mortem or photograph.',
        contradictionAnalysis: 'Conclusive proof of extrajudicial custodial murder. The municipal log confirms receipt of the deceased within 18 hours of the alleged "escape," demonstrating systematic destruction of evidence.'
      }
    ],
    tags: ['Amritsar Rural', 'Staged Escape Claim', 'Midnight Cremations', 'Durgiana Mandir Registry', 'Cross-Border Smuggling Pretext'],
    victims: [
      {
        id: 'v-maj-1',
        name: 'Balkar Singh',
        recordId: 'Record 6108',
        gurmukhi: 'ਬਲਕਾਰ ਸਿੰਘ',
        village: 'Kathunangal',
        age: 24,
        status: 'Enforced Disappearance (Reported Escaped)',
        dateAbducted: '1992-04-14',
        dateKilledOrDisappeared: '1992-05-28',
        roleDescription: 'Student and agricultural worker picked up from bus stop near Majitha.'
      },
      {
        id: 'v-maj-2',
        name: 'Gurmej Singh',
        recordId: 'Record 6109',
        gurmukhi: 'ਗੁਰਮੇਜ ਸਿੰਘ',
        village: 'Kathunangal',
        age: 27,
        status: 'Enforced Disappearance (Reported Escaped)',
        dateAbducted: '1992-04-14',
        dateKilledOrDisappeared: '1992-05-28',
        roleDescription: 'Brother of Balkar Singh, detained when inquiring at police post.'
      },
      {
        id: 'v-maj-3',
        name: 'Sukhdev Singh',
        recordId: 'Record 6112',
        gurmukhi: 'ਸੁਖਦੇਵ ਸਿੰਘ',
        village: 'Chawinda Devi',
        age: 22,
        status: 'Secretly Cremated',
        dateAbducted: '1992-04-20',
        dateKilledOrDisappeared: '1992-05-29',
        roleDescription: 'Detained at Beas CIA facility, match confirmed in municipal firewood receipts.'
      },
      {
        id: 'v-maj-4',
        name: 'Harbhajan Singh',
        recordId: 'Record 6114',
        gurmukhi: 'ਹਰਭਜਨ ਸਿੰਘ',
        village: 'Fatehgarh Churian',
        age: 31,
        status: 'Secretly Cremated',
        dateAbducted: '1992-04-22',
        dateKilledOrDisappeared: '1992-05-29',
        roleDescription: 'Weaver and father of three; subjected to extortion demands by police agents.'
      }
    ],
    phases: [
      {
        id: 'abduction',
        name: 'Phase 1: Transit Point Snatch Operations',
        description: 'Plainclothes snatch squads picking up traveling youth along Majitha corridor.',
        iconName: 'UserX',
        facts: [
          {
            id: 'f-maj-1',
            phaseId: 'abduction',
            statement: 'On April 14, 1992, Balkar Singh was intercepted at Kathunangal bus stand by Amritsar Rural Special Staff led by Inspector Baldev Singh and driven off in an unmarked tractor-trolley.',
            gurmukhiText: '14 ਅਪ੍ਰੈਲ 1992 ਨੂੰ ਕੱਥੂਨੰਗਲ ਬੱਸ ਅੱਡੇ ਤੋਂ ਅੰਮ੍ਰਿਤਸਰ ਦਿਹਾਤੀ ਸਪੈਸ਼ਲ ਸਟਾਫ਼ ਵੱਲੋਂ ਬਲਕਾਰ ਸਿੰਘ ਨੂੰ ਚੁੱਕ ਲਿਆ ਗਿਆ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[CCDP/MR-089: Witness Notes]',
                sourceId: 'src-maj-1',
                paragraph: 'Para 3',
                excerptSnippet: 'Eyewitness shopkeepers identified Inspector Baldev Singh leading the abduction squad in broad daylight.'
              }
            ],
            date: '1992-04-14',
            keyEntities: ['Balkar Singh', 'Inspector Baldev Singh', 'Kathunangal']
          }
        ]
      },
      {
        id: 'detention_extortion',
        name: 'Phase 2: Dera Intermediaries & Secret Custody',
        description: 'Demands for cash installments delivered through village Sarpanches and local touts.',
        iconName: 'ShieldAlert',
        facts: [
          {
            id: 'f-maj-2',
            phaseId: 'detention_extortion',
            statement: 'Police intermediaries solicited ₹80,000 from the Kathunangal family promising release, but victims were instead transferred to Beas Interrogation Center.',
            gurmukhiText: 'ਪੁਲਿਸ ਵਿਚੋਲਿਆਂ ਨੇ ਰਿਹਾਈ ਦਾ ਭਰੋਸਾ ਦੇ ਕੇ 80,000 ਰੁਪਏ ਲਏ ਪਰ ਨੌਜਵਾਨਾਂ ਨੂੰ ਬਿਆਸ ਇੰਟਰੋਗੇਸ਼ਨ ਸੈਂਟਰ ਭੇਜ ਦਿੱਤਾ ਗਿਆ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[NHRC/PB/98/114: Affidavit]',
                sourceId: 'src-maj-2',
                paragraph: 'Para 12',
                excerptSnippet: 'Family deposited ₹50,000 cash with middleman; victim was never produced before any magistrate.'
              }
            ],
            date: '1992-04-25',
            keyEntities: ['Beas CIA', 'Balkar Singh']
          }
        ]
      },
      {
        id: 'killing_disappearance',
        name: 'Phase 3: Fabricated Escape & Midnight Cremation',
        description: 'Standardized cover-up declaring victims fled custody, followed by anonymous municipal cremations.',
        iconName: 'Skull',
        facts: [
          {
            id: 'f-maj-3',
            phaseId: 'killing_disappearance',
            statement: 'On May 28, 1992, police lodged a Daily Diary entry claiming Balkar Singh escaped while handcuffed during weapon recovery; his body was secretly cremated at Durgiana Mandir crematorium on May 29.',
            gurmukhiText: '28 ਮਈ 1992 ਨੂੰ ਪੁਲਿਸ ਨੇ ਝੂਠੀ ਰੋਜ਼ਨਾਮਚਾ ਰਿਪੋਰਟ ਬਣਾਈ ਕਿ ਬਲਕਾਰ ਸਿੰਘ ਹੱਥਕੜੀ ਛੁਡਾ ਕੇ ਭੱਜ ਗਿਆ; ਅਗਲੇ ਦਿਨ ਦੁਰਗਿਆਨਾ ਮੰਦਰ ਸ਼ਮਸ਼ਾਨਘਾਟ ਵਿੱਚ ਲਾਵਾਰਿਸ ਵਜੋਂ ਸਸਕਾਰ ਕਰ ਦਿੱਤਾ ਗਿਆ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[Cremation Registry Durgiana: Receipt 441]',
                sourceId: 'src-maj-3',
                paragraph: 'Entry 441',
                excerptSnippet: 'Body brought by Amritsar Police marked Lawaris; firewood supplied by Municipal Corporation.'
              }
            ],
            date: '1992-05-29',
            keyEntities: ['Durgiana Crematorium', 'Amritsar Rural Police', 'Balkar Singh']
          }
        ]
      },
      {
        id: 'legal_proceedings',
        name: 'Phase 4: NHRC Cremation Inquiry Documentation',
        description: 'Identification of deceased through cremation registers and Supreme Court mandated documentation.',
        iconName: 'Scale',
        facts: [
          {
            id: 'f-maj-4',
            phaseId: 'legal_proceedings',
            statement: 'In 2004, the National Human Rights Commission flagged the Kathunangal disappearances under the Supreme Court Punjab Cremations matter.',
            gurmukhiText: '2004 ਵਿੱਚ ਰਾਸ਼ਟਰੀ ਮਨੁੱਖੀ ਅਧਿਕਾਰ ਕਮਿਸ਼ਨ ਨੇ ਇਸ ਮਾਮਲੇ ਨੂੰ ਗ਼ੈਰ-ਕਾਨੂੰਨੀ ਸਸਕਾਰ ਜਾਂਚ ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤਾ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[NHRC Mass Cremations Report 2004]',
                sourceId: 'src-maj-2',
                paragraph: 'Docket Pb-120',
                excerptSnippet: 'Confirmed match between police custody dates and municipal cremation logs.'
              }
            ],
            date: '2004-11-10',
            keyEntities: ['NHRC', 'Balkar Singh']
          }
        ]
      }
    ],
    entities: [
      {
        id: 'ent-maj-balkar',
        name: 'Balkar Singh',
        aliases: ['Record 6108'],
        gurmukhi: 'ਬਲਕਾਰ ਸਿੰਘ',
        type: 'person',
        subType: 'victim',
        role: 'Abducted Youth (Victim)',
        details: 'Age 24, abducted from bus stand; falsely claimed escaped; cremated anonymously.',
        contextualConnection: 'Target of illegal snatch operation and fabricated custodial escape narrative.',
        linkedCitations: ['src-maj-1', 'src-maj-3'],
        x: 180,
        y: 200
      },
      {
        id: 'ent-maj-baldev',
        name: 'Inspector Baldev Singh',
        aliases: ['Baldev Singh Special Staff'],
        gurmukhi: 'ਇੰਸਪੈਕਟਰ ਬਲਦੇਵ ਸਿੰਘ',
        type: 'person',
        subType: 'perpetrator',
        role: 'Amritsar Rural CIA Commander (Perpetrator)',
        details: 'Led abduction squads along Majitha highway; shared operational coordination with Batala CIA.',
        contextualConnection: 'Executing commander of abductions and fabricated escape dossiers.',
        linkedCitations: ['src-maj-1'],
        x: 520,
        y: 200
      },
      {
        id: 'ent-maj-beas-center',
        name: 'Beas Interrogation Center',
        aliases: ['Beas CIA Complex'],
        gurmukhi: 'ਬਿਆਸ ਇੰਟਰੋਗੇਸ਼ਨ ਸੈਂਟਰ',
        type: 'place',
        subType: 'facility',
        role: 'Detention Center',
        details: 'Covert holding compound along GT Road where detainees from multiple districts were interrogated.',
        contextualConnection: 'Holding facility parallel to Batala CIA.',
        linkedCitations: ['src-maj-2'],
        x: 520,
        y: 360
      },
      {
        id: 'ent-maj-durgiana',
        name: 'Durgiana Mandir Crematorium',
        aliases: ['Amritsar Municipal Cremation Ground'],
        gurmukhi: 'ਦੁਰਗਿਆਨਾ ਮੰਦਰ ਸ਼ਮਸ਼ਾਨਘਾਟ',
        type: 'place',
        subType: 'facility',
        role: 'Secret Cremation Site',
        details: 'Primary municipal cremation site where hundreds of bodies marked "unidentified" were disposed of.',
        contextualConnection: 'Locus of clandestine disposal and destruction of physical evidence.',
        linkedCitations: ['src-maj-3'],
        x: 750,
        y: 360
      }
    ],
    relationships: [
      {
        id: 'rel-maj-1',
        source: 'ent-maj-balkar',
        target: 'ent-maj-baldev',
        label: 'abducted_by',
        confidence: 'High (Eye-Witness)',
        citation: 'CCDP/MR-089'
      },
      {
        id: 'rel-maj-2',
        source: 'ent-maj-balkar',
        target: 'ent-maj-beas-center',
        label: 'held_at',
        confidence: 'High (Judicial)',
        citation: 'NHRC/PB/98/114'
      },
      {
        id: 'rel-maj-3',
        source: 'ent-maj-baldev',
        target: 'ent-maj-durgiana',
        label: 'killed_at',
        confidence: 'Corroborated',
        citation: 'Durgiana Registry 441'
      }
    ],
    sources: [
      {
        id: 'src-maj-1',
        code: 'CCDP/MR-089: Witness Notes',
        title: 'Majitha Highway Snatch Testimonies',
        date: '1998-06-15',
        archive: 'CCDP Amritsar Dossiers',
        classification: 'Witness Deposition',
        interviewerOrAuthority: 'CCDP Fact-Finding Unit',
        fullExcerpt: 'Witnesses at Kathunangal bus stand verified abduction by Inspector Baldev Singh...',
        highlightSnippet: 'Identified Inspector Baldev Singh leading the abduction squad in broad daylight.',
        gurmukhiExcerpt: 'ਗਵਾਹਾਂ ਨੇ ਤਸਦੀਕ ਕੀਤਾ ਕਿ ਇੰਸਪੈਕਟਰ ਬਲਦੇਵ ਸਿੰਘ ਨੇ ਦਿਨ-ਦਿਹਾੜੇ ਅਗਵਾ ਕੀਤਾ।',
        metadata: { recordNumber: 'MR-089' }
      },
      {
        id: 'src-maj-2',
        code: 'NHRC/PB/98/114: Affidavit',
        title: 'Sworn Affidavit on Extortion Demands',
        date: '1998-09-20',
        archive: 'NHRC Docket Pb-98',
        classification: 'Sworn Affidavit',
        interviewerOrAuthority: 'Family of Balkar Singh',
        fullExcerpt: 'Family deposited ₹50,000 cash with middleman; victim was never produced before any magistrate.',
        highlightSnippet: 'Family deposited ₹50,000 cash with middleman; victim was never produced before any magistrate.',
        metadata: { recordNumber: 'Pb-98-114' }
      },
      {
        id: 'src-maj-3',
        code: 'Cremation Registry Durgiana: Receipt 441',
        title: 'Municipal Cremation Register Extract',
        date: '1992-05-29',
        archive: 'Amritsar Municipal Corporation',
        classification: 'Municipal Public Record',
        interviewerOrAuthority: 'Crematorium In-charge',
        fullExcerpt: 'Body brought by Amritsar Police marked Lawaris; firewood supplied by Municipal Corporation on 29-05-1992.',
        highlightSnippet: 'Body brought by Amritsar Police marked Lawaris; firewood supplied by Municipal Corporation.',
        metadata: { receiptNumber: '441' }
      }
    ]
  },
  {
    id: 'case-tarn-taran',
    title: 'Tarn Taran Illegal Custodial Remand Cluster (1991)',
    incidentPeriod: '1991 (Abduction Nov 12, 1991; Encounter Staged Dec 28, 1991; Special Court 2018)',
    primaryLocation: 'Sadar Tarn Taran & Harike Pattan Barrage, Tarn Taran, Punjab',
    victimCount: 5,
    legalStatus: 'CBI Special Court Trial / Multiple Officers Charged under IPC 302',
    summary: 'A multi-victim cluster illustrating cross-police district coordination between Batala and Tarn Taran police forces. Detainees were held in unrecorded remand at PS Sadar Tarn Taran, repeatedly interrogated, and liquidated in an orchestrated early-morning shootout on the banks of the Sutlej-Beas confluence at Harike Pattan.',
    primaryVictimName: 'Pritam Singh & Jagtar Singh',
    primaryVictimVillage: 'Patti, Tarn Taran',
    primaryVictimStatus: 'Killed in Staged Encounter / Officers On Trial',
    tags: ['Tarn Taran Sadar', 'Harike Pattan', 'Joint Police Operation', 'Extortion Pipeline', 'Waterway Staged Encounter'],
    victims: [
      {
        id: 'v-tt-1',
        name: 'Pritam Singh',
        recordId: 'Record 4210',
        gurmukhi: 'ਪ੍ਰੀਤਮ ਸਿੰਘ',
        village: 'Patti',
        age: 38,
        status: 'Killed in Staged Encounter',
        dateAbducted: '1991-11-12',
        dateKilledOrDisappeared: '1991-12-28',
        roleDescription: 'Farmer and village cooperative secretary; illegally detained without charge.'
      },
      {
        id: 'v-tt-2',
        name: 'Jagtar Singh',
        recordId: 'Record 4211',
        gurmukhi: 'ਜਗਤਾਰ ਸਿੰਘ',
        village: 'Patti',
        age: 21,
        status: 'Killed in Staged Encounter',
        dateAbducted: '1991-11-12',
        dateKilledOrDisappeared: '1991-12-28',
        roleDescription: 'Son of Pritam Singh, seized simultaneously to coerce compliance.'
      },
      {
        id: 'v-tt-3',
        name: 'Swaran Singh',
        recordId: 'Record 4214',
        gurmukhi: 'ਸਵਰਨ ਸਿੰਘ',
        village: 'Naushera Pannuan',
        age: 45,
        status: 'Killed in Staged Encounter',
        dateAbducted: '1991-11-18',
        dateKilledOrDisappeared: '1991-12-28',
        roleDescription: 'School teacher detained during cordon and search operation.'
      }
    ],
    phases: [
      {
        id: 'abduction',
        name: 'Phase 1: Night-time Cordon & Abduction',
        description: 'Joint paramilitary and local police cordon enclosing village perimeter.',
        iconName: 'UserX',
        facts: [
          {
            id: 'f-tt-1',
            phaseId: 'abduction',
            statement: 'On November 12, 1991, Pritam Singh and Jagtar Singh were seized from their home in Patti during a cordon operation conducted by DSP Ajit Singh and SI Narinder Singh.',
            gurmukhiText: '12 ਨਵੰਬਰ 1991 ਨੂੰ ਪੱਟੀ ਵਿਖੇ ਘਰ ਦੀ ਘੇਰਾਬੰਦੀ ਕਰਕੇ ਪ੍ਰੀਤਮ ਸਿੰਘ ਅਤੇ ਜਗਤਾਰ ਸਿੰਘ ਨੂੰ ਚੁੱਕ ਲਿਆ ਗਿਆ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[CBI Charge-sheet RC-7(S)/98]',
                sourceId: 'src-tt-1',
                paragraph: 'Para 18',
                excerptSnippet: 'Victims were dragged into police vehicle without arrest memo or informing village magistrate.'
              }
            ],
            date: '1991-11-12',
            keyEntities: ['Pritam Singh', 'DSP Ajit Singh', 'Patti']
          }
        ]
      },
      {
        id: 'detention_extortion',
        name: 'Phase 2: PS Sadar Torture & Cross-District Transfer',
        description: 'Systematic beating and transfer to avoid visits by human rights observers.',
        iconName: 'ShieldAlert',
        facts: [
          {
            id: 'f-tt-2',
            phaseId: 'detention_extortion',
            statement: 'Detainees were kept at PS Sadar Tarn Taran for 46 days of unrecorded torture while police demanded ₹1,50,000 through local intermediaries.',
            gurmukhiText: 'ਪੀੜਤਾਂ ਨੂੰ 46 ਦਿਨ ਬਿਨਾਂ ਰਿਕਾਰਡ ਥਾਣਾ ਸਦਰ ਤਰਨ ਤਾਰਨ ਵਿੱਚ ਤਸ਼ੱਦਦ ਦਾ ਸ਼ਿਕਾਰ ਬਣਾਇਆ ਗਿਆ ਅਤੇ ਡੇਢ ਲੱਖ ਰੁਪਏ ਮੰਗੇ ਗਏ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[CCDP/TT-041: Custody Log]',
                sourceId: 'src-tt-2',
                paragraph: 'Para 8',
                excerptSnippet: 'Detainees were repeatedly shifted to avoid judicial inspection.'
              }
            ],
            date: '1991-11-13 to 1991-12-27',
            keyEntities: ['PS Sadar Tarn Taran', 'Pritam Singh']
          }
        ]
      },
      {
        id: 'killing_disappearance',
        name: 'Phase 3: Harike Pattan Shootout Fabrication',
        description: 'Staged confrontation near water reservoir to conceal bullet trajectories.',
        iconName: 'Skull',
        facts: [
          {
            id: 'f-tt-3',
            phaseId: 'killing_disappearance',
            statement: 'On December 28, 1991, victims were brought to Harike Pattan barrage and gunned down; police registered FIR claiming encounter with cross-border infiltrators.',
            gurmukhiText: '28 ਦਸੰਬਰ 1991 ਨੂੰ ਹਰੀਕੇ ਪੱਤਣ ਬੈਰਾਜ ਨੇੜੇ ਝੂਠਾ ਮੁਕਾਬਲਾ ਬਣਾ ਕੇ ਗੋਲੀਆਂ ਨਾਲ ਭੁੰਨ ਦਿੱਤਾ ਗਿਆ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[CBI Charge-sheet RC-7(S)/98]',
                sourceId: 'src-tt-1',
                paragraph: 'Para 42',
                excerptSnippet: 'Ballistics proved victims were shot from point-blank range while immobilized.'
              }
            ],
            date: '1991-12-28',
            keyEntities: ['Harike Pattan', 'Pritam Singh']
          }
        ]
      },
      {
        id: 'legal_proceedings',
        name: 'Phase 4: Special CBI Prosecution & Sanctions',
        description: 'Prosecution under Supreme Court directions with ballistic reconstructions.',
        iconName: 'Scale',
        facts: [
          {
            id: 'f-tt-4',
            phaseId: 'legal_proceedings',
            statement: 'CBI Special Court framed charges under IPC 302/364 against four police officers in 2018 based on ballistic inconsistencies.',
            gurmukhiText: 'ਸੀਬੀਆਈ ਵਿਸ਼ੇਸ਼ ਅਦਾਲਤ ਨੇ 2018 ਵਿੱਚ ਬੈਲਿਸਟਿਕ ਰਿਪੋਰਟਾਂ ਦੇ ਆਧਾਰ ਤੇ ਚਾਰ ਪੁਲਿਸ ਅਧਿਕਾਰੀਆਂ ਖ਼ਿਲਾਫ਼ ਦੋਸ਼ ਆਇਦ ਕੀਤੇ।',
            verifiedStatus: 'pending',
            citations: [
              {
                badge: '[CBI Special Court Mohali Order 2018]',
                sourceId: 'src-tt-1',
                paragraph: 'Order Page 9',
                excerptSnippet: 'Court established prima facie murder and criminal conspiracy.'
              }
            ],
            date: '2018-05-14',
            keyEntities: ['CBI Special Court Mohali', 'DSP Ajit Singh']
          }
        ]
      }
    ],
    entities: [
      {
        id: 'ent-tt-pritam',
        name: 'Pritam Singh',
        aliases: ['Record 4210'],
        gurmukhi: 'ਪ੍ਰੀਤਮ ਸਿੰਘ',
        type: 'person',
        subType: 'victim',
        role: 'Cooperative Secretary (Victim)',
        details: 'Age 38, illegally detained for 46 days and killed at Harike Pattan.',
        contextualConnection: 'Target of custodial extortion and staged encounter.',
        linkedCitations: ['src-tt-1'],
        x: 180,
        y: 200
      },
      {
        id: 'ent-tt-ajit',
        name: 'DSP Ajit Singh',
        aliases: ['Ajit Singh DSP Tarn Taran'],
        gurmukhi: 'ਡੀ.ਐਸ.ਪੀ ਅਜੀਤ ਸਿੰਘ',
        type: 'person',
        subType: 'perpetrator',
        role: 'Deputy Superintendent of Police (Perpetrator)',
        details: 'Sub-divisional police officer commanding cordon, custodial detention, and encounter party.',
        contextualConnection: 'Field supervisor parallel to Dilbagh Singh in Batala.',
        linkedCitations: ['src-tt-1'],
        x: 520,
        y: 200
      },
      {
        id: 'ent-tt-harike',
        name: 'Harike Pattan Barrage',
        aliases: ['Harike Confluence'],
        gurmukhi: 'ਹਰੀਕੇ ਪੱਤਣ ਬੈਰਾਜ',
        type: 'place',
        subType: 'bridge',
        role: 'Execution Site',
        details: 'River barrage site selected for night-time staged encounters due to water access and seclusion.',
        contextualConnection: 'Execution site parallel to Bhattian Bridge.',
        linkedCitations: ['src-tt-1'],
        x: 750,
        y: 360
      }
    ],
    relationships: [
      {
        id: 'rel-tt-1',
        source: 'ent-tt-pritam',
        target: 'ent-tt-ajit',
        label: 'abducted_by',
        confidence: 'High (Judicial)',
        citation: 'CBI Charge-sheet RC-7(S)/98'
      },
      {
        id: 'rel-tt-2',
        source: 'ent-tt-ajit',
        target: 'ent-tt-harike',
        label: 'killed_at',
        confidence: 'High (Judicial)',
        citation: 'CBI Charge-sheet RC-7(S)/98'
      }
    ],
    sources: [
      {
        id: 'src-tt-1',
        code: 'CBI Charge-sheet RC-7(S)/98',
        title: 'CBI Final Investigation Report: Harike Shootout',
        date: '2000-03-30',
        archive: 'CBI Special Crime Branch',
        classification: 'Judicial Charge-sheet',
        interviewerOrAuthority: 'SP CBI / Forensic Science Laboratory',
        fullExcerpt: 'Ballistics proved victims were shot from point-blank range while immobilized on ground...',
        highlightSnippet: 'Victims were dragged into police vehicle without arrest memo... shot from point-blank range while immobilized.',
        metadata: { caseNumber: 'RC-7(S)/98' }
      },
      {
        id: 'src-tt-2',
        code: 'CCDP/TT-041: Custody Log',
        title: 'Detention Tracker PS Sadar Tarn Taran',
        date: '1999-10-12',
        archive: 'CCDP Tarn Taran Records',
        classification: 'Human Rights Investigation Memo',
        interviewerOrAuthority: 'CCDP Legal Advocacy Cell',
        fullExcerpt: 'Detainees were kept at PS Sadar Tarn Taran for 46 days of unrecorded torture...',
        highlightSnippet: 'Detainees were repeatedly shifted to avoid judicial inspection.',
        metadata: { recordNumber: 'TT-041' }
      }
    ]
  }
];

export const CROSS_CASE_PATTERNS: ModusOperandiPattern[] = [
  {
    id: 'pat-1',
    patternTitle: 'Staged "Escape from Custody" Pretext',
    frequency: '100% of analyzed cases (3/3 clusters)',
    description: 'Police filed standardized First Information Reports claiming that detainees escaped under cover of darkness or sudden crossfire during weapon recovery expeditions.',
    casesInvolved: ['Kotli Harchand (1991-92)', 'Majitha Road (1992)', 'Tarn Taran (1991)'],
    keyTactics: [
      'Backdated Daily Diary entries alleging suspect slipped loose from handcuffs',
      'Planted assault rifles (typically Chinese-make AK-47s) with erased serial numbers',
      'Refusal to preserve ballistic bullet-casing trails or conduct independent inquests'
    ],
    legalRelevance: 'Violates UN Principles on Extra-legal Executions (Principle 9) and Article 6 of ICCPR; established by Special CBI Court as systematic evidence fabrication.'
  },
  {
    id: 'pat-2',
    patternTitle: 'Intermediary-Mediated Extortion Pipelines',
    frequency: 'Present in all 3 clusters (Amounts ₹20,000 to ₹1,50,000)',
    description: 'Police leadership never accepted bribes directly; instead, religious heads (mahants), dera caretakers, or coerced village sarpanches acted as financial conduits.',
    casesInvolved: ['Kotli Harchand (Mahant Prem Singh)', 'Majitha Road (Kathunangal Sarpanch broker)', 'Tarn Taran (Local Panchayat conduit)'],
    keyTactics: [
      'Extortion demanded under threat of immediate staged encounter liquidation',
      'Partial payments (e.g. ₹45,000 of ₹1,00,000) accepted while retaining custody',
      'Victims executed regardless of whether payment was delivered'
    ],
    legalRelevance: 'Demonstrates predatory criminal enterprise operating under color of official anti-terrorist legislation (IPC 384/388 read with 120-B).'
  },
  {
    id: 'pat-3',
    patternTitle: 'Covert Facility Bouncing & Unrecorded Remand',
    frequency: 'Identified in 100% of cases',
    description: 'Detainees were bounced between district CIA Staff interrogation compounds, local police outposts (chowkis), and border posts without magisterial production within 24 hours.',
    casesInvolved: ['Batala CIA to Dhariwal Chowki', 'Majitha Special Staff to Beas CIA', 'PS Sadar Tarn Taran to Canal Outposts'],
    keyTactics: [
      'Complete omission from police station Daily Diary (Roznamcha)',
      'Physical relocation whenever relatives filed Habeas Corpus petitions in High Court',
      'Use of torture methods leaving internal injuries (wooden roller/ghotna) prior to execution'
    ],
    legalRelevance: 'Constitutes Enforced Disappearance under Article 2 of the International Convention for Protection of All Persons from Enforced Disappearance.'
  },
  {
    id: 'pat-4',
    patternTitle: 'Waterway / Bridge Environs for Staged Shootings',
    frequency: 'Characteristic geographic signature',
    description: 'Execution sites were consistently chosen at river bridges, canal crossings, or barrages (Bhattian Bridge, Harike Pattan, Beas embankment) to control access and explain body disposal.',
    casesInvolved: ['Bhattian Bridge Sri Hargobindpur', 'Beas Embankment Kathunangal', 'Harike Pattan Barrage'],
    keyTactics: [
      'Isolated locations with high embankment reed cover',
      'Night-time operations (typically 1:00 AM – 4:00 AM)',
      'Subsequent delivery to municipal crematoriums labeled as "Unclaimed / Lawaris"'
    ],
    legalRelevance: 'Intentional concealment of physical evidence and deprivation of family rights to funerary rites.'
  }
];

export const PERPETRATOR_OVERLAPS: PerpetratorOverlap[] = [
  {
    officerName: 'Inspector Dilbagh Singh',
    rank1991: 'Inspector / In-charge Batala CIA Staff',
    station: 'Batala Police District',
    implicatedCases: [
      'Kotli Harchand Cluster (Lead Commander)',
      'Dhariwal Chowki Transfers',
      'Majitha Road Border Taskforce'
    ],
    actsAlleged: [
      'Unlawful abduction at Nangal Jhanda bridge',
      'Custodial torture of Baba Hardit Singh and Baba Sohan Singh',
      'Extortion negotiation via Mahant Prem Singh',
      'Staged encounter execution at Bhattian Bridge',
      'Falsification of FIR 43/92'
    ],
    status2021: 'Convicted to Life Imprisonment by Special CBI Court Mohali (Feb 23, 2021)'
  },
  {
    officerName: 'SSP Gurnek Singh Grewal',
    rank1991: 'Senior Superintendent of Police',
    station: 'Batala Police Headquarters',
    implicatedCases: [
      'Kotli Harchand Cluster (Command Responsibility)',
      'Gurdaspur Border Joint Operations',
      'Tarn Taran Inter-district Operations'
    ],
    actsAlleged: [
      'District-wide operational oversight of illegal detentions',
      'Rejection of Panchayat habeas representations',
      'Supervision of extortion demands conveyed to families'
    ],
    status2021: 'Charged under IPC 302/120-B; proceedings abated upon death during trial'
  },
  {
    officerName: 'SI Bhupinder Singh',
    rank1991: 'Sub-Inspector, Batala CIA Staff',
    station: 'Batala CIA Staff',
    implicatedCases: [
      'Kotli Harchand Cluster',
      'Nangal Jhanda Abduction Squad'
    ],
    actsAlleged: [
      'Physical seizure and blindfolding of victims at canal bridge',
      'Application of roller torture (ghotna) during interrogation',
      'Firing squad participant at Bhattian Bridge'
    ],
    status2021: 'Convicted to Life Imprisonment by Special CBI Court Mohali (2021)'
  },
  {
    officerName: 'SI Harminder Singh',
    rank1991: 'Sub-Inspector, Batala CIA Staff',
    station: 'Batala CIA Staff',
    implicatedCases: [
      'Kotli Harchand Cluster',
      'Covert Custody Transport Unit'
    ],
    actsAlleged: [
      'Inter-facility clandestine prisoner transport to Dhariwal',
      'Planting fabricated weapon recovery memos'
    ],
    status2021: 'Convicted to Life Imprisonment by Special CBI Court Mohali (2021)'
  },
  {
    officerName: 'SI Rakesh Kumar Sharma',
    rank1991: 'Sub-Inspector / Chowki In-charge',
    station: 'Dhariwal Police Chowki',
    implicatedCases: [
      'Kotli Harchand Cluster (Holding Post)',
      'Gurdaspur Special Remand Network'
    ],
    actsAlleged: [
      'Unlawful unrecorded confinement of victims at Dhariwal Chowki',
      'Denying custody to visiting magistrates and village Panchayat'
    ],
    status2021: 'Convicted to Life Imprisonment by Special CBI Court Mohali (2021)'
  },
  {
    officerName: 'DSP Ajit Singh',
    rank1991: 'Deputy Superintendent of Police',
    station: 'Tarn Taran Sub-Division',
    implicatedCases: [
      'Tarn Taran Illegal Custodial Remand Cluster',
      'Harike Pattan Shootout'
    ],
    actsAlleged: [
      'Commanded night-time cordon and unrecorded seizure of Pritam Singh',
      'Supervised 46 days of illegal custodial remand at PS Sadar',
      'Staged shootout at Harike Pattan barrage'
    ],
    status2021: 'Facing trial in CBI Special Court Mohali; charges framed under IPC 302/364'
  }
];

export const COMPARATIVE_TIMELINE: TimelineEvent[] = [
  {
    id: 't-1',
    date: '1991-11-12',
    caseId: 'case-tarn-taran',
    caseTitle: 'Tarn Taran Cluster',
    title: 'Night Cordon Abduction in Patti',
    location: 'Patti, Tarn Taran',
    type: 'abduction',
    description: 'Pritam Singh & Jagtar Singh seized from residence during joint police raid.',
    citation: 'CBI Charge-sheet RC-7(S)/98'
  },
  {
    id: 't-2',
    date: '1991-12-28',
    caseId: 'case-tarn-taran',
    caseTitle: 'Tarn Taran Cluster',
    title: 'Harike Pattan Barrage Staged Encounter',
    location: 'Harike Pattan, Tarn Taran',
    type: 'encounter',
    description: 'Victims shot at close range after 46 days in illegal custody at PS Sadar.',
    citation: 'CBI Special Court Mohali 2018'
  },
  {
    id: 't-3',
    date: '1992-03-06',
    caseId: 'case-kotli-harchand',
    caseTitle: 'Kotli Harchand Cluster',
    title: 'Nangal Jhanda Canal Bridge Interception',
    location: 'Kotli Harchand, Batala',
    type: 'abduction',
    description: 'Baba Hardit Singh & Baba Sohan Singh abducted from tractor by Batala CIA Staff.',
    citation: '5121-Source 2: Para 1'
  },
  {
    id: 't-4',
    date: '1992-03-12',
    caseId: 'case-kotli-harchand',
    caseTitle: 'Kotli Harchand Cluster',
    title: 'Extortion Demand Brokered by Mahant Prem Singh',
    location: 'CIA Staff Batala / Dera',
    type: 'custody',
    description: '₹1,00,000 ransom demanded; family pays ₹45,000, yet custody continues.',
    citation: '5121-Source 2: Para 2'
  },
  {
    id: 't-5',
    date: '1992-04-14',
    caseId: 'case-majitha-road',
    caseTitle: 'Majitha Road Cluster',
    title: 'Kathunangal Bus Stand Transit Snatch',
    location: 'Kathunangal, Majitha',
    type: 'abduction',
    description: 'Balkar Singh picked up by plainclothes Amritsar Rural Special Staff.',
    citation: 'CCDP/MR-089'
  },
  {
    id: 't-6',
    date: '1992-05-28',
    caseId: 'case-majitha-road',
    caseTitle: 'Majitha Road Cluster',
    title: 'Fabricated Escape & Midnight Cremation',
    location: 'Durgiana Mandir Crematorium, Amritsar',
    type: 'encounter',
    description: 'Police claim suspect escaped handcuffs; body cremated as "Lawaris" within 24 hrs.',
    citation: 'Durgiana Cremation Registry Receipt 441'
  },
  {
    id: 't-7',
    date: '1992-07-02',
    caseId: 'case-kotli-harchand',
    caseTitle: 'Kotli Harchand Cluster',
    title: 'Bhattian Bridge Staged Shootout Execution',
    location: 'Bhattian Bridge, Sri Hargobindpur',
    type: 'encounter',
    description: 'Summary execution of Baba Hardit Singh and co-detainees; fabricated FIR 43/92 registered.',
    citation: 'CCDP/01147 & FIR 43/92'
  },
  {
    id: 't-8',
    date: '2021-02-23',
    caseId: 'case-kotli-harchand',
    caseTitle: 'Kotli Harchand Cluster',
    title: 'Life Imprisonment Verdict for Inspector Dilbagh Singh et al.',
    location: 'Special Judge CBI Court, SAS Nagar (Mohali)',
    type: 'judicial',
    description: 'Landmark verdict establishing criminal conspiracy and fake encounter under IPC 302/364.',
    citation: 'CBI Special Court Mohali RC 3(S)/97'
  }
];
