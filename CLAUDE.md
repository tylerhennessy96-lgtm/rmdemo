# Windsor Revenue Management System — POC

## What this is
A UI prototype / proof-of-concept for a **revenue management platform** built for **GID Multifamily / Windsor Communities** — a large US multifamily apartment operator. This is a demo/sales tool, not a production app. There is no backend. All data is seeded in `data.js`.

The design is inspired by a Figma mockup (dark nav, white body, teal accent). Do not re-use or reference any third-party IP — all designs should be original recreations in spirit only.

---

## Tech stack
- **Pure HTML + CSS + Vanilla JS** — no framework, no build step, no npm
- Files open directly in a browser
- Charts use **Chart.js 4** via CDN (`https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js`)
- Fonts: **DM Sans** + **DM Mono** via Google Fonts
- All shared styles in `styles.css`
- All seed data in `data.js` (loaded via `<script src="data.js">` on every page)

---

## File structure
```
rmdemo/
├── CLAUDE.md               ← you are here
├── index.html              ← redirects to pricing.html
├── styles.css              ← ALL shared styles (do not inline styles in HTML unless minor tweaks)
├── data.js                 ← ALL seed data and data helper functions
├── pricing.html            ← Pricing tab: New Lease subtab (BUILT)
├── pricing-renewals.html   ← Pricing tab: Renewals subtab (TODO)
├── expiration.html         ← Expiration Management tab (TODO)
├── term.html               ← Term Management: Availability subtab (TODO)
├── term-premiums.html      ← Term Management: Premiums subtab (TODO)
├── concessions.html        ← Concession Management tab (TODO)
├── rent-control.html       ← Rent Control tab (TODO)
├── parameters.html         ← Menu → Parameters (TODO)
└── demand.html             ← Menu → Demand Forecast (TODO)
```

---

## Design system

### Colors (CSS variables in styles.css)
```
--nav-bg:         #16181d      ← dark charcoal nav/header background
--nav-border:     #2a2d35      ← nav border / divider color
--accent:         #3ecf8e      ← teal green — primary action color, active states, highlights
--accent-dim:     #2a9d6a      ← darker teal for hover
--warn:           #f5a623      ← amber warning (⚠ icons, vacancy alerts)
--danger:         #e05252      ← red for negative deltas, errors
--body-bg:        #f5f6f8      ← light grey page background
--surface:        #ffffff      ← white cards, table backgrounds, modals
--border:         #e4e6eb      ← default border
--text-primary:   #1a1d23      ← main text
--text-secondary: #6b7280      ← secondary/label text
--text-muted:     #9ca3af      ← muted/placeholder text
```

### Typography
- Body font: `DM Sans` (weights 300, 400, 500, 600)
- Monospace (unit IDs, codes): `DM Mono` (weights 400, 500)
- Base font size: 13px
- Table cell font size: 12.5px
- Column headers: 11.5px, font-weight 600, color `--text-secondary`

### Layout
- App shell: `display:flex; flex-direction:column; height:100vh; overflow:hidden`
- Top nav height: 52px
- Filter bar height: 44px
- Sub-tab bar height: 44px
- Remaining space: scrollable table area

### Key CSS classes
- `.topnav` — dark top navigation bar
- `.filter-bar` — dark filter row below nav
- `.subtab-bar` — white sub-tab row with underline active indicator
- `.data-table` — main data table (sticky header)
- `.row-property` — top-level property row (bold, white bg)
- `.row-bedtype` — bed type sub-row (indented 28px, slightly grey bg)
- `.row-unit` — individual unit row (indented 44px, mono font ID)
- `.expand-btn` — chevron toggle button for tree expansion
- `.modal-backdrop` / `.modal` — modal overlay system
- `.adv-drawer` — right-side advanced filters panel
- `.exposure-panel` — slide-up chart panel at bottom
- `.btn-primary` — teal filled button
- `.btn-ghost` — outlined button
- `.alert-icons` — row of teal icon buttons (bell, sort, lease, attributes)
- `.avg-badge` — ⊘ average indicator on bed type rows
- `.price-input` — inline borderless price input field
- `.reason-input` — inline borderless reason text input
- `.filter-select` — pill-shaped dark dropdown in filter bar
- `.highlight-teal` — teal colored text (LT, Att. Value columns)
- `.delta-neg` — red text for negative deltas
- `.delta-pos` — teal text for positive deltas

---

## Page structure (every page must have)

### 1. Top nav (.topnav)
- Logo: diamond shape + "Windsor RMS" text
- Nav tabs: Pricing | Expiration Management | Term Management | Concession Management | Rent Control
- Divider + hamburger menu button (⋮⋮⋮) with dropdown: Parameters, Demand Forecast
- Active tab gets `.active` class

### 2. Filter bar (.filter-bar) — dark background, same on every page
Dropdowns (in order):
1. **State** — TX, FL, GA, NC, VA, AZ, CO
2. **Metro Area** — cascades from State selection
3. **Community** — cascades from State/Metro, uses `COMMUNITIES` array from data.js
4. **Revenue Manager** — from `REVENUE_MANAGERS` in data.js
5. **Community Director** — from `COMMUNITY_DIRECTORS` in data.js

### 3. Sub-tab bar (.subtab-bar) — white, page-specific
- Contains page-specific subtabs
- Right side: Advanced filters button and/or Save button depending on page

---

## Data (data.js)

### Key arrays
- `COMMUNITIES` — 12 Windsor communities with: `id, name, state, metro, rm (revenue manager), cd (community director)`
- `PRICING_DATA` — extends COMMUNITIES with `totalUnits, availPct, bedTypes[]`
- `bedTypes[]` — each has `type, totalUnits, availPct, units[], recRent, initialPrice, priorPeriodPrice, deltaInitial, deltaPrior`
- `units[]` — each has `id, status (vacant/on notice/occupied), moveOut, availDate, priorRent, initialPrice, priorPeriodPrice, recRent, deltaInitial, deltaPrior, lt, attValue, netEffRent, concsAmt`
- `TERM_DATA` — extends COMMUNITIES with `availability[24]` (bool array), `premiums[24]` (% array), `bedTypes[]`
- `EXPIRATION_DATA` — extends COMMUNITIES with `months[12]` each having `month, count, pct, target`
- `CONCESSION_DATA` — extends COMMUNITIES with `concessions[]`
- `RENT_CONTROL_DATA` — filtered to VA/NC communities

### Helper functions
- `makeExposureData()` — returns 12-month exposure chart data
- `makeCompData(baseRent)` — returns 12-month competitive position chart data
- `CHART_MONTHS` — array of 12 month labels ('Jan 25' … 'Dec 25')

---

## Pages still to build

### pricing-renewals.html
Similar to pricing.html but for renewal leases. Same table structure, different data context. Show renewal offer, current rent, lease expiry date, recommended renewal rate, delta.

### expiration.html
- Subtabs: none (single view)
- Table: Communities × 12 months grid
- Each cell shows expiration count and % of total leases
- Color coding: green = at/below target, amber = slightly above, red = significantly above target
- Right side: summary stats panel or bar chart showing total expirations by month

### term.html (Term Management — Availability)
- Subtabs: "Lease term availability" (active) | "Lease term premiums"
- Table: Communities × 24 month columns (1–24)
- Each cell: ✓ (green, term available) or ✗ (red, term not available)
- Expandable property rows to show bed types
- Top right: Save button
- Reference: `TERM_DATA[].availability[24]`

### term-premiums.html (Term Management — Premiums)
- Same structure as term.html but cells show editable % values (e.g. "50%", "35%")
- Blank cells where term is not available
- Cells are clickable/editable inline
- Reference: `TERM_DATA[].premiums[24]`

### concessions.html
- Table of active and upcoming concessions by community
- Columns: Community, Concession Type, Amount, Term, Start Date, End Date, Status (Active/Inactive), Actions
- Ability to add new concession (opens modal similar to the one in pricing.html)
- Filter by active/inactive

### rent-control.html
- Only shows communities in rent-controlled markets (VA, NC — filter from COMMUNITIES)
- Columns: Community, State, Max Allowable Increase %, Current Applied Increase %, Status (Compliant/At Risk/Non-Compliant)
- Status color coded: green = compliant, amber = at risk, red = non-compliant
- Reference: `RENT_CONTROL_DATA`

### parameters.html
- Accessed via hamburger menu
- Settings/configuration page
- Sections: Pricing Parameters, Exposure Thresholds, Alert Thresholds, Term Settings
- Form-based UI (not a table)

### demand.html
- Accessed via hamburger menu
- Charts showing demand forecast by community/metro
- Line chart: historical vs forecasted demand
- Bar chart: leads by month
- Use Chart.js, dark panel aesthetic similar to exposure panel in pricing.html

---

## Modals (defined in pricing.html, reuse pattern on other pages)
- **Lease Term modal** — table of 24 lease term lengths with price, concession amt, initial price
- **Attributes modal** — unit area + apartment attributes + community attributes list
- **Concession modal** — discount value, date aspects, period, display time range, term, toggle
- All modals: close on backdrop click, close button top-right, Exit/Cancel + primary action buttons

---

## Conventions & rules
1. **Always load `data.js` before page scripts** — `<script src="data.js"></script>` in `<head>` or before closing `</body>`
2. **Always load `styles.css`** — `<link rel="stylesheet" href="styles.css">`
3. **Never duplicate nav/filter HTML** — copy the exact same block from pricing.html and update the `.active` class
4. **Table headers must be sticky** — `position:sticky; top:0; z-index:10` already in styles.css
5. **Use CSS variables** — never hardcode colors, always use `var(--accent)` etc.
6. **Expand/collapse state** — store in JS Sets/objects, re-render table on toggle
7. **No external dependencies** except Chart.js CDN and Google Fonts
8. **File naming** — all lowercase, hyphenated (e.g. `rent-control.html`)
