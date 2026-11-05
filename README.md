# GitHub Octoverse 2026 Data Explorer

An independent educational dashboard presenting official statistics, telemetry charts, model diversity, global demographics, and open-source rankings from the **GitHub Octoverse 2026** report (*published October 28, 2026*).

---

> [!IMPORTANT]
> **Independent Educational Project Notice**<br>
> This website and repository were created independently for learning, educational, and informational purposes to explore and understand findings from GitHub's official Octoverse 2026 report. It is not affiliated with, endorsed by, sponsored by, or maintained by GitHub, Inc. GitHub® and Octocat® are registered trademarks of GitHub, Inc.

---

## 1. Project Purpose & Scope

The **GitHub Octoverse 2026 Data Explorer** is an interactive, client-side data exploration product. It takes the official findings published in GitHub's Octoverse 2026 report (*"The Year of Momentum"*) and renders them as interactive, responsive visualizations and searchable tables.

- **Primary Goal:** Provide an explorable, high-density visualization tool for developers, students, and engineering leaders to analyze 2026 software trends.
- **Data Integrity Contract:** Zero synthetic data points, zero guessed numbers, and zero silent reconciliation. All metrics map directly to canonical source records transcribed from official report prose and graphics.
- **Independent Status:** An educational tool built to study data visualization and telemetry presentation; not an official GitHub publication or product.

---

## 2. Official Source Material & Attribution

The source material for this explorer is GitHub's official Octoverse 2026 report:

- **Original Report:** *Octoverse: Commits, pushes, reach new highs in 2026 as developers build with agents*
- **Publisher:** GitHub, Inc.
- **Publication Date:** October 28, 2026
- **Reporting Window:** October 1, 2025 through September 30, 2026 (inclusive), unless explicitly noted otherwise.
- **Official Source URL:** [https://github.blog/news-insights/octoverse/octoverse-2026/](https://github.blog/news-insights/octoverse/octoverse-2026/)
- **Attribution Notice:** *“Source: GitHub, Octoverse 2026, published October 28, 2026. Values transcribed from official report text and graphics.”*

---

## 3. Dashboard Chapters

The explorer covers all seven official analytical chapters:

1. **Chapter 01 — The Year of Momentum**:
   - Platform activity yearly growth (2024, 2025, 2026): Code pushes (17.9B), commits (34.3B), Actions jobs (45.4B), and merged pull requests (1.3B).
   - Activity acceleration index relative to September 2025 baseline (Commits 6.0×, Actions jobs 4.8×, Pushes 4.5×, Merged PRs 3.9×).
   - Core operational run rates: 1,440 Actions jobs/sec, 124M jobs/day, 30M+ Dependabot PRs, 2.5B public contributions.

2. **Chapter 02 — Global Developer Community**:
   - Global developer population (225M+ software creators worldwide).
   - Top 10 national developer populations (US 38.3M, India 32.0M, China 12.4M, Brazil 10.2M, etc.).
   - Official push ranking to public repositories across global territories.
   - 2030 Projections: India (57.5M) on trajectory to cross the United States (54.7M).
   - One-year progress toward 2030 projections (Morocco 54.4%, Indonesia 45.4%, US 38.6%, India 28.3%, Kenya 21.7%).
   - Distribution of 43 predictive statistical models evaluated through September 2031.

3. **Chapter 03 — Industries Building on GitHub**:
   - Public repository creation surged from 9M (2022) to 25M (2026).
   - Industry growth multiples vs 2022 baseline: Mining (~65×), Admin & Construction (17–18×), Professional & Technical (~5×), Manufacturing (~3×).
   - AI mentions (>40% in Admin/Mining/Healthcare/Agriculture) vs Agent PR adoption (Construction leading at ~9%).
   - Rocket emoji 🚀 top emoji in every industry codebase classified by NAICS.

4. **Chapter 04 — AI and Agentic Development**:
   - Agent-initiated PR share jumped from 17% (March 2026) to >40% (September 2026; 110M PRs/month).
   - Agent repository commit multiplier: ~8× commits in agent-configured repos vs non-agent codebases.
   - Cohort comparison: Multi-file changes (Agent 83% vs Non-agent 47%) and merge speeds within two weeks (Agent 74% vs Non-agent 69%).
   - Copilot telemetry: 55% agentic MAU, +230% cloud agent growth, +85% agent chat, 264K+ stacked PR developers, 5.8B push protection scans.

5. **Chapter 05 — The Rise of Model Choice**:
   - Developer-selected request distribution: General Purpose (38%), Deep Reasoning & Planning (37%), Fast & Lightweight (25%).
   - Model diversity: 61% multi-model Copilot users, 47 distinct models used in September, no model exceeding 25% share cap.
   - Auto model selection: 63% adoption among paying Copilot users.
   - Official model classification catalog (Claude Opus 5.5, GPT 5.5, Claude Sonnet 5, Grok 4.7, GPT 6.1 Sol, Gemini 3.8 Flash, etc.).

6. **Chapter 06 — Programming Languages**:
   - Top language contributor rankings: TypeScript (#1), Python (#2), JavaScript (#3).
   - Contributor growth in 2026 and September 2027 forecasts (TypeScript 13.07M, Python 12.56M, JavaScript 11.23M).
   - YoY growth vs AI involvement: Rust (+162% growth, 40.4% AI), TypeScript (+134% growth, 44.1% AI), Python (+118% growth, 41.1% AI), Java (+30% growth, 21.2% AI).
   - TypeScript agent alignment: 35% vs 24% in new codebases; 27% vs 17% in established repositories.

7. **Chapter 07 — Open Source at Scale & Methodology**:
   - Complete 4 ranking groups with all 10 repositories each (40 repositories total) from `open-source-rankings.json`.
   - Real-time search by repository name and group category filtering.
   - Clickable GitHub repository links.
   - Official Octoverse 2026 methodology rules, glossary of terms, and measurement standards.

---

## 4. Technology Stack & Architectural Principles

- **Zero Bundler & Zero Build Step:** Native ECMAScript (ES) modules (`import` / `export`) loaded directly by modern browsers.
- **Zero Backend:** Pure static HTML5, CSS3, and JavaScript delivery with no server-side runtime, node server, or database.
- **Design System:** Custom GitHub-inspired design tokens with refined glassmorphism, KaTeX-safe typography, CSS custom properties, and automated dark/light theme switching.
- **Visualizations:** Apache ECharts v5.5.1 initialized through a centralized responsive registry (`chartRegistry`) supporting real-time theme synchronization and `ResizeObserver`.
- **Icons:** Lucide Icons v0.344.0.

---

## 5. Local Setup Instructions

Because the application uses native browser ES modules and fetches local JSON datasets via `fetch()`, it requires a local HTTP server to satisfy standard CORS / Origin security policies.

### Using Python (Pre-installed on macOS / Windows / Linux)
```powershell
# Navigate to the workspace directory:
cd C:\Projects\AYUSHCMD-GITHUB\github-report-2026

# Start a local static HTTP server:
python -m http.server 8000
```
Open **`http://localhost:8000`** in your browser.

### Using Node.js / npx
```bash
npx serve . -p 8000
```

---

## 6. Canonical Dataset Directory Structure

The project maintains an immutable, source-traceable dataset hierarchy under `dataset/`:

```
dataset/
├── README.md                       # Canonical dataset specification & citation guide
├── data/
│   ├── octoverse-2026.json         # 186 normalized canonical telemetry records
│   ├── open-source-rankings.json   # 4 official repository ranking groups (40 repos)
│   └── observations.csv            # Tabular observation export
├── docs/
│   └── DATA-DICTIONARY.md          # Comprehensive schema and fields reference
├── metadata/
│   ├── source-register.json        # Registry linking metric records to official sources
│   └── chart-catalog.json          # Mapping between report graphics and visual specs
└── sources/
    ├── images/                     # 22 authentic official report graphics & screenshots
    └── text/
        └── workspace-inspection-note.txt
```

---

## 7. Project File Structure

```
github-report-2026/
├── index.html                      # Semantic HTML5 entry point & application shell
├── README.md                       # Project documentation & runbook
├── .gitignore                      # Git exclusion rules
├── dataset/                        # Canonical dataset & report graphics
└── assets/
    ├── css/
    │   ├── variables.css           # Design tokens, color palette, typography, spacing
    │   ├── base.css                # CSS reset, typography hierarchy, accessible focus styles
    │   ├── layout.css              # Header, navigation, containers, footer, responsive grids
    │   ├── components.css          # Theme toggle, stat cards, metric pills, chart cards, tables, modal
    │   └── sections.css            # Section-specific styles for the 7 report sections
    ├── js/
    │   ├── app.js                  # Application orchestrator & bootstrap lifecycle
    │   ├── theme.js                # Theme controller (system preference, localStorage, events)
    │   ├── navigation.js           # IntersectionObserver scroll-spy & mobile drawer
    │   ├── data/
    │   │   ├── data-loader.js      # Canonical JSON data fetcher & cache
    │   │   ├── data-utils.js       # Record filtering, numeric parsing & attribution badges
    │   │   ├── chart-data.js       # Verified dataset transformations for ECharts
    │   │   └── octoverse-data.js   # Adapter layer ensuring single source of truth
    │   ├── charts/
    │   │   ├── chart-theme.js      # Custom GitHub dark & light Apache ECharts themes
    │   │   ├── chart-registry.js   # Chart lifecycle, ResizeObserver, and theme synchronization
    │   │   └── chart-factory.js    # Reusable ECharts option builders
    │   ├── sections/
    │   │   ├── section1-momentum.js
    │   │   ├── section2-geography.js
    │   │   ├── section3-industries.js
    │   │   ├── section4-workflow.js
    │   │   ├── section5-models.js
    │   │   ├── section6-languages.js
    │   │   └── section7-opensource.js
    │   └── utils/
    │       ├── formatters.js       # Number, multiplier, and percentage formatters
    │       ├── dom.js              # DOM helpers and element builders
    │       └── image-modal.js      # Report graphic evidence modal dialog
    └── images/
        ├── github-mark.svg         # Official GitHub Invertocat mark
        ├── octoverse-badge.svg     # Octoverse 2026 emblem
        ├── hero-band-top.svg       # Top decorative geometric artwork band
        └── hero-band-bottom.svg    # Bottom decorative geometric artwork band with Octocat silhouettes
```

---

## 8. GitHub Pages Deployment Readiness

This project is fully designed and verified for static deployment on **GitHub Pages**:

- **Repository:** `ayushcmd/Octoverse-2026`
- **Expected Subpath:** `/Octoverse-2026/`
- **Asset Paths:** All stylesheets, ES module imports, SVGs, datasets, and report graphics use relative paths (`assets/...`, `./dataset/...`).
- **No Base Path Collisions:** The application functions equivalently at root `/` and subpath `/Octoverse-2026/` without base URL rewriting.

### Future Deployment Instructions (When Approved)
When public deployment is approved:
1. In the GitHub repository settings (`https://github.com/ayushcmd/octoverse-2026/settings/pages`):
   - Set **Source** to `Deploy from a branch`.
   - Select branch **`main`** and folder **`/ (root)`**.
   - Click **Save**.
2. GitHub Pages will publish the static site at:  
   `https://ayushcmd.github.io/octoverse-2026/`
3. Zero build workflows or artifact compilations are required.

---

## 9. License & Attribution

- **Report Content & Telemetry:** © GitHub, Inc. All rights reserved. Values transcribed from official report text and graphics.
- **Trademarks:** GitHub®, Octoverse®, Copilot®, and the Octocat logo are registered trademarks of GitHub, Inc.
- **Code & Educational Presentation:** Released under the MIT License for educational and learning purposes.
