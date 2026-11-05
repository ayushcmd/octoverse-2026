/**
 * GitHub Octoverse 2026 - Data Query & Attribution Utilities
 * Filters canonical records, safely extracts numeric values, formats units,
 * and attaches verified source citations.
 */

/**
 * Filter records matching given criteria.
 * @param {Array<Object>} records
 * @param {Object} criteria - Key-value pairs to match (e.g. { topic: 'platform_activity', data_type: 'observed' })
 * @returns {Array<Object>}
 */
export function filterRecords(records, criteria = {}) {
  return records.filter((r) => {
    for (const [key, val] of Object.entries(criteria)) {
      if (r[key] !== val) return false;
    }
    return true;
  });
}

/**
 * Safely parse a numeric value from a canonical record.
 * Returns null if the value is a range, threshold, or qualitative text (e.g. ">40", "17–18", "65 times approximately").
 * @param {Object} record
 * @returns {number|null}
 */
export function parseNumericValue(record) {
  if (!record || record.value === undefined || record.value === null) return null;
  if (typeof record.value === 'number') return record.value;

  const str = String(record.value).trim();
  // Check if string contains threshold or range symbols
  if (str.includes('>') || str.includes('<') || str.includes('–') || str.includes('-') && isNaN(Number(str))) {
    return null;
  }

  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

/**
 * Format a record's complete metric display value including unit and precision.
 * @param {Object} record
 * @returns {string} e.g. "17.9 billion", ">40 %", "1,440 jobs/second"
 */
export function formatRecordValue(record) {
  if (!record) return '—';
  const val = record.value;
  const unit = record.unit ? ` ${record.unit}` : '';
  return `${val}${unit}`;
}

/**
 * Generate standard HTML source attribution footnote for a record or source object.
 * @param {Object} recordOrSource
 * @param {Array<Object>} [sourceRegister=[]]
 * @returns {string} HTML string
 */
export function renderAttributionBadge(recordOrSource, sourceRegister = []) {
  if (!recordOrSource) return '';

  let sourceId = recordOrSource.source_id;
  let period = recordOrSource.period || '';
  let scope = recordOrSource.scope || '';
  let notes = recordOrSource.notes || '';

  let sourceMeta = sourceRegister.find((s) => s.source_id === sourceId);
  let sourceTitle = sourceMeta?.title || sourceId || 'GitHub Octoverse 2026';
  let imagePath = sourceMeta?.file_path || null;

  return `
    <div class="source-attribution" data-source-id="${sourceId || ''}">
      <span class="attr-title"><i data-lucide="shield-check" style="width: 12px; height: 12px; vertical-align: middle;"></i> Source: <strong>${sourceTitle}</strong></span>
      ${period ? `<span class="attr-sep">•</span> <span class="attr-period">${period}</span>` : ''}
      ${scope ? `<span class="attr-sep">•</span> <span class="attr-scope">${scope}</span>` : ''}
      ${imagePath ? `<button type="button" class="btn-source-image" data-image="${imagePath}" title="View original report graphic"><i data-lucide="image" style="width: 12px; height: 12px;"></i> View Graphic</button>` : ''}
    </div>
  `;
}
