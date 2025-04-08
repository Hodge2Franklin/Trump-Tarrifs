/**
 * Advanced Visualization Tools for Trump Tariff Analysis Website
 * 
 * This module provides advanced visualization capabilities including:
 * - Interactive charts with drill-down capabilities
 * - Heat maps for cross-market analysis
 * - Correlation matrices for identifying relationships between stocks
 * - Custom visualization parameters for personalized analysis
 */

class AdvancedVisualizationTools {
  constructor() {
    // Chart configuration defaults
    this.defaultConfig = {
      colors: {
        positive: '#28a745',
        negative: '#dc3545',
        neutral: '#6c757d',
        highlight: '#007bff',
        background: '#f8f9fa',
        grid: '#dee2e6'
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      },
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          },
          padding: 10,
          cornerRadius: 4
        },
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 15
          }
        }
      }
    };
    
    // Initialize chart libraries
    this._initializeChartLibraries();
  }
  
  /**
   * Initialize chart libraries
   * @private
   */
  _initializeChartLibraries() {
    // In a real implementation, this would load and configure chart libraries
    console.log('Initializing chart libraries');
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js is not loaded. Some visualizations may not work properly.');
    }
    
    // Check if D3.js is loaded
    if (typeof d3 === 'undefined') {
      console.warn('D3.js is not loaded. Some visualizations may not work properly.');
    }
  }
  
  /**
   * Create an interactive price chart with drill-down capabilities
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Chart data
   * @param {Object} options - Chart options
   * @returns {Object} Chart instance
   */
  createPriceChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return null;
    }
    
    // Create canvas element if it doesn't exist
    let canvas = container.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      container.appendChild(canvas);
    }
    
    // Merge default config with options
    const chartOptions = this._mergeOptions(this.defaultConfig, {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: options.timeUnit || 'day',
            tooltipFormat: 'MMM d, yyyy'
          },
          grid: {
            display: true,
            color: this.defaultConfig.colors.grid,
            drawBorder: false
          },
          ticks: {
            maxRotation: 0
          }
        },
        y: {
          position: 'right',
          grid: {
            color: this.defaultConfig.colors.grid,
            drawBorder: false
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              return `${label}: $${value.toFixed(2)}`;
            }
          }
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              enabled: true
            },
            mode: 'xy'
          },
          pan: {
            enabled: true,
            mode: 'xy'
          }
        }
      }
    });
    
    // Create chart
    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [{
          label: data.symbol || 'Price',
          data: data.prices.map(p => ({
            x: new Date(p.date),
            y: p.close
          })),
          borderColor: this.defaultConfig.colors.highlight,
          backgroundColor: this._hexToRgba(this.defaultConfig.colors.highlight, 0.1),
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHitRadius: 10,
          pointHoverBackgroundColor: this.defaultConfig.colors.highlight,
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
          tension: 0.1,
          fill: true
        }]
      },
      options: chartOptions
    });
    
    // Add drill-down functionality
    this._addDrillDownCapability(chart, data, options);
    
    return chart;
  }
  
  /**
   * Create a multi-series comparison chart
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Chart data with multiple series
   * @param {Object} options - Chart options
   * @returns {Object} Chart instance
   */
  createComparisonChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return null;
    }
    
    // Create canvas element if it doesn't exist
    let canvas = container.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      container.appendChild(canvas);
    }
    
    // Merge default config with options
    const chartOptions = this._mergeOptions(this.defaultConfig, {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: options.timeUnit || 'day',
            tooltipFormat: 'MMM d, yyyy'
          },
          grid: {
            display: true,
            color: this.defaultConfig.colors.grid,
            drawBorder: false
          },
          ticks: {
            maxRotation: 0
          }
        },
        y: {
          position: 'right',
          grid: {
            color: this.defaultConfig.colors.grid,
            drawBorder: false
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              return `${label}: ${value.toFixed(2)}`;
            }
          }
        }
      }
    });
    
    // Prepare datasets
    const datasets = data.series.map((series, index) => {
      const color = options.colors && options.colors[index] 
        ? options.colors[index] 
        : this._getColorFromPalette(index);
      
      return {
        label: series.name,
        data: series.data.map(p => ({
          x: new Date(p.date),
          y: p.value
        })),
        borderColor: color,
        backgroundColor: this._hexToRgba(color, 0.1),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHitRadius: 10,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        tension: 0.1,
        fill: options.fill === true
      };
    });
    
    // Create chart
    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        datasets: datasets
      },
      options: chartOptions
    });
    
    return chart;
  }
  
  /**
   * Create a correlation matrix visualization
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Correlation data
   * @param {Object} options - Visualization options
   */
  createCorrelationMatrix(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Set dimensions
    const margin = options.margin || { top: 50, right: 50, bottom: 100, left: 100 };
    const width = options.width || container.clientWidth - margin.left - margin.right;
    const height = options.height || container.clientWidth - margin.top - margin.bottom;
    
    // Create SVG element
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Create scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.labels)
      .padding(0.05);
    
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(data.labels)
      .padding(0.05);
    
    // Create color scale
    const colorScale = d3.scaleLinear()
      .domain([-1, 0, 1])
      .range([
        options.negativeColor || this.defaultConfig.colors.negative,
        options.neutralColor || this.defaultConfig.colors.neutral,
        options.positiveColor || this.defaultConfig.colors.positive
      ]);
    
    // Create tooltip
    const tooltip = d3.select(container)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'correlation-tooltip')
      .style('position', 'absolute')
      .style('background-color', 'rgba(0, 0, 0, 0.7)')
      .style('color', 'white')
      .style('padding', '10px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none');
    
    // Add X axis labels
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');
    
    // Add Y axis labels
    svg.append('g')
      .call(d3.axisLeft(y));
    
    // Create cells
    svg.selectAll()
      .data(data.correlations)
      .enter()
      .append('rect')
      .attr('x', d => x(d.x))
      .attr('y', d => y(d.y))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => colorScale(d.value))
      .style('stroke', 'white')
      .style('stroke-width', 1)
      .on('mouseover', function(event, d) {
        tooltip.style('opacity', 1);
        d3.select(this)
          .style('stroke', 'black')
          .style('stroke-width', 2);
      })
      .on('mousemove', function(event, d) {
        tooltip
          .html(`${d.x} vs ${d.y}: ${d.value.toFixed(2)}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseleave', function(event, d) {
        tooltip.style('opacity', 0);
        d3.select(this)
          .style('stroke', 'white')
          .style('stroke-width', 1);
      });
    
    // Add correlation values
    if (options.showValues !== false) {
      svg.selectAll()
        .data(data.correlations)
        .enter()
        .append('text')
        .attr('x', d => x(d.x) + x.bandwidth() / 2)
        .attr('y', d => y(d.y) + y.bandwidth() / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font-size', '10px')
        .style('fill', d => Math.abs(d.value) > 0.5 ? 'white' : 'black')
        .text(d => d.value.toFixed(2));
    }
    
    // Add title
    if (options.title) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', -20)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text(options.title);
    }
    
    // Add legend
    if (options.showLegend !== false) {
      const legendWidth = 200;
      const legendHeight = 20;
      
      const legendScale = d3.scaleLinear()
        .domain([-1, 0, 1])
        .range([0, legendWidth / 2, legendWidth]);
      
      const legendAxis = d3.axisBottom(legendScale)
        .tickValues([-1, -0.5, 0, 0.5, 1])
        .tickFormat(d3.format('.1f'));
      
      const legend = svg.append('g')
        .attr('transform', `translate(${(width - legendWidth) / 2},${height + 50})`);
      
      const defs = svg.append('defs');
      
      const gradient = defs.append('linearGradient')
        .attr('id', 'correlation-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
      
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', options.negativeColor || this.defaultConfig.colors.negative);
      
      gradient.append('stop')
        .attr('offset', '50%')
        .attr('stop-color', options.neutralColor || this.defaultConfig.colors.neutral);
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', options.positiveColor || this.defaultConfig.colors.positive);
      
      legend.append('rect')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#correlation-gradient)');
      
      legend.append('g')
        .attr('transform', `translate(0,${legendHeight})`)
        .call(legendAxis);
      
      legend.append('text')
        .attr('x', legendWidth / 2)
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text('Correlation Coefficient');
    }
  }
  
  /**
   * Create a heat map visualization
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Heat map data
   * @param {Object} options - Visualization options
   */
  createHeatMap(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Set dimensions
    const margin = options.margin || { top: 50, right: 50, bottom: 100, left: 100 };
    const width = options.width || container.clientWidth - margin.left - margin.right;
    const height = options.height || 500 - margin.top - margin.bottom;
    
    // Create SVG element
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Create scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.xLabels)
      .padding(0.05);
    
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(data.yLabels)
      .padding(0.05);
    
    // Create color scale
    const colorScale = d3.scaleSequential()
      .interpolator(options.colorInterpolator || d3.interpolateYlOrRd)
      .domain([
        options.minValue || Math.min(...data.values.map(d => d.value)),
        options.maxValue || Math.max(...data.values.map(d => d.value))
      ]);
    
    // Create tooltip
    const tooltip = d3.select(container)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'heatmap-tooltip')
      .style('position', 'absolute')
      .style('background-color', 'rgba(0, 0, 0, 0.7)')
      .style('color', 'white')
      .style('padding', '10px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none');
    
    // Add X axis labels
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');
    
    // Add Y axis labels
    svg.append('g')
      .call(d3.axisLeft(y));
    
    // Create cells
    svg.selectAll()
      .data(data.values)
      .enter()
      .append('rect')
      .attr('x', d => x(d.x))
      .attr('y', d => y(d.y))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => colorScale(d.value))
      .style('stroke', 'white')
      .style('stroke-width', 1)
      .on('mouseover', function(event, d) {
        tooltip.style('opacity', 1);
        d3.select(this)
          .style('stroke', 'black')
          .style('stroke-width', 2);
      })
      .on('mousemove', function(event, d) {
        const formattedValue = options.valueFormat 
          ? d3.format(options.valueFormat)(d.value) 
          : d.value.toFixed(2);
        
        tooltip
          .html(`${d.x}, ${d.y}: ${formattedValue}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseleave', function(event, d) {
        tooltip.style('opacity', 0);
        d3.select(this)
          .style('stroke', 'white')
          .style('stroke-width', 1);
      });
    
    // Add values
    if (options.showValues !== false) {
      svg.selectAll()
        .data(data.values)
        .enter()
        .append('text')
        .attr('x', d => x(d.x) + x.bandwidth() / 2)
        .attr('y', d => y(d.y) + y.bandwidth() / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font-size', '10px')
        .style('fill', d => {
          const normalizedValue = (d.value - colorScale.domain()[0]) / (colorScale.domain()[1] - colorScale.domain()[0]);
          return normalizedValue > 0.7 ? 'white' : 'black';
        })
        .text(d => {
          const formattedValue = options.valueFormat 
            ? d3.format(options.valueFormat)(d.value) 
            : d.value.toFixed(1);
          return formattedValue;
        });
    }
    
    // Add title
    if (options.title) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', -20)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text(options.title);
    }
    
    // Add X axis title
    if (options.xTitle) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .text(options.xTitle);
    }
    
    // Add Y axis title
    if (options.yTitle) {
      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .text(options.yTitle);
    }
    
    // Add legend
    if (options.showLegend !== false) {
      const legendWidth = 200;
      const legendHeight = 20;
      
      const legendScale = d3.scaleLinear()
        .domain(colorScale.domain())
        .range([0, legendWidth]);
      
      const legendAxis = d3.axisBottom(legendScale)
        .tickFormat(d => options.valueFormat ? d3.format(options.valueFormat)(d) : d.toFixed(1));
      
      const legend = svg.append('g')
        .attr('transform', `translate(${(width - legendWidth) / 2},${height + 50})`);
      
      const defs = svg.append('defs');
      
      const gradient = defs.append('linearGradient')
        .attr('id', 'heatmap-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
      
      // Create gradient stops
      const numStops = 10;
      for (let i = 0; i <= numStops; i++) {
        const offset = i / numStops;
        const value = colorScale.domain()[0] + offset * (colorScale.domain()[1] - colorScale.domain()[0]);
        
        gradient.append('stop')
          .attr('offset', `${offset * 100}%`)
          .attr('stop-color', colorScale(value));
      }
      
      legend.append('rect')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#heatmap-gradient)');
      
      legend.append('g')
        .attr('transform', `translate(0,${legendHeight})`)
        .call(legendAxis);
      
      legend.append('text')
        .attr('x', legendWidth / 2)
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text(options.legendTitle || 'Value');
    }
  }
  
  /**
   * Create a scatter plot with trend line
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Scatter plot data
   * @param {Object} options - Chart options
   * @returns {Object} Chart instance
   */
  createScatterPlot(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return null;
    }
    
    // Create canvas element if it doesn't exist
    let canvas = container.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      container.appendChild(canvas);
    }
    
    // Calculate trend line if requested
    let trendLineData = null;
    if (options.showTrendLine) {
      trendLineData = this._calculateTrendLine(data.points);
    }
    
    // Merge default config with options
    const chartOptions = this._mergeOptions(this.defaultConfig, {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: options.xAxisTitle || ''
          },
          grid: {
            display: true,
            color: this.defaultConfig.colors.grid,
            drawBorder: false
          }
        },
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: options.yAxisTitle || ''
          },
          grid: {
            color: this.defaultConfig.colors.grid,
            drawBorder: false
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const xValue = context.parsed.x;
              const yValue = context.parsed.y;
              return `${label} (${xValue.toFixed(2)}, ${yValue.toFixed(2)})`;
            }
          }
        },
        title: {
          display: options.title ? true : false,
          text: options.title || '',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      }
    });
    
    // Prepare datasets
    const datasets = [{
      label: data.label || 'Data Points',
      data: data.points.map(p => ({
        x: p.x,
        y: p.y
      })),
      backgroundColor: options.pointColor || this.defaultConfig.colors.highlight,
      borderColor: options.pointBorderColor || '#fff',
      borderWidth: 1,
      pointRadius: options.pointRadius || 5,
      pointHoverRadius: options.pointHoverRadius || 8
    }];
    
    // Add trend line if calculated
    if (trendLineData) {
      datasets.push({
        label: 'Trend Line',
        data: trendLineData,
        type: 'line',
        borderColor: options.trendLineColor || this.defaultConfig.colors.neutral,
        borderWidth: 2,
        pointRadius: 0,
        fill: false
      });
    }
    
    // Create chart
    const chart = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: datasets
      },
      options: chartOptions
    });
    
    return chart;
  }
  
  /**
   * Create a radar chart for multi-factor analysis
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Radar chart data
   * @param {Object} options - Chart options
   * @returns {Object} Chart instance
   */
  createRadarChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return null;
    }
    
    // Create canvas element if it doesn't exist
    let canvas = container.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      container.appendChild(canvas);
    }
    
    // Merge default config with options
    const chartOptions = this._mergeOptions(this.defaultConfig, {
      scales: {
        r: {
          angleLines: {
            display: true,
            color: this.defaultConfig.colors.grid
          },
          grid: {
            color: this.defaultConfig.colors.grid
          },
          pointLabels: {
            font: {
              size: 12
            }
          },
          suggestedMin: options.minValue || 0,
          suggestedMax: options.maxValue || 100,
          ticks: {
            stepSize: options.stepSize || 20,
            backdropColor: 'rgba(255, 255, 255, 0.75)'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.raw;
              return `${label}: ${value}`;
            }
          }
        },
        title: {
          display: options.title ? true : false,
          text: options.title || '',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      }
    });
    
    // Prepare datasets
    const datasets = data.datasets.map((dataset, index) => {
      const color = options.colors && options.colors[index] 
        ? options.colors[index] 
        : this._getColorFromPalette(index);
      
      return {
        label: dataset.label,
        data: dataset.values,
        backgroundColor: this._hexToRgba(color, 0.2),
        borderColor: color,
        borderWidth: 2,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: color,
        pointRadius: 4,
        pointHoverRadius: 6
      };
    });
    
    // Create chart
    const chart = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: data.labels,
        datasets: datasets
      },
      options: chartOptions
    });
    
    return chart;
  }
  
  /**
   * Create a bubble chart for multi-dimensional analysis
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Bubble chart data
   * @param {Object} options - Chart options
   * @returns {Object} Chart instance
   */
  createBubbleChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return null;
    }
    
    // Create canvas element if it doesn't exist
    let canvas = container.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      container.appendChild(canvas);
    }
    
    // Merge default config with options
    const chartOptions = this._mergeOptions(this.defaultConfig, {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: options.xAxisTitle || ''
          },
          grid: {
            display: true,
            color: this.defaultConfig.colors.grid,
            drawBorder: false
          }
        },
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: options.yAxisTitle || ''
          },
          grid: {
            color: this.defaultConfig.colors.grid,
            drawBorder: false
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.raw.label || '';
              const xValue = context.parsed.x;
              const yValue = context.parsed.y;
              const rValue = context.raw.r;
              return [
                `${label}`,
                `${options.xAxisTitle || 'X'}: ${xValue.toFixed(2)}`,
                `${options.yAxisTitle || 'Y'}: ${yValue.toFixed(2)}`,
                `${options.rAxisTitle || 'Size'}: ${rValue}`
              ];
            }
          }
        },
        title: {
          display: options.title ? true : false,
          text: options.title || '',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      }
    });
    
    // Prepare datasets
    const datasets = data.datasets.map((dataset, index) => {
      const color = options.colors && options.colors[index] 
        ? options.colors[index] 
        : this._getColorFromPalette(index);
      
      return {
        label: dataset.label,
        data: dataset.points.map(p => ({
          x: p.x,
          y: p.y,
          r: p.r,
          label: p.label
        })),
        backgroundColor: this._hexToRgba(color, 0.7),
        borderColor: color,
        borderWidth: 1
      };
    });
    
    // Create chart
    const chart = new Chart(canvas, {
      type: 'bubble',
      data: {
        datasets: datasets
      },
      options: chartOptions
    });
    
    return chart;
  }
  
  /**
   * Create a candlestick chart for price analysis
   * @param {string} containerId - ID of the container element
   * @param {Object} data - Candlestick chart data
   * @param {Object} options - Chart options
   */
  createCandlestickChart(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with ID "${containerId}" not found`);
      return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Set dimensions
    const margin = options.margin || { top: 20, right: 50, bottom: 30, left: 50 };
    const width = options.width || container.clientWidth - margin.left - margin.right;
    const height = options.height || 400 - margin.top - margin.bottom;
    
    // Create SVG element
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Create scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.prices.map(d => d.date))
      .padding(0.2);
    
    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([
        d3.min(data.prices, d => d.low) * 0.99,
        d3.max(data.prices, d => d.high) * 1.01
      ]);
    
    // Create tooltip
    const tooltip = d3.select(container)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'candlestick-tooltip')
      .style('position', 'absolute')
      .style('background-color', 'rgba(0, 0, 0, 0.7)')
      .style('color', 'white')
      .style('padding', '10px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none');
    
    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x)
        .tickValues(x.domain().filter((d, i) => i % Math.ceil(data.prices.length / 10) === 0))
        .tickFormat(d => {
          const date = new Date(d);
          return date.toLocaleDateString();
        }))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');
    
    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y));
    
    // Add candlesticks
    svg.selectAll('candlesticks')
      .data(data.prices)
      .enter()
      .append('rect')
      .attr('x', d => x(d.date))
      .attr('y', d => y(Math.max(d.open, d.close)))
      .attr('width', x.bandwidth())
      .attr('height', d => Math.abs(y(d.open) - y(d.close)))
      .attr('fill', d => d.open > d.close ? options.bearishColor || '#dc3545' : options.bullishColor || '#28a745')
      .on('mouseover', function(event, d) {
        tooltip.style('opacity', 1);
      })
      .on('mousemove', function(event, d) {
        const date = new Date(d.date).toLocaleDateString();
        tooltip
          .html(`
            <strong>${date}</strong><br>
            Open: $${d.open.toFixed(2)}<br>
            High: $${d.high.toFixed(2)}<br>
            Low: $${d.low.toFixed(2)}<br>
            Close: $${d.close.toFixed(2)}<br>
            Volume: ${d.volume.toLocaleString()}
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseleave', function(event, d) {
        tooltip.style('opacity', 0);
      });
    
    // Add high-low lines
    svg.selectAll('highLowLines')
      .data(data.prices)
      .enter()
      .append('line')
      .attr('x1', d => x(d.date) + x.bandwidth() / 2)
      .attr('x2', d => x(d.date) + x.bandwidth() / 2)
      .attr('y1', d => y(d.high))
      .attr('y2', d => y(d.low))
      .attr('stroke', d => d.open > d.close ? options.bearishColor || '#dc3545' : options.bullishColor || '#28a745')
      .attr('stroke-width', 1);
    
    // Add title
    if (options.title) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text(options.title);
    }
    
    // Add volume bars if requested
    if (options.showVolume) {
      const volumeHeight = 80;
      const volumeMargin = 10;
      
      // Update SVG height
      d3.select(container).select('svg')
        .attr('height', height + margin.top + margin.bottom + volumeHeight + volumeMargin);
      
      // Create volume scale
      const yVolume = d3.scaleLinear()
        .range([volumeHeight, 0])
        .domain([0, d3.max(data.prices, d => d.volume)]);
      
      // Create volume group
      const volumeGroup = svg.append('g')
        .attr('transform', `translate(0,${height + volumeMargin})`);
      
      // Add volume bars
      volumeGroup.selectAll('volumeBars')
        .data(data.prices)
        .enter()
        .append('rect')
        .attr('x', d => x(d.date))
        .attr('y', d => yVolume(d.volume))
        .attr('width', x.bandwidth())
        .attr('height', d => volumeHeight - yVolume(d.volume))
        .attr('fill', d => d.open > d.close ? options.bearishColor || '#dc3545' : options.bullishColor || '#28a745')
        .attr('opacity', 0.5);
      
      // Add volume axis
      volumeGroup.append('g')
        .call(d3.axisRight(yVolume)
          .ticks(3)
          .tickFormat(d => this._formatNumber(d)))
        .attr('transform', `translate(${width},0)`);
      
      // Add volume label
      volumeGroup.append('text')
        .attr('x', 5)
        .attr('y', 15)
        .style('font-size', '12px')
        .text('Volume');
    }
  }
  
  /**
   * Add drill-down capability to a chart
   * @param {Object} chart - Chart instance
   * @param {Object} data - Chart data
   * @param {Object} options - Chart options
   * @private
   */
  _addDrillDownCapability(chart, data, options) {
    // In a real implementation, this would add event listeners for drill-down
    console.log('Adding drill-down capability to chart');
    
    // Add click event listener to canvas
    chart.canvas.addEventListener('click', (event) => {
      const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
      
      if (points.length) {
        const firstPoint = points[0];
        const dataIndex = firstPoint.index;
        const datasetIndex = firstPoint.datasetIndex;
        const dataPoint = chart.data.datasets[datasetIndex].data[dataIndex];
        
        // Check if we have drill-down data
        if (data.drillDown && data.drillDown[dataIndex]) {
          console.log('Drill-down data found for index:', dataIndex);
          
          // In a real implementation, this would update the chart with drill-down data
          // For demonstration, we'll just log the drill-down data
          console.log('Drill-down data:', data.drillDown[dataIndex]);
          
          // If options.onDrillDown is provided, call it with the drill-down data
          if (typeof options.onDrillDown === 'function') {
            options.onDrillDown(data.drillDown[dataIndex], dataPoint);
          }
        }
      }
    });
  }
  
  /**
   * Calculate trend line for scatter plot
   * @param {Array} points - Array of data points
   * @returns {Array} Trend line points
   * @private
   */
  _calculateTrendLine(points) {
    // Calculate linear regression
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    let n = points.length;
    
    for (let i = 0; i < n; i++) {
      sumX += points[i].x;
      sumY += points[i].y;
      sumXY += points[i].x * points[i].y;
      sumXX += points[i].x * points[i].x;
    }
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Find min and max x values
    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));
    
    // Create trend line points
    return [
      { x: minX, y: slope * minX + intercept },
      { x: maxX, y: slope * maxX + intercept }
    ];
  }
  
  /**
   * Merge options objects
   * @param {Object} defaultOptions - Default options
   * @param {Object} customOptions - Custom options
   * @returns {Object} Merged options
   * @private
   */
  _mergeOptions(defaultOptions, customOptions) {
    const merged = JSON.parse(JSON.stringify(defaultOptions));
    
    const merge = (target, source) => {
      for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target[key]) target[key] = {};
          merge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    };
    
    merge(merged, customOptions);
    return merged;
  }
  
  /**
   * Convert hex color to rgba
   * @param {string} hex - Hex color
   * @param {number} alpha - Alpha value
   * @returns {string} RGBA color
   * @private
   */
  _hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  /**
   * Get color from palette
   * @param {number} index - Color index
   * @returns {string} Color
   * @private
   */
  _getColorFromPalette(index) {
    const palette = [
      '#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f',
      '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
    ];
    
    return palette[index % palette.length];
  }
  
  /**
   * Format number with commas
   * @param {number} num - Number to format
   * @returns {string} Formatted number
   * @private
   */
  _formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default AdvancedVisualizationTools;
