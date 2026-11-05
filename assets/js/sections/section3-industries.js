/**
 * Section 3: Industries Building on GitHub
 * Public repository creation, industry growth multiples vs 2022, AI exploration, and agent PR rates.
 */

import { chartRegistry } from '../charts/chart-registry.js';
import { getIndustryGrowthMultiples } from '../data/chart-data.js';
import { renderAttributionBadge } from '../data/data-utils.js';
import { $ } from '../utils/dom.js';

export function renderSection3(container, records, sourceRegister) {
  const growthMultiples = getIndustryGrowthMultiples();

  container.innerHTML = `
    <div class="section-header">
      <span class="section-eyebrow">Chapter 03</span>
      <h2 class="section-title">The Future Is Being Built Everywhere</h2>
      <p class="section-summary">
        Software creation expanded into non-traditional industries at unprecedented velocity. Public repositories grew from 9 million in 2022 to 25 million in 2026. Non-tech sectors like mining, construction, healthcare, and agriculture registered multi-fold growth as domain specialists integrated coding assistants.
      </p>
    </div>

    <!-- Top Metric Strip -->
    <div class="grid-4 kpi-cluster" style="margin-bottom: var(--space-6);">
      <div class="stat-card accent-blue">
        <div class="stat-header">
          <span class="stat-label">Public Repos Created</span>
          <span class="stat-delta positive">2022 &rarr; 2026</span>
        </div>
        <div class="stat-value numeric">25M</div>
        <p class="stat-subtext">Surged from 9 million in 2022 to 25 million in 2026.</p>
        <div class="stat-footer">
          <span class="badge">Public Repositories</span>
          <span class="source-attribution">official-report-text</span>
        </div>
      </div>

      <div class="stat-card accent-violet">
        <div class="stat-header">
          <span class="stat-label">Mining &amp; Extraction</span>
          <span class="stat-delta positive">Growth Multiplier</span>
        </div>
        <div class="stat-value numeric">~65&times;</div>
        <p class="stat-subtext">Highest relative repo growth vs 2022 baseline.</p>
        <div class="stat-footer">
          <span class="badge">NAICS Mining</span>
          <span class="source-attribution">official-report-text</span>
        </div>
      </div>

      <div class="stat-card accent-orange">
        <div class="stat-header">
          <span class="stat-label">Admin &amp; Construction</span>
          <span class="stat-delta positive">Growth Multiplier</span>
        </div>
        <div class="stat-value numeric">17&ndash;18&times;</div>
        <p class="stat-subtext">Expanded 17 to 18 times above 2022 baseline volumes.</p>
        <div class="stat-footer">
          <span class="badge">NAICS Construction</span>
          <span class="source-attribution">official-report-text</span>
        </div>
      </div>

      <div class="stat-card accent-emerald">
        <div class="stat-header">
          <span class="stat-label">Construction Agent PRs</span>
          <span class="stat-delta positive">Leading Sector</span>
        </div>
        <div class="stat-value numeric">~9%</div>
        <p class="stat-subtext">Of public repos in construction feature active agent PRs.</p>
        <div class="stat-footer">
          <span class="badge badge-verified">Agent-detected</span>
          <span class="source-attribution">official-report-text</span>
        </div>
      </div>
    </div>

    <!-- Asymmetric Layout: Chart + Comparative Matrix -->
    <div class="grid-asymmetric" style="margin-bottom: var(--space-6);">
      <!-- Chart: Industry Growth Multiples -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <h3 class="chart-title">Public Repository Growth vs 2022 Baseline</h3>
            <p class="chart-subtitle">Multipliers stated in official report &bull; Scope: Public repositories</p>
          </div>
        </div>

        <div id="chart-industry-multiples" class="chart-canvas"></div>

        <div class="chart-footer">
          ${renderAttributionBadge({ source_id: 'official-report-text', period: '2022–2026', scope: 'Public repositories classified by NAICS' }, sourceRegister)}
        </div>
      </div>

      <!-- Right Column: AI Exploration vs Agent PR Matrix -->
      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        <div class="industry-insight-card" style="border-left: 3px solid var(--color-emerald);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-primary); font-size: var(--text-sm);">Construction &bull; Leading Agent Automation</strong>
            <span class="badge badge-verified">~9% Agent PRs</span>
          </div>
          <p class="stat-subtext">
            While approximately <strong>25%</strong> of construction repositories mention AI, <strong>~9%</strong> feature active agent PRs—the highest rate among all non-software industries.
          </p>
        </div>

        <div class="industry-insight-card" style="border-left: 3px solid var(--color-violet);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-primary); font-size: var(--text-sm);">Admin, Mining, Healthcare &amp; Agriculture</strong>
            <span class="badge">&gt;40% AI Mentions</span>
          </div>
          <p class="stat-subtext">
            Over <strong>40%</strong> of repositories in each sector reference AI tools, but fewer than <strong>3%</strong> have agent PRs, indicating broad exploratory interest ahead of automated PR workflows.
          </p>
        </div>

        <div class="industry-insight-card" style="border-left: 3px solid var(--color-blue);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-primary); font-size: var(--text-sm);">Professional, Scientific &amp; Technical</strong>
            <span class="badge">Rank #2 Overall</span>
          </div>
          <p class="stat-subtext">
            Grew <strong>~5&times;</strong> over 2022; ranks #2 in total public repository volume behind Information (#1) and ahead of Education (#3).
          </p>
        </div>
      </div>
    </div>

    <!-- Editorial Callout: Rocket Emoji & NAICS Taxonomy -->
    <div class="editorial-callout">
      <div class="callout-text">
        <h4><i data-lucide="rocket" style="width: 15px; height: 15px; color: var(--color-orange);"></i> Universal Rocket Emoji &amp; NAICS Classification Standard</h4>
        <p>
          The rocket emoji 🚀 was the <strong>#1 most-used emoji across all industry codebases</strong> on GitHub in 2026. Industries were classified by applying the North American Industry Classification System (NAICS) across repository titles, descriptions, and topic tags.
        </p>
      </div>
      <button type="button" class="btn btn-secondary btn-source-image" data-image="sources/images/Octoverse2026_BlogVisual_6.webp">
        <i data-lucide="image" style="width: 12px; height: 12px;"></i> View Industry AI Graphic
      </button>
    </div>
  `;

  // Render Chart: Industry Multiples
  const multiplesChartEl = $('#chart-industry-multiples', container);
  const reversedCategories = growthMultiples.categories.slice().reverse();
  const reversedValues = growthMultiples.values.slice().reverse();
  const reversedLabels = growthMultiples.exactLabels.slice().reverse();

  chartRegistry.register('chart-industry-multiples', multiplesChartEl, () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const item = params[0];
        const label = reversedLabels[item.dataIndex];
        return `${item.name}: <strong>${label}</strong> growth vs 2022`;
      },
    },
    grid: { top: 15, right: 45, bottom: 25, left: 165, containLabel: true },
    xAxis: {
      type: 'value',
      name: 'Multiplier',
      max: 70,
      axisLabel: { fontSize: 11 },
    },
    yAxis: {
      type: 'category',
      data: reversedCategories,
      axisLabel: { width: 155, overflow: 'break', fontSize: 11, fontWeight: 500 },
    },
    series: [
      {
        name: 'Growth Multiplier',
        type: 'bar',
        data: reversedValues,
        barMaxWidth: 22,
        itemStyle: {
          color: (p) => {
            const colors = ['#58a6ff', '#3fb950', '#f0883e', '#bc8cff'];
            return colors[p.dataIndex % colors.length];
          },
          borderRadius: [0, 4, 4, 0],
        },
        label: {
          show: true,
          position: 'right',
          formatter: (p) => reversedLabels[p.dataIndex],
          fontWeight: 600,
          fontFamily: 'monospace',
          fontSize: 11,
        },
      },
    ],
  }));
}
