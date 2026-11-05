/**
 * GitHub Octoverse 2026 - Main Application Orchestrator
 * Integrates canonical dataset, dual-theme engine, navigation, image modal,
 * and renders all seven analytical report chapters.
 */

import { themeController } from './theme.js';
import { navigationController } from './navigation.js';
import { chartRegistry } from './charts/chart-registry.js';
import { dataLoader } from './data/data-loader.js';
import { imageModal } from './utils/image-modal.js';
import { renderSection1 } from './sections/section1-momentum.js';
import { renderSection2 } from './sections/section2-geography.js';
import { renderSection3 } from './sections/section3-industries.js';
import { renderSection4 } from './sections/section4-workflow.js';
import { renderSection5 } from './sections/section5-models.js';
import { renderSection6 } from './sections/section6-languages.js';
import { renderSection7 } from './sections/section7-opensource.js';
import { $ } from './utils/dom.js';

class OctoverseApp {
  constructor() {
    this.isReady = false;
  }

  async init() {
    console.info('[Octoverse 2026] Initializing dashboard with canonical dataset...');

    // 1. Initialize Theme Switcher Buttons
    this.initThemeToggle();

    // 2. Initialize Navigation & Scroll-Spy
    navigationController.init();

    // 3. Initialize Apache ECharts Registry
    this.initChartSystem();

    // 4. Initialize Image Modal for Report Graphics Evidence
    imageModal.init();

    // 5. Load Canonical Dataset & Render Sections
    try {
      await dataLoader.load();
      const records = dataLoader.getAllRecords();
      const sourceRegister = dataLoader.getSourceRegister();
      const rankings = dataLoader.getOpenSourceRankings();

      console.info(`[Octoverse 2026] Successfully loaded ${records.length} canonical records.`);

      // Render Hero Analytics KPI Bar
      this.populateHeroKpis(records);

      // Render All Seven Report Sections
      renderSection1($('#section-1-container'), records, sourceRegister);
      renderSection2($('#section-2-container'), records, sourceRegister);
      renderSection3($('#section-3-container'), records, sourceRegister);
      renderSection4($('#section-4-container'), records, sourceRegister);
      renderSection5($('#section-5-container'), records, sourceRegister);
      renderSection6($('#section-6-container'), records, sourceRegister);
      renderSection7($('#section-7-container'), records, sourceRegister, rankings);

      // Initialize all Lucide Icons across rendered content
      this.initIcons();

      this.isReady = true;
      console.info('[Octoverse 2026] All seven report chapters successfully rendered.');
    } catch (err) {
      console.error('[Octoverse 2026] Initialization error:', err);
      const heroKpis = $('#hero-kpis');
      if (heroKpis) {
        heroKpis.innerHTML = `
          <div class="stat-card" style="border-top: 2px solid #cf222e; grid-column: 1 / -1;">
            <h4>Dataset Initialization Error</h4>
            <p class="stat-subtext">Could not load canonical dataset files. Ensure the dashboard is served via an HTTP server (e.g. <code>python -m http.server 8000</code>).</p>
          </div>
        `;
      }
    }
  }

  initThemeToggle() {
    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        themeController.toggleTheme();
        this.initIcons();
      });
    });
  }

  initChartSystem() {
    if (typeof window.echarts !== 'undefined') {
      chartRegistry.init();
      console.info(`[Octoverse 2026] ECharts v${window.echarts.version} registered with dual themes.`);
    } else {
      console.warn('[Octoverse 2026] ECharts library not detected.');
    }
  }

  initIcons() {
    if (typeof window.lucide !== 'undefined' && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  populateHeroKpis(records) {
    const heroKpiContainer = $('#hero-kpis');
    if (!heroKpiContainer) return;

    const pushes = records.find((r) => r.id === 'activity-pushes-2026');
    const globalDevs = records.find((r) => r.id === 'developers-global-total');
    const agentPr = records.find((r) => r.id === 'agent-pr-share-sep');
    const rustGrowth = records.find((r) => r.id === 'language-growth-pct-rust');

    const heroItems = [
      {
        title: 'Platform Activity',
        value: '17.9B',
        badgeText: '&gt; 2024 + 2025 Combined',
        subtext: 'Pushes surpassed 2024 and 2025 combined with 34.3B commits platform-wide.',
        scope: pushes?.scope || 'Public & private repos',
        indicatorColor: 'var(--color-violet)',
      },
      {
        title: 'Global Community',
        value: '225M+',
        badgeText: '+10M Each in US & India',
        subtext: 'Global developer population reached 225M; India projected to cross US by 2030.',
        scope: globalDevs?.scope || 'Worldwide developers',
        indicatorColor: 'var(--color-orange)',
      },
      {
        title: 'Agentic Workflows',
        value: '&gt;40%',
        badgeText: '110M PRs in Sep 2026',
        subtext: 'Pull requests started by AI agents surged from 17% in March to >40% in September.',
        scope: agentPr?.scope || 'GitHub platform',
        indicatorColor: 'var(--color-blue)',
      },
      {
        title: 'Language Shift',
        value: 'Rust +162%',
        badgeText: 'TypeScript #1 by monthly participating contributors',
        subtext: 'Rust doubled (+162% YoY) while TypeScript led with 13M+ projected contributors.',
        scope: rustGrowth?.scope || 'Top tier languages',
        indicatorColor: 'var(--color-emerald)',
      },
    ];

    heroKpiContainer.innerHTML = heroItems
      .map(
        (item) => `
          <div class="kpi-bar-item">
            <div class="kpi-bar-indicator" style="background-color: ${item.indicatorColor};"></div>
            <div class="stat-header">
              <span class="stat-label">${item.title}</span>
              <span class="stat-delta positive">${item.badgeText}</span>
            </div>
            <div class="stat-value numeric">${item.value}</div>
            <p class="stat-subtext">${item.subtext}</p>
            <div class="stat-footer">
              <span class="badge">
                <i data-lucide="check" style="width: 10px; height: 10px;"></i>
                Canonical Record
              </span>
              <span class="source-attribution">${item.scope}</span>
            </div>
          </div>
        `
      )
      .join('');
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new OctoverseApp();
  app.init();
  window.__octoverseApp = app;
});
