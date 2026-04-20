# Dynamica SmartRents — Revenue Management Platform POC

## Client
GID Multifamily / Windsor Communities
12 communities across TX, FL, GA, NC, VA

## Stack
- Pure HTML + CSS + Vanilla JS (no framework, no build step)
- Chart.js (CDN) for all data visualisation
- Inter font (Google Fonts)
- Accent color: #e8007d (Dynamica pink)
- Nav background: #1a1a2e
- All shared styles in styles.css
- All seed data in data.js

## Live URL
https://tylerhennessy96-lgtm.github.io/rmdemo/

## Local Path
/Users/tylerhennessy/rmdemo/

## GitHub
tylerhennessy96-lgtm/rmdemo

## Pages

### pricing.html — New Lease Pricing (complete)
- Community → Bed Type → Unit accordion table
- Stats bar: Vacant/30d/60d exposure, concessed units, avg conc, overrides, YoY
- Columns: Property, Avail, RC, Status, Move-out, Avail Date, Alerts, 
  Prior Lease Net Eff. (gross rent tooltip), Anchor Price (editable),
  Rec. Rent Expired, Rec. Rent Current, Delta, Price Change $/%,
  LT (lease term modal), Att. Value, Net Eff. Rent, Concs. Amt, Notes
- Community Class A/B badges (gold/slate)
- Community attribute modal (year built, amenities)
- Unit attribute modal (pinned floorplan/area/floor)
- Lease Term modal: 90vw, Chart.js line chart (Gross/Net Eff lines),
  transposed horizontal table, recommended term = cheapest net eff,
  hold settings in footer
- Exposure & Price KPI panel (fixed bottom, slide-up):
  stacked area chart (Vacant/30d/60d), comp price line chart,
  Daily/Monthly toggle, date selectors in header bar
- Unit Pricing History panel (daily x-axis, override dots)
- Advanced filters drawer (unit ID, unit type, floorplan, 
  community class, RC status, alerts, concessions, availability)
- Anchor price: seeded, always populated, inline-editable
- Non-monthly concessions excluded from Net Eff. calc
- Price overrides: abs/% entry, cascades property→bedtype→unit
- Ask RM copilot: floating button + general panel + unit/bed type row panel

### pricing-renewals.html — Renewals (complete)
- Same accordion structure
- Stats bar: Avg Renewal Rate, Price Change Net Eff, Delta to New Lease
- Columns include: Lease End, Days to Lease End, Days to Offer,
  Lease ID, Lease Term, Lease Price, Concs Amt, Net Eff Lease Price,
  Renewal Offer Price, Renewal Offer Term (LT modal), 
  Renewal Price Change %, Delta to New Lease %, Status, Manual Push
- RC link icon → jumps to rent control management for that unit
- Renewal Terms modal: same chart/table as LT modal (no move-in date)
- Community attribute modal + unit attribute modal

### expiration.html — Expiration Management (complete)
- Community → Bed Type accordion
- Columns: Community/Unit Type, Adjustment Count, Rec Expiration,
  Forecasted Expiration, Sum Delta, Max Delta
- Expiration Detail modal: 24 months of rec/forecasted data
- KPI slide-up panel: dual-axis bar chart + rent forecast line

### term.html — Term Availability (complete)
- Community → Bed Type accordion, 24 month columns (2-24)
- Toggle cells ✓/✗ at bed type level
- Propagation from community level

### term-premiums.html — Term Premiums (complete)
- Same structure, editable % inputs per bed type
- Blank cells where term unavailable

### concessions.html — Concession Management (complete)
Three subtabs: Overview | Management

Overview tab:
- Community → Bed Type → Unit accordion
- Windsor columns: % with concession, avg conc $, avg conc % rent, net eff rent
- Market columns: Comp Offering, Comp Avg, Comp Net Eff, vs Market
- Competitor breakdown modal (clickable market cells)
- Concessions info modal (all levels stacked, linked to management)

Management tab:
- Left navigator: Community → Bed Type → Unit tree
- Right panel: current config (community/bedtype/unit level rows),
  Add/Edit form with: value type ($/% /flat monthly/months free),
  lease term multi-select, gross-up vs discount toggle,
  eligibility (unit status, min vacancy days), exclusions,
  stackable + priority, dates
- Audit history: History button per row, expandable timeline
- Automated concession parameters: vacancy days trigger,
  target coverage %, default type/amount, max cap, auto-expire

Data model:
- Three levels: community / bedtype / unit
- All stack automatically (community + bedtype + unit)
- computeUnitConcessions() respects priority + stackable flag
- Non-monthly concessions (Waived Fee, Gift Card etc.) excluded from Net Eff

### rent-control.html — Rent Control (complete)
Two subtabs: Overview | Management

Overview tab:
- Community → Bed Type → Unit accordion
- RC Program badges: RS/RC/AB/S8/LI/AF/HA (real US programs)
- Columns: Max Increase, Current Increase, vs Limit, 
  Max Allowable Rent, Compliance, Next Filing, Notes
- KPI cards: RC Units, Non-Compliant, At Limit, Communities Affected

Management tab:
- Left navigator: Community → Bed Type → Unit tree
- Right panel: current config at each level + Assign/Edit form
- Program dropdown with all RC types
- Fields: reference/case #, reg date, filing date, 
  custom max increase override, notes, bulk apply
- Compliance summary with warning box for non-compliant units
- recomputeUnitRC() and recomputeCommRC() maintain compliance

### parameters.html — Parameters (complete)
Left sidebar navigation:
- Pricing: Optimization, Price Fluctuation, Hold Days, Renewals, Best Price
- Alerts: Exposure Alerts (Prio 1/2), Comp Corridor (Max/Min),
  Concession Alerts (Prio 1/2)
- Compliance: Price Rounding (method + amount + preview),
  Competitor Exclusions (per-community Competitor-Informed vs Blind Pricing)
- History: date picker + 30/60/90 day shortcuts, read-only snapshot

### demand.html — Placeholder only

## Key Data Files

### data.js
Contains all seed data:
- COMMUNITIES: 12 Windsor communities with class A/B, 
  yearBuilt, amenities, state, metro, rm, cd
- PRICING_DATA: community → bedType → unit structure
  Each unit has: id, recRent, status, rcStatus, alerts,
  floorplan, area, floor, anchorPrice, priorRent, grossRent,
  hasPriorConcession, daysOnMarket, attValue, moveOut, availDate
- RENEWALS_DATA: occupied units with lease/renewal data
- EXPIRATION_DATA: 24-month expiration forecasts
- CONCESSIONS_DATA: three-level concession structure
  with computeUnitConcessions() stacking logic
- RENT_CONTROL_DATA: RC programs per community/bedtype/unit
- PARAMETERS_DATA: per-community parameter settings
- COMPETITOR_DATA: 3-5 competitors per community
- RC_PROGRAM_TYPES: RS, RC, AB, S8, LI, AF, HA definitions

### styles.css
All shared styles. Key variables:
  --nav-bg: #1a1a2e
  --accent: #e8007d
  --border: #e8e8ed
  --radius: 6px
  Font: Inter (Google Fonts)

## Design Principles
- Target viewport: 1920px width, laptop height
- No horizontal scroll on main table
- Panels fixed at bottom (max-height 52vh)
- All modals: min(95vw, Xpx) with max-height 85vh
- Accordion: property → bed type → unit, all expandable
- Class A badge: gold #f59e0b | Class B badge: slate #64748b
- RC badges: RC=red, AF=amber, HA=blue
- Status badges: Vacant=red/orange, On Notice=blue

## Workflow
- Develop locally, preview via file:// in browser
- Push to GitHub when ready: git add . && git commit -m "..." && git push origin main
- GitHub Pages auto-deploys within ~30 seconds

## Ask RM Copilot
- Floating "Ask RM" button (bottom right, pink)
- General panel: portfolio-wide questions about exposure,
  concessions, vacancy, YoY rent change
- Row panel: opens from "+ Ask" on bed type or unit rows,
  shows unit/bed type context with suggested questions
- Rule-based answers computed from seed data (no API calls)
- Implemented in pricing.html only currently
