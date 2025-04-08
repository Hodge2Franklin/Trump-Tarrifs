/**
 * Predictive Analytics Components for Trump Tariff Analysis Website
 * 
 * This module provides React components for displaying predictive analytics
 * including tariff impact predictions, price movement forecasts, and
 * scenario analysis tools.
 */

import PredictiveAnalytics from '../data/PredictiveAnalytics.js';

class PredictiveAnalyticsComponents {
  constructor() {
    this.predictiveAnalytics = new PredictiveAnalytics();
  }
  
  /**
   * Render tariff impact prediction dashboard
   * @param {string} containerId - ID of the container element
   * @param {Object} stockData - Stock data
   */
  renderTariffImpactPrediction(containerId, stockData) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Check if models are loaded
    if (!this.predictiveAnalytics.areModelsLoaded()) {
      this._renderLoadingState(container, 'Loading predictive models...');
      
      // Check status every second
      const checkInterval = setInterval(() => {
        if (this.predictiveAnalytics.areModelsLoaded()) {
          clearInterval(checkInterval);
          this.renderTariffImpactPrediction(containerId, stockData);
        }
      }, 1000);
      
      return;
    }
    
    // Get tariff impact prediction
    const prediction = this.predictiveAnalytics.predictTariffImpact(stockData);
    if (!prediction) {
      this._renderErrorState(container, 'Unable to generate tariff impact prediction');
      return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Create prediction header
    const header = document.createElement('div');
    header.className = 'prediction-header';
    header.innerHTML = `
      <h2>Tariff Impact Prediction</h2>
      <p>Predicted impact of Trump tariffs on ${stockData.symbol} (${stockData.name})</p>
    `;
    
    container.appendChild(header);
    
    // Create impact score visualization
    const impactScoreContainer = document.createElement('div');
    impactScoreContainer.className = 'impact-score-container';
    
    const impactScore = prediction.impactScore;
    const impactDirection = impactScore >= 0 ? 'positive' : 'negative';
    const impactClass = `impact-${impactDirection}`;
    const impactWidth = Math.min(100, Math.abs(impactScore) * 10);
    
    impactScoreContainer.innerHTML = `
      <div class="impact-score-header">
        <h3>Tariff Impact Score</h3>
        <div class="confidence-indicator">
          <span class="confidence-label">Confidence:</span>
          <span class="confidence-value">${Math.round(prediction.confidence * 100)}%</span>
        </div>
      </div>
      <div class="impact-score-gauge">
        <div class="impact-score-scale">
          <div class="scale-negative">Negative Impact</div>
          <div class="scale-neutral">Neutral</div>
          <div class="scale-positive">Positive Impact</div>
        </div>
        <div class="impact-score-bar">
          <div class="impact-score-marker ${impactClass}" style="left: ${50 + impactScore * 5}%;">
            <div class="marker-value">${impactScore.toFixed(1)}</div>
          </div>
          <div class="impact-score-fill ${impactClass}" style="width: ${impactWidth}%; left: ${impactScore < 0 ? 50 - impactWidth : 50}%;"></div>
        </div>
      </div>
      <div class="impact-summary">
        <div class="impact-direction ${impactClass}">
          <span class="direction-label">Direction:</span>
          <span class="direction-value">${impactDirection.charAt(0).toUpperCase() + impactDirection.slice(1)}</span>
        </div>
        <div class="impact-magnitude">
          <span class="magnitude-label">Magnitude:</span>
          <span class="magnitude-value">${prediction.magnitude.charAt(0).toUpperCase() + prediction.magnitude.slice(1)}</span>
        </div>
      </div>
    `;
    
    container.appendChild(impactScoreContainer);
    
    // Create impact factors
    const impactFactorsContainer = document.createElement('div');
    impactFactorsContainer.className = 'impact-factors-container';
    impactFactorsContainer.innerHTML = `
      <h3>Key Impact Factors</h3>
      <div class="impact-factors">
        <div class="impact-factor">
          <div class="factor-name">US Exposure</div>
          <div class="factor-value">${stockData.usExposure.toFixed(1)}/10</div>
          <div class="factor-bar">
            <div class="factor-bar-fill" style="width: ${stockData.usExposure * 10}%"></div>
          </div>
        </div>
        <div class="impact-factor">
          <div class="factor-name">China Exposure</div>
          <div class="factor-value">${stockData.chinaExposure.toFixed(1)}/10</div>
          <div class="factor-bar">
            <div class="factor-bar-fill" style="width: ${stockData.chinaExposure * 10}%"></div>
          </div>
        </div>
        <div class="impact-factor">
          <div class="factor-name">Supply Chain Exposure</div>
          <div class="factor-value">${stockData.supplyChainExposure.toFixed(1)}/10</div>
          <div class="factor-bar">
            <div class="factor-bar-fill" style="width: ${stockData.supplyChainExposure * 10}%"></div>
          </div>
        </div>
        <div class="impact-factor">
          <div class="factor-name">Beta</div>
          <div class="factor-value">${stockData.beta.toFixed(2)}</div>
          <div class="factor-bar">
            <div class="factor-bar-fill" style="width: ${Math.min(100, stockData.beta * 50)}%"></div>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(impactFactorsContainer);
    
    // Create impact rationale
    const impactRationaleContainer = document.createElement('div');
    impactRationaleContainer.className = 'impact-rationale-container';
    
    // Generate rationale based on prediction and stock data
    const rationale = this._generateTariffImpactRationale(prediction, stockData);
    
    impactRationaleContainer.innerHTML = `
      <h3>Impact Rationale</h3>
      <div class="impact-rationale">
        ${rationale}
      </div>
    `;
    
    container.appendChild(impactRationaleContainer);
  }
  
  /**
   * Render price movement prediction dashboard
   * @param {string} containerId - ID of the container element
   * @param {Object} stockData - Stock data
   */
  renderPriceMovementPrediction(containerId, stockData) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Check if models are loaded
    if (!this.predictiveAnalytics.areModelsLoaded()) {
      this._renderLoadingState(container, 'Loading predictive models...');
      
      // Check status every second
      const checkInterval = setInterval(() => {
        if (this.predictiveAnalytics.areModelsLoaded()) {
          clearInterval(checkInterval);
          this.renderPriceMovementPrediction(containerId, stockData);
        }
      }, 1000);
      
      return;
    }
    
    // Get price movement prediction
    const prediction = this.predictiveAnalytics.predictPriceMovement(stockData);
    if (!prediction) {
      this._renderErrorState(container, 'Unable to generate price movement prediction');
      return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Create prediction header
    const header = document.createElement('div');
    header.className = 'prediction-header';
    header.innerHTML = `
      <h2>Price Movement Prediction</h2>
      <p>Predicted price movement for ${stockData.symbol} (${stockData.name}) over the next 1-3 months</p>
    `;
    
    container.appendChild(header);
    
    // Create expected return visualization
    const expectedReturnContainer = document.createElement('div');
    expectedReturnContainer.className = 'expected-return-container';
    
    const expectedReturn = prediction.expectedReturn * 100;
    const returnDirection = expectedReturn >= 0 ? 'positive' : 'negative';
    const returnClass = `return-${returnDirection}`;
    
    expectedReturnContainer.innerHTML = `
      <div class="expected-return-header">
        <h3>Expected Return</h3>
        <div class="confidence-indicator">
          <span class="confidence-label">Confidence:</span>
          <span class="confidence-value">${Math.round(prediction.confidence * 100)}%</span>
        </div>
      </div>
      <div class="expected-return-value ${returnClass}">
        ${expectedReturn >= 0 ? '+' : ''}${expectedReturn.toFixed(2)}%
      </div>
      <div class="probability-container">
        <div class="probability-item">
          <div class="probability-label">Probability of Upward Movement:</div>
          <div class="probability-value">${Math.round(prediction.upProbability * 100)}%</div>
          <div class="probability-bar">
            <div class="probability-bar-fill positive" style="width: ${prediction.upProbability * 100}%"></div>
          </div>
        </div>
        <div class="probability-item">
          <div class="probability-label">Probability of Downward Movement:</div>
          <div class="probability-value">${Math.round(prediction.downProbability * 100)}%</div>
          <div class="probability-bar">
            <div class="probability-bar-fill negative" style="width: ${prediction.downProbability * 100}%"></div>
          </div>
        </div>
        <div class="probability-item highlight">
          <div class="probability-label">Probability of 15%+ Movement:</div>
          <div class="probability-value">${Math.round(prediction.prob15PctMove * 100)}%</div>
          <div class="probability-bar">
            <div class="probability-bar-fill highlight" style="width: ${prediction.prob15PctMove * 100}%"></div>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(expectedReturnContainer);
    
    // Create price range forecast
    const priceRangeContainer = document.createElement('div');
    priceRangeContainer.className = 'price-range-container';
    
    const priceRanges = prediction.priceRanges;
    
    priceRangeContainer.innerHTML = `
      <h3>Price Range Forecast</h3>
      <div class="price-ranges">
        <div class="price-range-period">
          <h4>1 Month Forecast</h4>
          <div class="price-range-chart">
            <div class="current-price-marker" style="left: 50%;">
              <div class="marker-label">Current</div>
              <div class="marker-value">$${stockData.price.toFixed(2)}</div>
            </div>
            <div class="price-range-bar">
              <div class="range-worst-case" style="left: 0; width: 33%;">
                <div class="range-label">Worst Case</div>
                <div class="range-value">$${priceRanges['1_month'].worst_case.toFixed(2)}</div>
              </div>
              <div class="range-expected" style="left: 33%; width: 34%;">
                <div class="range-label">Expected</div>
                <div class="range-value">$${priceRanges['1_month'].expected.toFixed(2)}</div>
              </div>
              <div class="range-best-case" style="left: 67%; width: 33%;">
                <div class="range-label">Best Case</div>
                <div class="range-value">$${priceRanges['1_month'].best_case.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="price-range-period">
          <h4>3 Month Forecast</h4>
          <div class="price-range-chart">
            <div class="current-price-marker" style="left: 50%;">
              <div class="marker-label">Current</div>
              <div class="marker-value">$${stockData.price.toFixed(2)}</div>
            </div>
            <div class="price-range-bar">
              <div class="range-worst-case" style="left: 0; width: 33%;">
                <div class="range-label">Worst Case</div>
                <div class="range-value">$${priceRanges['3_month'].worst_case.toFixed(2)}</div>
              </div>
              <div class="range-expected" style="left: 33%; width: 34%;">
                <div class="range-label">Expected</div>
                <div class="range-value">$${priceRanges['3_month'].expected.toFixed(2)}</div>
              </div>
              <div class="range-best-case" style="left: 67%; width: 33%;">
                <div class="range-label">Best Case</div>
                <div class="range-value">$${priceRanges['3_month'].best_case.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(priceRangeContainer);
    
    // Create prediction factors
    const predictionFactorsContainer = document.createElement('div');
    predictionFactorsContainer.className = 'prediction-factors-container';
    
    predictionFactorsContainer.innerHTML = `
      <h3>Key Prediction Factors</h3>
      <div class="prediction-factors">
        <div class="prediction-factor-group">
          <h4>Technical Indicators</h4>
          <div class="prediction-factor">
            <div class="factor-name">RSI</div>
            <div class="factor-value">${stockData.technicalIndicators.rsi.toFixed(1)}</div>
            <div class="factor-bar">
              <div class="factor-bar-fill ${stockData.technicalIndicators.rsi < 30 ? 'oversold' : stockData.technicalIndicators.rsi > 70 ? 'overbought' : 'neutral'}" 
                   style="width: ${stockData.technicalIndicators.rsi}%"></div>
            </div>
          </div>
          <div class="prediction-factor">
            <div class="factor-name">MACD</div>
            <div class="factor-value">${stockData.technicalIndicators.macd.toFixed(2)}</div>
            <div class="factor-bar">
              <div class="factor-bar-fill ${stockData.technicalIndicators.macd >= 0 ? 'positive' : 'negative'}" 
                   style="width: ${Math.min(100, Math.abs(stockData.technicalIndicators.macd) * 50)}%"></div>
            </div>
          </div>
        </div>
        <div class="prediction-factor-group">
          <h4>Risk Metrics</h4>
          <div class="prediction-factor">
            <div class="factor-name">Volatility</div>
            <div class="factor-value">${stockData.volatility.toFixed(1)}%</div>
            <div class="factor-bar">
              <div class="factor-bar-fill" style="width: ${Math.min(100, stockData.volatility * 2)}%"></div>
            </div>
          </div>
          <div class="prediction-factor">
            <div class="factor-name">Beta</div>
            <div class="factor-value">${stockData.beta.toFixed(2)}</div>
            <div class="factor-bar">
              <div class="factor-bar-fill" style="width: ${Math.min(100, stockData.beta * 50)}%"></div>
            </div>
          </div>
        </div>
        <div class="prediction-factor-group">
          <h4>Momentum</h4>
          <div class="prediction-factor">
            <div class="factor-name">Momentum Score</div>
            <div class="factor-value">${stockData.momentumScore.toFixed(1)}</div>
            <div class="factor-bar">
              <div class="factor-bar-fill ${stockData.momentumScore >= 0 ? 'positive' : 'negative'}" 
                   style="width: ${Math.min(100, Math.abs(stockData.momentumScore) * 10)}%"></div>
            </div>
          </div>
          <div class="prediction-factor">
            <div class="factor-name">Trading Volume Ratio</div>
            <div class="factor-value">${stockData.tradingVolumeRatio.toFixed(2)}x</div>
            <div class="factor-bar">
              <div class="factor-bar-fill" style="width: ${Math.min(100, stockData.tradingVolumeRatio * 50)}%"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(predictionFactorsContainer);
    
    // Create prediction rationale
    const predictionRationaleContainer = document.createElement('div');
    predictionRationaleContainer.className = 'prediction-rationale-container';
    
    // Generate rationale based on prediction and stock data
    const rationale = this._generatePriceMovementRationale(prediction, stockData);
    
    predictionRationaleContainer.innerHTML = `
      <h3>Prediction Rationale</h3>
      <div class="prediction-rationale">
        ${rationale}
      </div>
    `;
    
    container.appendChild(predictionRationaleContainer);
  }
  
  /**
   * Render scenario analysis dashboard
   * @param {string} containerId - ID of the container element
   * @param {Object} stockData - Stock data
   */
  renderScenarioAnalysis(containerId, stockData) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Check if models are loaded
    if (!this.predictiveAnalytics.areModelsLoaded()) {
      this._renderLoadingState(container, 'Loading predictive models...');
      
      // Check status every second
      const checkInterval = setInterval(() => {
        if (this.predictiveAnalytics.areModelsLoaded()) {
          clearInterval(checkInterval);
          this.renderScenarioAnalysis(containerId, stockData);
        }
      }, 1000);
      
      return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Create scenario analysis header
    const header = document.createElement('div');
    header.className = 'scenario-header';
    header.innerHTML = `
      <h2>Tariff Scenario Analysis</h2>
      <p>Analyze the impact of different tariff scenarios on ${stockData.symbol} (${stockData.name})</p>
    `;
    
    container.appendChild(header);
    
    // Create scenario controls
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'scenario-controls';
    
    // Get default scenarios
    const defaultScenarios = this.predictiveAnalytics.getDefaultTariffScenarios();
    
    // Create scenario selector
    const scenarioSelector = document.createElement('div');
    scenarioSelector.className = 'scenario-selector';
    scenarioSelector.innerHTML = `
      <h3>Select Scenarios to Analyze</h3>
      <div class="scenario-checkboxes">
        ${defaultScenarios.map((scenario, index) => `
          <div class="scenario-checkbox">
            <input type="checkbox" id="scenario-${index}" class="scenario-checkbox-input" value="${scenario.id}" ${index < 3 ? 'checked' : ''}>
            <label for="scenario-${index}" class="scenario-checkbox-label">
              <span class="scenario-name">${scenario.name}</span>
              <span class="scenario-probability">(${Math.round(scenario.probability * 100)}% probability)</span>
            </label>
          </div>
        `).join('')}
      </div>
      <button class="analyze-button">Analyze Selected Scenarios</button>
      <button class="custom-scenario-button">Create Custom Scenario</button>
    `;
    
    controlsContainer.appendChild(scenarioSelector);
    
    // Create custom scenario form (hidden by default)
    const customScenarioForm = document.createElement('div');
    customScenarioForm.className = 'custom-scenario-form';
    customScenarioForm.style.display = 'none';
    
    customScenarioForm.innerHTML = `
      <h3>Create Custom Scenario</h3>
      <div class="form-group">
        <label for="custom-scenario-name">Scenario Name:</label>
        <input type="text" id="custom-scenario-name" class="form-control" placeholder="e.g., Moderate Tariff Increase">
      </div>
      <div class="form-group">
        <label for="custom-scenario-description">Description:</label>
        <textarea id="custom-scenario-description" class="form-control" placeholder="Describe the scenario..."></textarea>
      </div>
      <div class="form-group">
        <label for="custom-tariff-rate">Tariff Rate (%):</label>
        <input type="range" id="custom-tariff-rate" class="form-range" min="0" max="50" step="5" value="15">
        <span class="range-value" id="custom-tariff-rate-value">15%</span>
      </div>
      <div class="form-group">
        <label>Affected Sectors:</label>
        <div class="checkbox-group">
          ${['Materials', 'Consumer Staples', 'Healthcare', 'Financials', 'Information Technology', 
             'Industrials', 'Utilities', 'Energy', 'Communication Services', 'Consumer Discretionary', 'Real Estate'].map(sector => `
            <div class="checkbox-item">
              <input type="checkbox" id="sector-${sector}" class="sector-checkbox" value="${sector}">
              <label for="sector-${sector}">${sector}</label>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="form-group">
        <label>Affected Countries:</label>
        <div class="checkbox-group">
          <div class="checkbox-item">
            <input type="checkbox" id="country-China" class="country-checkbox" value="China" checked>
            <label for="country-China">China</label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" id="country-US" class="country-checkbox" value="US">
            <label for="country-US">US</label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="custom-supply-chain">Supply Chain Disruption (1-10):</label>
        <input type="range" id="custom-supply-chain" class="form-range" min="0" max="10" step="1" value="5">
        <span class="range-value" id="custom-supply-chain-value">5</span>
      </div>
      <div class="form-group">
        <label for="custom-probability">Probability (%):</label>
        <input type="range" id="custom-probability" class="form-range" min="5" max="95" step="5" value="50">
        <span class="range-value" id="custom-probability-value">50%</span>
      </div>
      <div class="form-actions">
        <button class="add-custom-scenario-button">Add Scenario</button>
        <button class="cancel-custom-scenario-button">Cancel</button>
      </div>
    `;
    
    controlsContainer.appendChild(customScenarioForm);
    
    container.appendChild(controlsContainer);
    
    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'scenario-results-container';
    resultsContainer.id = `${containerId}-results`;
    resultsContainer.innerHTML = '<div class="placeholder-message">Select scenarios and click "Analyze" to see results</div>';
    
    container.appendChild(resultsContainer);
    
    // Add event listeners
    const analyzeButton = container.querySelector('.analyze-button');
    analyzeButton.addEventListener('click', () => {
      // Get selected scenarios
      const selectedScenarioIds = Array.from(container.querySelectorAll('.scenario-checkbox-input:checked'))
        .map(checkbox => checkbox.value);
      
      // Filter scenarios
      const selectedScenarios = defaultScenarios.filter(scenario => selectedScenarioIds.includes(scenario.id));
      
      // Add any custom scenarios
      const customScenarios = Array.from(container.querySelectorAll('.custom-scenario-item'))
        .map(item => JSON.parse(item.getAttribute('data-scenario')));
      
      const scenarios = [...selectedScenarios, ...customScenarios];
      
      // Analyze scenarios
      this._analyzeScenarios(containerId, stockData, scenarios);
    });
    
    const customScenarioButton = container.querySelector('.custom-scenario-button');
    customScenarioButton.addEventListener('click', () => {
      customScenarioForm.style.display = 'block';
      customScenarioButton.style.display = 'none';
    });
    
    const cancelCustomScenarioButton = container.querySelector('.cancel-custom-scenario-button');
    cancelCustomScenarioButton.addEventListener('click', () => {
      customScenarioForm.style.display = 'none';
      customScenarioButton.style.display = 'block';
    });
    
    const addCustomScenarioButton = container.querySelector('.add-custom-scenario-button');
    addCustomScenarioButton.addEventListener('click', () => {
      // Get form values
      const name = container.querySelector('#custom-scenario-name').value || 'Custom Scenario';
      const description = container.querySelector('#custom-scenario-description').value || 'User-defined custom scenario';
      const tariffRate = parseInt(container.querySelector('#custom-tariff-rate').value);
      const supplyChainDisruption = parseInt(container.querySelector('#custom-supply-chain').value);
      const probability = parseInt(container.querySelector('#custom-probability').value) / 100;
      
      // Get selected sectors
      const affectedSectors = Array.from(container.querySelectorAll('.sector-checkbox:checked'))
        .map(checkbox => checkbox.value);
      
      // Get selected countries
      const affectedCountries = Array.from(container.querySelectorAll('.country-checkbox:checked'))
        .map(checkbox => checkbox.value);
      
      // Create custom scenario
      const customScenario = this.predictiveAnalytics.createCustomScenario({
        name,
        description,
        tariffRate,
        affectedSectors,
        affectedCountries,
        supplyChainDisruption,
        probability
      });
      
      // Add to scenario selector
      const scenarioCheckboxes = container.querySelector('.scenario-checkboxes');
      const customScenarioItem = document.createElement('div');
      customScenarioItem.className = 'scenario-checkbox custom-scenario-item';
      customScenarioItem.setAttribute('data-scenario', JSON.stringify(customScenario));
      
      customScenarioItem.innerHTML = `
        <input type="checkbox" id="scenario-${customScenario.id}" class="scenario-checkbox-input" value="${customScenario.id}" checked>
        <label for="scenario-${customScenario.id}" class="scenario-checkbox-label">
          <span class="scenario-name">${customScenario.name} (Custom)</span>
          <span class="scenario-probability">(${Math.round(customScenario.probability * 100)}% probability)</span>
        </label>
        <button class="remove-scenario-button" data-id="${customScenario.id}">×</button>
      `;
      
      scenarioCheckboxes.appendChild(customScenarioItem);
      
      // Reset form
      container.querySelector('#custom-scenario-name').value = '';
      container.querySelector('#custom-scenario-description').value = '';
      container.querySelector('#custom-tariff-rate').value = 15;
      container.querySelector('#custom-tariff-rate-value').textContent = '15%';
      container.querySelector('#custom-supply-chain').value = 5;
      container.querySelector('#custom-supply-chain-value').textContent = '5';
      container.querySelector('#custom-probability').value = 50;
      container.querySelector('#custom-probability-value').textContent = '50%';
      
      // Hide form
      customScenarioForm.style.display = 'none';
      customScenarioButton.style.display = 'block';
      
      // Add event listener to remove button
      const removeButton = customScenarioItem.querySelector('.remove-scenario-button');
      removeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        scenarioCheckboxes.removeChild(customScenarioItem);
      });
    });
    
    // Add event listeners for range inputs
    const tariffRateInput = container.querySelector('#custom-tariff-rate');
    const tariffRateValue = container.querySelector('#custom-tariff-rate-value');
    tariffRateInput.addEventListener('input', () => {
      tariffRateValue.textContent = `${tariffRateInput.value}%`;
    });
    
    const supplyChainInput = container.querySelector('#custom-supply-chain');
    const supplyChainValue = container.querySelector('#custom-supply-chain-value');
    supplyChainInput.addEventListener('input', () => {
      supplyChainValue.textContent = supplyChainInput.value;
    });
    
    const probabilityInput = container.querySelector('#custom-probability');
    const probabilityValue = container.querySelector('#custom-probability-value');
    probabilityInput.addEventListener('input', () => {
      probabilityValue.textContent = `${probabilityInput.value}%`;
    });
  }
  
  /**
   * Analyze scenarios and display results
   * @param {string} containerId - ID of the container element
   * @param {Object} stockData - Stock data
   * @param {Array} scenarios - Scenarios to analyze
   * @private
   */
  _analyzeScenarios(containerId, stockData, scenarios) {
    const resultsContainer = document.getElementById(`${containerId}-results`);
    if (!resultsContainer) return;
    
    // Show loading state
    resultsContainer.innerHTML = '<div class="loading-indicator">Analyzing scenarios...</div>';
    
    // Analyze scenarios
    const scenarioResults = this.predictiveAnalytics.analyzeScenarios(stockData, scenarios);
    if (!scenarioResults) {
      resultsContainer.innerHTML = '<div class="error-message">Unable to analyze scenarios</div>';
      return;
    }
    
    // Generate probability-weighted forecast
    const forecast = this.predictiveAnalytics.generateProbabilityWeightedForecast(stockData, scenarios);
    if (!forecast) {
      resultsContainer.innerHTML = '<div class="error-message">Unable to generate forecast</div>';
      return;
    }
    
    // Clear results container
    resultsContainer.innerHTML = '';
    
    // Create weighted forecast section
    const weightedForecastContainer = document.createElement('div');
    weightedForecastContainer.className = 'weighted-forecast-container';
    
    const weightedImpact = forecast.weightedImpact * 100;
    const impactDirection = weightedImpact >= 0 ? 'positive' : 'negative';
    const impactClass = `impact-${impactDirection}`;
    
    weightedForecastContainer.innerHTML = `
      <h3>Probability-Weighted Forecast</h3>
      <div class="weighted-forecast">
        <div class="forecast-item">
          <div class="forecast-label">Weighted Impact:</div>
          <div class="forecast-value ${impactClass}">${weightedImpact >= 0 ? '+' : ''}${weightedImpact.toFixed(2)}%</div>
        </div>
        <div class="forecast-item">
          <div class="forecast-label">Expected Price:</div>
          <div class="forecast-value">$${forecast.weightedPriceChange.toFixed(2)}</div>
        </div>
        <div class="forecast-item">
          <div class="forecast-label">95% Confidence Interval:</div>
          <div class="forecast-value">$${forecast.confidenceInterval.lower.toFixed(2)} to $${forecast.confidenceInterval.upper.toFixed(2)}</div>
        </div>
        <div class="forecast-item">
          <div class="forecast-label">Probability of Positive Outcome:</div>
          <div class="forecast-value">${Math.round(forecast.positiveOutcomeProbability * 100)}%</div>
        </div>
      </div>
    `;
    
    resultsContainer.appendChild(weightedForecastContainer);
    
    // Create scenario comparison section
    const scenarioComparisonContainer = document.createElement('div');
    scenarioComparisonContainer.className = 'scenario-comparison-container';
    
    scenarioComparisonContainer.innerHTML = `
      <h3>Scenario Comparison</h3>
      <div class="scenario-comparison-chart">
        <div class="chart-y-axis">
          <div class="y-axis-label">Impact (%)</div>
          <div class="y-axis-ticks">
            <div class="y-axis-tick" style="bottom: 80%;">+10%</div>
            <div class="y-axis-tick" style="bottom: 70%;">+7.5%</div>
            <div class="y-axis-tick" style="bottom: 60%;">+5%</div>
            <div class="y-axis-tick" style="bottom: 50%;">+2.5%</div>
            <div class="y-axis-tick" style="bottom: 40%;">0%</div>
            <div class="y-axis-tick" style="bottom: 30%;">-2.5%</div>
            <div class="y-axis-tick" style="bottom: 20%;">-5%</div>
            <div class="y-axis-tick" style="bottom: 10%;">-7.5%</div>
            <div class="y-axis-tick" style="bottom: 0%;">-10%</div>
          </div>
        </div>
        <div class="chart-bars">
          ${Object.keys(scenarioResults).map(scenarioId => {
            const result = scenarioResults[scenarioId];
            const scenario = scenarios.find(s => s.id === scenarioId);
            const impact = result.impact * 100;
            const barHeight = Math.min(80, Math.abs(impact) * 4);
            const barBottom = impact >= 0 ? 40 : 40 - barHeight;
            const barClass = impact >= 0 ? 'positive' : 'negative';
            
            return `
              <div class="chart-bar-container">
                <div class="chart-bar ${barClass}" style="height: ${barHeight}%; bottom: ${barBottom}%;">
                  <div class="bar-value">${impact >= 0 ? '+' : ''}${impact.toFixed(1)}%</div>
                </div>
                <div class="bar-label">${scenario.name}</div>
                <div class="bar-probability">${Math.round(scenario.probability * 100)}%</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    
    resultsContainer.appendChild(scenarioComparisonContainer);
    
    // Create scenario details section
    const scenarioDetailsContainer = document.createElement('div');
    scenarioDetailsContainer.className = 'scenario-details-container';
    
    scenarioDetailsContainer.innerHTML = `
      <h3>Scenario Details</h3>
      <div class="scenario-details">
        <table class="scenario-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Impact</th>
              <th>Price Change</th>
              <th>Probability</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            ${Object.keys(scenarioResults).map(scenarioId => {
              const result = scenarioResults[scenarioId];
              const scenario = scenarios.find(s => s.id === scenarioId);
              const impact = result.impact * 100;
              const priceChange = stockData.price * (1 + result.impact);
              const impactClass = impact >= 0 ? 'positive' : 'negative';
              
              return `
                <tr>
                  <td>
                    <div class="scenario-name">${scenario.name}</div>
                    <div class="scenario-description">${scenario.description}</div>
                  </td>
                  <td class="${impactClass}">${impact >= 0 ? '+' : ''}${impact.toFixed(2)}%</td>
                  <td>$${priceChange.toFixed(2)}</td>
                  <td>${Math.round(scenario.probability * 100)}%</td>
                  <td>${Math.round(result.confidence * 100)}%</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
    
    resultsContainer.appendChild(scenarioDetailsContainer);
    
    // Create scenario rationale
    const scenarioRationaleContainer = document.createElement('div');
    scenarioRationaleContainer.className = 'scenario-rationale-container';
    
    // Generate rationale based on forecast and stock data
    const rationale = this._generateScenarioAnalysisRationale(forecast, stockData, scenarios);
    
    scenarioRationaleContainer.innerHTML = `
      <h3>Analysis Rationale</h3>
      <div class="scenario-rationale">
        ${rationale}
      </div>
    `;
    
    resultsContainer.appendChild(scenarioRationaleContainer);
  }
  
  /**
   * Generate tariff impact rationale
   * @param {Object} prediction - Tariff impact prediction
   * @param {Object} stockData - Stock data
   * @returns {string} Rationale HTML
   * @private
   */
  _generateTariffImpactRationale(prediction, stockData) {
    const impactScore = prediction.impactScore;
    const direction = prediction.direction;
    const magnitude = prediction.magnitude;
    
    let rationale = `<p>${stockData.symbol} is predicted to be <strong>${direction}ly impacted</strong> by Trump tariffs with a <strong>${magnitude} magnitude</strong> (impact score: ${impactScore.toFixed(1)}).</p>`;
    
    // Add sector-specific rationale
    rationale += `<p>As a company in the <strong>${stockData.sector}</strong> sector, ${stockData.symbol} is `;
    
    switch (stockData.sector) {
      case 'Materials':
        rationale += `particularly vulnerable to tariffs due to its reliance on global supply chains and raw materials pricing. Materials companies often face direct impact from tariffs on commodities and metals.`;
        break;
      case 'Consumer Staples':
        rationale += `moderately affected by tariffs through potential supply chain disruptions and input cost increases, though consumer demand tends to remain relatively stable.`;
        break;
      case 'Healthcare':
        rationale += `somewhat insulated from tariffs compared to other sectors, though medical equipment and pharmaceutical ingredients may face some supply chain challenges.`;
        break;
      case 'Financials':
        rationale += `indirectly affected by tariffs through broader economic impacts and market volatility rather than direct tariff exposure.`;
        break;
      case 'Information Technology':
        rationale += `vulnerable to tariffs due to global supply chains, particularly for hardware components and manufacturing that often involves China.`;
        break;
      case 'Industrials':
        rationale += `significantly exposed to tariffs through both input costs and potential export market disruptions.`;
        break;
      case 'Utilities':
        rationale += `relatively protected from direct tariff impacts, though equipment costs may increase slightly.`;
        break;
      case 'Energy':
        rationale += `exposed to tariffs through potential impacts on global energy markets and equipment costs.`;
        break;
      case 'Communication Services':
        rationale += `moderately affected by tariffs, primarily through hardware components and infrastructure equipment.`;
        break;
      case 'Consumer Discretionary':
        rationale += `vulnerable to tariffs through both direct product costs and potential consumer spending reductions if economic conditions worsen.`;
        break;
      case 'Real Estate':
        rationale += `indirectly affected by tariffs through broader economic impacts rather than direct exposure.`;
        break;
      default:
        rationale += `affected by tariffs in ways typical for its industry.`;
    }
    
    rationale += `</p>`;
    
    // Add exposure-specific rationale
    rationale += `<p>The company has `;
    
    if (stockData.usExposure > 7) {
      rationale += `very high exposure to the US market (${stockData.usExposure.toFixed(1)}/10), `;
    } else if (stockData.usExposure > 5) {
      rationale += `high exposure to the US market (${stockData.usExposure.toFixed(1)}/10), `;
    } else if (stockData.usExposure > 3) {
      rationale += `moderate exposure to the US market (${stockData.usExposure.toFixed(1)}/10), `;
    } else {
      rationale += `limited exposure to the US market (${stockData.usExposure.toFixed(1)}/10), `;
    }
    
    if (stockData.chinaExposure > 7) {
      rationale += `very high exposure to the Chinese market (${stockData.chinaExposure.toFixed(1)}/10), `;
    } else if (stockData.chinaExposure > 5) {
      rationale += `high exposure to the Chinese market (${stockData.chinaExposure.toFixed(1)}/10), `;
    } else if (stockData.chinaExposure > 3) {
      rationale += `moderate exposure to the Chinese market (${stockData.chinaExposure.toFixed(1)}/10), `;
    } else {
      rationale += `limited exposure to the Chinese market (${stockData.chinaExposure.toFixed(1)}/10), `;
    }
    
    if (stockData.supplyChainExposure > 7) {
      rationale += `and very high supply chain exposure (${stockData.supplyChainExposure.toFixed(1)}/10).`;
    } else if (stockData.supplyChainExposure > 5) {
      rationale += `and high supply chain exposure (${stockData.supplyChainExposure.toFixed(1)}/10).`;
    } else if (stockData.supplyChainExposure > 3) {
      rationale += `and moderate supply chain exposure (${stockData.supplyChainExposure.toFixed(1)}/10).`;
    } else {
      rationale += `and limited supply chain exposure (${stockData.supplyChainExposure.toFixed(1)}/10).`;
    }
    
    rationale += `</p>`;
    
    // Add market cap and beta rationale
    rationale += `<p>As a ${stockData.marketCap} company with a beta of ${stockData.beta.toFixed(2)}, ${stockData.symbol} is `;
    
    if (stockData.beta > 1.3) {
      rationale += `likely to experience amplified market reactions to tariff news due to its high beta.`;
    } else if (stockData.beta > 0.8) {
      rationale += `expected to move roughly in line with the broader market in response to tariff news.`;
    } else {
      rationale += `likely to be less volatile than the broader market in response to tariff news due to its low beta.`;
    }
    
    rationale += `</p>`;
    
    // Add FX impact
    rationale += `<p>The AUD/USD exchange rate movements could ${stockData.fxAmplification > 1.2 ? 'significantly amplify' : stockData.fxAmplification > 0.8 ? 'moderately affect' : 'slightly mitigate'} tariff impacts for ${stockData.symbol}, with an FX amplification factor of ${stockData.fxAmplification.toFixed(2)}x.</p>`;
    
    // Add confidence statement
    rationale += `<p>This prediction is made with ${Math.round(prediction.confidence * 100)}% confidence based on historical tariff impacts, sector analysis, and company-specific factors.</p>`;
    
    return rationale;
  }
  
  /**
   * Generate price movement rationale
   * @param {Object} prediction - Price movement prediction
   * @param {Object} stockData - Stock data
   * @returns {string} Rationale HTML
   * @private
   */
  _generatePriceMovementRationale(prediction, stockData) {
    const expectedReturn = prediction.expectedReturn * 100;
    const direction = expectedReturn >= 0 ? 'positive' : 'negative';
    const upProbability = prediction.upProbability * 100;
    const prob15PctMove = prediction.prob15PctMove * 100;
    
    let rationale = `<p>${stockData.symbol} is predicted to have a <strong>${direction} expected return of ${expectedReturn >= 0 ? '+' : ''}${expectedReturn.toFixed(2)}%</strong> over the next 1-3 months, with a ${Math.round(upProbability)}% probability of upward movement and a ${Math.round(prob15PctMove)}% probability of a 15%+ move in either direction.</p>`;
    
    // Add technical indicators rationale
    rationale += `<p>Technical indicators suggest `;
    
    if (stockData.technicalIndicators.rsi < 30) {
      rationale += `the stock is <strong>oversold</strong> (RSI: ${stockData.technicalIndicators.rsi.toFixed(1)}), which typically indicates a potential buying opportunity. `;
    } else if (stockData.technicalIndicators.rsi > 70) {
      rationale += `the stock is <strong>overbought</strong> (RSI: ${stockData.technicalIndicators.rsi.toFixed(1)}), which may indicate a potential pullback. `;
    } else {
      rationale += `the stock is neither overbought nor oversold (RSI: ${stockData.technicalIndicators.rsi.toFixed(1)}). `;
    }
    
    if (stockData.technicalIndicators.macd > 0.5) {
      rationale += `The MACD (${stockData.technicalIndicators.macd.toFixed(2)}) is strongly positive, indicating bullish momentum.`;
    } else if (stockData.technicalIndicators.macd > 0) {
      rationale += `The MACD (${stockData.technicalIndicators.macd.toFixed(2)}) is slightly positive, suggesting mild bullish momentum.`;
    } else if (stockData.technicalIndicators.macd > -0.5) {
      rationale += `The MACD (${stockData.technicalIndicators.macd.toFixed(2)}) is slightly negative, suggesting mild bearish momentum.`;
    } else {
      rationale += `The MACD (${stockData.technicalIndicators.macd.toFixed(2)}) is strongly negative, indicating bearish momentum.`;
    }
    
    rationale += `</p>`;
    
    // Add volatility and beta rationale
    rationale += `<p>With an annualized volatility of ${stockData.volatility.toFixed(1)}% and a beta of ${stockData.beta.toFixed(2)}, ${stockData.symbol} is `;
    
    if (stockData.volatility > 30) {
      rationale += `a <strong>highly volatile stock</strong> that could experience significant price swings. `;
    } else if (stockData.volatility > 20) {
      rationale += `a <strong>moderately volatile stock</strong> that may experience notable price movements. `;
    } else {
      rationale += `a <strong>relatively stable stock</strong> with lower expected price volatility. `;
    }
    
    if (stockData.beta > 1.3) {
      rationale += `Its high beta indicates it tends to move more dramatically than the broader market.`;
    } else if (stockData.beta > 0.8) {
      rationale += `Its beta indicates it tends to move roughly in line with the broader market.`;
    } else {
      rationale += `Its low beta indicates it tends to be less affected by broader market movements.`;
    }
    
    rationale += `</p>`;
    
    // Add momentum and volume rationale
    rationale += `<p>The stock currently has `;
    
    if (stockData.momentumScore > 5) {
      rationale += `<strong>strong positive momentum</strong> (score: ${stockData.momentumScore.toFixed(1)}) `;
    } else if (stockData.momentumScore > 0) {
      rationale += `<strong>mild positive momentum</strong> (score: ${stockData.momentumScore.toFixed(1)}) `;
    } else if (stockData.momentumScore > -5) {
      rationale += `<strong>mild negative momentum</strong> (score: ${stockData.momentumScore.toFixed(1)}) `;
    } else {
      rationale += `<strong>strong negative momentum</strong> (score: ${stockData.momentumScore.toFixed(1)}) `;
    }
    
    if (stockData.tradingVolumeRatio > 1.5) {
      rationale += `with <strong>significantly higher than average trading volume</strong> (${stockData.tradingVolumeRatio.toFixed(2)}x normal), suggesting strong investor interest.`;
    } else if (stockData.tradingVolumeRatio > 1) {
      rationale += `with <strong>above average trading volume</strong> (${stockData.tradingVolumeRatio.toFixed(2)}x normal), indicating healthy investor interest.`;
    } else if (stockData.tradingVolumeRatio > 0.7) {
      rationale += `with <strong>normal trading volume</strong> (${stockData.tradingVolumeRatio.toFixed(2)}x normal).`;
    } else {
      rationale += `with <strong>below average trading volume</strong> (${stockData.tradingVolumeRatio.toFixed(2)}x normal), which may indicate lower investor interest.`;
    }
    
    rationale += `</p>`;
    
    // Add tariff sensitivity rationale
    rationale += `<p>The stock's tariff sensitivity score of ${stockData.tariffSensitivityScore.toFixed(1)}/10 suggests it is `;
    
    if (stockData.tariffSensitivityScore > 7) {
      rationale += `<strong>highly sensitive to tariff developments</strong>, which could drive significant price movements as Trump tariff policies evolve.`;
    } else if (stockData.tariffSensitivityScore > 5) {
      rationale += `<strong>moderately sensitive to tariff developments</strong>, which could influence price movements as Trump tariff policies evolve.`;
    } else if (stockData.tariffSensitivityScore > 3) {
      rationale += `<strong>somewhat sensitive to tariff developments</strong>, which may have a modest impact on price as Trump tariff policies evolve.`;
    } else {
      rationale += `<strong>relatively insulated from tariff developments</strong>, with limited expected price impact from Trump tariff policies.`;
    }
    
    rationale += `</p>`;
    
    // Add confidence statement
    rationale += `<p>This prediction is made with ${Math.round(prediction.confidence * 100)}% confidence based on technical analysis, volatility metrics, momentum indicators, and tariff sensitivity factors.</p>`;
    
    return rationale;
  }
  
  /**
   * Generate scenario analysis rationale
   * @param {Object} forecast - Probability-weighted forecast
   * @param {Object} stockData - Stock data
   * @param {Array} scenarios - Scenarios analyzed
   * @returns {string} Rationale HTML
   * @private
   */
  _generateScenarioAnalysisRationale(forecast, stockData, scenarios) {
    const weightedImpact = forecast.weightedImpact * 100;
    const direction = weightedImpact >= 0 ? 'positive' : 'negative';
    const positiveProb = forecast.positiveOutcomeProbability * 100;
    
    let rationale = `<p>Based on the analyzed tariff scenarios, ${stockData.symbol} is expected to experience a <strong>${direction} weighted impact of ${weightedImpact >= 0 ? '+' : ''}${weightedImpact.toFixed(2)}%</strong>, with a ${Math.round(positiveProb)}% probability of a positive outcome.</p>`;
    
    // Add scenario probability rationale
    rationale += `<p>The most likely scenario is `;
    
    // Find most likely scenario
    let mostLikelyScenario = scenarios[0];
    scenarios.forEach(scenario => {
      if (scenario.probability > mostLikelyScenario.probability) {
        mostLikelyScenario = scenario;
      }
    });
    
    rationale += `<strong>"${mostLikelyScenario.name}"</strong> (${Math.round(mostLikelyScenario.probability * 100)}% probability), which would result in `;
    
    // Get impact for most likely scenario
    const mostLikelyResult = forecast.scenarioResults[mostLikelyScenario.id];
    const mostLikelyImpact = mostLikelyResult.impact * 100;
    
    if (mostLikelyImpact > 0) {
      rationale += `a <strong>positive impact of +${mostLikelyImpact.toFixed(2)}%</strong> for ${stockData.symbol}.`;
    } else if (mostLikelyImpact < 0) {
      rationale += `a <strong>negative impact of ${mostLikelyImpact.toFixed(2)}%</strong> for ${stockData.symbol}.`;
    } else {
      rationale += `a <strong>neutral impact</strong> for ${stockData.symbol}.`;
    }
    
    rationale += `</p>`;
    
    // Add worst-case scenario rationale
    rationale += `<p>The worst-case scenario analyzed is `;
    
    // Find worst-case scenario
    let worstCaseScenario = null;
    let worstCaseImpact = 0;
    
    Object.keys(forecast.scenarioResults).forEach(scenarioId => {
      const result = forecast.scenarioResults[scenarioId];
      if (result.impact < worstCaseImpact) {
        worstCaseImpact = result.impact;
        worstCaseScenario = scenarios.find(s => s.id === scenarioId);
      }
    });
    
    if (worstCaseScenario) {
      const worstCaseResult = forecast.scenarioResults[worstCaseScenario.id];
      const worstCaseImpactPct = worstCaseResult.impact * 100;
      
      rationale += `<strong>"${worstCaseScenario.name}"</strong> (${Math.round(worstCaseScenario.probability * 100)}% probability), which would result in a <strong>negative impact of ${worstCaseImpactPct.toFixed(2)}%</strong> for ${stockData.symbol}.`;
    } else {
      rationale += `not clearly identified among the analyzed scenarios.`;
    }
    
    rationale += `</p>`;
    
    // Add best-case scenario rationale
    rationale += `<p>The best-case scenario analyzed is `;
    
    // Find best-case scenario
    let bestCaseScenario = null;
    let bestCaseImpact = 0;
    
    Object.keys(forecast.scenarioResults).forEach(scenarioId => {
      const result = forecast.scenarioResults[scenarioId];
      if (result.impact > bestCaseImpact) {
        bestCaseImpact = result.impact;
        bestCaseScenario = scenarios.find(s => s.id === scenarioId);
      }
    });
    
    if (bestCaseScenario) {
      const bestCaseResult = forecast.scenarioResults[bestCaseScenario.id];
      const bestCaseImpactPct = bestCaseResult.impact * 100;
      
      rationale += `<strong>"${bestCaseScenario.name}"</strong> (${Math.round(bestCaseScenario.probability * 100)}% probability), which would result in a <strong>positive impact of +${bestCaseImpactPct.toFixed(2)}%</strong> for ${stockData.symbol}.`;
    } else {
      rationale += `not clearly identified among the analyzed scenarios.`;
    }
    
    rationale += `</p>`;
    
    // Add confidence interval rationale
    rationale += `<p>With 95% confidence, the stock price is expected to be between <strong>$${forecast.confidenceInterval.lower.toFixed(2)}</strong> and <strong>$${forecast.confidenceInterval.upper.toFixed(2)}</strong> after accounting for all analyzed scenarios and their probabilities.</p>`;
    
    // Add sector-specific rationale
    rationale += `<p>As a company in the <strong>${stockData.sector}</strong> sector with a tariff sensitivity score of ${stockData.tariffSensitivityScore.toFixed(1)}/10, ${stockData.symbol} is `;
    
    if (stockData.tariffSensitivityScore > 7) {
      rationale += `particularly vulnerable to tariff policy changes, which explains the significant variance in potential outcomes across different scenarios.`;
    } else if (stockData.tariffSensitivityScore > 5) {
      rationale += `moderately sensitive to tariff policy changes, which contributes to the notable variance in potential outcomes across different scenarios.`;
    } else if (stockData.tariffSensitivityScore > 3) {
      rationale += `somewhat sensitive to tariff policy changes, though the variance in potential outcomes across scenarios is relatively contained.`;
    } else {
      rationale += `relatively insulated from tariff policy changes, which explains the limited variance in potential outcomes across different scenarios.`;
    }
    
    rationale += `</p>`;
    
    return rationale;
  }
  
  /**
   * Render loading state
   * @param {HTMLElement} container - Container element
   * @param {string} message - Loading message
   * @private
   */
  _renderLoadingState(container, message) {
    container.innerHTML = `
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <div class="loading-message">${message}</div>
      </div>
    `;
  }
  
  /**
   * Render error state
   * @param {HTMLElement} container - Container element
   * @param {string} message - Error message
   * @private
   */
  _renderErrorState(container, message) {
    container.innerHTML = `
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <div class="error-message">${message}</div>
      </div>
    `;
  }
}

export default PredictiveAnalyticsComponents;
