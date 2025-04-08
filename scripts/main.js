// Main JavaScript for Trump Tariff Analysis Website

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.classList.remove('active-section');
                if (section.id === targetId) {
                    section.classList.add('active-section');
                }
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('mobile-active')) {
                nav.classList.remove('mobile-active');
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('mobile-active');
    });

    // Tab functionality for alert configuration
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId + '-alerts') {
                    content.classList.add('active');
                }
            });
        });
    });

    // Range input value display
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    
    rangeInputs.forEach(input => {
        const valueDisplay = input.nextElementSibling;
        
        // Update value display on input change
        input.addEventListener('input', function() {
            if (this.id === 'movement-filter') {
                valueDisplay.textContent = this.value + '%';
            } else {
                valueDisplay.textContent = this.value;
            }
        });
    });

    // Trading Opportunities Filtering
    // Note: This functionality is now handled by filterFunctionality.js
    // This code is kept for reference but is disabled to avoid conflicts
    
    /*
    const sectorFilter = document.getElementById('sector-filter');
    const scoreFilter = document.getElementById('score-filter');
    const movementFilter = document.getElementById('movement-filter');
    const opportunitiesTable = document.querySelector('.opportunities-table tbody');
    
    // Function to filter trading opportunities
    function filterOpportunities() {
        if (!opportunitiesTable) return;
        
        const selectedSector = sectorFilter.value;
        const minScore = parseInt(scoreFilter.value);
        const minMovement = parseInt(movementFilter.value);
        
        // Get all rows in the opportunities table
        const rows = opportunitiesTable.querySelectorAll('tr');
        
        // Track if we found at least one matching row
        let foundMatch = false;
        let firstMatchSymbol = '';
        
        // Filter rows based on selected criteria
        rows.forEach(row => {
            const sector = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            const score = parseFloat(row.querySelector('td:nth-child(4)').textContent);
            const movement = parseFloat(row.querySelector('td:nth-child(7)').textContent);
            const symbol = row.querySelector('td:nth-child(1)').textContent;
            
            // Check if row matches filter criteria
            const sectorMatch = selectedSector === 'all' || sector.includes(selectedSector.toLowerCase());
            const scoreMatch = score >= minScore;
            const movementMatch = movement >= minMovement;
            
            // Show/hide row based on filter match
            if (sectorMatch && scoreMatch && movementMatch) {
                row.style.display = '';
                if (!foundMatch) {
                    foundMatch = true;
                    firstMatchSymbol = symbol;
                }
            } else {
                row.style.display = 'none';
            }
        });
        
        // Update stock detail section with first matching stock
        if (foundMatch) {
            updateStockDetail(firstMatchSymbol);
        }
    }
    
    // Function to update stock detail section
    function updateStockDetail(symbol) {
        const stockDetailTitle = document.querySelector('.stock-detail h3');
        if (!stockDetailTitle) return;
        
        // Find the row with the matching symbol
        const rows = opportunitiesTable.querySelectorAll('tr');
        let matchingRow = null;
        
        rows.forEach(row => {
            const rowSymbol = row.querySelector('td:nth-child(1)').textContent;
            if (rowSymbol === symbol) {
                matchingRow = row;
            }
        });
        
        if (matchingRow) {
            // Get stock details from the matching row
            const name = matchingRow.querySelector('td:nth-child(2)').textContent;
            const entryPrice = matchingRow.querySelector('td:nth-child(9)').textContent;
            const stopLoss = matchingRow.querySelector('td:nth-child(10)').textContent;
            const takeProfit = matchingRow.querySelector('td:nth-child(11)').textContent;
            const riskReward = matchingRow.querySelector('td:nth-child(12)').textContent;
            
            // Update stock detail title
            stockDetailTitle.textContent = `Stock Detail: ${name} (${symbol})`;
            
            // Update trading parameters
            const tradingParams = document.querySelectorAll('.detail-info .info-item .value');
            if (tradingParams.length >= 4) {
                tradingParams[0].textContent = entryPrice;
                tradingParams[1].textContent = stopLoss;
                tradingParams[2].textContent = takeProfit;
                tradingParams[3].textContent = riskReward;
            }
            
            // Update chart if needed
            // This would require additional implementation to update the chart data
        }
    }
    
    // Add event listeners for filter changes
    if (sectorFilter) {
        // sectorFilter.addEventListener('change', filterOpportunities);
    }
    
    if (scoreFilter) {
        // scoreFilter.addEventListener('input', filterOpportunities);
    }
    
    if (movementFilter) {
        // movementFilter.addEventListener('input', filterOpportunities);
    }
    */
    
    // Initial filtering on page load is now handled by filterFunctionality.js
    // filterOpportunities();

    // Form submissions
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Changes saved successfully!';
            
            this.appendChild(successMessage);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    });

    // Data persistence controls
    const exportBtn = document.querySelector('.export-btn');
    const importFile = document.querySelector('#import-file');
    const backupBtn = document.querySelector('.backup-btn');
    const restoreBtn = document.querySelector('.restore-btn');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('Data exported successfully!');
        });
    }
    
    if (importFile) {
        importFile.addEventListener('change', function() {
            if (this.files.length > 0) {
                alert('Data imported successfully!');
            }
        });
    }
    
    if (backupBtn) {
        backupBtn.addEventListener('click', function() {
            alert('Manual backup created successfully!');
        });
    }
    
    if (restoreBtn) {
        restoreBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to restore from the latest backup? This will overwrite current data.')) {
                alert('Data restored successfully!');
            }
        });
    }

    // Simulated data update
    function simulateDataUpdate() {
        console.log('Simulating data update...');
        
        // Update market indices
        const indices = document.querySelectorAll('.market-index');
        
        indices.forEach(index => {
            const changeElement = index.querySelector('.index-change');
            const currentChange = parseFloat(changeElement.textContent);
            
            // Random change between -0.5% and +0.5%
            const randomChange = (Math.random() - 0.5) * 0.5;
            const newChange = (currentChange + randomChange).toFixed(1);
            
            changeElement.textContent = newChange > 0 ? '+' + newChange + '%' : newChange + '%';
            
            // Update class based on change
            if (newChange > 0) {
                index.classList.add('up');
                index.classList.remove('down');
            } else {
                index.classList.add('down');
                index.classList.remove('up');
            }
        });
        
        // Schedule next update
        setTimeout(simulateDataUpdate, 60000); // Update every minute
    }
    
    // Start simulated data updates
    simulateDataUpdate();

    // Initialize data persistence
    initializeDataPersistence();
});

// Data Persistence Functionality
function initializeDataPersistence() {
    console.log('Initializing data persistence...');
    
    // Check if localStorage is available
    if (typeof(Storage) === "undefined") {
        console.error('LocalStorage is not supported by your browser');
        return;
    }
    
    // Set up automatic backup
    setupAutomaticBackup();
    
    // Load any saved preferences
    loadSavedPreferences();
}

function setupAutomaticBackup() {
    // Create a timestamp for this backup session
    const backupSessionId = Date.now();
    
    // Store the backup session ID
    localStorage.setItem('backup_session_id', backupSessionId.toString());
    
    // Set up periodic backup (every 5 minutes)
    setInterval(() => {
        // Check if we're still in the same session
        const currentSessionId = localStorage.getItem('backup_session_id');
        if (currentSessionId !== backupSessionId.toString()) {
            return;
        }
        
        // Perform backup
        const backupData = {
            timestamp: new Date().toISOString(),
            preferences: getSavedPreferences(),
            alerts: getSavedAlerts()
        };
        
        localStorage.setItem('automatic_backup', JSON.stringify(backupData));
        console.log(`Automatic backup completed at ${new Date().toLocaleTimeString()}`);
    }, 5 * 60 * 1000);
}

function loadSavedPreferences() {
    try {
        const preferences = localStorage.getItem('user_preferences');
        
        if (preferences) {
            const parsedPreferences = JSON.parse(preferences);
            
            // Apply saved preferences
            if (parsedPreferences.updateInterval) {
                document.getElementById('update-interval').value = parsedPreferences.updateInterval;
            }
            
            if (parsedPreferences.defaultView) {
                document.getElementById('default-view').value = parsedPreferences.defaultView;
            }
            
            if (parsedPreferences.enableNotifications !== undefined) {
                document.getElementById('enable-notifications').checked = parsedPreferences.enableNotifications;
            }
            
            if (parsedPreferences.darkMode !== undefined) {
                document.getElementById('dark-mode').checked = parsedPreferences.darkMode;
                
                if (parsedPreferences.darkMode) {
                    document.body.classList.add('dark-mode');
                }
            }
        }
    } catch (error) {
        console.error('Error loading saved preferences:', error);
    }
}

function getSavedPreferences() {
    try {
        const preferences = localStorage.getItem('user_preferences');
        return preferences ? JSON.parse(preferences) : {};
    } catch (error) {
        console.error('Error getting saved preferences:', error);
        return {};
    }
}

function getSavedAlerts() {
    try {
        const alerts = localStorage.getItem('user_alerts');
        return alerts ? JSON.parse(alerts) : [];
    } catch (error) {
        console.error('Error getting saved alerts:', error);
        return [];
    }
}

// Add event listener to save preferences form
document.addEventListener('DOMContentLoaded', function() {
    const preferencesForm = document.querySelector('.preferences-form');
    
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const updateInterval = document.getElementById('update-interval').value;
            const defaultView = document.getElementById('default-view').value;
            const enableNotifications = document.getElementById('enable-notifications').checked;
            const darkMode = document.getElementById('dark-mode').checked;
            
            // Save preferences to localStorage
            const preferences = {
                updateInterval,
                defaultView,
                enableNotifications,
                darkMode
            };
            
            localStorage.setItem('user_preferences', JSON.stringify(preferences));
            
            // Apply dark mode if selected
            if (darkMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Preferences saved successfully!';
            
            this.appendChild(successMessage);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
});
