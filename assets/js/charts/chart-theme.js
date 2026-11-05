/**
 * GitHub Octoverse 2026 - Apache ECharts Theme Architecture
 * Multi-hue Octoverse palette (Blue, Violet, Emerald, Pink, Orange, Cyan, Yellow),
 * high-contrast typography, and refined glassmorphic tooltips for dark & light modes.
 */

export const THEME_DARK_CONFIG = {
  color: [
    '#58a6ff', // Blue
    '#bc8cff', // Violet
    '#3fb950', // Emerald
    '#f778ba', // Pink
    '#f0883e', // Orange
    '#39c5cf', // Cyan
    '#d29922', // Yellow
  ],
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
    color: '#8b949e',
    fontSize: 11,
  },
  title: {
    textStyle: {
      color: '#f0f6fc',
      fontWeight: 600,
      fontSize: 14,
    },
    subtextStyle: {
      color: '#8b949e',
      fontSize: 11,
    },
  },
  line: {
    itemStyle: { borderWidth: 2 },
    lineStyle: { width: 2.5 },
    symbolSize: 5,
    symbol: 'circle',
    smooth: true,
  },
  bar: {
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
    },
  },
  pie: {
    itemStyle: {
      borderColor: '#0d1117',
      borderWidth: 2,
    },
  },
  categoryAxis: {
    axisLine: { show: true, lineStyle: { color: '#30363d', width: 1 } },
    axisTick: { show: false },
    axisLabel: { color: '#8b949e', fontSize: 11, margin: 10 },
    splitLine: { show: false },
  },
  valueAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#8b949e', fontSize: 11 },
    splitLine: { show: true, lineStyle: { color: '#1f242c', type: 'dashed' } },
  },
  legend: {
    textStyle: { color: '#8b949e', fontSize: 11 },
    pageIconColor: '#8b949e',
    pageTextStyle: { color: '#8b949e' },
    itemWidth: 10,
    itemHeight: 10,
    icon: 'circle',
  },
  tooltip: {
    backgroundColor: 'rgba(22, 27, 34, 0.94)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    padding: [8, 12],
    textStyle: {
      color: '#f0f6fc',
      fontSize: 12,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", sans-serif',
    },
    extraCssText: 'backdrop-filter: blur(8px); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5); border-radius: 8px;',
    axisPointer: {
      lineStyle: { color: '#8b949e', type: 'dashed' },
      crossStyle: { color: '#8b949e' },
    },
  },
};

export const THEME_LIGHT_CONFIG = {
  color: [
    '#0969da', // Blue
    '#8250df', // Violet
    '#1a7f37', // Emerald
    '#bf3989', // Pink
    '#bc4c00', // Orange
    '#117ca0', // Cyan
    '#9a6700', // Yellow
  ],
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
    color: '#59636e',
    fontSize: 11,
  },
  title: {
    textStyle: {
      color: '#1f2328',
      fontWeight: 600,
      fontSize: 14,
    },
    subtextStyle: {
      color: '#59636e',
      fontSize: 11,
    },
  },
  line: {
    itemStyle: { borderWidth: 2 },
    lineStyle: { width: 2.5 },
    symbolSize: 5,
    symbol: 'circle',
    smooth: true,
  },
  bar: {
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
    },
  },
  pie: {
    itemStyle: {
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  },
  categoryAxis: {
    axisLine: { show: true, lineStyle: { color: '#d0d7de', width: 1 } },
    axisTick: { show: false },
    axisLabel: { color: '#59636e', fontSize: 11, margin: 10 },
    splitLine: { show: false },
  },
  valueAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#59636e', fontSize: 11 },
    splitLine: { show: true, lineStyle: { color: '#eaeef2', type: 'dashed' } },
  },
  legend: {
    textStyle: { color: '#59636e', fontSize: 11 },
    pageIconColor: '#59636e',
    pageTextStyle: { color: '#59636e' },
    itemWidth: 10,
    itemHeight: 10,
    icon: 'circle',
  },
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderColor: '#d0d7de',
    borderWidth: 1,
    padding: [8, 12],
    textStyle: {
      color: '#1f2328',
      fontSize: 12,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", sans-serif',
    },
    extraCssText: 'backdrop-filter: blur(8px); box-shadow: 0 4px 14px rgba(31, 35, 40, 0.12); border-radius: 8px;',
    axisPointer: {
      lineStyle: { color: '#59636e', type: 'dashed' },
      crossStyle: { color: '#59636e' },
    },
  },
};

/**
 * Register themes with Apache ECharts.
 */
export function registerEChartsThemes() {
  if (typeof window.echarts === 'undefined') {
    console.warn('Apache ECharts is not yet loaded in window. Registration deferred.');
    return false;
  }

  window.echarts.registerTheme('github-dark', THEME_DARK_CONFIG);
  window.echarts.registerTheme('github-light', THEME_LIGHT_CONFIG);
  return true;
}
