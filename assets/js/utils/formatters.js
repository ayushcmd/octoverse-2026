/**
 * GitHub Octoverse 2026 - Formatting Utilities
 * Standardized data formatters for large metrics, percentages, and currencies.
 */

/**
 * Format large numbers to human-readable compact strings (B, M, K).
 * Preserves high precision without losing context.
 * @param {number} value - Numeric value to format
 * @param {number} [digits=1] - Number of fraction digits
 * @returns {string} Formatted compact string, e.g. "17.9B", "124M"
 */
export function formatCompactNumber(value, digits = 1) {
  if (value === null || value === undefined || isNaN(value)) {
    return '—';
  }

  const absVal = Math.abs(value);

  if (absVal >= 1e9) {
    const formatted = (value / 1e9).toFixed(digits);
    return `${formatted.replace(/\.0$/, '')}B`;
  }
  if (absVal >= 1e6) {
    const formatted = (value / 1e6).toFixed(digits);
    return `${formatted.replace(/\.0$/, '')}M`;
  }
  if (absVal >= 1e3) {
    const formatted = (value / 1e3).toFixed(digits);
    return `${formatted.replace(/\.0$/, '')}K`;
  }

  return value.toLocaleString('en-US');
}

/**
 * Format integers with standard thousands separators.
 * @param {number} value
 * @returns {string} e.g. "17,900,000,000"
 */
export function formatInteger(value) {
  if (value === null || value === undefined || isNaN(value)) {
    return '—';
  }
  return Math.round(value).toLocaleString('en-US');
}

/**
 * Format percentages with an optional explicit plus sign for positive deltas.
 * @param {number} value - Value expressed as a percent (e.g., 40.5 for 40.5%)
 * @param {boolean} [showSign=true] - Whether to prepend "+" for positive numbers
 * @param {number} [digits=1] - Decimal precision
 * @returns {string} e.g. "+40.5%", "-3.2%"
 */
export function formatPercentage(value, showSign = true, digits = 1) {
  if (value === null || value === undefined || isNaN(value)) {
    return '—';
  }

  const formatted = Math.abs(value).toFixed(digits).replace(/\.0$/, '');
  if (value > 0 && showSign) {
    return `+${formatted}%`;
  }
  if (value < 0) {
    return `-${formatted}%`;
  }
  return `${formatted}%`;
}

/**
 * Format multiplier factor, e.g. 8x or 3.2x.
 * @param {number} factor
 * @param {number} [digits=1]
 * @returns {string}
 */
export function formatMultiplier(factor, digits = 1) {
  if (factor === null || factor === undefined || isNaN(factor)) {
    return '—';
  }
  const formatted = factor.toFixed(digits).replace(/\.0$/, '');
  return `${formatted}×`;
}
