// Real-Time Data Dashboard Component for Trump Tariff Analysis Website

/**
 * This component integrates real-time data into the dashboard,
 * displaying live market data, stock quotes, forex rates, and tariff news.
 */

import realTimeDataService from '../scripts/realTimeDataService.js';

class RealTimeDataDashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    this.isInitialized = false;
    this.subscribers = {};
    
    // Create dashboard sections
    this.marketIndicesSection = null;
    this.forexRatesSection = null;
    this.stockQuotesSection = null;
    this.tariffNewsSection = null;
    
    // Initialize dashboard
    this.initialize();
  }
  
  /**
   * Initialize the real-time data dashboard
   */
  async initialize() {
    if (this.isInitialized) {
      console.warn('Real-time data dashboard is already initialized');
      return;
    }
    
    console.log('Initializing real-time data dashboard');
    
    try {
      // Create dashboard structure
      this._createDashboardStructure();
      
      // Initialize real-time data service
      await realTimeDataService.initialize();
      
      // Subscribe to data updates
      this._subscribeToDataUpdates();
      
      this.isInitialized = true;
      console.log('Real-time data dashboard initialized successfully');
    } catch (error) {
      console.error('Error initializing real-time data dashboard:', error);
    }
  }
  
  /**
   * Create dashboard structure
   */
  _createDashboardStructure() {
    // Clear container
    this.container.innerHTML = '';
    
    // Create dashboard header
    const header = document.createElement('div');
    header.className = 'dashboard-header';
    header.innerHTML = `
      <h2>Real-Time Market Dashboard</h2>
      <div class="dashboard-controls">
        <button id="refresh-dashboard" class="refresh-button">
          <span class="refresh-icon">↻</span> Refresh All
        </button>
        <div class="last-updated">
          Last updated: <span id="last-updated-time">Just now</span>
        </div>
      </div>
    `;
    this.container.appendChild(header);
    
    // Add refresh button event listener
    const refreshButton = header.querySelector('#refresh-dashboard');
    refreshButton.addEventListener('click', () => this._refreshAllData());
    
    // Create dashboard grid
    const dashboardGrid = document.createElement('div');
    dashboardGrid.className = 'dashboard-grid';
    
    // Create market indices section
    this.marketIndicesSection = document.createElement('div');
    this.marketIndicesSection.className = 'dashboard-section market-indices-section';
    this.marketIndicesSection.innerHTML = `
      <div class="section-header">
        <h3>Market Indices</h3>
        <div class="section-controls">
          <button class="section-refresh-button" data-section="marketIndices">
            <span class="refresh-icon">↻</span>
          </button>
        </div>
      </div>
      <div class="section-content" id="market-indices-content">
        <div class="loading-indicator">Loading market indices...</div>
      </div>
    `;
    dashboardGrid.appendChild(this.marketIndicesSection);
    
    // Create forex rates section
    this.forexRatesSection = document.createElement('div');
    this.forexRatesSection.className = 'dashboard-section forex-rates-section';
    this.forexRatesSection.innerHTML = `
      <div class="section-header">
        <h3>Forex Rates</h3>
        <div class="section-controls">
          <button class="section-refresh-button" data-section="forexRates">
            <span class="refresh-icon">↻</span>
          </button>
        </div>
      </div>
      <div class="section-content" id="forex-rates-content">
        <div class="loading-indicator">Loading forex rates...</div>
      </div>
    `;
    dashboardGrid.appendChild(this.forexRatesSection);
    
    // Create stock quotes section
    this.stockQuotesSection = document.createElement('div');
    this.stockQuotesSection.className = 'dashboard-section stock-quotes-section';
    this.stockQuotesSection.innerHTML = `
      <div class="section-header">
        <h3>ASX Stocks</h3>
        <div class="section-controls">
          <button class="section-refresh-button" data-section="stockQuotes">
            <span class="refresh-icon">↻</span>
          </button>
          <select id="stock-quotes-filter" class="section-filter">
            <option value="all">All Sectors</option>
            <option value="Materials">Materials</option>
            <option value="Consumer Staples">Consumer Staples</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Financials">Financials</option>
            <option value="Information Technology">IT</option>
            <option value="Industrials">Industrials</option>
            <option value="Utilities">Utilities</option>
            <option value="Energy">Energy</option>
          </select>
        </div>
      </div>
      <div class="section-content" id="stock-quotes-content">
        <div class="loading-indicator">Loading stock quotes...</div>
      </div>
    `;
    dashboardGrid.appendChild(this.stockQuotesSection);
    
    // Create tariff news section
    this.tariffNewsSection = document.createElement('div');
    this.tariffNewsSection.className = 'dashboard-section tariff-news-section';
    this.tariffNewsSection.innerHTML = `
      <div class="section-header">
        <h3>Tariff News</h3>
        <div class="section-controls">
          <button class="section-refresh-button" data-section="tariffNews">
            <span class="refresh-icon">↻</span>
          </button>
        </div>
      </div>
      <div class="section-content" id="tariff-news-content">
        <div class="loading-indicator">Loading tariff news...</div>
      </div>
    `;
    dashboardGrid.appendChild(this.tariffNewsSection);
    
    // Add dashboard grid to container
    this.container.appendChild(dashboardGrid);
    
    // Add section refresh button event listeners
    const refreshButtons = this.container.querySelectorAll('.section-refresh-button');
    refreshButtons.forEach(button => {
      const section = button.getAttribute('data-section');
      button.addEventListener('click', () => this._refreshSectionData(section));
    });
    
    // Add stock quotes filter event listener
    const stockQuotesFilter = this.container.querySelector('#stock-quotes-filter');
    stockQuotesFilter.addEventListener('change', () => this._filterStockQuotes(stockQuotesFilter.value));
  }
  
  /**
   * Subscribe to data updates from real-time data service
   */
  _subscribeToDataUpdates() {
    // Subscribe to market indices updates
    realTimeDataService.subscribe('marketIndices', update => {
      this._handleMarketIndicesUpdate(update);
    });
    
    // Subscribe to forex rates updates
    realTimeDataService.subscribe('forexRates', update => {
      this._handleForexRatesUpdate(update);
    });
    
    // Subscribe to stock quotes updates
    realTimeDataService.subscribe('stockQuotes', update => {
      this._handleStockQuotesUpdate(update);
    });
    
    // Subscribe to tariff news updates
    realTimeDataService.subscribe('tariffNews', update => {
      this._handleTariffNewsUpdate(update);
    });
  }
  
  /**
   * Handle market indices update
   * @param {Object} update - Market indices update
   */
  _handleMarketIndicesUpdate(update) {
    const contentElement = document.getElementById('market-indices-content');
    if (!contentElement) return;
    
    // Update last updated time
    this._updateLastUpdatedTime();
    
    if (update.type === 'initial' || update.type === 'refresh') {
      // Full refresh of market indices
      this._renderMarketIndices(update.data);
    } else if (update.type === 'update') {
      // Update single market index
      this._updateMarketIndex(update.symbol, update.data);
    }
  }
  
  /**
   * Handle forex rates update
   * @param {Object} update - Forex rates update
   */
  _handleForexRatesUpdate(update) {
    const contentElement = document.getElementById('forex-rates-content');
    if (!contentElement) return;
    
    // Update last updated time
    this._updateLastUpdatedTime();
    
    if (update.type === 'initial' || update.type === 'refresh') {
      // Full refresh of forex rates
      this._renderForexRates(update.data);
    } else if (update.type === 'update') {
      // Update single forex rate
      this._updateForexRate(update.pair, update.data);
    }
  }
  
  /**
   * Handle stock quotes update
   * @param {Object} update - Stock quotes update
   */
  _handleStockQuotesUpdate(update) {
    const contentElement = document.getElementById('stock-quotes-content');
    if (!contentElement) return;
    
    // Update last updated time
    this._updateLastUpdatedTime();
    
    if (update.type === 'initial' || update.type === 'refresh') {
      // Full refresh of stock quotes
      this._renderStockQuotes(update.data);
    } else if (update.type === 'update') {
      // Update single stock quote
      this._updateStockQuote(update.symbol, update.data);
    }
  }
  
  /**
   * Handle tariff news update
   * @param {Object} update - Tariff news update
   */
  _handleTariffNewsUpdate(update) {
    const contentElement = document.getElementById('tariff-news-content');
    if (!contentElement) return;
    
    // Update last updated time
    this._updateLastUpdatedTime();
    
    if (update.type === 'initial' || update.type === 'refresh') {
      // Full refresh of tariff news
      this._renderTariffNews(update.data);
    } else if (update.type === 'add') {
      // Add new news item
      this._addTariffNewsItem(update.data);
    }
  }
  
  /**
   * Render market indices
   * @param {Object} indices - Market indices data
   */
  _renderMarketIndices(indices) {
    const contentElement = document.getElementById('market-indices-content');
    if (!contentElement) return;
    
    // Clear content
    contentElement.innerHTML = '';
    
    // Check if we have data
    if (!indices || Object.keys(indices).length === 0) {
      contentElement.innerHTML = '<div class="no-data">No market indices data available</div>';
      return;
    }
    
    // Create table
    const table = document.createElement('table');
    table.className = 'data-table indices-table';
    
    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Index</th>
        <th>Value</th>
        <th>Change</th>
      </tr>
    `;
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Add rows for each index
    Object.values(indices).forEach(index => {
      const row = document.createElement('tr');
      row.setAttribute('data-symbol', index.symbol);
      
      const changeClass = index.changePct >= 0 ? 'positive-change' : 'negative-change';
      const changeSign = index.changePct >= 0 ? '+' : '';
      
      row.innerHTML = `
        <td class="index-name">${index.name}</td>
        <td class="index-value">${index.value.toFixed(2)}</td>
        <td class="index-change ${changeClass}">${changeSign}${index.changePct.toFixed(2)}%</td>
      `;
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    contentElement.appendChild(table);
  }
  
  /**
   * Update single market index
   * @param {string} symbol - Index symbol
   * @param {Object} data - Index data
   */
  _updateMarketIndex(symbol, data) {
    const row = document.querySelector(`#market-indices-content tr[data-symbol="${symbol}"]`);
    if (!row) return;
    
    const valueCell = row.querySelector('.index-value');
    const changeCell = row.querySelector('.index-change');
    
    if (valueCell) {
      valueCell.textContent = data.value.toFixed(2);
    }
    
    if (changeCell) {
      const changeClass = data.changePct >= 0 ? 'positive-change' : 'negative-change';
      const changeSign = data.changePct >= 0 ? '+' : '';
      
      changeCell.className = `index-change ${changeClass}`;
      changeCell.textContent = `${changeSign}${data.changePct.toFixed(2)}%`;
      
      // Add flash effect
      changeCell.classList.add('flash');
      setTimeout(() => {
        changeCell.classList.remove('flash');
      }, 1000);
    }
  }
  
  /**
   * Render forex rates
   * @param {Object} rates - Forex rates data
   */
  _renderForexRates(rates) {
    const contentElement = document.getElementById('forex-rates-content');
    if (!contentElement) return;
    
    // Clear content
    contentElement.innerHTML = '';
    
    // Check if we have data
    if (!rates || Object.keys(rates).length === 0) {
      contentElement.innerHTML = '<div class="no-data">No forex rates data available</div>';
      return;
    }
    
    // Create table
    const table = document.createElement('table');
    table.className = 'data-table forex-table';
    
    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Pair</th>
        <th>Rate</th>
        <th>Change</th>
      </tr>
    `;
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Add rows for each forex pair
    Object.values(rates).forEach(rate => {
      const row = document.createElement('tr');
      row.setAttribute('data-pair', rate.pair);
      
      const changeClass = rate.changePct >= 0 ? 'positive-change' : 'negative-change';
      const changeSign = rate.changePct >= 0 ? '+' : '';
      
      row.innerHTML = `
        <td class="forex-pair">${rate.pair}</td>
        <td class="forex-rate">${rate.rate.toFixed(4)}</td>
        <td class="forex-change ${changeClass}">${changeSign}${rate.changePct.toFixed(2)}%</td>
      `;
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    contentElement.appendChild(table);
  }
  
  /**
   * Update single forex rate
   * @param {string} pair - Forex pair
   * @param {Object} data - Forex rate data
   */
  _updateForexRate(pair, data) {
    const row = document.querySelector(`#forex-rates-content tr[data-pair="${pair}"]`);
    if (!row) return;
    
    const rateCell = row.querySelector('.forex-rate');
    const changeCell = row.querySelector('.forex-change');
    
    if (rateCell) {
      rateCell.textContent = data.rate.toFixed(4);
    }
    
    if (changeCell) {
      const changeClass = data.changePct >= 0 ? 'positive-change' : 'negative-change';
      const changeSign = data.changePct >= 0 ? '+' : '';
      
      changeCell.className = `forex-change ${changeClass}`;
      changeCell.textContent = `${changeSign}${data.changePct.toFixed(2)}%`;
      
      // Add flash effect
      changeCell.classList.add('flash');
      setTimeout(() => {
        changeCell.classList.remove('flash');
      }, 1000);
    }
  }
  
  /**
   * Render stock quotes
   * @param {Object} quotes - Stock quotes data
   */
  _renderStockQuotes(quotes) {
    const contentElement = document.getElementById('stock-quotes-content');
    if (!contentElement) return;
    
    // Clear content
    contentElement.innerHTML = '';
    
    // Check if we have data
    if (!quotes || Object.keys(quotes).length === 0) {
      contentElement.innerHTML = '<div class="no-data">No stock quotes data available</div>';
      return;
    }
    
    // Get current filter value
    const filterValue = document.getElementById('stock-quotes-filter').value;
    
    // Create table
    const table = document.createElement('table');
    table.className = 'data-table stocks-table';
    
    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Symbol</th>
        <th>Price</th>
        <th>Change</th>
        <th>Volume</th>
      </tr>
    `;
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Add rows for each stock
    Object.values(quotes).forEach(quote => {
      // Apply filter if not "all"
      if (filterValue !== 'all') {
        const stockSector = this._getStockSector(quote.symbol);
        if (stockSector !== filterValue) {
          return;
        }
      }
      
      const row = document.createElement('tr');
      row.setAttribute('data-symbol', quote.symbol);
      
      const changeClass = quote.changePct >= 0 ? 'positive-change' : 'negative-change';
      const changeSign = quote.changePct >= 0 ? '+' : '';
      
      row.innerHTML = `
        <td class="stock-symbol" title="${quote.name}">${quote.symbol}</td>
        <td class="stock-price">$${quote.price.toFixed(2)}</td>
        <td class="stock-change ${changeClass}">${changeSign}${quote.changePct.toFixed(2)}%</td>
        <td class="stock-volume">${this._formatNumber(quote.volume)}</td>
      `;
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    contentElement.appendChild(table);
  }
  
  /**
   * Update single stock quote
   * @param {string} symbol - Stock symbol
   * @param {Object} data - Stock quote data
   */
  _updateStockQuote(symbol, data) {
    const row = document.querySelector(`#stock-quotes-content tr[data-symbol="${symbol}"]`);
    if (!row) return;
    
    const priceCell = row.querySelector('.stock-price');
    const changeCell = row.querySelector('.stock-change');
    const volumeCell = row.querySelector('.stock-volume');
    
    if (priceCell) {
      priceCell.textContent = `$${data.price.toFixed(2)}`;
    }
    
    if (changeCell) {
      const changeClass = data.changePct >= 0 ? 'positive-change' : 'negative-change';
      const changeSign = data.changePct >= 0 ? '+' : '';
      
      changeCell.className = `stock-change ${changeClass}`;
      changeCell.textContent = `${changeSign}${data.changePct.toFixed(2)}%`;
      
      // Add flash effect
      changeCell.classList.add('flash');
      setTimeout(() => {
        changeCell.classList.remove('flash');
      }, 1000);
    }
    
    if (volumeCell) {
      volumeCell.textContent = this._formatNumber(data.volume);
    }
  }
  
  /**
   * Render tariff news
   * @param {Array} news - Tariff news data
   */
  _renderTariffNews(news) {
    const contentElement = document.getElementById('tariff-news-content');
    if (!contentElement) return;
    
    // Clear content
    contentElement.innerHTML = '';
    
    // Check if we have data
    if (!news || news.length === 0) {
      contentElement.innerHTML = '<div class="no-data">No tariff news available</div>';
      return;
    }
    
    // Create news list
    const newsList = document.createElement('ul');
    newsList.className = 'news-list';
    
    // Add news items
    news.forEach(item => {
      const newsItem = document.createElement('li');
      newsItem.className = 'news-item';
      newsItem.setAttribute('data-id', item.id);
      
      const sentimentClass = `sentiment-${item.sentiment}`;
      const timestamp = new Date(item.timestamp).toLocaleString();
      
      newsItem.innerHTML = `
        <div class="news-header">
          <span class="news-source">${item.source}</span>
          <span class="news-timestamp">${timestamp}</span>
        </div>
        <div class="news-headline ${sentimentClass}">${item.headline}</div>
        <div class="news-summary">${item.summary}</div>
      `;
      
      newsList.appendChild(newsItem);
    });
    
    contentElement.appendChild(newsList);
  }
  
  /**
   * Add new tariff news item
   * @param {Object} item - News item data
   */
  _addTariffNewsItem(item) {
    const newsList = document.querySelector('#tariff-news-content .news-list');
    if (!newsList) return;
    
    // Check if item already exists
    if (document.querySelector(`#tariff-news-content .news-item[data-id="${item.id}"]`)) {
      return;
    }
    
    // Create news item
    const newsItem = document.createElement('li');
    newsItem.className = 'news-item new-item';
    newsItem.setAttribute('data-id', item.id);
    
    const sentimentClass = `sentiment-${item.sentiment}`;
    const timestamp = new Date(item.timestamp).toLocaleString();
    
    newsItem.innerHTML = `
      <div class="news-header">
        <span class="news-source">${item.source}</span>
        <span class="news-timestamp">${timestamp}</span>
      </div>
      <div class="news-headline ${sentimentClass}">${item.headline}</div>
      <div class="news-summary">${item.summary}</div>
    `;
    
    // Add to top of list
    newsList.insertBefore(newsItem, newsList.firstChild);
    
    // Remove highlight after a delay
    setTimeout(() => {
      newsItem.classList.remove('new-item');
    }, 5000);
  }
  
  /**
   * Filter stock quotes by sector
   * @param {string} sector - Sector to filter by
   */
  _filterStockQuotes(sector) {
    const stockQuotes = realTimeDataService.getData('stockQuotes');
    if (!stockQuotes) return;
    
    this._renderStockQuotes(stockQuotes);
  }
  
  /**
   * Refresh all data
   */
  _refreshAllData() {
    this._refreshSectionData('marketIndices');
    this._refreshSectionData('forexRates');
    this._refreshSectionData('stockQuotes');
    this._refreshSectionData('tariffNews');
  }
  
  /**
   * Refresh section data
   * @param {string} section - Section to refresh
   */
  _refreshSectionData(section) {
    // Show loading indicator
    const contentElement = document.getElementById(`${this._kebabCase(section)}-content`);
    if (contentElement) {
      contentElement.innerHTML = '<div class="loading-indicator">Loading data...</div>';
    }
    
    // Fetch fresh data
    switch (section) {
      case 'marketIndices':
        realTimeDataService._fetchMarketIndices()
          .then(data => {
            realTimeDataService.dataCache.marketIndices = data;
            realTimeDataService.cacheTimestamps.marketIndices = Date.now();
            this._handleMarketIndicesUpdate({ type: 'refresh', data });
          })
          .catch(error => console.error('Error refreshing market indices:', error));
        break;
      case 'forexRates':
        realTimeDataService._fetchForexRates()
          .then(data => {
            realTimeDataService.dataCache.forexRates = data;
            realTimeDataService.cacheTimestamps.forexRates = Date.now();
            this._handleForexRatesUpdate({ type: 'refresh', data });
          })
          .catch(error => console.error('Error refreshing forex rates:', error));
        break;
      case 'stockQuotes':
        realTimeDataService._fetchStockQuotes()
          .then(data => {
            realTimeDataService.dataCache.stockQuotes = data;
            realTimeDataService.cacheTimestamps.stockQuotes = Date.now();
            this._handleStockQuotesUpdate({ type: 'refresh', data });
          })
          .catch(error => console.error('Error refreshing stock quotes:', error));
        break;
      case 'tariffNews':
        realTimeDataService._fetchTariffNews()
          .then(data => {
            realTimeDataService.dataCache.tariffNews = data;
            realTimeDataService.cacheTimestamps.tariffNews = Date.now();
            this._handleTariffNewsUpdate({ type: 'refresh', data });
          })
          .catch(error => console.error('Error refreshing tariff news:', error));
        break;
    }
  }
  
  /**
   * Update last updated time
   */
  _updateLastUpdatedTime() {
    const lastUpdatedElement = document.getElementById('last-updated-time');
    if (lastUpdatedElement) {
      lastUpdatedElement.textContent = new Date().toLocaleTimeString();
    }
  }
  
  /**
   * Format number with commas
   * @param {number} num - Number to format
   * @returns {string} Formatted number
   */
  _formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  /**
   * Get stock sector from symbol
   * @param {string} symbol - Stock symbol
   * @returns {string} Stock sector
   */
  _getStockSector(symbol) {
    const sectorMap = {
      'BHP.AX': 'Materials',
      'RIO.AX': 'Materials',
      'FMG.AX': 'Materials',
      'MIN.AX': 'Materials',
      'S32.AX': 'Materials',
      'TWE.AX': 'Consumer Staples',
      'A2M.AX': 'Consumer Staples',
      'WES.AX': 'Consumer Staples',
      'WOW.AX': 'Consumer Staples',
      'COL.AX': 'Consumer Staples',
      'CSL.AX': 'Healthcare',
      'RMD.AX': 'Healthcare',
      'COH.AX': 'Healthcare',
      'CBA.AX': 'Financials',
      'NAB.AX': 'Financials',
      'WBC.AX': 'Financials',
      'ANZ.AX': 'Financials',
      'MQG.AX': 'Financials',
      'WTC.AX': 'Information Technology',
      'XRO.AX': 'Information Technology',
      'APX.AX': 'Information Technology',
      'ALU.AX': 'Information Technology',
      'TCL.AX': 'Industrials',
      'SYD.AX': 'Industrials',
      'QAN.AX': 'Industrials',
      'AGL.AX': 'Utilities',
      'ORG.AX': 'Utilities',
      'WPL.AX': 'Energy',
      'STO.AX': 'Energy'
    };
    
    return sectorMap[symbol] || 'Other';
  }
  
  /**
   * Convert camelCase to kebab-case
   * @param {string} str - String to convert
   * @returns {string} Kebab case string
   */
  _kebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
}

export default RealTimeDataDashboard;
