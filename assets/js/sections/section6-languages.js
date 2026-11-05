/**
 * Section 6: Programming Languages
 * Contributor rankings, September 2027 forecasts, YoY growth, and AI-associated PR share.
 */

import { chartRegistry } from '../charts/chart-registry.js';
import { getLanguageGrowthAndAi, getLanguageForecastData } from '../data/chart-data.js';
import { renderAttributionBadge } from '../data/data-utils.js';
import { $ } from '../utils/dom.js';

export function renderSection6(container, records, sourceRegister) {
  const growthAiData = getLanguageGrowthAndAi(records);
  const forecastData = getLanguageForecastData(records);

  container.innerHTML = `
    <div class="section-header">
      <span class="section-eyebrow">Chapter 06</span>
      <h2 class="section-title">Language Choice Has New Influence</h2>
      <p class="section-summary">
        TypeScript maintained its standing as the #1 language on GitHub by monthly participating contributors, followed by Python and JavaScript. Rust demonstrated the fastest percentage growth among top languages (+162% YoY), while strongly typed languages exhibited high affinity for autonomous agent configuration.
      </p>
    </div>

    <!-- Language Core Highlights -->
    <div class="grid-4 kpi-cluster" style="margin-bottom: var(--space-6);">
      <div class="stat-card accent-blue">
        <div class="stat-header">
          <span class="stat-label">TypeScript &bull; Rank #1</span>
          <span class="stat-delta positive">+3.62M in 2026</span>
        </div>
        <div class="stat-value numeric">#1</div>
        <p class="stat-subtext">13.07M monthly contributors projected by September 2027.</p>
        <div class="stat-footer">
          <span class="badge badge-blue">44.1% AI Involvement</span>
          <span class="source-attribution">official-report-text</span>
        </div>
      </div>

      <div class="stat-card accent-yellow">
        <div class="stat-header">
          <span class="stat-label">Python &bull; Rank #2</span>
          <span class="stat-delta positive">+3.23M in 2026</span>
        </div>
        <div class="stat-value numeric">#2</div>
        <p class="stat-subtext">12.56M monthly contributors projected by September 2027.</p>
        <div class="stat-footer">
          <span class="badge">41.1% AI Involvement</span>
          <span class="source-attribution">official-report-text</span>
        </div>
      </div>

      <div class="stat-card accent-orange">
        <div class="stat-header">
          <span class="stat-label">Rust Growth Rate</span>
          <span class="stat-delta positive">+162% YoY</span>
        </div>
        <div class="stat-value numeric">+162%</div>
        <p class="stat-subtext">Fastest percentage expansion among top languages; doubled in size.</p>
        <div class="stat-footer">
          <span class="badge badge-verified">40.4% AI Involvement</span>
          <span class="source-attribution">official-report-text</span>
        </div>
      </div>

      <div class="stat-card accent-violet">
        <div class="stat-header">
          <span class="stat-label">TypeScript Agent Lift</span>
          <span class="stat-delta positive">+11% Share</span>
        </div>
        <div class="stat-value numeric">35% vs 24%</div>
        <p class="stat-subtext">Primary language share in new repos with agent signals vs without.</p>
        <div class="stat-footer">
          <span class="badge badge-violet">Agent-aligned</span>
          <span class="source-attribution">official-report-text</span>
        </div>
      </div>
    </div>

    <!-- Charts Grid: 2 Columns -->
    <div class="grid-2" style="margin-bottom: var(--space-6);">
      <!-- Chart 1: Language Growth vs AI Involvement -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <h3 class="chart-title">Language Growth vs AI-Associated Pull Requests</h3>
            <p class="chart-subtitle">Year-over-year growth % vs percentage of PRs with AI involvement</p>
          </div>
        </div>

        <div id="chart-language-growth-ai" class="chart-canvas"></div>

        <div class="chart-footer">
          ${renderAttributionBadge({ source_id: 'official-report-text', period: '2026 reporting period', scope: 'Top programming languages' }, sourceRegister)}
        </div>
      </div>

      <!-- Chart 2: Contributor Growth & Sep 2027 Forecasts -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <h3 class="chart-title">Top 3 Languages: Growth &amp; 2027 Projections</h3>
            <p class="chart-subtitle">Monthly contributors added in 2026 vs September 2027 forecasts (Millions)</p>
          </div>
        </div>

        <div id="chart-language-forecast" class="chart-canvas"></div>

        <div class="chart-footer">
          ${renderAttributionBadge({ source_id: 'visual-language-forecast', period: 'September 2025 – September 2027', scope: 'Monthly participating accounts' }, sourceRegister)}
          <button type="button" class="btn btn-secondary btn-source-image" data-image="sources/images/Octoverse2026_BlogVisual_8.webp">
            <i data-lucide="image" style="width: 12px; height: 12px;"></i> View Forecast Graphic
          </button>
        </div>
      </div>
    </div>

    <!-- Editorial Callout: TypeScript Agent Signal Alignment -->
    <div class="editorial-callout">
      <div class="callout-text">
        <h4><i data-lucide="terminal" style="width: 15px; height: 15px; color: var(--color-blue);"></i> Deterministic Type Feedback Loops for Autonomous Agents</h4>
        <p>
          In new codebases created in 2026, TypeScript's share reached <strong>35% in repositories with an observed agent signal</strong> versus <strong>24% without</strong>. In established repositories, TypeScript represented <strong>27% with agent signals</strong> versus <strong>17% without</strong>. Strongly typed systems give autonomous agents immediate compiler diagnostics to verify and correct generated code.
        </p>
      </div>
      <span class="badge badge-verified">
        Verified Empirical Telemetry
      </span>
    </div>
  `;

  // Render Chart 1: Language Growth vs AI Involvement
  const growthChartEl = $('#chart-language-growth-ai', container);
  chartRegistry.register('chart-language-growth-ai', growthChartEl, () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        let res = `<strong>${params[0].name}</strong><br/>`;
        params.forEach((p) => {
          res += `${p.marker} ${p.seriesName}: <strong>${p.value}%</strong><br/>`;
        });
        return res;
      },
    },
    legend: {
      bottom: 0,
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { fontSize: 11 },
    },
    grid: { top: 25, right: 20, bottom: 40, left: 45, containLabel: true },
    xAxis: {
      type: 'category',
      data: growthAiData.languages,
      axisLabel: { fontSize: 11, fontWeight: 500 },
    },
    yAxis: {
      type: 'value',
      name: '%',
      axisLabel: { fontSize: 11 },
    },
    series: [
      {
        name: 'YoY Growth (%)',
        type: 'bar',
        data: growthAiData.growth,
        barMaxWidth: 26,
        itemStyle: { color: '#f0883e', borderRadius: [3, 3, 0, 0] },
      },
      {
        name: 'AI-Associated PRs (%)',
        type: 'bar',
        data: growthAiData.aiInvolvement,
        barMaxWidth: 26,
        itemStyle: { color: '#bc8cff', borderRadius: [3, 3, 0, 0] },
      },
    ],
  }));

  // Render Chart 2: Contributor Growth & Sep 2027 Forecasts
  const forecastChartEl = $('#chart-language-forecast', container);
  chartRegistry.register('chart-language-forecast', forecastChartEl, () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        let res = `<strong>${params[0].name}</strong><br/>`;
        params.forEach((p) => {
          res += `${p.marker} ${p.seriesName}: <strong>${p.value}M</strong><br/>`;
        });
        return res;
      },
    },
    legend: {
      bottom: 0,
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { fontSize: 11 },
    },
    grid: { top: 25, right: 20, bottom: 40, left: 45, containLabel: true },
    xAxis: {
      type: 'category',
      data: forecastData.map((d) => d.language),
      axisLabel: { fontSize: 11, fontWeight: 500 },
    },
    yAxis: {
      type: 'value',
      name: 'Millions',
      axisLabel: { fontSize: 11 },
    },
    series: [
      {
        name: 'Added in 2026 (Actual)',
        type: 'bar',
        data: forecastData.map((d) => d.addedInYear),
        barMaxWidth: 28,
        itemStyle: { color: '#3fb950', borderRadius: [3, 3, 0, 0] },
      },
      {
        name: 'Sep 2027 Forecast (Projection)',
        type: 'bar',
        data: forecastData.map((d) => d.forecast2027),
        barMaxWidth: 28,
        itemStyle: { color: '#58a6ff', borderRadius: [3, 3, 0, 0] },
      },
    ],
  }));
}
