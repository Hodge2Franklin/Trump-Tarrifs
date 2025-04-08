/**
 * Dashboard Integration for Trump Tariff Analysis Website
 * 
 * This script integrates the customizable dashboard system with the website
 * to provide drag-and-drop widgets, multiple layouts, and saved configurations.
 */

import CustomizableDashboard from '../components/dashboard/CustomizableDashboard.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize customizable dashboard
  const dashboard = new CustomizableDashboard('dashboard-container');
  
  // Add dashboard stylesheet
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = '../styles/customizable-dashboard.css';
  document.head.appendChild(linkElement);
  
  // Create dashboard page if it doesn't exist
  createDashboardPage();
  
  /**
   * Create dashboard page if it doesn't exist
   */
  function createDashboardPage() {
    // Check if we're on the index page or if dashboard page doesn't exist
    const isIndexPage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
    const dashboardExists = document.getElementById('dashboard-container');
    
    if (isIndexPage && !dashboardExists) {
      // Create dashboard container
      const mainContent = document.querySelector('.main-content') || document.body;
      const dashboardContainer = document.createElement('div');
      dashboardContainer.id = 'dashboard-container';
      dashboardContainer.className = 'dashboard-container';
      
      // Add to page
      mainContent.appendChild(dashboardContainer);
      
      // Add dashboard link to navigation if not exists
      addDashboardNavLink();
    }
  }
  
  /**
   * Add dashboard link to navigation if not exists
   */
  function addDashboardNavLink() {
    const navigation = document.querySelector('nav');
    if (!navigation) return;
    
    // Check if dashboard link already exists
    const existingLink = Array.from(navigation.querySelectorAll('a')).find(link => 
      link.textContent.includes('Dashboard') || link.href.includes('dashboard.html')
    );
    
    if (!existingLink) {
      // Create dashboard link
      const dashboardLink = document.createElement('a');
      dashboardLink.href = '/dashboard.html';
      dashboardLink.textContent = 'Dashboard';
      
      // Add to navigation
      navigation.appendChild(dashboardLink);
    }
  }
  
  /**
   * Create standalone dashboard page
   */
  function createStandaloneDashboardPage() {
    // This function would create a standalone dashboard.html page
    // In a real implementation, this would be done server-side or during build
    
    const dashboardHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard - Trump Tariff Analysis</title>
        <link rel="stylesheet" href="styles/main.css">
        <link rel="stylesheet" href="styles/customizable-dashboard.css">
      </head>
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/market-analysis.html">Market Analysis</a>
            <a href="/stock-analysis.html">Stock Analysis</a>
            <a href="/trading-opportunities.html">Trading Opportunities</a>
            <a href="/dashboard.html" class="active">Dashboard</a>
          </nav>
        </header>
        <main>
          <div id="dashboard-container" class="dashboard-container"></div>
        </main>
        <footer>
          <p>&copy; 2025 Trump Tariff Analysis</p>
        </footer>
        <script type="module" src="scripts/main.js"></script>
        <script type="module" src="scripts/dashboardIntegration.js"></script>
      </body>
      </html>
    `;
    
    // In a real implementation, this would write to a file
    console.log('Dashboard HTML generated:', dashboardHtml);
  }
});
