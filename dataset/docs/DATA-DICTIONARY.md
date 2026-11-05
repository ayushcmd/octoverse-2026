# Data dictionary — Octoverse 2026 unified dataset

## Files
- `data/octoverse-2026.json`: canonical structured dataset with metadata and normalized records.
- `data/observations.csv`: flat, analysis-friendly version of the same records.
- `data/open-source-rankings.json`: ranking lists grouped by report category.
- `metadata/source-register.json`: source IDs and source asset references.
- `metadata/image-manifest.json`: inventory of supplied image assets.
- `sources/images/`: original supplied report graphics/screenshots (copied without alteration).
- `docs/`: reuse, methodology, and validation guidance.

## Record schema
| Field | Meaning |
|---|---|
| `id` | Stable unique identifier; use as a key in applications. |
| `topic` | Broad report topic such as `platform_activity`, `global_developers`, `ai_workflows`, `model_choice`, `programming_languages`, `industries`, `open_source_rankings`, `methodology`. |
| `metric` | Human-readable measure or statement. |
| `value` | Number or text. Text is intentional for approximate, threshold, range, qualitative, or classification values. |
| `unit` | Unit or semantic type (million, billion, %, rank, x, model name, etc.). |
| `period` | Time period to which the observation applies. |
| `scope` | Population or repository scope. |
| `data_type` | `observed`, `projection`, `comparison`, `indexed`, `rank`, `classification`, `qualitative`, or `methodology`. |
| `source_id` | Joins to `metadata/source-register.json`. |
| `category` | Country, language, repository, cohort, or subgroup where applicable. |
| `notes` | Qualification, context, precision warning, or transcription note. |

## Important handling rules
1. Do not treat every `value` as a number. Values like `>40`, `<3`, `17–18`, `approximately`, and qualitative phrases must remain text unless the source gives an exact numeric value.
2. A value with unit `million` or `billion` is expressed in that unit; do not multiply or divide unless converting for display.
3. `rank` is ordinal, not a measured quantity.
4. `projection` is not an observed result.
5. `indexed` values use their stated baseline. For the activity trend, September 2025 = 1x.
6. A comparison must retain its cohort in `category` and the period in `period`.
7. Scope matters: most platform metrics include public and private repositories; industry and open-source metrics are public-only.
8. Country counts are millions of developers, not raw integer accounts.
9. Language participation can count one account in multiple languages.
10. Missing chart points are intentionally absent; never fill them with estimates.

## Known limitations / verification flags
- Some graphics are visual charts without a complete machine-readable series. Only exact values visible in text or clearly transcribed from a graphic are entered as exact records.
- The country developer table is included for the ten countries visible in the supplied graphic.
- Country progress-to-2030 percentages are included only where explicit values were available in the supplied text; no other country percentages are inferred from bars.
- The language forecast graphic provides exact 2027 values for TypeScript, Python, and JavaScript in the supplied text; remaining language forecasts are not fabricated.
- Industry charts include full chart images, but individual bar values are not invented where no exact labels were available.
- The report's full explanatory prose should remain available as a separate source document. This pack structures the available facts and retains original graphics for audit.
