/**
 * Scenario Analysis Tools for Trump Tariff Analysis Website
 * 
 * This module provides functionality for modeling different tariff scenarios
 * and their potential impacts on Australian stocks.
 */

class ScenarioAnalysisTools {
  constructor() {
    this.scenarios = [
      {
        id: 'baseline',
        name: 'Baseline (Current Tariffs)',
        description: 'Current tariff levels with no changes',
        tariffLevels: {
          china: 7.5,
          global: 2.5
        },
        probability: 0.15,
        marketImpact: {
          asx200: 0,
          usdaud: 0
        }
      },
      {
        id: 'moderate',
        name: 'Moderate Tariff Increase',
        description: 'Moderate increase in tariffs on Chinese goods',
        tariffLevels: {
          china: 15,
          global: 5
        },
        probability: 0.35,
        marketImpact: {
          asx200: -2.5,
          usdaud: 1.8
        }
      },
      {
        id: 'significant',
        name: 'Significant Tariff Increase',
        description: 'Significant increase in tariffs on Chinese goods and moderate global tariffs',
        tariffLevels: {
          china: 25,
          global: 10
        },
        probability: 0.30,
        marketImpact: {
          asx200: -5.2,
          usdaud: 3.5
        }
      },
      {
        id: 'severe',
        name: 'Severe Tariff Increase',
        description: 'Severe increase in tariffs on Chinese goods and significant global tariffs',
        tariffLevels: {
          china: 35,
          global: 15
        },
        probability: 0.15,
        marketImpact: {
          asx200: -8.7,
          usdaud: 5.2
        }
      },
      {
        id: 'trade-war',
        name: 'Full Trade War',
        description: 'Maximum tariffs on Chinese goods and high global tariffs',
        tariffLevels: {
          china: 50,
          global: 25
        },
        probability: 0.05,
        marketImpact: {
          asx200: -15.3,
          usdaud: 8.7
        }
      }
    ];
    
    this.sectorImpacts = {
      'Materials': {
        'baseline': 0,
        'moderate': -3.2,
        'significant': -6.8,
        'severe': -10.5,
        'trade-war': -18.2
      },
      'Financials': {
        'baseline': 0,
        'moderate': -2.1,
        'significant': -4.5,
        'severe': -7.8,
        'trade-war': -14.3
      },
      'Energy': {
        'baseline': 0,
        'moderate': -1.8,
        'significant': -4.2,
        'severe': -7.5,
        'trade-war': -12.8
      },
      'Healthcare': {
        'baseline': 0,
        'moderate': -0.8,
        'significant': -2.1,
        'severe': -3.5,
        'trade-war': -6.2
      },
      'Consumer Staples': {
        'baseline': 0,
        'moderate': -1.2,
        'significant': -2.8,
        'severe': -4.5,
        'trade-war': -8.3
      },
      'Consumer Discretionary': {
        'baseline': 0,
        'moderate': -3.5,
        'significant': -7.2,
        'severe': -11.5,
        'trade-war': -19.8
      },
      'Industrials': {
        'baseline': 0,
        'moderate': -2.8,
        'significant': -5.9,
        'severe': -9.2,
        'trade-war': -16.5
      },
      'Technology': {
        'baseline': 0,
        'moderate': -2.5,
        'significant': -5.2,
        'severe': -8.7,
        'trade-war': -15.3
      },
      'Utilities': {
        'baseline': 0,
        'moderate': -0.5,
        'significant': -1.2,
        'severe': -2.3,
        'trade-war': -4.5
      },
      'Real Estate': {
        'baseline': 0,
        'moderate': -1.5,
        'significant': -3.2,
        'severe': -5.8,
        'trade-war': -10.2
      },
      'Communication Services': {
        'baseline': 0,
        'moderate': -1.2,
        'significant': -2.5,
        'severe': -4.2,
        'trade-war': -7.8
      }
    };
    
    this.stockImpacts = {};
    this.customScenarios = [];
    
    // Initialize
    this._initialize();
  }
  
  /**
   * Initialize scenario analysis tools
   * @private
   */
  _initialize() {
    // Load stock data
    this._loadStockData();
    
    // Load custom scenarios if available
    this._loadCustomScenarios();
    
    // Register event listeners
    document.addEventListener('DOMContentLoaded', () => {
      this._setupUI();
    });
  }
  
  /**
   * Load stock data
   * @private
   */
  _loadStockData() {
    // In a real implementation, this would load from an API or database
    // This is a simplified version with sample data
    
    this.stockImpacts = {
      'BHP.AX': {
        name: 'BHP Group',
        sector: 'Materials',
        chinaExposure: 'High',
        usExposure: 'Medium',
        tariffSensitivity: 8.5,
        baseline: 0,
        moderate: -4.2,
        significant: -8.7,
        severe: -13.5,
        'trade-war': -22.8
      },
      'RIO.AX': {
        name: 'Rio Tinto',
        sector: 'Materials',
        chinaExposure: 'High',
        usExposure: 'Medium',
        tariffSensitivity: 8.2,
        baseline: 0,
        moderate: -4.0,
        significant: -8.3,
        severe: -12.8,
        'trade-war': -21.5
      },
      'FMG.AX': {
        name: 'Fortescue Metals',
        sector: 'Materials',
        chinaExposure: 'Very High',
        usExposure: 'Low',
        tariffSensitivity: 9.2,
        baseline: 0,
        moderate: -5.2,
        significant: -10.5,
        severe: -16.2,
        'trade-war': -27.5
      },
      'CBA.AX': {
        name: 'Commonwealth Bank',
        sector: 'Financials',
        chinaExposure: 'Medium',
        usExposure: 'Low',
        tariffSensitivity: 5.5,
        baseline: 0,
        moderate: -2.5,
        significant: -5.2,
        severe: -8.5,
        'trade-war': -15.2
      },
      'NAB.AX': {
        name: 'National Australia Bank',
        sector: 'Financials',
        chinaExposure: 'Medium',
        usExposure: 'Low',
        tariffSensitivity: 5.2,
        baseline: 0,
        moderate: -2.3,
        significant: -4.8,
        severe: -8.0,
        'trade-war': -14.5
      },
      'WBC.AX': {
        name: 'Westpac Banking',
        sector: 'Financials',
        chinaExposure: 'Medium',
        usExposure: 'Low',
        tariffSensitivity: 5.0,
        baseline: 0,
        moderate: -2.2,
        significant: -4.5,
        severe: -7.8,
        'trade-war': -14.0
      },
      'ANZ.AX': {
        name: 'ANZ Banking',
        sector: 'Financials',
        chinaExposure: 'Medium-High',
        usExposure: 'Low',
        tariffSensitivity: 5.8,
        baseline: 0,
        moderate: -2.8,
        significant: -5.5,
        severe: -9.2,
        'trade-war': -16.5
      },
      'WDS.AX': {
        name: 'Woodside Energy',
        sector: 'Energy',
        chinaExposure: 'Medium',
        usExposure: 'Low',
        tariffSensitivity: 4.8,
        baseline: 0,
        moderate: -2.0,
        significant: -4.2,
        severe: -7.5,
        'trade-war': -13.2
      },
      'STO.AX': {
        name: 'Santos',
        sector: 'Energy',
        chinaExposure: 'Medium',
        usExposure: 'Low',
        tariffSensitivity: 4.5,
        baseline: 0,
        moderate: -1.8,
        significant: -4.0,
        severe: -7.2,
        'trade-war': -12.8
      },
      'CSL.AX': {
        name: 'CSL Limited',
        sector: 'Healthcare',
        chinaExposure: 'Low',
        usExposure: 'High',
        tariffSensitivity: 3.2,
        baseline: 0,
        moderate: -1.2,
        significant: -2.5,
        severe: -4.2,
        'trade-war': -7.5
      },
      'RMD.AX': {
        name: 'ResMed',
        sector: 'Healthcare',
        chinaExposure: 'Low',
        usExposure: 'High',
        tariffSensitivity: 3.5,
        baseline: 0,
        moderate: -1.5,
        significant: -3.0,
        severe: -5.0,
        'trade-war': -8.8
      },
      'WOW.AX': {
        name: 'Woolworths Group',
        sector: 'Consumer Staples',
        chinaExposure: 'Low',
        usExposure: 'Low',
        tariffSensitivity: 2.5,
        baseline: 0,
        moderate: -0.8,
        significant: -1.8,
        severe: -3.2,
        'trade-war': -5.8
      },
      'COL.AX': {
        name: 'Coles Group',
        sector: 'Consumer Staples',
        chinaExposure: 'Low',
        usExposure: 'Low',
        tariffSensitivity: 2.2,
        baseline: 0,
        moderate: -0.7,
        significant: -1.5,
        severe: -2.8,
        'trade-war': -5.2
      },
      'JBH.AX': {
        name: 'JB Hi-Fi',
        sector: 'Consumer Discretionary',
        chinaExposure: 'High',
        usExposure: 'Medium',
        tariffSensitivity: 7.5,
        baseline: 0,
        moderate: -3.8,
        significant: -7.8,
        severe: -12.5,
        'trade-war': -21.2
      },
      'WES.AX': {
        name: 'Wesfarmers',
        sector: 'Consumer Discretionary',
        chinaExposure: 'Medium',
        usExposure: 'Low',
        tariffSensitivity: 5.2,
        baseline: 0,
        moderate: -2.5,
        significant: -5.2,
        severe: -8.5,
        'trade-war': -15.0
      },
      'TCL.AX': {
        name: 'Transurban Group',
        sector: 'Industrials',
        chinaExposure: 'Low',
        usExposure: 'Low',
        tariffSensitivity: 2.8,
        baseline: 0,
        moderate: -1.0,
        significant: -2.2,
        severe: -3.8,
        'trade-war': -6.8
      },
      'QAN.AX': {
        name: 'Qantas Airways',
        sector: 'Industrials',
        chinaExposure: 'Medium',
        usExposure: 'Medium',
        tariffSensitivity: 6.2,
        baseline: 0,
        moderate: -3.0,
        significant: -6.2,
        severe: -10.0,
        'trade-war': -17.5
      },
      'XRO.AX': {
        name: 'Xero',
        sector: 'Technology',
        chinaExposure: 'Low',
        usExposure: 'Medium',
        tariffSensitivity: 4.5,
        baseline: 0,
        moderate: -2.0,
        significant: -4.2,
        severe: -7.0,
        'trade-war': -12.5
      },
      'WTC.AX': {
        name: 'WiseTech Global',
        sector: 'Technology',
        chinaExposure: 'Medium',
        usExposure: 'Medium',
        tariffSensitivity: 5.8,
        baseline: 0,
        moderate: -2.8,
        significant: -5.8,
        severe: -9.5,
        'trade-war': -16.8
      },
      'AGL.AX': {
        name: 'AGL Energy',
        sector: 'Utilities',
        chinaExposure: 'Low',
        usExposure: 'Low',
        tariffSensitivity: 2.0,
        baseline: 0,
        moderate: -0.5,
        significant: -1.2,
        severe: -2.2,
        'trade-war': -4.0
      },
      'ORG.AX': {
        name: 'Origin Energy',
        sector: 'Utilities',
        chinaExposure: 'Low',
        usExposure: 'Low',
        tariffSensitivity: 2.2,
        baseline: 0,
        moderate: -0.6,
        significant: -1.5,
        severe: -2.5,
        'trade-war': -4.5
      },
      'GMG.AX': {
        name: 'Goodman Group',
        sector: 'Real Estate',
        chinaExposure: 'Medium',
        usExposure: 'Medium',
        tariffSensitivity: 4.8,
        baseline: 0,
        moderate: -2.2,
        significant: -4.5,
        severe: -7.5,
        'trade-war': -13.2
      },
      'SGP.AX': {
        name: 'Stockland',
        sector: 'Real Estate',
        chinaExposure: 'Low',
        usExposure: 'Low',
        tariffSensitivity: 3.2,
        baseline: 0,
        moderate: -1.2,
        significant: -2.8,
        severe: -4.8,
        'trade-war': -8.5
      },
      'TLS.AX': {
        name: 'Telstra',
        sector: 'Communication Services',
        chinaExposure: 'Low',
        usExposure: 'Low',
        tariffSensitivity: 2.5,
        baseline: 0,
        moderate: -0.8,
        significant: -1.8,
        severe: -3.2,
        'trade-war': -5.8
      },
      'TPG.AX': {
        name: 'TPG Telecom',
        sector: 'Communication Services',
        chinaExposure: 'Medium',
        usExposure: 'Low',
        tariffSensitivity: 3.8,
        baseline: 0,
        moderate: -1.5,
        significant: -3.2,
        severe: -5.5,
        'trade-war': -9.8
      },
      'TWE.AX': {
        name: 'Treasury Wine Estates',
        sector: 'Consumer Staples',
        chinaExposure: 'Very High',
        usExposure: 'Medium',
        tariffSensitivity: 9.5,
        baseline: 0,
        moderate: -5.5,
        significant: -11.2,
        severe: -17.5,
        'trade-war': -29.8
      },
      'MIN.AX': {
        name: 'Mineral Resources',
        sector: 'Materials',
        chinaExposure: 'Very High',
        usExposure: 'Low',
        tariffSensitivity: 9.0,
        baseline: 0,
        moderate: -5.0,
        significant: -10.2,
        severe: -15.8,
        'trade-war': -26.5
      },
      'JHX.AX': {
        name: 'James Hardie',
        sector: 'Materials',
        chinaExposure: 'Low',
        usExposure: 'Very High',
        tariffSensitivity: 7.8,
        baseline: 0,
        moderate: -3.8,
        significant: -7.8,
        severe: -12.5,
        'trade-war': -21.5
      }
    };
  }
  
  /**
   * Load custom scenarios
   * @private
   */
  _loadCustomScenarios() {
    // Check for saved scenarios in localStorage
    const savedScenarios = localStorage.getItem('trumpTariffCustomScenarios');
    if (savedScenarios) {
      try {
        this.customScenarios = JSON.parse(savedScenarios);
      } catch (error) {
        console.error('Error loading custom scenarios:', error);
        this.customScenarios = [];
      }
    }
  }
  
  /**
   * Save custom scenarios
   * @private
   */
  _saveCustomScenarios() {
    localStorage.setItem('trumpTariffCustomScenarios', JSON.stringify(this.customScenarios));
  }
  
  /**
   * Setup UI
   * @private
   */
  _setupUI() {
    // Check if scenario analysis container exists
    const container = document.getElementById('scenario-analysis-container');
    if (!container) return;
    
    // Create scenario analysis UI
    this._createScenarioAnalysisUI(container);
  }
  
  /**
   * Create scenario analysis UI
   * @param {HTMLElement} container - Container element
   * @private
   */
  _createScenarioAnalysisUI(container) {
    // Create scenario selector
    const scenarioSelector = document.createElement('div');
    scenarioSelector.className = 'scenario-selector';
    scenarioSelector.innerHTML = `
      <div class="scenario-selector-header">
        <h3>Tariff Scenarios</h3>
        <div class="scenario-actions">
          <button id="create-scenario" class="scenario-action-button">
            <i class="icon-add">+</i> Create Scenario
          </button>
          <button id="compare-scenarios" class="scenario-action-button">
            <i class="icon-compare">⊕</i> Compare Scenarios
          </button>
        </div>
      </div>
      <div class="scenario-list">
        ${this.scenarios.map(scenario => `
          <div class="scenario-item" data-scenario-id="${scenario.id}">
            <div class="scenario-info">
              <div class="scenario-name">${scenario.name}</div>
              <div class="scenario-description">${scenario.description}</div>
              <div class="scenario-probability">Probability: ${(scenario.probability * 100).toFixed(0)}%</div>
            </div>
            <button class="select-scenario-button" data-scenario-id="${scenario.id}">Select</button>
          </div>
        `).join('')}
        ${this.customScenarios.map(scenario => `
          <div class="scenario-item custom-scenario" data-scenario-id="${scenario.id}">
            <div class="scenario-info">
              <div class="scenario-name">${scenario.name}</div>
              <div class="scenario-description">${scenario.description}</div>
              <div class="scenario-probability">Probability: ${(scenario.probability * 100).toFixed(0)}%</div>
            </div>
            <div class="scenario-actions">
              <button class="select-scenario-button" data-scenario-id="${scenario.id}">Select</button>
              <button class="edit-scenario-button" data-scenario-id="${scenario.id}">Edit</button>
              <button class="delete-scenario-button" data-scenario-id="${scenario.id}">Delete</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    // Create scenario details
    const scenarioDetails = document.createElement('div');
    scenarioDetails.className = 'scenario-details';
    scenarioDetails.id = 'scenario-details';
    scenarioDetails.innerHTML = `
      <div class="scenario-details-placeholder">
        <p>Select a scenario to view details</p>
      </div>
    `;
    
    // Add to container
    container.appendChild(scenarioSelector);
    container.appendChild(scenarioDetails);
    
    // Add event listeners
    this._addScenarioEventListeners();
  }
  
  /**
   * Add scenario event listeners
   * @private
   */
  _addScenarioEventListeners() {
    // Select scenario buttons
    document.querySelectorAll('.select-scenario-button').forEach(button => {
      button.addEventListener('click', () => {
        const scenarioId = button.getAttribute('data-scenario-id');
        this._selectScenario(scenarioId);
      });
    });
    
    // Create scenario button
    document.getElementById('create-scenario').addEventListener('click', () => {
      this._showCreateScenarioForm();
    });
    
    // Compare scenarios button
    document.getElementById('compare-scenarios').addEventListener('click', () => {
      this._showCompareScenarioForm();
    });
    
    // Edit scenario buttons
    document.querySelectorAll('.edit-scenario-button').forEach(button => {
      button.addEventListener('click', () => {
        const scenarioId = button.getAttribute('data-scenario-id');
        this._showEditScenarioForm(scenarioId);
      });
    });
    
    // Delete scenario buttons
    document.querySelectorAll('.delete-scenario-button').forEach(button => {
      button.addEventListener('click', () => {
        const scenarioId = button.getAttribute('data-scenario-id');
        this._deleteCustomScenario(scenarioId);
      });
    });
  }
  
  /**
   * Select scenario
   * @param {string} scenarioId - Scenario ID
   * @private
   */
  _selectScenario(scenarioId) {
    // Find scenario
    const scenario = this._getScenarioById(scenarioId);
    if (!scenario) return;
    
    // Update active state
    document.querySelectorAll('.scenario-item').forEach(item => {
      item.classList.remove('active');
    });
    document.querySelector(`.scenario-item[data-scenario-id="${scenarioId}"]`).classList.add('active');
    
    // Update scenario details
    this._updateScenarioDetails(scenario);
  }
  
  /**
   * Get scenario by ID
   * @param {string} scenarioId - Scenario ID
   * @returns {Object|null} Scenario object
   * @private
   */
  _getScenarioById(scenarioId) {
    // Check predefined scenarios
    const predefinedScenario = this.scenarios.find(s => s.id === scenarioId);
    if (predefinedScenario) return predefinedScenario;
    
    // Check custom scenarios
    const customScenario = this.customScenarios.find(s => s.id === scenarioId);
    if (customScenario) return customScenario;
    
    return null;
  }
  
  /**
   * Update scenario details
   * @param {Object} scenario - Scenario object
   * @private
   */
  _updateScenarioDetails(scenario) {
    const scenarioDetails = document.getElementById('scenario-details');
    
    // Create tabs
    scenarioDetails.innerHTML = `
      <div class="scenario-header">
        <h3>${scenario.name}</h3>
        <div class="scenario-description">${scenario.description}</div>
      </div>
      <div class="scenario-tabs">
        <button class="scenario-tab active" data-tab="overview">Overview</button>
        <button class="scenario-tab" data-tab="market-impact">Market Impact</button>
        <button class="scenario-tab" data-tab="sector-impact">Sector Impact</button>
        <button class="scenario-tab" data-tab="stock-impact">Stock Impact</button>
      </div>
      <div class="scenario-tab-content" id="scenario-tab-content">
        ${this._generateOverviewTabContent(scenario)}
      </div>
    `;
    
    // Add tab event listeners
    scenarioDetails.querySelectorAll('.scenario-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active state
        scenarioDetails.querySelectorAll('.scenario-tab').forEach(t => {
          t.classList.remove('active');
        });
        tab.classList.add('active');
        
        // Update tab content
        const tabName = tab.getAttribute('data-tab');
        const tabContent = document.getElementById('scenario-tab-content');
        
        switch (tabName) {
          case 'overview':
            tabContent.innerHTML = this._generateOverviewTabContent(scenario);
            break;
          case 'market-impact':
            tabContent.innerHTML = this._generateMarketImpactTabContent(scenario);
            this._renderMarketImpactChart(scenario);
            break;
          case 'sector-impact':
            tabContent.innerHTML = this._generateSectorImpactTabContent(scenario);
            this._renderSectorImpactChart(scenario);
            break;
          case 'stock-impact':
            tabContent.innerHTML = this._generateStockImpactTabContent(scenario);
            this._setupStockImpactFilters();
            break;
        }
      });
    });
  }
  
  /**
   * Generate overview tab content
   * @param {Object} scenario - Scenario object
   * @returns {string} Tab content HTML
   * @private
   */
  _generateOverviewTabContent(scenario) {
    return `
      <div class="scenario-overview">
        <div class="scenario-details-section">
          <h4>Tariff Levels</h4>
          <div class="tariff-levels">
            <div class="tariff-level">
              <div class="tariff-label">China Tariffs:</div>
              <div class="tariff-value">${scenario.tariffLevels.china}%</div>
            </div>
            <div class="tariff-level">
              <div class="tariff-label">Global Tariffs:</div>
              <div class="tariff-value">${scenario.tariffLevels.global}%</div>
            </div>
          </div>
        </div>
        
        <div class="scenario-details-section">
          <h4>Probability</h4>
          <div class="probability-meter">
            <div class="probability-bar" style="width: ${scenario.probability * 100}%"></div>
            <div class="probability-value">${(scenario.probability * 100).toFixed(0)}%</div>
          </div>
          <div class="probability-description">
            ${this._getProbabilityDescription(scenario.probability)}
          </div>
        </div>
        
        <div class="scenario-details-section">
          <h4>Expected Market Impact</h4>
          <div class="market-impacts">
            <div class="market-impact">
              <div class="market-label">ASX 200:</div>
              <div class="market-value ${scenario.marketImpact.asx200 >= 0 ? 'positive' : 'negative'}">
                ${scenario.marketImpact.asx200 >= 0 ? '+' : ''}${scenario.marketImpact.asx200}%
              </div>
            </div>
            <div class="market-impact">
              <div class="market-label">AUD/USD:</div>
              <div class="market-value ${scenario.marketImpact.usdaud <= 0 ? 'positive' : 'negative'}">
                ${scenario.marketImpact.usdaud >= 0 ? '+' : ''}${scenario.marketImpact.usdaud}%
              </div>
            </div>
          </div>
        </div>
        
        <div class="scenario-details-section">
          <h4>Key Implications</h4>
          <div class="scenario-implications">
            <ul>
              ${this._generateScenarioImplications(scenario).map(implication => `
                <li>${implication}</li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate market impact tab content
   * @param {Object} scenario - Scenario object
   * @returns {string} Tab content HTML
   * @private
   */
  _generateMarketImpactTabContent(scenario) {
    return `
      <div class="market-impact-content">
        <div class="market-impact-chart-container">
          <canvas id="market-impact-chart"></canvas>
        </div>
        <div class="market-impact-details">
          <h4>Market Impact Details</h4>
          <div class="impact-details">
            <div class="impact-detail">
              <div class="impact-label">ASX 200 Impact:</div>
              <div class="impact-value ${scenario.marketImpact.asx200 >= 0 ? 'positive' : 'negative'}">
                ${scenario.marketImpact.asx200 >= 0 ? '+' : ''}${scenario.marketImpact.asx200}%
              </div>
              <div class="impact-description">
                ${this._getMarketImpactDescription('asx200', scenario.marketImpact.asx200)}
              </div>
            </div>
            <div class="impact-detail">
              <div class="impact-label">AUD/USD Impact:</div>
              <div class="impact-value ${scenario.marketImpact.usdaud <= 0 ? 'positive' : 'negative'}">
                ${scenario.marketImpact.usdaud >= 0 ? '+' : ''}${scenario.marketImpact.usdaud}%
              </div>
              <div class="impact-description">
                ${this._getMarketImpactDescription('usdaud', scenario.marketImpact.usdaud)}
              </div>
            </div>
          </div>
        </div>
        <div class="market-impact-comparison">
          <h4>Comparison to Other Scenarios</h4>
          <div class="comparison-table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>ASX 200 Impact</th>
                  <th>AUD/USD Impact</th>
                  <th>Probability</th>
                </tr>
              </thead>
              <tbody>
                ${this.scenarios.map(s => `
                  <tr class="${s.id === scenario.id ? 'current-scenario' : ''}">
                    <td>${s.name}</td>
                    <td class="${s.marketImpact.asx200 >= 0 ? 'positive' : 'negative'}">
                      ${s.marketImpact.asx200 >= 0 ? '+' : ''}${s.marketImpact.asx200}%
                    </td>
                    <td class="${s.marketImpact.usdaud <= 0 ? 'positive' : 'negative'}">
                      ${s.marketImpact.usdaud >= 0 ? '+' : ''}${s.marketImpact.usdaud}%
                    </td>
                    <td>${(s.probability * 100).toFixed(0)}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate sector impact tab content
   * @param {Object} scenario - Scenario object
   * @returns {string} Tab content HTML
   * @private
   */
  _generateSectorImpactTabContent(scenario) {
    return `
      <div class="sector-impact-content">
        <div class="sector-impact-chart-container">
          <canvas id="sector-impact-chart"></canvas>
        </div>
        <div class="sector-impact-details">
          <h4>Sector Impact Details</h4>
          <div class="sector-impact-table-container">
            <table class="sector-impact-table">
              <thead>
                <tr>
                  <th>Sector</th>
                  <th>Impact</th>
                  <th>Sensitivity</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(this.sectorImpacts).map(([sector, impacts]) => `
                  <tr>
                    <td>${sector}</td>
                    <td class="${impacts[scenario.id] >= 0 ? 'positive' : 'negative'}">
                      ${impacts[scenario.id] >= 0 ? '+' : ''}${impacts[scenario.id]}%
                    </td>
                    <td>${this._getSectorSensitivity(impacts)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate stock impact tab content
   * @param {Object} scenario - Scenario object
   * @returns {string} Tab content HTML
   * @private
   */
  _generateStockImpactTabContent(scenario) {
    return `
      <div class="stock-impact-content">
        <div class="stock-impact-filters">
          <div class="filter-group">
            <label for="sector-filter">Sector:</label>
            <select id="sector-filter" class="filter-select">
              <option value="all">All Sectors</option>
              ${Object.keys(this.sectorImpacts).map(sector => `
                <option value="${sector}">${sector}</option>
              `).join('')}
            </select>
          </div>
          <div class="filter-group">
            <label for="exposure-filter">China Exposure:</label>
            <select id="exposure-filter" class="filter-select">
              <option value="all">All Exposures</option>
              <option value="Very High">Very High</option>
              <option value="High">High</option>
              <option value="Medium-High">Medium-High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="impact-filter">Impact:</label>
            <select id="impact-filter" class="filter-select">
              <option value="all">All Impacts</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="severe">Severe Negative (< -10%)</option>
              <option value="moderate">Moderate Negative (-5% to -10%)</option>
              <option value="mild">Mild Negative (0% to -5%)</option>
            </select>
          </div>
        </div>
        <div class="stock-impact-table-container">
          <table class="stock-impact-table" id="stock-impact-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Sector</th>
                <th>China Exposure</th>
                <th>Tariff Sensitivity</th>
                <th>Impact</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(this.stockImpacts).map(([symbol, stock]) => `
                <tr data-sector="${stock.sector}" data-exposure="${stock.chinaExposure}" data-impact="${stock[scenario.id]}">
                  <td>${symbol}</td>
                  <td>${stock.name}</td>
                  <td>${stock.sector}</td>
                  <td>${stock.chinaExposure}</td>
                  <td>${stock.tariffSensitivity}</td>
                  <td class="${stock[scenario.id] >= 0 ? 'positive' : 'negative'}">
                    ${stock[scenario.id] >= 0 ? '+' : ''}${stock[scenario.id]}%
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
  
  /**
   * Setup stock impact filters
   * @private
   */
  _setupStockImpactFilters() {
    const sectorFilter = document.getElementById('sector-filter');
    const exposureFilter = document.getElementById('exposure-filter');
    const impactFilter = document.getElementById('impact-filter');
    
    if (!sectorFilter || !exposureFilter || !impactFilter) return;
    
    const filterTable = () => {
      const sector = sectorFilter.value;
      const exposure = exposureFilter.value;
      const impact = impactFilter.value;
      
      const rows = document.querySelectorAll('#stock-impact-table tbody tr');
      
      rows.forEach(row => {
        const rowSector = row.getAttribute('data-sector');
        const rowExposure = row.getAttribute('data-exposure');
        const rowImpact = parseFloat(row.getAttribute('data-impact'));
        
        let showRow = true;
        
        if (sector !== 'all' && rowSector !== sector) {
          showRow = false;
        }
        
        if (exposure !== 'all' && rowExposure !== exposure) {
          showRow = false;
        }
        
        if (impact !== 'all') {
          if (impact === 'positive' && rowImpact < 0) {
            showRow = false;
          } else if (impact === 'negative' && rowImpact >= 0) {
            showRow = false;
          } else if (impact === 'severe' && rowImpact >= -10) {
            showRow = false;
          } else if (impact === 'moderate' && (rowImpact < -10 || rowImpact > -5)) {
            showRow = false;
          } else if (impact === 'mild' && (rowImpact < -5 || rowImpact > 0)) {
            showRow = false;
          }
        }
        
        row.style.display = showRow ? '' : 'none';
      });
    };
    
    sectorFilter.addEventListener('change', filterTable);
    exposureFilter.addEventListener('change', filterTable);
    impactFilter.addEventListener('change', filterTable);
  }
  
  /**
   * Render market impact chart
   * @param {Object} scenario - Scenario object
   * @private
   */
  _renderMarketImpactChart(scenario) {
    // In a real implementation, this would use a charting library like Chart.js
    // This is a simplified version for demonstration
    
    const canvas = document.getElementById('market-impact-chart');
    if (!canvas) return;
    
    // Simulate chart rendering
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw chart background
    ctx.fillStyle = '#f5f7fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw title
    ctx.fillStyle = '#2c3e50';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Market Impact Comparison', canvas.width / 2, 30);
    
    // Draw bars
    const barWidth = 60;
    const spacing = 20;
    const startX = (canvas.width - (barWidth * 2 + spacing)) / 2;
    const baseY = canvas.height - 50;
    const maxHeight = 200;
    
    // ASX 200 bar
    const asx200Height = Math.min(Math.abs(scenario.marketImpact.asx200) * 10, maxHeight);
    ctx.fillStyle = scenario.marketImpact.asx200 >= 0 ? '#27ae60' : '#c0392b';
    ctx.fillRect(startX, baseY - (scenario.marketImpact.asx200 >= 0 ? asx200Height : 0), barWidth, asx200Height);
    
    // AUD/USD bar
    const usdaudHeight = Math.min(Math.abs(scenario.marketImpact.usdaud) * 10, maxHeight);
    ctx.fillStyle = scenario.marketImpact.usdaud <= 0 ? '#27ae60' : '#c0392b';
    ctx.fillRect(startX + barWidth + spacing, baseY - (scenario.marketImpact.usdaud >= 0 ? usdaudHeight : 0), barWidth, usdaudHeight);
    
    // Draw labels
    ctx.fillStyle = '#2c3e50';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('ASX 200', startX + barWidth / 2, baseY + 20);
    ctx.fillText('AUD/USD', startX + barWidth + spacing + barWidth / 2, baseY + 20);
    
    // Draw values
    ctx.font = '12px Arial';
    ctx.fillText(`${scenario.marketImpact.asx200 >= 0 ? '+' : ''}${scenario.marketImpact.asx200}%`, startX + barWidth / 2, baseY - asx200Height - 10);
    ctx.fillText(`${scenario.marketImpact.usdaud >= 0 ? '+' : ''}${scenario.marketImpact.usdaud}%`, startX + barWidth + spacing + barWidth / 2, baseY - usdaudHeight - 10);
    
    // Draw baseline
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    ctx.lineTo(canvas.width, baseY);
    ctx.stroke();
  }
  
  /**
   * Render sector impact chart
   * @param {Object} scenario - Scenario object
   * @private
   */
  _renderSectorImpactChart(scenario) {
    // In a real implementation, this would use a charting library like Chart.js
    // This is a simplified version for demonstration
    
    const canvas = document.getElementById('sector-impact-chart');
    if (!canvas) return;
    
    // Simulate chart rendering
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw chart background
    ctx.fillStyle = '#f5f7fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw title
    ctx.fillStyle = '#2c3e50';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Sector Impact Analysis', canvas.width / 2, 30);
    
    // Get sector impacts
    const sectors = Object.keys(this.sectorImpacts);
    const impacts = sectors.map(sector => this.sectorImpacts[sector][scenario.id]);
    
    // Draw bars
    const barHeight = 25;
    const spacing = 10;
    const startY = 60;
    const baseX = 200;
    const maxWidth = canvas.width - baseX - 50;
    
    sectors.forEach((sector, index) => {
      const impact = this.sectorImpacts[sector][scenario.id];
      const barWidth = Math.min(Math.abs(impact) * 10, maxWidth);
      
      // Draw sector label
      ctx.fillStyle = '#2c3e50';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(sector, baseX - 10, startY + index * (barHeight + spacing) + barHeight / 2 + 4);
      
      // Draw bar
      ctx.fillStyle = impact >= 0 ? '#27ae60' : '#c0392b';
      ctx.fillRect(baseX, startY + index * (barHeight + spacing), barWidth, barHeight);
      
      // Draw impact value
      ctx.fillStyle = '#2c3e50';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${impact >= 0 ? '+' : ''}${impact}%`, baseX + barWidth + 5, startY + index * (barHeight + spacing) + barHeight / 2 + 4);
    });
    
    // Draw baseline
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(baseX, 50);
    ctx.lineTo(baseX, canvas.height - 20);
    ctx.stroke();
  }
  
  /**
   * Show create scenario form
   * @private
   */
  _showCreateScenarioForm() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>Create Custom Scenario</h3>
          <button class="close-button" id="close-scenario-modal">&times;</button>
        </div>
        <div class="modal-content">
          <div class="scenario-form">
            <div class="form-group">
              <label for="scenario-name">Scenario Name:</label>
              <input type="text" id="scenario-name" class="form-control" placeholder="Enter scenario name">
            </div>
            <div class="form-group">
              <label for="scenario-description">Description:</label>
              <textarea id="scenario-description" class="form-control" placeholder="Enter scenario description"></textarea>
            </div>
            <div class="form-group">
              <label for="china-tariff">China Tariff Level (%):</label>
              <input type="number" id="china-tariff" class="form-control" min="0" max="100" step="0.1" value="10">
            </div>
            <div class="form-group">
              <label for="global-tariff">Global Tariff Level (%):</label>
              <input type="number" id="global-tariff" class="form-control" min="0" max="100" step="0.1" value="5">
            </div>
            <div class="form-group">
              <label for="scenario-probability">Probability (%):</label>
              <input type="number" id="scenario-probability" class="form-control" min="0" max="100" step="1" value="20">
            </div>
            <div class="form-actions">
              <button class="form-button save-button" id="save-scenario-button">Create Scenario</button>
              <button class="form-button cancel-button" id="cancel-scenario-button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add event listeners
    document.getElementById('close-scenario-modal').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    document.getElementById('cancel-scenario-button').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    document.getElementById('save-scenario-button').addEventListener('click', () => {
      const name = document.getElementById('scenario-name').value;
      const description = document.getElementById('scenario-description').value;
      const chinaTariff = parseFloat(document.getElementById('china-tariff').value);
      const globalTariff = parseFloat(document.getElementById('global-tariff').value);
      const probability = parseFloat(document.getElementById('scenario-probability').value) / 100;
      
      if (!name) {
        this._showNotification('Please enter a scenario name', 'warning');
        return;
      }
      
      if (isNaN(chinaTariff) || isNaN(globalTariff) || isNaN(probability)) {
        this._showNotification('Please enter valid numbers', 'warning');
        return;
      }
      
      // Create custom scenario
      this._createCustomScenario(name, description, chinaTariff, globalTariff, probability);
      
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
   * Show edit scenario form
   * @param {string} scenarioId - Scenario ID
   * @private
   */
  _showEditScenarioForm(scenarioId) {
    // Find scenario
    const scenario = this.customScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>Edit Custom Scenario</h3>
          <button class="close-button" id="close-scenario-modal">&times;</button>
        </div>
        <div class="modal-content">
          <div class="scenario-form">
            <div class="form-group">
              <label for="scenario-name">Scenario Name:</label>
              <input type="text" id="scenario-name" class="form-control" value="${scenario.name}">
            </div>
            <div class="form-group">
              <label for="scenario-description">Description:</label>
              <textarea id="scenario-description" class="form-control">${scenario.description}</textarea>
            </div>
            <div class="form-group">
              <label for="china-tariff">China Tariff Level (%):</label>
              <input type="number" id="china-tariff" class="form-control" min="0" max="100" step="0.1" value="${scenario.tariffLevels.china}">
            </div>
            <div class="form-group">
              <label for="global-tariff">Global Tariff Level (%):</label>
              <input type="number" id="global-tariff" class="form-control" min="0" max="100" step="0.1" value="${scenario.tariffLevels.global}">
            </div>
            <div class="form-group">
              <label for="scenario-probability">Probability (%):</label>
              <input type="number" id="scenario-probability" class="form-control" min="0" max="100" step="1" value="${scenario.probability * 100}">
            </div>
            <div class="form-actions">
              <button class="form-button save-button" id="save-scenario-button">Save Changes</button>
              <button class="form-button cancel-button" id="cancel-scenario-button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add event listeners
    document.getElementById('close-scenario-modal').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    document.getElementById('cancel-scenario-button').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    document.getElementById('save-scenario-button').addEventListener('click', () => {
      const name = document.getElementById('scenario-name').value;
      const description = document.getElementById('scenario-description').value;
      const chinaTariff = parseFloat(document.getElementById('china-tariff').value);
      const globalTariff = parseFloat(document.getElementById('global-tariff').value);
      const probability = parseFloat(document.getElementById('scenario-probability').value) / 100;
      
      if (!name) {
        this._showNotification('Please enter a scenario name', 'warning');
        return;
      }
      
      if (isNaN(chinaTariff) || isNaN(globalTariff) || isNaN(probability)) {
        this._showNotification('Please enter valid numbers', 'warning');
        return;
      }
      
      // Update custom scenario
      this._updateCustomScenario(scenarioId, name, description, chinaTariff, globalTariff, probability);
      
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
   * Show compare scenario form
   * @private
   */
  _showCompareScenarioForm() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-dialog wide-dialog">
        <div class="modal-header">
          <h3>Compare Scenarios</h3>
          <button class="close-button" id="close-compare-modal">&times;</button>
        </div>
        <div class="modal-content">
          <div class="scenario-compare-form">
            <div class="scenario-selectors">
              <div class="scenario-selector-group">
                <label for="scenario-1">Scenario 1:</label>
                <select id="scenario-1" class="form-control">
                  ${this.scenarios.concat(this.customScenarios).map(scenario => `
                    <option value="${scenario.id}">${scenario.name}</option>
                  `).join('')}
                </select>
              </div>
              <div class="scenario-selector-group">
                <label for="scenario-2">Scenario 2:</label>
                <select id="scenario-2" class="form-control">
                  ${this.scenarios.concat(this.customScenarios).map((scenario, index) => `
                    <option value="${scenario.id}" ${index === 1 ? 'selected' : ''}>${scenario.name}</option>
                  `).join('')}
                </select>
              </div>
            </div>
            <div class="comparison-type">
              <div class="form-group">
                <label>Comparison Type:</label>
                <div class="comparison-options">
                  <label class="comparison-option">
                    <input type="radio" name="comparison-type" value="market" checked> Market Impact
                  </label>
                  <label class="comparison-option">
                    <input type="radio" name="comparison-type" value="sector"> Sector Impact
                  </label>
                  <label class="comparison-option">
                    <input type="radio" name="comparison-type" value="stock"> Stock Impact
                  </label>
                </div>
              </div>
            </div>
            <div class="comparison-content" id="comparison-content">
              <div class="comparison-placeholder">
                <p>Select scenarios and comparison type to view comparison</p>
              </div>
            </div>
            <div class="form-actions">
              <button class="form-button compare-button" id="compare-button">Compare</button>
              <button class="form-button cancel-button" id="cancel-compare-button">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add event listeners
    document.getElementById('close-compare-modal').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    document.getElementById('cancel-compare-button').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    document.getElementById('compare-button').addEventListener('click', () => {
      const scenario1Id = document.getElementById('scenario-1').value;
      const scenario2Id = document.getElementById('scenario-2').value;
      const comparisonType = document.querySelector('input[name="comparison-type"]:checked').value;
      
      // Get scenarios
      const scenario1 = this._getScenarioById(scenario1Id);
      const scenario2 = this._getScenarioById(scenario2Id);
      
      if (!scenario1 || !scenario2) return;
      
      // Update comparison content
      const comparisonContent = document.getElementById('comparison-content');
      
      switch (comparisonType) {
        case 'market':
          comparisonContent.innerHTML = this._generateMarketComparisonContent(scenario1, scenario2);
          break;
        case 'sector':
          comparisonContent.innerHTML = this._generateSectorComparisonContent(scenario1, scenario2);
          break;
        case 'stock':
          comparisonContent.innerHTML = this._generateStockComparisonContent(scenario1, scenario2);
          break;
      }
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
    
    // Trigger initial comparison
    document.getElementById('compare-button').click();
  }
  
  /**
   * Generate market comparison content
   * @param {Object} scenario1 - First scenario
   * @param {Object} scenario2 - Second scenario
   * @returns {string} Comparison content HTML
   * @private
   */
  _generateMarketComparisonContent(scenario1, scenario2) {
    return `
      <div class="market-comparison">
        <div class="comparison-chart-container">
          <canvas id="market-comparison-chart"></canvas>
        </div>
        <div class="comparison-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Market</th>
                <th>${scenario1.name}</th>
                <th>${scenario2.name}</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ASX 200</td>
                <td class="${scenario1.marketImpact.asx200 >= 0 ? 'positive' : 'negative'}">
                  ${scenario1.marketImpact.asx200 >= 0 ? '+' : ''}${scenario1.marketImpact.asx200}%
                </td>
                <td class="${scenario2.marketImpact.asx200 >= 0 ? 'positive' : 'negative'}">
                  ${scenario2.marketImpact.asx200 >= 0 ? '+' : ''}${scenario2.marketImpact.asx200}%
                </td>
                <td class="${scenario2.marketImpact.asx200 - scenario1.marketImpact.asx200 >= 0 ? 'positive' : 'negative'}">
                  ${scenario2.marketImpact.asx200 - scenario1.marketImpact.asx200 >= 0 ? '+' : ''}${(scenario2.marketImpact.asx200 - scenario1.marketImpact.asx200).toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td>AUD/USD</td>
                <td class="${scenario1.marketImpact.usdaud <= 0 ? 'positive' : 'negative'}">
                  ${scenario1.marketImpact.usdaud >= 0 ? '+' : ''}${scenario1.marketImpact.usdaud}%
                </td>
                <td class="${scenario2.marketImpact.usdaud <= 0 ? 'positive' : 'negative'}">
                  ${scenario2.marketImpact.usdaud >= 0 ? '+' : ''}${scenario2.marketImpact.usdaud}%
                </td>
                <td class="${scenario2.marketImpact.usdaud - scenario1.marketImpact.usdaud <= 0 ? 'positive' : 'negative'}">
                  ${scenario2.marketImpact.usdaud - scenario1.marketImpact.usdaud >= 0 ? '+' : ''}${(scenario2.marketImpact.usdaud - scenario1.marketImpact.usdaud).toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="comparison-summary">
          <h4>Comparison Summary</h4>
          <p>${this._generateMarketComparisonSummary(scenario1, scenario2)}</p>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate sector comparison content
   * @param {Object} scenario1 - First scenario
   * @param {Object} scenario2 - Second scenario
   * @returns {string} Comparison content HTML
   * @private
   */
  _generateSectorComparisonContent(scenario1, scenario2) {
    return `
      <div class="sector-comparison">
        <div class="comparison-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Sector</th>
                <th>${scenario1.name}</th>
                <th>${scenario2.name}</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(this.sectorImpacts).map(([sector, impacts]) => `
                <tr>
                  <td>${sector}</td>
                  <td class="${impacts[scenario1.id] >= 0 ? 'positive' : 'negative'}">
                    ${impacts[scenario1.id] >= 0 ? '+' : ''}${impacts[scenario1.id]}%
                  </td>
                  <td class="${impacts[scenario2.id] >= 0 ? 'positive' : 'negative'}">
                    ${impacts[scenario2.id] >= 0 ? '+' : ''}${impacts[scenario2.id]}%
                  </td>
                  <td class="${impacts[scenario2.id] - impacts[scenario1.id] >= 0 ? 'positive' : 'negative'}">
                    ${impacts[scenario2.id] - impacts[scenario1.id] >= 0 ? '+' : ''}${(impacts[scenario2.id] - impacts[scenario1.id]).toFixed(1)}%
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="comparison-summary">
          <h4>Comparison Summary</h4>
          <p>${this._generateSectorComparisonSummary(scenario1, scenario2)}</p>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate stock comparison content
   * @param {Object} scenario1 - First scenario
   * @param {Object} scenario2 - Second scenario
   * @returns {string} Comparison content HTML
   * @private
   */
  _generateStockComparisonContent(scenario1, scenario2) {
    return `
      <div class="stock-comparison">
        <div class="comparison-filters">
          <div class="filter-group">
            <label for="comparison-sector-filter">Sector:</label>
            <select id="comparison-sector-filter" class="filter-select">
              <option value="all">All Sectors</option>
              ${Object.keys(this.sectorImpacts).map(sector => `
                <option value="${sector}">${sector}</option>
              `).join('')}
            </select>
          </div>
          <div class="filter-group">
            <label for="comparison-sort-filter">Sort By:</label>
            <select id="comparison-sort-filter" class="filter-select">
              <option value="difference">Difference</option>
              <option value="scenario1">Impact in ${scenario1.name}</option>
              <option value="scenario2">Impact in ${scenario2.name}</option>
              <option value="symbol">Symbol</option>
            </select>
          </div>
        </div>
        <div class="comparison-table-container">
          <table class="comparison-table" id="stock-comparison-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Sector</th>
                <th>${scenario1.name}</th>
                <th>${scenario2.name}</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(this.stockImpacts).map(([symbol, stock]) => `
                <tr data-sector="${stock.sector}" data-scenario1="${stock[scenario1.id]}" data-scenario2="${stock[scenario2.id]}" data-difference="${stock[scenario2.id] - stock[scenario1.id]}">
                  <td>${symbol}</td>
                  <td>${stock.name}</td>
                  <td>${stock.sector}</td>
                  <td class="${stock[scenario1.id] >= 0 ? 'positive' : 'negative'}">
                    ${stock[scenario1.id] >= 0 ? '+' : ''}${stock[scenario1.id]}%
                  </td>
                  <td class="${stock[scenario2.id] >= 0 ? 'positive' : 'negative'}">
                    ${stock[scenario2.id] >= 0 ? '+' : ''}${stock[scenario2.id]}%
                  </td>
                  <td class="${stock[scenario2.id] - stock[scenario1.id] >= 0 ? 'positive' : 'negative'}">
                    ${stock[scenario2.id] - stock[scenario1.id] >= 0 ? '+' : ''}${(stock[scenario2.id] - stock[scenario1.id]).toFixed(1)}%
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
  
  /**
   * Create custom scenario
   * @param {string} name - Scenario name
   * @param {string} description - Scenario description
   * @param {number} chinaTariff - China tariff level
   * @param {number} globalTariff - Global tariff level
   * @param {number} probability - Scenario probability
   * @private
   */
  _createCustomScenario(name, description, chinaTariff, globalTariff, probability) {
    // Generate ID
    const id = `custom-${Date.now()}`;
    
    // Calculate market impact
    const asx200Impact = this._calculateASX200Impact(chinaTariff, globalTariff);
    const usdaudImpact = this._calculateUSDImpact(chinaTariff, globalTariff);
    
    // Create scenario
    const scenario = {
      id,
      name,
      description,
      tariffLevels: {
        china: chinaTariff,
        global: globalTariff
      },
      probability,
      marketImpact: {
        asx200: asx200Impact,
        usdaud: usdaudImpact
      }
    };
    
    // Add to custom scenarios
    this.customScenarios.push(scenario);
    
    // Save custom scenarios
    this._saveCustomScenarios();
    
    // Calculate sector impacts
    this._calculateSectorImpacts(scenario);
    
    // Calculate stock impacts
    this._calculateStockImpacts(scenario);
    
    // Update UI
    this._updateScenarioList();
    
    // Show notification
    this._showNotification('Custom scenario created successfully');
  }
  
  /**
   * Update custom scenario
   * @param {string} id - Scenario ID
   * @param {string} name - Scenario name
   * @param {string} description - Scenario description
   * @param {number} chinaTariff - China tariff level
   * @param {number} globalTariff - Global tariff level
   * @param {number} probability - Scenario probability
   * @private
   */
  _updateCustomScenario(id, name, description, chinaTariff, globalTariff, probability) {
    // Find scenario
    const index = this.customScenarios.findIndex(s => s.id === id);
    if (index === -1) return;
    
    // Calculate market impact
    const asx200Impact = this._calculateASX200Impact(chinaTariff, globalTariff);
    const usdaudImpact = this._calculateUSDImpact(chinaTariff, globalTariff);
    
    // Update scenario
    this.customScenarios[index] = {
      id,
      name,
      description,
      tariffLevels: {
        china: chinaTariff,
        global: globalTariff
      },
      probability,
      marketImpact: {
        asx200: asx200Impact,
        usdaud: usdaudImpact
      }
    };
    
    // Save custom scenarios
    this._saveCustomScenarios();
    
    // Calculate sector impacts
    this._calculateSectorImpacts(this.customScenarios[index]);
    
    // Calculate stock impacts
    this._calculateStockImpacts(this.customScenarios[index]);
    
    // Update UI
    this._updateScenarioList();
    
    // Show notification
    this._showNotification('Custom scenario updated successfully');
  }
  
  /**
   * Delete custom scenario
   * @param {string} id - Scenario ID
   * @private
   */
  _deleteCustomScenario(id) {
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this scenario?')) return;
    
    // Find scenario
    const index = this.customScenarios.findIndex(s => s.id === id);
    if (index === -1) return;
    
    // Remove scenario
    this.customScenarios.splice(index, 1);
    
    // Save custom scenarios
    this._saveCustomScenarios();
    
    // Update UI
    this._updateScenarioList();
    
    // Show notification
    this._showNotification('Custom scenario deleted successfully');
  }
  
  /**
   * Update scenario list
   * @private
   */
  _updateScenarioList() {
    const scenarioList = document.querySelector('.scenario-list');
    if (!scenarioList) return;
    
    scenarioList.innerHTML = `
      ${this.scenarios.map(scenario => `
        <div class="scenario-item" data-scenario-id="${scenario.id}">
          <div class="scenario-info">
            <div class="scenario-name">${scenario.name}</div>
            <div class="scenario-description">${scenario.description}</div>
            <div class="scenario-probability">Probability: ${(scenario.probability * 100).toFixed(0)}%</div>
          </div>
          <button class="select-scenario-button" data-scenario-id="${scenario.id}">Select</button>
        </div>
      `).join('')}
      ${this.customScenarios.map(scenario => `
        <div class="scenario-item custom-scenario" data-scenario-id="${scenario.id}">
          <div class="scenario-info">
            <div class="scenario-name">${scenario.name}</div>
            <div class="scenario-description">${scenario.description}</div>
            <div class="scenario-probability">Probability: ${(scenario.probability * 100).toFixed(0)}%</div>
          </div>
          <div class="scenario-actions">
            <button class="select-scenario-button" data-scenario-id="${scenario.id}">Select</button>
            <button class="edit-scenario-button" data-scenario-id="${scenario.id}">Edit</button>
            <button class="delete-scenario-button" data-scenario-id="${scenario.id}">Delete</button>
          </div>
        </div>
      `).join('')}
    `;
    
    // Add event listeners
    this._addScenarioEventListeners();
  }
  
  /**
   * Calculate ASX 200 impact
   * @param {number} chinaTariff - China tariff level
   * @param {number} globalTariff - Global tariff level
   * @returns {number} ASX 200 impact
   * @private
   */
  _calculateASX200Impact(chinaTariff, globalTariff) {
    // Simple model: ASX 200 impact = -0.2 * China tariff - 0.15 * Global tariff
    return -((0.2 * chinaTariff) + (0.15 * globalTariff));
  }
  
  /**
   * Calculate USD impact
   * @param {number} chinaTariff - China tariff level
   * @param {number} globalTariff - Global tariff level
   * @returns {number} USD impact
   * @private
   */
  _calculateUSDImpact(chinaTariff, globalTariff) {
    // Simple model: USD impact = 0.15 * China tariff + 0.1 * Global tariff
    return (0.15 * chinaTariff) + (0.1 * globalTariff);
  }
  
  /**
   * Calculate sector impacts
   * @param {Object} scenario - Scenario object
   * @private
   */
  _calculateSectorImpacts(scenario) {
    // Calculate sector impacts
    Object.keys(this.sectorImpacts).forEach(sector => {
      // Get sector sensitivity
      const sensitivity = this._getSectorSensitivityValue(sector);
      
      // Calculate impact
      const impact = -((sensitivity * scenario.tariffLevels.china * 0.1) + (sensitivity * scenario.tariffLevels.global * 0.05));
      
      // Set impact
      this.sectorImpacts[sector][scenario.id] = parseFloat(impact.toFixed(1));
    });
  }
  
  /**
   * Calculate stock impacts
   * @param {Object} scenario - Scenario object
   * @private
   */
  _calculateStockImpacts(scenario) {
    // Calculate stock impacts
    Object.keys(this.stockImpacts).forEach(symbol => {
      const stock = this.stockImpacts[symbol];
      
      // Calculate impact
      const impact = -((stock.tariffSensitivity * scenario.tariffLevels.china * 0.1) + (stock.tariffSensitivity * scenario.tariffLevels.global * 0.05));
      
      // Set impact
      stock[scenario.id] = parseFloat(impact.toFixed(1));
    });
  }
  
  /**
   * Get sector sensitivity value
   * @param {string} sector - Sector name
   * @returns {number} Sensitivity value
   * @private
   */
  _getSectorSensitivityValue(sector) {
    switch (sector) {
      case 'Materials':
        return 1.2;
      case 'Financials':
        return 0.9;
      case 'Energy':
        return 0.8;
      case 'Healthcare':
        return 0.4;
      case 'Consumer Staples':
        return 0.5;
      case 'Consumer Discretionary':
        return 1.3;
      case 'Industrials':
        return 1.1;
      case 'Technology':
        return 1.0;
      case 'Utilities':
        return 0.3;
      case 'Real Estate':
        return 0.7;
      case 'Communication Services':
        return 0.6;
      default:
        return 1.0;
    }
  }
  
  /**
   * Get sector sensitivity
   * @param {Object} impacts - Sector impacts
   * @returns {string} Sensitivity description
   * @private
   */
  _getSectorSensitivity(impacts) {
    // Calculate sensitivity based on trade-war scenario
    const impact = Math.abs(impacts['trade-war']);
    
    if (impact > 15) {
      return 'Very High';
    } else if (impact > 10) {
      return 'High';
    } else if (impact > 5) {
      return 'Medium';
    } else {
      return 'Low';
    }
  }
  
  /**
   * Get probability description
   * @param {number} probability - Scenario probability
   * @returns {string} Probability description
   * @private
   */
  _getProbabilityDescription(probability) {
    if (probability >= 0.5) {
      return 'This scenario is considered highly likely to occur.';
    } else if (probability >= 0.3) {
      return 'This scenario has a moderate likelihood of occurring.';
    } else if (probability >= 0.1) {
      return 'This scenario has a low likelihood of occurring.';
    } else {
      return 'This scenario is considered unlikely to occur.';
    }
  }
  
  /**
   * Get market impact description
   * @param {string} market - Market name
   * @param {number} impact - Market impact
   * @returns {string} Impact description
   * @private
   */
  _getMarketImpactDescription(market, impact) {
    if (market === 'asx200') {
      if (impact >= 0) {
        return 'Positive impact on the ASX 200 index.';
      } else if (impact > -5) {
        return 'Mild negative impact on the ASX 200 index.';
      } else if (impact > -10) {
        return 'Moderate negative impact on the ASX 200 index.';
      } else {
        return 'Severe negative impact on the ASX 200 index.';
      }
    } else if (market === 'usdaud') {
      if (impact <= 0) {
        return 'Positive impact on the Australian Dollar.';
      } else if (impact < 5) {
        return 'Mild negative impact on the Australian Dollar.';
      } else if (impact < 10) {
        return 'Moderate negative impact on the Australian Dollar.';
      } else {
        return 'Severe negative impact on the Australian Dollar.';
      }
    }
    
    return '';
  }
  
  /**
   * Generate scenario implications
   * @param {Object} scenario - Scenario object
   * @returns {Array} Scenario implications
   * @private
   */
  _generateScenarioImplications(scenario) {
    const implications = [];
    
    // ASX 200 implication
    if (scenario.marketImpact.asx200 >= 0) {
      implications.push('The ASX 200 is expected to remain stable or show slight gains.');
    } else if (scenario.marketImpact.asx200 > -5) {
      implications.push('The ASX 200 is expected to experience mild losses.');
    } else if (scenario.marketImpact.asx200 > -10) {
      implications.push('The ASX 200 is expected to experience moderate losses.');
    } else {
      implications.push('The ASX 200 is expected to experience significant losses.');
    }
    
    // AUD/USD implication
    if (scenario.marketImpact.usdaud <= 0) {
      implications.push('The Australian Dollar is expected to remain stable or strengthen against the US Dollar.');
    } else if (scenario.marketImpact.usdaud < 5) {
      implications.push('The Australian Dollar is expected to weaken slightly against the US Dollar.');
    } else if (scenario.marketImpact.usdaud < 10) {
      implications.push('The Australian Dollar is expected to weaken moderately against the US Dollar.');
    } else {
      implications.push('The Australian Dollar is expected to weaken significantly against the US Dollar.');
    }
    
    // Sector implications
    const sectorImpacts = Object.entries(this.sectorImpacts).map(([sector, impacts]) => ({
      sector,
      impact: impacts[scenario.id]
    })).sort((a, b) => a.impact - b.impact);
    
    // Most negatively impacted sectors
    const worstSectors = sectorImpacts.slice(0, 3);
    implications.push(`The most negatively impacted sectors are expected to be ${worstSectors.map(s => s.sector).join(', ')}.`);
    
    // Least negatively impacted sectors
    const bestSectors = sectorImpacts.slice(-3).reverse();
    implications.push(`The least negatively impacted sectors are expected to be ${bestSectors.map(s => s.sector).join(', ')}.`);
    
    // Trading strategy implication
    if (scenario.probability >= 0.3) {
      implications.push('Given the higher probability of this scenario, consider positioning your portfolio accordingly.');
    } else {
      implications.push('Given the lower probability of this scenario, consider hedging strategies rather than full portfolio repositioning.');
    }
    
    return implications;
  }
  
  /**
   * Generate market comparison summary
   * @param {Object} scenario1 - First scenario
   * @param {Object} scenario2 - Second scenario
   * @returns {string} Comparison summary
   * @private
   */
  _generateMarketComparisonSummary(scenario1, scenario2) {
    const asx200Diff = scenario2.marketImpact.asx200 - scenario1.marketImpact.asx200;
    const usdaudDiff = scenario2.marketImpact.usdaud - scenario1.marketImpact.usdaud;
    
    let summary = `Comparing "${scenario2.name}" to "${scenario1.name}", `;
    
    if (asx200Diff >= 0) {
      summary += `the ASX 200 is expected to perform ${asx200Diff === 0 ? 'similarly' : 'better by ' + asx200Diff.toFixed(1) + '%'}. `;
    } else {
      summary += `the ASX 200 is expected to perform worse by ${Math.abs(asx200Diff).toFixed(1)}%. `;
    }
    
    if (usdaudDiff <= 0) {
      summary += `The Australian Dollar is expected to perform ${usdaudDiff === 0 ? 'similarly' : 'better by ' + Math.abs(usdaudDiff).toFixed(1) + '%'} against the US Dollar. `;
    } else {
      summary += `The Australian Dollar is expected to perform worse by ${usdaudDiff.toFixed(1)}% against the US Dollar. `;
    }
    
    summary += `The probability difference between these scenarios is ${Math.abs(scenario2.probability - scenario1.probability) * 100}%.`;
    
    return summary;
  }
  
  /**
   * Generate sector comparison summary
   * @param {Object} scenario1 - First scenario
   * @param {Object} scenario2 - Second scenario
   * @returns {string} Comparison summary
   * @private
   */
  _generateSectorComparisonSummary(scenario1, scenario2) {
    // Calculate sector impact differences
    const sectorDiffs = Object.entries(this.sectorImpacts).map(([sector, impacts]) => ({
      sector,
      diff: impacts[scenario2.id] - impacts[scenario1.id]
    }));
    
    // Sort by difference
    sectorDiffs.sort((a, b) => a.diff - b.diff);
    
    // Get most negatively impacted sectors
    const worstSectors = sectorDiffs.slice(0, 3);
    
    // Get least negatively impacted sectors
    const bestSectors = sectorDiffs.slice(-3).reverse();
    
    let summary = `Comparing "${scenario2.name}" to "${scenario1.name}", `;
    
    summary += `the sectors with the largest negative impact difference are ${worstSectors.map(s => `${s.sector} (${s.diff >= 0 ? '+' : ''}${s.diff.toFixed(1)}%)`).join(', ')}. `;
    
    summary += `The sectors with the smallest negative impact difference are ${bestSectors.map(s => `${s.sector} (${s.diff >= 0 ? '+' : ''}${s.diff.toFixed(1)}%)`).join(', ')}.`;
    
    return summary;
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

export default ScenarioAnalysisTools;
