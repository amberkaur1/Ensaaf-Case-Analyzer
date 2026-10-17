# Revised Scope Plan: 'Upload Case' Button Renaming, Archival Photo Ingestion, Synthetic Tagging & Review Queue Calibration

An exact-scope architectural and UX plan strictly limited to:
1. **Button Renaming**: Renaming the `"Add Dossier"` button to `"Upload Case"` in `src/components/Navbar.tsx`.
2. **Archival Photo Default & Social Share Removal**: Clearing placeholder victim photos and removing the `"Share profile:"` section from `src/components/CaseFactsTextView.tsx`, rendering a neutral slate container with backup text `"No photo provided"`.
3. **Manual Photo Upload & Browser Persistence**: Adding a manual photo upload option on the case page with browser storage (`localStorage`) so uploaded portraits persist across reloads.
4. **Synthetic Case Tagging**: Prefixing the titles of the two synthetic benchmark cases (`case-majitha-road` and `case-tarn-taran`) in `src/data/mockCases.ts` with `[synthetic-data]`.
5. **Assigned Case Review Queue Calibration**: Calibrating the review queue in `src/data/mockHotspots.ts` to exactly 3 dedicated review cards corresponding to the active cases, while maintaining dynamic synchronization when new cases are ingested via the `"Upload Case"` workflow.

> [!IMPORTANT]
> **Strict Non-Interference Guarantee**: No other components, layouts, navigation bars, interactive maps, entity topology DAGs, timeline views, drawer panels, drafting tools, or styling rules anywhere in the application will be modified, moved, or refactored. All changes are surgically confined to the five requested targets.

---

### User Review & Scope Boundaries

- **Confirmed Decisions**:
  - **Button Label**: Change `"Add Dossier"` button text in `src/components/Navbar.tsx` to `"Upload Case"`.
  - **Photo Storage**: Manually uploaded victim photos are saved in browser `localStorage` (`ensaaf_victim_photo_<caseId>`) to persist across page reloads.
  - **Empty Photo Style**: Neutral slate container with archival portrait notice, `"No photo provided"` backup text, and an `"Upload Photo"` button.
  - **Social Sharing**: The `"Share profile:"` bar with social icons is removed.
  - **Synthetic Tagging**: Titles for `case-majitha-road` and `case-tarn-taran` in `src/data/mockCases.ts` are tagged with `[synthetic-data]`.
  - **Review Queue**: Exactly 3 dedicated cards representing these 3 active cases in `src/data/mockHotspots.ts`, with dynamic prepending of newly ingested cases via `"Upload Case"`.
  - **Zero Regression**: Everything else across the application remains completely untouched.

---

## 1. Overview of Targeted Changes

### What Will Be Changed (Strictly Confined to These Items)
1. **Rename "Add Dossier" Button to "Upload Case"**:
   - In `src/components/Navbar.tsx`:
     - Update button text from `"Add Dossier"` to `"Upload Case"`.
     - Update tooltip/title to reflect the case upload action.
2. **Default Photo & Share Section Removal**:
   - In `src/components/CaseFactsTextView.tsx`:
     - Remove speculative/hardcoded fallback image references.
     - Remove social share bar (`Twitter`, `Facebook`, `Share2`).
     - Render a neutral slate placeholder box displaying backup text `"No photo provided"` and an upload button.
3. **Manual Photo Upload Option on Case Page**:
   - In `src/components/CaseFactsTextView.tsx`:
     - Allow researchers to manually select an image file (`.png`, `.jpg`, `.jpeg`, `.webp`).
     - Persist the uploaded photo to `localStorage` under `ensaaf_victim_photo_${caseId}`.
     - Display the image with archival borders and `"Change Photo"` / `"Remove"` actions.
4. **Synthetic Data Case Titles**:
   - In `src/data/mockCases.ts`:
     - `case-majitha-road`: `"[synthetic-data] Majitha Road Enforced Disappearances (1992)"`
     - `case-tarn-taran`: `"[synthetic-data] Tarn Taran Illegal Custodial Remand Cluster (1991)"`
5. **Assigned Case Review Queue Calibration**:
   - In `src/data/mockHotspots.ts`:
     - Exactly 3 dedicated review tasks matching the 3 active cases with their synchronized headers:
       1. Case 1: *The Kotli Harchand Cluster (1991–1992)* — Baba Hardit Singh (5121) & Baba Sohan Singh (5120)
       2. Case 2: *[synthetic-data] Majitha Road Enforced Disappearances (1992)* — Balkar Singh & Gurmej Singh
       3. Case 3: *[synthetic-data] Tarn Taran Illegal Custodial Remand Cluster (1991)* — Pritam Singh & Jagtar Singh
     - In `App.tsx`: Maintain the `handleCaseAdded` pipeline so that when users upload new data with the `"Upload Case"` button, newly ingested cases continue to automatically populate into the Assigned Case Review Queue.

---

## 2. Component Adjustments

### Navbar Button
```tsx
{/* Upload Case Button (formerly Add Dossier) */}
<button
  onClick={onOpenUpload}
  className="flex items-center gap-2 px-3 py-1.5 bg-[#8b1818] hover:bg-[#721414] text-white text-xs font-bold rounded shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#8b1818] active:scale-95"
  title="Upload raw case documents, REDCap dump, or field transcripts"
>
  <PlusCircle className="w-4 h-4" />
  <span className="hidden sm:inline">Upload Case</span>
</button>
```

### CaseFactsTextView Photo Card
```
┌────────────────────────────────────────────────────────┐
│ [Archival Portrait Placeholder]                       │
│ ┌────────────────────────────────────────────────────┐ │
│ │                  [Image Outline]                   │ │
│ │                 No photo provided                  │ │
│ └────────────────────────────────────────────────────┘ │
│                [ ↑ Upload Photo ]                      │
└────────────────────────────────────────────────────────┘
```

---

## 3. Exact Files to Touch

| File | Exact Scope of Edit |
|---|---|
| `src/components/Navbar.tsx` | Rename button label from `"Add Dossier"` to `"Upload Case"` (and associated tooltip). |
| `src/components/CaseFactsTextView.tsx` | Ensure default blank photo state with `"No photo provided"`, upload photo option with `localStorage` persistence, and removal of share profile bar. |
| `src/data/mockCases.ts` | Ensure `case-majitha-road` and `case-tarn-taran` titles are prefixed with `[synthetic-data]` and default photo URL is cleared. |
| `src/data/mockHotspots.ts` | Ensure `INVESTIGATIVE_TASKS` contains exactly the 3 dedicated review cards matching the 3 active cases. |

---

## 4. Verification Checklist

- [ ] Navigation bar displays **"Upload Case"** instead of "Add Dossier".
- [ ] Clicking "Upload Case" opens the multi-file case ingestion modal as expected.
- [ ] Case page displays neutral slate box with `"No photo provided"` and upload button when no photo has been provided.
- [ ] Manually uploading a photo displays it immediately and persists across page reloads via `localStorage`.
- [ ] A `"Remove"` button clears the uploaded photo and restores the `"No photo provided"` placeholder.
- [ ] Social share bar (`Share profile: ...`) is completely removed.
- [ ] Both synthetic cases display the `[synthetic-data]` tag in their titles.
- [ ] Assigned Case Review Queue displays exactly the 3 active case cards with matching headers.
- [ ] Newly ingested cases dynamically populate into the Assigned Case Review Queue.
