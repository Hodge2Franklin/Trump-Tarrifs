/**
 * Mobile Compatibility Integration Script for Trump Tariff Analysis Website
 * 
 * This script integrates the mobile compatibility enhancer with the website.
 */

import MobileCompatibilityEnhancer from '../components/mobile/MobileCompatibilityEnhancer.js';

// Initialize mobile compatibility enhancer
let mobileEnhancer;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeMobileCompatibility();
});

/**
 * Initialize mobile compatibility
 */
function initializeMobileCompatibility() {
  // Create mobile compatibility enhancer instance
  mobileEnhancer = new MobileCompatibilityEnhancer();
  
  // Add mobile compatibility stylesheet
  addMobileStylesheet();
}

/**
 * Add mobile compatibility stylesheet
 */
function addMobileStylesheet() {
  // Check if stylesheet is already added
  if (document.querySelector('link[href="styles/mobile-compatibility.css"]')) return;
  
  // Create link element
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'styles/mobile-compatibility.css';
  
  // Add to document head
  document.head.appendChild(link);
}

export default { initializeMobileCompatibility };
