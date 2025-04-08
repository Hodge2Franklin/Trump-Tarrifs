/**
 * User Profile Integration for Trump Tariff Analysis Website
 * 
 * This script integrates the user profile system with the website
 * to provide user profiles, saved preferences, watchlists, and alerts.
 */

import UserProfileSystem from '../components/user/UserProfileSystem.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize user profile system
  const userProfileSystem = new UserProfileSystem();
  
  // Add user profile stylesheet
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = '../styles/user-profile.css';
  document.head.appendChild(linkElement);
  
  // Add watchlist integration
  integrateWatchlist();
  
  // Add alerts integration
  integrateAlerts();
  
  // Add analysis settings integration
  integrateAnalysisSettings();
  
  /**
   * Integrate watchlist functionality with stock components
   */
  function integrateWatchlist() {
    // Add watchlist buttons to stock cards and detail pages
    const stockElements = document.querySelectorAll('.stock-card, .stock-detail');
    
    stockElements.forEach(element => {
      // Get stock symbol and name
      const symbolElement = element.querySelector('.stock-symbol');
      const nameElement = element.querySelector('.stock-name');
      
      if (!symbolElement) return;
      
      const symbol = symbolElement.textContent;
      const name = nameElement ? nameElement.textContent : symbol;
      
      // Create watchlist button
      const watchlistButton = document.createElement('button');
      watchlistButton.className = 'watchlist-toggle-button';
      
      // Check if stock is in watchlist
      const isInWatchlist = userProfileSystem.isInWatchlist(symbol);
      
      // Set initial state
      updateWatchlistButtonState(watchlistButton, isInWatchlist);
      
      // Add event listener
      watchlistButton.addEventListener('click', () => {
        if (isInWatchlist) {
          userProfileSystem.removeFromWatchlist(symbol);
          updateWatchlistButtonState(watchlistButton, false);
        } else {
          userProfileSystem.addToWatchlist(symbol, name);
          updateWatchlistButtonState(watchlistButton, true);
        }
      });
      
      // Add button to element
      const actionArea = element.querySelector('.stock-actions') || element;
      actionArea.appendChild(watchlistButton);
    });
    
    // Create watchlist section on dashboard
    createWatchlistSection();
  }
  
  /**
   * Update watchlist button state
   * @param {HTMLElement} button - Watchlist button
   * @param {boolean} isInWatchlist - Whether stock is in watchlist
   */
  function updateWatchlistButtonState(button, isInWatchlist) {
    if (isInWatchlist) {
      button.innerHTML = '<i class="icon-star-filled">★</i>';
      button.title = 'Remove from Watchlist';
      button.classList.add('in-watchlist');
    } else {
      button.innerHTML = '<i class="icon-star-outline">☆</i>';
      button.title = 'Add to Watchlist';
      button.classList.remove('in-watchlist');
    }
  }
  
  /**
   * Create watchlist section on dashboard
   */
  function createWatchlistSection() {
    const dashboardContainer = document.querySelector('.dashboard-container');
    if (!dashboardContainer) return;
    
    // Create watchlist section
    const watchlistSection = document.createElement('div');
    watchlistSection.className = 'dashboard-section watchlist-section';
    watchlistSection.innerHTML = `
      <div class="section-header">
        <h3>Watchlist</h3>
        <button class="section-action-button" id="manage-watchlist">Manage</button>
      </div>
      <div class="section-content" id="watchlist-content">
        ${generateWatchlistContent()}
      </div>
    `;
    
    // Add to dashboard
    dashboardContainer.appendChild(watchlistSection);
    
    // Add event listener to manage button
    document.getElementById('manage-watchlist').addEventListener('click', () => {
      userProfileSystem._showWatchlistManager();
    });
    
    // Listen for watchlist changes
    document.addEventListener('userPreferencesApplied', () => {
      updateWatchlistContent();
    });
  }
  
  /**
   * Generate watchlist content
   * @returns {string} Watchlist content HTML
   */
  function generateWatchlistContent() {
    const watchlist = userProfileSystem.getUserWatchlist();
    
    if (watchlist.length === 0) {
      return `
        <div class="empty-section-message">
          <p>Your watchlist is empty. Add stocks to track them easily.</p>
        </div>
      `;
    }
    
    return `
      <div class="watchlist-items">
        ${watchlist.map(item => `
          <div class="watchlist-item" data-symbol="${item.symbol}">
            <div class="watchlist-item-info">
              <div class="watchlist-item-symbol">${item.symbol}</div>
              <div class="watchlist-item-name">${item.name}</div>
            </div>
            <div class="watchlist-item-data">
              <div class="watchlist-item-price">$--.-</div>
              <div class="watchlist-item-change">--.--%</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  /**
   * Update watchlist content
   */
  function updateWatchlistContent() {
    const watchlistContent = document.getElementById('watchlist-content');
    if (watchlistContent) {
      watchlistContent.innerHTML = generateWatchlistContent();
      
      // Add click event to watchlist items
      const watchlistItems = watchlistContent.querySelectorAll('.watchlist-item');
      watchlistItems.forEach(item => {
        item.addEventListener('click', () => {
          const symbol = item.getAttribute('data-symbol');
          navigateToStockDetail(symbol);
        });
      });
      
      // Fetch latest prices for watchlist items
      fetchWatchlistPrices();
    }
  }
  
  /**
   * Fetch latest prices for watchlist items
   */
  function fetchWatchlistPrices() {
    const watchlist = userProfileSystem.getUserWatchlist();
    
    // In a real implementation, this would fetch actual prices
    // This is a simplified version for demonstration
    setTimeout(() => {
      watchlist.forEach(item => {
        const element = document.querySelector(`.watchlist-item[data-symbol="${item.symbol}"]`);
        if (!element) return;
        
        const priceElement = element.querySelector('.watchlist-item-price');
        const changeElement = element.querySelector('.watchlist-item-change');
        
        // Generate random price and change
        const price = (Math.random() * 100 + 10).toFixed(2);
        const change = (Math.random() * 10 - 5).toFixed(2);
        const isPositive = parseFloat(change) >= 0;
        
        // Update elements
        priceElement.textContent = `$${price}`;
        changeElement.textContent = `${isPositive ? '+' : ''}${change}%`;
        changeElement.className = `watchlist-item-change ${isPositive ? 'positive' : 'negative'}`;
      });
    }, 500);
  }
  
  /**
   * Navigate to stock detail page
   * @param {string} symbol - Stock symbol
   */
  function navigateToStockDetail(symbol) {
    // In a real implementation, this would navigate to the stock detail page
    console.log(`Navigating to stock detail for ${symbol}`);
    
    // Simulate navigation
    window.location.href = `/stock-analysis.html?symbol=${symbol}`;
  }
  
  /**
   * Integrate alerts functionality
   */
  function integrateAlerts() {
    // Create alerts section on dashboard
    createAlertsSection();
    
    // Add alert buttons to stock detail pages
    const stockDetailPages = document.querySelectorAll('.stock-detail-page');
    
    stockDetailPages.forEach(page => {
      // Get stock symbol
      const symbolElement = page.querySelector('.stock-symbol');
      if (!symbolElement) return;
      
      const symbol = symbolElement.textContent;
      
      // Create alert button
      const alertButton = document.createElement('button');
      alertButton.className = 'create-alert-button';
      alertButton.innerHTML = '<i class="icon-bell">🔔</i> Create Alert';
      alertButton.title = 'Create price alert';
      
      // Add event listener
      alertButton.addEventListener('click', () => {
        showCreateAlertForm(symbol);
      });
      
      // Add button to page
      const actionArea = page.querySelector('.stock-actions') || page.querySelector('.stock-header');
      if (actionArea) {
        actionArea.appendChild(alertButton);
      }
    });
  }
  
  /**
   * Create alerts section on dashboard
   */
  function createAlertsSection() {
    const dashboardContainer = document.querySelector('.dashboard-container');
    if (!dashboardContainer) return;
    
    // Create alerts section
    const alertsSection = document.createElement('div');
    alertsSection.className = 'dashboard-section alerts-section';
    alertsSection.innerHTML = `
      <div class="section-header">
        <h3>Price Alerts</h3>
        <button class="section-action-button" id="manage-alerts">Manage</button>
      </div>
      <div class="section-content" id="alerts-content">
        ${generateAlertsContent()}
      </div>
    `;
    
    // Add to dashboard
    dashboardContainer.appendChild(alertsSection);
    
    // Add event listener to manage button
    document.getElementById('manage-alerts').addEventListener('click', () => {
      userProfileSystem._showAlertConfigurator();
    });
    
    // Listen for alerts changes
    document.addEventListener('userPreferencesApplied', () => {
      updateAlertsContent();
    });
  }
  
  /**
   * Generate alerts content
   * @returns {string} Alerts content HTML
   */
  function generateAlertsContent() {
    const alerts = userProfileSystem.getUserAlerts();
    
    if (alerts.length === 0) {
      return `
        <div class="empty-section-message">
          <p>You have no alerts configured. Add alerts to be notified of price movements.</p>
        </div>
      `;
    }
    
    return `
      <div class="alert-items">
        ${alerts.map((alert, index) => `
          <div class="alert-item" data-index="${index}">
            <div class="alert-item-info">
              <div class="alert-item-symbol">${alert.symbol}</div>
              <div class="alert-item-condition">
                ${alert.condition === 'above' ? '>' : '<'} $${alert.price.toFixed(2)}
              </div>
              <div class="alert-item-priority ${alert.priority}">${alert.priority}</div>
            </div>
            <button class="remove-alert-item" data-index="${index}">&times;</button>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  /**
   * Update alerts content
   */
  function updateAlertsContent() {
    const alertsContent = document.getElementById('alerts-content');
    if (alertsContent) {
      alertsContent.innerHTML = generateAlertsContent();
      
      // Add remove button listeners
      const removeButtons = alertsContent.querySelectorAll('.remove-alert-item');
      removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const index = parseInt(button.getAttribute('data-index'));
          userProfileSystem.removeAlert(index);
          updateAlertsContent();
        });
      });
      
      // Add click event to alert items
      const alertItems = alertsContent.querySelectorAll('.alert-item');
      alertItems.forEach(item => {
        item.addEventListener('click', () => {
          const index = parseInt(item.getAttribute('data-index'));
          const alerts = userProfileSystem.getUserAlerts();
          if (index < alerts.length) {
            navigateToStockDetail(alerts[index].symbol);
          }
        });
      });
    }
  }
  
  /**
   * Show create alert form
   * @param {string} symbol - Stock symbol
   */
  function showCreateAlertForm(symbol) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>Create Alert for ${symbol}</h3>
          <button class="close-button" id="close-alert-modal">&times;</button>
        </div>
        <div class="modal-content">
          <div class="alert-form">
            <div class="form-group">
              <label for="alert-condition">Condition:</label>
              <select id="alert-condition" class="form-control">
                <option value="above">Price Above</option>
                <option value="below">Price Below</option>
              </select>
            </div>
            <div class="form-group">
              <label for="alert-price">Price:</label>
              <input type="number" id="alert-price" class="form-control" step="0.01" min="0" placeholder="Enter price">
            </div>
            <div class="form-group">
              <label for="alert-priority">Priority:</label>
              <select id="alert-priority" class="form-control">
                <option value="high">High</option>
                <option value="medium" selected>Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div class="form-actions">
              <button class="form-button save-button" id="save-alert-button">Create Alert</button>
              <button class="form-button cancel-button" id="cancel-alert-button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add event listeners
    document.getElementById('close-alert-modal').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    document.getElementById('cancel-alert-button').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    document.getElementById('save-alert-button').addEventListener('click', () => {
      const condition = document.getElementById('alert-condition').value;
      const price = parseFloat(document.getElementById('alert-price').value);
      const priority = document.getElementById('alert-priority').value;
      
      if (isNaN(price) || price <= 0) {
        showNotification('Please enter a valid price', 'warning');
        return;
      }
      
      userProfileSystem.addAlert(symbol, condition, price, priority);
      updateAlertsContent();
      document.body.removeChild(modal);
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }
  
  /**
   * Integrate analysis settings
   */
  function integrateAnalysisSettings() {
    // Add settings button to analysis pages
    const analysisPages = document.querySelectorAll('.analysis-page');
    
    analysisPages.forEach(page => {
      // Create settings button
      const settingsButton = document.createElement('button');
      settingsButton.className = 'analysis-settings-button';
      settingsButton.innerHTML = '<i class="icon-settings">⚙</i> Analysis Settings';
      settingsButton.title = 'Configure analysis settings';
      
      // Add event listener
      settingsButton.addEventListener('click', () => {
        showAnalysisSettingsForm();
      });
      
      // Add button to page
      const actionArea = page.querySelector('.page-actions') || page.querySelector('.page-header');
      if (actionArea) {
        actionArea.appendChild(settingsButton);
      }
    });
    
    // Apply current settings
    applyAnalysisSettings();
    
    // Listen for settings changes
    document.addEventListener('userPreferencesApplied', () => {
      applyAnalysisSettings();
    });
  }
  
  /**
   * Show analysis settings form
   */
  function showAnalysisSettingsForm() {
    // Get current settings
    const preferences = userProfileSystem.getUserPreferences();
    const settings = preferences.analysisSettings || {};
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>Analysis Settings</h3>
          <button class="close-button" id="close-settings-modal">&times;</button>
        </div>
        <div class="modal-content">
          <div class="settings-form">
            <div class="form-group">
              <label for="default-timeframe">Default Timeframe:</label>
              <select id="default-timeframe" class="form-control">
                <option value="1m" ${settings.defaultTimeframe === '1m' ? 'selected' : ''}>1 Month</option>
                <option value="3m" ${settings.defaultTimeframe === '3m' ? 'selected' : ''}>3 Months</option>
                <option value="6m" ${settings.defaultTimeframe === '6m' ? 'selected' : ''}>6 Months</option>
                <option value="1y" ${settings.defaultTimeframe === '1y' ? 'selected' : ''}>1 Year</option>
                <option value="2y" ${settings.defaultTimeframe === '2y' ? 'selected' : ''}>2 Years</option>
              </select>
            </div>
            <div class="form-group">
              <label for="default-risk-profile">Default Risk Profile:</label>
              <select id="default-risk-profile" class="form-control">
                <option value="all" ${settings.defaultRiskProfile === 'all' ? 'selected' : ''}>All</option>
                <option value="low" ${settings.defaultRiskProfile === 'low' ? 'selected' : ''}>Low Risk</option>
                <option value="medium" ${settings.defaultRiskProfile === 'medium' ? 'selected' : ''}>Medium Risk</option>
                <option value="high" ${settings.defaultRiskProfile === 'high' ? 'selected' : ''}>High Risk</option>
                <option value="very-high" ${settings.defaultRiskProfile === 'very-high' ? 'selected' : ''}>Very High Risk</option>
              </select>
            </div>
            <div class="form-group">
              <label for="default-sectors">Default Sectors:</label>
              <select id="default-sectors" class="form-control">
                <option value="all" ${settings.defaultSectors === 'all' ? 'selected' : ''}>All Sectors</option>
                <option value="materials" ${settings.defaultSectors === 'materials' ? 'selected' : ''}>Materials</option>
                <option value="financials" ${settings.defaultSectors === 'financials' ? 'selected' : ''}>Financials</option>
                <option value="energy" ${settings.defaultSectors === 'energy' ? 'selected' : ''}>Energy</option>
                <option value="healthcare" ${settings.defaultSectors === 'healthcare' ? 'selected' : ''}>Healthcare</option>
                <option value="industrials" ${settings.defaultSectors === 'industrials' ? 'selected' : ''}>Industrials</option>
                <option value="technology" ${settings.defaultSectors === 'technology' ? 'selected' : ''}>Technology</option>
                <option value="consumer" ${settings.defaultSectors === 'consumer' ? 'selected' : ''}>Consumer</option>
              </select>
            </div>
            <div class="form-group">
              <label for="tariff-sensitivity-threshold">Tariff Sensitivity Threshold:</label>
              <input type="range" id="tariff-sensitivity-threshold" class="form-control range-control" min="1" max="10" step="1" value="${settings.tariffSensitivityThreshold || 5}">
              <div class="range-value" id="tariff-sensitivity-value">${settings.tariffSensitivityThreshold || 5}</div>
            </div>
            <div class="form-group">
              <label for="movement-potential-threshold">Movement Potential Threshold (%):</label>
              <input type="range" id="movement-potential-threshold" class="form-control range-control" min="1" max="10" step="1" value="${settings.movementPotentialThreshold || 5}">
              <div class="range-value" id="movement-potential-value">${settings.movementPotentialThreshold || 5}</div>
            </div>
            <div class="form-group">
              <label for="volatility-threshold">Volatility Threshold (%):</label>
              <input type="range" id="volatility-threshold" class="form-control range-control" min="5" max="50" step="5" value="${settings.volatilityThreshold || 20}">
              <div class="range-value" id="volatility-value">${settings.volatilityThreshold || 20}</div>
            </div>
            <div class="form-actions">
              <button class="form-button save-button" id="save-settings-button">Save Settings</button>
              <button class="form-button cancel-button" id="cancel-settings-button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add event listeners
    document.getElementById('close-settings-modal').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    document.getElementById('cancel-settings-button').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Add range input listeners
    document.getElementById('tariff-sensitivity-threshold').addEventListener('input', (e) => {
      document.getElementById('tariff-sensitivity-value').textContent = e.target.value;
    });
    
    document.getElementById('movement-potential-threshold').addEventListener('input', (e) => {
      document.getElementById('movement-potential-value').textContent = e.target.value;
    });
    
    document.getElementById('volatility-threshold').addEventListener('input', (e) => {
      document.getElementById('volatility-value').textContent = e.target.value;
    });
    
    document.getElementById('save-settings-button').addEventListener('click', () => {
      // Get form values
      const newSettings = {
        defaultTimeframe: document.getElementById('default-timeframe').value,
        defaultRiskProfile: document.getElementById('default-risk-profile').value,
        defaultSectors: document.getElementById('default-sectors').value,
        tariffSensitivityThreshold: parseInt(document.getElementById('tariff-sensitivity-threshold').value),
        movementPotentialThreshold: parseInt(document.getElementById('movement-potential-threshold').value),
        volatilityThreshold: parseInt(document.getElementById('volatility-threshold').value)
      };
      
      // Update preferences
      userProfileSystem.updateUserPreferences({
        analysisSettings: newSettings
      });
      
      // Close modal
      document.body.removeChild(modal);
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }
  
  /**
   * Apply analysis settings
   */
  function applyAnalysisSettings() {
    const preferences = userProfileSystem.getUserPreferences();
    const settings = preferences.analysisSettings || {};
    
    // Apply timeframe
    const timeframeSelects = document.querySelectorAll('.timeframe-select');
    timeframeSelects.forEach(select => {
      if (select.value === '') {
        select.value = settings.defaultTimeframe || '3m';
      }
    });
    
    // Apply risk profile
    const riskProfileSelects = document.querySelectorAll('.risk-profile-select');
    riskProfileSelects.forEach(select => {
      if (select.value === '') {
        select.value = settings.defaultRiskProfile || 'all';
      }
    });
    
    // Apply sectors
    const sectorSelects = document.querySelectorAll('.sector-select');
    sectorSelects.forEach(select => {
      if (select.value === '') {
        select.value = settings.defaultSectors || 'all';
      }
    });
    
    // Apply thresholds to filters
    const tariffSensitivityFilters = document.querySelectorAll('.tariff-sensitivity-filter');
    tariffSensitivityFilters.forEach(filter => {
      filter.value = settings.tariffSensitivityThreshold || 5;
    });
    
    const movementPotentialFilters = document.querySelectorAll('.movement-potential-filter');
    movementPotentialFilters.forEach(filter => {
      filter.value = settings.movementPotentialThreshold || 5;
    });
    
    const volatilityFilters = document.querySelectorAll('.volatility-filter');
    volatilityFilters.forEach(filter => {
      filter.value = settings.volatilityThreshold || 20;
    });
    
    // Trigger filter updates
    const filterUpdateEvent = new Event('change');
    tariffSensitivityFilters.forEach(filter => filter.dispatchEvent(filterUpdateEvent));
    movementPotentialFilters.forEach(filter => filter.dispatchEvent(filterUpdateEvent));
    volatilityFilters.forEach(filter => filter.dispatchEvent(filterUpdateEvent));
  }
  
  /**
   * Show notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type
   */
  function showNotification(message, type = 'success') {
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
});
