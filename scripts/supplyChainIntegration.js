/**
 * Global Supply Chain Integration for Trump Tariff Analysis Website
 * 
 * This script integrates the global supply chain data analysis tools
 * with the website to provide insights into tariff impacts on international
 * supply chains and Australian companies.
 */

import GlobalSupplyChainData from '../components/analysis/GlobalSupplyChainData.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize global supply chain data
  const supplyChainData = new GlobalSupplyChainData();
  
  // Add supply chain stylesheet
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = '../styles/supply-chain.css';
  document.head.appendChild(linkElement);
  
  // Create supply chain page if it doesn't exist
  createSupplyChainPage();
  
  /**
   * Create supply chain page if it doesn't exist
   */
  function createSupplyChainPage() {
    // Check if we're on the supply chain page
    const isSupplyChainPage = window.location.pathname.includes('/supply-chain.html');
    const supplyChainContainer = document.getElementById('supply-chain-container');
    
    if (isSupplyChainPage && !supplyChainContainer) {
      // Create supply chain container
      const mainContent = document.querySelector('.main-content') || document.body;
      const container = document.createElement('div');
      container.id = 'supply-chain-container';
      container.className = 'supply-chain-container';
      
      // Add to page
      mainContent.appendChild(container);
    }
    
    // Add supply chain link to navigation if not exists
    addSupplyChainNavLink();
  }
  
  /**
   * Add supply chain link to navigation if not exists
   */
  function addSupplyChainNavLink() {
    const navigation = document.querySelector('nav');
    if (!navigation) return;
    
    // Check if supply chain link already exists
    const existingLink = Array.from(navigation.querySelectorAll('a')).find(link => 
      link.textContent.includes('Supply Chain') || link.href.includes('supply-chain.html')
    );
    
    if (!existingLink) {
      // Create supply chain link
      const supplyChainLink = document.createElement('a');
      supplyChainLink.href = '/supply-chain.html';
      supplyChainLink.textContent = 'Supply Chain Analysis';
      
      // Add to navigation
      navigation.appendChild(supplyChainLink);
    }
  }
  
  /**
   * Create standalone supply chain page
   */
  function createStandaloneSupplyChainPage() {
    // This function would create a standalone supply-chain.html page
    // In a real implementation, this would be done server-side or during build
    
    const supplyChainHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Supply Chain Analysis - Trump Tariff Analysis</title>
        <link rel="stylesheet" href="styles/main.css">
        <link rel="stylesheet" href="styles/supply-chain.css">
      </head>
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/market-analysis.html">Market Analysis</a>
            <a href="/stock-analysis.html">Stock Analysis</a>
            <a href="/trading-opportunities.html">Trading Opportunities</a>
            <a href="/predictive-analytics.html">Predictive Analytics</a>
            <a href="/dashboard.html">Dashboard</a>
            <a href="/scenario-analysis.html">Scenario Analysis</a>
            <a href="/supply-chain.html" class="active">Supply Chain Analysis</a>
          </nav>
        </header>
        <main>
          <div id="supply-chain-container" class="supply-chain-container"></div>
        </main>
        <footer>
          <p>&copy; 2025 Trump Tariff Analysis</p>
        </footer>
        <script type="module" src="scripts/main.js"></script>
        <script type="module" src="scripts/supplyChainIntegration.js"></script>
      </body>
      </html>
    `;
    
    // In a real implementation, this would write to a file
    console.log('Supply Chain HTML generated:', supplyChainHtml);
  }
});
