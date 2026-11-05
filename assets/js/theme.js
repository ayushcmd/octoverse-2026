/**
 * GitHub Octoverse 2026 - Centralized Theme Controller
 * Manages GitHub Dark and GitHub Light themes with system preference detection,
 * localStorage persistence, seamless transitions, and event dispatching for charts.
 */

const STORAGE_KEY = 'github-octoverse-theme';
export const THEMES = {
  DARK: 'github-dark',
  LIGHT: 'github-light',
};

class ThemeController {
  constructor() {
    this.currentTheme = this.resolveInitialTheme();
    this.subscribers = new Set();
    this.init();
  }

  /**
   * Determine starting theme: checks localStorage, then system preference.
   * @returns {string} 'github-dark' | 'github-light'
   */
  resolveInitialTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === THEMES.DARK || stored === THEMES.LIGHT) {
        return stored;
      }
    } catch (e) {
      console.warn('localStorage is unavailable for theme persistence.', e);
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return THEMES.LIGHT;
    }
    return THEMES.DARK;
  }

  /**
   * Apply initial attributes and listen for OS preference shifts.
   */
  init() {
    this.applyTheme(this.currentTheme, false);

    // Watch for OS theme changes if user hasn't explicitly set preference in localStorage
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      mediaQuery.addEventListener('change', (e) => {
        try {
          if (!localStorage.getItem(STORAGE_KEY)) {
            const newTheme = e.matches ? THEMES.LIGHT : THEMES.DARK;
            this.setTheme(newTheme);
          }
        } catch {
          // Ignore
        }
      });
    }
  }

  /**
   * Get active theme identifier.
   * @returns {string}
   */
  getTheme() {
    return this.currentTheme;
  }

  /**
   * Check if current theme is dark mode.
   * @returns {boolean}
   */
  isDark() {
    return this.currentTheme === THEMES.DARK;
  }

  /**
   * Explicitly set theme and persist preference.
   * @param {string} theme - 'github-dark' | 'github-light'
   */
  setTheme(theme) {
    if (theme !== THEMES.DARK && theme !== THEMES.LIGHT) {
      return;
    }

    this.currentTheme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Unable to persist theme to localStorage.', e);
    }

    this.applyTheme(theme, true);
  }

  /**
   * Toggle between dark and light modes.
   */
  toggleTheme() {
    const nextTheme = this.currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    this.setTheme(nextTheme);
  }

  /**
   * Apply theme attribute to document and notify all subscribers.
   * @param {string} theme
   * @param {boolean} notify
   */
  applyTheme(theme, notify = true) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme === THEMES.DARK ? 'dark' : 'light';

    // Update accessible toggle buttons in the DOM
    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach((btn) => {
      const isDark = theme === THEMES.DARK;
      btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('aria-pressed', isDark ? 'false' : 'true');
    });

    if (notify) {
      this.notifySubscribers(theme);
    }
  }

  /**
   * Subscribe to theme change events (e.g. for ECharts re-theming).
   * @param {Function} callback - Receives (theme, isDark)
   * @returns {Function} Unsubscribe function
   */
  onThemeChange(callback) {
    if (typeof callback === 'function') {
      this.subscribers.add(callback);
    }
    return () => this.subscribers.delete(callback);
  }

  /**
   * Dispatch theme change event to all registered observers.
   * @param {string} theme
   */
  notifySubscribers(theme) {
    const isDark = theme === THEMES.DARK;
    for (const callback of this.subscribers) {
      try {
        callback(theme, isDark);
      } catch (err) {
        console.error('Error in theme change subscriber:', err);
      }
    }
  }
}

// Export singleton instance
export const themeController = new ThemeController();
