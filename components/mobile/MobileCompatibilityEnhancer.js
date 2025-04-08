/**
 * Mobile Compatibility Enhancement for Trump Tariff Analysis Website
 * 
 * This script enhances the mobile experience while maintaining desktop-first approach.
 */

class MobileCompatibilityEnhancer {
  constructor() {
    this.isMobile = this._checkMobile();
    this.viewportWidth = window.innerWidth;
    this.breakpoints = {
      small: 576,
      medium: 768,
      large: 992,
      extraLarge: 1200
    };
    
    // Initialize
    this._initialize();
  }
  
  /**
   * Initialize mobile compatibility enhancer
   * @private
   */
  _initialize() {
    // Register event listeners
    window.addEventListener('resize', this._handleResize.bind(this));
    document.addEventListener('DOMContentLoaded', this._enhanceMobileExperience.bind(this));
  }
  
  /**
   * Check if device is mobile
   * @returns {boolean} True if mobile device
   * @private
   */
  _checkMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  /**
   * Handle window resize
   * @private
   */
  _handleResize() {
    this.viewportWidth = window.innerWidth;
    this._applyResponsiveAdjustments();
  }
  
  /**
   * Enhance mobile experience
   * @private
   */
  _enhanceMobileExperience() {
    // Apply responsive adjustments
    this._applyResponsiveAdjustments();
    
    // Add touch-friendly enhancements
    this._addTouchFriendlyEnhancements();
    
    // Optimize navigation for mobile
    this._optimizeNavigation();
    
    // Adjust chart sizes for mobile
    this._adjustChartSizes();
    
    // Optimize forms for mobile
    this._optimizeForms();
    
    // Add mobile-specific features
    this._addMobileSpecificFeatures();
  }
  
  /**
   * Apply responsive adjustments based on viewport width
   * @private
   */
  _applyResponsiveAdjustments() {
    // Add viewport-specific classes to body
    document.body.classList.remove('viewport-xs', 'viewport-sm', 'viewport-md', 'viewport-lg', 'viewport-xl');
    
    if (this.viewportWidth < this.breakpoints.small) {
      document.body.classList.add('viewport-xs');
    } else if (this.viewportWidth < this.breakpoints.medium) {
      document.body.classList.add('viewport-sm');
    } else if (this.viewportWidth < this.breakpoints.large) {
      document.body.classList.add('viewport-md');
    } else if (this.viewportWidth < this.breakpoints.extraLarge) {
      document.body.classList.add('viewport-lg');
    } else {
      document.body.classList.add('viewport-xl');
    }
    
    // Apply specific adjustments for small screens
    if (this.viewportWidth < this.breakpoints.medium) {
      this._applySmallScreenAdjustments();
    }
  }
  
  /**
   * Apply adjustments for small screens
   * @private
   */
  _applySmallScreenAdjustments() {
    // Adjust grid layouts
    const gridContainers = document.querySelectorAll('.grid-container, .factors-grid, .metrics-grid');
    gridContainers.forEach(container => {
      container.style.gridTemplateColumns = '1fr';
    });
    
    // Simplify tables
    this._simplifyTablesForMobile();
    
    // Adjust chart containers
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
      container.style.height = '300px';
    });
    
    // Adjust dashboard layouts
    const dashboardPanels = document.querySelectorAll('.dashboard-panel');
    dashboardPanels.forEach(panel => {
      panel.style.width = '100%';
      panel.style.margin = '0 0 15px 0';
    });
  }
  
  /**
   * Add touch-friendly enhancements
   * @private
   */
  _addTouchFriendlyEnhancements() {
    // Increase touch target sizes
    const touchTargets = document.querySelectorAll('button, .nav-item, .clickable, input[type="checkbox"], input[type="radio"]');
    touchTargets.forEach(target => {
      // Only apply to small elements
      const rect = target.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        target.classList.add('touch-friendly');
      }
    });
    
    // Add touch feedback
    const interactiveElements = document.querySelectorAll('button, .nav-item, .clickable, .card, .list-item');
    interactiveElements.forEach(element => {
      element.classList.add('touch-feedback');
    });
    
    // Disable hover effects on mobile
    if (this.isMobile) {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        @media (max-width: ${this.breakpoints.medium}px) {
          .hover-effect:hover {
            transform: none !important;
            box-shadow: none !important;
          }
        }
      `;
      document.head.appendChild(styleElement);
    }
  }
  
  /**
   * Optimize navigation for mobile
   * @private
   */
  _optimizeNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Check if mobile navigation already exists
    if (document.querySelector('.mobile-nav-toggle')) return;
    
    // Create mobile navigation toggle
    const navToggle = document.createElement('button');
    navToggle.className = 'mobile-nav-toggle';
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    navToggle.setAttribute('aria-label', 'Toggle navigation');
    
    // Add toggle to header
    const header = document.querySelector('header');
    if (header) {
      header.insertBefore(navToggle, nav);
    }
    
    // Add mobile navigation class to nav
    nav.classList.add('desktop-nav');
    
    // Create mobile navigation
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = nav.innerHTML;
    
    // Add mobile navigation to header
    if (header) {
      header.appendChild(mobileNav);
    }
    
    // Add toggle event
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
    
    // Close mobile navigation when clicking outside
    document.addEventListener('click', (event) => {
      if (mobileNav.classList.contains('active') && 
          !mobileNav.contains(event.target) && 
          !navToggle.contains(event.target)) {
        navToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
    });
  }
  
  /**
   * Adjust chart sizes for mobile
   * @private
   */
  _adjustChartSizes() {
    // Find all chart instances
    if (window.Chart && window.Chart.instances) {
      Object.values(window.Chart.instances).forEach(chart => {
        // Adjust chart options for mobile
        if (this.viewportWidth < this.breakpoints.medium) {
          // Reduce font sizes
          if (chart.options.scales && chart.options.scales.xAxes) {
            chart.options.scales.xAxes.forEach(axis => {
              if (axis.ticks) {
                axis.ticks.fontSize = 10;
              }
            });
          }
          
          if (chart.options.scales && chart.options.scales.yAxes) {
            chart.options.scales.yAxes.forEach(axis => {
              if (axis.ticks) {
                axis.ticks.fontSize = 10;
              }
            });
          }
          
          if (chart.options.legend && chart.options.legend.labels) {
            chart.options.legend.labels.fontSize = 10;
          }
          
          // Reduce padding
          if (chart.options.layout && chart.options.layout.padding) {
            chart.options.layout.padding = {
              left: 5,
              right: 5,
              top: 5,
              bottom: 5
            };
          }
          
          // Update chart
          chart.update();
        }
      });
    }
    
    // Adjust D3 charts
    const d3Charts = document.querySelectorAll('.d3-chart');
    d3Charts.forEach(chart => {
      if (this.viewportWidth < this.breakpoints.medium) {
        // Trigger resize event for D3 charts
        const event = new Event('resize');
        window.dispatchEvent(event);
      }
    });
  }
  
  /**
   * Simplify tables for mobile
   * @private
   */
  _simplifyTablesForMobile() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
      // Skip tables that are already mobile-friendly
      if (table.classList.contains('mobile-friendly')) return;
      
      // Add mobile-table class
      table.classList.add('mobile-table');
      
      // Get headers
      const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
      
      // Process each row
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        // Process each cell
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
          // Skip if already has data-label
          if (cell.hasAttribute('data-label')) return;
          
          // Add data-label attribute
          if (headers[index]) {
            cell.setAttribute('data-label', headers[index]);
          }
        });
      });
    });
  }
  
  /**
   * Optimize forms for mobile
   * @private
   */
  _optimizeForms() {
    // Adjust input sizes
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.classList.add('mobile-input');
    });
    
    // Adjust form layouts
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
      group.classList.add('mobile-form-group');
    });
    
    // Enhance select elements
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      select.classList.add('mobile-select');
    });
  }
  
  /**
   * Add mobile-specific features
   * @private
   */
  _addMobileSpecificFeatures() {
    // Add "Back to top" button
    this._addBackToTopButton();
    
    // Add swipe support for charts
    this._addSwipeSupport();
    
    // Add mobile-specific meta tags
    this._addMobileMetaTags();
  }
  
  /**
   * Add "Back to top" button
   * @private
   */
  _addBackToTopButton() {
    // Check if button already exists
    if (document.querySelector('.back-to-top')) return;
    
    // Create button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    
    // Add to document
    document.body.appendChild(backToTopButton);
    
    // Add scroll event
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // Add click event
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  /**
   * Add swipe support for charts and carousels
   * @private
   */
  _addSwipeSupport() {
    // Check if touch events are supported
    if (!('ontouchstart' in window)) return;
    
    // Add swipe detection to chart containers
    const swipeContainers = document.querySelectorAll('.chart-container, .carousel, .swipeable');
    
    swipeContainers.forEach(container => {
      let startX, startY, distX, distY;
      let startTime;
      const threshold = 150; // Minimum distance for swipe
      const restraint = 100; // Maximum perpendicular distance
      const allowedTime = 300; // Maximum time for swipe
      
      container.addEventListener('touchstart', (e) => {
        const touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
      }, { passive: true });
      
      container.addEventListener('touchend', (e) => {
        const touchObj = e.changedTouches[0];
        distX = touchObj.pageX - startX;
        distY = touchObj.pageY - startY;
        const elapsedTime = new Date().getTime() - startTime;
        
        // Check if swipe meets criteria
        if (elapsedTime <= allowedTime) {
          // Horizontal swipe
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
            // Right to left swipe
            if (distX < 0) {
              container.dispatchEvent(new CustomEvent('swipeleft'));
            }
            // Left to right swipe
            else {
              container.dispatchEvent(new CustomEvent('swiperight'));
            }
          }
          // Vertical swipe
          else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
            // Bottom to top swipe
            if (distY < 0) {
              container.dispatchEvent(new CustomEvent('swipeup'));
            }
            // Top to bottom swipe
            else {
              container.dispatchEvent(new CustomEvent('swipedown'));
            }
          }
        }
      }, { passive: true });
    });
  }
  
  /**
   * Add mobile-specific meta tags
   * @private
   */
  _addMobileMetaTags() {
    // Check if meta tags already exist
    if (document.querySelector('meta[name="theme-color"]')) return;
    
    // Add theme-color meta tag
    const themeColorMeta = document.createElement('meta');
    themeColorMeta.setAttribute('name', 'theme-color');
    themeColorMeta.setAttribute('content', '#2c3e50'); // Match primary color
    document.head.appendChild(themeColorMeta);
    
    // Add apple-mobile-web-app-capable meta tag
    const appleMobileWebAppMeta = document.createElement('meta');
    appleMobileWebAppMeta.setAttribute('name', 'apple-mobile-web-app-capable');
    appleMobileWebAppMeta.setAttribute('content', 'yes');
    document.head.appendChild(appleMobileWebAppMeta);
    
    // Add apple-mobile-web-app-status-bar-style meta tag
    const appleStatusBarMeta = document.createElement('meta');
    appleStatusBarMeta.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
    appleStatusBarMeta.setAttribute('content', 'black-translucent');
    document.head.appendChild(appleStatusBarMeta);
  }
}

export default MobileCompatibilityEnhancer;
