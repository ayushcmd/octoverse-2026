/**
 * GitHub Octoverse 2026 - Navigation & ScrollSpy Controller
 * Handles smooth scrolling, IntersectionObserver section tracking,
 * accessible keyboard interactions, and responsive mobile menu drawer.
 */

import { $, $$ } from './utils/dom.js';

class NavigationController {
  constructor() {
    this.header = null;
    this.navLinks = [];
    this.sections = [];
    this.mobileToggle = null;
    this.mobileDrawer = null;
    this.observer = null;
    this.isOpen = false;
  }

  init() {
    this.header = $('.site-header');
    this.navLinks = $$('.nav-link, .mobile-nav-link, .cover-cta-btn, .overview-strip-item');
    this.sections = $$('.report-section');
    this.mobileToggle = $('.mobile-nav-toggle');
    this.mobileDrawer = $('.mobile-nav-drawer');

    this.bindScrollLinks();
    this.setupScrollSpy();
    this.setupMobileMenu();
    this.setupHeaderElevation();
  }

  /**
   * Bind smooth scroll behavior with keyboard accessibility.
   */
  bindScrollLinks() {
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = $(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });

            // Close mobile menu if open
            if (this.isOpen) {
              this.toggleMobileMenu(false);
            }

            // Update focus for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
          }
        }
      });
    });
  }

  /**
   * Setup IntersectionObserver to track visible sections and highlight nav items.
   */
  setupScrollSpy() {
    if (!('IntersectionObserver' in window)) return;

    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in top view zone
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.setActiveNavLink(sectionId);
        }
      });
    }, options);

    this.sections.forEach((section) => {
      this.observer.observe(section);
    });
  }

  /**
   * Highlight the active nav link matching section ID.
   * @param {string} sectionId
   */
  setActiveNavLink(sectionId) {
    this.navLinks.forEach((link) => {
      if (!link.classList.contains('nav-link') && !link.classList.contains('mobile-nav-link')) return;
      const href = link.getAttribute('href');
      const isMatch = href === `#${sectionId}`;
      link.classList.toggle('active', isMatch);
      link.setAttribute('aria-current', isMatch ? 'page' : 'false');
    });
  }

  /**
   * Setup mobile menu toggle and keyboard interactions.
   */
  setupMobileMenu() {
    if (!this.mobileToggle || !this.mobileDrawer) return;

    this.mobileToggle.addEventListener('click', () => {
      this.toggleMobileMenu(!this.isOpen);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.toggleMobileMenu(false);
        this.mobileToggle.focus();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (
        this.isOpen &&
        !this.mobileDrawer.contains(e.target) &&
        !this.mobileToggle.contains(e.target)
      ) {
        this.toggleMobileMenu(false);
      }
    });
  }

  /**
   * Open or close the mobile drawer.
   * @param {boolean} open
   */
  toggleMobileMenu(open) {
    this.isOpen = open;
    this.mobileDrawer.classList.toggle('open', open);
    this.mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    this.mobileToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

    // Prevent body background scrolling when drawer is open
    document.body.style.overflow = open ? 'hidden' : '';
  }

  /**
   * Add elevated shadow to header when page is scrolled down.
   */
  setupHeaderElevation() {
    if (!this.header) return;

    const onScroll = () => {
      const isScrolled = window.scrollY > 20;
      this.header.classList.toggle('scrolled', isScrolled);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}

export const navigationController = new NavigationController();
