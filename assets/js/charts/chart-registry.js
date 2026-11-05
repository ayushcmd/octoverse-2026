/**
 * GitHub Octoverse 2026 - Centralized Chart Lifecycle & Resize Registry
 * Coordinates ECharts instances, responsive resizing with ResizeObserver,
 * and synchronized theme re-renders without state or interaction loss.
 */

import { themeController } from '../theme.js';
import { registerEChartsThemes } from './chart-theme.js';

class ChartRegistry {
  constructor() {
    this.charts = new Map(); // id -> { element, instance, optionGenerator, currentOption }
    this.resizeObserver = null;
    this.isInitialized = false;
  }

  /**
   * Initialize theme registration, observers, and theme change listeners.
   */
  init() {
    if (this.isInitialized) return;

    registerEChartsThemes();

    // Create shared ResizeObserver
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const chartEntry = this.findByElement(entry.target);
          if (chartEntry && chartEntry.instance && !chartEntry.instance.isDisposed()) {
            chartEntry.instance.resize();
          }
        }
      });
    }

    // Subscribe to global theme changes
    themeController.onThemeChange((theme) => {
      this.handleThemeShift(theme);
    });

    this.isInitialized = true;
  }

  /**
   * Find a chart entry by its DOM element.
   * @param {Element} element
   * @returns {Object|null}
   */
  findByElement(element) {
    for (const entry of this.charts.values()) {
      if (entry.element === element) {
        return entry;
      }
    }
    return null;
  }

  /**
   * Register and initialize an ECharts instance.
   * @param {string} id - Unique chart identifier
   * @param {HTMLElement} element - Container element
   * @param {Function} optionGenerator - Function returning ECharts option object
   * @returns {Object|null} ECharts instance
   */
  register(id, element, optionGenerator) {
    if (!element) {
      console.warn(`Chart container element for "${id}" not found.`);
      return null;
    }

    this.init();

    // Dispose existing instance if re-registering
    if (this.charts.has(id)) {
      this.dispose(id);
    }

    const currentTheme = themeController.getTheme();
    const instance = window.echarts.init(element, currentTheme, {
      renderer: 'svg', // Crisp vector rendering on all DPIs
    });

    const option = optionGenerator(currentTheme);
    instance.setOption(option);

    this.charts.set(id, {
      id,
      element,
      instance,
      optionGenerator,
      currentOption: option,
    });

    if (this.resizeObserver) {
      this.resizeObserver.observe(element);
    }

    return instance;
  }

  /**
   * Update an existing chart with a new option or partial option.
   * @param {string} id
   * @param {Object} option
   */
  updateOption(id, option) {
    const entry = this.charts.get(id);
    if (entry && entry.instance && !entry.instance.isDisposed()) {
      entry.currentOption = option;
      entry.instance.setOption(option, true);
    }
  }

  /**
   * Handle theme shift across all registered charts.
   * Recreates instances under the new theme and restores their options seamlessly.
   * @param {string} newTheme - 'github-dark' | 'github-light'
   */
  handleThemeShift(newTheme) {
    for (const [id, entry] of this.charts.entries()) {
      if (!entry.instance || !entry.element) continue;

      const savedOption = entry.optionGenerator
        ? entry.optionGenerator(newTheme)
        : entry.instance.getOption();

      // Cleanly dispose and rebuild instance with new theme
      entry.instance.dispose();
      const newInstance = window.echarts.init(entry.element, newTheme, { renderer: 'svg' });
      newInstance.setOption(savedOption, true);
      entry.instance = newInstance;
    }
  }

  /**
   * Trigger resize across all active charts (e.g. on window resize fallback).
   */
  resizeAll() {
    for (const entry of this.charts.values()) {
      if (entry.instance && !entry.instance.isDisposed()) {
        entry.instance.resize();
      }
    }
  }

  /**
   * Dispose of an individual chart.
   * @param {string} id
   */
  dispose(id) {
    const entry = this.charts.get(id);
    if (entry) {
      if (this.resizeObserver && entry.element) {
        this.resizeObserver.unobserve(entry.element);
      }
      if (entry.instance && !entry.instance.isDisposed()) {
        entry.instance.dispose();
      }
      this.charts.delete(id);
    }
  }

  /**
   * Dispose all charts and clean observers.
   */
  disposeAll() {
    for (const id of this.charts.keys()) {
      this.dispose(id);
    }
  }
}

export const chartRegistry = new ChartRegistry();
