/**
 * Section 2: Global Developer Community
 * Demographic summary, top 10 country populations, 2030 projection tracking, and push ranks.
 */

import { chartRegistry } from '../charts/chart-registry.js';
import { getCountryDevelopersData, getProgress2030Data, getForecastModelDistribution } from '../data/chart-data.js';
import { renderAttributionBadge } from '../data/data-utils.js';
import { $ } from '../utils/dom.js';

export function renderSection2(container, records, sourceRegister) {
  const countryData = getCountryDevelopersData(records);
  const progressData = getProgress2030Data(records);
  const forecastMix = getForecastModelDistribution(records);

  container.innerHTML = `
    <div class="section-header">
      <span class="section-eyebrow">Chapter 02</span>
      <h2 class="section-title">Developers Are Building Everywhere</h2>
      <p class="section-summary">
        GitHub's developer population reached 225 million worldwide in 2026. The United States and India drove global momentum—each adding over 10 million developers in the past year alone. India reached 32 million creators and is projected to overtake the United States by 2030.
      </p>
    </div>

    <!-- 3-Column Demographic Summary Strip -->
    <div class="grid-3" style="margin-bottom: var(--space-6);">
      <div class="stat-card accent-blue">
        <div class="stat-header">
          <span class="stat-label">Global Community</span>
          <span class="stat-delta positive">225M+ Creators</span>
        </div>
        <div class="stat-value numeric">225M+</div>
        <p class="stat-subtext">Active software creators and maintainers across all global territories.</p>
        <div class="stat-footer">
          <span class="badge badge-verified">Platform Total</span>
          <span class="source-attribution">developers-global-total</span>
        </div>
      </div>

      <div class="stat-card accent-orange">
        <div class="stat-header">
          <span class="stat-label">United States &amp; India Parity</span>
          <span class="stat-delta positive">+10M Each in 2026</span>
        </div>
        <div class="stat-value numeric">38.3M &bull; 32.0M</div>
        <p class="stat-subtext">US holds #1 position; India is on trajectory to reach 57.5M by 2030.</p>
        <div class="stat-footer">
          <span class="badge badge-projection">2030 Crossover</span>
          <span class="source-attribution">official-report-text</span>
        </div>
      </div>

      <div class="stat-card accent-emerald">
        <div class="stat-header">
          <span class="stat-label">Brazil Milestone</span>
          <span class="stat-delta positive">+3.28M Added</span>
        </div>
        <div class="stat-value numeric">10.2M</div>
        <p class="stat-subtext">Surpassed 10M milestone; leading Latin American contributor base.</p>
        <div class="stat-footer">
          <span class="badge">Rank #4 Worldwide</span>
          <span class="source-attribution">visual-country-developer-counts</span>
        </div>
      </div>
    </div>

    <!-- Asymmetric Analytics Grid -->
    <div class="grid-asymmetric" style="margin-bottom: var(--space-6);">
      <!-- Left: Top 10 Countries by Developer Count -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <h3 class="chart-title">Developer Population by Country (Sep 2026)</h3>
            <p class="chart-subtitle">Top 10 countries transcribed from official report graphic &bull; Millions of accounts</p>
          </div>
        </div>

        <div id="chart-country-developers" class="chart-canvas tall"></div>

        <div class="chart-footer">
          ${renderAttributionBadge({ source_id: 'visual-country-developer-counts', period: 'September 2026', scope: 'Self-reported profile locations' }, sourceRegister)}
          <button type="button" class="btn btn-secondary btn-source-image" data-image="sources/images/image(20261104-134838).png">
            <i data-lucide="image" style="width: 12px; height: 12px;"></i> View Graphic
          </button>
        </div>
      </div>

      <!-- Right Column: Projections Progress & 43 Forecast Models -->
      <div style="display: flex; flex-direction: column; gap: var(--space-6);">
        <!-- Chart: Progress to 2030 Projections -->
        <div class="chart-card">
          <div class="chart-header">
            <div class="chart-title-group">
              <h3 class="chart-title">Progress Toward 2030 Projections</h3>
              <p class="chart-subtitle">One-year progress percentages reported in official text</p>
            </div>
          </div>

          <div id="chart-progress-2030" class="chart-canvas compact"></div>

          <div class="chart-footer">
            ${renderAttributionBadge({ source_id: 'official-report-text', period: '2026 reporting period', scope: 'Country-level forecasts' }, sourceRegister)}
          </div>
        </div>

        <!-- Chart: Forecast Model Distribution -->
        <div class="chart-card">
          <div class="chart-header">
            <div class="chart-title-group">
              <h3 class="chart-title">Forecast Model Trajectories (Through 2031)</h3>
              <p class="chart-subtitle">Distribution across 43 statistical predictive models</p>
            </div>
          </div>

          <div id="chart-forecast-models" class="chart-canvas compact"></div>

          <div class="chart-footer">
            ${renderAttributionBadge({ source_id: 'official-report-text', period: 'Through September 2031', scope: '43 forecast models' }, sourceRegister)}
          </div>
        </div>
      </div>
    </div>

    <!-- Data Table: Public Repository Push Ranks -->
    <div class="chart-card">
      <div class="chart-header">
        <div class="chart-title-group">
          <h3 class="chart-title">Official Country Ranking by Pushes to Public Repositories (2026)</h3>
          <p class="chart-subtitle">Scope: Public repositories &bull; Adjusted profile locations</p>
        </div>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 70px;">Rank</th>
              <th>Country</th>
              <th>Developer Population (Sep 2026)</th>
              <th>Observed Growth &amp; Ecosystem Focus</th>
              <th style="text-align: right;">2030 Horizon</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="badge badge-blue">#1</span></td>
              <td><strong>United States</strong></td>
              <td class="numeric">38.3M</td>
              <td>+10M+ added in 2026 &bull; Top contributor to public codebases</td>
              <td style="text-align: right;"><span class="numeric">54.7M</span> projected</td>
            </tr>
            <tr>
              <td><span class="badge badge-projection">#2</span></td>
              <td><strong>India</strong></td>
              <td class="numeric">32.0M</td>
              <td>+10M+ added in 2026 &bull; 2030 projection: 57.5M</td>
              <td style="text-align: right;"><span class="badge badge-verified">57.5M &bull; Projected #1</span></td>
            </tr>
            <tr>
              <td><span class="badge">#3</span></td>
              <td><strong>China</strong></td>
              <td class="numeric">12.4M</td>
              <td>12.4M developers &bull; #3 in public repository pushes</td>
              <td style="text-align: right;"><span class="stat-subtext">—</span></td>
            </tr>
            <tr>
              <td><span class="badge">#4</span></td>
              <td><strong>Brazil</strong></td>
              <td class="numeric">10.2M</td>
              <td>+3.28M added in 2026 &bull; Crossed 10M milestone</td>
              <td style="text-align: right;"><span class="stat-subtext">—</span></td>
            </tr>
            <tr>
              <td><span class="badge">#5</span></td>
              <td><strong>Germany</strong></td>
              <td class="numeric">6.30M</td>
              <td>6.30M developers &bull; #5 in public repository pushes</td>
              <td style="text-align: right;"><span class="stat-subtext">—</span></td>
            </tr>
            <tr>
              <td><span class="badge">#6</span></td>
              <td><strong>United Kingdom</strong></td>
              <td class="numeric">6.47M</td>
              <td>6.47M developers &bull; #6 in public repository pushes</td>
              <td style="text-align: right;"><span class="stat-subtext">—</span></td>
            </tr>
            <tr>
              <td><span class="badge">#7</span></td>
              <td><strong>Korea, Republic of</strong></td>
              <td><span class="stat-subtext">Not available in supplied data</span></td>
              <td>#7 in public repository pushes</td>
              <td style="text-align: right;"><span class="stat-subtext">—</span></td>
            </tr>
            <tr>
              <td><span class="badge">#8</span></td>
              <td><strong>France</strong></td>
              <td class="numeric">4.75M</td>
              <td>4.75M developers &bull; #8 in public repository pushes</td>
              <td style="text-align: right;"><span class="stat-subtext">—</span></td>
            </tr>
            <tr>
              <td><span class="badge">#9</span></td>
              <td><strong>Japan</strong></td>
              <td class="numeric">7.15M</td>
              <td>7.15M developers &bull; #9 in public repository pushes</td>
              <td style="text-align: right;"><span class="stat-subtext">—</span></td>
            </tr>
            <tr>
              <td><span class="badge">#10</span></td>
              <td><strong>Canada</strong></td>
              <td><span class="stat-subtext">Not available in supplied data</span></td>
              <td>#10 in public repository pushes</td>
              <td style="text-align: right;"><span class="stat-subtext">—</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="chart-footer">
        ${renderAttributionBadge({ source_id: 'official-report-text', period: '2026 reporting period', scope: 'Public repositories; adjusted profile locations' }, sourceRegister)}
      </div>
    </div>
  `;

  // Render Chart: Country Developers Horizontal Bar
  const countryChartEl = $('#chart-country-developers', container);
  chartRegistry.register('chart-country-developers', countryChartEl, () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: '{b}: <strong>{c}M</strong> developers (Sep 2026)',
    },
    grid: { top: 20, right: 45, bottom: 25, left: 110, containLabel: true },
    xAxis: {
      type: 'value',
      name: 'Millions',
      axisLabel: { fontSize: 11 },
    },
    yAxis: {
      type: 'category',
      data: countryData.map((d) => d.country).reverse(),
      axisLabel: { fontWeight: 500, fontSize: 12 },
    },
    series: [
      {
        name: 'Developers (M)',
        type: 'bar',
        data: countryData.map((d) => d.value).reverse(),
        barMaxWidth: 22,
        itemStyle: {
          color: (params) => {
            const countryName = params.name;
            if (countryName === 'United States') return '#58a6ff';
            if (countryName === 'India') return '#f0883e';
            if (countryName === 'Brazil') return '#3fb950';
            if (countryName === 'China') return '#bc8cff';
            return '#39c5cf';
          },
          borderRadius: [0, 4, 4, 0],
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}M',
          fontFamily: 'monospace',
          fontSize: 11,
          fontWeight: 600,
        },
      },
    ],
  }));

  // Render Chart: Progress to 2030 Projections
  const progressChartEl = $('#chart-progress-2030', container);
  chartRegistry.register('chart-progress-2030', progressChartEl, () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: '{b}: <strong>{c}%</strong> closed in 1 year',
    },
    grid: { top: 15, right: 40, bottom: 25, left: 105, containLabel: true },
    xAxis: {
      type: 'value',
      name: '%',
      max: 60,
      axisLabel: { fontSize: 11 },
    },
    yAxis: {
      type: 'category',
      data: progressData.categories.slice().reverse(),
      axisLabel: { fontSize: 11, fontWeight: 500 },
    },
    series: [
      {
        type: 'bar',
        data: progressData.values.slice().reverse(),
        barMaxWidth: 18,
        itemStyle: {
          color: '#3fb950',
          borderRadius: [0, 4, 4, 0],
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          fontFamily: 'monospace',
          fontSize: 10,
          fontWeight: 600,
        },
      },
    ],
  }));

  // Render Chart: Forecast Models Donut
  const forecastChartEl = $('#chart-forecast-models', container);
  chartRegistry.register('chart-forecast-models', forecastChartEl, () => ({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: <strong>{c} models</strong> ({d}%)',
    },
    legend: {
      bottom: 0,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { fontSize: 10 },
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: 'transparent',
          borderWidth: 2,
        },
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            formatter: '{b}\n{c} models',
            fontWeight: 600,
            fontSize: 12,
          },
        },
        data: forecastMix,
      },
    ],
  }));
}
