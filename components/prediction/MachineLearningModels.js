/**
 * Machine Learning Models for Trump Tariff Analysis Website
 * 
 * This module implements machine learning models for predicting tariff impacts,
 * price movements, and identifying trading opportunities.
 */

class MachineLearningModels {
  constructor() {
    this.models = {};
    this.predictions = {};
    this.modelAccuracy = {};
    this.featureImportance = {};
    this.trainingData = {};
    
    // Initialize
    this._initialize();
  }
  
  /**
   * Initialize machine learning models
   * @private
   */
  _initialize() {
    // Load models
    this._loadTariffImpactModel();
    this._loadPriceMovementModel();
    this._loadTradingOpportunityModel();
    this._loadSectorRotationModel();
    this._loadVolatilityPredictionModel();
    
    // Register event listeners
    document.addEventListener('DOMContentLoaded', () => {
      this._setupUI();
    });
  }
  
  /**
   * Load tariff impact model
   * @private
   */
  _loadTariffImpactModel() {
    // In a real implementation, this would load a trained ML model
    // This is a simplified version with sample data and logic
    
    this.models.tariffImpact = {
      name: 'Tariff Impact Prediction Model',
      type: 'Random Forest Classifier',
      version: '1.0',
      description: 'Predicts the impact of Trump tariffs on ASX-listed companies',
      features: [
        'China Exposure',
        'US Exposure',
        'Supply Chain Complexity',
        'Product Tariff Sensitivity',
        'Historical Tariff Reaction',
        'Sector',
        'Market Cap',
        'AUD Sensitivity'
      ],
      classes: [
        'Very High Negative',
        'High Negative',
        'Moderate Negative',
        'Neutral',
        'Moderate Positive',
        'High Positive'
      ],
      lastUpdated: '2025-04-08'
    };
    
    this.featureImportance.tariffImpact = {
      'China Exposure': 0.28,
      'Product Tariff Sensitivity': 0.22,
      'Historical Tariff Reaction': 0.18,
      'Supply Chain Complexity': 0.12,
      'US Exposure': 0.08,
      'AUD Sensitivity': 0.06,
      'Sector': 0.04,
      'Market Cap': 0.02
    };
    
    this.modelAccuracy.tariffImpact = {
      overall: 0.83,
      byClass: {
        'Very High Negative': 0.89,
        'High Negative': 0.85,
        'Moderate Negative': 0.82,
        'Neutral': 0.78,
        'Moderate Positive': 0.81,
        'High Positive': 0.84
      },
      metrics: {
        precision: 0.81,
        recall: 0.79,
        f1Score: 0.80
      }
    };
    
    // Sample predictions for ASX stocks
    this.predictions.tariffImpact = {
      'BHP.AX': {
        prediction: 'High Negative',
        probability: 0.78,
        confidence: 'High',
        factors: {
          'China Exposure': 'Very High',
          'Product Tariff Sensitivity': 'High',
          'Historical Tariff Reaction': 'Negative',
          'Supply Chain Complexity': 'Medium',
          'US Exposure': 'Medium',
          'AUD Sensitivity': 'High',
          'Sector': 'Materials',
          'Market Cap': 'Large'
        },
        explanation: 'BHP has very high exposure to China, which accounts for over 60% of its iron ore exports. Historical data shows BHP stock has reacted negatively to previous tariff announcements. The company\'s products (iron ore, coal) have high tariff sensitivity, and its revenue is strongly influenced by AUD/USD exchange rate movements.',
        tradingImplications: 'Consider short positions or put options if tariffs escalate. Monitor Chinese steel production and infrastructure spending for early warning signals.'
      },
      'FMG.AX': {
        prediction: 'Very High Negative',
        probability: 0.85,
        confidence: 'Very High',
        factors: {
          'China Exposure': 'Very High',
          'Product Tariff Sensitivity': 'Very High',
          'Historical Tariff Reaction': 'Very Negative',
          'Supply Chain Complexity': 'Low',
          'US Exposure': 'Low',
          'AUD Sensitivity': 'Very High',
          'Sector': 'Materials',
          'Market Cap': 'Large'
        },
        explanation: 'Fortescue has extreme exposure to China, with approximately 90% of its iron ore exports going to Chinese steel mills. The company has shown very negative stock price reactions to previous tariff announcements. Unlike more diversified miners, FMG\'s concentrated product portfolio (primarily iron ore) increases its vulnerability.',
        tradingImplications: 'High-risk opportunity for short positions or put options during tariff escalations. Consider pairs trading against less China-exposed materials stocks.'
      },
      'TWE.AX': {
        prediction: 'Very High Negative',
        probability: 0.82,
        confidence: 'High',
        factors: {
          'China Exposure': 'Very High',
          'Product Tariff Sensitivity': 'Very High',
          'Historical Tariff Reaction': 'Very Negative',
          'Supply Chain Complexity': 'Medium',
          'US Exposure': 'High',
          'AUD Sensitivity': 'Medium',
          'Sector': 'Consumer Staples',
          'Market Cap': 'Mid'
        },
        explanation: 'Treasury Wine Estates has already experienced significant negative impacts from Chinese tariffs on Australian wine. The company has been working to diversify markets but remains vulnerable to further trade tensions. Premium wines are particularly sensitive to tariffs due to their discretionary nature and price elasticity.',
        tradingImplications: 'Monitor Chinese diplomatic statements and trade policy for potential short opportunities. Watch for market diversification progress as a potential positive catalyst.'
      },
      'JBH.AX': {
        prediction: 'Moderate Negative',
        probability: 0.68,
        confidence: 'Medium',
        factors: {
          'China Exposure': 'High',
          'Product Tariff Sensitivity': 'High',
          'Historical Tariff Reaction': 'Moderate',
          'Supply Chain Complexity': 'High',
          'US Exposure': 'Medium',
          'AUD Sensitivity': 'Medium',
          'Sector': 'Consumer Discretionary',
          'Market Cap': 'Mid'
        },
        explanation: 'JB Hi-Fi faces indirect exposure through its reliance on imported electronics, many of which are manufactured in China. Tariffs could increase product costs, potentially squeezing margins or reducing consumer demand if passed on. However, the company has shown resilience in managing supply chain challenges.',
        tradingImplications: 'Monitor quarterly sales updates for signs of margin pressure or inventory issues. Consider options strategies to capitalize on potential volatility around tariff announcements.'
      },
      'CSL.AX': {
        prediction: 'Neutral',
        probability: 0.75,
        confidence: 'Medium-High',
        factors: {
          'China Exposure': 'Medium',
          'Product Tariff Sensitivity': 'Low',
          'Historical Tariff Reaction': 'Minimal',
          'Supply Chain Complexity': 'High',
          'US Exposure': 'Very High',
          'AUD Sensitivity': 'Medium',
          'Sector': 'Healthcare',
          'Market Cap': 'Large'
        },
        explanation: 'CSL has limited direct exposure to tariffs as healthcare products typically face fewer trade restrictions. The company\'s global manufacturing footprint and essential nature of its products provide insulation from trade tensions. However, general market volatility during trade disputes could still affect share price.',
        tradingImplications: 'Consider as a defensive position during periods of tariff-related market volatility. May outperform market during trade tensions.'
      },
      'CBA.AX': {
        prediction: 'Moderate Negative',
        probability: 0.62,
        confidence: 'Medium',
        factors: {
          'China Exposure': 'Medium',
          'Product Tariff Sensitivity': 'Low',
          'Historical Tariff Reaction': 'Moderate',
          'Supply Chain Complexity': 'Low',
          'US Exposure': 'Medium',
          'AUD Sensitivity': 'High',
          'Sector': 'Financials',
          'Market Cap': 'Large'
        },
        explanation: 'Commonwealth Bank faces indirect exposure through its lending to sectors affected by tariffs and through potential economic slowdown. Banking sector typically experiences moderate negative impacts from trade tensions due to concerns about broader economic effects and interest rate implications.',
        tradingImplications: 'Monitor loan book exposure to highly affected sectors. Watch for signs of increasing provisions for bad debts as an early warning signal.'
      },
      'WDS.AX': {
        prediction: 'Moderate Negative',
        probability: 0.65,
        confidence: 'Medium',
        factors: {
          'China Exposure': 'High',
          'Product Tariff Sensitivity': 'Medium',
          'Historical Tariff Reaction': 'Moderate',
          'Supply Chain Complexity': 'Medium',
          'US Exposure': 'Medium',
          'AUD Sensitivity': 'High',
          'Sector': 'Energy',
          'Market Cap': 'Large'
        },
        explanation: 'Woodside Energy has significant exposure to Asian markets, including China, for LNG exports. Energy commodities have shown moderate sensitivity to trade tensions, primarily through their correlation with global economic growth expectations rather than direct tariff impacts.',
        tradingImplications: 'Monitor Chinese energy demand and policy statements on energy security. Consider correlation with oil prices when planning trading strategies.'
      },
      'WES.AX': {
        prediction: 'Moderate Negative',
        probability: 0.58,
        confidence: 'Medium',
        factors: {
          'China Exposure': 'Medium-High',
          'Product Tariff Sensitivity': 'Medium',
          'Historical Tariff Reaction': 'Moderate',
          'Supply Chain Complexity': 'High',
          'US Exposure': 'Medium',
          'AUD Sensitivity': 'Medium',
          'Sector': 'Consumer Discretionary',
          'Market Cap': 'Large'
        },
        explanation: 'Wesfarmers has diversified exposure through its retail businesses that import products from China and its industrial businesses that export to various markets. The company\'s diversification provides some insulation, but consumer-facing businesses could see margin pressure from higher import costs.',
        tradingImplications: 'Monitor quarterly retail sales and margin trends. The diversified nature of WES may provide more stability than pure-play retailers.'
      },
      'RIO.AX': {
        prediction: 'High Negative',
        probability: 0.75,
        confidence: 'High',
        factors: {
          'China Exposure': 'Very High',
          'Product Tariff Sensitivity': 'High',
          'Historical Tariff Reaction': 'Negative',
          'Supply Chain Complexity': 'Medium',
          'US Exposure': 'Medium',
          'AUD Sensitivity': 'High',
          'Sector': 'Materials',
          'Market Cap': 'Large'
        },
        explanation: 'Rio Tinto has very high exposure to China, particularly for iron ore exports. The company has shown negative stock price reactions to previous tariff announcements, though its more diversified portfolio (compared to FMG) provides some buffer. Aluminum operations add complexity due to specific tariff history in that sector.',
        tradingImplications: 'Consider short positions during periods of escalating tensions. Monitor Chinese steel production data and infrastructure spending plans as leading indicators.'
      },
      'QAN.AX': {
        prediction: 'Moderate Negative',
        probability: 0.60,
        confidence: 'Medium',
        factors: {
          'China Exposure': 'Medium-High',
          'Product Tariff Sensitivity': 'Low',
          'Historical Tariff Reaction': 'Moderate',
          'Supply Chain Complexity': 'High',
          'US Exposure': 'Medium',
          'AUD Sensitivity': 'High',
          'Sector': 'Industrials',
          'Market Cap': 'Mid'
        },
        explanation: 'Qantas faces indirect exposure through potential impacts on business and leisure travel if trade tensions affect economic growth. The airline industry is sensitive to macroeconomic conditions, though direct tariff impacts are limited. Fuel costs (affected by global growth expectations) are a significant factor.',
        tradingImplications: 'Monitor forward booking trends and yield data. Consider correlation with tourism stocks when planning trading strategies.'
      }
    };
  }
  
  /**
   * Load price movement model
   * @private
   */
  _loadPriceMovementModel() {
    // In a real implementation, this would load a trained ML model
    // This is a simplified version with sample data and logic
    
    this.models.priceMovement = {
      name: 'Price Movement Prediction Model',
      type: 'Gradient Boosting Regressor',
      version: '1.0',
      description: 'Predicts price movements for ASX-listed companies in response to tariff announcements',
      features: [
        'Tariff Impact Score',
        'Historical Volatility',
        'Beta',
        'Market Cap',
        'Sector',
        'Trading Volume',
        'Momentum',
        'Technical Indicators',
        'Sentiment Score'
      ],
      target: 'Percentage Price Movement (30-day)',
      lastUpdated: '2025-04-08'
    };
    
    this.featureImportance.priceMovement = {
      'Tariff Impact Score': 0.25,
      'Historical Volatility': 0.18,
      'Momentum': 0.15,
      'Beta': 0.12,
      'Technical Indicators': 0.10,
      'Sentiment Score': 0.08,
      'Trading Volume': 0.06,
      'Sector': 0.04,
      'Market Cap': 0.02
    };
    
    this.modelAccuracy.priceMovement = {
      metrics: {
        r2Score: 0.76,
        meanAbsoluteError: 3.2,
        meanSquaredError: 18.5,
        medianAbsoluteError: 2.8
      },
      crossValidation: {
        folds: 5,
        scores: [0.74, 0.77, 0.75, 0.78, 0.76],
        mean: 0.76,
        std: 0.015
      }
    };
    
    // Sample predictions for ASX stocks
    this.predictions.priceMovement = {
      'BHP.AX': {
        prediction: -12.5,
        predictionRange: [-18.2, -6.8],
        probability15PctMove: 0.68,
        confidence: 'High',
        timeframe: '30 days',
        factors: {
          'Tariff Impact Score': 'High Negative',
          'Historical Volatility': 28.5,
          'Beta': 1.2,
          'Market Cap': 'Large',
          'Sector': 'Materials',
          'Trading Volume': 'Above Average',
          'Momentum': 'Negative',
          'Technical Indicators': 'Bearish',
          'Sentiment Score': 'Negative'
        },
        explanation: 'BHP is predicted to experience a significant negative price movement due to its high exposure to tariff impacts and negative momentum. Technical indicators are bearish, and sentiment analysis shows increasing negative sentiment. The stock\'s beta of 1.2 suggests it will amplify market movements during periods of tariff-related volatility.',
        tradingImplications: 'High probability of achieving the 15% movement threshold within the 30-day timeframe. Consider short positions, put options, or bear call spreads to capitalize on the expected downward movement.'
      },
      'FMG.AX': {
        prediction: -18.7,
        predictionRange: [-25.3, -12.1],
        probability15PctMove: 0.85,
        confidence: 'Very High',
        timeframe: '30 days',
        factors: {
          'Tariff Impact Score': 'Very High Negative',
          'Historical Volatility': 35.2,
          'Beta': 1.5,
          'Market Cap': 'Large',
          'Sector': 'Materials',
          'Trading Volume': 'High',
          'Momentum': 'Very Negative',
          'Technical Indicators': 'Very Bearish',
          'Sentiment Score': 'Very Negative'
        },
        explanation: 'Fortescue is predicted to experience a very significant negative price movement due to its extreme exposure to tariff impacts, high volatility, and very negative momentum. The stock has historically shown strong reactions to trade tensions, and technical indicators suggest continuation of the downward trend.',
        tradingImplications: 'Very high probability of exceeding the 15% movement threshold within the 30-day timeframe. One of the highest conviction short opportunities in the ASX related to tariff impacts.'
      },
      'TWE.AX': {
        prediction: -16.3,
        predictionRange: [-22.8, -9.8],
        probability15PctMove: 0.78,
        confidence: 'High',
        timeframe: '30 days',
        factors: {
          'Tariff Impact Score': 'Very High Negative',
          'Historical Volatility': 32.1,
          'Beta': 1.3,
          'Market Cap': 'Mid',
          'Sector': 'Consumer Staples',
          'Trading Volume': 'Above Average',
          'Momentum': 'Negative',
          'Technical Indicators': 'Bearish',
          'Sentiment Score': 'Negative'
        },
        explanation: 'Treasury Wine Estates is predicted to experience a significant negative price movement due to its very high exposure to tariff impacts, particularly given its history with Chinese wine tariffs. The stock shows elevated volatility and negative momentum, with bearish technical indicators suggesting continued downward pressure.',
        tradingImplications: 'High probability of achieving the 15% movement threshold within the 30-day timeframe. Consider short positions or put options to capitalize on the expected downward movement.'
      },
      'CSL.AX': {
        prediction: 3.2,
        predictionRange: [-1.5, 7.9],
        probability15PctMove: 0.12,
        confidence: 'Medium',
        timeframe: '30 days',
        factors: {
          'Tariff Impact Score': 'Neutral',
          'Historical Volatility': 22.3,
          'Beta': 0.8,
          'Market Cap': 'Large',
          'Sector': 'Healthcare',
          'Trading Volume': 'Average',
          'Momentum': 'Slightly Positive',
          'Technical Indicators': 'Neutral',
          'Sentiment Score': 'Neutral'
        },
        explanation: 'CSL is predicted to experience a slight positive price movement despite market volatility from tariff impacts. The company\'s limited exposure to tariffs and defensive sector positioning make it a potential safe haven during trade tensions. The lower beta suggests less volatility than the broader market.',
        tradingImplications: 'Low probability of achieving the 15% movement threshold. May be suitable as a defensive position during tariff-related market volatility rather than a high-conviction trading opportunity.'
      },
      'MIN.AX': {
        prediction: -14.8,
        predictionRange: [-21.2, -8.4],
        probability15PctMove: 0.72,
        confidence: 'High',
        timeframe: '30 days',
        factors: {
          'Tariff Impact Score': 'High Negative',
          'Historical Volatility': 38.5,
          'Beta': 1.6,
          'Market Cap': 'Mid',
          'Sector': 'Materials',
          'Trading Volume': 'High',
          'Momentum': 'Negative',
          'Technical Indicators': 'Bearish',
          'Sentiment Score': 'Negative'
        },
        explanation: 'Mineral Resources is predicted to experience a significant negative price movement due to its high exposure to tariff impacts and negative momentum. The stock\'s high beta and volatility suggest amplified reactions to market movements during periods of trade tension.',
        tradingImplications: 'High probability of achieving the 15% movement threshold within the 30-day timeframe. Consider short positions or put options to capitalize on the expected downward movement.'
      }
    };
  }
  
  /**
   * Load trading opportunity model
   * @private
   */
  _loadTradingOpportunityModel() {
    // In a real implementation, this would load a trained ML model
    // This is a simplified version with sample data and logic
    
    this.models.tradingOpportunity = {
      name: 'Trading Opportunity Identification Model',
      type: 'Ensemble (Random Forest + Neural Network)',
      version: '1.0',
      description: 'Identifies and ranks trading opportunities based on tariff impacts and market conditions',
      features: [
        'Price Movement Prediction',
        'Probability of 15% Move',
        'Confidence Score',
        'Risk-Reward Ratio',
        'Liquidity',
        'Options Availability',
        'Technical Setup',
        'Catalyst Timing',
        'Sentiment Trend'
      ],
      target: 'Opportunity Score (0-100)',
      lastUpdated: '2025-04-08'
    };
    
    this.featureImportance.tradingOpportunity = {
      'Price Movement Prediction': 0.22,
      'Probability of 15% Move': 0.20,
      'Risk-Reward Ratio': 0.15,
      'Confidence Score': 0.12,
      'Technical Setup': 0.10,
      'Catalyst Timing': 0.08,
      'Liquidity': 0.06,
      'Options Availability': 0.04,
      'Sentiment Trend': 0.03
    };
    
    this.modelAccuracy.tradingOpportunity = {
      metrics: {
        r2Score: 0.82,
        meanAbsoluteError: 5.8,
        meanSquaredError: 52.3,
        medianAbsoluteError: 4.9
      },
      backtesting: {
        periods: 12,
        successRate: 0.78,
        averageReturn: 18.5,
        sharpeRatio: 1.65,
        maxDrawdown: 12.3
      }
    };
    
    // Sample predictions for ASX stocks
    this.predictions.tradingOpportunity = {
      'FMG.AX': {
        opportunityScore: 87,
        direction: 'Short',
        timeframe: '30 days',
        expectedReturn: -18.7,
        probability15PctMove: 0.85,
        riskRewardRatio: 3.2,
        confidence: 'Very High',
        rank: 1,
        factors: {
          'Price Movement Prediction': -18.7,
          'Probability of 15% Move': 0.85,
          'Risk-Reward Ratio': 3.2,
          'Confidence Score': 'Very High',
          'Technical Setup': 'Very Bearish',
          'Catalyst Timing': 'Imminent',
          'Liquidity': 'High',
          'Options Availability': 'Good',
          'Sentiment Trend': 'Deteriorating'
        },
        explanation: 'Fortescue represents the highest-conviction trading opportunity related to Trump tariff impacts. The combination of very high negative price movement prediction, excellent probability of achieving the 15% threshold, and favorable risk-reward ratio make this a compelling short opportunity. Technical indicators confirm the bearish outlook, and options are available for leveraged exposure.',
        tradingStrategy: 'Consider short positions, put options, or bear call spreads. Entry around $22.50 with initial stop at $24.75 provides favorable risk-reward. Target price of $18.30 based on predicted movement.'
      },
      'TWE.AX': {
        opportunityScore: 82,
        direction: 'Short',
        timeframe: '30 days',
        expectedReturn: -16.3,
        probability15PctMove: 0.78,
        riskRewardRatio: 2.8,
        confidence: 'High',
        rank: 2,
        factors: {
          'Price Movement Prediction': -16.3,
          'Probability of 15% Move': 0.78,
          'Risk-Reward Ratio': 2.8,
          'Confidence Score': 'High',
          'Technical Setup': 'Bearish',
          'Catalyst Timing': 'Imminent',
          'Liquidity': 'Medium',
          'Options Availability': 'Limited',
          'Sentiment Trend': 'Deteriorating'
        },
        explanation: 'Treasury Wine Estates represents a high-conviction short opportunity based on its vulnerability to Chinese retaliatory tariffs. The stock has already demonstrated sensitivity to trade tensions, and technical indicators suggest continued weakness. Limited options availability slightly reduces flexibility in strategy implementation.',
        tradingStrategy: 'Consider short positions with entry around $12.80 and initial stop at $13.95. Target price of $10.70 based on predicted movement. Limited options availability makes direct shorting more practical than options strategies.'
      },
      'MIN.AX': {
        opportunityScore: 78,
        direction: 'Short',
        timeframe: '30 days',
        expectedReturn: -14.8,
        probability15PctMove: 0.72,
        riskRewardRatio: 2.6,
        confidence: 'High',
        rank: 3,
        factors: {
          'Price Movement Prediction': -14.8,
          'Probability of 15% Move': 0.72,
          'Risk-Reward Ratio': 2.6,
          'Confidence Score': 'High',
          'Technical Setup': 'Bearish',
          'Catalyst Timing': 'Imminent',
          'Liquidity': 'Medium',
          'Options Availability': 'Limited',
          'Sentiment Trend': 'Deteriorating'
        },
        explanation: 'Mineral Resources offers a compelling short opportunity due to its high exposure to tariff impacts and negative momentum. The stock\'s high beta and volatility suggest amplified reactions to market movements during periods of trade tension. Technical indicators confirm the bearish outlook.',
        tradingStrategy: 'Consider short positions with entry around $65.20 and initial stop at $70.40. Target price of $55.50 based on predicted movement. Limited options availability makes direct shorting more practical than options strategies.'
      },
      'BHP.AX': {
        opportunityScore: 75,
        direction: 'Short',
        timeframe: '30 days',
        expectedReturn: -12.5,
        probability15PctMove: 0.68,
        riskRewardRatio: 2.4,
        confidence: 'High',
        rank: 4,
        factors: {
          'Price Movement Prediction': -12.5,
          'Probability of 15% Move': 0.68,
          'Risk-Reward Ratio': 2.4,
          'Confidence Score': 'High',
          'Technical Setup': 'Bearish',
          'Catalyst Timing': 'Imminent',
          'Liquidity': 'Very High',
          'Options Availability': 'Excellent',
          'Sentiment Trend': 'Deteriorating'
        },
        explanation: 'BHP offers a solid short opportunity with high liquidity and excellent options availability. While the expected price movement is somewhat lower than other opportunities, the high confidence and excellent trading flexibility make this an attractive option for implementing various strategies.',
        tradingStrategy: 'Consider put options or bear call spreads to capitalize on the expected downward movement. Entry around $45.80 with initial stop at $48.60. Target price of $40.10 based on predicted movement. The excellent options availability allows for sophisticated strategies with defined risk.'
      },
      'RIO.AX': {
        opportunityScore: 72,
        direction: 'Short',
        timeframe: '30 days',
        expectedReturn: -13.2,
        probability15PctMove: 0.65,
        riskRewardRatio: 2.3,
        confidence: 'Medium-High',
        rank: 5,
        factors: {
          'Price Movement Prediction': -13.2,
          'Probability of 15% Move': 0.65,
          'Risk-Reward Ratio': 2.3,
          'Confidence Score': 'Medium-High',
          'Technical Setup': 'Bearish',
          'Catalyst Timing': 'Imminent',
          'Liquidity': 'High',
          'Options Availability': 'Good',
          'Sentiment Trend': 'Deteriorating'
        },
        explanation: 'Rio Tinto presents a solid short opportunity with good liquidity and options availability. The expected price movement and probability of achieving the 15% threshold are somewhat lower than the top opportunities, but still attractive for the high-risk strategy.',
        tradingStrategy: 'Consider put options or short positions with entry around $125.40 and initial stop at $133.20. Target price of $108.80 based on predicted movement. Good options availability provides flexibility in strategy implementation.'
      },
      'JBH.AX': {
        opportunityScore: 65,
        direction: 'Short',
        timeframe: '30 days',
        expectedReturn: -10.8,
        probability15PctMove: 0.58,
        riskRewardRatio: 2.1,
        confidence: 'Medium',
        rank: 6,
        factors: {
          'Price Movement Prediction': -10.8,
          'Probability of 15% Move': 0.58,
          'Risk-Reward Ratio': 2.1,
          'Confidence Score': 'Medium',
          'Technical Setup': 'Moderately Bearish',
          'Catalyst Timing': 'Imminent',
          'Liquidity': 'Medium',
          'Options Availability': 'Limited',
          'Sentiment Trend': 'Slightly Deteriorating'
        },
        explanation: 'JB Hi-Fi offers a moderate short opportunity with medium confidence. The expected price movement is below the 15% threshold, but there\'s still a reasonable probability of achieving that level. The indirect nature of tariff impacts on JBH introduces some uncertainty.',
        tradingStrategy: 'Consider short positions with entry around $52.30 and initial stop at $55.40. Target price of $46.65 based on predicted movement. Limited options availability makes direct shorting more practical than options strategies.'
      },
      'CSL.AX': {
        opportunityScore: 58,
        direction: 'Long',
        timeframe: '30 days',
        expectedReturn: 3.2,
        probability15PctMove: 0.12,
        riskRewardRatio: 1.2,
        confidence: 'Medium',
        rank: 7,
        factors: {
          'Price Movement Prediction': 3.2,
          'Probability of 15% Move': 0.12,
          'Risk-Reward Ratio': 1.2,
          'Confidence Score': 'Medium',
          'Technical Setup': 'Neutral',
          'Catalyst Timing': 'Uncertain',
          'Liquidity': 'High',
          'Options Availability': 'Good',
          'Sentiment Trend': 'Stable'
        },
        explanation: 'CSL represents a potential defensive position rather than a high-conviction trading opportunity. The expected positive price movement is modest, and the probability of achieving the 15% threshold is low. However, the stock may outperform during periods of tariff-related market volatility.',
        tradingStrategy: 'Consider as a defensive position during periods of market volatility rather than a primary trading opportunity. If implementing, consider long positions with tight risk management or pair with short positions in highly exposed stocks for a market-neutral approach.'
      }
    };
  }
  
  /**
   * Load sector rotation model
   * @private
   */
  _loadSectorRotationModel() {
    // In a real implementation, this would load a trained ML model
    // This is a simplified version with sample data and logic
    
    this.models.sectorRotation = {
      name: 'Sector Rotation Prediction Model',
      type: 'Hidden Markov Model',
      version: '1.0',
      description: 'Predicts sector rotation patterns in response to tariff developments',
      features: [
        'Tariff Escalation Level',
        'Sector Tariff Sensitivity',
        'Historical Sector Performance',
        'Sector Momentum',
        'Sector Valuation',
        'Economic Indicators',
        'Market Sentiment'
      ],
      target: 'Sector Relative Performance',
      lastUpdated: '2025-04-08'
    };
    
    this.featureImportance.sectorRotation = {
      'Tariff Escalation Level': 0.25,
      'Sector Tariff Sensitivity': 0.22,
      'Historical Sector Performance': 0.18,
      'Sector Momentum': 0.15,
      'Economic Indicators': 0.10,
      'Sector Valuation': 0.06,
      'Market Sentiment': 0.04
    };
    
    this.modelAccuracy.sectorRotation = {
      metrics: {
        accuracyScore: 0.72,
        precisionScore: 0.68,
        recallScore: 0.70,
        f1Score: 0.69
      },
      backtesting: {
        periods: 8,
        successRate: 0.75,
        averageAlpha: 3.8,
        informationRatio: 1.25
      }
    };
    
    // Sample predictions for ASX sectors
    this.predictions.sectorRotation = {
      'Materials': {
        relativePerformance: 'Significant Underperformance',
        expectedReturn: -8.5,
        confidence: 'High',
        factors: {
          'Tariff Escalation Level': 'High',
          'Sector Tariff Sensitivity': 'Very High',
          'Historical Sector Performance': 'Negative',
          'Sector Momentum': 'Negative',
          'Sector Valuation': 'Average',
          'Economic Indicators': 'Weakening',
          'Market Sentiment': 'Negative'
        },
        explanation: 'The Materials sector is expected to significantly underperform the broader market due to its high exposure to tariff impacts, particularly through China-exposed miners. Historical data shows the sector has underperformed during previous periods of trade tension, and current momentum is negative.',
        tradingImplications: 'Consider underweighting Materials in sector allocation. For sector rotation strategies, rotate out of Materials into defensive sectors like Healthcare and Utilities.'
      },
      'Consumer Staples': {
        relativePerformance: 'Moderate Underperformance',
        expectedReturn: -4.2,
        confidence: 'Medium',
        factors: {
          'Tariff Escalation Level': 'High',
          'Sector Tariff Sensitivity': 'Medium-High',
          'Historical Sector Performance': 'Mixed',
          'Sector Momentum': 'Slightly Negative',
          'Sector Valuation': 'Average',
          'Economic Indicators': 'Weakening',
          'Market Sentiment': 'Slightly Negative'
        },
        explanation: 'The Consumer Staples sector is expected to moderately underperform due to mixed exposure to tariff impacts. Companies with significant exports to China (e.g., wine, dairy, meat) face direct risks, while domestic-focused staples may be more resilient.',
        tradingImplications: 'Consider selective positioning within the sector, avoiding companies with high China exposure while maintaining positions in domestically-focused staples.'
      },
      'Healthcare': {
        relativePerformance: 'Moderate Outperformance',
        expectedReturn: 2.8,
        confidence: 'Medium-High',
        factors: {
          'Tariff Escalation Level': 'High',
          'Sector Tariff Sensitivity': 'Low',
          'Historical Sector Performance': 'Positive',
          'Sector Momentum': 'Positive',
          'Sector Valuation': 'Above Average',
          'Economic Indicators': 'Weakening',
          'Market Sentiment': 'Positive'
        },
        explanation: 'The Healthcare sector is expected to outperform during periods of tariff-related market volatility due to its defensive characteristics and limited direct exposure to tariffs. The sector has historically served as a safe haven during trade tensions.',
        tradingImplications: 'Consider overweighting Healthcare in sector allocation. For sector rotation strategies, rotate into Healthcare from highly exposed sectors like Materials and Consumer Discretionary.'
      },
      'Financials': {
        relativePerformance: 'Slight Underperformance',
        expectedReturn: -2.5,
        confidence: 'Medium',
        factors: {
          'Tariff Escalation Level': 'High',
          'Sector Tariff Sensitivity': 'Medium',
          'Historical Sector Performance': 'Mixed',
          'Sector Momentum': 'Neutral',
          'Sector Valuation': 'Average',
          'Economic Indicators': 'Weakening',
          'Market Sentiment': 'Slightly Negative'
        },
        explanation: 'The Financials sector is expected to slightly underperform due to concerns about broader economic impacts of trade tensions. Banks face indirect exposure through their lending to affected sectors, though the impact is expected to be moderate rather than severe.',
        tradingImplications: 'Consider neutral to slight underweight positioning in Financials. Within the sector, favor insurers and diversified financials over banks with high exposure to affected industries.'
      },
      'Information Technology': {
        relativePerformance: 'Mixed',
        expectedReturn: 0.5,
        confidence: 'Low',
        factors: {
          'Tariff Escalation Level': 'High',
          'Sector Tariff Sensitivity': 'Medium-High',
          'Historical Sector Performance': 'Mixed',
          'Sector Momentum': 'Positive',
          'Sector Valuation': 'Above Average',
          'Economic Indicators': 'Weakening',
          'Market Sentiment': 'Mixed'
        },
        explanation: 'The Information Technology sector is expected to show mixed performance with high variability between companies. Those with significant hardware manufacturing exposure face supply chain risks, while software and services companies may be more insulated.',
        tradingImplications: 'Consider selective positioning within the sector, favoring software and services over hardware. Company-specific analysis is particularly important in this sector.'
      },
      'Utilities': {
        relativePerformance: 'Significant Outperformance',
        expectedReturn: 3.5,
        confidence: 'High',
        factors: {
          'Tariff Escalation Level': 'High',
          'Sector Tariff Sensitivity': 'Very Low',
          'Historical Sector Performance': 'Positive',
          'Sector Momentum': 'Positive',
          'Sector Valuation': 'Average',
          'Economic Indicators': 'Weakening',
          'Market Sentiment': 'Positive'
        },
        explanation: 'The Utilities sector is expected to significantly outperform during periods of tariff-related market volatility due to its defensive characteristics, stable cash flows, and minimal direct exposure to tariffs. The sector has historically served as a safe haven during trade tensions.',
        tradingImplications: 'Consider overweighting Utilities in sector allocation. For sector rotation strategies, rotate into Utilities from highly exposed sectors for defensive positioning.'
      },
      'Energy': {
        relativePerformance: 'Moderate Underperformance',
        expectedReturn: -3.8,
        confidence: 'Medium',
        factors: {
          'Tariff Escalation Level': 'High',
          'Sector Tariff Sensitivity': 'Medium',
          'Historical Sector Performance': 'Negative',
          'Sector Momentum': 'Slightly Negative',
          'Sector Valuation': 'Below Average',
          'Economic Indicators': 'Weakening',
          'Market Sentiment': 'Slightly Negative'
        },
        explanation: 'The Energy sector is expected to moderately underperform due to concerns about global growth impacts from trade tensions affecting energy demand. The sector has some direct exposure through LNG exports to Asia, though the impact is primarily through correlation with economic growth expectations.',
        tradingImplications: 'Consider underweighting Energy in sector allocation. Within the sector, favor companies with long-term contracts and diversified customer bases.'
      },
      'Consumer Discretionary': {
        relativePerformance: 'Significant Underperformance',
        expectedReturn: -7.2,
        confidence: 'Medium-High',
        factors: {
          'Tariff Escalation Level': 'High',
          'Sector Tariff Sensitivity': 'High',
          'Historical Sector Performance': 'Negative',
          'Sector Momentum': 'Negative',
          'Sector Valuation': 'Average',
          'Economic Indicators': 'Weakening',
          'Market Sentiment': 'Negative'
        },
        explanation: 'The Consumer Discretionary sector is expected to significantly underperform due to both direct exposure (import costs for retailers) and indirect exposure (consumer spending sensitivity to economic uncertainty). The sector is particularly vulnerable to tariff-related economic slowdowns.',
        tradingImplications: 'Consider underweighting Consumer Discretionary in sector allocation. For sector rotation strategies, rotate out of Consumer Discretionary into defensive sectors like Healthcare and Utilities.'
      }
    };
  }
  
  /**
   * Load volatility prediction model
   * @private
   */
  _loadVolatilityPredictionModel() {
    // In a real implementation, this would load a trained ML model
    // This is a simplified version with sample data and logic
    
    this.models.volatilityPrediction = {
      name: 'Volatility Prediction Model',
      type: 'GARCH + Neural Network',
      version: '1.0',
      description: 'Predicts volatility changes in response to tariff developments',
      features: [
        'Tariff Escalation Level',
        'Historical Volatility',
        'Market Volatility (VIX)',
        'Trading Volume',
        'News Sentiment Volatility',
        'Options Implied Volatility',
        'Technical Volatility Indicators'
      ],
      target: 'Forward 30-day Volatility',
      lastUpdated: '2025-04-08'
    };
    
    this.featureImportance.volatilityPrediction = {
      'Tariff Escalation Level': 0.24,
      'Historical Volatility': 0.20,
      'Market Volatility (VIX)': 0.18,
      'Options Implied Volatility': 0.15,
      'News Sentiment Volatility': 0.12,
      'Technical Volatility Indicators': 0.08,
      'Trading Volume': 0.03
    };
    
    this.modelAccuracy.volatilityPrediction = {
      metrics: {
        r2Score: 0.78,
        meanAbsoluteError: 2.8,
        meanSquaredError: 12.5,
        medianAbsoluteError: 2.3
      },
      backtesting: {
        periods: 10,
        successRate: 0.80,
        averageAccuracy: 82.5,
        directionAccuracy: 0.85
      }
    };
    
    // Sample predictions for ASX stocks
    this.predictions.volatilityPrediction = {
      'FMG.AX': {
        currentVolatility: 35.2,
        predictedVolatility: 48.7,
        volatilityChange: 13.5,
        confidence: 'Very High',
        factors: {
          'Tariff Escalation Level': 'High',
          'Historical Volatility': 'High',
          'Market Volatility (VIX)': 'Elevated',
          'Trading Volume': 'Increasing',
          'News Sentiment Volatility': 'High',
          'Options Implied Volatility': 'Rising',
          'Technical Volatility Indicators': 'Bullish Volatility'
        },
        explanation: 'Fortescue is predicted to experience a significant increase in volatility due to its extreme sensitivity to tariff developments. The stock\'s concentrated exposure to China and historical pattern of volatile reactions to trade news support this prediction. Rising options implied volatility confirms market expectations of increased price swings.',
        tradingImplications: 'Consider volatility-based strategies such as long straddles or strangles to capitalize on expected price swings regardless of direction. Alternatively, use the predicted volatility increase to adjust position sizing for directional trades.'
      },
      'BHP.AX': {
        currentVolatility: 28.5,
        predictedVolatility: 38.2,
        volatilityChange: 9.7,
        confidence: 'High',
        factors: {
          'Tariff Escalation Level': 'High',
          'Historical Volatility': 'Medium-High',
          'Market Volatility (VIX)': 'Elevated',
          'Trading Volume': 'Slightly Increasing',
          'News Sentiment Volatility': 'Medium-High',
          'Options Implied Volatility': 'Rising',
          'Technical Volatility Indicators': 'Bullish Volatility'
        },
        explanation: 'BHP is predicted to experience a significant increase in volatility, though somewhat less than FMG due to its more diversified operations. The stock\'s sensitivity to tariff news and correlation with global growth expectations support this prediction. Options market activity suggests traders are positioning for increased volatility.',
        tradingImplications: 'Consider volatility-based strategies or adjust position sizing for directional trades. The liquid options market for BHP provides good opportunities for implementing volatility strategies.'
      },
      'TWE.AX': {
        currentVolatility: 32.1,
        predictedVolatility: 45.3,
        volatilityChange: 13.2,
        confidence: 'High',
        factors: {
          'Tariff Escalation Level': 'High',
          'Historical Volatility': 'High',
          'Market Volatility (VIX)': 'Elevated',
          'Trading Volume': 'Increasing',
          'News Sentiment Volatility': 'Very High',
          'Options Implied Volatility': 'Rising',
          'Technical Volatility Indicators': 'Bullish Volatility'
        },
        explanation: 'Treasury Wine Estates is predicted to experience a significant increase in volatility due to its direct exposure to Chinese tariffs on Australian wine. The stock has shown high sensitivity to trade news, and sentiment analysis indicates increasing uncertainty. Limited options liquidity may exacerbate price swings.',
        tradingImplications: 'Consider adjusting position sizing for directional trades to account for increased volatility. Limited options liquidity may make direct volatility strategies less practical than for more liquid stocks.'
      },
      'CSL.AX': {
        currentVolatility: 22.3,
        predictedVolatility: 25.8,
        volatilityChange: 3.5,
        confidence: 'Medium',
        factors: {
          'Tariff Escalation Level': 'High',
          'Historical Volatility': 'Medium',
          'Market Volatility (VIX)': 'Elevated',
          'Trading Volume': 'Stable',
          'News Sentiment Volatility': 'Low',
          'Options Implied Volatility': 'Slightly Rising',
          'Technical Volatility Indicators': 'Neutral'
        },
        explanation: 'CSL is predicted to experience a modest increase in volatility, significantly less than tariff-sensitive stocks. The company\'s limited exposure to tariffs and defensive characteristics suggest it will be relatively insulated from trade-related volatility, though broader market volatility will have some impact.',
        tradingImplications: 'The modest expected volatility increase suggests maintaining normal position sizing for directional trades. CSL may be suitable as a lower-volatility component in a portfolio during periods of tariff-related market turbulence.'
      },
      'RIO.AX': {
        currentVolatility: 30.2,
        predictedVolatility: 39.8,
        volatilityChange: 9.6,
        confidence: 'High',
        factors: {
          'Tariff Escalation Level': 'High',
          'Historical Volatility': 'Medium-High',
          'Market Volatility (VIX)': 'Elevated',
          'Trading Volume': 'Slightly Increasing',
          'News Sentiment Volatility': 'Medium-High',
          'Options Implied Volatility': 'Rising',
          'Technical Volatility Indicators': 'Bullish Volatility'
        },
        explanation: 'Rio Tinto is predicted to experience a significant increase in volatility similar to BHP, reflecting its exposure to tariff impacts through its significant China-focused iron ore business. The stock\'s historical pattern of volatile reactions to trade news supports this prediction.',
        tradingImplications: 'Consider volatility-based strategies or adjust position sizing for directional trades. The liquid options market for RIO provides good opportunities for implementing volatility strategies.'
      }
    };
  }
  
  /**
   * Setup UI
   * @private
   */
  _setupUI() {
    // Check if machine learning container exists
    const container = document.getElementById('machine-learning-container');
    if (!container) return;
    
    // Create machine learning UI
    this._createMachineLearningUI(container);
  }
  
  /**
   * Create machine learning UI
   * @param {HTMLElement} container - Container element
   * @private
   */
  _createMachineLearningUI(container) {
    // Create tabs
    container.innerHTML = `
      <div class="ml-header">
        <h2>Machine Learning Predictions</h2>
        <p class="ml-description">AI-powered predictions for tariff impacts, price movements, and trading opportunities</p>
      </div>
      <div class="ml-tabs">
        <button class="ml-tab active" data-tab="tariff-impact">Tariff Impact</button>
        <button class="ml-tab" data-tab="price-movement">Price Movement</button>
        <button class="ml-tab" data-tab="trading-opportunity">Trading Opportunities</button>
        <button class="ml-tab" data-tab="sector-rotation">Sector Rotation</button>
        <button class="ml-tab" data-tab="volatility">Volatility Prediction</button>
      </div>
      <div class="ml-content" id="ml-content">
        ${this._generateTariffImpactTabContent()}
      </div>
    `;
    
    // Add tab event listeners
    container.querySelectorAll('.ml-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active state
        container.querySelectorAll('.ml-tab').forEach(t => {
          t.classList.remove('active');
        });
        tab.classList.add('active');
        
        // Update tab content
        const tabName = tab.getAttribute('data-tab');
        const tabContent = document.getElementById('ml-content');
        
        switch (tabName) {
          case 'tariff-impact':
            tabContent.innerHTML = this._generateTariffImpactTabContent();
            break;
          case 'price-movement':
            tabContent.innerHTML = this._generatePriceMovementTabContent();
            break;
          case 'trading-opportunity':
            tabContent.innerHTML = this._generateTradingOpportunityTabContent();
            break;
          case 'sector-rotation':
            tabContent.innerHTML = this._generateSectorRotationTabContent();
            break;
          case 'volatility':
            tabContent.innerHTML = this._generateVolatilityTabContent();
            break;
        }
      });
    });
  }
  
  /**
   * Generate tariff impact tab content
   * @returns {string} Tab content HTML
   * @private
   */
  _generateTariffImpactTabContent() {
    return `
      <div class="tariff-impact-content">
        <div class="model-info-section">
          <h3>Tariff Impact Prediction Model</h3>
          <div class="model-details">
            <div class="model-detail">
              <div class="detail-label">Model Type:</div>
              <div class="detail-value">${this.models.tariffImpact.type}</div>
            </div>
            <div class="model-detail">
              <div class="detail-label">Accuracy:</div>
              <div class="detail-value">${(this.modelAccuracy.tariffImpact.overall * 100).toFixed(1)}%</div>
            </div>
            <div class="model-detail">
              <div class="detail-label">Last Updated:</div>
              <div class="detail-value">${this.models.tariffImpact.lastUpdated}</div>
            </div>
          </div>
          <div class="model-description">
            <p>${this.models.tariffImpact.description}</p>
          </div>
        </div>
        
        <div class="feature-importance-section">
          <h3>Feature Importance</h3>
          <div class="feature-importance-chart">
            <div class="feature-bars">
              ${Object.entries(this.featureImportance.tariffImpact)
                .sort((a, b) => b[1] - a[1])
                .map(([feature, importance]) => `
                  <div class="feature-bar">
                    <div class="feature-label">${feature}:</div>
                    <div class="feature-meter">
                      <div class="feature-value" style="width: ${importance * 100}%"></div>
                    </div>
                    <div class="feature-percentage">${(importance * 100).toFixed(1)}%</div>
                  </div>
                `).join('')}
            </div>
          </div>
        </div>
        
        <div class="predictions-section">
          <h3>Stock Predictions</h3>
          <div class="predictions-filters">
            <div class="filter-group">
              <label for="tariff-impact-filter">Impact Level:</label>
              <select id="tariff-impact-filter" class="filter-select">
                <option value="all">All Impact Levels</option>
                <option value="Very High Negative">Very High Negative</option>
                <option value="High Negative">High Negative</option>
                <option value="Moderate Negative">Moderate Negative</option>
                <option value="Neutral">Neutral</option>
                <option value="Moderate Positive">Moderate Positive</option>
                <option value="High Positive">High Positive</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="tariff-confidence-filter">Confidence:</label>
              <select id="tariff-confidence-filter" class="filter-select">
                <option value="all">All Confidence Levels</option>
                <option value="Very High">Very High</option>
                <option value="High">High</option>
                <option value="Medium-High">Medium-High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          
          <div class="predictions-list">
            ${Object.entries(this.predictions.tariffImpact).map(([symbol, prediction]) => `
              <div class="prediction-card" data-impact="${prediction.prediction}" data-confidence="${prediction.confidence}">
                <div class="prediction-header">
                  <div class="prediction-title">
                    <h4>${symbol}</h4>
                    <div class="prediction-confidence ${this._getConfidenceClass(prediction.confidence)}">${prediction.confidence} Confidence</div>
                  </div>
                  <div class="prediction-result ${this._getImpactClass(prediction.prediction)}">${prediction.prediction}</div>
                </div>
                <div class="prediction-details">
                  <div class="prediction-probability">
                    <div class="probability-label">Probability:</div>
                    <div class="probability-meter">
                      <div class="probability-value" style="width: ${prediction.probability * 100}%"></div>
                    </div>
                    <div class="probability-percentage">${(prediction.probability * 100).toFixed(0)}%</div>
                  </div>
                  <div class="prediction-factors">
                    <h5>Key Factors</h5>
                    <div class="factors-grid">
                      ${Object.entries(prediction.factors).slice(0, 4).map(([factor, value]) => `
                        <div class="factor-item">
                          <div class="factor-name">${factor}:</div>
                          <div class="factor-value">${value}</div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                  <div class="prediction-explanation">
                    <h5>Explanation</h5>
                    <p>${prediction.explanation}</p>
                  </div>
                  <div class="prediction-implications">
                    <h5>Trading Implications</h5>
                    <p>${prediction.tradingImplications}</p>
                  </div>
                </div>
                <button class="view-details-button" data-symbol="${symbol}" data-model="tariffImpact">View Full Analysis</button>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="prediction-detail-modal" id="tariff-impact-detail-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="modal-stock-name"></h3>
              <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body" id="modal-prediction-details">
              <!-- Prediction details will be dynamically inserted here -->
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate price movement tab content
   * @returns {string} Tab content HTML
   * @private
   */
  _generatePriceMovementTabContent() {
    return `
      <div class="price-movement-content">
        <div class="model-info-section">
          <h3>Price Movement Prediction Model</h3>
          <div class="model-details">
            <div class="model-detail">
              <div class="detail-label">Model Type:</div>
              <div class="detail-value">${this.models.priceMovement.type}</div>
            </div>
            <div class="model-detail">
              <div class="detail-label">R² Score:</div>
              <div class="detail-value">${this.modelAccuracy.priceMovement.metrics.r2Score.toFixed(2)}</div>
            </div>
            <div class="model-detail">
              <div class="detail-label">Last Updated:</div>
              <div class="detail-value">${this.models.priceMovement.lastUpdated}</div>
            </div>
          </div>
          <div class="model-description">
            <p>${this.models.priceMovement.description}</p>
          </div>
        </div>
        
        <div class="feature-importance-section">
          <h3>Feature Importance</h3>
          <div class="feature-importance-chart">
            <div class="feature-bars">
              ${Object.entries(this.featureImportance.priceMovement)
                .sort((a, b) => b[1] - a[1])
                .map(([feature, importance]) => `
                  <div class="feature-bar">
                    <div class="feature-label">${feature}:</div>
                    <div class="feature-meter">
                      <div class="feature-value" style="width: ${importance * 100}%"></div>
                    </div>
                    <div class="feature-percentage">${(importance * 100).toFixed(1)}%</div>
                  </div>
                `).join('')}
            </div>
          </div>
        </div>
        
        <div class="predictions-section">
          <h3>Price Movement Predictions</h3>
          <div class="predictions-filters">
            <div class="filter-group">
              <label for="price-movement-filter">Movement:</label>
              <select id="price-movement-filter" class="filter-select">
                <option value="all">All Movements</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="price-probability-filter">15% Move Probability:</label>
              <select id="price-probability-filter" class="filter-select">
                <option value="all">All Probabilities</option>
                <option value="very-high">Very High (80%+)</option>
                <option value="high">High (60-80%)</option>
                <option value="medium">Medium (40-60%)</option>
                <option value="low">Low (<40%)</option>
              </select>
            </div>
          </div>
          
          <div class="predictions-list">
            ${Object.entries(this.predictions.priceMovement).map(([symbol, prediction]) => `
              <div class="prediction-card" 
                data-movement="${prediction.prediction > 0 ? 'positive' : 'negative'}" 
                data-probability="${this._getProbabilityClass(prediction.probability15PctMove)}">
                <div class="prediction-header">
                  <div class="prediction-title">
                    <h4>${symbol}</h4>
                    <div class="prediction-confidence ${this._getConfidenceClass(prediction.confidence)}">${prediction.confidence} Confidence</div>
                  </div>
                  <div class="prediction-result ${prediction.prediction > 0 ? 'positive-movement' : 'negative-movement'}">
                    ${prediction.prediction > 0 ? '+' : ''}${prediction.prediction.toFixed(1)}%
                  </div>
                </div>
                <div class="prediction-details">
                  <div class="prediction-range">
                    <div class="range-label">Prediction Range:</div>
                    <div class="range-values">
                      <span class="${prediction.predictionRange[0] > 0 ? 'positive-movement' : 'negative-movement'}">
                        ${prediction.predictionRange[0] > 0 ? '+' : ''}${prediction.predictionRange[0].toFixed(1)}%
                      </span>
                      to
                      <span class="${prediction.predictionRange[1] > 0 ? 'positive-movement' : 'negative-movement'}">
                        ${prediction.predictionRange[1] > 0 ? '+' : ''}${prediction.predictionRange[1].toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div class="prediction-probability">
                    <div class="probability-label">Probability of 15% Move:</div>
                    <div class="probability-meter">
                      <div class="probability-value" style="width: ${prediction.probability15PctMove * 100}%"></div>
                    </div>
                    <div class="probability-percentage">${(prediction.probability15PctMove * 100).toFixed(0)}%</div>
                  </div>
                  <div class="prediction-factors">
                    <h5>Key Factors</h5>
                    <div class="factors-grid">
                      ${Object.entries(prediction.factors).slice(0, 4).map(([factor, value]) => `
                        <div class="factor-item">
                          <div class="factor-name">${factor}:</div>
                          <div class="factor-value">${value}</div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                  <div class="prediction-explanation">
                    <h5>Explanation</h5>
                    <p>${prediction.explanation}</p>
                  </div>
                  <div class="prediction-implications">
                    <h5>Trading Implications</h5>
                    <p>${prediction.tradingImplications}</p>
                  </div>
                </div>
                <button class="view-details-button" data-symbol="${symbol}" data-model="priceMovement">View Full Analysis</button>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="prediction-detail-modal" id="price-movement-detail-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="modal-stock-name-price"></h3>
              <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body" id="modal-price-details">
              <!-- Prediction details will be dynamically inserted here -->
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate trading opportunity tab content
   * @returns {string} Tab content HTML
   * @private
   */
  _generateTradingOpportunityTabContent() {
    return `
      <div class="trading-opportunity-content">
        <div class="model-info-section">
          <h3>Trading Opportunity Identification Model</h3>
          <div class="model-details">
            <div class="model-detail">
              <div class="detail-label">Model Type:</div>
              <div class="detail-value">${this.models.tradingOpportunity.type}</div>
            </div>
            <div class="model-detail">
              <div class="detail-label">Backtesting Success Rate:</div>
              <div class="detail-value">${(this.modelAccuracy.tradingOpportunity.backtesting.successRate * 100).toFixed(0)}%</div>
            </div>
            <div class="model-detail">
              <div class="detail-label">Last Updated:</div>
              <div class="detail-value">${this.models.tradingOpportunity.lastUpdated}</div>
            </div>
          </div>
          <div class="model-description">
            <p>${this.models.tradingOpportunity.description}</p>
          </div>
        </div>
        
        <div class="feature-importance-section">
          <h3>Feature Importance</h3>
          <div class="feature-importance-chart">
            <div class="feature-bars">
              ${Object.entries(this.featureImportance.tradingOpportunity)
                .sort((a, b) => b[1] - a[1])
                .map(([feature, importance]) => `
                  <div class="feature-bar">
                    <div class="feature-label">${feature}:</div>
                    <div class="feature-meter">
                      <div class="feature-value" style="width: ${importance * 100}%"></div>
                    </div>
                    <div class="feature-percentage">${(importance * 100).toFixed(1)}%</div>
                  </div>
                `).join('')}
            </div>
          </div>
        </div>
        
        <div class="top-opportunities-section">
          <h3>Top Trading Opportunities</h3>
          <div class="opportunities-list">
            ${Object.entries(this.predictions.tradingOpportunity)
              .sort((a, b) => b[1].opportunityScore - a[1].opportunityScore)
              .slice(0, 5)
              .map(([symbol, opportunity]) => `
                <div class="opportunity-card">
                  <div class="opportunity-header">
                    <div class="opportunity-title">
                      <h4>${symbol}</h4>
                      <div class="opportunity-direction ${opportunity.direction.toLowerCase()}-direction">${opportunity.direction}</div>
                    </div>
                    <div class="opportunity-score">
                      <div class="score-label">Score:</div>
                      <div class="score-value">${opportunity.opportunityScore}</div>
                    </div>
                  </div>
                  <div class="opportunity-details">
                    <div class="opportunity-metrics">
                      <div class="metric-item">
                        <div class="metric-label">Expected Return:</div>
                        <div class="metric-value ${opportunity.expectedReturn > 0 ? 'positive-movement' : 'negative-movement'}">
                          ${opportunity.expectedReturn > 0 ? '+' : ''}${opportunity.expectedReturn.toFixed(1)}%
                        </div>
                      </div>
                      <div class="metric-item">
                        <div class="metric-label">15% Move Probability:</div>
                        <div class="metric-value">${(opportunity.probability15PctMove * 100).toFixed(0)}%</div>
                      </div>
                      <div class="metric-item">
                        <div class="metric-label">Risk-Reward Ratio:</div>
                        <div class="metric-value">${opportunity.riskRewardRatio.toFixed(1)}</div>
                      </div>
                      <div class="metric-item">
                        <div class="metric-label">Confidence:</div>
                        <div class="metric-value ${this._getConfidenceClass(opportunity.confidence)}">${opportunity.confidence}</div>
                      </div>
                    </div>
                    <div class="opportunity-explanation">
                      <h5>Rationale</h5>
                      <p>${opportunity.explanation}</p>
                    </div>
                    <div class="opportunity-strategy">
                      <h5>Trading Strategy</h5>
                      <p>${opportunity.tradingStrategy}</p>
                    </div>
                  </div>
                  <button class="view-details-button" data-symbol="${symbol}" data-model="tradingOpportunity">View Full Analysis</button>
                </div>
              `).join('')}
          </div>
        </div>
        
        <div class="all-opportunities-section">
          <h3>All Trading Opportunities</h3>
          <div class="opportunities-table-container">
            <table class="opportunities-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Stock</th>
                  <th>Direction</th>
                  <th>Score</th>
                  <th>Expected Return</th>
                  <th>15% Probability</th>
                  <th>Risk-Reward</th>
                  <th>Confidence</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(this.predictions.tradingOpportunity)
                  .sort((a, b) => b[1].opportunityScore - a[1].opportunityScore)
                  .map(([symbol, opportunity]) => `
                    <tr>
                      <td>${opportunity.rank}</td>
                      <td>${symbol}</td>
                      <td class="${opportunity.direction.toLowerCase()}-direction">${opportunity.direction}</td>
                      <td>${opportunity.opportunityScore}</td>
                      <td class="${opportunity.expectedReturn > 0 ? 'positive-movement' : 'negative-movement'}">
                        ${opportunity.expectedReturn > 0 ? '+' : ''}${opportunity.expectedReturn.toFixed(1)}%
                      </td>
                      <td>${(opportunity.probability15PctMove * 100).toFixed(0)}%</td>
                      <td>${opportunity.riskRewardRatio.toFixed(1)}</td>
                      <td class="${this._getConfidenceClass(opportunity.confidence)}">${opportunity.confidence}</td>
                      <td>
                        <button class="view-details-button small" data-symbol="${symbol}" data-model="tradingOpportunity">View</button>
                      </td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="prediction-detail-modal" id="trading-opportunity-detail-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="modal-stock-name-opportunity"></h3>
              <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body" id="modal-opportunity-details">
              <!-- Opportunity details will be dynamically inserted here -->
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate sector rotation tab content
   * @returns {string} Tab content HTML
   * @private
   */
  _generateSectorRotationTabContent() {
    return `
      <div class="sector-rotation-content">
        <div class="model-info-section">
          <h3>Sector Rotation Prediction Model</h3>
          <div class="model-details">
            <div class="model-detail">
              <div class="detail-label">Model Type:</div>
              <div class="detail-value">${this.models.sectorRotation.type}</div>
            </div>
            <div class="model-detail">
              <div class="detail-label">Accuracy:</div>
              <div class="detail-value">${(this.modelAccuracy.sectorRotation.metrics.accuracyScore * 100).toFixed(0)}%</div>
            </div>
            <div class="model-detail">
              <div class="detail-label">Last Updated:</div>
              <div class="detail-value">${this.models.sectorRotation.lastUpdated}</div>
            </div>
          </div>
          <div class="model-description">
            <p>${this.models.sectorRotation.description}</p>
          </div>
        </div>
        
        <div class="feature-importance-section">
          <h3>Feature Importance</h3>
          <div class="feature-importance-chart">
            <div class="feature-bars">
              ${Object.entries(this.featureImportance.sectorRotation)
                .sort((a, b) => b[1] - a[1])
                .map(([feature, importance]) => `
                  <div class="feature-bar">
                    <div class="feature-label">${feature}:</div>
                    <div class="feature-meter">
                      <div class="feature-value" style="width: ${importance * 100}%"></div>
                    </div>
                    <div class="feature-percentage">${(importance * 100).toFixed(1)}%</div>
                  </div>
                `).join('')}
            </div>
          </div>
        </div>
        
        <div class="sector-predictions-section">
          <h3>Sector Rotation Predictions</h3>
          <div class="sector-predictions-chart">
            <div class="sector-performance-chart">
              <!-- In a real implementation, this would be a chart -->
              <div class="chart-placeholder">
                <div class="sector-bars">
                  ${Object.entries(this.predictions.sectorRotation)
                    .sort((a, b) => b[1].expectedReturn - a[1].expectedReturn)
                    .map(([sector, prediction]) => `
                      <div class="sector-bar">
                        <div class="sector-label">${sector}:</div>
                        <div class="sector-meter">
                          <div class="sector-value ${prediction.expectedReturn > 0 ? 'positive-sector' : 'negative-sector'}" 
                               style="width: ${Math.abs(prediction.expectedReturn) * 5}%"></div>
                        </div>
                        <div class="sector-percentage ${prediction.expectedReturn > 0 ? 'positive-movement' : 'negative-movement'}">
                          ${prediction.expectedReturn > 0 ? '+' : ''}${prediction.expectedReturn.toFixed(1)}%
                        </div>
                      </div>
                    `).join('')}
                </div>
              </div>
            </div>
          </div>
          
          <div class="sector-predictions-list">
            ${Object.entries(this.predictions.sectorRotation)
              .sort((a, b) => b[1].expectedReturn - a[1].expectedReturn)
              .map(([sector, prediction]) => `
                <div class="sector-card">
                  <div class="sector-header">
                    <div class="sector-title">
                      <h4>${sector}</h4>
                      <div class="sector-confidence ${this._getConfidenceClass(prediction.confidence)}">${prediction.confidence} Confidence</div>
                    </div>
                    <div class="sector-performance ${this._getPerformanceClass(prediction.relativePerformance)}">
                      ${prediction.relativePerformance}
                    </div>
                  </div>
                  <div class="sector-details">
                    <div class="sector-return">
                      <div class="return-label">Expected Return:</div>
                      <div class="return-value ${prediction.expectedReturn > 0 ? 'positive-movement' : 'negative-movement'}">
                        ${prediction.expectedReturn > 0 ? '+' : ''}${prediction.expectedReturn.toFixed(1)}%
                      </div>
                    </div>
                    <div class="sector-factors">
                      <h5>Key Factors</h5>
                      <div class="factors-grid">
                        ${Object.entries(prediction.factors).slice(0, 4).map(([factor, value]) => `
                          <div class="factor-item">
                            <div class="factor-name">${factor}:</div>
                            <div class="factor-value">${value}</div>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                    <div class="sector-explanation">
                      <h5>Explanation</h5>
                      <p>${prediction.explanation}</p>
                    </div>
                    <div class="sector-implications">
                      <h5>Trading Implications</h5>
                      <p>${prediction.tradingImplications}</p>
                    </div>
                  </div>
                  <button class="view-details-button" data-sector="${sector}" data-model="sectorRotation">View Full Analysis</button>
                </div>
              `).join('')}
          </div>
        </div>
        
        <div class="prediction-detail-modal" id="sector-rotation-detail-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="modal-sector-name"></h3>
              <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body" id="modal-sector-details">
              <!-- Sector details will be dynamically inserted here -->
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Generate volatility tab content
   * @returns {string} Tab content HTML
   * @private
   */
  _generateVolatilityTabContent() {
    return `
      <div class="volatility-content">
        <div class="model-info-section">
          <h3>Volatility Prediction Model</h3>
          <div class="model-details">
            <div class="model-detail">
              <div class="detail-label">Model Type:</div>
              <div class="detail-value">${this.models.volatilityPrediction.type}</div>
            </div>
            <div class="model-detail">
              <div class="detail-label">Direction Accuracy:</div>
              <div class="detail-value">${(this.modelAccuracy.volatilityPrediction.backtesting.directionAccuracy * 100).toFixed(0)}%</div>
            </div>
            <div class="model-detail">
              <div class="detail-label">Last Updated:</div>
              <div class="detail-value">${this.models.volatilityPrediction.lastUpdated}</div>
            </div>
          </div>
          <div class="model-description">
            <p>${this.models.volatilityPrediction.description}</p>
          </div>
        </div>
        
        <div class="feature-importance-section">
          <h3>Feature Importance</h3>
          <div class="feature-importance-chart">
            <div class="feature-bars">
              ${Object.entries(this.featureImportance.volatilityPrediction)
                .sort((a, b) => b[1] - a[1])
                .map(([feature, importance]) => `
                  <div class="feature-bar">
                    <div class="feature-label">${feature}:</div>
                    <div class="feature-meter">
                      <div class="feature-value" style="width: ${importance * 100}%"></div>
                    </div>
                    <div class="feature-percentage">${(importance * 100).toFixed(1)}%</div>
                  </div>
                `).join('')}
            </div>
          </div>
        </div>
        
        <div class="volatility-predictions-section">
          <h3>Volatility Predictions</h3>
          <div class="volatility-predictions-chart">
            <div class="volatility-chart">
              <!-- In a real implementation, this would be a chart -->
              <div class="chart-placeholder">
                <div class="volatility-bars">
                  ${Object.entries(this.predictions.volatilityPrediction)
                    .sort((a, b) => b[1].volatilityChange - a[1].volatilityChange)
                    .map(([symbol, prediction]) => `
                      <div class="volatility-bar">
                        <div class="volatility-label">${symbol}:</div>
                        <div class="volatility-meter">
                          <div class="current-volatility" style="width: ${prediction.currentVolatility}%"></div>
                          <div class="predicted-volatility" style="width: ${prediction.predictedVolatility - prediction.currentVolatility}%"></div>
                        </div>
                        <div class="volatility-values">
                          <span class="current-value">${prediction.currentVolatility.toFixed(1)}</span>
                          <span class="arrow">→</span>
                          <span class="predicted-value">${prediction.predictedVolatility.toFixed(1)}</span>
                          <span class="change-value">(+${prediction.volatilityChange.toFixed(1)})</span>
                        </div>
                      </div>
                    `).join('')}
                </div>
                <div class="volatility-legend">
                  <div class="legend-item">
                    <div class="legend-color current-volatility"></div>
                    <div class="legend-label">Current Volatility</div>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color predicted-volatility"></div>
                    <div class="legend-label">Predicted Increase</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="volatility-predictions-list">
            ${Object.entries(this.predictions.volatilityPrediction)
              .sort((a, b) => b[1].volatilityChange - a[1].volatilityChange)
              .map(([symbol, prediction]) => `
                <div class="volatility-card">
                  <div class="volatility-header">
                    <div class="volatility-title">
                      <h4>${symbol}</h4>
                      <div class="volatility-confidence ${this._getConfidenceClass(prediction.confidence)}">${prediction.confidence} Confidence</div>
                    </div>
                    <div class="volatility-change">
                      <div class="current-vol">${prediction.currentVolatility.toFixed(1)}</div>
                      <div class="arrow">→</div>
                      <div class="predicted-vol">${prediction.predictedVolatility.toFixed(1)}</div>
                      <div class="change-value">(+${prediction.volatilityChange.toFixed(1)})</div>
                    </div>
                  </div>
                  <div class="volatility-details">
                    <div class="volatility-factors">
                      <h5>Key Factors</h5>
                      <div class="factors-grid">
                        ${Object.entries(prediction.factors).slice(0, 4).map(([factor, value]) => `
                          <div class="factor-item">
                            <div class="factor-name">${factor}:</div>
                            <div class="factor-value">${value}</div>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                    <div class="volatility-explanation">
                      <h5>Explanation</h5>
                      <p>${prediction.explanation}</p>
                    </div>
                    <div class="volatility-implications">
                      <h5>Trading Implications</h5>
                      <p>${prediction.tradingImplications}</p>
                    </div>
                  </div>
                  <button class="view-details-button" data-symbol="${symbol}" data-model="volatilityPrediction">View Full Analysis</button>
                </div>
              `).join('')}
          </div>
        </div>
        
        <div class="prediction-detail-modal" id="volatility-detail-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="modal-volatility-name"></h3>
              <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body" id="modal-volatility-details">
              <!-- Volatility details will be dynamically inserted here -->
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Get confidence class
   * @param {string} confidence - Confidence level
   * @returns {string} Confidence class
   * @private
   */
  _getConfidenceClass(confidence) {
    switch (confidence) {
      case 'Very High':
        return 'very-high-confidence';
      case 'High':
        return 'high-confidence';
      case 'Medium-High':
        return 'medium-high-confidence';
      case 'Medium':
        return 'medium-confidence';
      case 'Low':
        return 'low-confidence';
      default:
        return '';
    }
  }
  
  /**
   * Get impact class
   * @param {string} impact - Impact level
   * @returns {string} Impact class
   * @private
   */
  _getImpactClass(impact) {
    switch (impact) {
      case 'Very High Negative':
        return 'very-high-negative';
      case 'High Negative':
        return 'high-negative';
      case 'Moderate Negative':
        return 'moderate-negative';
      case 'Neutral':
        return 'neutral-impact';
      case 'Moderate Positive':
        return 'moderate-positive';
      case 'High Positive':
        return 'high-positive';
      default:
        return '';
    }
  }
  
  /**
   * Get performance class
   * @param {string} performance - Performance level
   * @returns {string} Performance class
   * @private
   */
  _getPerformanceClass(performance) {
    switch (performance) {
      case 'Significant Outperformance':
        return 'significant-outperformance';
      case 'Moderate Outperformance':
        return 'moderate-outperformance';
      case 'Slight Outperformance':
        return 'slight-outperformance';
      case 'Mixed':
        return 'mixed-performance';
      case 'Slight Underperformance':
        return 'slight-underperformance';
      case 'Moderate Underperformance':
        return 'moderate-underperformance';
      case 'Significant Underperformance':
        return 'significant-underperformance';
      default:
        return '';
    }
  }
  
  /**
   * Get probability class
   * @param {number} probability - Probability value
   * @returns {string} Probability class
   * @private
   */
  _getProbabilityClass(probability) {
    if (probability >= 0.8) {
      return 'very-high';
    } else if (probability >= 0.6) {
      return 'high';
    } else if (probability >= 0.4) {
      return 'medium';
    } else {
      return 'low';
    }
  }
}

export default MachineLearningModels;
