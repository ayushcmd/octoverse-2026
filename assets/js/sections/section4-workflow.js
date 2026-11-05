/**
 * Section 4: AI and Agentic Development
 * Agent PR adoption, cohort comparison (multi-file changes & merge velocity), and commit multipliers.
 */

import { chartRegistry } from '../charts/chart-registry.js';
import { getAgentPrComparisonData } from '../data/chart-data.js';
import { renderAttributionBadge } from '../data/data-utils.js';
import { $ } from '../utils/dom.js';

export function renderSection4(container, records, sourceRegister) {
  const comparisonData = getAgentPrComparisonData(records);

  container.innerHTML = `
    <div class="section-header">
      <span class="section-eyebrow">Chapter 04</span>
      <h2 class="section-title">Developers Are Reshaping Their Workflow</h2>
      <p class="section-summary">
        Autonomous agents moved from assistive autocompletion to collaborative task execution. By September 2026, more than 40% of all pull requests were initiated by an AI agent—accounting for over 110 million PRs in September alone. Repositories featuring agent configuration files logged 8 times more commits than standard codebases.
      </p>
    </div>

    <!-- Agent Lead Metrics Strip -->
    <div class="grid-4 kpi-cluster" style="margin-bottom: var(--space-6);">
      <div class="stat-card accent-violet">
        <div class="stat-header">
          <span class="stat-label">Agent-Initiated PR Share</span>
          <span class="stat-delta positive">Sept 2026</span>
        </div>
        <div class="stat-value numeric">&gt;40%</div>
        <p class="stat-subtext">Up from 17% in March 2026 (6&times; volume surge in 6 months).</p>
        <div class="stat-footer">
          <span class="badge badge-verified">110M PRs / mo.</span>
          <span class="source-attribution">spotlight-agent-pr</span>
        </div>
      </div>

      <div class="stat-card accent-blue">
        <div class="stat-header">
          <span class="stat-label">Agent Repo Commit Multiplier</span>
          <span class="stat-delta positive">8&times; Velocity</span>
        </div>
        <div class="stat-value numeric">8&times;</div>
        <p class="stat-subtext">Average commits in repos configured with agent setup files vs standard repos.</p>
        <div class="stat-footer">
          <span class="badge">Platform-wide</span>
          <span class="source-attribution">official-report-text</span>
        </div>
      </div>

      <div class="stat-card accent-emerald">
        <div class="stat-header">
          <span class="stat-label">Copilot Agentic Features</span>
          <span class="stat-delta positive">55% MAU</span>
        </div>
        <div class="stat-value numeric">55%</div>
        <p class="stat-subtext">55% of Copilot MAU utilize agent features (up from 35% in 2025).</p>
        <div class="stat-footer">
          <span class="badge badge-verified">Copilot Users</span>
          <span class="source-attribution">official-report-text</span>
        </div>
      </div>

      <div class="stat-card accent-pink">
        <div class="stat-header">
          <span class="stat-label">Push Protection Scans</span>
          <span class="stat-delta positive">~4&times; vs 2025</span>
        </div>
        <div class="stat-value numeric">5.8B</div>
        <p class="stat-subtext">Secret leaks intercepted prior to entering repository history.</p>
        <div class="stat-footer">
          <span class="badge">Secret Scanning</span>
          <span class="source-attribution">official-report-text</span>
        </div>
      </div>
    </div>

    <!-- Asymmetric Layout: Cohort Comparison Chart + Feature Telemetry -->
    <div class="grid-asymmetric" style="margin-bottom: var(--space-6);">
      <!-- Chart: Agent-Authored vs PRs Without Detected Agent Involvement -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <h3 class="chart-title">Agent-Authored vs PRs Without Detected Agent Involvement</h3>
            <p class="chart-subtitle">Evaluating multi-file change frequency and 2-week merge velocity</p>
          </div>
        </div>

        <div id="chart-agent-pr-comparison" class="chart-canvas"></div>

        <div class="chart-footer">
          ${renderAttributionBadge({ source_id: 'visual-agent-pr-comparison', period: '2026 comparison', scope: 'Pull requests grouped by detected agent involvement' }, sourceRegister)}
          <button type="button" class="btn btn-secondary btn-source-image" data-image="sources/images/Octoverse2026_BlogSpotlight_4.webp">
            <i data-lucide="image" style="width: 12px; height: 12px;"></i> View PR Comparison Graphic
          </button>
        </div>
      </div>

      <!-- Right Column: Emerging Workflow Mechanics -->
      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        <div class="industry-insight-card" style="border-left: 3px solid var(--color-blue);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-primary); font-size: var(--text-sm);">Copilot Cloud Agent &amp; Chat Velocity</strong>
            <span class="badge badge-verified">+230% YoY</span>
          </div>
          <p class="stat-subtext">
            Cloud agent executions expanded <strong>+230% year-over-year</strong>, while agent chat usage grew <strong>+85% YoY</strong> as developers embraced asynchronous delegation.
          </p>
        </div>

        <div class="industry-insight-card" style="border-left: 3px solid var(--color-violet);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-primary); font-size: var(--text-sm);">Stacked Pull Requests Adoption</strong>
            <span class="badge">264,000+ Devs</span>
          </div>
          <p class="stat-subtext">
            Over <strong>264,000 developers</strong> now actively build with stacked PRs, decomposing multi-stage autonomous agent changes into reviewable micro-branches.
          </p>
        </div>

        <div class="industry-insight-card" style="border-left: 3px solid var(--color-orange);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--text-primary); font-size: var(--text-sm);">Interoperability &amp; Reverse Engineering</strong>
            <span class="badge badge-verified">+300%+ YoY</span>
          </div>
          <p class="stat-subtext">
            Repositories mentioning reverse engineering or interoperability grew <strong>300%+ year-over-year</strong>, reflecting developer demand for open protocols and tool connectivity.
          </p>
        </div>
      </div>
    </div>
  `;

  // Render Chart: Agent PR Comparison Grouped Bar
  const compChartEl = $('#chart-agent-pr-comparison', container);
  chartRegistry.register('chart-agent-pr-comparison', compChartEl, () => ({
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
      data: comparisonData.metrics,
      axisLabel: { interval: 0, fontSize: 11, fontWeight: 500 },
    },
    yAxis: {
      type: 'value',
      name: '%',
      max: 100,
      axisLabel: { fontSize: 11 },
    },
    series: [
      {
        name: 'Agent-Authored PRs',
        type: 'bar',
        data: comparisonData.agentAuthored,
        barMaxWidth: 28,
        itemStyle: { color: '#bc8cff', borderRadius: [3, 3, 0, 0] },
      },
      {
        name: 'PRs without detected agent involvement',
        type: 'bar',
        data: comparisonData.withoutDetectedAgent,
        barMaxWidth: 28,
        itemStyle: { color: '#58a6ff', borderRadius: [3, 3, 0, 0] },
      },
    ],
  }));
}
