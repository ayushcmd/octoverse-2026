# GitHub Report 2026 (`github-report-2026`)

An interactive dashboard presenting official statistics, charts, telemetry, and findings from the **GitHub Octoverse 2026** report (*published October 28, 2026*).

---

## Project Overview

This dashboard is an interactive presentation of the official GitHub Octoverse 2026 report (*"The Year of Momentum"*). It is powered by the local, source-traceable canonical dataset in `dataset/` and preserves GitHub's official findings without fabricated or interpolated data points.

> **Official Attribution Notice:**<br>
> “Source: GitHub, *Octoverse 2026*, published October 28, 2026. Values transcribed from the official report text and graphics.”<br>
> GitHub® and Octocat® are registered trademarks of GitHub, Inc. This project is an interactive presentation with proper attribution.

---

## Canonical Dataset Integration

All visualizations and statistics are directly anchored to the canonical files in `dataset/`:

- **`dataset/data/octoverse-2026.json`**: Canonical structured dataset containing 186 verified records across 11 topics.
- **`dataset/data/open-source-rankings.json`**: The 4 official repository ranking groups (40 repositories total).
- **`dataset/metadata/source-register.json`**: Registry of official report sources and image evidence.
- **`dataset/metadata/chart-catalog.json`**: Chart mapping and methodological guidance.
- **`dataset/sources/images/`**: Original report graphics and screenshots served as evidence.

---

## The Seven Implemented Sections

1. **The Year of Momentum**:
   - Platform activity yearly comparison (2024, 2025, 2026): Code pushes (17.9B), commits (34.3B), Actions jobs (45.4B), merged pull requests (1.3B).
   - Activity acceleration index relative to September 2025 baseline (Commits 6.0×, Actions jobs 4.8×, Pushes 4.5×, Merged PRs 3.9×).
   - Core operational run rates: 1,440 Actions jobs/sec, 124M jobs/day, 30M+ Dependabot PRs, 2.5B public contributions.

2. **Global Developer Community**:
   - Global developer population (225M+).
   - Top 10 national developer populations (US 38.3M, India 32.0M, China 12.4M, Brazil 10.2M, etc.).
   - Official push ranking to public repositories (Top 10 countries).
   - 2030 Projections: India (57.5M) projected to surpass the United States (54.7M).
   - One-year progress toward 2030 projections (Morocco 54.4%, Indonesia 45.4%, US 38.6%, India 28.3%, Kenya 21.7%).
   - Distribution of 43 predictive statistical models evaluated through September 2031.

3. **Industries Building on GitHub**:
   - Public repository creation surged from 9M (2022) to 25M (2026).
   - Industry growth multiples vs 2022: Mining (~65×), Admin & Construction (17–18×), Professional & Technical (~5×), Manufacturing (~3×).
   - AI mentions (>40% in Admin/Mining/Healthcare/Agriculture) vs Agent PR adoption (Construction leading at ~9%).
   - Rocket emoji 🚀 top emoji in every industry codebase.

4. **AI and Agentic Development**:
   - Agent-initiated PR share jumped from 17% (March 2026) to >40% (September 2026; 110M PRs/month).
   - Agent repository commit multiplier: ~8× commits in agent-configured repos vs non-agent codebases.
   - Cohort comparison: Multi-file changes (Agent 87% vs Non-agent 79%) and merge speeds within two weeks (Agent 90% vs Non-agent 86%).
   - Copilot telemetry: 55% agentic MAU, +230% cloud agent growth, +85% agent chat, 264K+ stacked PR developers, 5.8B push protection scans.

5. **The Rise of Model Choice**:
   - Developer-selected request distribution: General Purpose (38%), Deep Reasoning & Planning (37%), Fast & Lightweight (25%).
   - Model diversity: 61% multi-model Copilot users, 47 distinct models used in September, no model exceeding 25% share cap.
   - Auto model selection: 63% adoption among paying Copilot users.
   - Official model classification catalog (Claude Opus 5.5, GPT 5.5, Claude Sonnet 5, Grok 4.7, GPT 6.1 Sol, Gemini 3.8 Flash, etc.).

6. **Programming Languages**:
   - Top language contributor rankings: TypeScript (#1), Python (#2), JavaScript (#3).
   - Contributor growth in 2026 and September 2027 forecasts (TypeScript 13.07M, Python 12.56M, JavaScript 7.42M).
   - YoY growth vs AI involvement: Rust (+162% growth, 40.4% AI), TypeScript (+134% growth, 44.1% AI), Python (+118% growth, 41.1% AI), Java (+30% growth, 21.2% AI).
   - TypeScript agent alignment: 35% vs 24% in new codebases; 27% vs 17% in established repositories.

7. **Open Source at Scale & Methodology**:
   - Complete 4 ranking groups with all 10 repositories each (40 repositories total) from `open-source-rankings.json`.
   - Real-time search by repository name and group category filtering.
   - Clickable GitHub repository links.
   - Official Octoverse 2026 methodology rules, glossary of terms, and measurement standards.

---

## Architecture & Code Layout

```
github-report-2026/
├── index.html                      # Semantic HTML5 entry point & application shell
├── README.md                       # Architectural documentation & runbook
├── dataset/                        # Canonical Source of Truth (Untouched)
│   ├── data/                       # octoverse-2026.json, open-source-rankings.json, observations.csv
│   ├── docs/                       # DATA-DICTIONARY.md
│   ├── metadata/                   # source-register.json, chart-catalog.json
│   └── sources/images/             # Original official report graphics
└── assets/
    ├── css/
    │   ├── variables.css           # GitHub color tokens, Octoverse accents, typography, spacing
    │   ├── base.css                # CSS reset, typography hierarchy, accessible focus styles
    │   ├── layout.css              # Header, navigation, containers, responsive layout grids
    │   ├── components.css          # Theme toggle, stat cards, metric pills, chart cards, tables, modal
    │   └── sections.css            # Section-specific layouts for the 7 report sections
    ├── js/
    │   ├── app.js                  # Application orchestrator & bootstrap lifecycle
    │   ├── theme.js                # Theme controller (system preference, localStorage, events)
    │   ├── navigation.js           # IntersectionObserver scroll-spy & mobile drawer
    │   ├── data/
    │   │   ├── data-loader.js      # Canonical JSON data fetcher & cache
    │   │   ├── data-utils.js       # Record filtering, numeric parsing & source attribution badges
    │   │   ├── chart-data.js       # Verified dataset builders for Apache ECharts
    │   │   └── octoverse-data.js   # Adapter layer ensuring single source of truth
    │   ├── charts/
    │   │   ├── chart-theme.js      # Custom GitHub dark & light Apache ECharts themes
    │   │   ├── chart-registry.js   # Chart lifecycle, ResizeObserver, and theme synchronization
    │   │   └── chart-factory.js    # Reusable ECharts option builders (bar, line, donut, etc.)
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
        ├── hero-band-top.svg       # Top decorative geometric artwork band (Phase 5)
        └── hero-band-bottom.svg    # Bottom decorative geometric artwork band with Octocat parade (Phase 5)
```

---

## Local Development & Execution

Because the dashboard uses native browser ES modules (`import`/`export`) and fetches local JSON datasets, it must be served through an HTTP server.

```powershell
# In C:\Projects\AYUSHCMD-GITHUB\github-report-2026:
python -m http.server 8000
```
Open **`http://localhost:8000`** in any modern web browser.
