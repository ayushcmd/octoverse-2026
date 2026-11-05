# GitHub Octoverse 2026 — Universal Data Guide

**Purpose:** A reusable, source-traceable data pack for the official GitHub Octoverse 2026 report. It can power a website, dashboard, charts, notebooks, spreadsheets, reports, or another application. It is not an independent research study and does not replace GitHub's report.

## Source identity
- Report: *Octoverse: Commits, pushes, reach new highs in 2026 as developers build with agents*
- Publisher: GitHub
- Publication date: October 28, 2026
- Main reporting window: October 1, 2025–September 30, 2026 (inclusive), unless a metric specifies another period.

## Start here
1. Read `docs/DATA-DICTIONARY.md` before using the records.
2. Use `data/octoverse-2026.json` as the canonical dataset.
3. Use `data/observations.csv` for spreadsheet or tabular workflows.
4. Use `data/open-source-rankings.json` for the repository ranking lists.
5. Resolve each record's `source_id` through `metadata/source-register.json`.
6. Consult the original graphic in `sources/images/` whenever you build or verify a chart.

## Universal usage pattern
- Filter by `topic`.
- Select the metric and its category.
- Keep `value`, `unit`, `period`, `scope`, `data_type`, and `source_id` together.
- Render observed values, projections, ranks, indexed values, and qualitative findings differently.
- Display a source note and reporting period with every visualization.
- Keep source graphics unchanged in the archive; create derived chart designs separately.

## Data integrity contract
- No fabricated values, synthetic series, interpolation, or guessed chart points.
- Do not convert a range, threshold, or approximate statement into a precise number.
- Do not silently reconcile differences between text and graphics. Flag them for review.
- Preserve GitHub's terminology and framing.
- Do not mix public-only measures with public/private platform-wide measures.
- Clearly label projections and forecasts.
- If a graphic is difficult to read, mark the point as unverified rather than guessing.

## Recommended chart mappings
- Platform activity: grouped bars for yearly pushes, commits, Actions jobs, merged PRs.
- Activity acceleration: indexed multi-series line chart, baseline September 2025 = 1x.
- Developer geography: country choropleth or ranked horizontal bars; only use countries with supported values.
- Agent workflow: KPI figures and grouped comparisons by agent-detected cohort.
- Model choice: donut or stacked bar for request categories; separate KPI for model diversity and auto selection.
- Programming languages: line chart for the full series only if all points are sourced; otherwise KPI/ranking cards for exact figures and use the source graphic as reference.
- Industry: recreate only where the source provides exact data; otherwise show source-derived qualitative statements or the original chart with attribution.
- Open source: ranked tables grouped by the report's two categories.

## Attribution
Use wording such as:
“Source: GitHub, *Octoverse 2026*, published October 28, 2026. Values transcribed from the official report text and graphics.”
Do not imply the dataset is independently published or authored by the project owner.

## Folder structure
- `data/` machine-readable datasets
- `docs/` universal guide and data dictionary
- `metadata/` source registry and image inventory
- `sources/images/` original report graphics/screenshots supplied for this project

## Important completeness note
This package structures all numerical and qualitative facts available in the conversation context and transcribes the supplied report graphics where legible. The full report prose and original images remain the authority. If the full report text is provided as a local file, add it unchanged to `sources/text/` and register it in `metadata/source-register.json`. The separate workspace-inspection note is not the official report and is not treated as report data.
