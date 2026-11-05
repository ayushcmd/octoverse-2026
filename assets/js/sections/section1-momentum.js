/**
 * Section 1: The Year of Momentum
 * Analytics KPI bar, yearly activity grouped comparison, and acceleration index.
 */

import { chartRegistry } from '../charts/chart-registry.js';
import { getPlatformYearlyActivity, getActivityAccelerationIndex } from '../data/chart-data.js';
import { renderAttributionBadge } from '../data/data-utils.js';
import { $ } from '../utils/dom.js';

export function renderSection1(container, records, sourceRegister) {
  const yearlyData = getPlatformYearlyActivity(records);
  const indexData = getActivityAccelerationIndex(records);

  container.innerHTML = `
    <div class="section-header">
      <span class="section-eyebrow">Chapter 01</span>
      <h2 class="section-title">The Year of Momentum</h2>
      <p class="section-summary">
        Platform activity reached a steep inflection point. In the 12 months ending September 30, 2026, developers pushed code 17.9 billion times—surpassing 2024 and 2025 combined—and executed over 45.4 billion GitHub Actions jobs platform-wide.
      </p>
    </div>

    <!-- Analytics KPI Strip (4 Connected Tiles) -->
    <div class="analytics-kpi-bar" style="margin-bottom: var(--space-6);">
      <div class="kpi-bar-item">
        <div class="kpi-bar-indicator" style="background-color: var(--color-violet);"></div>
        <div class="stat-header">
          <span class="stat-label">Code Pushes</span>
          <span class="stat-delta positive">&gt; 2024 + 2025</span>
        </div>
        <div class="stat-value numeric">17.9B</div>
        <p class="stat-subtext">5.2B in 2024 &bull; 6.7B in 2025 &bull; 17.9B in 2026.</p>
        <div class="stat-footer">
          <span class="badge">Public & Private</span>
          <span class="source-attribution">12 mo. ending Sep 30</span>
        </div>
      </div>

      <div class="kpi-bar-item">
        <div class="kpi-bar-indicator" style="background-color: var(--color-blue);"></div>
        <div class="stat-header">
          <span class="stat-label">Total Commits</span>
          <span class="stat-delta positive">&gt;3&times; in 2 Years</span>
        </div>
        <div class="stat-value numeric">34.3B</div>
        <p class="stat-subtext">10.0B in 2024 &bull; 12.9B in 2025 &bull; 34.3B in 2026.</p>
        <div class="stat-footer">
          <span class="badge">Platform-wide</span>
          <span class="source-attribution">visual-activity-2024-2026</span>
        </div>
      </div>

      <div class="kpi-bar-item">
        <div class="kpi-bar-indicator" style="background-color: var(--color-emerald);"></div>
        <div class="stat-header">
          <span class="stat-label">Actions Jobs / Day</span>
          <span class="stat-delta positive">1,440 runs/sec</span>
        </div>
        <div class="stat-value numeric">124M+</div>
        <p class="stat-subtext">45.4 billion jobs executed over the 12-month period.</p>
        <div class="stat-footer">
          <span class="badge">Actions Platform</span>
          <span class="source-attribution">spotlight-actions</span>
        </div>
      </div>

      <div class="kpi-bar-item">
        <div class="kpi-bar-indicator" style="background-color: var(--color-pink);"></div>
        <div class="stat-header">
          <span class="stat-label">Merged Pull Requests</span>
          <span class="stat-delta positive">Tripled YoY</span>
        </div>
        <div class="stat-value numeric">1.3B</div>
        <p class="stat-subtext">402M in 2024 &bull; 538M in 2025 &bull; 1.30B in 2026.</p>
        <div class="stat-footer">
          <span class="badge">Platform-wide</span>
          <span class="source-attribution">visual-activity-2024-2026</span>
        </div>
      </div>
    </div>

    <!-- Charts Grid: 2 Columns -->
    <div class="grid-2" style="margin-bottom: var(--space-6);">
      <!-- Chart 1: Yearly Activity Comparison -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <h3 class="chart-title">Platform Activity Growth (2024 &ndash; 2026)</h3>
            <p class="chart-subtitle">12-month periods ending September 30 &bull; Public and private repositories</p>
          </div>
          <div class="chart-controls">
            <div class="btn-group" id="s1-metric-filter" role="group" aria-label="Filter activity metric">
              <button type="button" class="btn-group-item active" data-metric="all">All</button>
              <button type="button" class="btn-group-item" data-metric="pushes">Pushes</button>
              <button type="button" class="btn-group-item" data-metric="commits">Commits</button>
              <button type="button" class="btn-group-item" data-metric="actions">Actions</button>
              <button type="button" class="btn-group-item" data-metric="prs">Merged PRs</button>
            </div>
          </div>
        </div>

        <div id="chart-yearly-activity" class="chart-canvas"></div>

        <div class="chart-footer">
          ${renderAttributionBadge({ source_id: 'visual-activity-2024-2026', period: '12 months ending Sep 30', scope: 'Public and private' }, sourceRegister)}
        </div>
      </div>

      <!-- Chart 2: Activity Acceleration Index -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <h3 class="chart-title">Activity Acceleration Index (Sep 2025 Baseline)</h3>
            <p class="chart-subtitle">Relative growth multiple through September 2026 (Sep 2025 = 1.0&times;)</p>
          </div>
        </div>

        <div id="chart-activity-index" class="chart-canvas"></div>

        <div class="chart-footer">
          ${renderAttributionBadge({ source_id: 'visual-activity-indexed', period: 'Sep 2025 – Sep 2026', scope: 'Indexed multiplier' }, sourceRegister)}
        </div>
      </div>
    </div>

    <!-- Editorial Callout: Supply Chain & Contribution Velocity -->
    <div class="editorial-callout">
      <div class="callout-text">
        <h4><i data-lucide="git-merge" style="width: 15px; height: 15px; color: var(--color-blue);"></i> Continuous Delivery & Automated Security Remediations</h4>
        <p>
          Developers merged <strong>30 million+ Dependabot pull requests</strong> in 2026 (doubling 2025 volumes), while public contributions surged from 1.12 billion to <strong>2.5 billion</strong>. Platform infrastructure sustained an average of <strong>3.5 million merged pull requests daily</strong>.
        </p>
      </div>
      <button type="button" class="btn btn-secondary btn-source-image" data-image="sources/images/Octoverse2026_BlogVisual_1.webp">
        <i data-lucide="image" style="width: 12px; height: 12px;"></i> View Activity Graphic
      </button>
    </div>
  `;

  // Render Chart 1: Yearly Activity
  const yearlyChartEl = $('#chart-yearly-activity', container);
  const renderYearlyChart = (metricFilter = 'all') => {
    let seriesToShow = yearlyData.metrics;
    if (metricFilter === 'pushes') seriesToShow = [yearlyData.metrics[0]];
    else if (metricFilter === 'commits') seriesToShow = [yearlyData.metrics[1]];
    else if (metricFilter === 'actions') seriesToShow = [yearlyData.metrics[2]];
    else if (metricFilter === 'prs') seriesToShow = [yearlyData.metrics[3]];

    const colors = ['#bc8cff', '#58a6ff', '#3fb950', '#f778ba'];

    chartRegistry.register('chart-yearly-activity', yearlyChartEl, () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        bottom: 0,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { fontSize: 11 },
      },
      grid: { top: 25, right: 20, bottom: 40, left: 45, containLabel: true },
      xAxis: {
        type: 'category',
        data: yearlyData.years,
        axisLabel: { fontSize: 11, fontWeight: 500 },
      },
      yAxis: {
        type: 'value',
        name: 'Billions',
        axisLabel: { fontSize: 11 },
      },
      series: seriesToShow.map((m, idx) => ({
        name: m.name,
        type: 'bar',
        data: m.data,
        barMaxWidth: 28,
        itemStyle: {
          color: colors[idx % colors.length],
          borderRadius: [3, 3, 0, 0],
        },
      })),
    }));
  };

  renderYearlyChart('all');

  // Filter Buttons Handler
  const filterButtons = container.querySelectorAll('#s1-metric-filter .btn-group-item');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderYearlyChart(btn.dataset.metric);
    });
  });

  // Render Chart 2: Acceleration Index
  const indexChartEl = $('#chart-activity-index', container);
  chartRegistry.register('chart-activity-index', indexChartEl, () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: '{b}: <strong>{c}&times;</strong> baseline growth',
    },
    grid: { top: 15, right: 40, bottom: 25, left: 105, containLabel: true },
    xAxis: {
      type: 'value',
      name: 'Multiplier (x)',
      min: 1,
      max: 6.5,
      axisLabel: { fontSize: 11 },
    },
    yAxis: {
      type: 'category',
      data: indexData.categories,
      inverse: true,
      axisLabel: { fontSize: 11, fontWeight: 500 },
    },
    series: [
      {
        name: 'Acceleration Multiple',
        type: 'bar',
        data: indexData.values,
        barMaxWidth: 22,
        itemStyle: {
          color: (params) => {
            const seriesColors = ['#58a6ff', '#3fb950', '#bc8cff', '#f778ba'];
            return seriesColors[params.dataIndex % seriesColors.length];
          },
          borderRadius: [0, 4, 4, 0],
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}×',
          fontWeight: 600,
          fontFamily: 'monospace',
          fontSize: 11,
        },
      },
    ],
  }));
}
