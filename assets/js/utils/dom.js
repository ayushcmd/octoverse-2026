/**
 * GitHub Octoverse 2026 - DOM & Rendering Utilities
 * Clean, safe DOM manipulation functions without external framework overhead.
 */

/**
 * Select a single DOM element matching a CSS selector.
 * @param {string} selector
 * @param {Document|HTMLElement} [context=document]
 * @returns {HTMLElement|null}
 */
export function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Select all DOM elements matching a CSS selector as an array.
 * @param {string} selector
 * @param {Document|HTMLElement} [context=document]
 * @returns {HTMLElement[]}
 */
export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * Create an HTML element with attributes, class names, and children.
 * @param {string} tag
 * @param {Object} [attributes={}]
 * @param {Array<string|Node>} [children=[]]
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, children = []) {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'className' || key === 'class') {
      el.className = value;
    } else if (key === 'dataset') {
      for (const [dataKey, dataValue] of Object.entries(value)) {
        el.dataset[dataKey] = dataValue;
      }
    } else if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, value);
    } else if (key === 'html') {
      el.innerHTML = value;
    } else if (key === 'text') {
      el.textContent = value;
    } else if (value !== false && value !== null && value !== undefined) {
      el.setAttribute(key, value === true ? '' : value);
    }
  }

  for (const child of children) {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  }

  return el;
}

/**
 * Render an official source attribution footnote.
 * @param {string} sourceName
 * @param {string} [period="Oct 2025 – Sep 2026"]
 * @param {string} [url="https://github.blog/news-insights/octoverse/octoverse-2026/"]
 * @returns {HTMLElement}
 */
export function createSourceAttribution(sourceName, period = 'Oct 2025 – Sep 2026', url = 'https://github.blog/') {
  const container = createElement('div', { class: 'source-attribution' });
  container.innerHTML = `
    <span>Source: <strong>${sourceName}</strong> (${period})</span>
    <span>•</span>
    <a href="${url}" target="_blank" rel="noopener noreferrer">Official GitHub Report</a>
  `;
  return container;
}
