/**
 * GitHub Octoverse 2026 - Report Graphic Viewer Dialog
 * Displays authentic official report graphics from `dataset/sources/images/` for audit and evidence.
 */

import { $, createElement } from './dom.js';

class ImageModal {
  constructor() {
    this.modalEl = null;
    this.imgEl = null;
    this.titleEl = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;

    // Create modal dialog in DOM
    this.modalEl = createElement('div', {
      class: 'report-image-modal',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': 'Original Report Graphic',
      style: 'display: none;',
    });

    this.modalEl.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="badge badge-verified">Official GitHub Report Graphic</span>
            <h4 class="modal-title" id="modal-graphic-title">Evidence & Reference Graphic</h4>
          </div>
          <button type="button" class="modal-close-btn" aria-label="Close dialog">&times;</button>
        </div>
        <div class="modal-body">
          <img id="modal-graphic-img" src="" alt="Official Octoverse 2026 Graphic" class="modal-image">
        </div>
        <div class="modal-footer">
          <span class="source-attribution">Source: GitHub Octoverse 2026 Canonical Archive (dataset/sources/images/)</span>
          <button type="button" class="btn btn-secondary modal-close-btn-footer">Close</button>
        </div>
      </div>
    `;

    document.body.appendChild(this.modalEl);

    this.imgEl = $('#modal-graphic-img', this.modalEl);
    this.titleEl = $('#modal-graphic-title', this.modalEl);

    // Event handlers
    const backdrop = $('.modal-backdrop', this.modalEl);
    const closeBtn = $('.modal-close-btn', this.modalEl);
    const closeFooterBtn = $('.modal-close-btn-footer', this.modalEl);

    const close = () => this.hide();
    backdrop.addEventListener('click', close);
    closeBtn.addEventListener('click', close);
    closeFooterBtn.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalEl.style.display !== 'none') {
        this.hide();
      }
    });

    // Delegate clicks on .btn-source-image anywhere in document
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.btn-source-image');
      if (target) {
        const imagePath = target.dataset.image;
        if (imagePath) {
          const fullPath = imagePath.startsWith('dataset/') ? imagePath : `dataset/${imagePath}`;
          const title = target.getAttribute('title') || 'Official Report Reference Graphic';
          this.show(fullPath, title);
        }
      }
    });

    this.isInitialized = true;
  }

  show(src, title) {
    this.init();
    this.imgEl.src = src;
    if (this.titleEl) this.titleEl.textContent = title || 'Original Report Graphic';
    this.modalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  hide() {
    if (!this.modalEl) return;
    this.modalEl.style.display = 'none';
    this.imgEl.src = '';
    document.body.style.overflow = '';
  }
}

export const imageModal = new ImageModal();
