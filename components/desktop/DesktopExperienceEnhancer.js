/**
 * Desktop User Experience Enhancements for Trump Tariff Analysis Website
 * 
 * This module provides enhanced desktop user experience features including
 * optimized layouts, keyboard shortcuts, multi-panel views, and customization options.
 */

class DesktopExperienceEnhancer {
  constructor() {
    this.keyboardShortcuts = {};
    this.layoutSettings = {
      darkMode: false,
      fontSize: 'medium',
      density: 'comfortable',
      panelLayout: '2-column'
    };
    
    // Initialize
    this._initializeEnhancements();
  }
  
  /**
   * Initialize desktop enhancements
   * @private
   */
  _initializeEnhancements() {
    // Register event listeners
    document.addEventListener('DOMContentLoaded', () => {
      this._setupKeyboardShortcuts();
      this._setupLayoutControls();
      this._setupMultiPanelViews();
      this._setupCustomizationOptions();
      
      // Apply saved preferences if available
      this._applySavedPreferences();
    });
  }
  
  /**
   * Setup keyboard shortcuts
   * @private
   */
  _setupKeyboardShortcuts() {
    // Define default shortcuts
    this.keyboardShortcuts = {
      'Alt+1': { action: 'navigate', target: '/' },
      'Alt+2': { action: 'navigate', target: '/market-analysis.html' },
      'Alt+3': { action: 'navigate', target: '/stock-analysis.html' },
      'Alt+4': { action: 'navigate', target: '/trading-opportunities.html' },
      'Alt+5': { action: 'navigate', target: '/predictive-analytics.html' },
      'Alt+D': { action: 'toggleDarkMode' },
      'Alt+M': { action: 'toggleMultiPanel' },
      'Alt+F': { action: 'toggleFullscreen' },
      'Alt+S': { action: 'saveCurrentLayout' },
      'Alt+R': { action: 'refreshData' },
      'Alt+P': { action: 'printCurrentView' },
      'Alt+H': { action: 'showShortcutsHelp' }
    };
    
    // Register keyboard event listener
    document.addEventListener('keydown', (e) => {
      // Build key combination string
      let combo = '';
      if (e.ctrlKey) combo += 'Ctrl+';
      if (e.altKey) combo += 'Alt+';
      if (e.shiftKey) combo += 'Shift+';
      combo += e.key.toUpperCase();
      
      // Check if combo is registered
      const shortcut = this.keyboardShortcuts[combo];
      if (shortcut) {
        e.preventDefault();
        this._executeShortcutAction(shortcut);
      }
    });
    
    // Create keyboard shortcuts help panel
    this._createKeyboardShortcutsHelp();
  }
  
  /**
   * Execute shortcut action
   * @param {Object} shortcut - Shortcut configuration
   * @private
   */
  _executeShortcutAction(shortcut) {
    switch (shortcut.action) {
      case 'navigate':
        window.location.href = shortcut.target;
        break;
      case 'toggleDarkMode':
        this.toggleDarkMode();
        break;
      case 'toggleMultiPanel':
        this.toggleMultiPanelLayout();
        break;
      case 'toggleFullscreen':
        this.toggleFullscreen();
        break;
      case 'saveCurrentLayout':
        this.saveCurrentLayout();
        break;
      case 'refreshData':
        this.refreshAllData();
        break;
      case 'printCurrentView':
        window.print();
        break;
      case 'showShortcutsHelp':
        this.showKeyboardShortcutsHelp();
        break;
      default:
        console.log('Unknown shortcut action:', shortcut.action);
    }
  }
  
  /**
   * Create keyboard shortcuts help panel
   * @private
   */
  _createKeyboardShortcutsHelp() {
    // Create help panel element
    const helpPanel = document.createElement('div');
    helpPanel.className = 'keyboard-shortcuts-help';
    helpPanel.id = 'keyboard-shortcuts-help';
    helpPanel.style.display = 'none';
    
    // Create panel content
    let content = `
      <div class="help-panel-header">
        <h2>Keyboard Shortcuts</h2>
        <button class="close-button" id="close-shortcuts-help">&times;</button>
      </div>
      <div class="help-panel-content">
        <table class="shortcuts-table">
          <thead>
            <tr>
              <th>Shortcut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    // Add shortcuts to table
    Object.entries(this.keyboardShortcuts).forEach(([key, shortcut]) => {
      let actionDescription = '';
      
      switch (shortcut.action) {
        case 'navigate':
          actionDescription = `Navigate to ${shortcut.target.replace('.html', '').replace('/', '')}`;
          break;
        case 'toggleDarkMode':
          actionDescription = 'Toggle dark mode';
          break;
        case 'toggleMultiPanel':
          actionDescription = 'Toggle multi-panel layout';
          break;
        case 'toggleFullscreen':
          actionDescription = 'Toggle fullscreen mode';
          break;
        case 'saveCurrentLayout':
          actionDescription = 'Save current layout';
          break;
        case 'refreshData':
          actionDescription = 'Refresh all data';
          break;
        case 'printCurrentView':
          actionDescription = 'Print current view';
          break;
        case 'showShortcutsHelp':
          actionDescription = 'Show this help panel';
          break;
        default:
          actionDescription = shortcut.action;
      }
      
      content += `
        <tr>
          <td class="shortcut-key">${key}</td>
          <td class="shortcut-action">${actionDescription}</td>
        </tr>
      `;
    });
    
    content += `
          </tbody>
        </table>
      </div>
    `;
    
    helpPanel.innerHTML = content;
    
    // Add to document when ready
    if (document.body) {
      document.body.appendChild(helpPanel);
      
      // Add event listener to close button
      document.getElementById('close-shortcuts-help').addEventListener('click', () => {
        this.hideKeyboardShortcutsHelp();
      });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(helpPanel);
        
        // Add event listener to close button
        document.getElementById('close-shortcuts-help').addEventListener('click', () => {
          this.hideKeyboardShortcutsHelp();
        });
      });
    }
  }
  
  /**
   * Show keyboard shortcuts help panel
   */
  showKeyboardShortcutsHelp() {
    const helpPanel = document.getElementById('keyboard-shortcuts-help');
    if (helpPanel) {
      helpPanel.style.display = 'block';
    }
  }
  
  /**
   * Hide keyboard shortcuts help panel
   */
  hideKeyboardShortcutsHelp() {
    const helpPanel = document.getElementById('keyboard-shortcuts-help');
    if (helpPanel) {
      helpPanel.style.display = 'none';
    }
  }
  
  /**
   * Setup layout controls
   * @private
   */
  _setupLayoutControls() {
    // Create layout controls container
    const layoutControls = document.createElement('div');
    layoutControls.className = 'layout-controls';
    layoutControls.innerHTML = `
      <button class="layout-control-button" id="toggle-dark-mode" title="Toggle Dark Mode">
        <i class="icon-dark-mode"></i>
      </button>
      <button class="layout-control-button" id="toggle-multi-panel" title="Toggle Multi-Panel Layout">
        <i class="icon-multi-panel"></i>
      </button>
      <button class="layout-control-button" id="toggle-fullscreen" title="Toggle Fullscreen">
        <i class="icon-fullscreen"></i>
      </button>
      <div class="layout-control-dropdown">
        <button class="layout-control-button" id="layout-settings" title="Layout Settings">
          <i class="icon-settings"></i>
        </button>
        <div class="layout-settings-dropdown" id="layout-settings-dropdown">
          <div class="settings-group">
            <h3>Font Size</h3>
            <div class="settings-options">
              <button class="settings-option" data-setting="fontSize" data-value="small">Small</button>
              <button class="settings-option active" data-setting="fontSize" data-value="medium">Medium</button>
              <button class="settings-option" data-setting="fontSize" data-value="large">Large</button>
            </div>
          </div>
          <div class="settings-group">
            <h3>Density</h3>
            <div class="settings-options">
              <button class="settings-option" data-setting="density" data-value="compact">Compact</button>
              <button class="settings-option active" data-setting="density" data-value="comfortable">Comfortable</button>
              <button class="settings-option" data-setting="density" data-value="spacious">Spacious</button>
            </div>
          </div>
          <div class="settings-group">
            <h3>Panel Layout</h3>
            <div class="settings-options">
              <button class="settings-option" data-setting="panelLayout" data-value="1-column">1 Column</button>
              <button class="settings-option active" data-setting="panelLayout" data-value="2-column">2 Columns</button>
              <button class="settings-option" data-setting="panelLayout" data-value="3-column">3 Columns</button>
              <button class="settings-option" data-setting="panelLayout" data-value="grid">Grid</button>
            </div>
          </div>
          <div class="settings-actions">
            <button class="settings-save" id="save-layout-settings">Save Settings</button>
            <button class="settings-reset" id="reset-layout-settings">Reset to Default</button>
          </div>
        </div>
      </div>
    `;
    
    // Add to document when ready
    if (document.body) {
      document.body.appendChild(layoutControls);
      this._addLayoutControlEventListeners();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(layoutControls);
        this._addLayoutControlEventListeners();
      });
    }
  }
  
  /**
   * Add event listeners to layout controls
   * @private
   */
  _addLayoutControlEventListeners() {
    // Toggle dark mode
    document.getElementById('toggle-dark-mode').addEventListener('click', () => {
      this.toggleDarkMode();
    });
    
    // Toggle multi-panel layout
    document.getElementById('toggle-multi-panel').addEventListener('click', () => {
      this.toggleMultiPanelLayout();
    });
    
    // Toggle fullscreen
    document.getElementById('toggle-fullscreen').addEventListener('click', () => {
      this.toggleFullscreen();
    });
    
    // Layout settings dropdown
    document.getElementById('layout-settings').addEventListener('click', () => {
      const dropdown = document.getElementById('layout-settings-dropdown');
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.layout-control-dropdown')) {
        const dropdown = document.getElementById('layout-settings-dropdown');
        if (dropdown) {
          dropdown.style.display = 'none';
        }
      }
    });
    
    // Settings options
    const settingsOptions = document.querySelectorAll('.settings-option');
    settingsOptions.forEach(option => {
      option.addEventListener('click', () => {
        const setting = option.getAttribute('data-setting');
        const value = option.getAttribute('data-value');
        
        // Update active state
        document.querySelectorAll(`.settings-option[data-setting="${setting}"]`).forEach(opt => {
          opt.classList.remove('active');
        });
        option.classList.add('active');
        
        // Update layout settings
        this.layoutSettings[setting] = value;
        this._applyLayoutSettings();
      });
    });
    
    // Save settings
    document.getElementById('save-layout-settings').addEventListener('click', () => {
      this.saveLayoutSettings();
      document.getElementById('layout-settings-dropdown').style.display = 'none';
    });
    
    // Reset settings
    document.getElementById('reset-layout-settings').addEventListener('click', () => {
      this.resetLayoutSettings();
      document.getElementById('layout-settings-dropdown').style.display = 'none';
    });
  }
  
  /**
   * Setup multi-panel views
   * @private
   */
  _setupMultiPanelViews() {
    // Check if main content exists
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    // Create panel container
    const panelContainer = document.createElement('div');
    panelContainer.className = 'panel-container';
    panelContainer.id = 'panel-container';
    
    // Create panel controls
    const panelControls = document.createElement('div');
    panelControls.className = 'panel-controls';
    panelControls.innerHTML = `
      <button class="panel-control-button" id="add-panel" title="Add Panel">
        <i class="icon-add-panel">+</i>
      </button>
      <div class="panel-layout-controls">
        <button class="panel-layout-button active" data-layout="2-column" title="2 Column Layout">
          <i class="icon-2-column">◫◫</i>
        </button>
        <button class="panel-layout-button" data-layout="3-column" title="3 Column Layout">
          <i class="icon-3-column">◫◫◫</i>
        </button>
        <button class="panel-layout-button" data-layout="grid" title="Grid Layout">
          <i class="icon-grid">⊞</i>
        </button>
      </div>
    `;
    
    // Create initial panels
    const panel1 = this._createPanel(1);
    const panel2 = this._createPanel(2);
    
    // Add panels to container
    panelContainer.appendChild(panel1);
    panelContainer.appendChild(panel2);
    
    // Replace main content with panel container
    mainContent.innerHTML = '';
    mainContent.appendChild(panelControls);
    mainContent.appendChild(panelContainer);
    
    // Add event listeners
    this._addPanelControlEventListeners();
  }
  
  /**
   * Create a panel
   * @param {number} id - Panel ID
   * @returns {HTMLElement} Panel element
   * @private
   */
  _createPanel(id) {
    const panel = document.createElement('div');
    panel.className = 'content-panel';
    panel.id = `panel-${id}`;
    
    // Create panel header
    const panelHeader = document.createElement('div');
    panelHeader.className = 'panel-header';
    panelHeader.innerHTML = `
      <div class="panel-title">Panel ${id}</div>
      <div class="panel-actions">
        <button class="panel-action-button panel-maximize" data-panel="${id}" title="Maximize Panel">
          <i class="icon-maximize">⤢</i>
        </button>
        <button class="panel-action-button panel-close" data-panel="${id}" title="Close Panel">
          <i class="icon-close">×</i>
        </button>
      </div>
    `;
    
    // Create panel content selector
    const contentSelector = document.createElement('div');
    contentSelector.className = 'panel-content-selector';
    contentSelector.innerHTML = `
      <select class="content-select" id="content-select-${id}">
        <option value="market-overview">Market Overview</option>
        <option value="tariff-impact">Tariff Impact Analysis</option>
        <option value="stock-analysis">Stock Analysis</option>
        <option value="trading-opportunities">Trading Opportunities</option>
        <option value="predictive-analytics">Predictive Analytics</option>
        <option value="sector-heatmap">Sector Heatmap</option>
        <option value="correlation-matrix">Correlation Matrix</option>
        <option value="scenario-analysis">Scenario Analysis</option>
      </select>
    `;
    
    // Create panel content
    const panelContent = document.createElement('div');
    panelContent.className = 'panel-content';
    panelContent.id = `panel-content-${id}`;
    panelContent.innerHTML = '<div class="panel-placeholder">Select content to display</div>';
    
    // Add elements to panel
    panel.appendChild(panelHeader);
    panel.appendChild(contentSelector);
    panel.appendChild(panelContent);
    
    // Add event listeners
    panel.querySelector('.content-select').addEventListener('change', (e) => {
      this._loadPanelContent(id, e.target.value);
    });
    
    panel.querySelector('.panel-maximize').addEventListener('click', () => {
      this._maximizePanel(id);
    });
    
    panel.querySelector('.panel-close').addEventListener('click', () => {
      this._closePanel(id);
    });
    
    // Make panel resizable and draggable
    this._makePanelResizable(panel);
    this._makePanelDraggable(panel);
    
    return panel;
  }
  
  /**
   * Add event listeners to panel controls
   * @private
   */
  _addPanelControlEventListeners() {
    // Add panel button
    document.getElementById('add-panel').addEventListener('click', () => {
      this._addPanel();
    });
    
    // Panel layout buttons
    const layoutButtons = document.querySelectorAll('.panel-layout-button');
    layoutButtons.forEach(button => {
      button.addEventListener('click', () => {
        const layout = button.getAttribute('data-layout');
        
        // Update active state
        layoutButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Apply layout
        this._applyPanelLayout(layout);
      });
    });
  }
  
  /**
   * Add a new panel
   * @private
   */
  _addPanel() {
    const panelContainer = document.getElementById('panel-container');
    if (!panelContainer) return;
    
    // Get next panel ID
    const panels = panelContainer.querySelectorAll('.content-panel');
    const nextId = panels.length + 1;
    
    // Create new panel
    const newPanel = this._createPanel(nextId);
    
    // Add to container
    panelContainer.appendChild(newPanel);
    
    // Update layout
    const activeLayout = document.querySelector('.panel-layout-button.active');
    if (activeLayout) {
      this._applyPanelLayout(activeLayout.getAttribute('data-layout'));
    }
  }
  
  /**
   * Load content into a panel
   * @param {number} panelId - Panel ID
   * @param {string} contentType - Content type
   * @private
   */
  _loadPanelContent(panelId, contentType) {
    const panelContent = document.getElementById(`panel-content-${panelId}`);
    if (!panelContent) return;
    
    // Show loading state
    panelContent.innerHTML = '<div class="panel-loading">Loading content...</div>';
    
    // Simulate content loading (in a real implementation, this would fetch actual content)
    setTimeout(() => {
      let content = '';
      
      switch (contentType) {
        case 'market-overview':
          content = '<h2>Market Overview</h2><div class="placeholder-chart">Market Overview Chart</div>';
          break;
        case 'tariff-impact':
          content = '<h2>Tariff Impact Analysis</h2><div class="placeholder-chart">Tariff Impact Chart</div>';
          break;
        case 'stock-analysis':
          content = '<h2>Stock Analysis</h2><div class="placeholder-chart">Stock Analysis Chart</div>';
          break;
        case 'trading-opportunities':
          content = '<h2>Trading Opportunities</h2><div class="placeholder-chart">Trading Opportunities Chart</div>';
          break;
        case 'predictive-analytics':
          content = '<h2>Predictive Analytics</h2><div class="placeholder-chart">Predictive Analytics Chart</div>';
          break;
        case 'sector-heatmap':
          content = '<h2>Sector Heatmap</h2><div class="placeholder-chart">Sector Heatmap</div>';
          break;
        case 'correlation-matrix':
          content = '<h2>Correlation Matrix</h2><div class="placeholder-chart">Correlation Matrix</div>';
          break;
        case 'scenario-analysis':
          content = '<h2>Scenario Analysis</h2><div class="placeholder-chart">Scenario Analysis Chart</div>';
          break;
        default:
          content = '<div class="panel-placeholder">Select content to display</div>';
      }
      
      panelContent.innerHTML = content;
      
      // Update panel title
      const panelTitle = document.querySelector(`#panel-${panelId} .panel-title`);
      if (panelTitle) {
        panelTitle.textContent = contentType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }
    }, 500);
  }
  
  /**
   * Maximize a panel
   * @param {number} panelId - Panel ID
   * @private
   */
  _maximizePanel(panelId) {
    const panel = document.getElementById(`panel-${panelId}`);
    const panelContainer = document.getElementById('panel-container');
    if (!panel || !panelContainer) return;
    
    // Check if already maximized
    if (panel.classList.contains('maximized')) {
      // Restore panel
      panel.classList.remove('maximized');
      panelContainer.classList.remove('has-maximized-panel');
      
      // Update maximize button
      const maximizeButton = panel.querySelector('.panel-maximize i');
      if (maximizeButton) {
        maximizeButton.textContent = '⤢';
      }
    } else {
      // Maximize panel
      panel.classList.add('maximized');
      panelContainer.classList.add('has-maximized-panel');
      
      // Update maximize button
      const maximizeButton = panel.querySelector('.panel-maximize i');
      if (maximizeButton) {
        maximizeButton.textContent = '⤓';
      }
    }
  }
  
  /**
   * Close a panel
   * @param {number} panelId - Panel ID
   * @private
   */
  _closePanel(panelId) {
    const panel = document.getElementById(`panel-${panelId}`);
    const panelContainer = document.getElementById('panel-container');
    if (!panel || !panelContainer) return;
    
    // Remove panel
    panelContainer.removeChild(panel);
    
    // Update layout
    const activeLayout = document.querySelector('.panel-layout-button.active');
    if (activeLayout) {
      this._applyPanelLayout(activeLayout.getAttribute('data-layout'));
    }
  }
  
  /**
   * Make a panel resizable
   * @param {HTMLElement} panel - Panel element
   * @private
   */
  _makePanelResizable(panel) {
    // Add resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'panel-resize-handle';
    panel.appendChild(resizeHandle);
    
    // Resize functionality would be implemented here
    // This is a simplified version for demonstration
  }
  
  /**
   * Make a panel draggable
   * @param {HTMLElement} panel - Panel element
   * @private
   */
  _makePanelDraggable(panel) {
    // Draggable functionality would be implemented here
    // This is a simplified version for demonstration
    panel.querySelector('.panel-header').classList.add('draggable');
  }
  
  /**
   * Apply panel layout
   * @param {string} layout - Layout type
   * @private
   */
  _applyPanelLayout(layout) {
    const panelContainer = document.getElementById('panel-container');
    if (!panelContainer) return;
    
    // Remove existing layout classes
    panelContainer.classList.remove('layout-1-column', 'layout-2-column', 'layout-3-column', 'layout-grid');
    
    // Add new layout class
    panelContainer.classList.add(`layout-${layout}`);
    
    // Update layout settings
    this.layoutSettings.panelLayout = layout;
  }
  
  /**
   * Setup customization options
   * @private
   */
  _setupCustomizationOptions() {
    // Apply initial settings
    this._applyLayoutSettings();
  }
  
  /**
   * Apply layout settings
   * @private
   */
  _applyLayoutSettings() {
    // Apply font size
    document.documentElement.style.setProperty('--font-size-multiplier', this._getFontSizeMultiplier());
    
    // Apply density
    document.documentElement.style.setProperty('--spacing-multiplier', this._getSpacingMultiplier());
    
    // Apply panel layout
    const panelContainer = document.getElementById('panel-container');
    if (panelContainer) {
      this._applyPanelLayout(this.layoutSettings.panelLayout);
    }
    
    // Apply dark mode
    if (this.layoutSettings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  
  /**
   * Get font size multiplier based on settings
   * @returns {string} Font size multiplier
   * @private
   */
  _getFontSizeMultiplier() {
    switch (this.layoutSettings.fontSize) {
      case 'small':
        return '0.85';
      case 'large':
        return '1.15';
      case 'medium':
      default:
        return '1';
    }
  }
  
  /**
   * Get spacing multiplier based on settings
   * @returns {string} Spacing multiplier
   * @private
   */
  _getSpacingMultiplier() {
    switch (this.layoutSettings.density) {
      case 'compact':
        return '0.85';
      case 'spacious':
        return '1.15';
      case 'comfortable':
      default:
        return '1';
    }
  }
  
  /**
   * Apply saved preferences
   * @private
   */
  _applySavedPreferences() {
    // Check for saved preferences in localStorage
    const savedSettings = localStorage.getItem('trumpTariffLayoutSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        this.layoutSettings = { ...this.layoutSettings, ...parsedSettings };
        this._applyLayoutSettings();
        
        // Update UI to reflect saved settings
        this._updateSettingsUI();
      } catch (error) {
        console.error('Error applying saved preferences:', error);
      }
    }
  }
  
  /**
   * Update settings UI to reflect current settings
   * @private
   */
  _updateSettingsUI() {
    // Update font size buttons
    document.querySelectorAll('.settings-option[data-setting="fontSize"]').forEach(option => {
      option.classList.remove('active');
      if (option.getAttribute('data-value') === this.layoutSettings.fontSize) {
        option.classList.add('active');
      }
    });
    
    // Update density buttons
    document.querySelectorAll('.settings-option[data-setting="density"]').forEach(option => {
      option.classList.remove('active');
      if (option.getAttribute('data-value') === this.layoutSettings.density) {
        option.classList.add('active');
      }
    });
    
    // Update panel layout buttons
    document.querySelectorAll('.settings-option[data-setting="panelLayout"]').forEach(option => {
      option.classList.remove('active');
      if (option.getAttribute('data-value') === this.layoutSettings.panelLayout) {
        option.classList.add('active');
      }
    });
    
    // Update panel layout control buttons
    document.querySelectorAll('.panel-layout-button').forEach(button => {
      button.classList.remove('active');
      if (button.getAttribute('data-layout') === this.layoutSettings.panelLayout) {
        button.classList.add('active');
      }
    });
  }
  
  /**
   * Toggle dark mode
   */
  toggleDarkMode() {
    this.layoutSettings.darkMode = !this.layoutSettings.darkMode;
    
    if (this.layoutSettings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  
  /**
   * Toggle multi-panel layout
   */
  toggleMultiPanelLayout() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    // Check if multi-panel is already active
    const panelContainer = document.getElementById('panel-container');
    
    if (panelContainer) {
      // Store current content
      const currentContent = mainContent.innerHTML;
      
      // Restore original content (this would be implemented differently in a real application)
      mainContent.innerHTML = '<div class="placeholder-content">Original Content</div>';
    } else {
      // Setup multi-panel views
      this._setupMultiPanelViews();
    }
  }
  
  /**
   * Toggle fullscreen mode
   */
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  
  /**
   * Save current layout
   */
  saveCurrentLayout() {
    // In a real implementation, this would save the current panel configuration
    console.log('Saving current layout');
    
    // Show confirmation message
    this._showNotification('Layout saved successfully');
  }
  
  /**
   * Refresh all data
   */
  refreshAllData() {
    // In a real implementation, this would refresh all data sources
    console.log('Refreshing all data');
    
    // Show loading indicator
    this._showNotification('Refreshing data...', 'loading');
    
    // Simulate refresh
    setTimeout(() => {
      this._showNotification('Data refreshed successfully');
    }, 1500);
  }
  
  /**
   * Save layout settings
   */
  saveLayoutSettings() {
    // Save to localStorage
    localStorage.setItem('trumpTariffLayoutSettings', JSON.stringify(this.layoutSettings));
    
    // Show confirmation message
    this._showNotification('Settings saved successfully');
  }
  
  /**
   * Reset layout settings
   */
  resetLayoutSettings() {
    // Reset to defaults
    this.layoutSettings = {
      darkMode: false,
      fontSize: 'medium',
      density: 'comfortable',
      panelLayout: '2-column'
    };
    
    // Apply reset settings
    this._applyLayoutSettings();
    
    // Update UI
    this._updateSettingsUI();
    
    // Save to localStorage
    localStorage.setItem('trumpTariffLayoutSettings', JSON.stringify(this.layoutSettings));
    
    // Show confirmation message
    this._showNotification('Settings reset to defaults');
  }
  
  /**
   * Show notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type
   * @private
   */
  _showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Hide and remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

export default DesktopExperienceEnhancer;
