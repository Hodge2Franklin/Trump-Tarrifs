/**
 * Filter Functionality for Trump Tariff Analysis Website
 * 
 * This script enhances the slider functionality for filtering trading opportunities
 * and fixes the issues with Min Score and Min Movement sliders not updating content.
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing filter functionality...');
  
  // Get filter elements
  const sectorFilter = document.getElementById('sector-filter');
  const scoreFilter = document.getElementById('score-filter');
  const movementFilter = document.getElementById('movement-filter');
  const scoreValue = scoreFilter ? scoreFilter.nextElementSibling : null;
  const movementValue = movementFilter ? movementFilter.nextElementSibling : null;
  
  // Get table elements
  const opportunitiesTable = document.querySelector('.opportunities-table table');
  const tableRows = opportunitiesTable ? opportunitiesTable.querySelectorAll('tbody tr') : [];
  
  // Initialize filters
  initializeFilters();
  
  /**
   * Initialize filter functionality
   */
  function initializeFilters() {
    if (!sectorFilter || !scoreFilter || !movementFilter || !opportunitiesTable) {
      console.error('Filter elements or opportunities table not found');
      return;
    }
    
    // Update display values initially
    updateDisplayValue(scoreFilter, scoreValue);
    updateDisplayValue(movementFilter, movementValue, true);
    
    // Add event listeners
    sectorFilter.addEventListener('change', function() {
      console.log('Sector filter changed to:', sectorFilter.value);
      applyFilters();
    });
    
    // Fix for slider functionality
    scoreFilter.addEventListener('input', function() {
      updateDisplayValue(scoreFilter, scoreValue);
      applyFilters();
    });
    
    movementFilter.addEventListener('input', function() {
      updateDisplayValue(movementFilter, movementValue, true);
      applyFilters();
    });
    
    // Apply filters initially
    applyFilters();
    
    console.log('Filter functionality initialized');
  }
  
  /**
   * Update display value for range inputs
   * @param {HTMLElement} slider - Slider element
   * @param {HTMLElement} display - Display element
   * @param {boolean} isPercentage - Whether to display as percentage
   */
  function updateDisplayValue(slider, display, isPercentage = false) {
    if (!slider || !display) return;
    
    const value = slider.value;
    display.textContent = isPercentage ? `${value}%` : value;
  }
  
  /**
   * Apply all filters to the opportunities table
   */
  function applyFilters() {
    if (!tableRows.length) return;
    
    const selectedSector = sectorFilter.value;
    const minScore = parseFloat(scoreFilter.value);
    const minMovement = parseFloat(movementFilter.value);
    
    console.log(`Applying filters: Sector=${selectedSector}, MinScore=${minScore}, MinMovement=${minMovement}`);
    
    let visibleCount = 0;
    
    tableRows.forEach(row => {
      const sector = row.cells[2].textContent.trim(); // Sector column
      const score = parseFloat(row.cells[3].textContent.trim()); // Composite Score column
      const movement = parseFloat(row.cells[6].textContent.trim()); // Movement Score column
      
      // Check if row matches all filters
      const matchesSector = selectedSector === 'all' || sector.toLowerCase().includes(selectedSector.toLowerCase());
      const matchesScore = score >= minScore;
      const matchesMovement = movement >= minMovement;
      
      // Show or hide row based on filter matches
      if (matchesSector && matchesScore && matchesMovement) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });
    
    console.log(`Filter applied: ${visibleCount} rows visible`);
    
    // Update stock detail section based on first visible row
    updateStockDetail();
  }
  
  /**
   * Update stock detail section based on first visible row
   */
  function updateStockDetail() {
    const visibleRows = Array.from(tableRows).filter(row => row.style.display !== 'none');
    
    if (visibleRows.length > 0) {
      const firstVisibleRow = visibleRows[0];
      const symbol = firstVisibleRow.cells[0].textContent.trim();
      const name = firstVisibleRow.cells[1].textContent.trim();
      
      // Update stock detail header
      const stockDetailHeader = document.querySelector('.stock-detail h3');
      if (stockDetailHeader) {
        stockDetailHeader.textContent = `Stock Detail: ${name} (${symbol})`;
      }
      
      // Update stock detail chart
      updateStockDetailChart(symbol);
      
      // Update trading parameters
      updateTradingParameters(firstVisibleRow);
    }
  }
  
  /**
   * Update stock detail chart
   * @param {string} symbol - Stock symbol
   */
  function updateStockDetailChart(symbol) {
    const chartContainer = document.getElementById('stock-detail-chart');
    if (!chartContainer) return;
    
    // Clear existing chart
    while (chartContainer.firstChild) {
      chartContainer.removeChild(chartContainer.firstChild);
    }
    
    // Create new chart
    const ctx = chartContainer.getContext('2d');
    
    // Generate sample data for the selected stock
    const today = new Date();
    const dates = [];
    const prices = [];
    const volumes = [];
    
    // Generate 60 days of data
    let price = getBasePrice(symbol); // Get starting price based on symbol
    for (let i = 60; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
      
      // Generate realistic looking price data
      price += (Math.random() - 0.48) * (price * 0.02); // Slight upward bias, scaled to price
      price = Math.max(price * 0.85, Math.min(price * 1.15, price)); // Keep within realistic bounds
      prices.push(price);
      
      // Generate volume data
      const volume = Math.floor(Math.random() * 1000000) + 500000;
      volumes.push(volume);
    }
    
    // Create chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: `${symbol} Price`,
            data: prices,
            borderColor: '#2c7be5',
            backgroundColor: 'rgba(44, 123, 229, 0.1)',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            yAxisID: 'y',
            fill: true
          },
          {
            label: 'Volume',
            data: volumes,
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
          title: {
            display: true,
            text: `${symbol} Price and Volume`,
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                if (context.dataset.label.includes('Price')) {
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
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'MMM d, yyyy'
            },
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
  }
  
  /**
   * Update trading parameters in stock detail section
   * @param {HTMLElement} row - Table row element
   */
  function updateTradingParameters(row) {
    const entryPrice = row.cells[8].textContent.trim();
    const stopLoss = row.cells[9].textContent.trim();
    const takeProfit = row.cells[10].textContent.trim();
    const riskReward = row.cells[11].textContent.trim();
    
    // Update trading parameters in the info section
    const infoItems = document.querySelectorAll('.info-group:first-of-type .info-item .value');
    if (infoItems.length >= 4) {
      infoItems[0].textContent = entryPrice;
      infoItems[1].textContent = stopLoss;
      infoItems[2].textContent = takeProfit;
      infoItems[3].textContent = riskReward;
    }
  }
  
  /**
   * Get base price for a stock symbol
   * @param {string} symbol - Stock symbol
   * @returns {number} Base price
   */
  function getBasePrice(symbol) {
    // Return realistic base prices for known symbols
    switch (symbol) {
      case 'MIN.AX': return 65.0;
      case 'BHP.AX': return 45.0;
      case 'FMG.AX': return 22.0;
      case 'TWE.AX': return 12.0;
      case 'S32.AX': return 3.5;
      default: return 50.0;
    }
  }
});
