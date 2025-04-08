/**
 * Scenario Analysis Integration for Trump Tariff Analysis Website
 * 
 * This script integrates the scenario analysis tools with the website
 * to provide tariff scenario modeling and impact analysis.
 */

import ScenarioAnalysisTools from '../components/analysis/ScenarioAnalysisTools.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize scenario analysis tools
  const scenarioTools = new ScenarioAnalysisTools();
  
  // Add scenario analysis stylesheet
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = '../styles/scenario-analysis.css';
  document.head.appendChild(linkElement);
  
  // Create scenario analysis page if it doesn't exist
  createScenarioAnalysisPage();
  
  /**
   * Create scenario analysis page if it doesn't exist
   */
  function createScenarioAnalysisPage() {
    // Check if we're on the scenario analysis page
    const isScenarioPage = window.location.pathname.includes('/scenario-analysis.html');
    const scenarioContainer = document.getElementById('scenario-analysis-container');
    
    if (isScenarioPage && !scenarioContainer) {
      // Create scenario container
      const mainContent = document.querySelector('.main-content') || document.body;
      const container = document.createElement('div');
      container.id = 'scenario-analysis-container';
      container.className = 'scenario-analysis-container';
      
      // Add to page
      mainContent.appendChild(container);
    }
    
    // Add scenario analysis link to navigation if not exists
    addScenarioNavLink();
  }
  
  /**
   * Add scenario analysis link to navigation if not exists
   */
  function addScenarioNavLink() {
    const navigation = document.querySelector('nav');
    if (!navigation) return;
    
    // Check if scenario link already exists
    const existingLink = Array.from(navigation.querySelectorAll('a')).find(link => 
      link.textContent.includes('Scenario') || link.href.includes('scenario-analysis.html')
    );
    
    if (!existingLink) {
      // Create scenario link
      const scenarioLink = document.createElement('a');
      scenarioLink.href = '/scenario-analysis.html';
      scenarioLink.textContent = 'Scenario Analysis';
      
      // Add to navigation
      navigation.appendChild(scenarioLink);
    }
  }
  
  /**
   * Create standalone scenario analysis page
   */
  function createStandaloneScenarioPage() {
    // This function would create a standalone scenario-analysis.html page
    // In a real implementation, this would be done server-side or during build
    
    const scenarioHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Scenario Analysis - Trump Tariff Analysis</title>
        <link rel="stylesheet" href="styles/main.css">
        <link rel="stylesheet" href="styles/scenario-analysis.css">
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
            <a href="/scenario-analysis.html" class="active">Scenario Analysis</a>
          </nav>
        </header>
        <main>
          <div id="scenario-analysis-container" class="scenario-analysis-container"></div>
        </main>
        <footer>
          <p>&copy; 2025 Trump Tariff Analysis</p>
        </footer>
        <script type="module" src="scripts/main.js"></script>
        <script type="module" src="scripts/scenarioAnalysisIntegration.js"></script>
      </body>
      </html>
    `;
    
    // In a real implementation, this would write to a file
    console.log('Scenario Analysis HTML generated:', scenarioHtml);
  }
});
