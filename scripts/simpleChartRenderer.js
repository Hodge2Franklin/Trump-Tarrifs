/**
 * Simple Chart Renderer for Trump Tariff Analysis Website
 * 
 * This script provides a simplified approach to chart rendering
 * that addresses the issues with the previous implementation.
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing simple chart renderer...');
  
  // Load required Chart.js plugins
  loadChartJsPlugins();
  
  // Initialize all charts
  setTimeout(() => {
    initializeAllCharts();
  }, 500); // Small delay to ensure DOM is fully loaded
});

/**
 * Load required Chart.js plugins
 */
function loadChartJsPlugins() {
  // Add date adapter for Chart.js
  const dateAdapterScript = document.createElement('script');
  dateAdapterScript.src = 'https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3.0.0/dist/chartjs-adapter-date-fns.bundle.min.js';
  document.head.appendChild(dateAdapterScript);
  
  console.log('Chart.js plugins loaded');
}

/**
 * Initialize all charts on the page
 */
function initializeAllCharts() {
  // Market indices charts - now fully separated
  renderASX200Chart();
  renderSP500Chart();
  renderHangSengChart();
  
  // Sector performance chart
  renderSectorPerformanceChart();
  
  // Exchange rate chart
  renderExchangeRateChart();
  
  // Top opportunities chart
  renderTopOpportunitiesChart();
  
  // Stock detail chart (if present)
  const stockDetailChart = document.getElementById('stock-detail-chart');
  if (stockDetailChart) {
    renderStockDetailChart(stockDetailChart);
  }
  
  // Additional charts
  renderAdditionalCharts();
  
  console.log('All charts initialized');
}

/**
 * Render ASX 200 chart (separate chart)
 */
function renderASX200Chart() {
  const chartElement = document.getElementById('market-indices-chart');
  if (!chartElement) return;
  
  // Generate sample data with extended history (additional month)
  const labels = [];
  const asx200Data = [];
  
  const today = new Date();
  // Extended to 74 days (44 + 30 more days)
  for (let i = 74; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    labels.push(date.toISOString().split('T')[0]);
    
    // Generate realistic looking data
    asx200Data.push(7200 + Math.random() * 500);
  }
  
  // Create chart
  new Chart(chartElement, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'ASX 200',
          data: asx200Data,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.1,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false
        },
        title: {
          display: true,
          text: 'ASX 200 Performance'
        }
      },
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Index Value'
          }
        }
      }
    }
  });
  
  console.log('ASX 200 chart rendered separately');
}

/**
 * Render S&P 500 chart (separate chart)
 */
function renderSP500Chart() {
  // Create a new container for the S&P 500 chart
  const marketOverviewSection = document.querySelector('.market-overview');
  if (!marketOverviewSection) return;
  
  // Check if the sp500-chart-container already exists
  let sp500Container = document.getElementById('sp500-chart-container');
  
  if (!sp500Container) {
    // Create new container if it doesn't exist
    sp500Container = document.createElement('div');
    sp500Container.id = 'sp500-chart-container';
    sp500Container.className = 'chart-container';
    
    // Create canvas for the chart
    const sp500Canvas = document.createElement('canvas');
    sp500Canvas.id = 'sp500-chart';
    sp500Container.appendChild(sp500Canvas);
    
    // Insert after the ASX 200 chart
    const mainChartContainer = marketOverviewSection.querySelector('.chart-container');
    if (mainChartContainer) {
      mainChartContainer.parentNode.insertBefore(sp500Container, mainChartContainer.nextSibling);
    } else {
      marketOverviewSection.appendChild(sp500Container);
    }
  }
  
  // Generate sample data with extended history (additional month)
  const labels = [];
  const sp500Data = [];
  
  const today = new Date();
  // Extended to 74 days (44 + 30 more days)
  for (let i = 74; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    labels.push(date.toISOString().split('T')[0]);
    
    // Generate realistic looking data
    sp500Data.push(4800 + Math.random() * 200);
  }
  
  // Create chart
  new Chart(document.getElementById('sp500-chart'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'S&P 500',
          data: sp500Data,
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.1,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false
        },
        title: {
          display: true,
          text: 'S&P 500 Performance'
        }
      },
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Index Value'
          }
        }
      }
    }
  });
  
  console.log('S&P 500 chart rendered separately');
}

/**
 * Render Hang Seng chart (separate chart)
 */
function renderHangSengChart() {
  // Create a new container for the Hang Seng chart
  const marketOverviewSection = document.querySelector('.market-overview');
  if (!marketOverviewSection) return;
  
  // Check if the hang-seng-chart-container already exists
  let hangSengContainer = document.getElementById('hang-seng-chart-container');
  
  if (!hangSengContainer) {
    // Create new container if it doesn't exist
    hangSengContainer = document.createElement('div');
    hangSengContainer.id = 'hang-seng-chart-container';
    hangSengContainer.className = 'chart-container';
    
    // Create canvas for the chart
    const hangSengCanvas = document.createElement('canvas');
    hangSengCanvas.id = 'hang-seng-chart';
    hangSengContainer.appendChild(hangSengCanvas);
    
    // Insert after the S&P 500 chart
    const sp500Container = document.getElementById('sp500-chart-container');
    if (sp500Container) {
      sp500Container.parentNode.insertBefore(hangSengContainer, sp500Container.nextSibling);
    } else {
      // If S&P 500 container doesn't exist, insert after the main chart
      const mainChartContainer = marketOverviewSection.querySelector('.chart-container');
      if (mainChartContainer) {
        mainChartContainer.parentNode.insertBefore(hangSengContainer, mainChartContainer.nextSibling);
      } else {
        marketOverviewSection.appendChild(hangSengContainer);
      }
    }
  }
  
  // Generate sample data with extended history (additional month)
  const labels = [];
  const hangSengData = [];
  
  const today = new Date();
  // Extended to 74 days (44 + 30 more days)
  for (let i = 74; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    labels.push(date.toISOString().split('T')[0]);
    
    // Generate realistic looking data
    hangSengData.push(18500 + Math.random() * 600);
  }
  
  // Create chart
  new Chart(document.getElementById('hang-seng-chart'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Hang Seng',
          data: hangSengData,
          borderColor: '#FF5722',
          backgroundColor: 'rgba(255, 87, 34, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.1,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false
        },
        title: {
          display: true,
          text: 'Hang Seng Performance'
        }
      },
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Index Value'
          }
        }
      }
    }
  });
  
  console.log('Hang Seng chart rendered separately');
}

/**
 * Render sector performance chart
 */
function renderSectorPerformanceChart() {
  const chartElement = document.getElementById('sector-performance-chart');
  if (!chartElement) return;
  
  // Sample data
  const sectors = ['Materials', 'Energy', 'Financials', 'Healthcare', 'Technology', 'Consumer', 'Utilities'];
  const performance = [8.2, -3.5, 2.1, 5.4, 12.3, -1.8, 0.7];
  const colors = performance.map(value => value >= 0 ? 'rgba(76, 175, 80, 0.7)' : 'rgba(244, 67, 54, 0.7)');
  
  // Create chart
  new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: sectors,
      datasets: [{
        label: 'Performance (%)',
        data: performance,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.7', '1')),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
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
  
  console.log('Sector performance chart rendered');
}

/**
 * Render exchange rate chart
 */
function renderExchangeRateChart() {
  const chartElement = document.getElementById('exchange-rate-chart');
  if (!chartElement) return;
  
  // Generate sample data with extended history
  const labels = [];
  const rateData = [];
  
  const today = new Date();
  let rate = 0.67; // Starting AUD/USD rate
  
  // Extended to 134 days (104 + 30 more days)
  for (let i = 134; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    labels.push(date.toISOString().split('T')[0]);
    
    // Generate realistic looking rate data
    rate += (Math.random() - 0.5) * 0.005;
    rate = Math.max(0.64, Math.min(0.70, rate)); // Keep within realistic bounds
    rateData.push(rate);
  }
  
  // Create chart
  new Chart(chartElement, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'AUD/USD',
        data: rateData,
        borderColor: '#9C27B0',
        backgroundColor: 'rgba(156, 39, 176, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `AUD/USD: ${context.parsed.y.toFixed(4)}`;
            }
          }
        }
      },
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Exchange Rate'
          }
        }
      }
    }
  });
  
  console.log('Exchange rate chart rendered');
}

/**
 * Render top opportunities chart
 */
function renderTopOpportunitiesChart() {
  const chartElement = document.getElementById('top-opportunities-chart');
  if (!chartElement) return;
  
  // Sample data
  const stocks = ['MIN.AX', 'BHP.AX', 'FMG.AX'];
  const scores = [87.5, 82.3, 79.6];
  const movements = [15.2, 12.8, 14.5];
  
  // Create chart
  new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: stocks,
      datasets: [
        {
          label: 'Composite Score',
          data: scores,
          backgroundColor: 'rgba(33, 150, 243, 0.7)',
          borderColor: 'rgba(33, 150, 243, 1)',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: 'Expected Movement (%)',
          data: movements,
          backgroundColor: 'rgba(255, 193, 7, 0.7)',
          borderColor: 'rgba(255, 193, 7, 1)',
          borderWidth: 1,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
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
  
  console.log('Top opportunities chart rendered');
}

/**
 * Render stock detail chart
 * @param {HTMLElement} chartElement - Canvas element for the chart
 */
function renderStockDetailChart(chartElement) {
  // Generate sample data with extended history
  const labels = [];
  const priceData = [];
  const volumeData = [];
  
  const today = new Date();
  let price = 65.0; // Starting price
  
  // Extended to 104 days (74 + 30 more days)
  for (let i = 104; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    labels.push(date.toISOString().split('T')[0]);
    
    // Generate realistic looking price data
    price += (Math.random() - 0.48) * (price * 0.02); // Slight upward bias
    price = Math.max(price * 0.85, Math.min(price * 1.15, price)); // Keep within realistic bounds
    priceData.push(price);
    
    // Generate volume data
    const volume = Math.floor(Math.random() * 1000000) + 500000;
    volumeData.push(volume);
  }
  
  // Create chart
  new Chart(chartElement, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Price',
          data: priceData,
          borderColor: '#2c7be5',
          backgroundColor: 'rgba(44, 123, 229, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          yAxisID: 'y',
          fill: true
        },
        {
          label: 'Volume',
          data: volumeData,
          borderColor: '#00d97e',
          backgroundColor: 'rgba(0, 217, 126, 0.2)',
          borderWidth: 1,
          pointRadius: 0,
          yAxisID: 'y1',
          type: 'bar'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              if (context.dataset.label === 'Price') {
                return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
              } else {
                return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        }
      },
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Price ($)'
          }
        },
        y1: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Volume'
          },
          grid: {
            drawOnChartArea: false
          }
        }
      }
    }
  });
  
  console.log('Stock detail chart rendered');
}

/**
 * Render additional charts that may be present on the page
 */
function renderAdditionalCharts() {
  // Volatility Analysis
  const volatilityChart = document.getElementById('volatility-chart');
  if (volatilityChart) {
    renderVolatilityChart(volatilityChart);
  }
  
  // Tariff Impact Scores
  const tariffImpactChart = document.getElementById('tariff-impact-chart');
  if (tariffImpactChart) {
    renderTariffImpactChart(tariffImpactChart);
  }
  
  // AU vs US Performance
  const auVsUsChart = document.getElementById('au-vs-us-chart');
  if (auVsUsChart) {
    renderAuVsUsChart(auVsUsChart);
  }
  
  // Alert Summary
  const alertSummaryChart = document.getElementById('alert-summary-chart');
  if (alertSummaryChart) {
    renderAlertSummaryChart(alertSummaryChart);
  }
  
  console.log('Additional charts rendered');
}

/**
 * Render volatility chart
 * @param {HTMLElement} chartElement - Canvas element for the chart
 */
function renderVolatilityChart(chartElement) {
  // Sample data
  const stocks = ['MIN.AX', 'BHP.AX', 'FMG.AX', 'TWE.AX', 'S32.AX'];
  const volatility = [32.5, 24.8, 28.7, 18.2, 22.3];
  const beta = [1.8, 1.4, 1.6, 0.9, 1.2];
  
  // Create chart
  new Chart(chartElement, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Stocks',
        data: stocks.map((stock, i) => ({
          x: beta[i],
          y: volatility[i],
          stock: stock
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointRadius: 8,
        pointHoverRadius: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const point = context.raw;
              return `${point.stock}: Volatility ${point.y}%, Beta ${point.x}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Beta'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Annualized Volatility (%)'
          }
        }
      }
    }
  });
  
  console.log('Volatility chart rendered');
}

/**
 * Render tariff impact chart
 * @param {HTMLElement} chartElement - Canvas element for the chart
 */
function renderTariffImpactChart(chartElement) {
  // Sample data
  const stocks = ['MIN.AX', 'BHP.AX', 'FMG.AX', 'TWE.AX', 'S32.AX'];
  const tariffImpact = [85, 80, 75, 65, 70];
  
  // Create chart
  new Chart(chartElement, {
    type: 'bar',
    data: {
      labels: stocks,
      datasets: [{
        label: 'Tariff Impact Score',
        data: tariffImpact,
        backgroundColor: tariffImpact.map(score => {
          if (score >= 80) return 'rgba(244, 67, 54, 0.7)';
          if (score >= 70) return 'rgba(255, 152, 0, 0.7)';
          return 'rgba(255, 193, 7, 0.7)';
        }),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Impact Score'
          }
        }
      }
    }
  });
  
  console.log('Tariff impact chart rendered');
}

/**
 * Render AU vs US performance chart
 * @param {HTMLElement} chartElement - Canvas element for the chart
 */
function renderAuVsUsChart(chartElement) {
  // Generate sample data with extended history
  const labels = [];
  const asxData = [];
  const spData = [];
  
  const today = new Date();
  let asxIndex = 100;
  let spIndex = 100;
  
  // Extended to 224 days (194 + 30 more days)
  for (let i = 224; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    labels.push(date.toISOString().split('T')[0]);
    
    // Generate realistic looking index data
    asxIndex += (Math.random() - 0.48) * 1.2; // Slight upward bias
    spIndex += (Math.random() - 0.45) * 1.5; // Stronger upward bias
    
    asxData.push(asxIndex);
    spData.push(spIndex);
  }
  
  // Create chart
  new Chart(chartElement, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'ASX 200',
          data: asxData,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.1
        },
        {
          label: 'S&P 500',
          data: spData,
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Indexed Performance (Base 100)'
          }
        }
      }
    }
  });
  
  console.log('AU vs US performance chart rendered');
}

/**
 * Render alert summary chart
 * @param {HTMLElement} chartElement - Canvas element for the chart
 */
function renderAlertSummaryChart(chartElement) {
  // Sample data
  const alertTypes = ['Price', 'Technical', 'News', 'Market'];
  const alertCounts = [12, 8, 5, 3];
  const colors = ['#2196F3', '#FF9800', '#F44336', '#4CAF50'];
  
  // Create chart
  new Chart(chartElement, {
    type: 'doughnut',
    data: {
      labels: alertTypes,
      datasets: [{
        data: alertCounts,
        backgroundColor: colors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
  
  console.log('Alert summary chart rendered');
}
