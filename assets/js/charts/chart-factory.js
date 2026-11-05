/**
 * GitHub Octoverse 2026 - Reusable Chart Factory
 * Generates standards-compliant Apache ECharts options for all core chart archetypes.
 * Pure configuration builders designed for seamless dual-theme integration.
 */

/**
 * Base grid configuration with responsive padding.
 */
export const DEFAULT_GRID = {
  top: 40,
  right: 20,
  bottom: 30,
  left: 50,
  containLabel: true,
};

/**
 * Create a standardized Bar chart option (supports vertical, horizontal, grouped, and stacked).
 * @param {Object} params
 * @param {string[]} params.categories - X-axis or Y-axis categories
 * @param {Array<{name: string, data: number[], stack?: string, color?: string}>} params.series
 * @param {boolean} [params.horizontal=false] - Whether bars are horizontal
 * @param {boolean} [params.stacked=false] - Whether series should stack
 * @param {string} [params.yAxisLabel] - Optional Y-axis unit label
 * @param {Object} [params.grid] - Grid overrides
 * @returns {Object} ECharts option
 */
export function createBarChartOption({
  categories,
  series,
  horizontal = false,
  stacked = false,
  yAxisLabel = '',
  grid = DEFAULT_GRID,
}) {
  const categoryAxis = {
    type: 'category',
    data: categories,
    axisTick: { show: false },
  };

  const valueAxis = {
    type: 'value',
    name: yAxisLabel,
  };

  const formattedSeries = series.map((s, idx) => ({
    name: s.name,
    type: 'bar',
    data: s.data,
    stack: stacked ? (s.stack || 'total') : undefined,
    itemStyle: s.color ? { color: s.color } : undefined,
    barMaxWidth: 36,
  }));

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      show: series.length > 1,
      bottom: 0,
    },
    grid,
    xAxis: horizontal ? valueAxis : categoryAxis,
    yAxis: horizontal ? categoryAxis : valueAxis,
    series: formattedSeries,
  };
}

/**
 * Create a Line or Area chart option.
 * @param {Object} params
 * @param {string[]} params.categories - Temporal or categorical labels
 * @param {Array<{name: string, data: number[], isArea?: boolean, color?: string}>} params.series
 * @param {boolean} [params.isArea=false] - Default area fill
 * @param {boolean} [params.smooth=true]
 * @param {Object} [params.grid]
 * @returns {Object}
 */
export function createLineChartOption({
  categories,
  series,
  isArea = false,
  smooth = true,
  grid = DEFAULT_GRID,
}) {
  const formattedSeries = series.map((s) => ({
    name: s.name,
    type: 'line',
    data: s.data,
    smooth,
    symbolSize: 6,
    areaStyle: (s.isArea ?? isArea) ? { opacity: 0.18 } : undefined,
    itemStyle: s.color ? { color: s.color } : undefined,
    lineStyle: s.color ? { color: s.color, width: 3 } : { width: 3 },
  }));

  return {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      show: series.length > 1,
      bottom: 0,
    },
    grid,
    xAxis: {
      type: 'category',
      data: categories,
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
    },
    series: formattedSeries,
  };
}

/**
 * Create a Pie or Donut chart option.
 * @param {Object} params
 * @param {Array<{name: string, value: number, itemStyle?: Object}>} params.data
 * @param {boolean} [params.isDonut=true]
 * @param {string} [params.name="Distribution"]
 * @returns {Object}
 */
export function createDonutChartOption({
  data,
  isDonut = true,
  name = 'Distribution',
}) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/><strong>{b}</strong>: {c} ({d}%)',
    },
    legend: {
      bottom: 0,
      icon: 'circle',
    },
    series: [
      {
        name,
        type: 'pie',
        radius: isDonut ? ['48%', '75%'] : '70%',
        center: ['50%', '46%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: 'transparent',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        data,
      },
    ],
  };
}

/**
 * Create a Scatter or Bubble chart option.
 * @param {Object} params
 * @param {Array<[number, number, number?, string?]>} params.data - [x, y, size?, label?]
 * @param {string} [params.xLabel=""]
 * @param {string} [params.yLabel=""]
 * @param {boolean} [params.isBubble=false]
 * @returns {Object}
 */
export function createScatterChartOption({
  data,
  xLabel = '',
  yLabel = '',
  isBubble = false,
  grid = DEFAULT_GRID,
}) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: (param) => {
        const d = param.data;
        return `${d[3] || 'Item'}<br/>X: ${d[0]} | Y: ${d[1]}${isBubble && d[2] ? ` | Value: ${d[2]}` : ''}`;
      },
    },
    grid,
    xAxis: {
      type: 'value',
      name: xLabel,
    },
    yAxis: {
      type: 'value',
      name: yLabel,
    },
    series: [
      {
        type: 'scatter',
        data,
        symbolSize: (val) => (isBubble && val[2] ? Math.max(10, Math.min(val[2], 60)) : 10),
      },
    ],
  };
}

/**
 * Create a Treemap chart option.
 * @param {Object} params
 * @param {Array<{name: string, value: number, children?: any[]}>} params.data
 * @returns {Object}
 */
export function createTreemapChartOption({ data }) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}',
    },
    series: [
      {
        type: 'treemap',
        data,
        leafDepth: 1,
        roam: false,
        label: {
          show: true,
          formatter: '{b}',
        },
        upperLabel: {
          show: true,
          height: 30,
        },
        itemStyle: {
          borderColor: '#161b22',
        },
      },
    ],
  };
}

/**
 * Create a Heatmap chart option.
 * @param {Object} params
 * @param {string[]} params.xCategories
 * @param {string[]} params.yCategories
 * @param {Array<[number, number, number]>} params.data - [xIndex, yIndex, value]
 * @param {number} params.min
 * @param {number} params.max
 * @returns {Object}
 */
export function createHeatmapChartOption({
  xCategories,
  yCategories,
  data,
  min = 0,
  max = 100,
  grid = DEFAULT_GRID,
}) {
  return {
    tooltip: {
      position: 'top',
    },
    grid,
    xAxis: {
      type: 'category',
      data: xCategories,
      splitArea: { show: true },
    },
    yAxis: {
      type: 'category',
      data: yCategories,
      splitArea: { show: true },
    },
    visualMap: {
      min,
      max,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      inRange: {
        color: ['#161b22', '#7c3aed', '#db61a2'],
      },
    },
    series: [
      {
        type: 'heatmap',
        data,
        label: { show: true },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
}
