# Implementation Plan: The Dignified Forensic Hybrid

## 1. Aesthetic Direction: "The Dignified Forensic Hybrid"

The user requested a **vibe in between** the current clean editorial Ensaaf presentation and the dense legal workstation in the reference screenshots:

- **From the Current UI (Human Rights & Editorial Dignity)**:
  - Warm, dignified paper tone background (`#f8fafc` / `#f4f6f8`) and crisp Ensaaf teal (`#006B7D`) & archival gold accents.
  - Human-centered readability: victim testimonies presented in elegant, legible serif typography with generous line-height, avoiding tiny microscopic clutter.
  - Authentic Ensaaf historical photo mounts with warm cream archival borders.
  - Clear Gurmukhi script rendering with vernacular toggle.
- **From the Reference Screenshots (Legal Command & Evidentiary Rigor)**:
  - **Left Forensic Sidebar**: Unobtrusive, clean dark-slate sidebar providing structured access to `Dashboard & Trends`, `Case Workspace & Topology`, `Evidence & Provenance Split-View`, `Affidavits & Depositions`, and `Chain-of-Custody Log`.
  - **Top 3 KPI Metric Cards**: Immediate overview of `Corpus Integrity (1,248 Verified Records)`, `Legal Submissions (38 Active Petitions)`, and `Triage Priority (14 Cases Awaiting Review)`.
  - **Balanced Home Screen**: Priority Review Queue on the left, and a tabbed right panel offering **Violation Trends & Demographics** (clean SVG donut chart + district density bars) alongside the **Interactive Regional Hotspot Map**.
  - **Default "Pending Verification" Workflow**: Facts start unverified, giving researchers an active verification workflow with progress counters (`0 / 4 Facts Verified`).
  - **Synchronized Evidence Proof**: Clickable citations open synchronized primary proof (digitized newspaper microfiche scan with OCR highlighting + oral deposition audio tape with waveform player and Whisper ASR synced bilingual transcript).

---

## 2. Architecture & View Hierarchy

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ LEFT SIDEBAR       │ TOP BAR: Corpus #PJB-8495 / Dossier #5121 • [Status] • Search • [ਪੰਜਾਬੀ] • AK ▾│
│ ────────────────── ├───────────────────────────────────────────────────────────────────┤
│ ENSAAF ARCHIVAL    │ [KPI 1: Corpus 1,248]   [KPI 2: Legal Submissions 38]   [KPI 3: Triage 14]│
│ Active Corpus 84-95├───────────────────────────────────────────────────────────────────┤
│                    │ MAIN WORKSPACE (Hybrid 50 / 50 Split):                            │
│ WORKSTATION:       │ ┌──────────────────────────────┐ ┌──────────────────────────────┐ │
│ • Dashboard/Trends │ │ PRIORITY QUEUE               │ │ [Violation Trends] [Hotspots]│ │
│ • Case Workspace   │ │ • Featured Active Docket     │ │ ──────────────────────────── │ │
│ • Split-View Proof │ │   (Quote, Badges, CTA)       │ │ • Donut Chart (62% Enforced) │ │
│                    │ │ • Docket Queue List          │ │ • District Density Bars      │ │
│ REGISTRY & AUDIT:  │ │   (#112-C Harjinder Singh)   │ │ • Analytical Corridor Link   │ │
│ • Affidavits       │ │   (#204-B Gurmeet Kaur)      │ └──────────────────────────────┘ │
│ • Chain-of-Custody ├───────────────────────────────────────────────────────────────────┤
│ Checksum: SHA-256  │ BOTTOM BAR: Minnesota Protocol Standards • Sync Node IND-PJB-01 • Verified │
└────────────────────┴───────────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Component Plan

### A. Persistent Layout (`src/components/ForensicSidebar.tsx` & `src/components/WorkstationTopBar.tsx`)
1. **Left Sidebar**:
   - Header: Ensaaf seal + "ENSAAF ARCHIVAL CORE" + "1984–1995 Punjab Documentation (Verified Historical Record)".
   - Navigation links with clean Lucide icons and active state highlights in Ensaaf teal.
   - Registry section: Affidavits & Depositions, Chain-of-Custody Log.
   - Bottom: SHA-256 integrity checksum badge.
2. **Top Bar**:
   - Live breadcrumb trail dynamically updating between Home, Case Workspace, and Evidence Proof.
   - Consensus status badge (`STATUS: IN TRIAGE VERIFICATION` or `STATUS: VERIFIED CONSENSUS`).
   - Quick search input (`⌘K`).
   - Signature gold `ENG | ਪੰਜਾਬੀ` language toggle.
   - Researcher avatar badge (`Adv. Amber Kaur, LLM / Lead Case Verifier`) with popover session details.

### B. Dashboard & Trends (`src/components/LandingTriageView.tsx`)
1. **Top 3 Metric Cards**:
   - Styled with clean border lines, warm white backgrounds, and subtle status tags (100% Chain-of-Custody, 4 Ready for High Court Filing, 3 Depositions Uploaded Today).
2. **Left Column (Priority Review Queue)**:
   - Featured Docket Card: Dossier `#84-A`, victim name in English and Gurmukhi, age/vocation, quoted testimony, badges (`3 Affidavits`, `1 Cremation Log`, `Ballistic Discrepancy`), and `Open Case Workspace →` CTA.
   - Docket Queue List: Clean cards for upcoming reviews (`#112-C Harjinder Singh Sandhu`, `#204-B Gurmeet Kaur`, `#5121 Baba Hardit Singh`).
3. **Right Column (Tabbed Trends & Map)**:
   - Tab A: **Macro Patterns & Violation Trends**:
     - Modern SVG donut chart showing violation breakdown (62% Enforced Disappearance, 24% Secret Cremation, 14% Custodial Death).
     - District geographic density horizontal bars (Tarn Taran 542 cases, Amritsar Rural 418 cases, Gurdaspur & Batala 288 cases).
     - Analytical corridor card with CTA to explore the Majha cluster trend.
   - Tab B: **Interactive Regional Hotspot Map**:
     - Preserves the dark base map with glowing beacons and district filtering, switchable on demand.
4. **Bottom Status Bar**:
   - Archival compliance indicator: Minnesota Protocol, Sync Node IND-PJB-01, consensus audit timestamp.

### C. Case Workspace & Facts Verification (`src/components/CaseDeepDiveView.tsx` & `CaseFactsTextView.tsx`)
1. **Default "Pending Verification"**:
   - All facts across all cases initialize to `verifiedStatus: 'pending'` in `src/data/mockCases.ts`.
   - Header shows live tally: `0 / 4 Facts Verified (Pending Researcher Audit)`.
   - Researcher explicitly clicks `Accept Fact` or `Deny / Edit`.
2. **Case Header**:
   - Clean case ID banner (`Case #84-A`, `Registry: PJB-ENF-1989`), victim name in English and Gurmukhi, demographics, Habeas Corpus citations (`CWP No. 1928/1990`).
3. **Right Panel (Evidence Shelf & Remedial Action Hub)**:
   - **Evidence & Provenance Dossier**: Archival document thumbnail, incident raid log excerpt, and button to open full **Synchronized Split-View Proof**.
   - **Recommended Case Actions & Remedies**: Direct action cards (Habeas Corpus & Contempt, Medical Torture Referral, UN Submission) opening the pre-filled drafting drawer.

### D. Synchronized Split-View Proof (`src/components/SplitViewProofModal.tsx`)
1. Matches the evidence split-view from Screenshot 4:
   - Left side: Print Press Ledger (scanned historic microfiche of *Ajit Daily* with OCR polygon overlay, bilingual Gurmukhi/English concordance card).
   - Right side: Oral Deposition Tape (audio waveform player with play/pause, scrub bar, and Whisper ASR synced transcript highlighting spoken Gurmukhi and English translation).
   - Bottom: Immutable Chain of Custody hash verification.

---

## 4. Verification & Testing

1. Run `compile_applet` and `lint_applet` to ensure complete TypeScript compilation and zero lint errors.
2. Verify the hybrid vibe: comfortable readability, generous padding, elegant Ensaaf color palette, combined with high-utility workstation navigation.
3. Test switching between Dashboard, Case Workspace, Synchronized Split-View Proof, and Remedial Action drafting.
4. Test that all facts start in "Pending Verification" and can be individually verified or corrected with live counter updates.
