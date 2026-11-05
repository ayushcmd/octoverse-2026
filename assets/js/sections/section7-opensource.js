/**
 * Section 7: Open Source at Scale & Official Methodology
 * Complete 4 open-source ranking groups (40 repositories total) with live search and filtering,
 * plus comprehensive report methodology, data dictionary, and official references.
 */

import { renderAttributionBadge } from '../data/data-utils.js';
import { $ } from '../utils/dom.js';

export function renderSection7(container, records, sourceRegister, rankings) {
  const groups = [
    {
      key: 'fastest_growing_community',
      title: 'Fastest-Growing &bull; Community & Independent',
      subtitle: 'Open source community and volunteer-led projects with rapid velocity',
      list: rankings.fastest_growing?.community_independent || [],
      tag: 'Community',
      tagClass: 'badge-verified',
    },
    {
      key: 'fastest_growing_vendor',
      title: 'Fastest-Growing &bull; Single Vendor & Product-Led',
      subtitle: 'Corporate, startup, and single-vendor projects driving tooling adoption',
      list: rankings.fastest_growing?.single_vendor_product_led || [],
      tag: 'Vendor / Product-Led',
      tagClass: 'badge-blue',
    },
    {
      key: 'most_engaged_community',
      title: 'Most-Engaged &bull; Community & Independent',
      subtitle: 'Community-stewarded foundations and multi-maintainer ecosystems',
      list: rankings.most_engaged?.community_independent || [],
      tag: 'Community',
      tagClass: 'badge-verified',
    },
    {
      key: 'most_engaged_vendor',
      title: 'Most-Engaged &bull; Single Vendor & Product-Led',
      subtitle: 'Product-led ecosystems sustaining high contributor interaction',
      list: rankings.most_engaged?.single_vendor_product_led || [],
      tag: 'Vendor / Product-Led',
      tagClass: 'badge-blue',
    },
  ];

  container.innerHTML = `
    <div class="section-header">
      <span class="section-eyebrow">Chapter 07</span>
      <h2 class="section-title">Open Source at Scale &amp; Methodology</h2>
      <p class="section-summary">
        The official GitHub Octoverse 2026 repository rankings highlight both community-governed projects and single-vendor tools. Below are the official top 10 rankings across all four tracked groups, followed by the complete methodology and measurement governance standards.
      </p>
    </div>

    <!-- Repository Rankings Card -->
    <div class="chart-card" style="margin-bottom: var(--space-6);">
      <div class="chart-header">
        <div class="chart-title-group">
          <h3 class="chart-title">Official Octoverse 2026 Repository Rankings</h3>
          <p class="chart-subtitle">All 4 official ranking groups &bull; 10 repositories each (40 repositories total)</p>
        </div>
        <div class="chart-controls" style="gap: var(--space-2); flex-wrap: wrap;">
          <input type="search" id="repo-search-input" placeholder="Filter by repository name..." aria-label="Search repositories" style="padding: 4px 10px; border-radius: var(--radius-md); border: 1px solid var(--border-default); background: var(--bg-canvas); color: var(--text-primary); font-size: var(--text-xs); outline: none;">
          <div class="btn-group" id="repo-group-filter" role="tablist">
            <button type="button" class="btn-group-item active" data-group="all">All (40)</button>
            <button type="button" class="btn-group-item" data-group="fastest_growing_community">Fastest: Community</button>
            <button type="button" class="btn-group-item" data-group="fastest_growing_vendor">Fastest: Vendor</button>
            <button type="button" class="btn-group-item" data-group="most_engaged_community">Engaged: Community</button>
            <button type="button" class="btn-group-item" data-group="most_engaged_vendor">Engaged: Vendor</button>
          </div>
        </div>
      </div>

      <div class="data-table-container">
        <table class="data-table" id="rankings-table">
          <thead>
            <tr>
              <th style="width: 70px;">Rank</th>
              <th>Repository</th>
              <th>Classification Group</th>
              <th>Ecosystem / Type</th>
              <th style="width: 130px; text-align: right;">GitHub Link</th>
            </tr>
          </thead>
          <tbody id="rankings-table-body">
            <!-- Dynamically populated rows -->
          </tbody>
        </table>
      </div>

      <div class="chart-footer">
        ${renderAttributionBadge({ source_id: 'visual-opensource-rankings', period: '2026 reporting period', scope: 'Public open-source repositories' }, sourceRegister)}
        <button type="button" class="btn btn-secondary btn-source-image" data-image="sources/images/image(20261104-135027).png">
          <i data-lucide="image" style="width: 12px; height: 12px;"></i> View Rankings Source Graphic
        </button>
      </div>
    </div>

    <!-- Official Methodology & Measurement Standards -->
    <div class="methodology-card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-3); flex-wrap: wrap; gap: var(--space-2);">
        <h4><i data-lucide="book-open" style="width: 16px; height: 16px; color: var(--color-blue);"></i> Official Octoverse 2026 Measurement Rules &amp; Governance</h4>
        <span class="badge badge-verified">Source: GitHub Inc.</span>
      </div>

      <p class="stat-subtext" style="font-size: var(--text-xs); line-height: var(--leading-relaxed); margin-bottom: var(--space-4);">
        The Octoverse 2026 report evaluates activity on GitHub between <strong>October 1, 2025 and September 30, 2026 (inclusive)</strong>. To protect privacy while providing accurate transparency, platform-wide aggregate counts include both public and private repositories, while language, industry, and project spotlights reflect public repository telemetry.
      </p>

      <div class="glossary-grid">
        <div class="glossary-item">
          <div class="glossary-term">Code Push</div>
          <div class="glossary-def">The upload of Git commits and refs to GitHub. A single push can bundle multiple commits; this distinguishes upload events from raw code revisions.</div>
        </div>
        <div class="glossary-item">
          <div class="glossary-term">Commit</div>
          <div class="glossary-def">An explicit snapshot in Git version history containing author metadata, timestamp, tree hash, and cryptographic signature.</div>
        </div>
        <div class="glossary-item">
          <div class="glossary-term">Agent-Initiated PR</div>
          <div class="glossary-def">A pull request whose opening branch, first draft commit, or pull request creation was authored by a recognized autonomous agent or AI coding assistant.</div>
        </div>
        <div class="glossary-item">
          <div class="glossary-term">Public vs Platform-Wide Scope</div>
          <div class="glossary-def">Total pushes (17.9B) and commits (34.3B) encompass all platform repositories. Language and open source rankings strictly observe public codebases.</div>
        </div>
        <div class="glossary-item">
          <div class="glossary-term">Account Exclusions</div>
          <div class="glossary-def">Spam accounts, bot networks, and GitHub staff accounts are filtered from developer population and contribution tallies.</div>
        </div>
        <div class="glossary-item">
          <div class="glossary-term">2030 Projections</div>
          <div class="glossary-def">Statistical forecasts derived from compound annual growth trajectories across 43 predictive models, clearly delineated from observed metrics.</div>
        </div>
      </div>
    </div>
  `;

  // Render Table Rows with Search and Filtering
  const tbody = $('#rankings-table-body', container);
  const searchInput = $('#repo-search-input', container);
  const filterButtons = container.querySelectorAll('#repo-group-filter .btn-group-item');

  let currentGroup = 'all';
  let currentSearch = '';

  const renderRows = () => {
    let rowsHtml = '';
    let matchesCount = 0;

    groups.forEach((group) => {
      if (currentGroup !== 'all' && group.key !== currentGroup) return;

      group.list.forEach((repoName, idx) => {
        const rank = idx + 1;
        if (currentSearch && !repoName.toLowerCase().includes(currentSearch)) {
          return;
        }

        matchesCount++;
        rowsHtml += `
          <tr>
            <td><strong style="color: var(--text-primary); font-family: var(--font-mono); font-size: 11px;">#${rank}</strong></td>
            <td>
              <strong style="font-family: var(--font-mono); color: var(--text-primary); font-size: 12px;">${repoName}</strong>
            </td>
            <td><span class="${group.tagClass}">${group.tag}</span></td>
            <td><span class="stat-subtext">${group.title.split('&bull;')[0].trim()}</span></td>
            <td style="text-align: right;">
              <a href="https://github.com/${repoName}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="padding: 2px 7px; font-size: 11px;">
                Open Repo <i data-lucide="external-link" style="width: 10px; height: 10px;"></i>
              </a>
            </td>
          </tr>
        `;
      });
    });

    if (matchesCount === 0) {
      rowsHtml = `<tr><td colspan="5" style="text-align: center; padding: var(--space-6); color: var(--text-secondary); font-size: 12px;">No repositories match your search query.</td></tr>`;
    }

    tbody.innerHTML = rowsHtml;
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  };

  renderRows();

  // Search input handler
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim().toLowerCase();
    renderRows();
  });

  // Group filter button handler
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentGroup = btn.dataset.group;
      renderRows();
    });
  });
}
