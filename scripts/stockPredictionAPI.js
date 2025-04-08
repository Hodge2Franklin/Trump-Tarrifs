// Stock Prediction API for Trump Tariff Analysis Website

class StockPredictionAPI {
  constructor() {
    this.apiEndpoint = '/api/predictions';
    this.predictionCache = {};
    this.lastFetchTime = {};
    this.cacheDuration = 60 * 60 * 1000; // 1 hour in milliseconds
  }

  /**
   * Initialize the prediction API
   */
  initialize() {
    console.log('Initializing Stock Prediction API...');
    // In a real implementation, this would set up API connections
    // For demonstration, we'll simulate API calls to our Python backend
  }

  /**
   * Get prediction for a specific stock
   * @param {string} symbol - Stock symbol (e.g., "BHP.AX")
   * @param {string} timeframe - Prediction timeframe ("short_term", "medium_term", "long_term")
   * @returns {Promise<Object>} - Prediction data with rationale
   */
  async getPrediction(symbol, timeframe = "medium_term") {
    console.log(`Getting prediction for ${symbol} (${timeframe})...`);
    
    // Check cache first
    const cacheKey = `${symbol}_${timeframe}`;
    if (this.predictionCache[cacheKey] && 
        (Date.now() - this.lastFetchTime[cacheKey] < this.cacheDuration)) {
      console.log(`Returning cached prediction for ${symbol}`);
      return this.predictionCache[cacheKey];
    }
    
    try {
      // In a real implementation, this would make an API call to our Python backend
      // For demonstration, we'll simulate the API response
      const response = await this.simulateApiCall('getPrediction', { symbol, timeframe });
      
      // Cache the result
      this.predictionCache[cacheKey] = response;
      this.lastFetchTime[cacheKey] = Date.now();
      
      return response;
    } catch (error) {
      console.error(`Error getting prediction for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Get predictions for multiple stocks with filtering options
   * @param {Object} options - Filter options
   * @param {string} options.timeframe - Prediction timeframe
   * @param {string} options.sector - Filter by sector
   * @param {number} options.minMovement - Minimum absolute movement percentage
   * @param {string} options.riskProfile - Filter by risk profile
   * @param {number} options.limit - Maximum number of predictions to return
   * @returns {Promise<Array>} - List of prediction data
   */
  async getAllPredictions(options = {}) {
    const defaultOptions = {
      timeframe: "medium_term",
      sector: null,
      minMovement: 10,
      riskProfile: null,
      limit: 10
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    console.log(`Getting all predictions with options:`, mergedOptions);
    
    // Generate cache key based on options
    const cacheKey = `all_${JSON.stringify(mergedOptions)}`;
    if (this.predictionCache[cacheKey] && 
        (Date.now() - this.lastFetchTime[cacheKey] < this.cacheDuration)) {
      console.log(`Returning cached predictions for options:`, mergedOptions);
      return this.predictionCache[cacheKey];
    }
    
    try {
      // In a real implementation, this would make an API call to our Python backend
      // For demonstration, we'll simulate the API response
      const response = await this.simulateApiCall('getAllPredictions', mergedOptions);
      
      // Cache the result
      this.predictionCache[cacheKey] = response;
      this.lastFetchTime[cacheKey] = Date.now();
      
      return response;
    } catch (error) {
      console.error(`Error getting all predictions:`, error);
      throw error;
    }
  }

  /**
   * Get aggregated predictions by sector
   * @param {string} timeframe - Prediction timeframe
   * @returns {Promise<Object>} - Sector predictions with rationale
   */
  async getSectorPredictions(timeframe = "medium_term") {
    console.log(`Getting sector predictions (${timeframe})...`);
    
    // Check cache
    const cacheKey = `sectors_${timeframe}`;
    if (this.predictionCache[cacheKey] && 
        (Date.now() - this.lastFetchTime[cacheKey] < this.cacheDuration)) {
      console.log(`Returning cached sector predictions`);
      return this.predictionCache[cacheKey];
    }
    
    try {
      // In a real implementation, this would make an API call to our Python backend
      // For demonstration, we'll simulate the API response
      const response = await this.simulateApiCall('getSectorPredictions', { timeframe });
      
      // Cache the result
      this.predictionCache[cacheKey] = response;
      this.lastFetchTime[cacheKey] = Date.now();
      
      return response;
    } catch (error) {
      console.error(`Error getting sector predictions:`, error);
      throw error;
    }
  }

  /**
   * Get detailed breakdown of prediction factors importance
   * @param {string} symbol - Stock symbol
   * @param {string} timeframe - Prediction timeframe
   * @returns {Promise<Object>} - Factor importance data
   */
  async getPredictionFactorsImportance(symbol, timeframe = "medium_term") {
    console.log(`Getting prediction factors importance for ${symbol} (${timeframe})...`);
    
    // Check cache
    const cacheKey = `factors_${symbol}_${timeframe}`;
    if (this.predictionCache[cacheKey] && 
        (Date.now() - this.lastFetchTime[cacheKey] < this.cacheDuration)) {
      console.log(`Returning cached prediction factors importance for ${symbol}`);
      return this.predictionCache[cacheKey];
    }
    
    try {
      // In a real implementation, this would make an API call to our Python backend
      // For demonstration, we'll simulate the API response
      const response = await this.simulateApiCall('getPredictionFactorsImportance', { symbol, timeframe });
      
      // Cache the result
      this.predictionCache[cacheKey] = response;
      this.lastFetchTime[cacheKey] = Date.now();
      
      return response;
    } catch (error) {
      console.error(`Error getting prediction factors importance for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Get historical accuracy statistics for the prediction model
   * @returns {Promise<Object>} - Accuracy statistics
   */
  async getHistoricalAccuracyStats() {
    console.log(`Getting historical accuracy statistics...`);
    
    // Check cache
    const cacheKey = 'accuracy_stats';
    if (this.predictionCache[cacheKey] && 
        (Date.now() - this.lastFetchTime[cacheKey] < this.cacheDuration)) {
      console.log(`Returning cached historical accuracy statistics`);
      return this.predictionCache[cacheKey];
    }
    
    try {
      // In a real implementation, this would make an API call to our Python backend
      // For demonstration, we'll simulate the API response
      const response = await this.simulateApiCall('getHistoricalAccuracyStats', {});
      
      // Cache the result
      this.predictionCache[cacheKey] = response;
      this.lastFetchTime[cacheKey] = Date.now();
      
      return response;
    } catch (error) {
      console.error(`Error getting historical accuracy statistics:`, error);
      throw error;
    }
  }

  /**
   * Simulate API call to Python backend
   * @param {string} method - API method to call
   * @param {Object} params - API parameters
   * @returns {Promise<Object>} - Simulated API response
   */
  async simulateApiCall(method, params) {
    return new Promise((resolve) => {
      console.log(`Simulating API call to ${method} with params:`, params);
      
      // Simulate network delay
      setTimeout(() => {
        // In a real implementation, this would make an actual API call
        // For demonstration, we'll return mock data based on the method and params
        let response;
        
        switch (method) {
          case 'getPrediction':
            response = this.generateMockPrediction(params.symbol, params.timeframe);
            break;
          case 'getAllPredictions':
            response = this.generateMockAllPredictions(params);
            break;
          case 'getSectorPredictions':
            response = this.generateMockSectorPredictions(params.timeframe);
            break;
          case 'getPredictionFactorsImportance':
            response = this.generateMockFactorsImportance(params.symbol, params.timeframe);
            break;
          case 'getHistoricalAccuracyStats':
            response = this.generateMockHistoricalAccuracyStats();
            break;
          default:
            response = { error: `Unknown method: ${method}` };
        }
        
        resolve(response);
      }, 500); // Simulate 500ms delay
    });
  }

  /**
   * Generate mock prediction data for a specific stock
   * @param {string} symbol - Stock symbol
   * @param {string} timeframe - Prediction timeframe
   * @returns {Object} - Mock prediction data
   */
  generateMockPrediction(symbol, timeframe) {
    // This is a simplified version of what would be returned by the Python backend
    // In a real implementation, this would be replaced by actual API calls
    
    const stockData = {
      "BHP.AX": {
        name: "BHP Group",
        sector: "Materials",
        currentPrice: 45.78,
        riskProfile: "medium",
        tariffSensitivity: 80,
        usRevenuePct: 25,
        chinaRevenuePct: 45,
        beta: 1.2,
        annualizedVolatility: 28.5
      },
      "FMG.AX": {
        name: "Fortescue Metals",
        sector: "Materials",
        currentPrice: 22.45,
        riskProfile: "high",
        tariffSensitivity: 85,
        usRevenuePct: 15,
        chinaRevenuePct: 65,
        beta: 1.5,
        annualizedVolatility: 35.2
      },
      "TWE.AX": {
        name: "Treasury Wine Estates",
        sector: "Consumer Staples",
        currentPrice: 12.35,
        riskProfile: "high",
        tariffSensitivity: 90,
        usRevenuePct: 35,
        chinaRevenuePct: 30,
        beta: 1.3,
        annualizedVolatility: 32.1
      },
      "NAB.AX": {
        name: "National Australia Bank",
        sector: "Financials",
        currentPrice: 30.25,
        riskProfile: "low",
        tariffSensitivity: 40,
        usRevenuePct: 10,
        chinaRevenuePct: 5,
        beta: 0.9,
        annualizedVolatility: 18.5
      },
      "WTC.AX": {
        name: "WiseTech Global",
        sector: "Information Technology",
        currentPrice: 85.60,
        riskProfile: "high",
        tariffSensitivity: 75,
        usRevenuePct: 30,
        chinaRevenuePct: 15,
        beta: 1.8,
        annualizedVolatility: 42.3
      }
    };
    
    // Default to BHP.AX if symbol not found
    const stock = stockData[symbol] || stockData["BHP.AX"];
    
    // Generate prediction based on stock characteristics
    const isBullish = Math.random() > 0.4; // 60% chance of bullish prediction
    const baseMovement = isBullish ? 
      (5 + Math.random() * 20) : 
      -(5 + Math.random() * 20);
    
    // Adjust movement based on stock volatility and timeframe
    let movementMultiplier = 1.0;
    if (timeframe === "short_term") {
      movementMultiplier = 0.6;
    } else if (timeframe === "long_term") {
      movementMultiplier = 1.5;
    }
    
    const volatilityFactor = stock.annualizedVolatility / 25;
    const movementPct = baseMovement * volatilityFactor * movementMultiplier;
    
    // Calculate price target
    const priceTarget = stock.currentPrice * (1 + movementPct / 100);
    
    // Generate confidence score
    const confidenceScore = 50 + Math.random() * 30;
    let confidenceLevel = "moderate";
    if (confidenceScore > 75) {
      confidenceLevel = "high";
    } else if (confidenceScore > 60) {
      confidenceLevel = "moderate";
    } else {
      confidenceLevel = "low";
    }
    
    // Generate prediction factors
    const factors = {
      tariffSensitivity: {
        score: stock.tariffSensitivity,
        usRevenueExposure: stock.usRevenuePct,
        chinaRevenueExposure: stock.chinaRevenuePct,
        impact: stock.tariffSensitivity > 70 ? "high" : stock.tariffSensitivity > 40 ? "medium" : "low"
      },
      technicalIndicators: {
        score: isBullish ? 65 + Math.random() * 20 : 35 - Math.random() * 20,
        rsi: isBullish ? 60 + Math.random() * 10 : 40 - Math.random() * 10,
        macd: isBullish ? 0.5 + Math.random() * 1.5 : -0.5 - Math.random() * 1.5,
        bollingerPosition: isBullish ? 0.5 + Math.random() * 0.5 : -0.5 - Math.random() * 0.5,
        signal: isBullish ? "bullish" : "bearish"
      },
      marketSentiment: {
        score: isBullish ? 60 + Math.random() * 25 : 40 - Math.random() * 25,
        newsSentiment: isBullish ? "positive" : "negative",
        socialMediaSentiment: isBullish ? "positive" : "negative",
        recentPriceAction: isBullish ? "positive" : "negative"
      },
      sectorMomentum: {
        score: isBullish ? 55 + Math.random() * 25 : 45 - Math.random() * 25,
        sectorTrend: isBullish ? "positive" : "negative",
        relativeStrength: isBullish ? "strong" : "weak",
        sectorRotationPhase: "middle"
      },
      currencyImpact: {
        score: 40 + Math.random() * 30,
        audUsdCorrelation: Math.random() > 0.5 ? "positive" : "negative",
        fxAmplification: "medium",
        currencyTrendAlignment: Math.random() > 0.5 ? "aligned" : "contrary"
      },
      historicalPatterns: {
        score: isBullish ? 55 + Math.random() * 20 : 45 - Math.random() * 20,
        similarTariffEvents: isBullish ? "positive" : "negative",
        seasonalPatterns: Math.random() > 0.5 ? "favorable" : "unfavorable",
        volatilityRegime: "increasing"
      }
    };
    
    // Generate rationale
    const direction = isBullish ? "bullish" : "bearish";
    const summary = isBullish ?
      `Strong bullish outlook for ${stock.name} with projected ${movementPct.toFixed(1)}% upside potential. As a ${stock.riskProfile} risk profile stock with ${stock.annualizedVolatility}% annualized volatility and beta of ${stock.beta}, it offers significant upside potential but requires careful risk management.` :
      `Strong bearish outlook for ${stock.name} with projected ${Math.abs(movementPct).toFixed(1)}% downside risk. As a ${stock.riskProfile} risk profile stock with ${stock.annualizedVolatility}% annualized volatility and beta of ${stock.beta}, it faces substantial downside risk in the current environment.`;
    
    const primaryFactors = [
      `${factors.tariffSensitivity.impact === "high" ? "High" : "Moderate"} tariff sensitivity (${factors.tariffSensitivity.score}%) with significant exposure to US (${factors.tariffSensitivity.usRevenueExposure}% of revenue) and China (${factors.tariffSensitivity.chinaRevenueExposure}% of revenue) markets`,
      `${factors.technicalIndicators.signal === "bullish" ? "Bullish" : "Bearish"} technical indicators with RSI at ${factors.technicalIndicators.rsi.toFixed(1)}, ${factors.technicalIndicators.macd > 0 ? "positive" : "negative"} MACD (${factors.technicalIndicators.macd.toFixed(2)}), and ${factors.technicalIndicators.bollingerPosition > 0 ? "favorable" : "unfavorable"} Bollinger Band position (${factors.technicalIndicators.bollingerPosition.toFixed(2)})`,
      `${factors.marketSentiment.newsSentiment === "positive" ? "Strong positive" : "Strong negative"} market sentiment from both news and social media sources`
    ];
    
    const rationale = {
      summary: summary,
      primaryFactors: primaryFactors,
      additionalConsiderations: [
        `The stock has a ${stock.riskProfile} risk profile within the ${stock.sector} sector`,
        `Current technical signals are ${factors.technicalIndicators.signal} with RSI at ${factors.technicalIndicators.rsi.toFixed(1)}`,
        `The ${stock.sector} sector currently shows ${factors.sectorMomentum.sectorTrend} momentum`,
        `Currency effects are expected to have a ${factors.currencyImpact.audUsdCorrelation} impact on performance`
      ],
      confidenceExplanation: `This prediction has ${confidenceLevel} confidence (${confidenceScore.toFixed(0)}%) based on the consistency of signals across multiple factors and historical model accuracy of 72% for similar predictions.`
    };
    
    return {
      symbol: symbol,
      name: stock.name,
      sector: stock.sector,
      currentPrice: stock.currentPrice,
      timeframe: timeframe,
      predictionHorizon: timeframe === "short_term" ? "1-7 days" : timeframe === "medium_term" ? "8-30 days" : "31-90 days",
      priceTarget: parseFloat(priceTarget.toFixed(2)),
      movementPct: parseFloat(movementPct.toFixed(1)),
      direction: direction,
      confidenceScore: parseInt(confidenceScore.toFixed(0)),
      confidenceLevel: confidenceLevel,
      factors: factors,
      rationale: rationale,
      timestamp: new Date().toISOString(),
      modelVersion: "1.0.0"
    };
  }

  /**
   * Generate mock predictions for multiple stocks
   * @param {Object} options - Filter options
   * @returns {Array} - Mock prediction data for multiple stocks
   */
  generateMockAllPredictions(options) {
    const symbols = ["BHP.AX", "FMG.AX", "TWE.AX", "NAB.AX", "WTC.AX", "RIO.AX", "WOW.AX", "CSL.AX", "ANZ.AX", "QAN.AX"];
    const predictions = [];
    
    for (const symbol of symbols) {
      const prediction = this.generateMockPrediction(symbol, options.timeframe);
      
      // Apply filters
      if (options.sector && prediction.sector !== options.sector) {
        continue;
      }
      
      if (options.riskProfile && prediction.riskProfile !== options.riskProfile) {
        continue;
      }
      
      if (Math.abs(prediction.movementPct) < options.minMovement) {
        continue;
      }
      
      predictions.push(prediction);
    }
    
    // Sort by absolute movement percentage (descending)
    predictions.sort((a, b) => Math.abs(b.movementPct) - Math.abs(a.movementPct));
    
    // Apply limit
    if (options.limit && predictions.length > options.limit) {
      return predictions.slice(0, options.limit);
    }
    
    return predictions;
  }

  /**
   * Generate mock sector predictions
   * @param {string} timeframe - Prediction timeframe
   * @returns {Object} - Mock sector predictions
   */
  generateMockSectorPredictions(timeframe) {
    const sectors = ["Materials", "Consumer Staples", "Healthcare", "Financials", "Information Technology", "Industrials", "Utilities", "Energy"];
    const sectorPredictions = {};
    
    for (const sector of sectors) {
      const isBullish = Math.random() > 0.4; // 60% chance of bullish prediction
      const avgMovement = isBullish ? 
        (3 + Math.random() * 12) : 
        -(3 + Math.random() * 12);
      
      const bullishCount = Math.floor(Math.random() * 5) + 3; // 3-7 bullish stocks
      const bearishCount = Math.floor(Math.random() * 4) + 1; // 1-4 bearish stocks
      const stockCount = bullishCount + bearishCount;
      
      const direction = isBullish ? "bullish" : "bearish";
      
      let rationale;
      if (direction === "bullish") {
        rationale = `The ${sector} sector shows an overall bullish trend with an average projected movement of ${avgMovement.toFixed(1)}%. `;
        if (avgMovement > 10) {
          rationale += `This strong positive outlook is driven by favorable tariff impacts and positive technical indicators across multiple stocks in the sector.`;
        } else {
          rationale += `This moderate positive outlook is supported by a mix of favorable and neutral indicators across stocks in the sector.`;
        }
      } else {
        rationale = `The ${sector} sector shows an overall bearish trend with an average projected movement of ${avgMovement.toFixed(1)}%. `;
        if (avgMovement < -10) {
          rationale += `This strong negative outlook is driven by unfavorable tariff impacts and negative technical indicators across multiple stocks in the sector.`;
        } else {
          rationale += `This moderate negative outlook is indicated by a mix of unfavorable and neutral indicators across stocks in the sector.`;
        }
      }
      
      // Generate top picks
      const topBullish = [];
      const topBearish = [];
      
      const sectorStocks = {
        "Materials": ["BHP.AX", "RIO.AX", "FMG.AX", "S32.AX", "MIN.AX"],
        "Consumer Staples": ["WOW.AX", "COL.AX", "TWE.AX", "A2M.AX", "WES.AX"],
        "Healthcare": ["CSL.AX", "RMD.AX", "COH.AX", "SHL.AX", "FPH.AX"],
        "Financials": ["CBA.AX", "NAB.AX", "WBC.AX", "ANZ.AX", "MQG.AX"],
        "Information Technology": ["WTC.AX", "XRO.AX", "APX.AX", "ALU.AX", "MP1.AX"],
        "Industrials": ["TCL.AX", "SYD.AX", "QAN.AX", "BXB.AX", "AMC.AX"],
        "Utilities": ["AGL.AX", "ORG.AX", "AST.AX", "SKI.AX", "MCY.AX"],
        "Energy": ["WPL.AX", "STO.AX", "OSH.AX", "BPT.AX", "WHC.AX"]
      };
      
      const stocks = sectorStocks[sector] || ["BHP.AX", "FMG.AX", "TWE.AX"];
      
      for (let i = 0; i < 3; i++) {
        if (i < stocks.length) {
          const bullishMovement = 5 + Math.random() * 20;
          topBullish.push({
            symbol: stocks[i],
            name: this.getStockName(stocks[i]),
            movementPct: parseFloat(bullishMovement.toFixed(1))
          });
          
          const bearishMovement = -(5 + Math.random() * 20);
          topBearish.push({
            symbol: stocks[stocks.length - 1 - i],
            name: this.getStockName(stocks[stocks.length - 1 - i]),
            movementPct: parseFloat(bearishMovement.toFixed(1))
          });
        }
      }
      
      sectorPredictions[sector] = {
        sector: sector,
        direction: direction,
        avgMovementPct: parseFloat(avgMovement.toFixed(1)),
        avgConfidence: Math.floor(55 + Math.random() * 20),
        stockCount: stockCount,
        bullishCount: bullishCount,
        bearishCount: bearishCount,
        rationale: rationale,
        topPicks: {
          bullish: topBullish,
          bearish: topBearish
        },
        timeframe: timeframe,
        predictionHorizon: timeframe === "short_term" ? "1-7 days" : timeframe === "medium_term" ? "8-30 days" : "31-90 days",
        timestamp: new Date().toISOString()
      };
    }
    
    return sectorPredictions;
  }

  /**
   * Generate mock prediction factors importance
   * @param {string} symbol - Stock symbol
   * @param {string} timeframe - Prediction timeframe
   * @returns {Object} - Mock factor importance data
   */
  generateMockFactorsImportance(symbol, timeframe) {
    const prediction = this.generateMockPrediction(symbol, timeframe);
    
    const factorWeights = {
      tariffSensitivity: 0.25,
      technicalIndicators: 0.20,
      marketSentiment: 0.15,
      sectorMomentum: 0.15,
      currencyImpact: 0.15,
      historicalPatterns: 0.10
    };
    
    const factorImportance = {};
    let totalContribution = 0;
    
    for (const [factorName, factorData] of Object.entries(prediction.factors)) {
      const weight = factorWeights[factorName];
      const score = factorData.score;
      const weightedContribution = weight * score;
      totalContribution += weightedContribution;
      
      factorImportance[factorName] = {
        rawScore: score,
        weight: weight,
        weightedContribution: weightedContribution,
        details: factorData
      };
    }
    
    // Calculate percentage contribution
    for (const factorName in factorImportance) {
      factorImportance[factorName].contributionPct = parseFloat(
        ((factorImportance[factorName].weightedContribution / totalContribution) * 100).toFixed(1)
      );
    }
    
    // Sort factors by contribution percentage
    const sortedFactors = Object.entries(factorImportance)
      .sort((a, b) => b[1].contributionPct - a[1].contributionPct)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    
    return {
      symbol: symbol,
      name: prediction.name,
      timeframe: timeframe,
      overallPrediction: {
        direction: prediction.direction,
        movementPct: prediction.movementPct,
        confidenceScore: prediction.confidenceScore
      },
      factors: sortedFactors,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Generate mock historical accuracy statistics
   * @returns {Object} - Mock accuracy statistics
   */
  generateMockHistoricalAccuracyStats() {
    return {
      overallAccuracy: 0.72,
      byConfidenceLevel: {
        veryLow: 0.52,
        low: 0.61,
        moderate: 0.70,
        high: 0.78,
        veryHigh: 0.85
      },
      bySector: {
        Materials: 0.75,
        ConsumerStaples: 0.71,
        Healthcare: 0.68,
        Financials: 0.70,
        InformationTechnology: 0.65,
        Industrials: 0.72,
        Utilities: 0.76,
        Energy: 0.69
      },
      byTimeframe: {
        shortTerm: 0.68,
        mediumTerm: 0.72,
        longTerm: 0.64
      },
      byDirection: {
        bullish: 0.74,
        bearish: 0.70
      },
      byMovementMagnitude: {
        small: 0.75,
        medium: 0.72,
        large: 0.65
      },
      timestamp: new Date().toISOString(),
      modelVersion: "1.0.0"
    };
  }

  /**
   * Get stock name from symbol
   * @param {string} symbol - Stock symbol
   * @returns {string} - Stock name
   */
  getStockName(symbol) {
    const stockNames = {
      "BHP.AX": "BHP Group",
      "RIO.AX": "Rio Tinto",
      "FMG.AX": "Fortescue Metals",
      "MIN.AX": "Mineral Resources",
      "S32.AX": "South32",
      "TWE.AX": "Treasury Wine Estates",
      "A2M.AX": "A2 Milk",
      "WES.AX": "Wesfarmers",
      "WOW.AX": "Woolworths Group",
      "COL.AX": "Coles Group",
      "CSL.AX": "CSL Limited",
      "RMD.AX": "ResMed",
      "COH.AX": "Cochlear",
      "SHL.AX": "Sonic Healthcare",
      "FPH.AX": "Fisher & Paykel Healthcare",
      "CBA.AX": "Commonwealth Bank",
      "NAB.AX": "National Australia Bank",
      "WBC.AX": "Westpac Banking",
      "ANZ.AX": "ANZ Group",
      "MQG.AX": "Macquarie Group",
      "WTC.AX": "WiseTech Global",
      "XRO.AX": "Xero",
      "APX.AX": "Appen",
      "ALU.AX": "Altium",
      "MP1.AX": "Megaport",
      "TCL.AX": "Transurban Group",
      "SYD.AX": "Sydney Airport",
      "QAN.AX": "Qantas Airways",
      "BXB.AX": "Brambles",
      "AMC.AX": "Amcor",
      "AGL.AX": "AGL Energy",
      "ORG.AX": "Origin Energy",
      "AST.AX": "AusNet Services",
      "SKI.AX": "Spark Infrastructure",
      "MCY.AX": "Mercury NZ",
      "WPL.AX": "Woodside Energy",
      "STO.AX": "Santos",
      "OSH.AX": "Oil Search",
      "BPT.AX": "Beach Energy",
      "WHC.AX": "Whitehaven Coal"
    };
    
    return stockNames[symbol] || "Unknown Company";
  }
}

// Create a singleton instance
const stockPredictionAPI = new StockPredictionAPI();

// Export the API
export default stockPredictionAPI;
