/**
 * Expanded Sector Coverage with Varied Risk Profiles
 * 
 * This module provides comprehensive data for all ASX sectors with stocks of
 * different market caps and risk profiles, focusing on those with exposure
 * to US-China trade dynamics and Trump tariff impacts.
 */

class SectorCoverageData {
  constructor() {
    this.sectors = [
      'Materials',
      'Consumer Staples',
      'Healthcare',
      'Financials',
      'Information Technology',
      'Industrials',
      'Utilities',
      'Energy',
      'Communication Services',
      'Consumer Discretionary',
      'Real Estate'
    ];
    
    this.riskProfiles = [
      'Low Risk',
      'Medium Risk',
      'High Risk',
      'Very High Risk'
    ];
    
    this.marketCapCategories = [
      'Large Cap (>$10B)',
      'Mid Cap ($2B-$10B)',
      'Small Cap ($300M-$2B)',
      'Micro Cap (<$300M)'
    ];
    
    // Initialize data structures
    this.sectorData = {};
    this.stockData = {};
    
    // Load data
    this._loadData();
  }
  
  /**
   * Load sector and stock data
   * @private
   */
  _loadData() {
    // In a real implementation, this would load data from an API or database
    // For demonstration, we'll initialize with sample data
    
    this._initializeSectorData();
    this._initializeStockData();
  }
  
  /**
   * Initialize sector data
   * @private
   */
  _initializeSectorData() {
    this.sectors.forEach(sector => {
      this.sectorData[sector] = {
        name: sector,
        description: this._getSectorDescription(sector),
        tariffExposure: this._getSectorTariffExposure(sector),
        usExposure: this._getSectorUSExposure(sector),
        chinaExposure: this._getSectorChinaExposure(sector),
        performance: {
          '1w': this._getRandomPerformance(-5, 5),
          '1m': this._getRandomPerformance(-10, 10),
          '3m': this._getRandomPerformance(-15, 15),
          '6m': this._getRandomPerformance(-20, 20),
          '1y': this._getRandomPerformance(-30, 30),
          'ytd': this._getRandomPerformance(-25, 25)
        },
        volatility: this._getRandomValue(10, 30),
        averageBeta: this._getRandomValue(0.8, 1.5),
        marketCapDistribution: this._getMarketCapDistribution(),
        riskProfileDistribution: this._getRiskProfileDistribution(),
        tariffSensitivityScore: this._getRandomValue(1, 10),
        supplyChainExposure: this._getRandomValue(1, 10),
        fxAmplification: this._getRandomValue(0.5, 2.0),
        tradingVolume: this._getRandomValue(100000000, 1000000000),
        momentumScore: this._getRandomValue(-10, 10)
      };
    });
  }
  
  /**
   * Initialize stock data
   * @private
   */
  _initializeStockData() {
    // Materials sector
    this._addStock('BHP.AX', 'BHP Group', 'Materials', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('RIO.AX', 'Rio Tinto', 'Materials', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('FMG.AX', 'Fortescue Metals Group', 'Materials', 'Large Cap (>$10B)', 'Medium Risk');
    this._addStock('MIN.AX', 'Mineral Resources', 'Materials', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('S32.AX', 'South32', 'Materials', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('NCM.AX', 'Newcrest Mining', 'Materials', 'Large Cap (>$10B)', 'Medium Risk');
    this._addStock('OZL.AX', 'OZ Minerals', 'Materials', 'Mid Cap ($2B-$10B)', 'High Risk');
    this._addStock('IGO.AX', 'IGO Limited', 'Materials', 'Mid Cap ($2B-$10B)', 'High Risk');
    this._addStock('LYC.AX', 'Lynas Rare Earths', 'Materials', 'Mid Cap ($2B-$10B)', 'High Risk');
    this._addStock('PLS.AX', 'Pilbara Minerals', 'Materials', 'Mid Cap ($2B-$10B)', 'Very High Risk');
    this._addStock('VUL.AX', 'Vulcan Energy Resources', 'Materials', 'Small Cap ($300M-$2B)', 'Very High Risk');
    
    // Consumer Staples sector
    this._addStock('WOW.AX', 'Woolworths Group', 'Consumer Staples', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('COL.AX', 'Coles Group', 'Consumer Staples', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('TWE.AX', 'Treasury Wine Estates', 'Consumer Staples', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('A2M.AX', 'The a2 Milk Company', 'Consumer Staples', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('BKL.AX', 'Blackmores', 'Consumer Staples', 'Small Cap ($300M-$2B)', 'Medium Risk');
    this._addStock('ELD.AX', 'Elders', 'Consumer Staples', 'Small Cap ($300M-$2B)', 'High Risk');
    this._addStock('GNC.AX', 'GrainCorp', 'Consumer Staples', 'Small Cap ($300M-$2B)', 'High Risk');
    this._addStock('ING.AX', 'Inghams Group', 'Consumer Staples', 'Small Cap ($300M-$2B)', 'Medium Risk');
    
    // Healthcare sector
    this._addStock('CSL.AX', 'CSL Limited', 'Healthcare', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('RMD.AX', 'ResMed', 'Healthcare', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('COH.AX', 'Cochlear', 'Healthcare', 'Large Cap (>$10B)', 'Medium Risk');
    this._addStock('SHL.AX', 'Sonic Healthcare', 'Healthcare', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('RHC.AX', 'Ramsay Health Care', 'Healthcare', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('FPH.AX', 'Fisher & Paykel Healthcare', 'Healthcare', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('MSB.AX', 'Mesoblast', 'Healthcare', 'Small Cap ($300M-$2B)', 'Very High Risk');
    this._addStock('PRN.AX', 'Perenti Global', 'Healthcare', 'Small Cap ($300M-$2B)', 'High Risk');
    this._addStock('IMM.AX', 'Immutep', 'Healthcare', 'Micro Cap (<$300M)', 'Very High Risk');
    
    // Financials sector
    this._addStock('CBA.AX', 'Commonwealth Bank', 'Financials', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('NAB.AX', 'National Australia Bank', 'Financials', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('WBC.AX', 'Westpac Banking', 'Financials', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('ANZ.AX', 'ANZ Group', 'Financials', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('MQG.AX', 'Macquarie Group', 'Financials', 'Large Cap (>$10B)', 'Medium Risk');
    this._addStock('QBE.AX', 'QBE Insurance', 'Financials', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('IAG.AX', 'Insurance Australia', 'Financials', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('SUN.AX', 'Suncorp Group', 'Financials', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('BEN.AX', 'Bendigo and Adelaide Bank', 'Financials', 'Small Cap ($300M-$2B)', 'Medium Risk');
    this._addStock('BOQ.AX', 'Bank of Queensland', 'Financials', 'Small Cap ($300M-$2B)', 'Medium Risk');
    this._addStock('AFG.AX', 'Australian Finance Group', 'Financials', 'Small Cap ($300M-$2B)', 'High Risk');
    
    // Information Technology sector
    this._addStock('WTC.AX', 'WiseTech Global', 'Information Technology', 'Large Cap (>$10B)', 'Medium Risk');
    this._addStock('XRO.AX', 'Xero', 'Information Technology', 'Large Cap (>$10B)', 'Medium Risk');
    this._addStock('APX.AX', 'Appen', 'Information Technology', 'Small Cap ($300M-$2B)', 'High Risk');
    this._addStock('ALU.AX', 'Altium', 'Information Technology', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('MP1.AX', 'Megaport', 'Information Technology', 'Small Cap ($300M-$2B)', 'High Risk');
    this._addStock('NXT.AX', 'NEXTDC', 'Information Technology', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('TNE.AX', 'Technology One', 'Information Technology', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('LNK.AX', 'Link Administration', 'Information Technology', 'Small Cap ($300M-$2B)', 'Medium Risk');
    this._addStock('DUB.AX', 'Dubber Corporation', 'Information Technology', 'Micro Cap (<$300M)', 'Very High Risk');
    this._addStock('BVS.AX', 'Bravura Solutions', 'Information Technology', 'Small Cap ($300M-$2B)', 'High Risk');
    
    // Industrials sector
    this._addStock('TCL.AX', 'Transurban Group', 'Industrials', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('SYD.AX', 'Sydney Airport', 'Industrials', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('QAN.AX', 'Qantas Airways', 'Industrials', 'Mid Cap ($2B-$10B)', 'High Risk');
    this._addStock('AMC.AX', 'Amcor', 'Industrials', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('BXB.AX', 'Brambles', 'Industrials', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('SEK.AX', 'SEEK', 'Industrials', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('AZJ.AX', 'Aurizon Holdings', 'Industrials', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('ALQ.AX', 'ALS', 'Industrials', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('DOW.AX', 'Downer EDI', 'Industrials', 'Small Cap ($300M-$2B)', 'High Risk');
    this._addStock('SVW.AX', 'Seven Group', 'Industrials', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    
    // Utilities sector
    this._addStock('AGL.AX', 'AGL Energy', 'Utilities', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('ORG.AX', 'Origin Energy', 'Utilities', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('APA.AX', 'APA Group', 'Utilities', 'Mid Cap ($2B-$10B)', 'Low Risk');
    this._addStock('AST.AX', 'AusNet Services', 'Utilities', 'Mid Cap ($2B-$10B)', 'Low Risk');
    this._addStock('SKI.AX', 'Spark Infrastructure', 'Utilities', 'Small Cap ($300M-$2B)', 'Low Risk');
    this._addStock('MCY.AX', 'Mercury NZ', 'Utilities', 'Small Cap ($300M-$2B)', 'Medium Risk');
    
    // Energy sector
    this._addStock('WPL.AX', 'Woodside Petroleum', 'Energy', 'Large Cap (>$10B)', 'Medium Risk');
    this._addStock('STO.AX', 'Santos', 'Energy', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('OSH.AX', 'Oil Search', 'Energy', 'Mid Cap ($2B-$10B)', 'High Risk');
    this._addStock('BPT.AX', 'Beach Energy', 'Energy', 'Small Cap ($300M-$2B)', 'High Risk');
    this._addStock('WOR.AX', 'Worley', 'Energy', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('KAR.AX', 'Karoon Energy', 'Energy', 'Small Cap ($300M-$2B)', 'Very High Risk');
    this._addStock('NHC.AX', 'New Hope Corporation', 'Energy', 'Small Cap ($300M-$2B)', 'High Risk');
    this._addStock('WHC.AX', 'Whitehaven Coal', 'Energy', 'Small Cap ($300M-$2B)', 'High Risk');
    
    // Communication Services sector
    this._addStock('TLS.AX', 'Telstra', 'Communication Services', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('TPG.AX', 'TPG Telecom', 'Communication Services', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('REA.AX', 'REA Group', 'Communication Services', 'Large Cap (>$10B)', 'Medium Risk');
    this._addStock('CAR.AX', 'Carsales.com', 'Communication Services', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('DMP.AX', 'Domino\'s Pizza', 'Communication Services', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('NWS.AX', 'News Corporation', 'Communication Services', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('SXL.AX', 'Southern Cross Media', 'Communication Services', 'Small Cap ($300M-$2B)', 'High Risk');
    
    // Consumer Discretionary sector
    this._addStock('WES.AX', 'Wesfarmers', 'Consumer Discretionary', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('JBH.AX', 'JB Hi-Fi', 'Consumer Discretionary', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('HVN.AX', 'Harvey Norman', 'Consumer Discretionary', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('FLT.AX', 'Flight Centre', 'Consumer Discretionary', 'Mid Cap ($2B-$10B)', 'High Risk');
    this._addStock('ALL.AX', 'Aristocrat Leisure', 'Consumer Discretionary', 'Large Cap (>$10B)', 'Medium Risk');
    this._addStock('TAH.AX', 'Tabcorp Holdings', 'Consumer Discretionary', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('SUL.AX', 'Super Retail Group', 'Consumer Discretionary', 'Small Cap ($300M-$2B)', 'Medium Risk');
    this._addStock('PMV.AX', 'Premier Investments', 'Consumer Discretionary', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('KMD.AX', 'Kathmandu Holdings', 'Consumer Discretionary', 'Small Cap ($300M-$2B)', 'High Risk');
    this._addStock('LOV.AX', 'Lovisa Holdings', 'Consumer Discretionary', 'Small Cap ($300M-$2B)', 'High Risk');
    
    // Real Estate sector
    this._addStock('GMG.AX', 'Goodman Group', 'Real Estate', 'Large Cap (>$10B)', 'Low Risk');
    this._addStock('SGP.AX', 'Stockland', 'Real Estate', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('DXS.AX', 'Dexus', 'Real Estate', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('MGR.AX', 'Mirvac Group', 'Real Estate', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('GPT.AX', 'GPT Group', 'Real Estate', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('LLC.AX', 'Lendlease Group', 'Real Estate', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('CHC.AX', 'Charter Hall', 'Real Estate', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('VCX.AX', 'Vicinity Centres', 'Real Estate', 'Mid Cap ($2B-$10B)', 'Medium Risk');
    this._addStock('CLW.AX', 'Charter Hall Long WALE REIT', 'Real Estate', 'Small Cap ($300M-$2B)', 'Low Risk');
    this._addStock('CQR.AX', 'Charter Hall Retail REIT', 'Real Estate', 'Small Cap ($300M-$2B)', 'Medium Risk');
  }
  
  /**
   * Add a stock to the stock data
   * @param {string} symbol - Stock symbol
   * @param {string} name - Stock name
   * @param {string} sector - Stock sector
   * @param {string} marketCap - Market cap category
   * @param {string} riskProfile - Risk profile
   * @private
   */
  _addStock(symbol, name, sector, marketCap, riskProfile) {
    this.stockData[symbol] = {
      symbol: symbol,
      name: name,
      sector: sector,
      marketCap: marketCap,
      riskProfile: riskProfile,
      description: this._getStockDescription(name, sector),
      tariffExposure: this._getStockTariffExposure(sector, riskProfile),
      usExposure: this._getStockUSExposure(sector, riskProfile),
      chinaExposure: this._getStockChinaExposure(sector, riskProfile),
      performance: {
        '1w': this._getRandomPerformance(-7, 7),
        '1m': this._getRandomPerformance(-15, 15),
        '3m': this._getRandomPerformance(-25, 25),
        '6m': this._getRandomPerformance(-35, 35),
        '1y': this._getRandomPerformance(-50, 50),
        'ytd': this._getRandomPerformance(-40, 40)
      },
      price: this._getRandomValue(10, 100),
      volume: this._getRandomValue(1000000, 10000000),
      volatility: this._getStockVolatility(riskProfile),
      beta: this._getStockBeta(riskProfile),
      tariffSensitivityScore: this._getStockTariffSensitivity(sector, riskProfile),
      supplyChainExposure: this._getStockSupplyChainExposure(sector, riskProfile),
      fxAmplification: this._getStockFXAmplification(sector, riskProfile),
      momentumScore: this._getRandomValue(-10, 10),
      tradingVolumeRatio: this._getRandomValue(0.5, 2.0),
      optionsAvailability: this._getStockOptionsAvailability(marketCap),
      movementPotentialScore: this._getStockMovementPotential(riskProfile),
      probability15PctMove: this._getStockProbability15PctMove(riskProfile),
      recentPerformance: this._getRandomPerformance(-10, 10),
      technicalIndicators: {
        rsi: this._getRandomValue(30, 70),
        macd: this._getRandomValue(-2, 2),
        ema20: this._getRandomValue(0.9, 1.1),
        ema50: this._getRandomValue(0.9, 1.1),
        ema200: this._getRandomValue(0.9, 1.1),
        bollingerBands: {
          upper: this._getRandomValue(1.05, 1.2),
          middle: 1,
          lower: this._getRandomValue(0.8, 0.95)
        }
      },
      fundamentalIndicators: {
        pe: this._getRandomValue(5, 30),
        eps: this._getRandomValue(0.5, 5),
        dividendYield: this._getRandomValue(0, 7),
        priceToBook: this._getRandomValue(0.5, 5),
        debtToEquity: this._getRandomValue(0, 2),
        returnOnEquity: this._getRandomValue(5, 25),
        profitMargin: this._getRandomValue(5, 30)
      },
      tariffImpactFactors: {
        directExposure: this._getRandomValue(1, 10),
        indirectExposure: this._getRandomValue(1, 10),
        supplyChainRisk: this._getRandomValue(1, 10),
        pricingPower: this._getRandomValue(1, 10),
        alternativeMarkets: this._getRandomValue(1, 10),
        governmentSupport: this._getRandomValue(1, 10)
      },
      entryExitLevels: {
        strongBuy: this._getRandomValue(0.7, 0.9),
        buy: this._getRandomValue(0.9, 0.95),
        hold: 1,
        sell: this._getRandomValue(1.05, 1.1),
        strongSell: this._getRandomValue(1.1, 1.3)
      },
      alertTriggers: {
        priceTarget: this._getRandomValue(0.9, 1.1),
        stopLoss: this._getRandomValue(0.8, 0.95),
        technicalSignal: this._getRandomValue(0, 1) > 0.5,
        volumeSpike: this._getRandomValue(1.5, 3),
        newsImpact: this._getRandomValue(0, 1) > 0.7
      }
    };
  }
  
  /**
   * Get sector description
   * @param {string} sector - Sector name
   * @returns {string} Sector description
   * @private
   */
  _getSectorDescription(sector) {
    const descriptions = {
      'Materials': 'Companies involved in the discovery, development, and processing of raw materials, including mining, refining, and chemical products.',
      'Consumer Staples': 'Companies that provide essential products for daily needs, including food, beverages, household items, and personal care products.',
      'Healthcare': 'Companies involved in medical services, equipment, drugs, and healthcare facilities.',
      'Financials': 'Companies that provide financial services, including banks, insurance, and investment firms.',
      'Information Technology': 'Companies involved in technology development, software, hardware, and IT services.',
      'Industrials': 'Companies that produce goods and services used in construction, manufacturing, and transportation.',
      'Utilities': 'Companies that provide essential utilities such as electricity, gas, and water.',
      'Energy': 'Companies involved in the production and supply of energy, including oil, gas, and renewable energy.',
      'Communication Services': 'Companies that provide communication services, including telecommunications, media, and entertainment.',
      'Consumer Discretionary': 'Companies that provide non-essential goods and services, including retail, leisure, and automotive.',
      'Real Estate': 'Companies involved in real estate development, management, and investment trusts.'
    };
    
    return descriptions[sector] || `Companies in the ${sector} sector.`;
  }
  
  /**
   * Get stock description
   * @param {string} name - Stock name
   * @param {string} sector - Stock sector
   * @returns {string} Stock description
   * @private
   */
  _getStockDescription(name, sector) {
    return `${name} is an Australian company operating in the ${sector} sector.`;
  }
  
  /**
   * Get sector tariff exposure
   * @param {string} sector - Sector name
   * @returns {number} Tariff exposure (1-10)
   * @private
   */
  _getSectorTariffExposure(sector) {
    const exposures = {
      'Materials': this._getRandomValue(7, 10),
      'Consumer Staples': this._getRandomValue(4, 7),
      'Healthcare': this._getRandomValue(3, 6),
      'Financials': this._getRandomValue(2, 5),
      'Information Technology': this._getRandomValue(5, 8),
      'Industrials': this._getRandomValue(6, 9),
      'Utilities': this._getRandomValue(1, 4),
      'Energy': this._getRandomValue(5, 8),
      'Communication Services': this._getRandomValue(2, 5),
      'Consumer Discretionary': this._getRandomValue(5, 8),
      'Real Estate': this._getRandomValue(1, 4)
    };
    
    return exposures[sector] || this._getRandomValue(1, 10);
  }
  
  /**
   * Get sector US exposure
   * @param {string} sector - Sector name
   * @returns {number} US exposure (1-10)
   * @private
   */
  _getSectorUSExposure(sector) {
    const exposures = {
      'Materials': this._getRandomValue(5, 8),
      'Consumer Staples': this._getRandomValue(3, 6),
      'Healthcare': this._getRandomValue(4, 7),
      'Financials': this._getRandomValue(3, 6),
      'Information Technology': this._getRandomValue(6, 9),
      'Industrials': this._getRandomValue(4, 7),
      'Utilities': this._getRandomValue(1, 4),
      'Energy': this._getRandomValue(4, 7),
      'Communication Services': this._getRandomValue(3, 6),
      'Consumer Discretionary': this._getRandomValue(4, 7),
      'Real Estate': this._getRandomValue(2, 5)
    };
    
    return exposures[sector] || this._getRandomValue(1, 10);
  }
  
  /**
   * Get sector China exposure
   * @param {string} sector - Sector name
   * @returns {number} China exposure (1-10)
   * @private
   */
  _getSectorChinaExposure(sector) {
    const exposures = {
      'Materials': this._getRandomValue(7, 10),
      'Consumer Staples': this._getRandomValue(5, 8),
      'Healthcare': this._getRandomValue(3, 6),
      'Financials': this._getRandomValue(2, 5),
      'Information Technology': this._getRandomValue(4, 7),
      'Industrials': this._getRandomValue(5, 8),
      'Utilities': this._getRandomValue(1, 4),
      'Energy': this._getRandomValue(6, 9),
      'Communication Services': this._getRandomValue(2, 5),
      'Consumer Discretionary': this._getRandomValue(4, 7),
      'Real Estate': this._getRandomValue(3, 6)
    };
    
    return exposures[sector] || this._getRandomValue(1, 10);
  }
  
  /**
   * Get stock tariff exposure
   * @param {string} sector - Stock sector
   * @param {string} riskProfile - Risk profile
   * @returns {number} Tariff exposure (1-10)
   * @private
   */
  _getStockTariffExposure(sector, riskProfile) {
    const baseTariffExposure = this._getSectorTariffExposure(sector);
    const riskMultiplier = this._getRiskMultiplier(riskProfile);
    
    return Math.min(10, baseTariffExposure * riskMultiplier);
  }
  
  /**
   * Get stock US exposure
   * @param {string} sector - Stock sector
   * @param {string} riskProfile - Risk profile
   * @returns {number} US exposure (1-10)
   * @private
   */
  _getStockUSExposure(sector, riskProfile) {
    const baseUSExposure = this._getSectorUSExposure(sector);
    const riskMultiplier = this._getRiskMultiplier(riskProfile);
    
    return Math.min(10, baseUSExposure * riskMultiplier);
  }
  
  /**
   * Get stock China exposure
   * @param {string} sector - Stock sector
   * @param {string} riskProfile - Risk profile
   * @returns {number} China exposure (1-10)
   * @private
   */
  _getStockChinaExposure(sector, riskProfile) {
    const baseChinaExposure = this._getSectorChinaExposure(sector);
    const riskMultiplier = this._getRiskMultiplier(riskProfile);
    
    return Math.min(10, baseChinaExposure * riskMultiplier);
  }
  
  /**
   * Get stock volatility
   * @param {string} riskProfile - Risk profile
   * @returns {number} Volatility
   * @private
   */
  _getStockVolatility(riskProfile) {
    const volatilityRanges = {
      'Low Risk': this._getRandomValue(10, 20),
      'Medium Risk': this._getRandomValue(15, 30),
      'High Risk': this._getRandomValue(25, 40),
      'Very High Risk': this._getRandomValue(35, 60)
    };
    
    return volatilityRanges[riskProfile] || this._getRandomValue(10, 60);
  }
  
  /**
   * Get stock beta
   * @param {string} riskProfile - Risk profile
   * @returns {number} Beta
   * @private
   */
  _getStockBeta(riskProfile) {
    const betaRanges = {
      'Low Risk': this._getRandomValue(0.5, 1.0),
      'Medium Risk': this._getRandomValue(0.8, 1.2),
      'High Risk': this._getRandomValue(1.0, 1.5),
      'Very High Risk': this._getRandomValue(1.3, 2.0)
    };
    
    return betaRanges[riskProfile] || this._getRandomValue(0.5, 2.0);
  }
  
  /**
   * Get stock tariff sensitivity
   * @param {string} sector - Stock sector
   * @param {string} riskProfile - Risk profile
   * @returns {number} Tariff sensitivity (1-10)
   * @private
   */
  _getStockTariffSensitivity(sector, riskProfile) {
    const baseTariffSensitivity = this._getSectorTariffExposure(sector);
    const riskMultiplier = this._getRiskMultiplier(riskProfile);
    
    return Math.min(10, baseTariffSensitivity * riskMultiplier);
  }
  
  /**
   * Get stock supply chain exposure
   * @param {string} sector - Stock sector
   * @param {string} riskProfile - Risk profile
   * @returns {number} Supply chain exposure (1-10)
   * @private
   */
  _getStockSupplyChainExposure(sector, riskProfile) {
    const baseSupplyChainExposure = this._getRandomValue(3, 8);
    const riskMultiplier = this._getRiskMultiplier(riskProfile);
    
    return Math.min(10, baseSupplyChainExposure * riskMultiplier);
  }
  
  /**
   * Get stock FX amplification
   * @param {string} sector - Stock sector
   * @param {string} riskProfile - Risk profile
   * @returns {number} FX amplification
   * @private
   */
  _getStockFXAmplification(sector, riskProfile) {
    const baseFXAmplification = this._getRandomValue(0.5, 1.5);
    const riskMultiplier = this._getRiskMultiplier(riskProfile);
    
    return baseFXAmplification * riskMultiplier;
  }
  
  /**
   * Get stock options availability
   * @param {string} marketCap - Market cap category
   * @returns {boolean} Options availability
   * @private
   */
  _getStockOptionsAvailability(marketCap) {
    const availabilityProbabilities = {
      'Large Cap (>$10B)': 0.95,
      'Mid Cap ($2B-$10B)': 0.7,
      'Small Cap ($300M-$2B)': 0.3,
      'Micro Cap (<$300M)': 0.05
    };
    
    const probability = availabilityProbabilities[marketCap] || 0.5;
    return Math.random() < probability;
  }
  
  /**
   * Get stock movement potential
   * @param {string} riskProfile - Risk profile
   * @returns {number} Movement potential (1-10)
   * @private
   */
  _getStockMovementPotential(riskProfile) {
    const potentialRanges = {
      'Low Risk': this._getRandomValue(1, 4),
      'Medium Risk': this._getRandomValue(3, 6),
      'High Risk': this._getRandomValue(5, 8),
      'Very High Risk': this._getRandomValue(7, 10)
    };
    
    return potentialRanges[riskProfile] || this._getRandomValue(1, 10);
  }
  
  /**
   * Get stock probability of 15% move
   * @param {string} riskProfile - Risk profile
   * @returns {number} Probability (0-1)
   * @private
   */
  _getStockProbability15PctMove(riskProfile) {
    const probabilityRanges = {
      'Low Risk': this._getRandomValue(0.05, 0.2),
      'Medium Risk': this._getRandomValue(0.15, 0.4),
      'High Risk': this._getRandomValue(0.3, 0.6),
      'Very High Risk': this._getRandomValue(0.5, 0.8)
    };
    
    return probabilityRanges[riskProfile] || this._getRandomValue(0.05, 0.8);
  }
  
  /**
   * Get risk multiplier
   * @param {string} riskProfile - Risk profile
   * @returns {number} Risk multiplier
   * @private
   */
  _getRiskMultiplier(riskProfile) {
    const multipliers = {
      'Low Risk': 0.8,
      'Medium Risk': 1.0,
      'High Risk': 1.2,
      'Very High Risk': 1.5
    };
    
    return multipliers[riskProfile] || 1.0;
  }
  
  /**
   * Get market cap distribution
   * @returns {Object} Market cap distribution
   * @private
   */
  _getMarketCapDistribution() {
    return {
      'Large Cap (>$10B)': this._getRandomValue(20, 40),
      'Mid Cap ($2B-$10B)': this._getRandomValue(30, 50),
      'Small Cap ($300M-$2B)': this._getRandomValue(10, 30),
      'Micro Cap (<$300M)': this._getRandomValue(5, 15)
    };
  }
  
  /**
   * Get risk profile distribution
   * @returns {Object} Risk profile distribution
   * @private
   */
  _getRiskProfileDistribution() {
    return {
      'Low Risk': this._getRandomValue(20, 40),
      'Medium Risk': this._getRandomValue(30, 50),
      'High Risk': this._getRandomValue(10, 30),
      'Very High Risk': this._getRandomValue(5, 15)
    };
  }
  
  /**
   * Get random performance
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random performance
   * @private
   */
  _getRandomPerformance(min, max) {
    return this._getRandomValue(min, max) / 100;
  }
  
  /**
   * Get random value
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random value
   * @private
   */
  _getRandomValue(min, max) {
    return min + Math.random() * (max - min);
  }
  
  /**
   * Get all sectors
   * @returns {Array} List of sectors
   */
  getAllSectors() {
    return this.sectors;
  }
  
  /**
   * Get all risk profiles
   * @returns {Array} List of risk profiles
   */
  getAllRiskProfiles() {
    return this.riskProfiles;
  }
  
  /**
   * Get all market cap categories
   * @returns {Array} List of market cap categories
   */
  getAllMarketCapCategories() {
    return this.marketCapCategories;
  }
  
  /**
   * Get sector data
   * @param {string} sector - Sector name
   * @returns {Object} Sector data
   */
  getSectorData(sector) {
    return this.sectorData[sector] || null;
  }
  
  /**
   * Get all sector data
   * @returns {Object} All sector data
   */
  getAllSectorData() {
    return this.sectorData;
  }
  
  /**
   * Get stock data
   * @param {string} symbol - Stock symbol
   * @returns {Object} Stock data
   */
  getStockData(symbol) {
    return this.stockData[symbol] || null;
  }
  
  /**
   * Get all stock data
   * @returns {Object} All stock data
   */
  getAllStockData() {
    return this.stockData;
  }
  
  /**
   * Get stocks by sector
   * @param {string} sector - Sector name
   * @returns {Array} List of stocks in the sector
   */
  getStocksBySector(sector) {
    return Object.values(this.stockData).filter(stock => stock.sector === sector);
  }
  
  /**
   * Get stocks by risk profile
   * @param {string} riskProfile - Risk profile
   * @returns {Array} List of stocks with the risk profile
   */
  getStocksByRiskProfile(riskProfile) {
    return Object.values(this.stockData).filter(stock => stock.riskProfile === riskProfile);
  }
  
  /**
   * Get stocks by market cap
   * @param {string} marketCap - Market cap category
   * @returns {Array} List of stocks in the market cap category
   */
  getStocksByMarketCap(marketCap) {
    return Object.values(this.stockData).filter(stock => stock.marketCap === marketCap);
  }
  
  /**
   * Get stocks by tariff sensitivity
   * @param {number} minSensitivity - Minimum tariff sensitivity
   * @param {number} maxSensitivity - Maximum tariff sensitivity
   * @returns {Array} List of stocks with tariff sensitivity in the range
   */
  getStocksByTariffSensitivity(minSensitivity, maxSensitivity) {
    return Object.values(this.stockData).filter(
      stock => stock.tariffSensitivityScore >= minSensitivity && stock.tariffSensitivityScore <= maxSensitivity
    );
  }
  
  /**
   * Get stocks by movement potential
   * @param {number} minPotential - Minimum movement potential
   * @returns {Array} List of stocks with movement potential above the minimum
   */
  getStocksByMovementPotential(minPotential) {
    return Object.values(this.stockData).filter(
      stock => stock.movementPotentialScore >= minPotential
    );
  }
  
  /**
   * Get stocks by probability of 15% move
   * @param {number} minProbability - Minimum probability
   * @returns {Array} List of stocks with probability above the minimum
   */
  getStocksByProbability15PctMove(minProbability) {
    return Object.values(this.stockData).filter(
      stock => stock.probability15PctMove >= minProbability
    );
  }
  
  /**
   * Get stocks by options availability
   * @param {boolean} available - Options availability
   * @returns {Array} List of stocks with options availability
   */
  getStocksByOptionsAvailability(available) {
    return Object.values(this.stockData).filter(
      stock => stock.optionsAvailability === available
    );
  }
  
  /**
   * Get stocks by multiple criteria
   * @param {Object} criteria - Search criteria
   * @returns {Array} List of stocks matching the criteria
   */
  getStocksByMultipleCriteria(criteria) {
    return Object.values(this.stockData).filter(stock => {
      let match = true;
      
      if (criteria.sector && stock.sector !== criteria.sector) {
        match = false;
      }
      
      if (criteria.riskProfile && stock.riskProfile !== criteria.riskProfile) {
        match = false;
      }
      
      if (criteria.marketCap && stock.marketCap !== criteria.marketCap) {
        match = false;
      }
      
      if (criteria.minTariffSensitivity && stock.tariffSensitivityScore < criteria.minTariffSensitivity) {
        match = false;
      }
      
      if (criteria.maxTariffSensitivity && stock.tariffSensitivityScore > criteria.maxTariffSensitivity) {
        match = false;
      }
      
      if (criteria.minMovementPotential && stock.movementPotentialScore < criteria.minMovementPotential) {
        match = false;
      }
      
      if (criteria.minProbability15PctMove && stock.probability15PctMove < criteria.minProbability15PctMove) {
        match = false;
      }
      
      if (criteria.optionsAvailable !== undefined && stock.optionsAvailability !== criteria.optionsAvailable) {
        match = false;
      }
      
      return match;
    });
  }
  
  /**
   * Get top trading opportunities
   * @param {number} limit - Maximum number of opportunities
   * @param {Object} criteria - Search criteria
   * @returns {Array} List of top trading opportunities
   */
  getTopTradingOpportunities(limit = 10, criteria = {}) {
    // Get stocks matching criteria
    const matchingStocks = this.getStocksByMultipleCriteria(criteria);
    
    // Calculate opportunity score
    const stocksWithScore = matchingStocks.map(stock => {
      const opportunityScore = this._calculateOpportunityScore(stock);
      return { ...stock, opportunityScore };
    });
    
    // Sort by opportunity score
    stocksWithScore.sort((a, b) => b.opportunityScore - a.opportunityScore);
    
    // Return top opportunities
    return stocksWithScore.slice(0, limit);
  }
  
  /**
   * Calculate opportunity score
   * @param {Object} stock - Stock data
   * @returns {number} Opportunity score
   * @private
   */
  _calculateOpportunityScore(stock) {
    // Weight factors based on importance
    const weights = {
      tariffSensitivityScore: 0.25,
      movementPotentialScore: 0.25,
      probability15PctMove: 0.2,
      momentumScore: 0.15,
      tradingVolumeRatio: 0.1,
      optionsAvailability: 0.05
    };
    
    // Calculate weighted score
    let score = 0;
    score += stock.tariffSensitivityScore * weights.tariffSensitivityScore;
    score += stock.movementPotentialScore * weights.movementPotentialScore;
    score += stock.probability15PctMove * 10 * weights.probability15PctMove;
    score += (stock.momentumScore + 10) / 20 * 10 * weights.momentumScore;
    score += stock.tradingVolumeRatio * 5 * weights.tradingVolumeRatio;
    score += (stock.optionsAvailability ? 10 : 0) * weights.optionsAvailability;
    
    return score;
  }
}

export default SectorCoverageData;
