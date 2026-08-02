# Content checklist

Tick a box when that item is fully done. Paths are relative to the repo root.

---

## 1. Detail stubs

Every role/award below has a dedicated `…/<slug>` page. For each stub you can:
- **Photos** — drop image files in the listed `public/…` folder, then add them to that entry's
  `images` array as `{ src: '/folder/file.jpg', alt: '…', caption: '…' }` (alt required, caption optional).
- **Detail** — the lead paragraph; separate paragraphs with a blank line. Items marked **⚠ verify**
  contain wording I drafted/extrapolated — please confirm or correct.

### Experience — data: `src/data/experience.ts` · photos → `public/experience/`

- [ ] **Data Engineer** — `/experience/lifeline-data-engineer` — photos: _none_ · detail: drafted (expand if you like)
- [ ] **Trainee · Harbor by AaltoES** — `/experience/lifeline-trainee` — photos: _none_ · detail: drafted (expand if you like)
- [ ] **Research Trainee · VTT** — `/experience/vtt-research-trainee` — photos: ✅ Q50 launch · detail: drafted **⚠ verify**
- [ ] **Research Assistant · Pico Group** — `/experience/pico-research-assistant` — photos: _none_ · detail: drafted **⚠ verify**

### Leadership — data: `src/data/leadership.ts` · photos → `public/leadership/`

- [ ] **Founder & Organiser · Aalto Quantum Journal Club** — `/leadership/aalto-quantum-journal-club` — photos: _none_ · detail: seed paragraph (expand?)
- [ ] **Vice Chair · AaltoAI** — `/leadership/aaltoai-vice-chair` — photos: _none_ · detail: thin (one line — flesh out once the role is underway)

### Awards — data: `src/data/achievements.ts` · photos → `public/awards/`

- [ ] **Deep Dive · Mimir** — `/awards/mimir-deep-dive` — photos: ✅ ×2 (win + presenting) · detail: ✅
- [ ] **Dash Hackathon 2023** — `/awards/dash-hackathon-2023` — photos: ✅ ×1 (stage) · detail: ✅

> To give any other award its own stub: add `slug`, `detail`, and `images` to its entry in
> `achievements.ts` — the card will automatically link to `/awards/<slug>`.

---

## 2. Other content

- [ ] **Poster session** (talks) — not added yet (no details). When ready, add it to `src/data/talks.ts`
  (id, venue, event, title, role, description, date, location, an `image` in `public/thumbs/`, links) and
  tell me which experience role it relates to so I can cross-link it.
- [ ] **Bachelor's thesis body** — `src/content/papers/bachelors-thesis.md` still has placeholder text
  ("Replace this body with the actual thesis abstract…"). Add the real abstract + key results.
- [ ] **Unction thumbnail** — `/thumbs/unction.png` reuses the generic Quantum-Multiplier circuit graphic.
  Replace with a real screenshot/diagram if you have one.

## 3. Project logos (event/hackathon cards)

Wired (logo plate on the card): **Harbor**, **Womanium Hackathon — IQM Challenge**,
**IonQ Challenge** (MIT iQuHACK + IonQ), **Classiq Challenge** (MIT iQuHACK + Classiq). Two still need a clean asset —
drop a square PNG/SVG in `public/logos/` and tell me, or I'll wire it:

- [x] **Junction** — the Junction Quantum Hack banner you linked is now the project card thumbnail (it's an 8:5 banner, so used full-bleed rather than on the small logo plate).
- [x] **IMC Prosperity** — the Prosperity 3 banner you linked is now the Alphapolis card thumbnail.

---

## 4. Done (recent)

- [x] Projects all set to **archived except Pause**.
- [x] DAQC-VQE renamed to **Womanium Hackathon — IQM Challenge**.
- [x] **Alphapolis** project added (IMC Prosperity 3) and linked from the IMC award.
- [x] **Lifeline Data Engineer** detail rewritten from the Harbor poster (company-specific names removed).
- [x] **Award stubs**: thumbnail shown full-width at the top, extra photos directly under, not repeated. Dash photo added; Dash + Deep Dive have stubs.
- [x] **IBM Quantum Challenge** split into Fall 2022 + Spring 2023 (Credly badges) — moved to the certifications row.
- [x] **QSilver** & **QBronze** split out (renamed, QWorld seal badges, linking to the full diplomas) — in the certifications row.
- [x] Quantum ML Battle talk — full details from the ad; poster shown **uncropped at 1:1**.
- [x] Introduction to Helmi talk — real ENCCS podium photo.
- [x] Quantum ML Battle year confirmed: **May 2024**.
- [x] Junction Quantum Hack — "Main Stage" → **"Top 5"** (achievement + project).
- [x] IQM — real Womanium/IQM certificate as the card image.
- [x] QuEra — Intro to Programming with Neutral Atoms — added as a credential.
- [x] **Certifications row** on the awards page — 5 Credly badges (Quantum Business Foundations,
  Variational Algorithm Design, Basics of Quantum Information, Quantum-Safe Cryptography,
  Qubit × Qubit Winter School) with official logos + "Verify on Credly" links.
- [x] IBM Quantum Challenge — "Verify on Credly" link.
- [x] Harbor logo nested under Lifeline; Pico penguin nested under Aalto.
- [x] Company/award logos sit on the page background (no white card).
