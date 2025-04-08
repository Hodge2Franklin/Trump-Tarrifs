// Stock Predictions Page JavaScript
// This file handles the stock predictions page functionality

import stockPredictionAPI from './stockPredictionAPI.js';
import StockPredictionComponents from '../components/prediction/StockPredictionComponents.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Stock Predictions page loaded');
    
    // Initialize the stock prediction API
    stockPredictionAPI.initialize();
    
    // DOM elements
    const stockPredictionsGrid = document.getElementById('stock-predictions-grid');
    const sectorPredictionsGrid = document.getElementById('sector-predictions-grid');
    const predictionDetailsModal = document.getElementById('prediction-details-modal');
    const predictionDetailsContent = document.getElementById('prediction-details-content');
    const accuracyStats = document.getElementById('accuracy-stats');
    const accuracyChart = document.getElementById('accuracy-chart');
    
    // Filter elements
    const timeframeFilter = document.getElementById('timeframe-filter');
    const sectorFilter = document.getElementById('sector-filter');
    const minMovementFilter = document.getElementById('min-movement-filter');
    const riskProfileFilter = document.getElementById('risk-profile-filter');
    
    // View control buttons
    const viewStocksButton = document.getElementById('view-stocks');
    const viewSectorsButton = document.getElementById('view-sectors');
    const stockPredictionsView = document.getElementById('stock-predictions-view');
    const sectorPredictionsView = document.getElementById('sector-predictions-view');
    
    // Range value display
    minMovementFilter.addEventListener('input', function() {
        this.nextElementSibling.textContent = this.value + '%';
    });
    
    // View control event listeners
    viewStocksButton.addEventListener('click', function() {
        viewStocksButton.classList.add('active');
        viewSectorsButton.classList.remove('active');
        stockPredictionsView.classList.add('active');
        sectorPredictionsView.classList.remove('active');
    });
    
    viewSectorsButton.addEventListener('click', function() {
        viewSectorsButton.classList.add('active');
        viewStocksButton.classList.remove('active');
        sectorPredictionsView.classList.add('active');
        stockPredictionsView.classList.remove('active');
        
        // Load sector predictions if not already loaded
        if (sectorPredictionsGrid.querySelector('.loading-indicator')) {
            loadSectorPredictions();
        }
    });
    
    // Filter change event listeners
    timeframeFilter.addEventListener('change', loadStockPredictions);
    sectorFilter.addEventListener('change', loadStockPredictions);
    minMovementFilter.addEventListener('change', loadStockPredictions);
    riskProfileFilter.addEventListener('change', loadStockPredictions);
    
    // Modal close functionality
    predictionDetailsModal.addEventListener('click', function(event) {
        if (event.target === predictionDetailsModal) {
            closePredictionDetails();
        }
    });
    
    // Load initial stock predictions
    loadStockPredictions();
    
    // Load model accuracy statistics
    loadModelAccuracyStats();
    
    /**
     * Load stock predictions based on current filter settings
     */
    async function loadStockPredictions() {
        // Show loading indicator
        stockPredictionsGrid.innerHTML = '<div class="loading-indicator">Loading predictions...</div>';
        
        try {
            // Get filter values
            const timeframe = timeframeFilter.value;
            const sector = sectorFilter.value === 'all' ? null : sectorFilter.value;
            const minMovement = parseInt(minMovementFilter.value);
            const riskProfile = riskProfileFilter.value === 'all' ? null : riskProfileFilter.value;
            
            // Get predictions from API
            const predictions = await stockPredictionAPI.getAllPredictions({
                timeframe: timeframe,
                sector: sector,
                minMovement: minMovement,
                riskProfile: riskProfile,
                limit: 10
            });
            
            // Clear loading indicator
            stockPredictionsGrid.innerHTML = '';
            
            // Check if we have predictions
            if (predictions.length === 0) {
                stockPredictionsGrid.innerHTML = '<div class="no-predictions">No predictions match your filter criteria. Try adjusting your filters.</div>';
                return;
            }
            
            // Render prediction cards
            predictions.forEach(prediction => {
                const card = StockPredictionComponents.renderPredictionCard(prediction, showPredictionDetails);
                stockPredictionsGrid.appendChild(card);
            });
        } catch (error) {
            console.error('Error loading stock predictions:', error);
            stockPredictionsGrid.innerHTML = '<div class="error-message">Error loading predictions. Please try again later.</div>';
        }
    }
    
    /**
     * Load sector predictions
     */
    async function loadSectorPredictions() {
        // Show loading indicator
        sectorPredictionsGrid.innerHTML = '<div class="loading-indicator">Loading sector predictions...</div>';
        
        try {
            // Get timeframe filter value
            const timeframe = timeframeFilter.value;
            
            // Get sector predictions from API
            const sectorPredictions = await stockPredictionAPI.getSectorPredictions(timeframe);
            
            // Clear loading indicator
            sectorPredictionsGrid.innerHTML = '';
            
            // Check if we have predictions
            if (Object.keys(sectorPredictions).length === 0) {
                sectorPredictionsGrid.innerHTML = '<div class="no-predictions">No sector predictions available. Please try again later.</div>';
                return;
            }
            
            // Render sector prediction cards
            Object.values(sectorPredictions).forEach(sectorPrediction => {
                const card = StockPredictionComponents.renderSectorPredictionCard(sectorPrediction, showSectorPredictionDetails);
                sectorPredictionsGrid.appendChild(card);
            });
        } catch (error) {
            console.error('Error loading sector predictions:', error);
            sectorPredictionsGrid.innerHTML = '<div class="error-message">Error loading sector predictions. Please try again later.</div>';
        }
    }
    
    /**
     * Show detailed prediction for a specific stock
     * @param {Object} prediction - Stock prediction data
     */
    function showPredictionDetails(prediction) {
        // Create detailed prediction view
        const detailedView = StockPredictionComponents.renderDetailedPrediction(prediction, closePredictionDetails);
        
        // Clear previous content
        predictionDetailsContent.innerHTML = '';
        
        // Add detailed view to modal
        predictionDetailsContent.appendChild(detailedView);
        
        // Show modal
        predictionDetailsModal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }
    
    /**
     * Show detailed prediction for a specific sector
     * @param {Object} sectorPrediction - Sector prediction data
     */
    function showSectorPredictionDetails(sectorPrediction) {
        // Create detailed sector prediction view
        const detailedView = StockPredictionComponents.renderDetailedSectorPrediction(sectorPrediction, closePredictionDetails);
        
        // Clear previous content
        predictionDetailsContent.innerHTML = '';
        
        // Add detailed view to modal
        predictionDetailsContent.appendChild(detailedView);
        
        // Show modal
        predictionDetailsModal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }
    
    /**
     * Close prediction details modal
     */
    function closePredictionDetails() {
        predictionDetailsModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
    
    /**
     * Load model accuracy statistics
     */
    async function loadModelAccuracyStats() {
        try {
            // Get accuracy stats from API
            const stats = await stockPredictionAPI.getHistoricalAccuracyStats();
            
            // Update accuracy stats display
            accuracyStats.innerHTML = `
                <div class="accuracy-stat">
                    <div class="stat-label">Overall Accuracy</div>
                    <div class="stat-value">${(stats.overallAccuracy * 100).toFixed(0)}%</div>
                </div>
                <div class="accuracy-stat">
                    <div class="stat-label">Bullish Predictions</div>
                    <div class="stat-value">${(stats.byDirection.bullish * 100).toFixed(0)}%</div>
                </div>
                <div class="accuracy-stat">
                    <div class="stat-label">Bearish Predictions</div>
                    <div class="stat-value">${(stats.byDirection.bearish * 100).toFixed(0)}%</div>
                </div>
                <div class="accuracy-stat">
                    <div class="stat-label">High Confidence</div>
                    <div class="stat-value">${(stats.byConfidenceLevel.high * 100).toFixed(0)}%</div>
                </div>
            `;
            
            // Render accuracy chart
            renderAccuracyChart(stats);
        } catch (error) {
            console.error('Error loading model accuracy stats:', error);
        }
    }
    
    /**
     * Render accuracy chart
     * @param {Object} stats - Accuracy statistics
     */
    function renderAccuracyChart(stats) {
        // Clear chart container
        accuracyChart.innerHTML = '';
        
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', accuracyChart.clientWidth);
        svg.setAttribute('height', 300);
        accuracyChart.appendChild(svg);
        
        // Chart dimensions
        const width = accuracyChart.clientWidth - 80;
        const height = 220;
        const startX = 40;
        const startY = 250;
        
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
        for (let i = 0; i <= 5; i++) {
            const y = startY - (i * height / 5);
            const value = i * 20;
            
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', startX - 5);
            label.setAttribute('y', y + 5);
            label.setAttribute('text-anchor', 'end');
            label.setAttribute('font-size', '12px');
            label.textContent = value + '%';
            
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
        
        // Create bars for confidence levels
        const confidenceLevels = Object.entries(stats.byConfidenceLevel);
        const barWidth = width / (confidenceLevels.length + 2);
        
        confidenceLevels.forEach(([level, accuracy], index) => {
            const barHeight = (accuracy * 100 / 100) * height;
            const x = startX + (index + 1) * barWidth;
            const y = startY - barHeight;
            
            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bar.setAttribute('x', x);
            bar.setAttribute('y', y);
            bar.setAttribute('width', barWidth - 10);
            bar.setAttribute('height', barHeight);
            bar.setAttribute('fill', getAccuracyColor(accuracy));
            
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x + (barWidth - 10) / 2);
            label.setAttribute('y', startY + 20);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('font-size', '12px');
            label.textContent = formatConfidenceLevel(level);
            
            const value = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            value.setAttribute('x', x + (barWidth - 10) / 2);
            value.setAttribute('y', y - 5);
            value.setAttribute('text-anchor', 'middle');
            value.setAttribute('font-size', '12px');
            value.setAttribute('font-weight', 'bold');
            value.textContent = (accuracy * 100).toFixed(0) + '%';
            
            svg.appendChild(bar);
            svg.appendChild(label);
            svg.appendChild(value);
        });
        
        // Add title
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', accuracyChart.clientWidth / 2);
        title.setAttribute('y', 30);
        title.setAttribute('text-anchor', 'middle');
        title.setAttribute('font-size', '16px');
        title.setAttribute('font-weight', 'bold');
        title.textContent = 'Prediction Accuracy by Confidence Level';
        
        svg.appendChild(title);
    }
    
    /**
     * Format confidence level for display
     * @param {string} level - Confidence level
     * @returns {string} - Formatted confidence level
     */
    function formatConfidenceLevel(level) {
        switch (level) {
            case 'veryLow':
                return 'Very Low';
            case 'veryHigh':
                return 'Very High';
            default:
                return level.charAt(0).toUpperCase() + level.slice(1);
        }
    }
    
    /**
     * Get color based on accuracy value
     * @param {number} accuracy - Accuracy value (0-1)
     * @returns {string} - Color in hex format
     */
    function getAccuracyColor(accuracy) {
        if (accuracy >= 0.8) return '#28a745'; // High accuracy - green
        if (accuracy >= 0.7) return '#5cb85c'; // Good accuracy - light green
        if (accuracy >= 0.6) return '#ffc107'; // Moderate accuracy - yellow
        if (accuracy >= 0.5) return '#f0ad4e'; // Low accuracy - orange
        return '#dc3545'; // Poor accuracy - red
    }
});
