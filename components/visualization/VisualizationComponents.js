/**
 * Visualization Components for Trump Tariff Analysis Website
 * 
 * This module provides React components for advanced visualizations including:
 * - Interactive charts with drill-down capabilities
 * - Heat maps for cross-market analysis
 * - Correlation matrices for identifying relationships between stocks
 * - Custom visualization parameters for personalized analysis
 */

import AdvancedVisualizationTools from '../scripts/advancedVisualizationTools.js';

class VisualizationComponents {
  constructor() {
    this.visualizationTools = new AdvancedVisualizationTools();
    this.chartInstances = {};
  }
  
  /**
   * Render a market correlation matrix
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Correlation data
   * @param {Object} options - Visualization options
   */
  renderMarketCorrelationMatrix(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'visualization-controls';
    
    // Create correlation type selector
    const correlationTypeSelector = document.createElement('select');
    correlationTypeSelector.className = 'correlation-type-selector';
    correlationTypeSelector.innerHTML = `
      <option value="price">Price Correlation</option>
      <option value="returns">Returns Correlation</option>
      <option value="tariff_sensitivity">Tariff Sensitivity Correlation</option>
    `;
    
    // Create time period selector
    const timePeriodSelector = document.createElement('select');
    timePeriodSelector.className = 'time-period-selector';
    timePeriodSelector.innerHTML = `
      <option value="1m">1 Month</option>
      <option value="3m" selected>3 Months</option>
      <option value="6m">6 Months</option>
      <option value="1y">1 Year</option>
    `;
    
    // Create minimum correlation filter
    const minCorrelationFilter = document.createElement('div');
    minCorrelationFilter.className = 'min-correlation-filter';
    minCorrelationFilter.innerHTML = `
      <label>Min Correlation: <span class="min-correlation-value">0.5</span></label>
      <input type="range" min="0" max="1" step="0.1" value="0.5" class="min-correlation-slider">
    `;
    
    // Add event listeners
    correlationTypeSelector.addEventListener('change', () => {
      this._updateCorrelationMatrix(containerId, data, {
        ...options,
        correlationType: correlationTypeSelector.value,
        timePeriod: timePeriodSelector.value,
        minCorrelation: parseFloat(minCorrelationFilter.querySelector('.min-correlation-slider').value)
      });
    });
    
    timePeriodSelector.addEventListener('change', () => {
      this._updateCorrelationMatrix(containerId, data, {
        ...options,
        correlationType: correlationTypeSelector.value,
        timePeriod: timePeriodSelector.value,
        minCorrelation: parseFloat(minCorrelationFilter.querySelector('.min-correlation-slider').value)
      });
    });
    
    minCorrelationFilter.querySelector('.min-correlation-slider').addEventListener('input', (e) => {
      minCorrelationFilter.querySelector('.min-correlation-value').textContent = e.target.value;
      this._updateCorrelationMatrix(containerId, data, {
        ...options,
        correlationType: correlationTypeSelector.value,
        timePeriod: timePeriodSelector.value,
        minCorrelation: parseFloat(e.target.value)
      });
    });
    
    // Add controls to container
    controlsContainer.appendChild(document.createTextNode('Correlation Type: '));
    controlsContainer.appendChild(correlationTypeSelector);
    controlsContainer.appendChild(document.createTextNode(' Time Period: '));
    controlsContainer.appendChild(timePeriodSelector);
    controlsContainer.appendChild(minCorrelationFilter);
    
    // Create visualization container
    const visualizationContainer = document.createElement('div');
    visualizationContainer.className = 'visualization-container';
    visualizationContainer.id = `${containerId}-visualization`;
    
    // Clear container and add new elements
    container.innerHTML = '';
    container.appendChild(controlsContainer);
    container.appendChild(visualizationContainer);
    
    // Render initial correlation matrix
    this._updateCorrelationMatrix(containerId, data, {
      ...options,
      correlationType: correlationTypeSelector.value,
      timePeriod: timePeriodSelector.value,
      minCorrelation: parseFloat(minCorrelationFilter.querySelector('.min-correlation-slider').value)
    });
  }
  
  /**
   * Update correlation matrix with new options
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Correlation data
   * @param {Object} options - Visualization options
   * @private
   */
  _updateCorrelationMatrix(containerId, data, options) {
    const visualizationContainer = document.getElementById(`${containerId}-visualization`);
    if (!visualizationContainer) return;
    
    // Filter correlations based on minimum value
    const filteredData = this._filterCorrelationData(data, options);
    
    // Render correlation matrix
    this.visualizationTools.createCorrelationMatrix(
      `${containerId}-visualization`,
      filteredData,
      {
        title: `${this._formatCorrelationType(options.correlationType)} - ${this._formatTimePeriod(options.timePeriod)}`,
        showValues: true,
        showLegend: true
      }
    );
  }
  
  /**
   * Filter correlation data based on options
   * @param {Object} data - Correlation data
   * @param {Object} options - Filter options
   * @returns {Object} Filtered correlation data
   * @private
   */
  _filterCorrelationData(data, options) {
    // In a real implementation, this would filter the data based on the options
    // For demonstration, we'll simulate filtered data
    
    // Get correlation data for the selected type and time period
    const correlationData = data[options.correlationType] && data[options.correlationType][options.timePeriod]
      ? data[options.correlationType][options.timePeriod]
      : data;
    
    // Filter correlations based on minimum value
    const filteredCorrelations = correlationData.correlations.filter(
      c => Math.abs(c.value) >= options.minCorrelation
    );
    
    return {
      labels: correlationData.labels,
      correlations: filteredCorrelations
    };
  }
  
  /**
   * Format correlation type for display
   * @param {string} correlationType - Correlation type
   * @returns {string} Formatted correlation type
   * @private
   */
  _formatCorrelationType(correlationType) {
    switch (correlationType) {
      case 'price':
        return 'Price Correlation';
      case 'returns':
        return 'Returns Correlation';
      case 'tariff_sensitivity':
        return 'Tariff Sensitivity Correlation';
      default:
        return correlationType;
    }
  }
  
  /**
   * Format time period for display
   * @param {string} timePeriod - Time period
   * @returns {string} Formatted time period
   * @private
   */
  _formatTimePeriod(timePeriod) {
    switch (timePeriod) {
      case '1m':
        return '1 Month';
      case '3m':
        return '3 Months';
      case '6m':
        return '6 Months';
      case '1y':
        return '1 Year';
      default:
        return timePeriod;
    }
  }
  
  /**
   * Render a sector heat map
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Heat map data
   * @param {Object} options - Visualization options
   */
  renderSectorHeatMap(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'visualization-controls';
    
    // Create metric selector
    const metricSelector = document.createElement('select');
    metricSelector.className = 'metric-selector';
    metricSelector.innerHTML = `
      <option value="performance">Performance</option>
      <option value="tariff_impact">Tariff Impact</option>
      <option value="volatility">Volatility</option>
      <option value="volume">Trading Volume</option>
    `;
    
    // Create time period selector
    const timePeriodSelector = document.createElement('select');
    timePeriodSelector.className = 'time-period-selector';
    timePeriodSelector.innerHTML = `
      <option value="1w">1 Week</option>
      <option value="1m">1 Month</option>
      <option value="3m" selected>3 Months</option>
      <option value="ytd">Year to Date</option>
    `;
    
    // Create color scheme selector
    const colorSchemeSelector = document.createElement('select');
    colorSchemeSelector.className = 'color-scheme-selector';
    colorSchemeSelector.innerHTML = `
      <option value="YlOrRd">Yellow-Orange-Red</option>
      <option value="YlGnBu">Yellow-Green-Blue</option>
      <option value="RdBu">Red-Blue</option>
      <option value="Spectral">Spectral</option>
    `;
    
    // Add event listeners
    metricSelector.addEventListener('change', () => {
      this._updateSectorHeatMap(containerId, data, {
        ...options,
        metric: metricSelector.value,
        timePeriod: timePeriodSelector.value,
        colorScheme: colorSchemeSelector.value
      });
    });
    
    timePeriodSelector.addEventListener('change', () => {
      this._updateSectorHeatMap(containerId, data, {
        ...options,
        metric: metricSelector.value,
        timePeriod: timePeriodSelector.value,
        colorScheme: colorSchemeSelector.value
      });
    });
    
    colorSchemeSelector.addEventListener('change', () => {
      this._updateSectorHeatMap(containerId, data, {
        ...options,
        metric: metricSelector.value,
        timePeriod: timePeriodSelector.value,
        colorScheme: colorSchemeSelector.value
      });
    });
    
    // Add controls to container
    controlsContainer.appendChild(document.createTextNode('Metric: '));
    controlsContainer.appendChild(metricSelector);
    controlsContainer.appendChild(document.createTextNode(' Time Period: '));
    controlsContainer.appendChild(timePeriodSelector);
    controlsContainer.appendChild(document.createTextNode(' Color Scheme: '));
    controlsContainer.appendChild(colorSchemeSelector);
    
    // Create visualization container
    const visualizationContainer = document.createElement('div');
    visualizationContainer.className = 'visualization-container';
    visualizationContainer.id = `${containerId}-visualization`;
    
    // Clear container and add new elements
    container.innerHTML = '';
    container.appendChild(controlsContainer);
    container.appendChild(visualizationContainer);
    
    // Render initial heat map
    this._updateSectorHeatMap(containerId, data, {
      ...options,
      metric: metricSelector.value,
      timePeriod: timePeriodSelector.value,
      colorScheme: colorSchemeSelector.value
    });
  }
  
  /**
   * Update sector heat map with new options
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Heat map data
   * @param {Object} options - Visualization options
   * @private
   */
  _updateSectorHeatMap(containerId, data, options) {
    const visualizationContainer = document.getElementById(`${containerId}-visualization`);
    if (!visualizationContainer) return;
    
    // Get heat map data for the selected metric and time period
    const heatMapData = this._getHeatMapData(data, options);
    
    // Render heat map
    this.visualizationTools.createHeatMap(
      `${containerId}-visualization`,
      heatMapData,
      {
        title: `${this._formatMetric(options.metric)} by Sector - ${this._formatTimePeriod(options.timePeriod)}`,
        colorInterpolator: this._getColorInterpolator(options.colorScheme),
        showValues: true,
        showLegend: true,
        xTitle: 'Sectors',
        yTitle: 'Companies',
        valueFormat: options.metric === 'performance' ? '+.1%' : '.1f'
      }
    );
  }
  
  /**
   * Get heat map data for the selected metric and time period
   * @param {Object} data - Heat map data
   * @param {Object} options - Filter options
   * @returns {Object} Heat map data
   * @private
   */
  _getHeatMapData(data, options) {
    // In a real implementation, this would get the data for the selected metric and time period
    // For demonstration, we'll simulate heat map data
    
    return data[options.metric] && data[options.metric][options.timePeriod]
      ? data[options.metric][options.timePeriod]
      : data;
  }
  
  /**
   * Format metric for display
   * @param {string} metric - Metric
   * @returns {string} Formatted metric
   * @private
   */
  _formatMetric(metric) {
    switch (metric) {
      case 'performance':
        return 'Performance';
      case 'tariff_impact':
        return 'Tariff Impact';
      case 'volatility':
        return 'Volatility';
      case 'volume':
        return 'Trading Volume';
      default:
        return metric;
    }
  }
  
  /**
   * Get color interpolator for the selected color scheme
   * @param {string} colorScheme - Color scheme
   * @returns {Function} Color interpolator
   * @private
   */
  _getColorInterpolator(colorScheme) {
    switch (colorScheme) {
      case 'YlOrRd':
        return d3.interpolateYlOrRd;
      case 'YlGnBu':
        return d3.interpolateYlGnBu;
      case 'RdBu':
        return d3.interpolateRdBu;
      case 'Spectral':
        return d3.interpolateSpectral;
      default:
        return d3.interpolateYlOrRd;
    }
  }
  
  /**
   * Render an interactive price chart
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Chart data
   * @param {Object} options - Chart options
   */
  renderInteractivePriceChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'visualization-controls';
    
    // Create time period selector
    const timePeriodSelector = document.createElement('select');
    timePeriodSelector.className = 'time-period-selector';
    timePeriodSelector.innerHTML = `
      <option value="1m">1 Month</option>
      <option value="3m" selected>3 Months</option>
      <option value="6m">6 Months</option>
      <option value="1y">1 Year</option>
      <option value="ytd">Year to Date</option>
    `;
    
    // Create chart type selector
    const chartTypeSelector = document.createElement('select');
    chartTypeSelector.className = 'chart-type-selector';
    chartTypeSelector.innerHTML = `
      <option value="line">Line Chart</option>
      <option value="candlestick">Candlestick Chart</option>
    `;
    
    // Create indicator selector
    const indicatorSelector = document.createElement('select');
    indicatorSelector.className = 'indicator-selector';
    indicatorSelector.innerHTML = `
      <option value="none">No Indicator</option>
      <option value="sma">Simple Moving Average</option>
      <option value="ema">Exponential Moving Average</option>
      <option value="bollinger">Bollinger Bands</option>
      <option value="rsi">RSI</option>
    `;
    
    // Create comparison selector
    const comparisonSelector = document.createElement('select');
    comparisonSelector.className = 'comparison-selector';
    comparisonSelector.innerHTML = `
      <option value="none">No Comparison</option>
      <option value="sector">Sector Average</option>
      <option value="index">ASX 200</option>
      <option value="sp500">S&P 500</option>
    `;
    
    // Add event listeners
    timePeriodSelector.addEventListener('change', () => {
      this._updatePriceChart(containerId, data, {
        ...options,
        timePeriod: timePeriodSelector.value,
        chartType: chartTypeSelector.value,
        indicator: indicatorSelector.value,
        comparison: comparisonSelector.value
      });
    });
    
    chartTypeSelector.addEventListener('change', () => {
      this._updatePriceChart(containerId, data, {
        ...options,
        timePeriod: timePeriodSelector.value,
        chartType: chartTypeSelector.value,
        indicator: indicatorSelector.value,
        comparison: comparisonSelector.value
      });
    });
    
    indicatorSelector.addEventListener('change', () => {
      this._updatePriceChart(containerId, data, {
        ...options,
        timePeriod: timePeriodSelector.value,
        chartType: chartTypeSelector.value,
        indicator: indicatorSelector.value,
        comparison: comparisonSelector.value
      });
    });
    
    comparisonSelector.addEventListener('change', () => {
      this._updatePriceChart(containerId, data, {
        ...options,
        timePeriod: timePeriodSelector.value,
        chartType: chartTypeSelector.value,
        indicator: indicatorSelector.value,
        comparison: comparisonSelector.value
      });
    });
    
    // Add controls to container
    controlsContainer.appendChild(document.createTextNode('Time Period: '));
    controlsContainer.appendChild(timePeriodSelector);
    controlsContainer.appendChild(document.createTextNode(' Chart Type: '));
    controlsContainer.appendChild(chartTypeSelector);
    controlsContainer.appendChild(document.createTextNode(' Indicator: '));
    controlsContainer.appendChild(indicatorSelector);
    controlsContainer.appendChild(document.createTextNode(' Compare With: '));
    controlsContainer.appendChild(comparisonSelector);
    
    // Create visualization container
    const visualizationContainer = document.createElement('div');
    visualizationContainer.className = 'visualization-container';
    visualizationContainer.id = `${containerId}-visualization`;
    
    // Clear container and add new elements
    container.innerHTML = '';
    container.appendChild(controlsContainer);
    container.appendChild(visualizationContainer);
    
    // Render initial price chart
    this._updatePriceChart(containerId, data, {
      ...options,
      timePeriod: timePeriodSelector.value,
      chartType: chartTypeSelector.value,
      indicator: indicatorSelector.value,
      comparison: comparisonSelector.value
    });
  }
  
  /**
   * Update price chart with new options
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Chart data
   * @param {Object} options - Chart options
   * @private
   */
  _updatePriceChart(containerId, data, options) {
    const visualizationContainer = document.getElementById(`${containerId}-visualization`);
    if (!visualizationContainer) return;
    
    // Get chart data for the selected time period
    const chartData = this._getChartData(data, options);
    
    // Destroy existing chart if it exists
    if (this.chartInstances[containerId]) {
      this.chartInstances[containerId].destroy();
      delete this.chartInstances[containerId];
    }
    
    // Render chart based on chart type
    if (options.chartType === 'candlestick') {
      this.visualizationTools.createCandlestickChart(
        `${containerId}-visualization`,
        chartData,
        {
          title: `${data.symbol} - ${this._formatTimePeriod(options.timePeriod)}`,
          showVolume: true
        }
      );
    } else {
      // Create price chart
      this.chartInstances[containerId] = this.visualizationTools.createPriceChart(
        `${containerId}-visualization`,
        chartData,
        {
          title: `${data.symbol} - ${this._formatTimePeriod(options.timePeriod)}`,
          timeUnit: this._getTimeUnit(options.timePeriod)
        }
      );
    }
  }
  
  /**
   * Get chart data for the selected time period
   * @param {Object} data - Chart data
   * @param {Object} options - Filter options
   * @returns {Object} Chart data
   * @private
   */
  _getChartData(data, options) {
    // In a real implementation, this would get the data for the selected time period
    // For demonstration, we'll return the original data
    
    return data[options.timePeriod] ? data[options.timePeriod] : data;
  }
  
  /**
   * Get time unit for the selected time period
   * @param {string} timePeriod - Time period
   * @returns {string} Time unit
   * @private
   */
  _getTimeUnit(timePeriod) {
    switch (timePeriod) {
      case '1w':
        return 'day';
      case '1m':
        return 'day';
      case '3m':
        return 'week';
      case '6m':
        return 'week';
      case '1y':
        return 'month';
      case 'ytd':
        return 'month';
      default:
        return 'day';
    }
  }
  
  /**
   * Render a multi-factor analysis radar chart
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Radar chart data
   * @param {Object} options - Chart options
   */
  renderMultiFactorRadarChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'visualization-controls';
    
    // Create stock selector
    const stockSelector = document.createElement('select');
    stockSelector.className = 'stock-selector';
    stockSelector.innerHTML = `
      <option value="all">All Selected Stocks</option>
    `;
    
    // Add stock options
    if (data.datasets) {
      data.datasets.forEach((dataset, index) => {
        stockSelector.innerHTML += `<option value="${index}">${dataset.label}</option>`;
      });
    }
    
    // Create factor set selector
    const factorSetSelector = document.createElement('select');
    factorSetSelector.className = 'factor-set-selector';
    factorSetSelector.innerHTML = `
      <option value="tariff">Tariff Factors</option>
      <option value="technical">Technical Factors</option>
      <option value="fundamental">Fundamental Factors</option>
      <option value="custom">Custom Factor Set</option>
    `;
    
    // Add event listeners
    stockSelector.addEventListener('change', () => {
      this._updateRadarChart(containerId, data, {
        ...options,
        selectedStock: stockSelector.value,
        factorSet: factorSetSelector.value
      });
    });
    
    factorSetSelector.addEventListener('change', () => {
      this._updateRadarChart(containerId, data, {
        ...options,
        selectedStock: stockSelector.value,
        factorSet: factorSetSelector.value
      });
    });
    
    // Add controls to container
    controlsContainer.appendChild(document.createTextNode('Stock: '));
    controlsContainer.appendChild(stockSelector);
    controlsContainer.appendChild(document.createTextNode(' Factor Set: '));
    controlsContainer.appendChild(factorSetSelector);
    
    // Create visualization container
    const visualizationContainer = document.createElement('div');
    visualizationContainer.className = 'visualization-container';
    visualizationContainer.id = `${containerId}-visualization`;
    
    // Clear container and add new elements
    container.innerHTML = '';
    container.appendChild(controlsContainer);
    container.appendChild(visualizationContainer);
    
    // Render initial radar chart
    this._updateRadarChart(containerId, data, {
      ...options,
      selectedStock: stockSelector.value,
      factorSet: factorSetSelector.value
    });
  }
  
  /**
   * Update radar chart with new options
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Radar chart data
   * @param {Object} options - Chart options
   * @private
   */
  _updateRadarChart(containerId, data, options) {
    const visualizationContainer = document.getElementById(`${containerId}-visualization`);
    if (!visualizationContainer) return;
    
    // Get radar chart data for the selected stock and factor set
    const radarData = this._getRadarChartData(data, options);
    
    // Destroy existing chart if it exists
    if (this.chartInstances[containerId]) {
      this.chartInstances[containerId].destroy();
      delete this.chartInstances[containerId];
    }
    
    // Create radar chart
    this.chartInstances[containerId] = this.visualizationTools.createRadarChart(
      `${containerId}-visualization`,
      radarData,
      {
        title: `${this._formatFactorSet(options.factorSet)} Analysis`,
        minValue: 0,
        maxValue: 100,
        stepSize: 20
      }
    );
  }
  
  /**
   * Get radar chart data for the selected stock and factor set
   * @param {Object} data - Radar chart data
   * @param {Object} options - Filter options
   * @returns {Object} Radar chart data
   * @private
   */
  _getRadarChartData(data, options) {
    // In a real implementation, this would filter the data based on the options
    // For demonstration, we'll return filtered data
    
    // Get factor set data
    const factorSetData = data[options.factorSet] ? data[options.factorSet] : data;
    
    // Filter datasets based on selected stock
    let datasets = factorSetData.datasets;
    if (options.selectedStock !== 'all' && !isNaN(parseInt(options.selectedStock))) {
      const stockIndex = parseInt(options.selectedStock);
      if (datasets[stockIndex]) {
        datasets = [datasets[stockIndex]];
      }
    }
    
    return {
      labels: factorSetData.labels,
      datasets: datasets
    };
  }
  
  /**
   * Format factor set for display
   * @param {string} factorSet - Factor set
   * @returns {string} Formatted factor set
   * @private
   */
  _formatFactorSet(factorSet) {
    switch (factorSet) {
      case 'tariff':
        return 'Tariff Factors';
      case 'technical':
        return 'Technical Factors';
      case 'fundamental':
        return 'Fundamental Factors';
      case 'custom':
        return 'Custom Factor Set';
      default:
        return factorSet;
    }
  }
  
  /**
   * Render a bubble chart for risk-reward analysis
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Bubble chart data
   * @param {Object} options - Chart options
   */
  renderRiskRewardBubbleChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'visualization-controls';
    
    // Create sector filter
    const sectorFilter = document.createElement('select');
    sectorFilter.className = 'sector-filter';
    sectorFilter.innerHTML = `
      <option value="all">All Sectors</option>
      <option value="Materials">Materials</option>
      <option value="Consumer Staples">Consumer Staples</option>
      <option value="Healthcare">Healthcare</option>
      <option value="Financials">Financials</option>
      <option value="Information Technology">Information Technology</option>
      <option value="Industrials">Industrials</option>
      <option value="Utilities">Utilities</option>
      <option value="Energy">Energy</option>
    `;
    
    // Create x-axis metric selector
    const xAxisSelector = document.createElement('select');
    xAxisSelector.className = 'x-axis-selector';
    xAxisSelector.innerHTML = `
      <option value="volatility">Volatility</option>
      <option value="beta">Beta</option>
      <option value="tariff_sensitivity">Tariff Sensitivity</option>
    `;
    
    // Create y-axis metric selector
    const yAxisSelector = document.createElement('select');
    yAxisSelector.className = 'y-axis-selector';
    yAxisSelector.innerHTML = `
      <option value="expected_return">Expected Return</option>
      <option value="momentum">Momentum</option>
      <option value="growth">Growth</option>
    `;
    
    // Create bubble size metric selector
    const sizeSelector = document.createElement('select');
    sizeSelector.className = 'size-selector';
    sizeSelector.innerHTML = `
      <option value="market_cap">Market Cap</option>
      <option value="volume">Trading Volume</option>
      <option value="liquidity">Liquidity</option>
    `;
    
    // Add event listeners
    sectorFilter.addEventListener('change', () => {
      this._updateBubbleChart(containerId, data, {
        ...options,
        sector: sectorFilter.value,
        xAxis: xAxisSelector.value,
        yAxis: yAxisSelector.value,
        size: sizeSelector.value
      });
    });
    
    xAxisSelector.addEventListener('change', () => {
      this._updateBubbleChart(containerId, data, {
        ...options,
        sector: sectorFilter.value,
        xAxis: xAxisSelector.value,
        yAxis: yAxisSelector.value,
        size: sizeSelector.value
      });
    });
    
    yAxisSelector.addEventListener('change', () => {
      this._updateBubbleChart(containerId, data, {
        ...options,
        sector: sectorFilter.value,
        xAxis: xAxisSelector.value,
        yAxis: yAxisSelector.value,
        size: sizeSelector.value
      });
    });
    
    sizeSelector.addEventListener('change', () => {
      this._updateBubbleChart(containerId, data, {
        ...options,
        sector: sectorFilter.value,
        xAxis: xAxisSelector.value,
        yAxis: yAxisSelector.value,
        size: sizeSelector.value
      });
    });
    
    // Add controls to container
    controlsContainer.appendChild(document.createTextNode('Sector: '));
    controlsContainer.appendChild(sectorFilter);
    controlsContainer.appendChild(document.createTextNode(' X-Axis: '));
    controlsContainer.appendChild(xAxisSelector);
    controlsContainer.appendChild(document.createTextNode(' Y-Axis: '));
    controlsContainer.appendChild(yAxisSelector);
    controlsContainer.appendChild(document.createTextNode(' Bubble Size: '));
    controlsContainer.appendChild(sizeSelector);
    
    // Create visualization container
    const visualizationContainer = document.createElement('div');
    visualizationContainer.className = 'visualization-container';
    visualizationContainer.id = `${containerId}-visualization`;
    
    // Clear container and add new elements
    container.innerHTML = '';
    container.appendChild(controlsContainer);
    container.appendChild(visualizationContainer);
    
    // Render initial bubble chart
    this._updateBubbleChart(containerId, data, {
      ...options,
      sector: sectorFilter.value,
      xAxis: xAxisSelector.value,
      yAxis: yAxisSelector.value,
      size: sizeSelector.value
    });
  }
  
  /**
   * Update bubble chart with new options
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Bubble chart data
   * @param {Object} options - Chart options
   * @private
   */
  _updateBubbleChart(containerId, data, options) {
    const visualizationContainer = document.getElementById(`${containerId}-visualization`);
    if (!visualizationContainer) return;
    
    // Get bubble chart data for the selected options
    const bubbleData = this._getBubbleChartData(data, options);
    
    // Destroy existing chart if it exists
    if (this.chartInstances[containerId]) {
      this.chartInstances[containerId].destroy();
      delete this.chartInstances[containerId];
    }
    
    // Create bubble chart
    this.chartInstances[containerId] = this.visualizationTools.createBubbleChart(
      `${containerId}-visualization`,
      bubbleData,
      {
        title: 'Risk-Reward Analysis',
        xAxisTitle: this._formatMetric(options.xAxis),
        yAxisTitle: this._formatMetric(options.yAxis),
        rAxisTitle: this._formatMetric(options.size)
      }
    );
  }
  
  /**
   * Get bubble chart data for the selected options
   * @param {Object} data - Bubble chart data
   * @param {Object} options - Filter options
   * @returns {Object} Bubble chart data
   * @private
   */
  _getBubbleChartData(data, options) {
    // In a real implementation, this would filter and transform the data based on the options
    // For demonstration, we'll return filtered data
    
    // Get data for the selected metrics
    const metricData = data[options.xAxis] && data[options.xAxis][options.yAxis] && data[options.xAxis][options.yAxis][options.size]
      ? data[options.xAxis][options.yAxis][options.size]
      : data;
    
    // Filter by sector if not "all"
    if (options.sector !== 'all') {
      metricData.datasets = metricData.datasets.filter(dataset => dataset.sector === options.sector);
    }
    
    return metricData;
  }
}

export default VisualizationComponents;
