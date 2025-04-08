/**
 * Desktop Experience Integration for Trump Tariff Analysis Website
 * 
 * This script integrates the desktop experience enhancer with the website
 * to provide optimized layouts, keyboard shortcuts, and multi-panel views.
 */

import DesktopExperienceEnhancer from '../components/desktop/DesktopExperienceEnhancer.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize desktop experience enhancer
  const desktopEnhancer = new DesktopExperienceEnhancer();
  
  // Add desktop experience stylesheet
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = '../styles/desktop-experience.css';
  document.head.appendChild(linkElement);
  
  // Add desktop navigation enhancements
  enhanceNavigation();
  
  // Add desktop-optimized main layout
  optimizeMainLayout();
  
  /**
   * Enhance navigation for desktop users
   */
  function enhanceNavigation() {
    const navigation = document.querySelector('nav');
    if (!navigation) return;
    
    // Add keyboard shortcut indicators to navigation items
    const navItems = navigation.querySelectorAll('a');
    
    const shortcuts = {
      '/': 'Alt+1',
      '/market-analysis.html': 'Alt+2',
      '/stock-analysis.html': 'Alt+3',
      '/trading-opportunities.html': 'Alt+4',
      '/predictive-analytics.html': 'Alt+5'
    };
    
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      const shortcut = shortcuts[href];
      
      if (shortcut) {
        const shortcutIndicator = document.createElement('span');
        shortcutIndicator.className = 'shortcut-indicator';
        shortcutIndicator.textContent = shortcut;
        item.appendChild(shortcutIndicator);
      }
    });
    
    // Add predictive analytics link if not exists
    let hasPredictiveAnalytics = false;
    navItems.forEach(item => {
      if (item.getAttribute('href') === '/predictive-analytics.html') {
        hasPredictiveAnalytics = true;
      }
    });
    
    if (!hasPredictiveAnalytics) {
      const predictiveLink = document.createElement('a');
      predictiveLink.href = '/predictive-analytics.html';
      predictiveLink.textContent = 'Predictive Analytics';
      
      const shortcutIndicator = document.createElement('span');
      shortcutIndicator.className = 'shortcut-indicator';
      shortcutIndicator.textContent = 'Alt+5';
      predictiveLink.appendChild(shortcutIndicator);
      
      navigation.appendChild(predictiveLink);
    }
  }
  
  /**
   * Optimize main layout for desktop users
   */
  function optimizeMainLayout() {
    // Add desktop class to body
    document.body.classList.add('desktop-optimized');
    
    // Create quick access toolbar
    createQuickAccessToolbar();
    
    // Add desktop-specific styles
    addDesktopStyles();
  }
  
  /**
   * Create quick access toolbar
   */
  function createQuickAccessToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'quick-access-toolbar';
    toolbar.innerHTML = `
      <div class="toolbar-section">
        <button class="toolbar-button" data-action="refresh" title="Refresh Data (Alt+R)">
          <i class="icon-refresh">↻</i>
          <span>Refresh</span>
        </button>
        <button class="toolbar-button" data-action="fullscreen" title="Toggle Fullscreen (Alt+F)">
          <i class="icon-fullscreen">⤢</i>
          <span>Fullscreen</span>
        </button>
        <button class="toolbar-button" data-action="dark-mode" title="Toggle Dark Mode (Alt+D)">
          <i class="icon-dark-mode">◐</i>
          <span>Dark Mode</span>
        </button>
      </div>
      <div class="toolbar-section">
        <button class="toolbar-button" data-action="multi-panel" title="Toggle Multi-Panel View (Alt+M)">
          <i class="icon-multi-panel">⊞</i>
          <span>Multi-Panel</span>
        </button>
        <button class="toolbar-button" data-action="save-layout" title="Save Layout (Alt+S)">
          <i class="icon-save">💾</i>
          <span>Save Layout</span>
        </button>
      </div>
      <div class="toolbar-section">
        <button class="toolbar-button" data-action="keyboard-shortcuts" title="Keyboard Shortcuts (Alt+H)">
          <i class="icon-keyboard">⌨</i>
          <span>Shortcuts</span>
        </button>
      </div>
    `;
    
    // Add to document
    document.body.insertBefore(toolbar, document.body.firstChild);
    
    // Add event listeners
    toolbar.querySelectorAll('.toolbar-button').forEach(button => {
      button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        
        switch (action) {
          case 'refresh':
            desktopEnhancer.refreshAllData();
            break;
          case 'fullscreen':
            desktopEnhancer.toggleFullscreen();
            break;
          case 'dark-mode':
            desktopEnhancer.toggleDarkMode();
            break;
          case 'multi-panel':
            desktopEnhancer.toggleMultiPanelLayout();
            break;
          case 'save-layout':
            desktopEnhancer.saveCurrentLayout();
            break;
          case 'keyboard-shortcuts':
            desktopEnhancer.showKeyboardShortcutsHelp();
            break;
        }
      });
    });
  }
  
  /**
   * Add desktop-specific styles
   */
  function addDesktopStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Quick Access Toolbar */
      .quick-access-toolbar {
        display: flex;
        justify-content: space-between;
        background-color: var(--panel-background);
        border-bottom: 1px solid var(--border-color);
        padding: 5px 10px;
      }
      
      .toolbar-section {
        display: flex;
        gap: 5px;
      }
      
      .toolbar-button {
        display: flex;
        align-items: center;
        gap: 5px;
        background-color: transparent;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        color: var(--text-color);
        cursor: pointer;
        font-size: 12px;
        padding: 5px 10px;
        transition: all 0.2s ease;
      }
      
      .toolbar-button:hover {
        background-color: var(--secondary-color);
        color: white;
      }
      
      .toolbar-button i {
        font-style: normal;
      }
      
      /* Navigation Enhancements */
      nav {
        display: flex;
        gap: 10px;
      }
      
      nav a {
        position: relative;
        padding-right: 50px;
      }
      
      .shortcut-indicator {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10px;
        opacity: 0.7;
        background-color: rgba(0, 0, 0, 0.1);
        padding: 2px 4px;
        border-radius: 3px;
      }
      
      /* Desktop Optimizations */
      .desktop-optimized .content-container {
        max-width: none;
        padding: 0 20px;
      }
      
      .desktop-optimized .card {
        transition: all 0.2s ease;
      }
      
      .desktop-optimized .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      /* Dark Mode Adjustments */
      body.dark-mode {
        background-color: var(--background-color);
        color: var(--text-color);
      }
      
      body.dark-mode .toolbar-button {
        border-color: var(--border-color);
        color: var(--text-color);
      }
      
      body.dark-mode .toolbar-button:hover {
        background-color: var(--secondary-color);
        color: white;
      }
    `;
    
    document.head.appendChild(style);
  }
});
