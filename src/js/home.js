/**
 * Home Page JavaScript Entry Point
 * Imports LESS styles and initializes transversal functionality, home-specific features,
 * and background animations
 */

// Import LESS styles for processing by Vite
import '../styles/main.less';
import { initializePerformanceOptimizations, initializeSmoothScrolling, initializeHeaderScrollEffect, initializeScrollToTop, initializePageLoadingSpinner } from './core.js';
import { createScrollHandler } from './utils.js';
import { loadProjectsData, initializeProjectCards } from './projects.js';
import { BackgroundAnimation } from './background-canvas.js';

// Constants
const ANIMATION_PAUSE_SCROLL_THRESHOLD = 500; // Pause animations when scrolling past this pixel value

// Global instance of background animation
let bgAnimation = null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async function () {
  // Mark body as loaded to show content after CSS is ready
  document.body.classList.add('loaded');
  
  // Performance and browser detection
  initializePerformanceOptimizations();

  initializeSmoothScrolling();
  initializeHeaderScrollEffect();
  initializeScrollToTop();
  initializePageLoadingSpinner();
  initializeBackgroundAnimations();

  // Initialize projects module using imported functions
  try {
    // Load project data from JSON
    await loadProjectsData();
    // Initialize project cards after data is loaded
    initializeProjectCards();
  } catch (error) {
    console.error('Error initializing projects:', error);
  }
  
  // Initialize home-specific features
  initializeAboutReadMore();
});

/**
 * Initialize "Read more" functionality for about description
 */
export function initializeAboutReadMore() {
  const readMoreLink = document.querySelector('.about-read-more');
  if (!readMoreLink) return;

  readMoreLink.addEventListener('click', function(e) {
    e.preventDefault();
    const container = this.closest('.about-description-container');
    const truncated = container.querySelector('.about-description-truncated');
    const full = container.querySelector('.about-description-full');
    
    if (truncated && full) {
      const isExpanded = truncated.style.display === 'none';
      
      if (isExpanded) {
        // Collapse
        truncated.style.display = 'inline';
        full.style.display = 'none';
        this.textContent = 'Read more';
        this.setAttribute('aria-label', 'Read more about me');
      } else {
        // Expand
        truncated.style.display = 'none';
        full.style.display = 'inline';
        this.textContent = 'Read less';
        this.setAttribute('aria-label', 'Read less about me');
      }
    }
  });
}

/**
 * Initialize background animations control based on scroll position
 * Pauses all animations (body gradient, cinematic background, lights, dust particles) 
 * when user scrolls past the threshold
 */
function initializeBackgroundAnimations() {
  // Initialize the new canvas-based background animation
  bgAnimation = new BackgroundAnimation('background-canvas');
  bgAnimation.start();

  const scrollHandler = createScrollHandler(() => {
    const scrollY = window.scrollY;
    const shouldPause = scrollY > ANIMATION_PAUSE_SCROLL_THRESHOLD;

    // Add/remove class to body to pause all animations via CSS:
    // - Body gradient animation (gradientShift)
    if (shouldPause) {
      if (!document.body.classList.contains('animations-paused')) {
        document.body.classList.add('animations-paused');
        if (bgAnimation) bgAnimation.stop();
      }
    } else {
      if (document.body.classList.contains('animations-paused')) {
        document.body.classList.remove('animations-paused');
        if (bgAnimation) bgAnimation.start();
      }
    }
  });
  
  window.addEventListener('scroll', scrollHandler, { passive: true });
}
async function loadExperiences() {
  const container = document.querySelector(".experience-timeline");
  if (!container) return;

  const res = await fetch("/api/experiences.json");
  const experiences = await res.json();

  const formatRange = (start, end) => {
    const fmt = (v) => {
      if (v === "present") return "Present";
      const [y, m] = v.split("-");
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${monthNames[Number(m) - 1]} ${y}`;
    };
    return `${fmt(start)} — ${fmt(end)}`;
  };

  container.innerHTML = experiences
    .map((e) => {
      const tags = (e.tags || [])
        .map((t) => `<span class="exp-tag">${t}</span>`)
        .join("");

      const bullets = (e.bullets || [])
        .map((b) => `<li>${b}</li>`)
        .join("");

      return `
        <article class="experience-item" role="listitem">
          <div class="experience-marker" aria-hidden="true">
            <i class="fas ${e.icon || "fa-briefcase"}"></i>
          </div>

          <div class="experience-card">
            <div class="experience-top">
              <div class="experience-title">
                <h3>${e.title}</h3>
                <p class="experience-meta">
                  <strong>${e.company}</strong> • ${e.location}
                </p>
              </div>

              <div class="experience-dates" aria-label="Experience date range">
                ${formatRange(e.start, e.end)}
              </div>
            </div>

            <ul class="experience-bullets">
              ${bullets}
            </ul>

            <div class="experience-tags" aria-label="Experience tags">
              ${tags}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

// Appelle-la au chargement (en plus de tes fonctions existantes)
loadExperiences();


