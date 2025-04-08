/**
 * Sector Coverage Components for Trump Tariff Analysis Website
 * 
 * This module provides React components for displaying and filtering
 * expanded sector coverage with varied risk profiles.
 */

import SectorCoverageData from '../data/SectorCoverageData.js';

class SectorCoverageComponents {
  constructor() {
    this.sectorData = new SectorCoverageData();
  }
  
  /**
   * Render sector overview dashboard
   * @param {string} containerId - ID of the container element
   */
  renderSectorOverviewDashboard(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'sector-controls';
    
    // Create sector filter
    const sectorFilter = document.createElement('select');
    sectorFilter.className = 'sector-filter';
    sectorFilter.innerHTML = `<option value="all">All Sectors</option>`;
    
    // Add sector options
    this.sectorData.getAllSectors().forEach(sector => {
      sectorFilter.innerHTML += `<option value="${sector}">${sector}</option>`;
    });
    
    // Create risk profile filter
    const riskFilter = document.createElement('select');
    riskFilter.className = 'risk-filter';
    riskFilter.innerHTML = `<option value="all">All Risk Profiles</option>`;
    
    // Add risk profile options
    this.sectorData.getAllRiskProfiles().forEach(risk => {
      riskFilter.innerHTML += `<option value="${risk}">${risk}</option>`;
    });
    
    // Create market cap filter
    const marketCapFilter = document.createElement('select');
    marketCapFilter.className = 'market-cap-filter';
    marketCapFilter.innerHTML = `<option value="all">All Market Caps</option>`;
    
    // Add market cap options
    this.sectorData.getAllMarketCapCategories().forEach(marketCap => {
      marketCapFilter.innerHTML += `<option value="${marketCap}">${marketCap}</option>`;
    });
    
    // Create tariff sensitivity slider
    const tariffSensitivityFilter = document.createElement('div');
    tariffSensitivityFilter.className = 'tariff-sensitivity-filter';
    tariffSensitivityFilter.innerHTML = `
      <label>Min Tariff Sensitivity: <span class="tariff-sensitivity-value">3</span></label>
      <input type="range" min="1" max="10" step="1" value="3" class="tariff-sensitivity-slider">
    `;
    
    // Create movement potential slider
    const movementPotentialFilter = document.createElement('div');
    movementPotentialFilter.className = 'movement-potential-filter';
    movementPotentialFilter.innerHTML = `
      <label>Min Movement Potential: <span class="movement-potential-value">3</span></label>
      <input type="range" min="1" max="10" step="1" value="3" class="movement-potential-slider">
    `;
    
    // Create options availability filter
    const optionsFilter = document.createElement('div');
    optionsFilter.className = 'options-filter';
    optionsFilter.innerHTML = `
      <label>
        <input type="checkbox" class="options-checkbox" checked>
        Options Available
      </label>
    `;
    
    // Add event listeners
    sectorFilter.addEventListener('change', () => {
      this._updateSectorOverview(containerId, {
        sector: sectorFilter.value === 'all' ? null : sectorFilter.value,
        riskProfile: riskFilter.value === 'all' ? null : riskFilter.value,
        marketCap: marketCapFilter.value === 'all' ? null : marketCapFilter.value,
        minTariffSensitivity: parseInt(tariffSensitivityFilter.querySelector('.tariff-sensitivity-slider').value),
        minMovementPotential: parseInt(movementPotentialFilter.querySelector('.movement-potential-slider').value),
        optionsAvailable: optionsFilter.querySelector('.options-checkbox').checked
      });
    });
    
    riskFilter.addEventListener('change', () => {
      this._updateSectorOverview(containerId, {
        sector: sectorFilter.value === 'all' ? null : sectorFilter.value,
        riskProfile: riskFilter.value === 'all' ? null : riskFilter.value,
        marketCap: marketCapFilter.value === 'all' ? null : marketCapFilter.value,
        minTariffSensitivity: parseInt(tariffSensitivityFilter.querySelector('.tariff-sensitivity-slider').value),
        minMovementPotential: parseInt(movementPotentialFilter.querySelector('.movement-potential-slider').value),
        optionsAvailable: optionsFilter.querySelector('.options-checkbox').checked
      });
    });
    
    marketCapFilter.addEventListener('change', () => {
      this._updateSectorOverview(containerId, {
        sector: sectorFilter.value === 'all' ? null : sectorFilter.value,
        riskProfile: riskFilter.value === 'all' ? null : riskFilter.value,
        marketCap: marketCapFilter.value === 'all' ? null : marketCapFilter.value,
        minTariffSensitivity: parseInt(tariffSensitivityFilter.querySelector('.tariff-sensitivity-slider').value),
        minMovementPotential: parseInt(movementPotentialFilter.querySelector('.movement-potential-slider').value),
        optionsAvailable: optionsFilter.querySelector('.options-checkbox').checked
      });
    });
    
    tariffSensitivityFilter.querySelector('.tariff-sensitivity-slider').addEventListener('input', (e) => {
      tariffSensitivityFilter.querySelector('.tariff-sensitivity-value').textContent = e.target.value;
      this._updateSectorOverview(containerId, {
        sector: sectorFilter.value === 'all' ? null : sectorFilter.value,
        riskProfile: riskFilter.value === 'all' ? null : riskFilter.value,
        marketCap: marketCapFilter.value === 'all' ? null : marketCapFilter.value,
        minTariffSensitivity: parseInt(e.target.value),
        minMovementPotential: parseInt(movementPotentialFilter.querySelector('.movement-potential-slider').value),
        optionsAvailable: optionsFilter.querySelector('.options-checkbox').checked
      });
    });
    
    movementPotentialFilter.querySelector('.movement-potential-slider').addEventListener('input', (e) => {
      movementPotentialFilter.querySelector('.movement-potential-value').textContent = e.target.value;
      this._updateSectorOverview(containerId, {
        sector: sectorFilter.value === 'all' ? null : sectorFilter.value,
        riskProfile: riskFilter.value === 'all' ? null : riskFilter.value,
        marketCap: marketCapFilter.value === 'all' ? null : marketCapFilter.value,
        minTariffSensitivity: parseInt(tariffSensitivityFilter.querySelector('.tariff-sensitivity-slider').value),
        minMovementPotential: parseInt(e.target.value),
        optionsAvailable: optionsFilter.querySelector('.options-checkbox').checked
      });
    });
    
    optionsFilter.querySelector('.options-checkbox').addEventListener('change', (e) => {
      this._updateSectorOverview(containerId, {
        sector: sectorFilter.value === 'all' ? null : sectorFilter.value,
        riskProfile: riskFilter.value === 'all' ? null : riskFilter.value,
        marketCap: marketCapFilter.value === 'all' ? null : marketCapFilter.value,
        minTariffSensitivity: parseInt(tariffSensitivityFilter.querySelector('.tariff-sensitivity-slider').value),
        minMovementPotential: parseInt(movementPotentialFilter.querySelector('.movement-potential-slider').value),
        optionsAvailable: e.target.checked
      });
    });
    
    // Add controls to container
    controlsContainer.appendChild(document.createTextNode('Sector: '));
    controlsContainer.appendChild(sectorFilter);
    controlsContainer.appendChild(document.createTextNode(' Risk Profile: '));
    controlsContainer.appendChild(riskFilter);
    controlsContainer.appendChild(document.createTextNode(' Market Cap: '));
    controlsContainer.appendChild(marketCapFilter);
    controlsContainer.appendChild(tariffSensitivityFilter);
    controlsContainer.appendChild(movementPotentialFilter);
    controlsContainer.appendChild(optionsFilter);
    
    // Create sector overview container
    const overviewContainer = document.createElement('div');
    overviewContainer.className = 'sector-overview-container';
    overviewContainer.id = `${containerId}-overview`;
    
    // Create stock list container
    const stockListContainer = document.createElement('div');
    stockListContainer.className = 'stock-list-container';
    stockListContainer.id = `${containerId}-stock-list`;
    
    // Clear container and add new elements
    container.innerHTML = '';
    container.appendChild(controlsContainer);
    container.appendChild(overviewContainer);
    container.appendChild(stockListContainer);
    
    // Render initial sector overview
    this._updateSectorOverview(containerId, {
      sector: null,
      riskProfile: null,
      marketCap: null,
      minTariffSensitivity: 3,
      minMovementPotential: 3,
      optionsAvailable: true
    });
  }
  
  /**
   * Update sector overview
   * @param {string} containerId - ID of the container element
   * @param {Object} filters - Filter criteria
   * @private
   */
  _updateSectorOverview(containerId, filters) {
    const overviewContainer = document.getElementById(`${containerId}-overview`);
    const stockListContainer = document.getElementById(`${containerId}-stock-list`);
    
    if (!overviewContainer || !stockListContainer) return;
    
    // Get filtered stocks
    const filteredStocks = this.sectorData.getStocksByMultipleCriteria({
      sector: filters.sector,
      riskProfile: filters.riskProfile,
      marketCap: filters.marketCap,
      minTariffSensitivity: filters.minTariffSensitivity,
      minMovementPotential: filters.minMovementPotential,
      optionsAvailable: filters.optionsAvailable
    });
    
    // Render sector overview
    this._renderSectorOverview(overviewContainer, filteredStocks);
    
    // Render stock list
    this._renderStockList(stockListContainer, filteredStocks);
  }
  
  /**
   * Render sector overview
   * @param {HTMLElement} container - Container element
   * @param {Array} stocks - Filtered stocks
   * @private
   */
  _renderSectorOverview(container, stocks) {
    // Clear container
    container.innerHTML = '';
    
    // Create overview header
    const header = document.createElement('div');
    header.className = 'overview-header';
    header.innerHTML = `
      <h2>Sector Overview</h2>
      <div class="overview-stats">
        <div class="stat">
          <span class="stat-value">${stocks.length}</span>
          <span class="stat-label">Stocks</span>
        </div>
        <div class="stat">
          <span class="stat-value">${this._countUniqueSectors(stocks)}</span>
          <span class="stat-label">Sectors</span>
        </div>
        <div class="stat">
          <span class="stat-value">${this._countUniqueRiskProfiles(stocks)}</span>
          <span class="stat-label">Risk Profiles</span>
        </div>
        <div class="stat">
          <span class="stat-value">${this._countUniqueMarketCaps(stocks)}</span>
          <span class="stat-label">Market Caps</span>
        </div>
      </div>
    `;
    
    container.appendChild(header);
    
    // Create sector distribution chart
    const sectorDistributionContainer = document.createElement('div');
    sectorDistributionContainer.className = 'chart-container';
    sectorDistributionContainer.innerHTML = `
      <h3>Sector Distribution</h3>
      <div class="sector-distribution-chart" id="sector-distribution-chart"></div>
    `;
    
    // Create risk profile distribution chart
    const riskDistributionContainer = document.createElement('div');
    riskDistributionContainer.className = 'chart-container';
    riskDistributionContainer.innerHTML = `
      <h3>Risk Profile Distribution</h3>
      <div class="risk-distribution-chart" id="risk-distribution-chart"></div>
    `;
    
    // Create market cap distribution chart
    const marketCapDistributionContainer = document.createElement('div');
    marketCapDistributionContainer.className = 'chart-container';
    marketCapDistributionContainer.innerHTML = `
      <h3>Market Cap Distribution</h3>
      <div class="market-cap-distribution-chart" id="market-cap-distribution-chart"></div>
    `;
    
    // Create tariff sensitivity distribution chart
    const tariffSensitivityContainer = document.createElement('div');
    tariffSensitivityContainer.className = 'chart-container';
    tariffSensitivityContainer.innerHTML = `
      <h3>Tariff Sensitivity Distribution</h3>
      <div class="tariff-sensitivity-chart" id="tariff-sensitivity-chart"></div>
    `;
    
    // Add charts to container
    const chartsContainer = document.createElement('div');
    chartsContainer.className = 'charts-grid';
    chartsContainer.appendChild(sectorDistributionContainer);
    chartsContainer.appendChild(riskDistributionContainer);
    chartsContainer.appendChild(marketCapDistributionContainer);
    chartsContainer.appendChild(tariffSensitivityContainer);
    
    container.appendChild(chartsContainer);
    
    // In a real implementation, we would render the charts using a charting library
    // For demonstration, we'll just show placeholders
    document.getElementById('sector-distribution-chart').innerHTML = 'Sector Distribution Chart';
    document.getElementById('risk-distribution-chart').innerHTML = 'Risk Profile Distribution Chart';
    document.getElementById('market-cap-distribution-chart').innerHTML = 'Market Cap Distribution Chart';
    document.getElementById('tariff-sensitivity-chart').innerHTML = 'Tariff Sensitivity Distribution Chart';
  }
  
  /**
   * Render stock list
   * @param {HTMLElement} container - Container element
   * @param {Array} stocks - Filtered stocks
   * @private
   */
  _renderStockList(container, stocks) {
    // Clear container
    container.innerHTML = '';
    
    // Create stock list header
    const header = document.createElement('div');
    header.className = 'stock-list-header';
    header.innerHTML = `
      <h2>Stock List (${stocks.length} stocks)</h2>
      <div class="stock-list-controls">
        <select class="sort-by-selector">
          <option value="symbol">Symbol</option>
          <option value="tariffSensitivityScore" selected>Tariff Sensitivity</option>
          <option value="movementPotentialScore">Movement Potential</option>
          <option value="probability15PctMove">Probability of 15% Move</option>
          <option value="beta">Beta</option>
          <option value="volatility">Volatility</option>
        </select>
        <button class="export-button">Export to CSV</button>
      </div>
    `;
    
    container.appendChild(header);
    
    // Create stock table
    const table = document.createElement('table');
    table.className = 'stock-table';
    
    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Symbol</th>
        <th>Name</th>
        <th>Sector</th>
        <th>Risk Profile</th>
        <th>Market Cap</th>
        <th>Tariff Sensitivity</th>
        <th>Movement Potential</th>
        <th>Probability of 15% Move</th>
        <th>Beta</th>
        <th>Volatility</th>
        <th>Options</th>
      </tr>
    `;
    
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Sort stocks by tariff sensitivity score
    stocks.sort((a, b) => b.tariffSensitivityScore - a.tariffSensitivityScore);
    
    // Add rows for each stock
    stocks.forEach(stock => {
      const row = document.createElement('tr');
      row.setAttribute('data-symbol', stock.symbol);
      
      row.innerHTML = `
        <td class="stock-symbol"><a href="#" class="stock-link">${stock.symbol}</a></td>
        <td class="stock-name">${stock.name}</td>
        <td class="stock-sector">${stock.sector}</td>
        <td class="stock-risk-profile">${stock.riskProfile}</td>
        <td class="stock-market-cap">${stock.marketCap}</td>
        <td class="stock-tariff-sensitivity">${stock.tariffSensitivityScore.toFixed(1)}</td>
        <td class="stock-movement-potential">${stock.movementPotentialScore.toFixed(1)}</td>
        <td class="stock-probability">${(stock.probability15PctMove * 100).toFixed(1)}%</td>
        <td class="stock-beta">${stock.beta.toFixed(2)}</td>
        <td class="stock-volatility">${stock.volatility.toFixed(1)}%</td>
        <td class="stock-options">${stock.optionsAvailability ? 'Yes' : 'No'}</td>
      `;
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    container.appendChild(table);
    
    // Add event listeners
    const sortBySelector = container.querySelector('.sort-by-selector');
    sortBySelector.addEventListener('change', () => {
      this._sortStockTable(table, sortBySelector.value);
    });
    
    const exportButton = container.querySelector('.export-button');
    exportButton.addEventListener('click', () => {
      this._exportStocksToCSV(stocks);
    });
    
    const stockLinks = container.querySelectorAll('.stock-link');
    stockLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const symbol = e.target.textContent;
        this._showStockDetails(symbol);
      });
    });
  }
  
  /**
   * Sort stock table
   * @param {HTMLElement} table - Table element
   * @param {string} sortBy - Sort by field
   * @private
   */
  _sortStockTable(table, sortBy) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Sort rows
    rows.sort((a, b) => {
      const aSymbol = a.getAttribute('data-symbol');
      const bSymbol = b.getAttribute('data-symbol');
      
      const aStock = this.sectorData.getStockData(aSymbol);
      const bStock = this.sectorData.getStockData(bSymbol);
      
      if (!aStock || !bStock) return 0;
      
      if (sortBy === 'symbol') {
        return aStock.symbol.localeCompare(bStock.symbol);
      } else {
        return bStock[sortBy] - aStock[sortBy];
      }
    });
    
    // Clear tbody
    tbody.innerHTML = '';
    
    // Add sorted rows
    rows.forEach(row => {
      tbody.appendChild(row);
    });
  }
  
  /**
   * Export stocks to CSV
   * @param {Array} stocks - Stocks to export
   * @private
   */
  _exportStocksToCSV(stocks) {
    // Create CSV content
    const headers = [
      'Symbol',
      'Name',
      'Sector',
      'Risk Profile',
      'Market Cap',
      'Tariff Sensitivity',
      'Movement Potential',
      'Probability of 15% Move',
      'Beta',
      'Volatility',
      'Options Available'
    ];
    
    const rows = stocks.map(stock => [
      stock.symbol,
      stock.name,
      stock.sector,
      stock.riskProfile,
      stock.marketCap,
      stock.tariffSensitivityScore.toFixed(1),
      stock.movementPotentialScore.toFixed(1),
      (stock.probability15PctMove * 100).toFixed(1) + '%',
      stock.beta.toFixed(2),
      stock.volatility.toFixed(1) + '%',
      stock.optionsAvailability ? 'Yes' : 'No'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'trump_tariff_stocks.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  /**
   * Show stock details
   * @param {string} symbol - Stock symbol
   * @private
   */
  _showStockDetails(symbol) {
    const stock = this.sectorData.getStockData(symbol);
    if (!stock) return;
    
    // In a real implementation, this would open a modal or navigate to a stock details page
    console.log('Show details for', symbol, stock);
    
    // For demonstration, we'll create a simple modal
    const modal = document.createElement('div');
    modal.className = 'stock-details-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>${stock.symbol} - ${stock.name}</h2>
          <button class="close-button">&times;</button>
        </div>
        <div class="modal-body">
          <div class="stock-details">
            <div class="detail-section">
              <h3>Overview</h3>
              <p><strong>Sector:</strong> ${stock.sector}</p>
              <p><strong>Risk Profile:</strong> ${stock.riskProfile}</p>
              <p><strong>Market Cap:</strong> ${stock.marketCap}</p>
              <p><strong>Description:</strong> ${stock.description}</p>
            </div>
            
            <div class="detail-section">
              <h3>Tariff Impact</h3>
              <p><strong>Tariff Sensitivity:</strong> ${stock.tariffSensitivityScore.toFixed(1)}/10</p>
              <p><strong>US Exposure:</strong> ${stock.usExposure.toFixed(1)}/10</p>
              <p><strong>China Exposure:</strong> ${stock.chinaExposure.toFixed(1)}/10</p>
              <p><strong>Supply Chain Exposure:</strong> ${stock.supplyChainExposure.toFixed(1)}/10</p>
              <p><strong>FX Amplification:</strong> ${stock.fxAmplification.toFixed(2)}x</p>
            </div>
            
            <div class="detail-section">
              <h3>Performance</h3>
              <p><strong>1 Week:</strong> ${(stock.performance['1w'] * 100).toFixed(2)}%</p>
              <p><strong>1 Month:</strong> ${(stock.performance['1m'] * 100).toFixed(2)}%</p>
              <p><strong>3 Months:</strong> ${(stock.performance['3m'] * 100).toFixed(2)}%</p>
              <p><strong>6 Months:</strong> ${(stock.performance['6m'] * 100).toFixed(2)}%</p>
              <p><strong>1 Year:</strong> ${(stock.performance['1y'] * 100).toFixed(2)}%</p>
            </div>
            
            <div class="detail-section">
              <h3>Risk Metrics</h3>
              <p><strong>Volatility:</strong> ${stock.volatility.toFixed(1)}%</p>
              <p><strong>Beta:</strong> ${stock.beta.toFixed(2)}</p>
              <p><strong>Movement Potential:</strong> ${stock.movementPotentialScore.toFixed(1)}/10</p>
              <p><strong>Probability of 15% Move:</strong> ${(stock.probability15PctMove * 100).toFixed(1)}%</p>
              <p><strong>Momentum Score:</strong> ${stock.momentumScore.toFixed(1)}</p>
              <p><strong>Trading Volume Ratio:</strong> ${stock.tradingVolumeRatio.toFixed(2)}</p>
            </div>
            
            <div class="detail-section">
              <h3>Options</h3>
              <p><strong>Options Available:</strong> ${stock.optionsAvailability ? 'Yes' : 'No'}</p>
            </div>
            
            <div class="detail-section">
              <h3>Entry/Exit Levels</h3>
              <p><strong>Strong Buy:</strong> $${(stock.price * stock.entryExitLevels.strongBuy).toFixed(2)}</p>
              <p><strong>Buy:</strong> $${(stock.price * stock.entryExitLevels.buy).toFixed(2)}</p>
              <p><strong>Current Price:</strong> $${stock.price.toFixed(2)}</p>
              <p><strong>Sell:</strong> $${(stock.price * stock.entryExitLevels.sell).toFixed(2)}</p>
              <p><strong>Strong Sell:</strong> $${(stock.price * stock.entryExitLevels.strongSell).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listener to close button
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }
  
  /**
   * Count unique sectors
   * @param {Array} stocks - Stocks
   * @returns {number} Number of unique sectors
   * @private
   */
  _countUniqueSectors(stocks) {
    const sectors = new Set();
    stocks.forEach(stock => sectors.add(stock.sector));
    return sectors.size;
  }
  
  /**
   * Count unique risk profiles
   * @param {Array} stocks - Stocks
   * @returns {number} Number of unique risk profiles
   * @private
   */
  _countUniqueRiskProfiles(stocks) {
    const riskProfiles = new Set();
    stocks.forEach(stock => riskProfiles.add(stock.riskProfile));
    return riskProfiles.size;
  }
  
  /**
   * Count unique market caps
   * @param {Array} stocks - Stocks
   * @returns {number} Number of unique market caps
   * @private
   */
  _countUniqueMarketCaps(stocks) {
    const marketCaps = new Set();
    stocks.forEach(stock => marketCaps.add(stock.marketCap));
    return marketCaps.size;
  }
  
  /**
   * Render top trading opportunities
   * @param {string} containerId - ID of the container element
   * @param {Object} options - Options
   */
  renderTopTradingOpportunities(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'opportunities-controls';
    
    // Create limit selector
    const limitSelector = document.createElement('select');
    limitSelector.className = 'limit-selector';
    limitSelector.innerHTML = `
      <option value="5">Top 5</option>
      <option value="10" selected>Top 10</option>
      <option value="20">Top 20</option>
      <option value="50">Top 50</option>
    `;
    
    // Create sector filter
    const sectorFilter = document.createElement('select');
    sectorFilter.className = 'sector-filter';
    sectorFilter.innerHTML = `<option value="all">All Sectors</option>`;
    
    // Add sector options
    this.sectorData.getAllSectors().forEach(sector => {
      sectorFilter.innerHTML += `<option value="${sector}">${sector}</option>`;
    });
    
    // Create risk profile filter
    const riskFilter = document.createElement('select');
    riskFilter.className = 'risk-filter';
    riskFilter.innerHTML = `<option value="all">All Risk Profiles</option>`;
    
    // Add risk profile options
    this.sectorData.getAllRiskProfiles().forEach(risk => {
      riskFilter.innerHTML += `<option value="${risk}">${risk}</option>`;
    });
    
    // Add event listeners
    limitSelector.addEventListener('change', () => {
      this._updateTopOpportunities(containerId, {
        limit: parseInt(limitSelector.value),
        sector: sectorFilter.value === 'all' ? null : sectorFilter.value,
        riskProfile: riskFilter.value === 'all' ? null : riskFilter.value
      });
    });
    
    sectorFilter.addEventListener('change', () => {
      this._updateTopOpportunities(containerId, {
        limit: parseInt(limitSelector.value),
        sector: sectorFilter.value === 'all' ? null : sectorFilter.value,
        riskProfile: riskFilter.value === 'all' ? null : riskFilter.value
      });
    });
    
    riskFilter.addEventListener('change', () => {
      this._updateTopOpportunities(containerId, {
        limit: parseInt(limitSelector.value),
        sector: sectorFilter.value === 'all' ? null : sectorFilter.value,
        riskProfile: riskFilter.value === 'all' ? null : riskFilter.value
      });
    });
    
    // Add controls to container
    controlsContainer.appendChild(document.createTextNode('Show: '));
    controlsContainer.appendChild(limitSelector);
    controlsContainer.appendChild(document.createTextNode(' Sector: '));
    controlsContainer.appendChild(sectorFilter);
    controlsContainer.appendChild(document.createTextNode(' Risk Profile: '));
    controlsContainer.appendChild(riskFilter);
    
    // Create opportunities container
    const opportunitiesContainer = document.createElement('div');
    opportunitiesContainer.className = 'opportunities-container';
    opportunitiesContainer.id = `${containerId}-opportunities`;
    
    // Clear container and add new elements
    container.innerHTML = '';
    container.appendChild(controlsContainer);
    container.appendChild(opportunitiesContainer);
    
    // Render initial opportunities
    this._updateTopOpportunities(containerId, {
      limit: parseInt(limitSelector.value),
      sector: sectorFilter.value === 'all' ? null : sectorFilter.value,
      riskProfile: riskFilter.value === 'all' ? null : riskFilter.value
    });
  }
  
  /**
   * Update top opportunities
   * @param {string} containerId - ID of the container element
   * @param {Object} options - Options
   * @private
   */
  _updateTopOpportunities(containerId, options) {
    const opportunitiesContainer = document.getElementById(`${containerId}-opportunities`);
    if (!opportunitiesContainer) return;
    
    // Get top opportunities
    const opportunities = this.sectorData.getTopTradingOpportunities(options.limit, {
      sector: options.sector,
      riskProfile: options.riskProfile
    });
    
    // Clear container
    opportunitiesContainer.innerHTML = '';
    
    // Create opportunities header
    const header = document.createElement('div');
    header.className = 'opportunities-header';
    header.innerHTML = `
      <h2>Top Trading Opportunities</h2>
      <p>Based on tariff sensitivity, movement potential, and other factors</p>
    `;
    
    opportunitiesContainer.appendChild(header);
    
    // Create opportunities grid
    const grid = document.createElement('div');
    grid.className = 'opportunities-grid';
    
    // Add cards for each opportunity
    opportunities.forEach((stock, index) => {
      const card = document.createElement('div');
      card.className = 'opportunity-card';
      card.setAttribute('data-symbol', stock.symbol);
      
      const rankClass = index < 3 ? `rank-${index + 1}` : '';
      
      card.innerHTML = `
        <div class="opportunity-rank ${rankClass}">${index + 1}</div>
        <div class="opportunity-header">
          <div class="opportunity-symbol">${stock.symbol}</div>
          <div class="opportunity-name">${stock.name}</div>
        </div>
        <div class="opportunity-sector">${stock.sector}</div>
        <div class="opportunity-risk">${stock.riskProfile}</div>
        <div class="opportunity-metrics">
          <div class="metric">
            <div class="metric-label">Tariff Sensitivity</div>
            <div class="metric-value">${stock.tariffSensitivityScore.toFixed(1)}/10</div>
            <div class="metric-bar">
              <div class="metric-bar-fill" style="width: ${stock.tariffSensitivityScore * 10}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-label">Movement Potential</div>
            <div class="metric-value">${stock.movementPotentialScore.toFixed(1)}/10</div>
            <div class="metric-bar">
              <div class="metric-bar-fill" style="width: ${stock.movementPotentialScore * 10}%"></div>
            </div>
          </div>
          <div class="metric">
            <div class="metric-label">Probability of 15% Move</div>
            <div class="metric-value">${(stock.probability15PctMove * 100).toFixed(1)}%</div>
            <div class="metric-bar">
              <div class="metric-bar-fill" style="width: ${stock.probability15PctMove * 100}%"></div>
            </div>
          </div>
        </div>
        <div class="opportunity-score">
          <div class="score-label">Opportunity Score</div>
          <div class="score-value">${stock.opportunityScore.toFixed(1)}/10</div>
        </div>
        <button class="view-details-button">View Details</button>
      `;
      
      grid.appendChild(card);
    });
    
    opportunitiesContainer.appendChild(grid);
    
    // Add event listeners
    const viewDetailsButtons = opportunitiesContainer.querySelectorAll('.view-details-button');
    viewDetailsButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const card = e.target.closest('.opportunity-card');
        const symbol = card.getAttribute('data-symbol');
        this._showStockDetails(symbol);
      });
    });
  }
}

export default SectorCoverageComponents;
