/**
 * Global Supply Chain Data Integration for Trump Tariff Analysis Website
 * 
 * This module provides functionality for analyzing global supply chain impacts
 * of Trump tariffs on Australian companies.
 */

class GlobalSupplyChainData {
  constructor() {
    this.supplyChainData = {};
    this.countryData = {};
    this.productData = {};
    this.companySupplyChains = {};
    
    // Initialize
    this._initialize();
  }
  
  /**
   * Initialize global supply chain data
   * @private
   */
  _initialize() {
    // Load data
    this._loadCountryData();
    this._loadProductData();
    this._loadSupplyChainData();
    this._loadCompanySupplyChains();
    
    // Register event listeners
    document.addEventListener('DOMContentLoaded', () => {
      this._setupUI();
    });
  }
  
  /**
   * Load country data
   * @private
   */
  _loadCountryData() {
    // In a real implementation, this would load from an API or database
    // This is a simplified version with sample data
    
    this.countryData = {
      'AUS': {
        name: 'Australia',
        region: 'Oceania',
        gdp: 1.4, // Trillion USD
        tradeWithUS: 65.1, // Billion USD
        tradeWithChina: 235.7, // Billion USD
        tariffExposure: 'Medium',
        keyExports: ['Iron Ore', 'Coal', 'Natural Gas', 'Beef', 'Wheat', 'Wine'],
        keyImports: ['Machinery', 'Vehicles', 'Electronics', 'Pharmaceuticals', 'Refined Petroleum']
      },
      'CHN': {
        name: 'China',
        region: 'Asia',
        gdp: 17.7, // Trillion USD
        tradeWithUS: 690.6, // Billion USD
        tradeWithAUS: 235.7, // Billion USD
        tariffExposure: 'Very High',
        keyExports: ['Electronics', 'Machinery', 'Furniture', 'Textiles', 'Plastics'],
        keyImports: ['Iron Ore', 'Crude Oil', 'Semiconductors', 'Soybeans', 'Natural Gas']
      },
      'USA': {
        name: 'United States',
        region: 'North America',
        gdp: 25.5, // Trillion USD
        tradeWithChina: 690.6, // Billion USD
        tradeWithAUS: 65.1, // Billion USD
        tariffExposure: 'High',
        keyExports: ['Machinery', 'Electronics', 'Aircraft', 'Vehicles', 'Pharmaceuticals'],
        keyImports: ['Electronics', 'Machinery', 'Vehicles', 'Pharmaceuticals', 'Furniture']
      },
      'JPN': {
        name: 'Japan',
        region: 'Asia',
        gdp: 4.9, // Trillion USD
        tradeWithUS: 217.6, // Billion USD
        tradeWithChina: 317.5, // Billion USD
        tradeWithAUS: 88.2, // Billion USD
        tariffExposure: 'Medium-High',
        keyExports: ['Vehicles', 'Machinery', 'Electronics', 'Steel', 'Chemicals'],
        keyImports: ['Crude Oil', 'LNG', 'Coal', 'Electronics', 'Pharmaceuticals']
      },
      'KOR': {
        name: 'South Korea',
        region: 'Asia',
        gdp: 1.8, // Trillion USD
        tradeWithUS: 171.9, // Billion USD
        tradeWithChina: 240.3, // Billion USD
        tradeWithAUS: 41.5, // Billion USD
        tariffExposure: 'Medium-High',
        keyExports: ['Electronics', 'Vehicles', 'Ships', 'Machinery', 'Plastics'],
        keyImports: ['Crude Oil', 'Electronics', 'Machinery', 'Natural Gas', 'Coal']
      },
      'DEU': {
        name: 'Germany',
        region: 'Europe',
        gdp: 4.3, // Trillion USD
        tradeWithUS: 204.8, // Billion USD
        tradeWithChina: 245.9, // Billion USD
        tradeWithAUS: 22.3, // Billion USD
        tariffExposure: 'Medium',
        keyExports: ['Vehicles', 'Machinery', 'Pharmaceuticals', 'Electronics', 'Aircraft'],
        keyImports: ['Machinery', 'Electronics', 'Vehicles', 'Pharmaceuticals', 'Crude Oil']
      },
      'VNM': {
        name: 'Vietnam',
        region: 'Asia',
        gdp: 0.4, // Trillion USD
        tradeWithUS: 111.8, // Billion USD
        tradeWithChina: 165.8, // Billion USD
        tradeWithAUS: 15.6, // Billion USD
        tariffExposure: 'High',
        keyExports: ['Electronics', 'Textiles', 'Footwear', 'Machinery', 'Seafood'],
        keyImports: ['Electronics', 'Machinery', 'Textiles', 'Plastics', 'Iron and Steel']
      },
      'MYS': {
        name: 'Malaysia',
        region: 'Asia',
        gdp: 0.4, // Trillion USD
        tradeWithUS: 69.6, // Billion USD
        tradeWithChina: 124.0, // Billion USD
        tradeWithAUS: 21.8, // Billion USD
        tariffExposure: 'Medium-High',
        keyExports: ['Electronics', 'Petroleum Products', 'Palm Oil', 'Rubber', 'Chemicals'],
        keyImports: ['Electronics', 'Machinery', 'Petroleum Products', 'Plastics', 'Iron and Steel']
      },
      'THA': {
        name: 'Thailand',
        region: 'Asia',
        gdp: 0.5, // Trillion USD
        tradeWithUS: 62.5, // Billion USD
        tradeWithChina: 103.9, // Billion USD
        tradeWithAUS: 19.2, // Billion USD
        tariffExposure: 'Medium-High',
        keyExports: ['Electronics', 'Vehicles', 'Machinery', 'Rubber', 'Plastics'],
        keyImports: ['Machinery', 'Electronics', 'Crude Oil', 'Chemicals', 'Iron and Steel']
      },
      'IND': {
        name: 'India',
        region: 'Asia',
        gdp: 3.5, // Trillion USD
        tradeWithUS: 146.1, // Billion USD
        tradeWithChina: 115.4, // Billion USD
        tradeWithAUS: 30.7, // Billion USD
        tariffExposure: 'Medium',
        keyExports: ['Petroleum Products', 'Pharmaceuticals', 'Jewelry', 'Vehicles', 'Machinery'],
        keyImports: ['Crude Oil', 'Gold', 'Electronics', 'Machinery', 'Chemicals']
      }
    };
  }
  
  /**
   * Load product data
   * @private
   */
  _loadProductData() {
    // In a real implementation, this would load from an API or database
    // This is a simplified version with sample data
    
    this.productData = {
      'Iron Ore': {
        category: 'Raw Materials',
        tariffSensitivity: 'High',
        keyProducers: ['AUS', 'BRA', 'CHN', 'IND'],
        keyConsumers: ['CHN', 'JPN', 'KOR', 'DEU'],
        australianExporters: ['BHP.AX', 'RIO.AX', 'FMG.AX', 'MIN.AX'],
        tariffImpact: 'Direct impact on Australian miners if China retaliates with tariffs or reduces imports due to economic slowdown'
      },
      'Coal': {
        category: 'Energy',
        tariffSensitivity: 'Medium-High',
        keyProducers: ['CHN', 'IND', 'USA', 'AUS', 'IDN'],
        keyConsumers: ['CHN', 'IND', 'JPN', 'KOR', 'DEU'],
        australianExporters: ['WHC.AX', 'YAL.AX', 'NHC.AX'],
        tariffImpact: 'Moderate impact if global economic slowdown reduces energy demand'
      },
      'Natural Gas': {
        category: 'Energy',
        tariffSensitivity: 'Medium',
        keyProducers: ['USA', 'RUS', 'QAT', 'AUS', 'IRN'],
        keyConsumers: ['CHN', 'JPN', 'KOR', 'DEU', 'ITA'],
        australianExporters: ['WDS.AX', 'STO.AX', 'ORG.AX'],
        tariffImpact: 'Potential impact if US-China trade tensions affect global LNG demand'
      },
      'Beef': {
        category: 'Agriculture',
        tariffSensitivity: 'Medium-High',
        keyProducers: ['USA', 'BRA', 'AUS', 'ARG', 'MEX'],
        keyConsumers: ['USA', 'CHN', 'JPN', 'KOR', 'RUS'],
        australianExporters: ['AAC.AX', 'ELD.AX'],
        tariffImpact: 'Significant impact if China imposes retaliatory tariffs on Australian beef'
      },
      'Wine': {
        category: 'Agriculture',
        tariffSensitivity: 'High',
        keyProducers: ['ITA', 'FRA', 'ESP', 'USA', 'AUS'],
        keyConsumers: ['USA', 'CHN', 'GBR', 'DEU', 'FRA'],
        australianExporters: ['TWE.AX'],
        tariffImpact: 'Very high impact - already experienced significant tariffs from China'
      },
      'Electronics': {
        category: 'Manufacturing',
        tariffSensitivity: 'Very High',
        keyProducers: ['CHN', 'KOR', 'JPN', 'USA', 'TWN'],
        keyConsumers: ['USA', 'CHN', 'DEU', 'JPN', 'IND'],
        australianImporters: ['JBH.AX', 'WES.AX'],
        tariffImpact: 'Significant impact on retailers if tariffs increase import costs'
      },
      'Machinery': {
        category: 'Manufacturing',
        tariffSensitivity: 'High',
        keyProducers: ['CHN', 'DEU', 'USA', 'JPN', 'ITA'],
        keyConsumers: ['USA', 'CHN', 'DEU', 'JPN', 'FRA'],
        australianImporters: ['WES.AX', 'BXB.AX', 'TCL.AX'],
        tariffImpact: 'Moderate impact on industrial companies if equipment costs rise'
      },
      'Pharmaceuticals': {
        category: 'Healthcare',
        tariffSensitivity: 'Medium',
        keyProducers: ['USA', 'CHE', 'DEU', 'CHN', 'IND'],
        keyConsumers: ['USA', 'CHN', 'JPN', 'DEU', 'FRA'],
        australianCompanies: ['CSL.AX', 'RMD.AX', 'COH.AX'],
        tariffImpact: 'Limited direct impact as healthcare typically faces fewer tariffs'
      },
      'Vehicles': {
        category: 'Manufacturing',
        tariffSensitivity: 'Very High',
        keyProducers: ['CHN', 'USA', 'JPN', 'DEU', 'KOR'],
        keyConsumers: ['USA', 'CHN', 'DEU', 'JPN', 'GBR'],
        australianImporters: ['APE.AX', 'ECX.AX'],
        tariffImpact: 'High impact on auto retailers if vehicle import costs increase'
      },
      'Textiles': {
        category: 'Manufacturing',
        tariffSensitivity: 'Very High',
        keyProducers: ['CHN', 'IND', 'VNM', 'BGD', 'TUR'],
        keyConsumers: ['USA', 'DEU', 'JPN', 'GBR', 'FRA'],
        australianImporters: ['WES.AX', 'MYR.AX', 'PMV.AX'],
        tariffImpact: 'Significant impact on retailers if clothing import costs increase'
      }
    };
  }
  
  /**
   * Load supply chain data
   * @private
   */
  _loadSupplyChainData() {
    // In a real implementation, this would load from an API or database
    // This is a simplified version with sample data
    
    this.supplyChainData = {
      'AUS-CHN': {
        tradeVolume: 235.7, // Billion USD
        keyProducts: ['Iron Ore', 'Coal', 'Natural Gas', 'Beef', 'Wine'],
        tariffExposure: 'Very High',
        supplyChainRisk: 'High',
        impactedAustralianCompanies: ['BHP.AX', 'RIO.AX', 'FMG.AX', 'MIN.AX', 'TWE.AX', 'AAC.AX'],
        tariffImpact: 'Direct impact on Australian exporters if China imposes retaliatory tariffs'
      },
      'AUS-USA': {
        tradeVolume: 65.1, // Billion USD
        keyProducts: ['Beef', 'Pharmaceuticals', 'Wine', 'Machinery'],
        tariffExposure: 'Medium',
        supplyChainRisk: 'Medium',
        impactedAustralianCompanies: ['CSL.AX', 'RMD.AX', 'COH.AX', 'TWE.AX'],
        tariffImpact: 'Moderate impact on Australian exporters to the US market'
      },
      'CHN-USA': {
        tradeVolume: 690.6, // Billion USD
        keyProducts: ['Electronics', 'Machinery', 'Furniture', 'Textiles', 'Plastics'],
        tariffExposure: 'Very High',
        supplyChainRisk: 'Very High',
        impactedAustralianCompanies: ['JBH.AX', 'WES.AX', 'MYR.AX', 'PMV.AX'],
        tariffImpact: 'Significant indirect impact on Australian retailers importing Chinese goods'
      },
      'AUS-JPN': {
        tradeVolume: 88.2, // Billion USD
        keyProducts: ['Iron Ore', 'Coal', 'Natural Gas', 'Beef'],
        tariffExposure: 'Low',
        supplyChainRisk: 'Low',
        impactedAustralianCompanies: ['BHP.AX', 'RIO.AX', 'WDS.AX', 'STO.AX'],
        tariffImpact: 'Limited direct impact, but potential benefit if Japan shifts from US suppliers'
      },
      'AUS-KOR': {
        tradeVolume: 41.5, // Billion USD
        keyProducts: ['Iron Ore', 'Coal', 'Natural Gas', 'Beef'],
        tariffExposure: 'Low',
        supplyChainRisk: 'Low',
        impactedAustralianCompanies: ['BHP.AX', 'RIO.AX', 'WDS.AX', 'STO.AX'],
        tariffImpact: 'Limited direct impact, but potential benefit if Korea shifts from US suppliers'
      },
      'CHN-VNM': {
        tradeVolume: 165.8, // Billion USD
        keyProducts: ['Electronics', 'Machinery', 'Textiles', 'Plastics'],
        tariffExposure: 'High',
        supplyChainRisk: 'High',
        impactedAustralianCompanies: ['JBH.AX', 'WES.AX', 'MYR.AX'],
        tariffImpact: 'Potential impact on Australian retailers if Vietnam production costs increase'
      },
      'USA-VNM': {
        tradeVolume: 111.8, // Billion USD
        keyProducts: ['Electronics', 'Textiles', 'Footwear', 'Furniture'],
        tariffExposure: 'Medium-High',
        supplyChainRisk: 'Medium-High',
        impactedAustralianCompanies: ['JBH.AX', 'WES.AX', 'MYR.AX'],
        tariffImpact: 'Potential impact on Australian retailers if Vietnam production costs increase'
      },
      'AUS-IND': {
        tradeVolume: 30.7, // Billion USD
        keyProducts: ['Coal', 'Education', 'Vegetables', 'Gold'],
        tariffExposure: 'Low',
        supplyChainRisk: 'Low',
        impactedAustralianCompanies: ['WHC.AX', 'YAL.AX', 'NHC.AX'],
        tariffImpact: 'Limited direct impact, but potential benefit if India shifts from US suppliers'
      }
    };
  }
  
  /**
   * Load company supply chains
   * @private
   */
  _loadCompanySupplyChains() {
    // In a real implementation, this would load from an API or database
    // This is a simplified version with sample data
    
    this.companySupplyChains = {
      'BHP.AX': {
        name: 'BHP Group',
        sector: 'Materials',
        keyProducts: ['Iron Ore', 'Coal', 'Copper', 'Petroleum'],
        keyMarkets: ['CHN', 'JPN', 'KOR', 'IND'],
        supplyChainExposure: {
          'CHN': 'Very High',
          'USA': 'Medium',
          'JPN': 'High',
          'KOR': 'Medium-High',
          'IND': 'Medium'
        },
        tariffImpact: 'High direct impact if China imposes retaliatory tariffs on Australian iron ore or coal',
        supplyChainRisk: 'High',
        mitigationStrategies: 'Diversifying customer base, focusing on premium products, cost reduction'
      },
      'RIO.AX': {
        name: 'Rio Tinto',
        sector: 'Materials',
        keyProducts: ['Iron Ore', 'Aluminum', 'Copper', 'Diamonds'],
        keyMarkets: ['CHN', 'JPN', 'USA', 'EUR'],
        supplyChainExposure: {
          'CHN': 'Very High',
          'USA': 'Medium',
          'JPN': 'Medium-High',
          'EUR': 'Medium'
        },
        tariffImpact: 'High direct impact if China imposes retaliatory tariffs on Australian iron ore',
        supplyChainRisk: 'High',
        mitigationStrategies: 'Operational efficiency, diversifying product portfolio, focus on ESG'
      },
      'FMG.AX': {
        name: 'Fortescue Metals',
        sector: 'Materials',
        keyProducts: ['Iron Ore'],
        keyMarkets: ['CHN', 'JPN', 'KOR', 'TWN'],
        supplyChainExposure: {
          'CHN': 'Very High',
          'JPN': 'Medium',
          'KOR': 'Medium',
          'TWN': 'Low'
        },
        tariffImpact: 'Very high direct impact if China imposes retaliatory tariffs on Australian iron ore',
        supplyChainRisk: 'Very High',
        mitigationStrategies: 'Cost leadership, green hydrogen initiatives, diversification into renewable energy'
      },
      'TWE.AX': {
        name: 'Treasury Wine Estates',
        sector: 'Consumer Staples',
        keyProducts: ['Wine'],
        keyMarkets: ['CHN', 'USA', 'AUS', 'GBR'],
        supplyChainExposure: {
          'CHN': 'Very High',
          'USA': 'High',
          'AUS': 'Medium',
          'GBR': 'Medium'
        },
        tariffImpact: 'Already experiencing significant impact from Chinese tariffs, vulnerable to US tariffs',
        supplyChainRisk: 'Very High',
        mitigationStrategies: 'Market diversification, premium brand positioning, direct-to-consumer channels'
      },
      'JBH.AX': {
        name: 'JB Hi-Fi',
        sector: 'Consumer Discretionary',
        keyProducts: ['Electronics', 'Home Appliances'],
        keySuppliers: ['CHN', 'KOR', 'JPN', 'VNM'],
        supplyChainExposure: {
          'CHN': 'Very High',
          'KOR': 'High',
          'JPN': 'Medium',
          'VNM': 'Medium-High'
        },
        tariffImpact: 'High indirect impact if tariffs increase costs of imported electronics',
        supplyChainRisk: 'High',
        mitigationStrategies: 'Supplier diversification, inventory management, passing costs to consumers'
      },
      'WES.AX': {
        name: 'Wesfarmers',
        sector: 'Consumer Discretionary',
        keyProducts: ['Retail', 'Chemicals', 'Fertilizers'],
        keySuppliers: ['CHN', 'IND', 'VNM', 'BGD'],
        supplyChainExposure: {
          'CHN': 'High',
          'IND': 'Medium',
          'VNM': 'Medium-High',
          'BGD': 'Medium'
        },
        tariffImpact: 'Moderate indirect impact across diverse retail categories',
        supplyChainRisk: 'Medium-High',
        mitigationStrategies: 'Supplier diversification, vertical integration, private label expansion'
      },
      'CSL.AX': {
        name: 'CSL Limited',
        sector: 'Healthcare',
        keyProducts: ['Plasma Products', 'Vaccines', 'Pharmaceuticals'],
        keyMarkets: ['USA', 'EUR', 'CHN', 'AUS'],
        supplyChainExposure: {
          'USA': 'Very High',
          'EUR': 'High',
          'CHN': 'Medium',
          'AUS': 'Medium'
        },
        tariffImpact: 'Limited direct impact as healthcare typically faces fewer tariffs',
        supplyChainRisk: 'Low',
        mitigationStrategies: 'R&D investment, manufacturing in key markets, regulatory compliance'
      },
      'WDS.AX': {
        name: 'Woodside Energy',
        sector: 'Energy',
        keyProducts: ['LNG', 'Natural Gas', 'Oil'],
        keyMarkets: ['CHN', 'JPN', 'KOR', 'IND'],
        supplyChainExposure: {
          'CHN': 'High',
          'JPN': 'High',
          'KOR': 'Medium-High',
          'IND': 'Medium'
        },
        tariffImpact: 'Moderate impact if global economic slowdown reduces energy demand',
        supplyChainRisk: 'Medium',
        mitigationStrategies: 'Long-term contracts, operational efficiency, clean energy transition'
      },
      'CBA.AX': {
        name: 'Commonwealth Bank',
        sector: 'Financials',
        keyProducts: ['Banking', 'Financial Services'],
        keyMarkets: ['AUS', 'NZL', 'ASI'],
        supplyChainExposure: {
          'CHN': 'Medium',
          'USA': 'Medium',
          'AUS': 'Very High'
        },
        tariffImpact: 'Indirect impact through exposure to affected sectors and economic slowdown',
        supplyChainRisk: 'Medium',
        mitigationStrategies: 'Diversified lending, stress testing, digital transformation'
      },
      'QAN.AX': {
        name: 'Qantas Airways',
        sector: 'Industrials',
        keyProducts: ['Passenger Transport', 'Freight', 'Loyalty Programs'],
        keyMarkets: ['AUS', 'ASI', 'USA', 'EUR'],
        supplyChainExposure: {
          'USA': 'High',
          'CHN': 'Medium-High',
          'AUS': 'Very High'
        },
        tariffImpact: 'Indirect impact through reduced business travel and tourism if trade tensions escalate',
        supplyChainRisk: 'Medium-High',
        mitigationStrategies: 'Route optimization, fleet modernization, domestic focus'
      }
    };
  }
  
  /**
   * Setup UI
   * @private
   */
  _setupUI() {
    // Check if supply chain container exists
    const container = document.getElementById('supply-chain-container');
    if (!container) return;
    
    // Create supply chain UI
    this._createSupplyChainUI(container);
  }
  
  /**
   * Create supply chain UI
   * @param {HTMLElement} container - Container element
   * @private
   */
  _createSupplyChainUI(container) {
    // Create tabs
    container.innerHTML = `
      <div class="supply-chain-header">
        <h2>Global Supply Chain Analysis</h2>
        <p class="supply-chain-description">Analyze how Trump tariffs impact global supply chains and Australian companies</p>
      </div>
      <div class="supply-chain-tabs">
        <button class="supply-chain-tab active" data-tab="overview">Overview</button>
        <button class="supply-chain-tab" data-tab="country-analysis">Country Analysis</button>
        <button class="supply-chain-tab" data-tab="product-analysis">Product Analysis</button>
        <button class="supply-chain-tab" data-tab="company-analysis">Company Analysis</button>
      </div>
      <div class="supply-chain-content" id="supply-chain-content">
        ${this._generateOverviewTabContent()}
      </div>
    `;
    
    // Add tab event listeners
    container.querySelectorAll('.supply-chain-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active state
        container.querySelectorAll('.supply-chain-tab').forEach(t => {
          t.classList.remove('active');
        });
        tab.classList.add('active');
        
        // Update tab content
        const tabName = tab.getAttribute('data-tab');
        const tabContent = document.getElementById('supply-chain-content');
        
        switch (tabName) {
          case 'overview':
            tabContent.innerHTML = this._generateOverviewTabContent();
            break;
          case 'country-analysis':
            tabContent.innerHTML = this._generateCountryAnalysisTabContent();
            this._setupCountryAnalysisFilters();
            break;
          case 'product-analysis':
            tabContent.innerHTML = this._generateProductAnalysisTabContent();
            this._setupProductAnalysisFilters();
            break;
          case 'company-analysis':
            tabContent.innerHTML = this._generateCompanyAnalysisTabContent();
            this._setupCompanyAnalysisFilters();
            break;
        }
      });
    });
  }
  
  /**
   * Generate overview tab content
   * @returns {string} Tab content HTML
   * @private
   */
  _generateOverviewTabContent() {
    return `
      <div class="supply-chain-overview">
        <div class="overview-section">
          <h3>Global Supply Chain Impact Summary</h3>
          <div class="impact-summary">
            <div class="impact-card">
              <div class="impact-icon">🌏</div>
              <div class="impact-title">US-China Trade</div>
              <div class="impact-value">$690.6B</div>
              <div class="impact-description">Annual trade volume potentially affected by tariffs</div>
            </div>
            <div class="impact-card">
              <div class="impact-icon">🇦🇺</div>
              <div class="impact-title">Australia-China Trade</div>
              <div class="impact-value">$235.7B</div>
              <div class="impact-description">Annual trade volume at risk from potential retaliation</div>
            </div>
            <div class="impact-card">
              <div class="impact-icon">⛓️</div>
              <div class="impact-title">Supply Chain Risk</div>
              <div class="impact-value high-risk">High</div>
              <div class="impact-description">Overall risk level for Australian companies</div>
            </div>
            <div class="impact-card">
              <div class="impact-icon">📊</div>
              <div class="impact-title">ASX Exposure</div>
              <div class="impact-value medium-high-risk">Medium-High</div>
              <div class="impact-description">Exposure level of ASX-listed companies</div>
            </div>
          </div>
        </div>
        
        <div class="overview-section">
          <h3>Key Supply Chain Vulnerabilities</h3>
          <div class="vulnerabilities-chart">
            <canvas id="vulnerabilities-chart"></canvas>
          </div>
          <div class="vulnerabilities-legend">
            <div class="legend-item">
              <div class="legend-color" style="background-color: rgba(231, 76, 60, 0.7);"></div>
              <div class="legend-label">Very High Risk</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: rgba(230, 126, 34, 0.7);"></div>
              <div class="legend-label">High Risk</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: rgba(241, 196, 15, 0.7);"></div>
              <div class="legend-label">Medium Risk</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: rgba(46, 204, 113, 0.7);"></div>
              <div class="legend-label">Low Risk</div>
            </div>
          </div>
        </div>
        
        <div class="overview-section">
          <h3>Most Exposed Australian Companies</h3>
          <div class="exposed-companies">
            <table class="companies-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Sector</th>
                  <th>China Exposure</th>
                  <th>US Exposure</th>
                  <th>Supply Chain Risk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>FMG.AX</td>
                  <td>Materials</td>
                  <td class="very-high-risk">Very High</td>
                  <td class="low-risk">Low</td>
                  <td class="very-high-risk">Very High</td>
                </tr>
                <tr>
                  <td>TWE.AX</td>
                  <td>Consumer Staples</td>
                  <td class="very-high-risk">Very High</td>
                  <td class="high-risk">High</td>
                  <td class="very-high-risk">Very High</td>
                </tr>
                <tr>
                  <td>BHP.AX</td>
                  <td>Materials</td>
                  <td class="very-high-risk">Very High</td>
                  <td class="medium-risk">Medium</td>
                  <td class="high-risk">High</td>
                </tr>
                <tr>
                  <td>RIO.AX</td>
                  <td>Materials</td>
                  <td class="very-high-risk">Very High</td>
                  <td class="medium-risk">Medium</td>
                  <td class="high-risk">High</td>
                </tr>
                <tr>
                  <td>JBH.AX</td>
                  <td>Consumer Discretionary</td>
                  <td class="very-high-risk">Very High</td>
                  <td class="medium-risk">Medium</td>
                  <td class="high-risk">High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="overview-section">
          <h3>Key Supply Chain Routes Affected</h3>
          <div class="supply-routes">
            <table class="routes-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Trade Volume</th>
                  <th>Key Products</th>
                  <th>Tariff Exposure</th>
                  <th>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>China-US</td>
                  <td>$690.6B</td>
                  <td>Electronics, Machinery, Textiles</td>
                  <td class="very-high-risk">Very High</td>
                  <td class="very-high-risk">Very High</td>
                </tr>
                <tr>
                  <td>Australia-China</td>
                  <td>$235.7B</td>
                  <td>Iron Ore, Coal, Wine, Beef</td>
                  <td class="very-high-risk">Very High</td>
                  <td class="high-risk">High</td>
                </tr>
                <tr>
                  <td>China-Vietnam</td>
                  <td>$165.8B</td>
                  <td>Electronics, Machinery, Textiles</td>
                  <td class="high-risk">High</td>
                  <td class="high-risk">High</td>
                </tr>
                <tr>
                  <td>US-Vietnam</td>
                  <td>$111.8B</td>
                  <td>Electronics, Textiles, Footwear</td>
                  <td class="medium-high-risk">Medium-High</td>
                  <td class="medium-high-risk">Medium-High</td>
                </tr>
                <tr>
                  <td>Australia-Japan</td>
                  <td>$88.2B</td>
                  <td>Iron Ore, Coal, Natural Gas</td>
                  <td class="low-risk">Low</td>
                  <td class="low-risk">Low</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate country analysis tab content
   * @returns {string} Tab content HTML
   * @private
   */
  _generateCountryAnalysisTabContent() {
    return `
      <div class="country-analysis">
        <div class="analysis-filters">
          <div class="filter-group">
            <label for="country-region-filter">Region:</label>
            <select id="country-region-filter" class="filter-select">
              <option value="all">All Regions</option>
              <option value="Asia">Asia</option>
              <option value="Oceania">Oceania</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="country-exposure-filter">Tariff Exposure:</label>
            <select id="country-exposure-filter" class="filter-select">
              <option value="all">All Exposure Levels</option>
              <option value="Very High">Very High</option>
              <option value="High">High</option>
              <option value="Medium-High">Medium-High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="country-sort-filter">Sort By:</label>
            <select id="country-sort-filter" class="filter-select">
              <option value="name">Country Name</option>
              <option value="tradeWithChina">Trade with China</option>
              <option value="tradeWithUS">Trade with US</option>
              <option value="tradeWithAUS">Trade with Australia</option>
              <option value="tariffExposure">Tariff Exposure</option>
            </select>
          </div>
        </div>
        
        <div class="country-list" id="country-list">
          ${Object.entries(this.countryData).map(([code, country]) => `
            <div class="country-card" data-code="${code}" data-region="${country.region}" data-exposure="${country.tariffExposure}">
              <div class="country-header">
                <h3>${country.name}</h3>
                <div class="country-exposure ${this._getRiskClass(country.tariffExposure)}">${country.tariffExposure}</div>
              </div>
              <div class="country-details">
                <div class="country-detail">
                  <div class="detail-label">Region:</div>
                  <div class="detail-value">${country.region}</div>
                </div>
                <div class="country-detail">
                  <div class="detail-label">GDP:</div>
                  <div class="detail-value">$${country.gdp} Trillion</div>
                </div>
                ${country.tradeWithUS ? `
                  <div class="country-detail">
                    <div class="detail-label">Trade with US:</div>
                    <div class="detail-value">$${country.tradeWithUS}B</div>
                  </div>
                ` : ''}
                ${country.tradeWithChina ? `
                  <div class="country-detail">
                    <div class="detail-label">Trade with China:</div>
                    <div class="detail-value">$${country.tradeWithChina}B</div>
                  </div>
                ` : ''}
                ${country.tradeWithAUS ? `
                  <div class="country-detail">
                    <div class="detail-label">Trade with Australia:</div>
                    <div class="detail-value">$${country.tradeWithAUS}B</div>
                  </div>
                ` : ''}
              </div>
              <div class="country-trade">
                <div class="trade-section">
                  <h4>Key Exports</h4>
                  <ul class="trade-list">
                    ${country.keyExports.slice(0, 3).map(product => `
                      <li>${product}</li>
                    `).join('')}
                  </ul>
                </div>
                <div class="trade-section">
                  <h4>Key Imports</h4>
                  <ul class="trade-list">
                    ${country.keyImports.slice(0, 3).map(product => `
                      <li>${product}</li>
                    `).join('')}
                  </ul>
                </div>
              </div>
              <button class="view-details-button" data-country="${code}">View Details</button>
            </div>
          `).join('')}
        </div>
        
        <div class="country-detail-modal" id="country-detail-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="modal-country-name"></h3>
              <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body" id="modal-country-details">
              <!-- Country details will be dynamically inserted here -->
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate product analysis tab content
   * @returns {string} Tab content HTML
   * @private
   */
  _generateProductAnalysisTabContent() {
    return `
      <div class="product-analysis">
        <div class="analysis-filters">
          <div class="filter-group">
            <label for="product-category-filter">Category:</label>
            <select id="product-category-filter" class="filter-select">
              <option value="all">All Categories</option>
              <option value="Raw Materials">Raw Materials</option>
              <option value="Energy">Energy</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="product-sensitivity-filter">Tariff Sensitivity:</label>
            <select id="product-sensitivity-filter" class="filter-select">
              <option value="all">All Sensitivity Levels</option>
              <option value="Very High">Very High</option>
              <option value="High">High</option>
              <option value="Medium-High">Medium-High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="product-sort-filter">Sort By:</label>
            <select id="product-sort-filter" class="filter-select">
              <option value="name">Product Name</option>
              <option value="category">Category</option>
              <option value="tariffSensitivity">Tariff Sensitivity</option>
            </select>
          </div>
        </div>
        
        <div class="product-list" id="product-list">
          ${Object.entries(this.productData).map(([name, product]) => `
            <div class="product-card" data-name="${name}" data-category="${product.category}" data-sensitivity="${product.tariffSensitivity}">
              <div class="product-header">
                <h3>${name}</h3>
                <div class="product-sensitivity ${this._getRiskClass(product.tariffSensitivity)}">${product.tariffSensitivity}</div>
              </div>
              <div class="product-details">
                <div class="product-detail">
                  <div class="detail-label">Category:</div>
                  <div class="detail-value">${product.category}</div>
                </div>
              </div>
              <div class="product-trade">
                <div class="trade-section">
                  <h4>Key Producers</h4>
                  <div class="country-tags">
                    ${product.keyProducers.slice(0, 4).map(country => `
                      <div class="country-tag">${country}</div>
                    `).join('')}
                  </div>
                </div>
                <div class="trade-section">
                  <h4>Key Consumers</h4>
                  <div class="country-tags">
                    ${product.keyConsumers.slice(0, 4).map(country => `
                      <div class="country-tag">${country}</div>
                    `).join('')}
                  </div>
                </div>
              </div>
              <div class="product-companies">
                <h4>Australian Companies</h4>
                <div class="company-tags">
                  ${(product.australianExporters || product.australianImporters || product.australianCompanies || []).slice(0, 4).map(company => `
                    <div class="company-tag">${company}</div>
                  `).join('')}
                </div>
              </div>
              <div class="product-impact">
                <h4>Tariff Impact</h4>
                <p>${product.tariffImpact}</p>
              </div>
              <button class="view-details-button" data-product="${name}">View Details</button>
            </div>
          `).join('')}
        </div>
        
        <div class="product-detail-modal" id="product-detail-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="modal-product-name"></h3>
              <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body" id="modal-product-details">
              <!-- Product details will be dynamically inserted here -->
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate company analysis tab content
   * @returns {string} Tab content HTML
   * @private
   */
  _generateCompanyAnalysisTabContent() {
    return `
      <div class="company-analysis">
        <div class="analysis-filters">
          <div class="filter-group">
            <label for="company-sector-filter">Sector:</label>
            <select id="company-sector-filter" class="filter-select">
              <option value="all">All Sectors</option>
              <option value="Materials">Materials</option>
              <option value="Energy">Energy</option>
              <option value="Financials">Financials</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Consumer Staples">Consumer Staples</option>
              <option value="Consumer Discretionary">Consumer Discretionary</option>
              <option value="Industrials">Industrials</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="company-risk-filter">Supply Chain Risk:</label>
            <select id="company-risk-filter" class="filter-select">
              <option value="all">All Risk Levels</option>
              <option value="Very High">Very High</option>
              <option value="High">High</option>
              <option value="Medium-High">Medium-High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="company-sort-filter">Sort By:</label>
            <select id="company-sort-filter" class="filter-select">
              <option value="name">Company Name</option>
              <option value="sector">Sector</option>
              <option value="supplyChainRisk">Supply Chain Risk</option>
            </select>
          </div>
        </div>
        
        <div class="company-list" id="company-list">
          ${Object.entries(this.companySupplyChains).map(([symbol, company]) => `
            <div class="company-card" data-symbol="${symbol}" data-sector="${company.sector}" data-risk="${company.supplyChainRisk}">
              <div class="company-header">
                <div class="company-title">
                  <h3>${symbol}</h3>
                  <div class="company-name">${company.name}</div>
                </div>
                <div class="company-risk ${this._getRiskClass(company.supplyChainRisk)}">${company.supplyChainRisk}</div>
              </div>
              <div class="company-details">
                <div class="company-detail">
                  <div class="detail-label">Sector:</div>
                  <div class="detail-value">${company.sector}</div>
                </div>
                <div class="company-detail">
                  <div class="detail-label">Key Products:</div>
                  <div class="detail-value">${company.keyProducts.slice(0, 2).join(', ')}</div>
                </div>
              </div>
              <div class="company-exposures">
                <h4>Market Exposures</h4>
                <div class="exposure-bars">
                  ${Object.entries(company.supplyChainExposure).slice(0, 3).map(([country, exposure]) => `
                    <div class="exposure-bar">
                      <div class="exposure-label">${country}:</div>
                      <div class="exposure-meter">
                        <div class="exposure-value ${this._getRiskClass(exposure)}" style="width: ${this._getExposureWidth(exposure)}%"></div>
                      </div>
                      <div class="exposure-text">${exposure}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
              <div class="company-impact">
                <h4>Tariff Impact</h4>
                <p>${company.tariffImpact.length > 100 ? company.tariffImpact.substring(0, 100) + '...' : company.tariffImpact}</p>
              </div>
              <button class="view-details-button" data-company="${symbol}">View Details</button>
            </div>
          `).join('')}
        </div>
        
        <div class="company-detail-modal" id="company-detail-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="modal-company-name"></h3>
              <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body" id="modal-company-details">
              <!-- Company details will be dynamically inserted here -->
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Setup country analysis filters
   * @private
   */
  _setupCountryAnalysisFilters() {
    const regionFilter = document.getElementById('country-region-filter');
    const exposureFilter = document.getElementById('country-exposure-filter');
    const sortFilter = document.getElementById('country-sort-filter');
    
    if (!regionFilter || !exposureFilter || !sortFilter) return;
    
    const filterCountries = () => {
      const region = regionFilter.value;
      const exposure = exposureFilter.value;
      
      const countryCards = document.querySelectorAll('#country-list .country-card');
      
      countryCards.forEach(card => {
        const cardRegion = card.getAttribute('data-region');
        const cardExposure = card.getAttribute('data-exposure');
        
        let showCard = true;
        
        if (region !== 'all' && cardRegion !== region) {
          showCard = false;
        }
        
        if (exposure !== 'all' && cardExposure !== exposure) {
          showCard = false;
        }
        
        card.style.display = showCard ? '' : 'none';
      });
    };
    
    const sortCountries = () => {
      const sortBy = sortFilter.value;
      const countryList = document.getElementById('country-list');
      const countryCards = Array.from(countryList.querySelectorAll('.country-card'));
      
      countryCards.sort((a, b) => {
        const codeA = a.getAttribute('data-code');
        const codeB = b.getAttribute('data-code');
        const countryA = this.countryData[codeA];
        const countryB = this.countryData[codeB];
        
        if (sortBy === 'name') {
          return countryA.name.localeCompare(countryB.name);
        } else if (sortBy === 'tradeWithChina') {
          return (countryB.tradeWithChina || 0) - (countryA.tradeWithChina || 0);
        } else if (sortBy === 'tradeWithUS') {
          return (countryB.tradeWithUS || 0) - (countryA.tradeWithUS || 0);
        } else if (sortBy === 'tradeWithAUS') {
          return (countryB.tradeWithAUS || 0) - (countryA.tradeWithAUS || 0);
        } else if (sortBy === 'tariffExposure') {
          return this._getExposureValue(countryB.tariffExposure) - this._getExposureValue(countryA.tariffExposure);
        }
        
        return 0;
      });
      
      countryCards.forEach(card => {
        countryList.appendChild(card);
      });
    };
    
    regionFilter.addEventListener('change', filterCountries);
    exposureFilter.addEventListener('change', filterCountries);
    sortFilter.addEventListener('change', sortCountries);
    
    // Setup view details buttons
    document.querySelectorAll('.view-details-button[data-country]').forEach(button => {
      button.addEventListener('click', () => {
        const countryCode = button.getAttribute('data-country');
        this._showCountryDetails(countryCode);
      });
    });
    
    // Setup modal close button
    document.querySelector('#country-detail-modal .close-modal').addEventListener('click', () => {
      document.getElementById('country-detail-modal').style.display = 'none';
    });
  }
  
  /**
   * Setup product analysis filters
   * @private
   */
  _setupProductAnalysisFilters() {
    const categoryFilter = document.getElementById('product-category-filter');
    const sensitivityFilter = document.getElementById('product-sensitivity-filter');
    const sortFilter = document.getElementById('product-sort-filter');
    
    if (!categoryFilter || !sensitivityFilter || !sortFilter) return;
    
    const filterProducts = () => {
      const category = categoryFilter.value;
      const sensitivity = sensitivityFilter.value;
      
      const productCards = document.querySelectorAll('#product-list .product-card');
      
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardSensitivity = card.getAttribute('data-sensitivity');
        
        let showCard = true;
        
        if (category !== 'all' && cardCategory !== category) {
          showCard = false;
        }
        
        if (sensitivity !== 'all' && cardSensitivity !== sensitivity) {
          showCard = false;
        }
        
        card.style.display = showCard ? '' : 'none';
      });
    };
    
    const sortProducts = () => {
      const sortBy = sortFilter.value;
      const productList = document.getElementById('product-list');
      const productCards = Array.from(productList.querySelectorAll('.product-card'));
      
      productCards.sort((a, b) => {
        const nameA = a.getAttribute('data-name');
        const nameB = b.getAttribute('data-name');
        const productA = this.productData[nameA];
        const productB = this.productData[nameB];
        
        if (sortBy === 'name') {
          return nameA.localeCompare(nameB);
        } else if (sortBy === 'category') {
          return productA.category.localeCompare(productB.category);
        } else if (sortBy === 'tariffSensitivity') {
          return this._getExposureValue(productB.tariffSensitivity) - this._getExposureValue(productA.tariffSensitivity);
        }
        
        return 0;
      });
      
      productCards.forEach(card => {
        productList.appendChild(card);
      });
    };
    
    categoryFilter.addEventListener('change', filterProducts);
    sensitivityFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', sortProducts);
    
    // Setup view details buttons
    document.querySelectorAll('.view-details-button[data-product]').forEach(button => {
      button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        this._showProductDetails(productName);
      });
    });
    
    // Setup modal close button
    document.querySelector('#product-detail-modal .close-modal').addEventListener('click', () => {
      document.getElementById('product-detail-modal').style.display = 'none';
    });
  }
  
  /**
   * Setup company analysis filters
   * @private
   */
  _setupCompanyAnalysisFilters() {
    const sectorFilter = document.getElementById('company-sector-filter');
    const riskFilter = document.getElementById('company-risk-filter');
    const sortFilter = document.getElementById('company-sort-filter');
    
    if (!sectorFilter || !riskFilter || !sortFilter) return;
    
    const filterCompanies = () => {
      const sector = sectorFilter.value;
      const risk = riskFilter.value;
      
      const companyCards = document.querySelectorAll('#company-list .company-card');
      
      companyCards.forEach(card => {
        const cardSector = card.getAttribute('data-sector');
        const cardRisk = card.getAttribute('data-risk');
        
        let showCard = true;
        
        if (sector !== 'all' && cardSector !== sector) {
          showCard = false;
        }
        
        if (risk !== 'all' && cardRisk !== risk) {
          showCard = false;
        }
        
        card.style.display = showCard ? '' : 'none';
      });
    };
    
    const sortCompanies = () => {
      const sortBy = sortFilter.value;
      const companyList = document.getElementById('company-list');
      const companyCards = Array.from(companyList.querySelectorAll('.company-card'));
      
      companyCards.sort((a, b) => {
        const symbolA = a.getAttribute('data-symbol');
        const symbolB = b.getAttribute('data-symbol');
        const companyA = this.companySupplyChains[symbolA];
        const companyB = this.companySupplyChains[symbolB];
        
        if (sortBy === 'name') {
          return companyA.name.localeCompare(companyB.name);
        } else if (sortBy === 'sector') {
          return companyA.sector.localeCompare(companyB.sector);
        } else if (sortBy === 'supplyChainRisk') {
          return this._getExposureValue(companyB.supplyChainRisk) - this._getExposureValue(companyA.supplyChainRisk);
        }
        
        return 0;
      });
      
      companyCards.forEach(card => {
        companyList.appendChild(card);
      });
    };
    
    sectorFilter.addEventListener('change', filterCompanies);
    riskFilter.addEventListener('change', filterCompanies);
    sortFilter.addEventListener('change', sortCompanies);
    
    // Setup view details buttons
    document.querySelectorAll('.view-details-button[data-company]').forEach(button => {
      button.addEventListener('click', () => {
        const companySymbol = button.getAttribute('data-company');
        this._showCompanyDetails(companySymbol);
      });
    });
    
    // Setup modal close button
    document.querySelector('#company-detail-modal .close-modal').addEventListener('click', () => {
      document.getElementById('company-detail-modal').style.display = 'none';
    });
  }
  
  /**
   * Show country details
   * @param {string} countryCode - Country code
   * @private
   */
  _showCountryDetails(countryCode) {
    const country = this.countryData[countryCode];
    if (!country) return;
    
    const modal = document.getElementById('country-detail-modal');
    const modalName = document.getElementById('modal-country-name');
    const modalDetails = document.getElementById('modal-country-details');
    
    modalName.textContent = country.name;
    
    // Find trade routes involving this country
    const tradeRoutes = Object.entries(this.supplyChainData)
      .filter(([route]) => route.includes(countryCode))
      .map(([route, data]) => ({ route, ...data }));
    
    modalDetails.innerHTML = `
      <div class="modal-section">
        <h4>Country Overview</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <div class="detail-label">Region:</div>
            <div class="detail-value">${country.region}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">GDP:</div>
            <div class="detail-value">$${country.gdp} Trillion</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Tariff Exposure:</div>
            <div class="detail-value ${this._getRiskClass(country.tariffExposure)}">${country.tariffExposure}</div>
          </div>
        </div>
      </div>
      
      <div class="modal-section">
        <h4>Trade Relationships</h4>
        <div class="detail-grid">
          ${country.tradeWithUS ? `
            <div class="detail-item">
              <div class="detail-label">Trade with US:</div>
              <div class="detail-value">$${country.tradeWithUS}B</div>
            </div>
          ` : ''}
          ${country.tradeWithChina ? `
            <div class="detail-item">
              <div class="detail-label">Trade with China:</div>
              <div class="detail-value">$${country.tradeWithChina}B</div>
            </div>
          ` : ''}
          ${country.tradeWithAUS ? `
            <div class="detail-item">
              <div class="detail-label">Trade with Australia:</div>
              <div class="detail-value">$${country.tradeWithAUS}B</div>
            </div>
          ` : ''}
        </div>
      </div>
      
      <div class="modal-section">
        <h4>Key Products</h4>
        <div class="product-columns">
          <div class="product-column">
            <h5>Key Exports</h5>
            <ul class="product-list">
              ${country.keyExports.map(product => `
                <li>${product}</li>
              `).join('')}
            </ul>
          </div>
          <div class="product-column">
            <h5>Key Imports</h5>
            <ul class="product-list">
              ${country.keyImports.map(product => `
                <li>${product}</li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
      
      ${tradeRoutes.length > 0 ? `
        <div class="modal-section">
          <h4>Trade Routes</h4>
          <table class="detail-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Trade Volume</th>
                <th>Key Products</th>
                <th>Tariff Exposure</th>
              </tr>
            </thead>
            <tbody>
              ${tradeRoutes.map(route => `
                <tr>
                  <td>${route.route}</td>
                  <td>$${route.tradeVolume}B</td>
                  <td>${route.keyProducts.slice(0, 3).join(', ')}</td>
                  <td class="${this._getRiskClass(route.tariffExposure)}">${route.tariffExposure}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}
      
      ${countryCode === 'AUS' ? `
        <div class="modal-section">
          <h4>Impacted Australian Companies</h4>
          <div class="company-grid">
            ${Object.entries(this.companySupplyChains).slice(0, 6).map(([symbol, company]) => `
              <div class="company-item">
                <div class="company-symbol">${symbol}</div>
                <div class="company-name">${company.name}</div>
                <div class="company-risk ${this._getRiskClass(company.supplyChainRisk)}">${company.supplyChainRisk}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      <div class="modal-section">
        <h4>Tariff Impact Analysis</h4>
        <div class="impact-analysis">
          ${this._generateCountryTariffImpact(countryCode)}
        </div>
      </div>
    `;
    
    modal.style.display = 'block';
  }
  
  /**
   * Show product details
   * @param {string} productName - Product name
   * @private
   */
  _showProductDetails(productName) {
    const product = this.productData[productName];
    if (!product) return;
    
    const modal = document.getElementById('product-detail-modal');
    const modalName = document.getElementById('modal-product-name');
    const modalDetails = document.getElementById('modal-product-details');
    
    modalName.textContent = productName;
    
    // Find Australian companies involved with this product
    const australianCompanies = product.australianExporters || product.australianImporters || product.australianCompanies || [];
    
    modalDetails.innerHTML = `
      <div class="modal-section">
        <h4>Product Overview</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <div class="detail-label">Category:</div>
            <div class="detail-value">${product.category}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Tariff Sensitivity:</div>
            <div class="detail-value ${this._getRiskClass(product.tariffSensitivity)}">${product.tariffSensitivity}</div>
          </div>
        </div>
      </div>
      
      <div class="modal-section">
        <h4>Global Supply Chain</h4>
        <div class="supply-chain-grid">
          <div class="supply-chain-column">
            <h5>Key Producers</h5>
            <div class="country-grid">
              ${product.keyProducers.map(country => `
                <div class="country-item">
                  <div class="country-code">${country}</div>
                  <div class="country-name">${this.countryData[country]?.name || country}</div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="supply-chain-column">
            <h5>Key Consumers</h5>
            <div class="country-grid">
              ${product.keyConsumers.map(country => `
                <div class="country-item">
                  <div class="country-code">${country}</div>
                  <div class="country-name">${this.countryData[country]?.name || country}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
      
      ${australianCompanies.length > 0 ? `
        <div class="modal-section">
          <h4>Australian Companies</h4>
          <div class="company-grid">
            ${australianCompanies.map(symbol => {
              const company = this.companySupplyChains[symbol] || { name: symbol, supplyChainRisk: 'Unknown' };
              return `
                <div class="company-item">
                  <div class="company-symbol">${symbol}</div>
                  <div class="company-name">${company.name}</div>
                  <div class="company-risk ${this._getRiskClass(company.supplyChainRisk)}">${company.supplyChainRisk}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}
      
      <div class="modal-section">
        <h4>Tariff Impact Analysis</h4>
        <div class="impact-analysis">
          <p>${product.tariffImpact}</p>
          ${this._generateProductTariffImpact(productName)}
        </div>
      </div>
    `;
    
    modal.style.display = 'block';
  }
  
  /**
   * Show company details
   * @param {string} companySymbol - Company symbol
   * @private
   */
  _showCompanyDetails(companySymbol) {
    const company = this.companySupplyChains[companySymbol];
    if (!company) return;
    
    const modal = document.getElementById('company-detail-modal');
    const modalName = document.getElementById('modal-company-name');
    const modalDetails = document.getElementById('modal-company-details');
    
    modalName.textContent = `${companySymbol} - ${company.name}`;
    
    // Find products related to this company
    const relatedProducts = Object.entries(this.productData)
      .filter(([name, product]) => {
        const exporters = product.australianExporters || [];
        const importers = product.australianImporters || [];
        const companies = product.australianCompanies || [];
        return exporters.includes(companySymbol) || importers.includes(companySymbol) || companies.includes(companySymbol);
      })
      .map(([name, product]) => ({ name, ...product }));
    
    modalDetails.innerHTML = `
      <div class="modal-section">
        <h4>Company Overview</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <div class="detail-label">Sector:</div>
            <div class="detail-value">${company.sector}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Supply Chain Risk:</div>
            <div class="detail-value ${this._getRiskClass(company.supplyChainRisk)}">${company.supplyChainRisk}</div>
          </div>
        </div>
      </div>
      
      <div class="modal-section">
        <h4>Key Products</h4>
        <div class="product-list">
          <ul>
            ${company.keyProducts.map(product => `
              <li>${product}</li>
            `).join('')}
          </ul>
        </div>
      </div>
      
      <div class="modal-section">
        <h4>Key Markets</h4>
        <div class="market-grid">
          ${company.keyMarkets.map(market => `
            <div class="market-item">
              <div class="market-code">${market}</div>
              <div class="market-name">${this.countryData[market]?.name || market}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="modal-section">
        <h4>Supply Chain Exposure</h4>
        <div class="exposure-grid">
          ${Object.entries(company.supplyChainExposure).map(([country, exposure]) => `
            <div class="exposure-item">
              <div class="exposure-country">${country}:</div>
              <div class="exposure-meter">
                <div class="exposure-value ${this._getRiskClass(exposure)}" style="width: ${this._getExposureWidth(exposure)}%"></div>
              </div>
              <div class="exposure-text">${exposure}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      ${relatedProducts.length > 0 ? `
        <div class="modal-section">
          <h4>Related Products</h4>
          <div class="related-products">
            ${relatedProducts.map(product => `
              <div class="related-product">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-sensitivity ${this._getRiskClass(product.tariffSensitivity)}">${product.tariffSensitivity}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      <div class="modal-section">
        <h4>Tariff Impact Analysis</h4>
        <div class="impact-analysis">
          <p>${company.tariffImpact}</p>
        </div>
      </div>
      
      <div class="modal-section">
        <h4>Mitigation Strategies</h4>
        <div class="mitigation-strategies">
          <p>${company.mitigationStrategies}</p>
        </div>
      </div>
    `;
    
    modal.style.display = 'block';
  }
  
  /**
   * Generate country tariff impact
   * @param {string} countryCode - Country code
   * @returns {string} Tariff impact HTML
   * @private
   */
  _generateCountryTariffImpact(countryCode) {
    const country = this.countryData[countryCode];
    
    if (countryCode === 'AUS') {
      return `
        <p>Australia faces both direct and indirect impacts from Trump tariffs:</p>
        <ul>
          <li><strong>Direct Impact:</strong> Limited direct exposure to US tariffs, but significant risk of retaliatory tariffs from China if they respond to US trade actions.</li>
          <li><strong>Indirect Impact:</strong> Global economic slowdown resulting from trade tensions could reduce demand for Australian exports, particularly commodities.</li>
          <li><strong>Exchange Rate Impact:</strong> AUD/USD exchange rate volatility could amplify or mitigate impacts for different sectors.</li>
        </ul>
        <p>Key sectors at risk include Materials (iron ore, coal), Agriculture (wine, beef), and Consumer Discretionary (retailers importing from China).</p>
      `;
    } else if (countryCode === 'CHN') {
      return `
        <p>China faces the most direct impact from Trump tariffs:</p>
        <ul>
          <li><strong>Direct Impact:</strong> Significant tariffs on Chinese exports to the US, affecting manufacturing, electronics, and textiles.</li>
          <li><strong>Retaliatory Measures:</strong> Likely to impose retaliatory tariffs on US goods and potentially on allies like Australia.</li>
          <li><strong>Supply Chain Shifts:</strong> Accelerated movement of manufacturing to other Asian countries to avoid US tariffs.</li>
        </ul>
        <p>This creates both risks and opportunities for Australian companies depending on their exposure to Chinese markets and supply chains.</p>
      `;
    } else if (countryCode === 'USA') {
      return `
        <p>The US will experience mixed impacts from Trump tariffs:</p>
        <ul>
          <li><strong>Import Costs:</strong> Higher costs for imported goods, potentially leading to inflation.</li>
          <li><strong>Manufacturing:</strong> Potential boost for domestic manufacturing in protected sectors.</li>
          <li><strong>Retaliatory Impacts:</strong> US exporters face retaliatory tariffs from trading partners.</li>
        </ul>
        <p>Changes in US trade policy will have significant ripple effects throughout global supply chains, indirectly affecting Australian companies.</p>
      `;
    } else {
      return `
        <p>${country.name} faces ${country.tariffExposure.toLowerCase()} exposure to Trump tariffs:</p>
        <ul>
          <li><strong>Direct Impact:</strong> ${this._getCountryDirectImpact(country)}</li>
          <li><strong>Indirect Impact:</strong> ${this._getCountryIndirectImpact(country)}</li>
          <li><strong>Supply Chain Shifts:</strong> ${this._getCountrySupplyChainShift(country)}</li>
        </ul>
        <p>These changes in global trade patterns will create both risks and opportunities for Australian companies with exposure to ${country.name}.</p>
      `;
    }
  }
  
  /**
   * Generate product tariff impact
   * @param {string} productName - Product name
   * @returns {string} Tariff impact HTML
   * @private
   */
  _generateProductTariffImpact(productName) {
    const product = this.productData[productName];
    
    if (product.category === 'Raw Materials') {
      return `
        <p>Additional insights on tariff impacts for ${productName}:</p>
        <ul>
          <li><strong>Demand Effects:</strong> Global economic slowdown could reduce demand and prices for raw materials.</li>
          <li><strong>Supply Chain Shifts:</strong> Changes in manufacturing locations may alter global demand patterns.</li>
          <li><strong>Strategic Importance:</strong> Critical raw materials may face fewer tariffs due to their strategic importance.</li>
        </ul>
      `;
    } else if (product.category === 'Agriculture') {
      return `
        <p>Additional insights on tariff impacts for ${productName}:</p>
        <ul>
          <li><strong>Retaliatory Tariffs:</strong> Agricultural products are often targeted in retaliatory tariffs due to their political sensitivity.</li>
          <li><strong>Market Access:</strong> Potential for new market opportunities if competitors face higher tariffs.</li>
          <li><strong>Price Sensitivity:</strong> Agricultural products often face elastic demand, making them vulnerable to price increases from tariffs.</li>
        </ul>
      `;
    } else if (product.category === 'Manufacturing') {
      return `
        <p>Additional insights on tariff impacts for ${productName}:</p>
        <ul>
          <li><strong>Supply Chain Complexity:</strong> Manufacturing products often have complex global supply chains vulnerable to tariff disruption.</li>
          <li><strong>Reshoring Potential:</strong> Tariffs may accelerate reshoring of manufacturing to avoid trade barriers.</li>
          <li><strong>Cost Structures:</strong> Companies with flexible manufacturing footprints may gain competitive advantage.</li>
        </ul>
      `;
    } else {
      return `
        <p>Additional insights on tariff impacts for ${productName}:</p>
        <ul>
          <li><strong>Price Effects:</strong> Tariffs may increase prices for consumers and input costs for businesses.</li>
          <li><strong>Substitution:</strong> Higher prices may drive substitution to alternative products or suppliers.</li>
          <li><strong>Market Dynamics:</strong> Changes in global trade flows may create new competitive dynamics.</li>
        </ul>
      `;
    }
  }
  
  /**
   * Get country direct impact
   * @param {Object} country - Country data
   * @returns {string} Direct impact description
   * @private
   */
  _getCountryDirectImpact(country) {
    const exposure = country.tariffExposure;
    
    if (exposure === 'Very High' || exposure === 'High') {
      return 'Significant exposure to direct tariffs or retaliatory measures affecting key export sectors.';
    } else if (exposure === 'Medium-High' || exposure === 'Medium') {
      return 'Moderate exposure to tariffs, with some key export sectors potentially affected.';
    } else {
      return 'Limited direct exposure to tariffs, with minimal impact on key export sectors.';
    }
  }
  
  /**
   * Get country indirect impact
   * @param {Object} country - Country data
   * @returns {string} Indirect impact description
   * @private
   */
  _getCountryIndirectImpact(country) {
    if (country.region === 'Asia') {
      return 'Potential beneficiary of manufacturing shifts from China, but also vulnerable to regional economic slowdown.';
    } else if (country.region === 'Europe') {
      return 'Exposed to global economic slowdown and potential US tariffs on European goods.';
    } else {
      return 'May experience changes in trade patterns and investment flows as global supply chains adjust.';
    }
  }
  
  /**
   * Get country supply chain shift
   * @param {Object} country - Country data
   * @returns {string} Supply chain shift description
   * @private
   */
  _getCountrySupplyChainShift(country) {
    if (country.region === 'Asia' && country.tariffExposure !== 'Very High') {
      return 'Likely to see increased manufacturing investment as companies diversify away from China.';
    } else if (country.region === 'North America') {
      return 'May benefit from nearshoring as companies seek to reduce exposure to global trade tensions.';
    } else {
      return 'Will need to adapt to changing global trade patterns and potential disruptions to established supply chains.';
    }
  }
  
  /**
   * Get risk class
   * @param {string} risk - Risk level
   * @returns {string} Risk class
   * @private
   */
  _getRiskClass(risk) {
    switch (risk) {
      case 'Very High':
        return 'very-high-risk';
      case 'High':
        return 'high-risk';
      case 'Medium-High':
        return 'medium-high-risk';
      case 'Medium':
        return 'medium-risk';
      case 'Low':
        return 'low-risk';
      default:
        return '';
    }
  }
  
  /**
   * Get exposure value
   * @param {string} exposure - Exposure level
   * @returns {number} Exposure value
   * @private
   */
  _getExposureValue(exposure) {
    switch (exposure) {
      case 'Very High':
        return 5;
      case 'High':
        return 4;
      case 'Medium-High':
        return 3;
      case 'Medium':
        return 2;
      case 'Low':
        return 1;
      default:
        return 0;
    }
  }
  
  /**
   * Get exposure width
   * @param {string} exposure - Exposure level
   * @returns {number} Exposure width percentage
   * @private
   */
  _getExposureWidth(exposure) {
    switch (exposure) {
      case 'Very High':
        return 100;
      case 'High':
        return 80;
      case 'Medium-High':
        return 60;
      case 'Medium':
        return 40;
      case 'Low':
        return 20;
      default:
        return 0;
    }
  }
}

export default GlobalSupplyChainData;
