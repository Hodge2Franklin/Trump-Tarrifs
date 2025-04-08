/**
 * Customizable Dashboard System for Trump Tariff Analysis Website
 * 
 * This module provides functionality for creating and managing
 * customizable dashboards with drag-and-drop widgets.
 */

class CustomizableDashboard {
  constructor(containerId = 'dashboard-container') {
    this.containerId = containerId;
    this.container = null;
    this.widgets = [];
    this.availableWidgets = [
      {
        id: 'market-overview',
        title: 'Market Overview',
        description: 'Overview of key market indices and indicators',
        icon: '📊',
        sizes: ['small', 'medium', 'large'],
        defaultSize: 'medium'
      },
      {
        id: 'tariff-impact',
        title: 'Tariff Impact Analysis',
        description: 'Analysis of Trump tariff impacts on markets',
        icon: '📈',
        sizes: ['medium', 'large'],
        defaultSize: 'medium'
      },
      {
        id: 'watchlist',
        title: 'Watchlist',
        description: 'Your watched stocks with real-time updates',
        icon: '⭐',
        sizes: ['small', 'medium', 'large'],
        defaultSize: 'medium'
      },
      {
        id: 'alerts',
        title: 'Price Alerts',
        description: 'Your configured price alerts',
        icon: '🔔',
        sizes: ['small', 'medium'],
        defaultSize: 'small'
      },
      {
        id: 'top-opportunities',
        title: 'Top Trading Opportunities',
        description: 'Highest potential trading opportunities',
        icon: '💰',
        sizes: ['medium', 'large'],
        defaultSize: 'medium'
      },
      {
        id: 'sector-heatmap',
        title: 'Sector Heatmap',
        description: 'Visual heatmap of sector performance',
        icon: '🔥',
        sizes: ['medium', 'large'],
        defaultSize: 'medium'
      },
      {
        id: 'correlation-matrix',
        title: 'Correlation Matrix',
        description: 'Matrix showing correlations between stocks',
        icon: '🔄',
        sizes: ['large'],
        defaultSize: 'large'
      },
      {
        id: 'stock-predictions',
        title: 'Stock Predictions',
        description: 'AI-powered stock movement predictions',
        icon: '🔮',
        sizes: ['medium', 'large'],
        defaultSize: 'medium'
      },
      {
        id: 'news-feed',
        title: 'Tariff News Feed',
        description: 'Latest news related to tariffs and trade',
        icon: '📰',
        sizes: ['small', 'medium', 'large'],
        defaultSize: 'medium'
      },
      {
        id: 'fx-impact',
        title: 'FX Impact Analysis',
        description: 'Analysis of AUD/USD exchange rate impacts',
        icon: '💱',
        sizes: ['medium', 'large'],
        defaultSize: 'medium'
      },
      {
        id: 'volatility-analysis',
        title: 'Volatility Analysis',
        description: 'Stock volatility and beta analysis',
        icon: '📉',
        sizes: ['medium', 'large'],
        defaultSize: 'medium'
      },
      {
        id: 'momentum-tracker',
        title: 'Momentum Tracker',
        description: 'Track stocks with strong momentum signals',
        icon: '🚀',
        sizes: ['medium', 'large'],
        defaultSize: 'medium'
      },
      {
        id: 'options-strategies',
        title: 'Options Strategies',
        description: 'Analysis of options strategies for leverage',
        icon: '🎯',
        sizes: ['medium', 'large'],
        defaultSize: 'large'
      },
      {
        id: 'technical-indicators',
        title: 'Technical Indicators',
        description: 'Key technical indicators for selected stocks',
        icon: '📋',
        sizes: ['medium', 'large'],
        defaultSize: 'medium'
      },
      {
        id: 'scenario-analysis',
        title: 'Tariff Scenario Analysis',
        description: 'Impact analysis of different tariff scenarios',
        icon: '🔍',
        sizes: ['large'],
        defaultSize: 'large'
      }
    ];
    
    this.layouts = {
      '1-column': { columns: 1, name: 'Single Column' },
      '2-column': { columns: 2, name: 'Two Columns' },
      '3-column': { columns: 3, name: 'Three Columns' },
      'grid': { columns: 'grid', name: 'Grid Layout' },
      'asymmetric': { columns: 'asymmetric', name: 'Asymmetric Layout' }
    };
    
    this.currentLayout = '2-column';
    this.isEditMode = false;
    
    // Initialize
    this._initialize();
  }
  
  /**
   * Initialize dashboard
   * @private
   */
  _initialize() {
    document.addEventListener('DOMContentLoaded', () => {
      this.container = document.getElementById(this.containerId);
      
      if (!this.container) {
        console.error(`Dashboard container with ID "${this.containerId}" not found.`);
        return;
      }
      
      // Create dashboard structure
      this._createDashboardStructure();
      
      // Load saved dashboard if available
      this._loadSavedDashboard();
      
      // Initialize drag and drop
      this._initializeDragAndDrop();
    });
  }
  
  /**
   * Create dashboard structure
   * @private
   */
  _createDashboardStructure() {
    // Create dashboard header
    const dashboardHeader = document.createElement('div');
    dashboardHeader.className = 'dashboard-header';
    dashboardHeader.innerHTML = `
      <div class="dashboard-title">
        <h2>Customizable Dashboard</h2>
        <p class="dashboard-description">Drag and drop widgets to customize your dashboard</p>
      </div>
      <div class="dashboard-controls">
        <div class="layout-selector">
          <label for="dashboard-layout">Layout:</label>
          <select id="dashboard-layout" class="dashboard-layout-select">
            ${Object.entries(this.layouts).map(([key, layout]) => `
              <option value="${key}" ${key === this.currentLayout ? 'selected' : ''}>${layout.name}</option>
            `).join('')}
          </select>
        </div>
        <button id="edit-dashboard" class="dashboard-control-button">
          <i class="icon-edit">✏️</i> Edit Dashboard
        </button>
        <button id="save-dashboard" class="dashboard-control-button">
          <i class="icon-save">💾</i> Save Dashboard
        </button>
        <button id="reset-dashboard" class="dashboard-control-button">
          <i class="icon-reset">↺</i> Reset
        </button>
      </div>
    `;
    
    // Create widget selector (hidden by default)
    const widgetSelector = document.createElement('div');
    widgetSelector.className = 'widget-selector';
    widgetSelector.id = 'widget-selector';
    widgetSelector.style.display = 'none';
    widgetSelector.innerHTML = `
      <div class="widget-selector-header">
        <h3>Add Widgets</h3>
        <button id="close-widget-selector" class="close-button">&times;</button>
      </div>
      <div class="widget-selector-content">
        <div class="widget-categories">
          <button class="widget-category active" data-category="all">All</button>
          <button class="widget-category" data-category="market">Market</button>
          <button class="widget-category" data-category="analysis">Analysis</button>
          <button class="widget-category" data-category="personal">Personal</button>
        </div>
        <div class="available-widgets">
          ${this.availableWidgets.map(widget => `
            <div class="available-widget" data-widget-id="${widget.id}" data-categories="all,${this._getWidgetCategory(widget.id)}">
              <div class="widget-icon">${widget.icon}</div>
              <div class="widget-info">
                <div class="widget-title">${widget.title}</div>
                <div class="widget-description">${widget.description}</div>
              </div>
              <button class="add-widget-button" data-widget-id="${widget.id}">Add</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // Create dashboard content
    const dashboardContent = document.createElement('div');
    dashboardContent.className = 'dashboard-content';
    dashboardContent.id = 'dashboard-content';
    
    // Add elements to container
    this.container.appendChild(dashboardHeader);
    this.container.appendChild(widgetSelector);
    this.container.appendChild(dashboardContent);
    
    // Add event listeners
    this._addDashboardEventListeners();
  }
  
  /**
   * Get widget category
   * @param {string} widgetId - Widget ID
   * @returns {string} Widget category
   * @private
   */
  _getWidgetCategory(widgetId) {
    const marketWidgets = ['market-overview', 'sector-heatmap', 'correlation-matrix', 'news-feed', 'fx-impact'];
    const analysisWidgets = ['tariff-impact', 'stock-predictions', 'volatility-analysis', 'momentum-tracker', 'options-strategies', 'technical-indicators', 'scenario-analysis', 'top-opportunities'];
    const personalWidgets = ['watchlist', 'alerts'];
    
    if (marketWidgets.includes(widgetId)) return 'market';
    if (analysisWidgets.includes(widgetId)) return 'analysis';
    if (personalWidgets.includes(widgetId)) return 'personal';
    
    return 'other';
  }
  
  /**
   * Add dashboard event listeners
   * @private
   */
  _addDashboardEventListeners() {
    // Layout selector
    document.getElementById('dashboard-layout').addEventListener('change', (e) => {
      this.currentLayout = e.target.value;
      this._applyLayout();
    });
    
    // Edit dashboard button
    document.getElementById('edit-dashboard').addEventListener('click', () => {
      this._toggleEditMode();
    });
    
    // Save dashboard button
    document.getElementById('save-dashboard').addEventListener('click', () => {
      this._saveDashboard();
    });
    
    // Reset dashboard button
    document.getElementById('reset-dashboard').addEventListener('click', () => {
      if (confirm('Are you sure you want to reset the dashboard to default?')) {
        this._resetDashboard();
      }
    });
    
    // Close widget selector button
    document.getElementById('close-widget-selector').addEventListener('click', () => {
      document.getElementById('widget-selector').style.display = 'none';
    });
    
    // Widget category buttons
    document.querySelectorAll('.widget-category').forEach(button => {
      button.addEventListener('click', () => {
        // Update active state
        document.querySelectorAll('.widget-category').forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Filter widgets
        const category = button.getAttribute('data-category');
        document.querySelectorAll('.available-widget').forEach(widget => {
          const categories = widget.getAttribute('data-categories').split(',');
          if (categories.includes(category)) {
            widget.style.display = 'flex';
          } else {
            widget.style.display = 'none';
          }
        });
      });
    });
    
    // Add widget buttons
    document.querySelectorAll('.add-widget-button').forEach(button => {
      button.addEventListener('click', () => {
        const widgetId = button.getAttribute('data-widget-id');
        this._addWidget(widgetId);
        document.getElementById('widget-selector').style.display = 'none';
      });
    });
  }
  
  /**
   * Initialize drag and drop
   * @private
   */
  _initializeDragAndDrop() {
    // This would use a library like SortableJS in a real implementation
    // For demonstration, we'll use a simplified version
    
    // Make widgets draggable
    document.addEventListener('mousedown', (e) => {
      if (!this.isEditMode) return;
      
      const widgetElement = e.target.closest('.dashboard-widget');
      if (!widgetElement) return;
      
      const dragHandle = e.target.closest('.widget-drag-handle');
      if (!dragHandle) return;
      
      e.preventDefault();
      
      const initialX = e.clientX;
      const initialY = e.clientY;
      const initialLeft = widgetElement.offsetLeft;
      const initialTop = widgetElement.offsetTop;
      
      widgetElement.classList.add('dragging');
      
      const onMouseMove = (moveEvent) => {
        const deltaX = moveEvent.clientX - initialX;
        const deltaY = moveEvent.clientY - initialY;
        
        widgetElement.style.position = 'absolute';
        widgetElement.style.left = `${initialLeft + deltaX}px`;
        widgetElement.style.top = `${initialTop + deltaY}px`;
        widgetElement.style.zIndex = '1000';
      };
      
      const onMouseUp = () => {
        widgetElement.classList.remove('dragging');
        widgetElement.style.position = '';
        widgetElement.style.left = '';
        widgetElement.style.top = '';
        widgetElement.style.zIndex = '';
        
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        
        // Find closest drop target
        const dropTarget = this._findDropTarget(widgetElement, e.clientX, e.clientY);
        if (dropTarget) {
          this._moveWidget(widgetElement, dropTarget);
        }
      };
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
  
  /**
   * Find drop target
   * @param {HTMLElement} widgetElement - Widget element
   * @param {number} x - Mouse X position
   * @param {number} y - Mouse Y position
   * @returns {HTMLElement|null} Drop target element
   * @private
   */
  _findDropTarget(widgetElement, x, y) {
    // Get all widget containers
    const containers = document.querySelectorAll('.widget-container');
    
    // Find container under mouse position
    for (const container of containers) {
      const rect = container.getBoundingClientRect();
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        return container;
      }
    }
    
    return null;
  }
  
  /**
   * Move widget to new container
   * @param {HTMLElement} widgetElement - Widget element
   * @param {HTMLElement} targetContainer - Target container
   * @private
   */
  _moveWidget(widgetElement, targetContainer) {
    // Get current container
    const currentContainer = widgetElement.parentElement;
    
    // If same container, do nothing
    if (currentContainer === targetContainer) return;
    
    // Move widget to new container
    targetContainer.appendChild(widgetElement);
    
    // Update widget data
    const widgetId = widgetElement.getAttribute('data-widget-id');
    const widget = this.widgets.find(w => w.id === widgetId);
    if (widget) {
      widget.position = Array.from(targetContainer.parentElement.children).indexOf(targetContainer);
    }
  }
  
  /**
   * Toggle edit mode
   * @private
   */
  _toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    
    // Update UI
    const editButton = document.getElementById('edit-dashboard');
    const widgetSelector = document.getElementById('widget-selector');
    
    if (this.isEditMode) {
      editButton.innerHTML = '<i class="icon-done">✓</i> Done Editing';
      editButton.classList.add('active');
      widgetSelector.style.display = 'block';
      this.container.classList.add('edit-mode');
      
      // Show widget controls
      document.querySelectorAll('.widget-controls').forEach(controls => {
        controls.style.display = 'flex';
      });
    } else {
      editButton.innerHTML = '<i class="icon-edit">✏️</i> Edit Dashboard';
      editButton.classList.remove('active');
      widgetSelector.style.display = 'none';
      this.container.classList.remove('edit-mode');
      
      // Hide widget controls
      document.querySelectorAll('.widget-controls').forEach(controls => {
        controls.style.display = 'none';
      });
    }
  }
  
  /**
   * Apply layout
   * @private
   */
  _applyLayout() {
    const dashboardContent = document.getElementById('dashboard-content');
    
    // Remove existing layout classes
    Object.keys(this.layouts).forEach(layout => {
      dashboardContent.classList.remove(`layout-${layout}`);
    });
    
    // Add new layout class
    dashboardContent.classList.add(`layout-${this.currentLayout}`);
    
    // Rearrange widgets based on layout
    this._arrangeWidgets();
  }
  
  /**
   * Arrange widgets based on current layout
   * @private
   */
  _arrangeWidgets() {
    const dashboardContent = document.getElementById('dashboard-content');
    const layout = this.layouts[this.currentLayout];
    
    // Clear dashboard content
    dashboardContent.innerHTML = '';
    
    if (layout.columns === 'grid') {
      // Create grid layout
      dashboardContent.classList.add('grid-layout');
      
      // Create grid cells
      for (let i = 0; i < 6; i++) {
        const container = document.createElement('div');
        container.className = 'widget-container';
        dashboardContent.appendChild(container);
      }
    } else if (layout.columns === 'asymmetric') {
      // Create asymmetric layout
      dashboardContent.classList.add('asymmetric-layout');
      
      // Create main column
      const mainColumn = document.createElement('div');
      mainColumn.className = 'main-column';
      
      // Create sidebar
      const sidebar = document.createElement('div');
      sidebar.className = 'sidebar';
      
      // Add containers to main column
      for (let i = 0; i < 2; i++) {
        const container = document.createElement('div');
        container.className = 'widget-container';
        mainColumn.appendChild(container);
      }
      
      // Add containers to sidebar
      for (let i = 0; i < 3; i++) {
        const container = document.createElement('div');
        container.className = 'widget-container';
        sidebar.appendChild(container);
      }
      
      // Add columns to dashboard
      dashboardContent.appendChild(mainColumn);
      dashboardContent.appendChild(sidebar);
    } else {
      // Create column layout
      dashboardContent.classList.add('column-layout');
      
      // Create columns
      for (let i = 0; i < layout.columns; i++) {
        const column = document.createElement('div');
        column.className = 'dashboard-column';
        
        // Add containers to column
        for (let j = 0; j < 3; j++) {
          const container = document.createElement('div');
          container.className = 'widget-container';
          column.appendChild(container);
        }
        
        dashboardContent.appendChild(column);
      }
    }
    
    // Add widgets to containers
    this._renderWidgets();
  }
  
  /**
   * Render widgets
   * @private
   */
  _renderWidgets() {
    // Get all containers
    const containers = document.querySelectorAll('.widget-container');
    
    // Clear containers
    containers.forEach(container => {
      container.innerHTML = '';
    });
    
    // Add widgets to containers
    this.widgets.forEach((widget, index) => {
      const containerIndex = widget.position !== undefined ? widget.position : index;
      const container = containers[containerIndex % containers.length];
      
      if (container) {
        container.appendChild(this._createWidgetElement(widget));
      }
    });
    
    // Add empty state to empty containers
    containers.forEach(container => {
      if (container.children.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-widget-container';
        emptyState.innerHTML = '<p>Drop widget here</p>';
        container.appendChild(emptyState);
      }
    });
  }
  
  /**
   * Create widget element
   * @param {Object} widget - Widget data
   * @returns {HTMLElement} Widget element
   * @private
   */
  _createWidgetElement(widget) {
    const widgetData = this.availableWidgets.find(w => w.id === widget.id) || {};
    
    const element = document.createElement('div');
    element.className = `dashboard-widget widget-${widget.size || widgetData.defaultSize}`;
    element.setAttribute('data-widget-id', widget.id);
    
    element.innerHTML = `
      <div class="widget-header">
        <div class="widget-drag-handle">
          <i class="icon-drag">⋮⋮</i>
        </div>
        <div class="widget-title">
          <span class="widget-icon">${widgetData.icon || '📊'}</span>
          <h3>${widgetData.title || 'Widget'}</h3>
        </div>
        <div class="widget-controls" style="display: none;">
          <div class="widget-size-control">
            ${(widgetData.sizes || ['small', 'medium', 'large']).map(size => `
              <button class="widget-size-button ${widget.size === size ? 'active' : ''}" data-size="${size}" title="Set ${size} size">
                ${size === 'small' ? '▫' : size === 'medium' ? '▪' : '⬛'}
              </button>
            `).join('')}
          </div>
          <button class="widget-remove-button" title="Remove widget">
            <i class="icon-remove">×</i>
          </button>
        </div>
      </div>
      <div class="widget-content">
        ${this._getWidgetContent(widget.id)}
      </div>
    `;
    
    // Add event listeners
    this._addWidgetEventListeners(element, widget);
    
    return element;
  }
  
  /**
   * Add widget event listeners
   * @param {HTMLElement} element - Widget element
   * @param {Object} widget - Widget data
   * @private
   */
  _addWidgetEventListeners(element, widget) {
    // Size buttons
    element.querySelectorAll('.widget-size-button').forEach(button => {
      button.addEventListener('click', () => {
        const size = button.getAttribute('data-size');
        this._resizeWidget(widget.id, size);
        
        // Update active state
        element.querySelectorAll('.widget-size-button').forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
      });
    });
    
    // Remove button
    element.querySelector('.widget-remove-button').addEventListener('click', () => {
      this._removeWidget(widget.id);
    });
  }
  
  /**
   * Get widget content
   * @param {string} widgetId - Widget ID
   * @returns {string} Widget content HTML
   * @private
   */
  _getWidgetContent(widgetId) {
    // In a real implementation, this would fetch actual content
    // This is a simplified version for demonstration
    
    switch (widgetId) {
      case 'market-overview':
        return `
          <div class="widget-placeholder">
            <h4>Market Overview</h4>
            <div class="placeholder-chart">
              <div class="placeholder-data">
                <div class="placeholder-label">ASX 200</div>
                <div class="placeholder-value">7,542.40</div>
                <div class="placeholder-change positive">+0.8%</div>
              </div>
              <div class="placeholder-data">
                <div class="placeholder-label">S&P 500</div>
                <div class="placeholder-value">4,783.35</div>
                <div class="placeholder-change positive">+0.5%</div>
              </div>
              <div class="placeholder-data">
                <div class="placeholder-label">AUD/USD</div>
                <div class="placeholder-value">0.6724</div>
                <div class="placeholder-change negative">-0.3%</div>
              </div>
            </div>
          </div>
        `;
      
      case 'watchlist':
        return `
          <div class="widget-placeholder">
            <h4>Watchlist</h4>
            <div class="placeholder-list">
              <div class="placeholder-item">
                <div class="placeholder-item-label">BHP.AX</div>
                <div class="placeholder-item-value">$45.67</div>
                <div class="placeholder-item-change positive">+1.2%</div>
              </div>
              <div class="placeholder-item">
                <div class="placeholder-item-label">CBA.AX</div>
                <div class="placeholder-item-value">$102.34</div>
                <div class="placeholder-item-change negative">-0.5%</div>
              </div>
              <div class="placeholder-item">
                <div class="placeholder-item-label">FMG.AX</div>
                <div class="placeholder-item-value">$23.45</div>
                <div class="placeholder-item-change positive">+2.1%</div>
              </div>
            </div>
          </div>
        `;
      
      case 'top-opportunities':
        return `
          <div class="widget-placeholder">
            <h4>Top Trading Opportunities</h4>
            <div class="placeholder-list">
              <div class="placeholder-item">
                <div class="placeholder-item-label">MIN.AX</div>
                <div class="placeholder-item-value">High Potential</div>
                <div class="placeholder-item-change">+18.5% potential</div>
              </div>
              <div class="placeholder-item">
                <div class="placeholder-item-label">TWE.AX</div>
                <div class="placeholder-item-value">Medium Potential</div>
                <div class="placeholder-item-change">+15.2% potential</div>
              </div>
              <div class="placeholder-item">
                <div class="placeholder-item-label">JHX.AX</div>
                <div class="placeholder-item-value">High Potential</div>
                <div class="placeholder-item-change">+17.8% potential</div>
              </div>
            </div>
          </div>
        `;
      
      case 'stock-predictions':
        return `
          <div class="widget-placeholder">
            <h4>Stock Predictions</h4>
            <div class="placeholder-list">
              <div class="placeholder-item">
                <div class="placeholder-item-label">BHP.AX</div>
                <div class="placeholder-item-value">Bullish</div>
                <div class="placeholder-item-change">85% confidence</div>
              </div>
              <div class="placeholder-item">
                <div class="placeholder-item-label">FMG.AX</div>
                <div class="placeholder-item-value">Bullish</div>
                <div class="placeholder-item-change">78% confidence</div>
              </div>
              <div class="placeholder-item">
                <div class="placeholder-item-label">CBA.AX</div>
                <div class="placeholder-item-value">Neutral</div>
                <div class="placeholder-item-change">65% confidence</div>
              </div>
            </div>
          </div>
        `;
      
      default:
        return `
          <div class="widget-placeholder">
            <p>Widget content for "${widgetId}" would be loaded here</p>
          </div>
        `;
    }
  }
  
  /**
   * Add widget
   * @param {string} widgetId - Widget ID
   * @private
   */
  _addWidget(widgetId) {
    const widgetData = this.availableWidgets.find(w => w.id === widgetId);
    if (!widgetData) return;
    
    // Create widget
    const widget = {
      id: widgetId,
      size: widgetData.defaultSize,
      position: this.widgets.length
    };
    
    // Add to widgets
    this.widgets.push(widget);
    
    // Render widgets
    this._renderWidgets();
  }
  
  /**
   * Remove widget
   * @param {string} widgetId - Widget ID
   * @private
   */
  _removeWidget(widgetId) {
    // Find widget index
    const index = this.widgets.findIndex(w => w.id === widgetId);
    if (index === -1) return;
    
    // Remove widget
    this.widgets.splice(index, 1);
    
    // Render widgets
    this._renderWidgets();
  }
  
  /**
   * Resize widget
   * @param {string} widgetId - Widget ID
   * @param {string} size - New size
   * @private
   */
  _resizeWidget(widgetId, size) {
    // Find widget
    const widget = this.widgets.find(w => w.id === widgetId);
    if (!widget) return;
    
    // Update size
    widget.size = size;
    
    // Update element
    const element = document.querySelector(`.dashboard-widget[data-widget-id="${widgetId}"]`);
    if (element) {
      element.className = `dashboard-widget widget-${size}`;
    }
  }
  
  /**
   * Load saved dashboard
   * @private
   */
  _loadSavedDashboard() {
    // Check for saved dashboard in localStorage
    const savedDashboard = localStorage.getItem('trumpTariffDashboard');
    if (savedDashboard) {
      try {
        const dashboard = JSON.parse(savedDashboard);
        this.widgets = dashboard.widgets || [];
        this.currentLayout = dashboard.layout || '2-column';
        
        // Update layout selector
        const layoutSelector = document.getElementById('dashboard-layout');
        if (layoutSelector) {
          layoutSelector.value = this.currentLayout;
        }
        
        // Apply layout
        this._applyLayout();
      } catch (error) {
        console.error('Error loading saved dashboard:', error);
        this._loadDefaultDashboard();
      }
    } else {
      this._loadDefaultDashboard();
    }
  }
  
  /**
   * Load default dashboard
   * @private
   */
  _loadDefaultDashboard() {
    // Set default widgets
    this.widgets = [
      { id: 'market-overview', size: 'medium', position: 0 },
      { id: 'top-opportunities', size: 'medium', position: 1 },
      { id: 'watchlist', size: 'small', position: 2 },
      { id: 'stock-predictions', size: 'medium', position: 3 }
    ];
    
    // Set default layout
    this.currentLayout = '2-column';
    
    // Update layout selector
    const layoutSelector = document.getElementById('dashboard-layout');
    if (layoutSelector) {
      layoutSelector.value = this.currentLayout;
    }
    
    // Apply layout
    this._applyLayout();
  }
  
  /**
   * Save dashboard
   * @private
   */
  _saveDashboard() {
    // Create dashboard data
    const dashboard = {
      widgets: this.widgets,
      layout: this.currentLayout
    };
    
    // Save to localStorage
    localStorage.setItem('trumpTariffDashboard', JSON.stringify(dashboard));
    
    // Show notification
    this._showNotification('Dashboard saved successfully');
    
    // Exit edit mode
    if (this.isEditMode) {
      this._toggleEditMode();
    }
  }
  
  /**
   * Reset dashboard
   * @private
   */
  _resetDashboard() {
    // Load default dashboard
    this._loadDefaultDashboard();
    
    // Show notification
    this._showNotification('Dashboard reset to default');
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

export default CustomizableDashboard;
