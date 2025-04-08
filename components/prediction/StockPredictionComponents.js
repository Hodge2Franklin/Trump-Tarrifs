// Stock Prediction Components for Trump Tariff Analysis Website

/**
 * StockPredictionComponents.js
 * 
 * This file contains React components for displaying stock predictions
 * with detailed rationale, confidence scoring, and factor analysis.
 */

class StockPredictionComponents {
  /**
   * Renders a prediction card for a specific stock
   * @param {Object} prediction - Stock prediction data
   * @param {Function} onViewDetails - Callback for viewing details
   * @returns {HTMLElement} - Prediction card element
   */
  static renderPredictionCard(prediction, onViewDetails) {
    const card = document.createElement('div');
    card.className = `prediction-card ${prediction.direction}`;
    
    // Create header
    const header = document.createElement('div');
    header.className = 'prediction-header';
    
    const symbol = document.createElement('span');
    symbol.className = 'prediction-symbol';
    symbol.textContent = prediction.symbol;
    
    const name = document.createElement('span');
    name.className = 'prediction-name';
    name.textContent = prediction.name;
    
    const sector = document.createElement('span');
    sector.className = 'prediction-sector';
    sector.textContent = prediction.sector;
    
    header.appendChild(symbol);
    header.appendChild(name);
    header.appendChild(sector);
    
    // Create prediction summary
    const summary = document.createElement('div');
    summary.className = 'prediction-summary';
    
    const direction = document.createElement('div');
    direction.className = `prediction-direction ${prediction.direction}`;
    direction.innerHTML = `<span class="direction-icon"></span><span class="direction-text">${prediction.direction.toUpperCase()}</span>`;
    
    const movement = document.createElement('div');
    movement.className = 'prediction-movement';
    movement.innerHTML = `<span class="movement-value">${prediction.movementPct > 0 ? '+' : ''}${prediction.movementPct}%</span>`;
    
    const confidence = document.createElement('div');
    confidence.className = `prediction-confidence ${prediction.confidenceLevel}`;
    confidence.innerHTML = `<span class="confidence-label">Confidence:</span><span class="confidence-value">${prediction.confidenceScore}%</span>`;
    
    summary.appendChild(direction);
    summary.appendChild(movement);
    summary.appendChild(confidence);
    
    // Create price info
    const priceInfo = document.createElement('div');
    priceInfo.className = 'prediction-price-info';
    
    const currentPrice = document.createElement('div');
    currentPrice.className = 'current-price';
    currentPrice.innerHTML = `<span class="price-label">Current:</span><span class="price-value">$${prediction.currentPrice.toFixed(2)}</span>`;
    
    const targetPrice = document.createElement('div');
    targetPrice.className = 'target-price';
    targetPrice.innerHTML = `<span class="price-label">Target:</span><span class="price-value">$${prediction.priceTarget.toFixed(2)}</span>`;
    
    const timeframe = document.createElement('div');
    timeframe.className = 'prediction-timeframe';
    timeframe.innerHTML = `<span class="timeframe-label">Timeframe:</span><span class="timeframe-value">${prediction.predictionHorizon}</span>`;
    
    priceInfo.appendChild(currentPrice);
    priceInfo.appendChild(targetPrice);
    priceInfo.appendChild(timeframe);
    
    // Create rationale summary
    const rationale = document.createElement('div');
    rationale.className = 'prediction-rationale-summary';
    rationale.textContent = prediction.rationale.summary.split('.')[0] + '.';
    
    // Create view details button
    const detailsButton = document.createElement('button');
    detailsButton.className = 'view-details-button';
    detailsButton.textContent = 'View Full Analysis';
    detailsButton.addEventListener('click', () => {
      if (typeof onViewDetails === 'function') {
        onViewDetails(prediction);
      }
    });
    
    // Assemble card
    card.appendChild(header);
    card.appendChild(summary);
    card.appendChild(priceInfo);
    card.appendChild(rationale);
    card.appendChild(detailsButton);
    
    return card;
  }
  
  /**
   * Renders a detailed prediction view for a specific stock
   * @param {Object} prediction - Stock prediction data
   * @param {Function} onClose - Callback for closing details
   * @returns {HTMLElement} - Detailed prediction element
   */
  static renderDetailedPrediction(prediction, onClose) {
    const container = document.createElement('div');
    container.className = 'detailed-prediction-container';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'detailed-prediction-header';
    
    const title = document.createElement('h2');
    title.textContent = `${prediction.name} (${prediction.symbol}) Prediction Analysis`;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
      if (typeof onClose === 'function') {
        onClose();
      }
    });
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    // Create summary section
    const summary = document.createElement('div');
    summary.className = 'prediction-summary-section';
    
    const summaryHeader = document.createElement('h3');
    summaryHeader.textContent = 'Prediction Summary';
    
    const summaryContent = document.createElement('div');
    summaryContent.className = 'summary-content';
    
    const directionSummary = document.createElement('div');
    directionSummary.className = `direction-summary ${prediction.direction}`;
    directionSummary.innerHTML = `
      <div class="direction-indicator ${prediction.direction}"></div>
      <div class="direction-details">
        <div class="direction-label">${prediction.direction.toUpperCase()}</div>
        <div class="movement-value">${prediction.movementPct > 0 ? '+' : ''}${prediction.movementPct}%</div>
        <div class="confidence-label ${prediction.confidenceLevel}">
          ${prediction.confidenceLevel.toUpperCase()} CONFIDENCE (${prediction.confidenceScore}%)
        </div>
      </div>
    `;
    
    const priceSummary = document.createElement('div');
    priceSummary.className = 'price-summary';
    priceSummary.innerHTML = `
      <div class="price-item">
        <div class="price-label">Current Price</div>
        <div class="price-value">$${prediction.currentPrice.toFixed(2)}</div>
      </div>
      <div class="price-item">
        <div class="price-label">Target Price</div>
        <div class="price-value">$${prediction.priceTarget.toFixed(2)}</div>
      </div>
      <div class="price-item">
        <div class="price-label">Timeframe</div>
        <div class="price-value">${prediction.predictionHorizon}</div>
      </div>
    `;
    
    summaryContent.appendChild(directionSummary);
    summaryContent.appendChild(priceSummary);
    
    summary.appendChild(summaryHeader);
    summary.appendChild(summaryContent);
    
    // Create rationale section
    const rationale = document.createElement('div');
    rationale.className = 'prediction-rationale-section';
    
    const rationaleHeader = document.createElement('h3');
    rationaleHeader.textContent = 'Prediction Rationale';
    
    const rationaleSummary = document.createElement('p');
    rationaleSummary.className = 'rationale-summary';
    rationaleSummary.textContent = prediction.rationale.summary;
    
    const primaryFactorsHeader = document.createElement('h4');
    primaryFactorsHeader.textContent = 'Primary Factors';
    
    const primaryFactorsList = document.createElement('ul');
    primaryFactorsList.className = 'primary-factors-list';
    
    prediction.rationale.primaryFactors.forEach(factor => {
      const factorItem = document.createElement('li');
      factorItem.textContent = factor;
      primaryFactorsList.appendChild(factorItem);
    });
    
    const additionalConsiderationsHeader = document.createElement('h4');
    additionalConsiderationsHeader.textContent = 'Additional Considerations';
    
    const additionalConsiderationsList = document.createElement('ul');
    additionalConsiderationsList.className = 'additional-considerations-list';
    
    prediction.rationale.additionalConsiderations.forEach(consideration => {
      const considerationItem = document.createElement('li');
      considerationItem.textContent = consideration;
      additionalConsiderationsList.appendChild(considerationItem);
    });
    
    const confidenceExplanation = document.createElement('p');
    confidenceExplanation.className = 'confidence-explanation';
    confidenceExplanation.textContent = prediction.rationale.confidenceExplanation;
    
    rationale.appendChild(rationaleHeader);
    rationale.appendChild(rationaleSummary);
    rationale.appendChild(primaryFactorsHeader);
    rationale.appendChild(primaryFactorsList);
    rationale.appendChild(additionalConsiderationsHeader);
    rationale.appendChild(additionalConsiderationsList);
    rationale.appendChild(confidenceExplanation);
    
    // Create factors section
    const factors = document.createElement('div');
    factors.className = 'prediction-factors-section';
    
    const factorsHeader = document.createElement('h3');
    factorsHeader.textContent = 'Prediction Factors';
    
    const factorsChart = document.createElement('div');
    factorsChart.className = 'factors-chart';
    factorsChart.id = `factors-chart-${prediction.symbol}`;
    
    const factorsList = document.createElement('div');
    factorsList.className = 'factors-list';
    
    // Create factor items
    Object.entries(prediction.factors).forEach(([factorName, factorData]) => {
      const factorItem = document.createElement('div');
      factorItem.className = 'factor-item';
      
      const factorHeader = document.createElement('div');
      factorHeader.className = 'factor-header';
      
      const factorName_formatted = factorName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      
      const factorTitle = document.createElement('h4');
      factorTitle.textContent = factorName_formatted;
      
      const factorScore = document.createElement('div');
      factorScore.className = 'factor-score';
      factorScore.innerHTML = `<span class="score-value">${factorData.score}</span><span class="score-max">/100</span>`;
      
      factorHeader.appendChild(factorTitle);
      factorHeader.appendChild(factorScore);
      
      const factorBar = document.createElement('div');
      factorBar.className = 'factor-bar';
      
      const factorBarFill = document.createElement('div');
      factorBarFill.className = 'factor-bar-fill';
      factorBarFill.style.width = `${factorData.score}%`;
      factorBarFill.style.backgroundColor = this.getFactorColor(factorData.score);
      
      factorBar.appendChild(factorBarFill);
      
      const factorDetails = document.createElement('div');
      factorDetails.className = 'factor-details';
      
      // Add specific details based on factor type
      switch (factorName) {
        case 'tariffSensitivity':
          factorDetails.innerHTML = `
            <div class="detail-item">US Revenue Exposure: ${factorData.usRevenueExposure}%</div>
            <div class="detail-item">China Revenue Exposure: ${factorData.chinaRevenueExposure}%</div>
            <div class="detail-item">Impact: ${factorData.impact.toUpperCase()}</div>
          `;
          break;
        case 'technicalIndicators':
          factorDetails.innerHTML = `
            <div class="detail-item">RSI: ${factorData.rsi.toFixed(1)}</div>
            <div class="detail-item">MACD: ${factorData.macd.toFixed(2)}</div>
            <div class="detail-item">Bollinger Position: ${factorData.bollingerPosition.toFixed(2)}</div>
            <div class="detail-item">Signal: ${factorData.signal.toUpperCase()}</div>
          `;
          break;
        case 'marketSentiment':
          factorDetails.innerHTML = `
            <div class="detail-item">News Sentiment: ${factorData.newsSentiment.toUpperCase()}</div>
            <div class="detail-item">Social Media Sentiment: ${factorData.socialMediaSentiment.toUpperCase()}</div>
            <div class="detail-item">Recent Price Action: ${factorData.recentPriceAction.toUpperCase()}</div>
          `;
          break;
        case 'sectorMomentum':
          factorDetails.innerHTML = `
            <div class="detail-item">Sector Trend: ${factorData.sectorTrend.toUpperCase()}</div>
            <div class="detail-item">Relative Strength: ${factorData.relativeStrength.toUpperCase()}</div>
            <div class="detail-item">Sector Rotation Phase: ${factorData.sectorRotationPhase.toUpperCase()}</div>
          `;
          break;
        case 'currencyImpact':
          factorDetails.innerHTML = `
            <div class="detail-item">AUD/USD Correlation: ${factorData.audUsdCorrelation.toUpperCase()}</div>
            <div class="detail-item">FX Amplification: ${factorData.fxAmplification.toUpperCase()}</div>
            <div class="detail-item">Currency Trend Alignment: ${factorData.currencyTrendAlignment.toUpperCase()}</div>
          `;
          break;
        case 'historicalPatterns':
          factorDetails.innerHTML = `
            <div class="detail-item">Similar Tariff Events: ${factorData.similarTariffEvents.toUpperCase()}</div>
            <div class="detail-item">Seasonal Patterns: ${factorData.seasonalPatterns.toUpperCase()}</div>
            <div class="detail-item">Volatility Regime: ${factorData.volatilityRegime.toUpperCase()}</div>
          `;
          break;
        default:
          factorDetails.innerHTML = `<div class="detail-item">Score: ${factorData.score}/100</div>`;
      }
      
      factorItem.appendChild(factorHeader);
      factorItem.appendChild(factorBar);
      factorItem.appendChild(factorDetails);
      
      factorsList.appendChild(factorItem);
    });
    
    factors.appendChild(factorsHeader);
    factors.appendChild(factorsChart);
    factors.appendChild(factorsList);
    
    // Create trading parameters section
    const tradingParams = document.createElement('div');
    tradingParams.className = 'trading-parameters-section';
    
    const tradingParamsHeader = document.createElement('h3');
    tradingParamsHeader.textContent = 'Trading Parameters';
    
    // Calculate suggested entry, stop loss, and take profit levels
    const entryPrice = prediction.currentPrice * 0.99;
    const stopLossPercent = prediction.direction === 'bullish' ? -5 : 5;
    const takeProfitPercent = prediction.direction === 'bullish' ? prediction.movementPct : -prediction.movementPct;
    
    const stopLossPrice = prediction.direction === 'bullish' 
      ? entryPrice * (1 + stopLossPercent / 100) 
      : entryPrice * (1 + stopLossPercent / 100);
      
    const takeProfitPrice = prediction.direction === 'bullish'
      ? entryPrice * (1 + takeProfitPercent / 100)
      : entryPrice * (1 + takeProfitPercent / 100);
      
    const riskRewardRatio = Math.abs(takeProfitPercent / stopLossPercent);
    
    const tradingParamsContent = document.createElement('div');
    tradingParamsContent.className = 'trading-params-content';
    tradingParamsContent.innerHTML = `
      <div class="params-grid">
        <div class="param-item">
          <div class="param-label">Entry Price</div>
          <div class="param-value">$${entryPrice.toFixed(2)}</div>
        </div>
        <div class="param-item">
          <div class="param-label">Stop Loss</div>
          <div class="param-value">$${stopLossPrice.toFixed(2)} (${stopLossPercent}%)</div>
        </div>
        <div class="param-item">
          <div class="param-label">Take Profit</div>
          <div class="param-value">$${takeProfitPrice.toFixed(2)} (${takeProfitPercent.toFixed(1)}%)</div>
        </div>
        <div class="param-item">
          <div class="param-label">Risk/Reward Ratio</div>
          <div class="param-value">${riskRewardRatio.toFixed(1)}</div>
        </div>
        <div class="param-item">
          <div class="param-label">Position Size</div>
          <div class="param-value">Calculated based on your risk settings</div>
        </div>
        <div class="param-item">
          <div class="param-label">Expected Return</div>
          <div class="param-value">${(takeProfitPercent * prediction.confidenceScore / 100).toFixed(1)}%</div>
        </div>
      </div>
    `;
    
    tradingParams.appendChild(tradingParamsHeader);
    tradingParams.appendChild(tradingParamsContent);
    
    // Assemble container
    container.appendChild(header);
    container.appendChild(summary);
    container.appendChild(rationale);
    container.appendChild(factors);
    container.appendChild(tradingParams);
    
    // Add script to render factors chart
    setTimeout(() => {
      this.renderFactorsChart(`factors-chart-${prediction.symbol}`, prediction);
    }, 100);
    
    return container;
  }
  
  /**
   * Renders a sector prediction card
   * @param {Object} sectorPrediction - Sector prediction data
   * @param {Function} onViewDetails - Callback for viewing details
   * @returns {HTMLElement} - Sector prediction card element
   */
  static renderSectorPredictionCard(sectorPrediction, onViewDetails) {
    const card = document.createElement('div');
    card.className = `sector-prediction-card ${sectorPrediction.direction}`;
    
    // Create header
    const header = document.createElement('div');
    header.className = 'sector-prediction-header';
    
    const sectorName = document.createElement('h3');
    sectorName.className = 'sector-name';
    sectorName.textContent = sectorPrediction.sector;
    
    header.appendChild(sectorName);
    
    // Create prediction summary
    const summary = document.createElement('div');
    summary.className = 'sector-prediction-summary';
    
    const direction = document.createElement('div');
    direction.className = `sector-direction ${sectorPrediction.direction}`;
    direction.innerHTML = `<span class="direction-icon"></span><span class="direction-text">${sectorPrediction.direction.toUpperCase()}</span>`;
    
    const movement = document.createElement('div');
    movement.className = 'sector-movement';
    movement.innerHTML = `<span class="movement-value">${sectorPrediction.avgMovementPct > 0 ? '+' : ''}${sectorPrediction.avgMovementPct}%</span>`;
    
    const confidence = document.createElement('div');
    confidence.className = 'sector-confidence';
    confidence.innerHTML = `<span class="confidence-label">Avg. Confidence:</span><span class="confidence-value">${sectorPrediction.avgConfidence}%</span>`;
    
    summary.appendChild(direction);
    summary.appendChild(movement);
    summary.appendChild(confidence);
    
    // Create stocks summary
    const stocksSummary = document.createElement('div');
    stocksSummary.className = 'sector-stocks-summary';
    
    const stocksCount = document.createElement('div');
    stocksCount.className = 'stocks-count';
    stocksCount.innerHTML = `<span class="count-label">Stocks:</span><span class="count-value">${sectorPrediction.stockCount}</span>`;
    
    const bullishCount = document.createElement('div');
    bullishCount.className = 'bullish-count';
    bullishCount.innerHTML = `<span class="count-label">Bullish:</span><span class="count-value">${sectorPrediction.bullishCount}</span>`;
    
    const bearishCount = document.createElement('div');
    bearishCount.className = 'bearish-count';
    bearishCount.innerHTML = `<span class="count-label">Bearish:</span><span class="count-value">${sectorPrediction.bearishCount}</span>`;
    
    stocksSummary.appendChild(stocksCount);
    stocksSummary.appendChild(bullishCount);
    stocksSummary.appendChild(bearishCount);
    
    // Create rationale summary
    const rationale = document.createElement('div');
    rationale.className = 'sector-rationale-summary';
    rationale.textContent = sectorPrediction.rationale.split('.')[0] + '.';
    
    // Create top picks section
    const topPicks = document.createElement('div');
    topPicks.className = 'sector-top-picks';
    
    const topPicksHeader = document.createElement('h4');
    topPicksHeader.textContent = 'Top Picks';
    
    const topPicksList = document.createElement('div');
    topPicksList.className = 'top-picks-list';
    
    // Add bullish picks
    if (sectorPrediction.topPicks.bullish.length > 0) {
      const bullishPicks = document.createElement('div');
      bullishPicks.className = 'bullish-picks';
      
      const bullishPicksHeader = document.createElement('h5');
      bullishPicksHeader.textContent = 'Bullish';
      
      const bullishPicksList = document.createElement('ul');
      
      sectorPrediction.topPicks.bullish.forEach(pick => {
        const pickItem = document.createElement('li');
        pickItem.innerHTML = `<span class="pick-symbol">${pick.symbol}</span> <span class="pick-movement">${pick.movementPct > 0 ? '+' : ''}${pick.movementPct}%</span>`;
        bullishPicksList.appendChild(pickItem);
      });
      
      bullishPicks.appendChild(bullishPicksHeader);
      bullishPicks.appendChild(bullishPicksList);
      
      topPicksList.appendChild(bullishPicks);
    }
    
    // Add bearish picks
    if (sectorPrediction.topPicks.bearish.length > 0) {
      const bearishPicks = document.createElement('div');
      bearishPicks.className = 'bearish-picks';
      
      const bearishPicksHeader = document.createElement('h5');
      bearishPicksHeader.textContent = 'Bearish';
      
      const bearishPicksList = document.createElement('ul');
      
      sectorPrediction.topPicks.bearish.forEach(pick => {
        const pickItem = document.createElement('li');
        pickItem.innerHTML = `<span class="pick-symbol">${pick.symbol}</span> <span class="pick-movement">${pick.movementPct > 0 ? '+' : ''}${pick.movementPct}%</span>`;
        bearishPicksList.appendChild(pickItem);
      });
      
      bearishPicks.appendChild(bearishPicksHeader);
      bearishPicks.appendChild(bearishPicksList);
      
      topPicksList.appendChild(bearishPicks);
    }
    
    topPicks.appendChild(topPicksHeader);
    topPicks.appendChild(topPicksList);
    
    // Create view details button
    const detailsButton = document.createElement('button');
    detailsButton.className = 'view-details-button';
    detailsButton.textContent = 'View Sector Analysis';
    detailsButton.addEventListener('click', () => {
      if (typeof onViewDetails === 'function') {
        onViewDetails(sectorPrediction);
      }
    });
    
    // Assemble card
    card.appendChild(header);
    card.appendChild(summary);
    card.appendChild(stocksSummary);
    card.appendChild(rationale);
    card.appendChild(topPicks);
    card.appendChild(detailsButton);
    
    return card;
  }
  
  /**
   * Renders a detailed sector prediction view
   * @param {Object} sectorPrediction - Sector prediction data
   * @param {Function} onClose - Callback for closing details
   * @returns {HTMLElement} - Detailed sector prediction element
   */
  static renderDetailedSectorPrediction(sectorPrediction, onClose) {
    const container = document.createElement('div');
    container.className = 'detailed-sector-prediction-container';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'detailed-sector-prediction-header';
    
    const title = document.createElement('h2');
    title.textContent = `${sectorPrediction.sector} Sector Prediction Analysis`;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
      if (typeof onClose === 'function') {
        onClose();
      }
    });
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    // Create summary section
    const summary = document.createElement('div');
    summary.className = 'sector-summary-section';
    
    const summaryHeader = document.createElement('h3');
    summaryHeader.textContent = 'Sector Summary';
    
    const summaryContent = document.createElement('div');
    summaryContent.className = 'sector-summary-content';
    
    const directionSummary = document.createElement('div');
    directionSummary.className = `sector-direction-summary ${sectorPrediction.direction}`;
    directionSummary.innerHTML = `
      <div class="direction-indicator ${sectorPrediction.direction}"></div>
      <div class="direction-details">
        <div class="direction-label">${sectorPrediction.direction.toUpperCase()}</div>
        <div class="movement-value">${sectorPrediction.avgMovementPct > 0 ? '+' : ''}${sectorPrediction.avgMovementPct}%</div>
        <div class="confidence-label">
          CONFIDENCE: ${sectorPrediction.avgConfidence}%
        </div>
      </div>
    `;
    
    const stocksSummary = document.createElement('div');
    stocksSummary.className = 'stocks-summary';
    stocksSummary.innerHTML = `
      <div class="stocks-item">
        <div class="stocks-label">Total Stocks</div>
        <div class="stocks-value">${sectorPrediction.stockCount}</div>
      </div>
      <div class="stocks-item">
        <div class="stocks-label">Bullish</div>
        <div class="stocks-value">${sectorPrediction.bullishCount}</div>
      </div>
      <div class="stocks-item">
        <div class="stocks-label">Bearish</div>
        <div class="stocks-value">${sectorPrediction.bearishCount}</div>
      </div>
      <div class="stocks-item">
        <div class="stocks-label">Timeframe</div>
        <div class="stocks-value">${sectorPrediction.predictionHorizon}</div>
      </div>
    `;
    
    summaryContent.appendChild(directionSummary);
    summaryContent.appendChild(stocksSummary);
    
    summary.appendChild(summaryHeader);
    summary.appendChild(summaryContent);
    
    // Create rationale section
    const rationale = document.createElement('div');
    rationale.className = 'sector-rationale-section';
    
    const rationaleHeader = document.createElement('h3');
    rationaleHeader.textContent = 'Sector Rationale';
    
    const rationaleParagraph = document.createElement('p');
    rationaleParagraph.className = 'sector-rationale-paragraph';
    rationaleParagraph.textContent = sectorPrediction.rationale;
    
    rationale.appendChild(rationaleHeader);
    rationale.appendChild(rationaleParagraph);
    
    // Create top picks section
    const topPicks = document.createElement('div');
    topPicks.className = 'sector-top-picks-section';
    
    const topPicksHeader = document.createElement('h3');
    topPicksHeader.textContent = 'Top Stock Picks';
    
    const topPicksContent = document.createElement('div');
    topPicksContent.className = 'top-picks-content';
    
    // Add bullish picks
    if (sectorPrediction.topPicks.bullish.length > 0) {
      const bullishPicks = document.createElement('div');
      bullishPicks.className = 'bullish-picks-detailed';
      
      const bullishPicksHeader = document.createElement('h4');
      bullishPicksHeader.textContent = 'Bullish Opportunities';
      
      const bullishPicksTable = document.createElement('table');
      bullishPicksTable.className = 'picks-table';
      
      const bullishTableHead = document.createElement('thead');
      bullishTableHead.innerHTML = `
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Movement</th>
        </tr>
      `;
      
      const bullishTableBody = document.createElement('tbody');
      
      sectorPrediction.topPicks.bullish.forEach(pick => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${pick.symbol}</td>
          <td>${pick.name}</td>
          <td class="movement bullish">${pick.movementPct > 0 ? '+' : ''}${pick.movementPct}%</td>
        `;
        bullishTableBody.appendChild(row);
      });
      
      bullishPicksTable.appendChild(bullishTableHead);
      bullishPicksTable.appendChild(bullishTableBody);
      
      bullishPicks.appendChild(bullishPicksHeader);
      bullishPicks.appendChild(bullishPicksTable);
      
      topPicksContent.appendChild(bullishPicks);
    }
    
    // Add bearish picks
    if (sectorPrediction.topPicks.bearish.length > 0) {
      const bearishPicks = document.createElement('div');
      bearishPicks.className = 'bearish-picks-detailed';
      
      const bearishPicksHeader = document.createElement('h4');
      bearishPicksHeader.textContent = 'Bearish Opportunities';
      
      const bearishPicksTable = document.createElement('table');
      bearishPicksTable.className = 'picks-table';
      
      const bearishTableHead = document.createElement('thead');
      bearishTableHead.innerHTML = `
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Movement</th>
        </tr>
      `;
      
      const bearishTableBody = document.createElement('tbody');
      
      sectorPrediction.topPicks.bearish.forEach(pick => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${pick.symbol}</td>
          <td>${pick.name}</td>
          <td class="movement bearish">${pick.movementPct > 0 ? '+' : ''}${pick.movementPct}%</td>
        `;
        bearishTableBody.appendChild(row);
      });
      
      bearishPicksTable.appendChild(bearishTableHead);
      bearishPicksTable.appendChild(bearishTableBody);
      
      bearishPicks.appendChild(bearishPicksHeader);
      bearishPicks.appendChild(bearishPicksTable);
      
      topPicksContent.appendChild(bearishPicks);
    }
    
    topPicks.appendChild(topPicksHeader);
    topPicks.appendChild(topPicksContent);
    
    // Create sector chart section
    const sectorChart = document.createElement('div');
    sectorChart.className = 'sector-chart-section';
    
    const sectorChartHeader = document.createElement('h3');
    sectorChartHeader.textContent = 'Sector Performance Chart';
    
    const sectorChartContainer = document.createElement('div');
    sectorChartContainer.className = 'sector-chart-container';
    sectorChartContainer.id = `sector-chart-${sectorPrediction.sector.replace(/\s+/g, '-').toLowerCase()}`;
    
    sectorChart.appendChild(sectorChartHeader);
    sectorChart.appendChild(sectorChartContainer);
    
    // Assemble container
    container.appendChild(header);
    container.appendChild(summary);
    container.appendChild(rationale);
    container.appendChild(topPicks);
    container.appendChild(sectorChart);
    
    // Add script to render sector chart
    setTimeout(() => {
      this.renderSectorChart(`sector-chart-${sectorPrediction.sector.replace(/\s+/g, '-').toLowerCase()}`, sectorPrediction);
    }, 100);
    
    return container;
  }
  
  /**
   * Renders a factors chart for a stock prediction
   * @param {string} containerId - ID of the container element
   * @param {Object} prediction - Stock prediction data
   */
  static renderFactorsChart(containerId, prediction) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = 300;
    container.appendChild(canvas);
    
    // In a real implementation, this would use Chart.js or D3.js
    // For demonstration, we'll create a simple SVG chart
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', container.clientWidth);
    svg.setAttribute('height', 300);
    container.appendChild(svg);
    
    const factors = Object.entries(prediction.factors);
    const factorCount = factors.length;
    const barWidth = (container.clientWidth - 100) / factorCount;
    const maxBarHeight = 220;
    
    // Create bars
    factors.forEach(([factorName, factorData], index) => {
      const barHeight = (factorData.score / 100) * maxBarHeight;
      const x = 50 + index * barWidth;
      const y = 250 - barHeight;
      
      const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bar.setAttribute('x', x);
      bar.setAttribute('y', y);
      bar.setAttribute('width', barWidth - 10);
      bar.setAttribute('height', barHeight);
      bar.setAttribute('fill', this.getFactorColor(factorData.score));
      
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', x + (barWidth - 10) / 2);
      label.setAttribute('y', 270);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('font-size', '12px');
      label.textContent = factorName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).split(' ')[0];
      
      const score = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      score.setAttribute('x', x + (barWidth - 10) / 2);
      score.setAttribute('y', y - 5);
      score.setAttribute('text-anchor', 'middle');
      score.setAttribute('font-size', '12px');
      score.setAttribute('font-weight', 'bold');
      score.textContent = factorData.score;
      
      svg.appendChild(bar);
      svg.appendChild(label);
      svg.appendChild(score);
    });
    
    // Add title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', container.clientWidth / 2);
    title.setAttribute('y', 30);
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('font-size', '16px');
    title.setAttribute('font-weight', 'bold');
    title.textContent = 'Factor Contribution Scores';
    
    svg.appendChild(title);
  }
  
  /**
   * Renders a sector chart for a sector prediction
   * @param {string} containerId - ID of the container element
   * @param {Object} sectorPrediction - Sector prediction data
   */
  static renderSectorChart(containerId, sectorPrediction) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = 300;
    container.appendChild(canvas);
    
    // In a real implementation, this would use Chart.js or D3.js
    // For demonstration, we'll create a simple SVG chart
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', container.clientWidth);
    svg.setAttribute('height', 300);
    container.appendChild(svg);
    
    // Create a simple line chart showing sector performance
    const width = container.clientWidth - 80;
    const height = 220;
    const startX = 40;
    const startY = 250;
    
    // Generate some mock data points
    const dataPoints = [];
    const pointCount = 30;
    
    let value = 100;
    for (let i = 0; i < pointCount; i++) {
      // Add some randomness to create a realistic chart
      const change = (Math.random() - 0.5) * 2;
      
      // Add trend based on sector direction
      const trend = sectorPrediction.direction === 'bullish' ? 0.2 : -0.2;
      
      value += change + trend;
      dataPoints.push(value);
    }
    
    // Find min and max values
    const minValue = Math.min(...dataPoints) * 0.95;
    const maxValue = Math.max(...dataPoints) * 1.05;
    const valueRange = maxValue - minValue;
    
    // Create x and y axes
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', startX);
    xAxis.setAttribute('y1', startY);
    xAxis.setAttribute('x2', startX + width);
    xAxis.setAttribute('y2', startY);
    xAxis.setAttribute('stroke', '#333');
    xAxis.setAttribute('stroke-width', '1');
    
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', startX);
    yAxis.setAttribute('y1', startY);
    yAxis.setAttribute('x2', startX);
    yAxis.setAttribute('y2', startY - height);
    yAxis.setAttribute('stroke', '#333');
    yAxis.setAttribute('stroke-width', '1');
    
    svg.appendChild(xAxis);
    svg.appendChild(yAxis);
    
    // Create y-axis labels
    for (let i = 0; i <= 4; i++) {
      const y = startY - (i * height / 4);
      const value = minValue + (i * valueRange / 4);
      
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', startX - 5);
      label.setAttribute('y', y + 5);
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('font-size', '12px');
      label.textContent = value.toFixed(1);
      
      const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tick.setAttribute('x1', startX - 3);
      tick.setAttribute('y1', y);
      tick.setAttribute('x2', startX);
      tick.setAttribute('y2', y);
      tick.setAttribute('stroke', '#333');
      tick.setAttribute('stroke-width', '1');
      
      svg.appendChild(label);
      svg.appendChild(tick);
    }
    
    // Create x-axis labels
    for (let i = 0; i <= 5; i++) {
      const x = startX + (i * width / 5);
      const day = i * 6;
      
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', x);
      label.setAttribute('y', startY + 20);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('font-size', '12px');
      label.textContent = `Day ${day}`;
      
      const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tick.setAttribute('x1', x);
      tick.setAttribute('y1', startY);
      tick.setAttribute('x2', x);
      tick.setAttribute('y2', startY + 3);
      tick.setAttribute('stroke', '#333');
      tick.setAttribute('stroke-width', '1');
      
      svg.appendChild(label);
      svg.appendChild(tick);
    }
    
    // Create line path
    let pathData = `M ${startX} ${startY - ((dataPoints[0] - minValue) / valueRange) * height}`;
    
    for (let i = 1; i < dataPoints.length; i++) {
      const x = startX + (i * width / (pointCount - 1));
      const y = startY - ((dataPoints[i] - minValue) / valueRange) * height;
      pathData += ` L ${x} ${y}`;
    }
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', sectorPrediction.direction === 'bullish' ? '#28a745' : '#dc3545');
    path.setAttribute('stroke-width', '2');
    
    svg.appendChild(path);
    
    // Add title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', container.clientWidth / 2);
    title.setAttribute('y', 30);
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('font-size', '16px');
    title.setAttribute('font-weight', 'bold');
    title.textContent = `${sectorPrediction.sector} Sector Performance Trend`;
    
    svg.appendChild(title);
    
    // Add prediction line
    const lastX = startX + width;
    const lastY = startY - ((dataPoints[dataPoints.length - 1] - minValue) / valueRange) * height;
    
    const futureValue = dataPoints[dataPoints.length - 1] * (1 + sectorPrediction.avgMovementPct / 100);
    const futureY = startY - ((futureValue - minValue) / valueRange) * height;
    
    const predictionLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    predictionLine.setAttribute('x1', lastX);
    predictionLine.setAttribute('y1', lastY);
    predictionLine.setAttribute('x2', lastX + 50);
    predictionLine.setAttribute('y2', futureY);
    predictionLine.setAttribute('stroke', sectorPrediction.direction === 'bullish' ? '#28a745' : '#dc3545');
    predictionLine.setAttribute('stroke-width', '2');
    predictionLine.setAttribute('stroke-dasharray', '5,5');
    
    svg.appendChild(predictionLine);
    
    // Add prediction label
    const predictionLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    predictionLabel.setAttribute('x', lastX + 55);
    predictionLabel.setAttribute('y', futureY + 5);
    predictionLabel.setAttribute('font-size', '12px');
    predictionLabel.setAttribute('font-weight', 'bold');
    predictionLabel.setAttribute('fill', sectorPrediction.direction === 'bullish' ? '#28a745' : '#dc3545');
    predictionLabel.textContent = `${sectorPrediction.avgMovementPct > 0 ? '+' : ''}${sectorPrediction.avgMovementPct}%`;
    
    svg.appendChild(predictionLabel);
  }
  
  /**
   * Get color based on factor score
   * @param {number} score - Factor score (0-100)
   * @returns {string} - Color in hex format
   */
  static getFactorColor(score) {
    if (score >= 80) return '#28a745'; // Strong positive - green
    if (score >= 60) return '#5cb85c'; // Positive - light green
    if (score >= 40) return '#ffc107'; // Neutral - yellow
    if (score >= 20) return '#f0ad4e'; // Negative - orange
    return '#dc3545'; // Strong negative - red
  }
}

export default StockPredictionComponents;
