/**
 * Dynamic Chart Renderer for Trump Tariff Analysis Website
 * 
 * This script replaces static image references with dynamically rendered charts
 * using the AdvancedVisualizationTools library.
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing dynamic chart renderer...');
  
  // Import the AdvancedVisualizationTools class
  import('./advancedVisualizationTools.js')
    .then(module => {
      const AdvancedVisualizationTools = module.default;
      const visualizationTools = new AdvancedVisualizationTools();
      
      // Replace static images with dynamic charts
      replaceStaticImagesWithCharts(visualizationTools);
    })
    .catch(error => {
      console.error('Error loading AdvancedVisualizationTools:', error);
    });
});

/**
 * Replace static image references with dynamically rendered charts
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 */
function replaceStaticImagesWithCharts(visualizationTools) {
  // Find all chart containers with static images
  const chartContainers = document.querySelectorAll('.chart-container');
  
  chartContainers.forEach(container => {
    const img = container.querySelector('img');
    if (!img) return;
    
    const chartId = generateChartId();
    const chartType = determineChartType(img.alt, img.src);
    
    // Create canvas element to replace the image
    const canvas = document.createElement('canvas');
    canvas.id = chartId;
    canvas.className = 'dynamic-chart';
    canvas.style.width = '100%';
    canvas.style.height = '300px';
    
    // Replace image with canvas
    img.replaceWith(canvas);
    
    // Render appropriate chart based on the image alt text or src
    renderChart(visualizationTools, chartId, chartType);
  });
}

/**
 * Generate a unique chart ID
 * @returns {string} Unique chart ID
 */
function generateChartId() {
  return 'chart-' + Math.random().toString(36).substring(2, 15);
}

/**
 * Determine chart type based on image alt text or src
 * @param {string} altText - Image alt text
 * @param {string} src - Image source
 * @returns {string} Chart type
 */
function determineChartType(altText, src) {
  const altLower = altText.toLowerCase();
  const srcLower = src.toLowerCase();
  
  if (altLower.includes('market indices') || srcLower.includes('market_indices_comparison')) {
    return 'marketIndices';
  } else if (altLower.includes('sector performance') || srcLower.includes('sector_performance')) {
    return 'sectorPerformance';
  } else if (altLower.includes('exchange rate') || srcLower.includes('audusd_exchange_rate')) {
    return 'exchangeRate';
  } else if (altLower.includes('top opportunities') || srcLower.includes('top_opportunities')) {
    return 'topOpportunities';
  } else if (altLower.includes('chart') && (altLower.includes('min') || altLower.includes('bhp') || altLower.includes('fmg'))) {
    return 'stockChart';
  } else if (altLower.includes('sector') && altLower.includes('asx')) {
    return 'asxSectorPerformance';
  } else if (altLower.includes('currency impact') || srcLower.includes('asx_fx_amplification')) {
    return 'currencyImpact';
  } else if (altLower.includes('supply chain') || srcLower.includes('supply_chain')) {
    return 'supplyChain';
  } else if (altLower.includes('volatility') || srcLower.includes('volatility')) {
    return 'volatility';
  } else if (altLower.includes('tariff impact') || srcLower.includes('tariff_impact')) {
    return 'tariffImpact';
  } else if ((altLower.includes('au') && altLower.includes('us')) || srcLower.includes('au_vs_us')) {
    return 'auVsUs';
  } else if (altLower.includes('alert') || srcLower.includes('alert_summary')) {
    return 'alertSummary';
  } else {
    return 'generic';
  }
}

/**
 * Render appropriate chart based on chart type
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 * @param {string} chartType - Chart type
 */
function renderChart(visualizationTools, chartId, chartType) {
  console.log(`Rendering chart: ${chartType} with ID: ${chartId}`);
  
  switch (chartType) {
    case 'marketIndices':
      renderMarketIndicesChart(visualizationTools, chartId);
      break;
    case 'sectorPerformance':
      renderSectorPerformanceChart(visualizationTools, chartId);
      break;
    case 'exchangeRate':
      renderExchangeRateChart(visualizationTools, chartId);
      break;
    case 'topOpportunities':
      renderTopOpportunitiesChart(visualizationTools, chartId);
      break;
    case 'stockChart':
      renderStockChart(visualizationTools, chartId);
      break;
    case 'asxSectorPerformance':
      renderASXSectorPerformanceChart(visualizationTools, chartId);
      break;
    case 'currencyImpact':
      renderCurrencyImpactChart(visualizationTools, chartId);
      break;
    case 'supplyChain':
      renderSupplyChainChart(visualizationTools, chartId);
      break;
    case 'volatility':
      renderVolatilityChart(visualizationTools, chartId);
      break;
    case 'tariffImpact':
      renderTariffImpactChart(visualizationTools, chartId);
      break;
    case 'auVsUs':
      renderAUvsUSChart(visualizationTools, chartId);
      break;
    case 'alertSummary':
      renderAlertSummaryChart(visualizationTools, chartId);
      break;
    default:
      renderGenericChart(visualizationTools, chartId);
      break;
  }
}

/**
 * Render Market Indices Comparison chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderMarketIndicesChart(visualizationTools, chartId) {
  // Generate sample data for market indices comparison
  const today = new Date();
  const dates = [];
  const asx200Data = [];
  const sp500Data = [];
  const hangSengData = [];
  
  // Generate 30 days of data
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
    
    // Generate realistic looking data with some correlation
    const baseChange = (Math.random() - 0.5) * 2; // Base change for correlation
    asx200Data.push(7000 + Math.floor(Math.random() * 500) + (baseChange * 100));
    sp500Data.push(4500 + Math.floor(Math.random() * 400) + (baseChange * 150));
    hangSengData.push(18000 + Math.floor(Math.random() * 1000) + (baseChange * 200));
  }
  
  const data = {
    series: [
      {
        name: 'ASX 200',
        data: dates.map((date, index) => ({ date, value: asx200Data[index] }))
      },
      {
        name: 'S&P 500',
        data: dates.map((date, index) => ({ date, value: sp500Data[index] }))
      },
      {
        name: 'Hang Seng',
        data: dates.map((date, index) => ({ date, value: hangSengData[index] }))
      }
    ]
  };
  
  const options = {
    colors: ['#2c7be5', '#00d97e', '#e63757'],
    title: 'Market Indices Comparison',
    timeUnit: 'day',
    fill: false
  };
  
  visualizationTools.createComparisonChart(chartId, data, options);
}

/**
 * Render Sector Performance chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderSectorPerformanceChart(visualizationTools, chartId) {
  // Sample data for sector performance
  const sectors = ['Materials', 'Energy', 'Financials', 'Healthcare', 'Technology', 'Consumer', 'Utilities', 'Telecom'];
  const performance = [4.2, -1.8, 2.5, 3.1, 5.2, -0.8, 1.2, 0.5];
  
  // Create canvas element
  const canvas = document.getElementById(chartId);
  const ctx = canvas.getContext('2d');
  
  // Create chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sectors,
      datasets: [{
        label: 'Performance (%)',
        data: performance,
        backgroundColor: performance.map(value => value >= 0 ? '#28a745' : '#dc3545'),
        borderColor: performance.map(value => value >= 0 ? '#28a745' : '#dc3545'),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Sector Performance',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Performance (%)'
          }
        }
      }
    }
  });
}

/**
 * Render Exchange Rate chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderExchangeRateChart(visualizationTools, chartId) {
  // Generate sample data for AUD/USD exchange rate
  const today = new Date();
  const dates = [];
  const rates = [];
  
  // Generate 30 days of data
  let rate = 0.65; // Starting rate
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
    
    // Generate realistic looking data with some trend
    rate += (Math.random() - 0.5) * 0.005;
    rate = Math.max(0.62, Math.min(0.68, rate)); // Keep within realistic bounds
    rates.push(rate);
  }
  
  const data = {
    symbol: 'AUD/USD',
    prices: dates.map((date, index) => ({
      date,
      close: rates[index]
    }))
  };
  
  const options = {
    title: 'AUD/USD Exchange Rate',
    timeUnit: 'day'
  };
  
  visualizationTools.createPriceChart(chartId, data, options);
}

/**
 * Render Top Opportunities chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderTopOpportunitiesChart(visualizationTools, chartId) {
  // Sample data for top opportunities
  const stocks = ['MIN.AX', 'BHP.AX', 'FMG.AX', 'TWE.AX', 'S32.AX'];
  const scores = [87.5, 82.3, 79.6, 76.8, 75.2];
  const movements = [15.2, 12.8, 14.5, 11.2, 10.5];
  
  // Create canvas element
  const canvas = document.getElementById(chartId);
  const ctx = canvas.getContext('2d');
  
  // Create chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: stocks,
      datasets: [
        {
          label: 'Composite Score',
          data: scores,
          backgroundColor: '#2c7be5',
          borderColor: '#2c7be5',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: 'Expected Movement (%)',
          data: movements,
          backgroundColor: '#00d97e',
          borderColor: '#00d97e',
          borderWidth: 1,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Top Trading Opportunities',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              if (context.dataset.label === 'Expected Movement (%)') {
                return `${context.dataset.label}: ${context.parsed.y}%`;
              }
              return `${context.dataset.label}: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Composite Score'
          },
          min: 0,
          max: 100
        },
        y1: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Expected Movement (%)'
          },
          min: 0,
          max: 20,
          grid: {
            drawOnChartArea: false
          }
        }
      }
    }
  });
}

/**
 * Render Stock Chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderStockChart(visualizationTools, chartId) {
  // Generate sample data for stock chart
  const today = new Date();
  const dates = [];
  const prices = [];
  const volumes = [];
  
  // Generate 60 days of data
  let price = 65.0; // Starting price for MIN.AX
  for (let i = 60; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
    
    // Generate realistic looking price data
    price += (Math.random() - 0.48) * 1.2; // Slight upward bias
    price = Math.max(55, Math.min(75, price)); // Keep within realistic bounds
    prices.push(price);
    
    // Generate volume data
    const volume = Math.floor(Math.random() * 1000000) + 500000;
    volumes.push(volume);
  }
  
  const data = {
    symbol: 'MIN.AX',
    prices: dates.map((date, index) => ({
      date,
      close: prices[index],
      volume: volumes[index]
    }))
  };
  
  const options = {
    title: 'MIN.AX Stock Price',
    timeUnit: 'day'
  };
  
  visualizationTools.createPriceChart(chartId, data, options);
}

/**
 * Render ASX Sector Performance chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderASXSectorPerformanceChart(visualizationTools, chartId) {
  // Sample data for ASX sector performance
  const sectors = ['Materials', 'Energy', 'Financials', 'Healthcare', 'Technology', 'Consumer', 'Utilities', 'Telecom', 'Real Estate', 'Industrials'];
  const tariffImpact = [4.5, 3.2, 1.8, 1.2, 2.5, 3.8, 0.8, 1.0, 1.5, 2.2];
  const performance = [5.2, 3.8, 2.0, 1.5, 3.0, 4.2, 1.0, 1.2, 1.8, 2.5];
  
  // Create canvas element
  const canvas = document.getElementById(chartId);
  const ctx = canvas.getContext('2d');
  
  // Create chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sectors,
      datasets: [
        {
          label: 'Tariff Impact Score',
          data: tariffImpact,
          backgroundColor: '#2c7be5',
          borderColor: '#2c7be5',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: 'Performance (%)',
          data: performance,
          backgroundColor: '#00d97e',
          borderColor: '#00d97e',
          borderWidth: 1,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'ASX Sector Performance & Tariff Impact',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              if (context.dataset.label === 'Performance (%)') {
                return `${context.dataset.label}: ${context.parsed.y}%`;
              }
              return `${context.dataset.label}: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Tariff Impact Score'
          },
          min: 0,
          max: 5
        },
        y1: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Performance (%)'
          },
          min: 0,
          max: 6,
          grid: {
            drawOnChartArea: false
          }
        }
      }
    }
  });
}

/**
 * Render Currency Impact chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderCurrencyImpactChart(visualizationTools, chartId) {
  // Sample data for currency impact
  const stocks = ['BHP.AX', 'FMG.AX', 'MIN.AX', 'RIO.AX', 'TWE.AX', 'S32.AX', 'NCM.AX', 'WPL.AX'];
  const fxSensitivity = [0.85, 0.92, 0.78, 0.88, 0.95, 0.82, 0.65, 0.75];
  const tariffImpact = [4.2, 4.5, 4.0, 3.8, 4.8, 3.5, 2.8, 3.2];
  
  // Create canvas element
  const canvas = document.getElementById(chartId);
  const ctx = canvas.getContext('2d');
  
  // Create chart
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Stocks',
        data: stocks.map((stock, index) => ({
          x: fxSensitivity[index],
          y: tariffImpact[index],
          stock: stock
        })),
        backgroundColor: '#2c7be5',
        pointRadius: 8,
        pointHoverRadius: 12
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Currency Impact vs Tariff Impact',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const stock = context.raw.stock;
              return `${stock} - FX Sensitivity: ${context.parsed.x.toFixed(2)}, Tariff Impact: ${context.parsed.y.toFixed(1)}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'FX Sensitivity'
          },
          min: 0.5,
          max: 1.0
        },
        y: {
          title: {
            display: true,
            text: 'Tariff Impact Score'
          },
          min: 2.5,
          max: 5.0
        }
      }
    }
  });
}

/**
 * Render Supply Chain chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderSupplyChainChart(visualizationTools, chartId) {
  // Sample data for supply chain visualization
  const companies = ['BHP.AX', 'FMG.AX', 'MIN.AX', 'RIO.AX', 'TWE.AX', 'S32.AX'];
  const usExposure = [25, 15, 18, 22, 35, 20];
  const chinaExposure = [45, 65, 60, 50, 40, 55];
  const otherExposure = [30, 20, 22, 28, 25, 25];
  
  // Create canvas element
  const canvas = document.getElementById(chartId);
  const ctx = canvas.getContext('2d');
  
  // Create chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: companies,
      datasets: [
        {
          label: 'US Exposure (%)',
          data: usExposure,
          backgroundColor: '#2c7be5',
          borderColor: '#2c7be5',
          borderWidth: 1
        },
        {
          label: 'China Exposure (%)',
          data: chinaExposure,
          backgroundColor: '#e63757',
          borderColor: '#e63757',
          borderWidth: 1
        },
        {
          label: 'Other Markets (%)',
          data: otherExposure,
          backgroundColor: '#00d97e',
          borderColor: '#00d97e',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Supply Chain Exposure',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Companies'
          }
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Exposure (%)'
          },
          min: 0,
          max: 100
        }
      }
    }
  });
}

/**
 * Render Volatility chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderVolatilityChart(visualizationTools, chartId) {
  // Sample data for volatility analysis
  const stocks = ['BHP.AX', 'FMG.AX', 'MIN.AX', 'RIO.AX', 'TWE.AX', 'S32.AX', 'NCM.AX', 'WPL.AX'];
  const volatility = [22.5, 28.3, 32.1, 24.8, 26.5, 29.2, 18.7, 20.4];
  const beta = [1.2, 1.5, 1.8, 1.3, 1.4, 1.6, 0.8, 1.1];
  
  // Create canvas element
  const canvas = document.getElementById(chartId);
  const ctx = canvas.getContext('2d');
  
  // Create chart
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Stocks',
        data: stocks.map((stock, index) => ({
          x: beta[index],
          y: volatility[index],
          stock: stock
        })),
        backgroundColor: stocks.map((_, index) => {
          // Color based on volatility
          if (volatility[index] > 30) return '#e63757'; // High volatility
          if (volatility[index] > 25) return '#f6c343'; // Medium volatility
          return '#00d97e'; // Low volatility
        }),
        pointRadius: 8,
        pointHoverRadius: 12
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Volatility vs Beta',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const stock = context.raw.stock;
              return `${stock} - Beta: ${context.parsed.x.toFixed(1)}, Volatility: ${context.parsed.y.toFixed(1)}%`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Beta'
          },
          min: 0.5,
          max: 2.0
        },
        y: {
          title: {
            display: true,
            text: 'Annualized Volatility (%)'
          },
          min: 15,
          max: 35
        }
      }
    }
  });
}

/**
 * Render Tariff Impact chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderTariffImpactChart(visualizationTools, chartId) {
  // Sample data for tariff impact scores
  const stocks = ['MIN.AX', 'BHP.AX', 'FMG.AX', 'TWE.AX', 'S32.AX', 'RIO.AX', 'NCM.AX', 'WPL.AX'];
  const directImpact = [4.2, 3.8, 4.0, 4.5, 3.5, 3.7, 2.5, 3.0];
  const indirectImpact = [3.8, 3.5, 3.7, 4.2, 3.2, 3.4, 2.2, 2.8];
  const fxImpact = [3.5, 3.2, 3.4, 3.8, 3.0, 3.1, 2.0, 2.5];
  
  // Create canvas element
  const canvas = document.getElementById(chartId);
  const ctx = canvas.getContext('2d');
  
  // Create chart
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: stocks,
      datasets: [
        {
          label: 'Direct Tariff Impact',
          data: directImpact,
          backgroundColor: 'rgba(44, 123, 229, 0.2)',
          borderColor: '#2c7be5',
          borderWidth: 2,
          pointBackgroundColor: '#2c7be5',
          pointRadius: 4
        },
        {
          label: 'Indirect Supply Chain Impact',
          data: indirectImpact,
          backgroundColor: 'rgba(230, 55, 87, 0.2)',
          borderColor: '#e63757',
          borderWidth: 2,
          pointBackgroundColor: '#e63757',
          pointRadius: 4
        },
        {
          label: 'FX Amplification Impact',
          data: fxImpact,
          backgroundColor: 'rgba(0, 217, 126, 0.2)',
          borderColor: '#00d97e',
          borderWidth: 2,
          pointBackgroundColor: '#00d97e',
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Tariff Impact Scores',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      },
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 5
        }
      }
    }
  });
}

/**
 * Render AU vs US Performance chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderAUvsUSChart(visualizationTools, chartId) {
  // Generate sample data for AU vs US performance
  const today = new Date();
  const dates = [];
  const asxData = [];
  const spxData = [];
  
  // Generate 30 days of data
  let asxIndex = 7000;
  let spxIndex = 4500;
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
    
    // Generate realistic looking data with some correlation
    const baseChange = (Math.random() - 0.48) * 0.01; // Base change for correlation with slight upward bias
    asxIndex *= (1 + baseChange + (Math.random() - 0.5) * 0.005);
    spxIndex *= (1 + baseChange + (Math.random() - 0.5) * 0.005);
    
    asxData.push(asxIndex);
    spxData.push(spxIndex);
  }
  
  // Normalize data to starting point = 100 for comparison
  const asxNormalized = asxData.map(value => (value / asxData[0]) * 100);
  const spxNormalized = spxData.map(value => (value / spxData[0]) * 100);
  
  const data = {
    series: [
      {
        name: 'ASX 200',
        data: dates.map((date, index) => ({ date, value: asxNormalized[index] }))
      },
      {
        name: 'S&P 500',
        data: dates.map((date, index) => ({ date, value: spxNormalized[index] }))
      }
    ]
  };
  
  const options = {
    colors: ['#2c7be5', '#e63757'],
    title: 'AU vs US Performance (Normalized)',
    timeUnit: 'day',
    fill: false
  };
  
  visualizationTools.createComparisonChart(chartId, data, options);
}

/**
 * Render Alert Summary chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderAlertSummaryChart(visualizationTools, chartId) {
  // Sample data for alert summary
  const categories = ['Price Alerts', 'Technical Alerts', 'Tariff News', 'Market Movements', 'Earnings'];
  const highPriority = [5, 3, 2, 4, 1];
  const mediumPriority = [8, 6, 4, 5, 3];
  const lowPriority = [12, 8, 6, 7, 5];
  
  // Create canvas element
  const canvas = document.getElementById(chartId);
  const ctx = canvas.getContext('2d');
  
  // Create chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'High Priority',
          data: highPriority,
          backgroundColor: '#e63757',
          borderColor: '#e63757',
          borderWidth: 1
        },
        {
          label: 'Medium Priority',
          data: mediumPriority,
          backgroundColor: '#f6c343',
          borderColor: '#f6c343',
          borderWidth: 1
        },
        {
          label: 'Low Priority',
          data: lowPriority,
          backgroundColor: '#00d97e',
          borderColor: '#00d97e',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Alert Summary',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Alert Categories'
          }
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Number of Alerts'
          }
        }
      }
    }
  });
}

/**
 * Render Generic chart
 * @param {Object} visualizationTools - Instance of AdvancedVisualizationTools
 * @param {string} chartId - Chart ID
 */
function renderGenericChart(visualizationTools, chartId) {
  // Create canvas element
  const canvas = document.getElementById(chartId);
  const ctx = canvas.getContext('2d');
  
  // Create a simple line chart
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Data Series',
        data: [12, 19, 3, 5, 2, 3, 15, 8, 10, 7, 12, 9],
        backgroundColor: 'rgba(44, 123, 229, 0.2)',
        borderColor: '#2c7be5',
        borderWidth: 2,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Chart Data',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      }
    }
  });
}
