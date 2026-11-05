/**
 * GitHub Octoverse 2026 - Data Adapter
 * Bridges application modules to the canonical dataset in `dataset/`.
 * Ensures single source of truth and prevents duplicate or conflicting statistics.
 */

import { dataLoader } from './data-loader.js';
import * as chartData from './chart-data.js';

export { dataLoader, chartData };

export const OCTOVERSE_REPORT_META = {
  reportTitle: 'Octoverse: Commits, pushes, reach new highs in 2026 as developers build with agents',
  officialReleaseDate: '2026-10-28',
  reportingWindow: {
    start: '2025-10-01',
    end: '2026-09-30',
    description: 'October 1, 2025 through September 30, 2026 (inclusive)',
  },
  officialSourceUrl: 'https://github.blog/news-insights/octoverse/octoverse-2026/',
  publisher: 'GitHub',
  attributionNotice: 'Source: GitHub, Octoverse 2026, published October 28, 2026. Values transcribed from official report text and graphics.',
};
