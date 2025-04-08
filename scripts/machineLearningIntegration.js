/**
 * Machine Learning Models Integration Script for Trump Tariff Analysis Website
 * 
 * This script integrates the machine learning models with the website,
 * handling initialization, UI interactions, and data updates.
 */

import MachineLearningModels from '../components/prediction/MachineLearningModels.js';

// Initialize machine learning models
let mlModels;

// DOM elements
let mlContainer;
let modalElements = {};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeMachineLearning();
});

/**
 * Initialize machine learning integration
 */
function initializeMachineLearning() {
  // Create machine learning models instance
  mlModels = new MachineLearningModels();
  
  // Get container element
  mlContainer = document.getElementById('machine-learning-container');
  if (!mlContainer) {
    console.warn('Machine learning container not found');
    return;
  }
  
  // Set up modal event listeners
  setupModalEventListeners();
  
  // Set up filter event listeners
  setupFilterEventListeners();
  
  // Set up detail view buttons
  setupDetailViewButtons();
}

/**
 * Set up modal event listeners
 */
function setupModalEventListeners() {
  // Get all modals
  const modals = [
    document.getElementById('tariff-impact-detail-modal'),
    document.getElementById('price-movement-detail-modal'),
    document.getElementById('trading-opportunity-detail-modal'),
    document.getElementById('sector-rotation-detail-modal'),
    document.getElementById('volatility-detail-modal')
  ];
  
  // Add close button event listeners
  modals.forEach(modal => {
    if (!modal) return;
    
    const closeButton = modal.querySelector('.close-modal');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  
  // Store modal elements for later use
  modalElements = {
    tariffImpact: {
      modal: document.getElementById('tariff-impact-detail-modal'),
      title: document.getElementById('modal-stock-name'),
      content: document.getElementById('modal-prediction-details')
    },
    priceMovement: {
      modal: document.getElementById('price-movement-detail-modal'),
      title: document.getElementById('modal-stock-name-price'),
      content: document.getElementById('modal-price-details')
    },
    tradingOpportunity: {
      modal: document.getElementById('trading-opportunity-detail-modal'),
      title: document.getElementById('modal-stock-name-opportunity'),
      content: document.getElementById('modal-opportunity-details')
    },
    sectorRotation: {
      modal: document.getElementById('sector-rotation-detail-modal'),
      title: document.getElementById('modal-sector-name'),
      content: document.getElementById('modal-sector-details')
    },
    volatilityPrediction: {
      modal: document.getElementById('volatility-detail-modal'),
      title: document.getElementById('modal-volatility-name'),
      content: document.getElementById('modal-volatility-details')
    }
  };
}

/**
 * Set up filter event listeners
 */
function setupFilterEventListeners() {
  // Tariff impact filters
  const tariffImpactFilter = document.getElementById('tariff-impact-filter');
  const tariffConfidenceFilter = document.getElementById('tariff-confidence-filter');
  
  if (tariffImpactFilter && tariffConfidenceFilter) {
    const filterFunction = () => {
      const impactValue = tariffImpactFilter.value;
      const confidenceValue = tariffConfidenceFilter.value;
      
      const cards = document.querySelectorAll('.prediction-card');
      cards.forEach(card => {
        const impact = card.getAttribute('data-impact');
        const confidence = card.getAttribute('data-confidence');
        
        let showCard = true;
        
        if (impactValue !== 'all' && impact !== impactValue) {
          showCard = false;
        }
        
        if (confidenceValue !== 'all' && confidence !== confidenceValue) {
          showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
      });
    };
    
    tariffImpactFilter.addEventListener('change', filterFunction);
    tariffConfidenceFilter.addEventListener('change', filterFunction);
  }
  
  // Price movement filters
  const priceMovementFilter = document.getElementById('price-movement-filter');
  const priceProbabilityFilter = document.getElementById('price-probability-filter');
  
  if (priceMovementFilter && priceProbabilityFilter) {
    const filterFunction = () => {
      const movementValue = priceMovementFilter.value;
      const probabilityValue = priceProbabilityFilter.value;
      
      const cards = document.querySelectorAll('.prediction-card');
      cards.forEach(card => {
        const movement = card.getAttribute('data-movement');
        const probability = card.getAttribute('data-probability');
        
        let showCard = true;
        
        if (movementValue !== 'all' && movement !== movementValue) {
          showCard = false;
        }
        
        if (probabilityValue !== 'all' && probability !== probabilityValue) {
          showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
      });
    };
    
    priceMovementFilter.addEventListener('change', filterFunction);
    priceProbabilityFilter.addEventListener('change', filterFunction);
  }
}

/**
 * Set up detail view buttons
 */
function setupDetailViewButtons() {
  // Get all detail view buttons
  const detailButtons = document.querySelectorAll('.view-details-button');
  
  // Add click event listeners
  detailButtons.forEach(button => {
    button.addEventListener('click', () => {
      const symbol = button.getAttribute('data-symbol');
      const sector = button.getAttribute('data-sector');
      const modelType = button.getAttribute('data-model');
      
      if (symbol) {
        showStockDetails(symbol, modelType);
      } else if (sector) {
        showSectorDetails(sector, modelType);
      }
    });
  });
}

/**
 * Show stock details in modal
 * @param {string} symbol - Stock symbol
 * @param {string} modelType - Model type
 */
function showStockDetails(symbol, modelType) {
  // Get modal elements
  const modalData = modalElements[modelType];
  if (!modalData) return;
  
  // Get prediction data
  const prediction = mlModels.predictions[modelType][symbol];
  if (!prediction) return;
  
  // Set modal title
  modalData.title.textContent = symbol;
  
  // Generate modal content based on model type
  let content = '';
  
  switch (modelType) {
    case 'tariffImpact':
      content = generateTariffImpactDetails(symbol, prediction);
      break;
    case 'priceMovement':
      content = generatePriceMovementDetails(symbol, prediction);
      break;
    case 'tradingOpportunity':
      content = generateTradingOpportunityDetails(symbol, prediction);
      break;
    case 'volatilityPrediction':
      content = generateVolatilityDetails(symbol, prediction);
      break;
  }
  
  // Set modal content
  modalData.content.innerHTML = content;
  
  // Show modal
  modalData.modal.style.display = 'flex';
}

/**
 * Show sector details in modal
 * @param {string} sector - Sector name
 * @param {string} modelType - Model type
 */
function showSectorDetails(sector, modelType) {
  // Get modal elements
  const modalData = modalElements[modelType];
  if (!modalData) return;
  
  // Get prediction data
  const prediction = mlModels.predictions[modelType][sector];
  if (!prediction) return;
  
  // Set modal title
  modalData.title.textContent = sector;
  
  // Generate modal content
  const content = generateSectorRotationDetails(sector, prediction);
  
  // Set modal content
  modalData.content.innerHTML = content;
  
  // Show modal
  modalData.modal.style.display = 'flex';
}

/**
 * Generate tariff impact details HTML
 * @param {string} symbol - Stock symbol
 * @param {Object} prediction - Prediction data
 * @returns {string} HTML content
 */
function generateTariffImpactDetails(symbol, prediction) {
  return `
    <div class="modal-section">
      <h4>Tariff Impact Prediction</h4>
      <div class="prediction-summary">
        <div class="prediction-result-large ${getImpactClass(prediction.prediction)}">
          ${prediction.prediction}
        </div>
        <div class="prediction-confidence-large ${getConfidenceClass(prediction.confidence)}">
          ${prediction.confidence} Confidence (${(prediction.probability * 100).toFixed(0)}%)
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <h4>Key Factors</h4>
      <div class="factors-grid-large">
        ${Object.entries(prediction.factors).map(([factor, value]) => `
          <div class="factor-item-large">
            <div class="factor-name-large">${factor}:</div>
            <div class="factor-value-large">${value}</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="modal-section">
      <h4>Detailed Explanation</h4>
      <p>${prediction.explanation}</p>
    </div>
    
    <div class="modal-section">
      <h4>Trading Implications</h4>
      <p>${prediction.tradingImplications}</p>
    </div>
    
    <div class="modal-section">
      <h4>Historical Tariff Reactions</h4>
      <div class="historical-reactions">
        <div class="reaction-event">
          <div class="event-date">March 2018</div>
          <div class="event-description">Initial Steel & Aluminum Tariffs</div>
          <div class="event-reaction ${getReactionClass(-4.2)}">-4.2%</div>
        </div>
        <div class="reaction-event">
          <div class="event-date">July 2018</div>
          <div class="event-description">$50B China Tariffs</div>
          <div class="event-reaction ${getReactionClass(-6.8)}">-6.8%</div>
        </div>
        <div class="reaction-event">
          <div class="event-date">September 2018</div>
          <div class="event-description">$200B China Tariffs</div>
          <div class="event-reaction ${getReactionClass(-5.3)}">-5.3%</div>
        </div>
        <div class="reaction-event">
          <div class="event-date">May 2019</div>
          <div class="event-description">Tariff Rate Increase</div>
          <div class="event-reaction ${getReactionClass(-7.1)}">-7.1%</div>
        </div>
        <div class="reaction-event">
          <div class="event-date">August 2019</div>
          <div class="event-description">Additional Tariff Threats</div>
          <div class="event-reaction ${getReactionClass(-8.4)}">-8.4%</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate price movement details HTML
 * @param {string} symbol - Stock symbol
 * @param {Object} prediction - Prediction data
 * @returns {string} HTML content
 */
function generatePriceMovementDetails(symbol, prediction) {
  return `
    <div class="modal-section">
      <h4>Price Movement Prediction (30-day)</h4>
      <div class="prediction-summary">
        <div class="prediction-result-large ${prediction.prediction > 0 ? 'positive-movement' : 'negative-movement'}">
          ${prediction.prediction > 0 ? '+' : ''}${prediction.prediction.toFixed(1)}%
        </div>
        <div class="prediction-range-large">
          Range: 
          <span class="${prediction.predictionRange[0] > 0 ? 'positive-movement' : 'negative-movement'}">
            ${prediction.predictionRange[0] > 0 ? '+' : ''}${prediction.predictionRange[0].toFixed(1)}%
          </span>
          to
          <span class="${prediction.predictionRange[1] > 0 ? 'positive-movement' : 'negative-movement'}">
            ${prediction.predictionRange[1] > 0 ? '+' : ''}${prediction.predictionRange[1].toFixed(1)}%
          </span>
        </div>
        <div class="prediction-confidence-large ${getConfidenceClass(prediction.confidence)}">
          ${prediction.confidence} Confidence
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <h4>15% Movement Probability</h4>
      <div class="probability-large">
        <div class="probability-meter-large">
          <div class="probability-value-large" style="width: ${prediction.probability15PctMove * 100}%"></div>
        </div>
        <div class="probability-percentage-large">${(prediction.probability15PctMove * 100).toFixed(0)}%</div>
      </div>
      <p class="probability-description">
        Probability of achieving at least 15% movement within the 30-day timeframe.
        ${prediction.probability15PctMove >= 0.7 ? 
          'This stock has a <strong>high probability</strong> of meeting your 15%+ movement criteria.' : 
          prediction.probability15PctMove >= 0.5 ? 
          'This stock has a <strong>moderate probability</strong> of meeting your 15%+ movement criteria.' :
          'This stock has a <strong>low probability</strong> of meeting your 15%+ movement criteria.'}
      </p>
    </div>
    
    <div class="modal-section">
      <h4>Key Factors</h4>
      <div class="factors-grid-large">
        ${Object.entries(prediction.factors).map(([factor, value]) => `
          <div class="factor-item-large">
            <div class="factor-name-large">${factor}:</div>
            <div class="factor-value-large">${value}</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="modal-section">
      <h4>Detailed Explanation</h4>
      <p>${prediction.explanation}</p>
    </div>
    
    <div class="modal-section">
      <h4>Trading Implications</h4>
      <p>${prediction.tradingImplications}</p>
    </div>
    
    <div class="modal-section">
      <h4>Technical Analysis</h4>
      <div class="technical-indicators">
        <div class="indicator-group">
          <h5>Trend Indicators</h5>
          <div class="indicator-item">
            <div class="indicator-name">Moving Average (50-day):</div>
            <div class="indicator-value ${getIndicatorClass('Bearish')}">Bearish</div>
          </div>
          <div class="indicator-item">
            <div class="indicator-name">Moving Average (200-day):</div>
            <div class="indicator-value ${getIndicatorClass('Bearish')}">Bearish</div>
          </div>
          <div class="indicator-item">
            <div class="indicator-name">MACD:</div>
            <div class="indicator-value ${getIndicatorClass('Bearish')}">Bearish</div>
          </div>
        </div>
        <div class="indicator-group">
          <h5>Momentum Indicators</h5>
          <div class="indicator-item">
            <div class="indicator-name">RSI (14-day):</div>
            <div class="indicator-value ${getIndicatorClass('Oversold')}">Oversold (28)</div>
          </div>
          <div class="indicator-item">
            <div class="indicator-name">Stochastic Oscillator:</div>
            <div class="indicator-value ${getIndicatorClass('Neutral')}">Neutral</div>
          </div>
          <div class="indicator-item">
            <div class="indicator-name">Rate of Change:</div>
            <div class="indicator-value ${getIndicatorClass('Bearish')}">Bearish</div>
          </div>
        </div>
        <div class="indicator-group">
          <h5>Volatility Indicators</h5>
          <div class="indicator-item">
            <div class="indicator-name">Bollinger Bands:</div>
            <div class="indicator-value ${getIndicatorClass('High Volatility')}">High Volatility</div>
          </div>
          <div class="indicator-item">
            <div class="indicator-name">Average True Range:</div>
            <div class="indicator-value ${getIndicatorClass('Increasing')}">Increasing</div>
          </div>
          <div class="indicator-item">
            <div class="indicator-name">Standard Deviation:</div>
            <div class="indicator-value ${getIndicatorClass('High')}">High</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate trading opportunity details HTML
 * @param {string} symbol - Stock symbol
 * @param {Object} opportunity - Opportunity data
 * @returns {string} HTML content
 */
function generateTradingOpportunityDetails(symbol, opportunity) {
  return `
    <div class="modal-section">
      <h4>Trading Opportunity Summary</h4>
      <div class="opportunity-summary">
        <div class="opportunity-score-large">
          <div class="score-label-large">Opportunity Score:</div>
          <div class="score-value-large">${opportunity.opportunityScore}</div>
        </div>
        <div class="opportunity-direction-large ${opportunity.direction.toLowerCase()}-direction">
          ${opportunity.direction} Opportunity
        </div>
        <div class="opportunity-rank-large">
          Rank: #${opportunity.rank} of ${Object.keys(mlModels.predictions.tradingOpportunity).length}
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <h4>Key Metrics</h4>
      <div class="metrics-grid">
        <div class="metric-item-large">
          <div class="metric-name">Expected Return:</div>
          <div class="metric-value-large ${opportunity.expectedReturn > 0 ? 'positive-movement' : 'negative-movement'}">
            ${opportunity.expectedReturn > 0 ? '+' : ''}${opportunity.expectedReturn.toFixed(1)}%
          </div>
        </div>
        <div class="metric-item-large">
          <div class="metric-name">15% Move Probability:</div>
          <div class="metric-value-large">${(opportunity.probability15PctMove * 100).toFixed(0)}%</div>
        </div>
        <div class="metric-item-large">
          <div class="metric-name">Risk-Reward Ratio:</div>
          <div class="metric-value-large">${opportunity.riskRewardRatio.toFixed(1)}</div>
        </div>
        <div class="metric-item-large">
          <div class="metric-name">Confidence:</div>
          <div class="metric-value-large ${getConfidenceClass(opportunity.confidence)}">${opportunity.confidence}</div>
        </div>
        <div class="metric-item-large">
          <div class="metric-name">Timeframe:</div>
          <div class="metric-value-large">${opportunity.timeframe}</div>
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <h4>Key Factors</h4>
      <div class="factors-grid-large">
        ${Object.entries(opportunity.factors).map(([factor, value]) => `
          <div class="factor-item-large">
            <div class="factor-name-large">${factor}:</div>
            <div class="factor-value-large">${typeof value === 'number' ? (value > 0 ? '+' : '') + value.toFixed(1) + '%' : value}</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="modal-section">
      <h4>Opportunity Rationale</h4>
      <p>${opportunity.explanation}</p>
    </div>
    
    <div class="modal-section">
      <h4>Recommended Trading Strategy</h4>
      <p>${opportunity.tradingStrategy}</p>
    </div>
    
    <div class="modal-section">
      <h4>Entry/Exit Levels</h4>
      <div class="levels-table-container">
        <table class="levels-table">
          <thead>
            <tr>
              <th>Level Type</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Entry</td>
              <td>${getEntryPrice(symbol, opportunity)}</td>
              <td>Recommended entry price</td>
            </tr>
            <tr>
              <td>Stop Loss</td>
              <td>${getStopLossPrice(symbol, opportunity)}</td>
              <td>Initial stop loss level</td>
            </tr>
            <tr>
              <td>Target 1</td>
              <td>${getTargetPrice(symbol, opportunity, 1)}</td>
              <td>First profit target (50% position)</td>
            </tr>
            <tr>
              <td>Target 2</td>
              <td>${getTargetPrice(symbol, opportunity, 2)}</td>
              <td>Second profit target (remaining position)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="modal-section">
      <h4>Options Strategy (if applicable)</h4>
      <div class="options-strategy">
        ${generateOptionsStrategy(symbol, opportunity)}
      </div>
    </div>
  `;
}

/**
 * Generate sector rotation details HTML
 * @param {string} sector - Sector name
 * @param {Object} prediction - Prediction data
 * @returns {string} HTML content
 */
function generateSectorRotationDetails(sector, prediction) {
  return `
    <div class="modal-section">
      <h4>Sector Rotation Prediction</h4>
      <div class="prediction-summary">
        <div class="prediction-result-large ${getPerformanceClass(prediction.relativePerformance)}">
          ${prediction.relativePerformance}
        </div>
        <div class="prediction-return-large ${prediction.expectedReturn > 0 ? 'positive-movement' : 'negative-movement'}">
          Expected Return: ${prediction.expectedReturn > 0 ? '+' : ''}${prediction.expectedReturn.toFixed(1)}%
        </div>
        <div class="prediction-confidence-large ${getConfidenceClass(prediction.confidence)}">
          ${prediction.confidence} Confidence
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <h4>Key Factors</h4>
      <div class="factors-grid-large">
        ${Object.entries(prediction.factors).map(([factor, value]) => `
          <div class="factor-item-large">
            <div class="factor-name-large">${factor}:</div>
            <div class="factor-value-large">${value}</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="modal-section">
      <h4>Detailed Explanation</h4>
      <p>${prediction.explanation}</p>
    </div>
    
    <div class="modal-section">
      <h4>Trading Implications</h4>
      <p>${prediction.tradingImplications}</p>
    </div>
    
    <div class="modal-section">
      <h4>Top Stocks in Sector</h4>
      <div class="sector-stocks">
        ${generateTopSectorStocks(sector)}
      </div>
    </div>
    
    <div class="modal-section">
      <h4>Historical Sector Performance During Tariff Events</h4>
      <div class="historical-performance">
        <div class="performance-event">
          <div class="event-date">March 2018</div>
          <div class="event-description">Initial Steel & Aluminum Tariffs</div>
          <div class="event-performance ${getReactionClass(getSectorHistoricalPerformance(sector, 0))}">
            ${getSectorHistoricalPerformance(sector, 0) > 0 ? '+' : ''}${getSectorHistoricalPerformance(sector, 0).toFixed(1)}%
          </div>
        </div>
        <div class="performance-event">
          <div class="event-date">July 2018</div>
          <div class="event-description">$50B China Tariffs</div>
          <div class="event-performance ${getReactionClass(getSectorHistoricalPerformance(sector, 1))}">
            ${getSectorHistoricalPerformance(sector, 1) > 0 ? '+' : ''}${getSectorHistoricalPerformance(sector, 1).toFixed(1)}%
          </div>
        </div>
        <div class="performance-event">
          <div class="event-date">September 2018</div>
          <div class="event-description">$200B China Tariffs</div>
          <div class="event-performance ${getReactionClass(getSectorHistoricalPerformance(sector, 2))}">
            ${getSectorHistoricalPerformance(sector, 2) > 0 ? '+' : ''}${getSectorHistoricalPerformance(sector, 2).toFixed(1)}%
          </div>
        </div>
        <div class="performance-event">
          <div class="event-date">May 2019</div>
          <div class="event-description">Tariff Rate Increase</div>
          <div class="event-performance ${getReactionClass(getSectorHistoricalPerformance(sector, 3))}">
            ${getSectorHistoricalPerformance(sector, 3) > 0 ? '+' : ''}${getSectorHistoricalPerformance(sector, 3).toFixed(1)}%
          </div>
        </div>
        <div class="performance-event">
          <div class="event-date">August 2019</div>
          <div class="event-description">Additional Tariff Threats</div>
          <div class="event-performance ${getReactionClass(getSectorHistoricalPerformance(sector, 4))}">
            ${getSectorHistoricalPerformance(sector, 4) > 0 ? '+' : ''}${getSectorHistoricalPerformance(sector, 4).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate volatility details HTML
 * @param {string} symbol - Stock symbol
 * @param {Object} prediction - Prediction data
 * @returns {string} HTML content
 */
function generateVolatilityDetails(symbol, prediction) {
  return `
    <div class="modal-section">
      <h4>Volatility Prediction</h4>
      <div class="prediction-summary">
        <div class="volatility-change-large">
          <div class="current-vol-large">${prediction.currentVolatility.toFixed(1)}</div>
          <div class="arrow-large">→</div>
          <div class="predicted-vol-large">${prediction.predictedVolatility.toFixed(1)}</div>
          <div class="change-value-large">(+${prediction.volatilityChange.toFixed(1)})</div>
        </div>
        <div class="prediction-confidence-large ${getConfidenceClass(prediction.confidence)}">
          ${prediction.confidence} Confidence
        </div>
      </div>
    </div>
    
    <div class="modal-section">
      <h4>Key Factors</h4>
      <div class="factors-grid-large">
        ${Object.entries(prediction.factors).map(([factor, value]) => `
          <div class="factor-item-large">
            <div class="factor-name-large">${factor}:</div>
            <div class="factor-value-large">${value}</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="modal-section">
      <h4>Detailed Explanation</h4>
      <p>${prediction.explanation}</p>
    </div>
    
    <div class="modal-section">
      <h4>Trading Implications</h4>
      <p>${prediction.tradingImplications}</p>
    </div>
    
    <div class="modal-section">
      <h4>Volatility-Based Strategies</h4>
      <div class="volatility-strategies">
        <div class="strategy-item">
          <h5>Long Straddle</h5>
          <p>Buy both a call and put option with the same strike price and expiration date. Profits from significant price movement in either direction.</p>
          <div class="strategy-metrics">
            <div class="metric-item">
              <div class="metric-name">Potential ROI:</div>
              <div class="metric-value">120-180%</div>
            </div>
            <div class="metric-item">
              <div class="metric-name">Max Loss:</div>
              <div class="metric-value">Premium Paid</div>
            </div>
            <div class="metric-item">
              <div class="metric-name">Breakeven:</div>
              <div class="metric-value">Strike ± Premium</div>
            </div>
          </div>
        </div>
        <div class="strategy-item">
          <h5>Long Strangle</h5>
          <p>Buy out-of-the-money call and put options with the same expiration date. Lower cost than straddle but requires larger price movement to profit.</p>
          <div class="strategy-metrics">
            <div class="metric-item">
              <div class="metric-name">Potential ROI:</div>
              <div class="metric-value">150-250%</div>
            </div>
            <div class="metric-item">
              <div class="metric-name">Max Loss:</div>
              <div class="metric-value">Premium Paid</div>
            </div>
            <div class="metric-item">
              <div class="metric-name">Breakeven:</div>
              <div class="metric-value">Call Strike + Premium or Put Strike - Premium</div>
            </div>
          </div>
        </div>
        <div class="strategy-item">
          <h5>Iron Condor</h5>
          <p>Sell an out-of-the-money put spread and an out-of-the-money call spread. Profits if stock stays within a range, but with defined risk if volatility increases beyond expectations.</p>
          <div class="strategy-metrics">
            <div class="metric-item">
              <div class="metric-name">Potential ROI:</div>
              <div class="metric-value">15-25%</div>
            </div>
            <div class="metric-item">
              <div class="metric-name">Max Loss:</div>
              <div class="metric-value">Width of Spread - Premium</div>
            </div>
            <div class="metric-item">
              <div class="metric-name">Breakeven:</div>
              <div class="metric-value">Short Call - Premium or Short Put + Premium</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate top sector stocks HTML
 * @param {string} sector - Sector name
 * @returns {string} HTML content
 */
function generateTopSectorStocks(sector) {
  // Sample data - in a real implementation, this would be dynamic
  const sectorStocks = {
    'Materials': [
      { symbol: 'BHP.AX', name: 'BHP Group', recommendation: 'Short', score: 75 },
      { symbol: 'RIO.AX', name: 'Rio Tinto', recommendation: 'Short', score: 72 },
      { symbol: 'FMG.AX', name: 'Fortescue Metals', recommendation: 'Short', score: 87 },
      { symbol: 'MIN.AX', name: 'Mineral Resources', recommendation: 'Short', score: 78 },
      { symbol: 'NCM.AX', name: 'Newcrest Mining', recommendation: 'Neutral', score: 52 }
    ],
    'Consumer Staples': [
      { symbol: 'TWE.AX', name: 'Treasury Wine Estates', recommendation: 'Short', score: 82 },
      { symbol: 'WOW.AX', name: 'Woolworths Group', recommendation: 'Neutral', score: 48 },
      { symbol: 'COL.AX', name: 'Coles Group', recommendation: 'Neutral', score: 45 },
      { symbol: 'A2M.AX', name: 'A2 Milk Company', recommendation: 'Short', score: 68 },
      { symbol: 'BKL.AX', name: 'Blackmores', recommendation: 'Short', score: 64 }
    ],
    'Healthcare': [
      { symbol: 'CSL.AX', name: 'CSL Limited', recommendation: 'Long', score: 58 },
      { symbol: 'RMD.AX', name: 'ResMed', recommendation: 'Neutral', score: 52 },
      { symbol: 'COH.AX', name: 'Cochlear', recommendation: 'Neutral', score: 50 },
      { symbol: 'SHL.AX', name: 'Sonic Healthcare', recommendation: 'Long', score: 56 },
      { symbol: 'FPH.AX', name: 'Fisher & Paykel Healthcare', recommendation: 'Long', score: 55 }
    ],
    'Financials': [
      { symbol: 'CBA.AX', name: 'Commonwealth Bank', recommendation: 'Neutral', score: 48 },
      { symbol: 'NAB.AX', name: 'National Australia Bank', recommendation: 'Neutral', score: 46 },
      { symbol: 'ANZ.AX', name: 'ANZ Banking Group', recommendation: 'Neutral', score: 45 },
      { symbol: 'WBC.AX', name: 'Westpac Banking', recommendation: 'Neutral', score: 44 },
      { symbol: 'MQG.AX', name: 'Macquarie Group', recommendation: 'Short', score: 62 }
    ],
    'Information Technology': [
      { symbol: 'XRO.AX', name: 'Xero', recommendation: 'Neutral', score: 50 },
      { symbol: 'APT.AX', name: 'Afterpay', recommendation: 'Short', score: 64 },
      { symbol: 'WTC.AX', name: 'WiseTech Global', recommendation: 'Short', score: 60 },
      { symbol: 'ALU.AX', name: 'Altium', recommendation: 'Neutral', score: 52 },
      { symbol: 'TNE.AX', name: 'Technology One', recommendation: 'Neutral', score: 48 }
    ],
    'Utilities': [
      { symbol: 'AGL.AX', name: 'AGL Energy', recommendation: 'Long', score: 60 },
      { symbol: 'APA.AX', name: 'APA Group', recommendation: 'Long', score: 62 },
      { symbol: 'ORG.AX', name: 'Origin Energy', recommendation: 'Neutral', score: 54 },
      { symbol: 'AST.AX', name: 'AusNet Services', recommendation: 'Long', score: 58 },
      { symbol: 'SKI.AX', name: 'Spark Infrastructure', recommendation: 'Long', score: 56 }
    ],
    'Energy': [
      { symbol: 'WDS.AX', name: 'Woodside Energy', recommendation: 'Short', score: 60 },
      { symbol: 'STO.AX', name: 'Santos', recommendation: 'Short', score: 58 },
      { symbol: 'BPT.AX', name: 'Beach Energy', recommendation: 'Short', score: 62 },
      { symbol: 'WPL.AX', name: 'Woodside Petroleum', recommendation: 'Short', score: 60 },
      { symbol: 'OSH.AX', name: 'Oil Search', recommendation: 'Short', score: 56 }
    ],
    'Consumer Discretionary': [
      { symbol: 'JBH.AX', name: 'JB Hi-Fi', recommendation: 'Short', score: 65 },
      { symbol: 'WES.AX', name: 'Wesfarmers', recommendation: 'Short', score: 60 },
      { symbol: 'HVN.AX', name: 'Harvey Norman', recommendation: 'Short', score: 64 },
      { symbol: 'FLT.AX', name: 'Flight Centre', recommendation: 'Short', score: 68 },
      { symbol: 'ALL.AX', name: 'Aristocrat Leisure', recommendation: 'Neutral', score: 52 }
    ]
  };
  
  const stocks = sectorStocks[sector] || [];
  
  return `
    <div class="sector-stocks-table-container">
      <table class="sector-stocks-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Recommendation</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          ${stocks.map(stock => `
            <tr>
              <td>${stock.symbol}</td>
              <td>${stock.name}</td>
              <td class="${getRecommendationClass(stock.recommendation)}">${stock.recommendation}</td>
              <td>${stock.score}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Generate options strategy HTML
 * @param {string} symbol - Stock symbol
 * @param {Object} opportunity - Opportunity data
 * @returns {string} HTML content
 */
function generateOptionsStrategy(symbol, opportunity) {
  // Sample data - in a real implementation, this would be dynamic
  const optionsAvailability = {
    'BHP.AX': 'Excellent',
    'FMG.AX': 'Good',
    'RIO.AX': 'Good',
    'TWE.AX': 'Limited',
    'MIN.AX': 'Limited',
    'JBH.AX': 'Limited',
    'CSL.AX': 'Good'
  };
  
  const availability = optionsAvailability[symbol] || 'None';
  
  if (availability === 'None') {
    return `
      <p>No options available for this stock. Consider direct stock positions instead.</p>
    `;
  }
  
  const direction = opportunity.direction.toLowerCase();
  const currentPrice = getEntryPrice(symbol, opportunity).replace('$', '');
  
  if (direction === 'short') {
    return `
      <div class="options-strategies">
        <div class="strategy-item">
          <h5>Put Option</h5>
          <p>Buy put options to profit from downward price movement with defined risk.</p>
          <div class="strategy-details">
            <div class="detail-item">
              <div class="detail-label">Strike:</div>
              <div class="detail-value">$${(parseFloat(currentPrice) * 0.95).toFixed(2)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Expiration:</div>
              <div class="detail-value">30-45 days</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Premium:</div>
              <div class="detail-value">$${(parseFloat(currentPrice) * 0.05).toFixed(2)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Leverage:</div>
              <div class="detail-value">5-7x</div>
            </div>
          </div>
        </div>
        <div class="strategy-item">
          <h5>Bear Put Spread</h5>
          <p>Buy a put option and sell a lower strike put option to reduce cost at the expense of capped profit potential.</p>
          <div class="strategy-details">
            <div class="detail-item">
              <div class="detail-label">Buy Strike:</div>
              <div class="detail-value">$${(parseFloat(currentPrice) * 0.95).toFixed(2)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Sell Strike:</div>
              <div class="detail-value">$${(parseFloat(currentPrice) * 0.85).toFixed(2)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Net Premium:</div>
              <div class="detail-value">$${(parseFloat(currentPrice) * 0.03).toFixed(2)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Max Profit:</div>
              <div class="detail-value">$${(parseFloat(currentPrice) * 0.07).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    return `
      <div class="options-strategies">
        <div class="strategy-item">
          <h5>Call Option</h5>
          <p>Buy call options to profit from upward price movement with defined risk.</p>
          <div class="strategy-details">
            <div class="detail-item">
              <div class="detail-label">Strike:</div>
              <div class="detail-value">$${(parseFloat(currentPrice) * 1.05).toFixed(2)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Expiration:</div>
              <div class="detail-value">30-45 days</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Premium:</div>
              <div class="detail-value">$${(parseFloat(currentPrice) * 0.05).toFixed(2)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Leverage:</div>
              <div class="detail-value">5-7x</div>
            </div>
          </div>
        </div>
        <div class="strategy-item">
          <h5>Bull Call Spread</h5>
          <p>Buy a call option and sell a higher strike call option to reduce cost at the expense of capped profit potential.</p>
          <div class="strategy-details">
            <div class="detail-item">
              <div class="detail-label">Buy Strike:</div>
              <div class="detail-value">$${(parseFloat(currentPrice) * 1.05).toFixed(2)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Sell Strike:</div>
              <div class="detail-value">$${(parseFloat(currentPrice) * 1.15).toFixed(2)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Net Premium:</div>
              <div class="detail-value">$${(parseFloat(currentPrice) * 0.03).toFixed(2)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Max Profit:</div>
              <div class="detail-value">$${(parseFloat(currentPrice) * 0.07).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * Get entry price for a stock
 * @param {string} symbol - Stock symbol
 * @param {Object} opportunity - Opportunity data
 * @returns {string} Entry price
 */
function getEntryPrice(symbol, opportunity) {
  // Sample data - in a real implementation, this would be dynamic
  const entryPrices = {
    'BHP.AX': '$45.80',
    'FMG.AX': '$22.50',
    'RIO.AX': '$125.40',
    'TWE.AX': '$12.80',
    'MIN.AX': '$65.20',
    'JBH.AX': '$52.30',
    'CSL.AX': '$285.60'
  };
  
  return entryPrices[symbol] || '$0.00';
}

/**
 * Get stop loss price for a stock
 * @param {string} symbol - Stock symbol
 * @param {Object} opportunity - Opportunity data
 * @returns {string} Stop loss price
 */
function getStopLossPrice(symbol, opportunity) {
  // Sample data - in a real implementation, this would be dynamic
  const stopLossPrices = {
    'BHP.AX': '$48.60',
    'FMG.AX': '$24.75',
    'RIO.AX': '$133.20',
    'TWE.AX': '$13.95',
    'MIN.AX': '$70.40',
    'JBH.AX': '$55.40',
    'CSL.AX': '$275.20'
  };
  
  return stopLossPrices[symbol] || '$0.00';
}

/**
 * Get target price for a stock
 * @param {string} symbol - Stock symbol
 * @param {Object} opportunity - Opportunity data
 * @param {number} targetNumber - Target number (1 or 2)
 * @returns {string} Target price
 */
function getTargetPrice(symbol, opportunity, targetNumber) {
  // Sample data - in a real implementation, this would be dynamic
  const targetPrices = {
    'BHP.AX': ['$40.10', '$36.50'],
    'FMG.AX': ['$18.30', '$15.80'],
    'RIO.AX': ['$108.80', '$98.20'],
    'TWE.AX': ['$10.70', '$9.20'],
    'MIN.AX': ['$55.50', '$48.90'],
    'JBH.AX': ['$46.65', '$42.80'],
    'CSL.AX': ['$295.20', '$305.60']
  };
  
  return targetPrices[symbol] ? targetPrices[symbol][targetNumber - 1] : '$0.00';
}

/**
 * Get sector historical performance
 * @param {string} sector - Sector name
 * @param {number} eventIndex - Event index
 * @returns {number} Performance percentage
 */
function getSectorHistoricalPerformance(sector, eventIndex) {
  // Sample data - in a real implementation, this would be dynamic
  const performances = {
    'Materials': [-5.8, -7.2, -6.5, -8.3, -9.1],
    'Consumer Staples': [-3.2, -4.5, -3.8, -5.2, -6.1],
    'Healthcare': [1.2, 0.8, 1.5, 2.2, 3.1],
    'Financials': [-2.1, -3.2, -2.8, -3.5, -4.2],
    'Information Technology': [-1.8, 0.5, -2.2, -3.8, -2.5],
    'Utilities': [2.2, 1.8, 2.5, 3.2, 3.8],
    'Energy': [-3.5, -4.2, -3.8, -4.5, -5.2],
    'Consumer Discretionary': [-4.8, -6.2, -5.5, -7.2, -8.5]
  };
  
  return performances[sector] ? performances[sector][eventIndex] : 0;
}

/**
 * Get confidence class
 * @param {string} confidence - Confidence level
 * @returns {string} Confidence class
 */
function getConfidenceClass(confidence) {
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
 */
function getImpactClass(impact) {
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
 */
function getPerformanceClass(performance) {
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
 * Get reaction class
 * @param {number} reaction - Reaction percentage
 * @returns {string} Reaction class
 */
function getReactionClass(reaction) {
  if (reaction > 3) {
    return 'positive-movement';
  } else if (reaction > 0) {
    return 'slight-positive-movement';
  } else if (reaction > -3) {
    return 'slight-negative-movement';
  } else {
    return 'negative-movement';
  }
}

/**
 * Get indicator class
 * @param {string} indicator - Indicator value
 * @returns {string} Indicator class
 */
function getIndicatorClass(indicator) {
  switch (indicator) {
    case 'Bullish':
    case 'Oversold':
    case 'Buy':
      return 'bullish-indicator';
    case 'Bearish':
    case 'Overbought':
    case 'Sell':
      return 'bearish-indicator';
    case 'Neutral':
      return 'neutral-indicator';
    case 'High Volatility':
    case 'Increasing':
    case 'High':
      return 'high-volatility-indicator';
    default:
      return '';
  }
}

/**
 * Get recommendation class
 * @param {string} recommendation - Recommendation
 * @returns {string} Recommendation class
 */
function getRecommendationClass(recommendation) {
  switch (recommendation) {
    case 'Long':
      return 'long-direction';
    case 'Short':
      return 'short-direction';
    case 'Neutral':
      return 'neutral-direction';
    default:
      return '';
  }
}

export default { initializeMachineLearning };
