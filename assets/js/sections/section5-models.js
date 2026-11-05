/**
 * Section 5: The Rise of Model Choice
 * Developer-selected request mix, model diversity metrics, auto model selection, and model classifications.
 */

import { chartRegistry } from '../charts/chart-registry.js';
import { getModelRequestMixData } from '../data/chart-data.js';
import { renderAttributionBadge } from '../data/data-utils.js';
import { $ } from '../utils/dom.js';

export function renderSection5(container, records, sourceRegister) {
  const modelMix = getModelRequestMixData(records);

  container.innerHTML = `
    <div class="section-header">
      <span class="section-eyebrow">Chapter 05</span>
      <h2 class="section-title">The Rise of Model Choice</h2>
      <p class="section-summary">
        Developers actively orchestrated multi-model architectures rather than relying on a single engine. By September 2026, 61% of developers who selected models utilized multiple models across tasks. No single model captured more than 25% of developer-selected requests, demonstrating broad platform diversification.
      </p>
    </div>

    <!-- Diversity KPIs -->
    <div class="grid-4 kpi-cluster" style="margin-bottom: var(--space-6);">
      <div class="stat-card accent-blue">
        <div class="stat-header">
          <span class="stat-label">Multi-Model Users</span>
          <span class="stat-delta positive">Sept 2026</span>
        </div>
        <div class="stat-value numeric">61%</div>
        <p class="stat-subtext">Of developers who choose models manually use &gt;1 model (up from 50% in May).</p>
        <div class="stat-footer">
          <span class="badge">Copilot Users</span>
          <span class="source-attribution">spotlight-model-choice</span>
        </div>
      </div>

      <div class="stat-card accent-violet">
        <div class="stat-header">
          <span class="stat-label">Distinct Models Used</span>
          <span class="stat-delta positive">47 Models</span>
        </div>
        <div class="stat-value numeric">47</div>
        <p class="stat-subtext">Used by paying Copilot users in September (up from 29 in May).</p>
        <div class="stat-footer">
          <span class="badge">Ecosystem Breadth</span>
          <span class="source-attribution">spotlight-model-choice</span>
        </div>
      </div>

      <div class="stat-card accent-emerald">
        <div class="stat-header">
          <span class="stat-label">Top Model Share Cap</span>
          <span class="stat-delta neutral">&le;25%</span>
        </div>
        <div class="stat-value numeric">&le;25%</div>
        <p class="stat-subtext">No single foundational model exceeded a 25% share of developer-selected requests.</p>
        <div class="stat-footer">
          <span class="badge badge-verified">No Model Monopoly</span>
          <span class="source-attribution">spotlight-model-choice</span>
        </div>
      </div>

      <div class="stat-card accent-orange">
        <div class="stat-header">
          <span class="stat-label">Auto Model Selection</span>
          <span class="stat-delta positive">63% Adopted</span>
        </div>
        <div class="stat-value numeric">63%</div>
        <p class="stat-subtext">Of paying Copilot users utilized automatic model routing at least once.</p>
        <div class="stat-footer">
          <span class="badge">Intelligent Routing</span>
          <span class="source-attribution">spotlight-auto-model</span>
        </div>
      </div>
    </div>

    <!-- Asymmetric Layout: Donut Chart + Classified Model Examples -->
    <div class="grid-asymmetric" style="margin-bottom: var(--space-6);">
      <!-- Chart: Developer-Selected Request Mix -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <h3 class="chart-title">Developer-Selected Model Request Distribution</h3>
            <p class="chart-subtitle">7-day period ending Oct 13, 2026 &bull; Excludes automatic model routing</p>
          </div>
        </div>

        <div id="chart-model-request-mix" class="chart-canvas"></div>

        <div class="chart-footer">
          ${renderAttributionBadge({ source_id: 'official-report-text', period: '7-day period ending 2026-10-13', scope: 'Developer-selected requests' }, sourceRegister)}
          <button type="button" class="btn btn-secondary btn-source-image" data-image="sources/images/Octoverse2026_BlogSpotlight_5.webp">
            <i data-lucide="image" style="width: 12px; height: 12px;"></i> View Model Choice Graphic
          </button>
        </div>
      </div>

      <!-- Right Column: Official Model Classifications & Examples -->
      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        <div class="model-tier-card" style="border-left: 3px solid var(--color-blue);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-primary); font-size: var(--text-sm);">General Purpose (38%)</strong>
            <span class="badge badge-blue">Developer-Selected</span>
          </div>
          <p class="stat-subtext">Accounted for 38% of developer-selected requests (excludes auto model selection).</p>
          <div class="model-tag-list">
            <span class="model-tag">Claude Sonnet 5</span>
            <span class="model-tag">Grok 4.7</span>
            <span class="model-tag">GPT 6.1 Sol</span>
          </div>
        </div>

        <div class="model-tier-card" style="border-left: 3px solid var(--color-violet);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-primary); font-size: var(--text-sm);">Deep Reasoning / Planning (37%)</strong>
            <span class="badge badge-violet">Developer-Selected</span>
          </div>
          <p class="stat-subtext">Accounted for 37% of developer-selected requests (excludes auto model selection).</p>
          <div class="model-tag-list">
            <span class="model-tag">Claude Opus 5.5</span>
            <span class="model-tag">GPT 5.5</span>
          </div>
        </div>

        <div class="model-tier-card" style="border-left: 3px solid var(--color-emerald);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-primary); font-size: var(--text-sm);">Fast / Lightweight (25%)</strong>
            <span class="badge badge-verified">Developer-Selected</span>
          </div>
          <p class="stat-subtext">Accounted for 25% of developer-selected requests (excludes auto model selection).</p>
          <div class="model-tag-list">
            <span class="model-tag">Claude Haiku 5.5</span>
            <span class="model-tag">Gemini 3.8 Flash</span>
            <span class="model-tag">GPT 6 Luna</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Render Chart: Donut
  const mixChartEl = $('#chart-model-request-mix', container);
  chartRegistry.register('chart-model-request-mix', mixChartEl, () => ({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: <strong>{c}%</strong> of developer-selected requests',
    },
    legend: {
      bottom: 0,
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { fontSize: 11 },
    },
    series: [
      {
        name: 'Request Category',
        type: 'pie',
        radius: ['46%', '72%'],
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
            formatter: '{b}',
            fontWeight: 600,
            fontSize: 12,
          },
        },
        data: modelMix,
      },
    ],
  }));
}
