/**
 * User Profiles and Preferences System for Trump Tariff Analysis Website
 * 
 * This module provides functionality for user profiles, saved preferences,
 * watchlists, and custom alert configurations.
 */

class UserProfileSystem {
  constructor() {
    this.currentUser = null;
    this.profiles = {};
    this.defaultPreferences = {
      layout: {
        darkMode: false,
        fontSize: 'medium',
        density: 'comfortable',
        panelLayout: '2-column'
      },
      dashboard: {
        panels: []
      },
      watchlist: [],
      alerts: [],
      analysisSettings: {
        defaultTimeframe: '3m',
        defaultRiskProfile: 'all',
        defaultSectors: 'all',
        tariffSensitivityThreshold: 5,
        movementPotentialThreshold: 5,
        volatilityThreshold: 20
      }
    };
    
    // Initialize
    this._initializeSystem();
  }
  
  /**
   * Initialize user profile system
   * @private
   */
  _initializeSystem() {
    // Load profiles from localStorage
    this._loadProfiles();
    
    // Register event listeners
    document.addEventListener('DOMContentLoaded', () => {
      this._setupProfileUI();
    });
  }
  
  /**
   * Load profiles from localStorage
   * @private
   */
  _loadProfiles() {
    const savedProfiles = localStorage.getItem('trumpTariffProfiles');
    if (savedProfiles) {
      try {
        this.profiles = JSON.parse(savedProfiles);
      } catch (error) {
        console.error('Error loading profiles:', error);
        this.profiles = {};
      }
    }
    
    // Load current user
    const currentUser = localStorage.getItem('trumpTariffCurrentUser');
    if (currentUser && this.profiles[currentUser]) {
      this.currentUser = currentUser;
    }
  }
  
  /**
   * Save profiles to localStorage
   * @private
   */
  _saveProfiles() {
    localStorage.setItem('trumpTariffProfiles', JSON.stringify(this.profiles));
    
    if (this.currentUser) {
      localStorage.setItem('trumpTariffCurrentUser', this.currentUser);
    } else {
      localStorage.removeItem('trumpTariffCurrentUser');
    }
  }
  
  /**
   * Setup profile UI
   * @private
   */
  _setupProfileUI() {
    // Create profile UI container
    const profileContainer = document.createElement('div');
    profileContainer.className = 'profile-container';
    profileContainer.innerHTML = `
      <div class="profile-toggle" id="profile-toggle">
        <i class="profile-icon">👤</i>
        <span class="profile-name">${this.currentUser || 'Guest'}</span>
      </div>
      <div class="profile-dropdown" id="profile-dropdown">
        <div class="profile-header">
          <h3>User Profile</h3>
          <button class="close-button" id="close-profile-dropdown">&times;</button>
        </div>
        <div class="profile-content">
          ${this._generateProfileContent()}
        </div>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(profileContainer);
    
    // Add event listeners
    document.getElementById('profile-toggle').addEventListener('click', () => {
      const dropdown = document.getElementById('profile-dropdown');
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    document.getElementById('close-profile-dropdown').addEventListener('click', () => {
      document.getElementById('profile-dropdown').style.display = 'none';
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.profile-container')) {
        const dropdown = document.getElementById('profile-dropdown');
        if (dropdown) {
          dropdown.style.display = 'none';
        }
      }
    });
    
    // Add event listeners for profile actions
    this._addProfileActionListeners();
  }
  
  /**
   * Generate profile content HTML
   * @returns {string} Profile content HTML
   * @private
   */
  _generateProfileContent() {
    if (this.currentUser) {
      // Logged in view
      return `
        <div class="current-profile">
          <div class="profile-info">
            <div class="profile-avatar">👤</div>
            <div class="profile-details">
              <div class="profile-username">${this.currentUser}</div>
              <div class="profile-last-login">Last login: ${new Date().toLocaleDateString()}</div>
            </div>
          </div>
          <div class="profile-actions">
            <button class="profile-action-button" id="edit-profile-button">Edit Profile</button>
            <button class="profile-action-button" id="manage-watchlist-button">Manage Watchlist</button>
            <button class="profile-action-button" id="configure-alerts-button">Configure Alerts</button>
            <button class="profile-action-button" id="save-layout-button">Save Current Layout</button>
            <button class="profile-action-button" id="reset-preferences-button">Reset Preferences</button>
            <button class="profile-action-button logout-button" id="logout-button">Logout</button>
          </div>
        </div>
      `;
    } else {
      // Login/Register view
      return `
        <div class="login-register">
          <div class="login-form">
            <h4>Login</h4>
            <div class="form-group">
              <label for="login-username">Username:</label>
              <input type="text" id="login-username" class="form-control" placeholder="Enter username">
            </div>
            <div class="form-group">
              <label for="login-password">Password:</label>
              <input type="password" id="login-password" class="form-control" placeholder="Enter password">
            </div>
            <button class="profile-action-button" id="login-button">Login</button>
          </div>
          <div class="register-form">
            <h4>Register</h4>
            <div class="form-group">
              <label for="register-username">Username:</label>
              <input type="text" id="register-username" class="form-control" placeholder="Choose username">
            </div>
            <div class="form-group">
              <label for="register-password">Password:</label>
              <input type="password" id="register-password" class="form-control" placeholder="Choose password">
            </div>
            <div class="form-group">
              <label for="register-confirm-password">Confirm Password:</label>
              <input type="password" id="register-confirm-password" class="form-control" placeholder="Confirm password">
            </div>
            <button class="profile-action-button" id="register-button">Register</button>
          </div>
          <div class="guest-option">
            <button class="profile-action-button" id="continue-as-guest-button">Continue as Guest</button>
            <p class="guest-note">Note: Guest preferences will be saved locally but not synced across devices.</p>
          </div>
        </div>
      `;
    }
  }
  
  /**
   * Add event listeners for profile actions
   * @private
   */
  _addProfileActionListeners() {
    // Wait for elements to be available
    setTimeout(() => {
      if (this.currentUser) {
        // Logged in actions
        document.getElementById('edit-profile-button').addEventListener('click', () => {
          this._showEditProfileForm();
        });
        
        document.getElementById('manage-watchlist-button').addEventListener('click', () => {
          this._showWatchlistManager();
        });
        
        document.getElementById('configure-alerts-button').addEventListener('click', () => {
          this._showAlertConfigurator();
        });
        
        document.getElementById('save-layout-button').addEventListener('click', () => {
          this.saveCurrentLayout();
        });
        
        document.getElementById('reset-preferences-button').addEventListener('click', () => {
          this.resetPreferences();
        });
        
        document.getElementById('logout-button').addEventListener('click', () => {
          this.logout();
        });
      } else {
        // Login/Register actions
        document.getElementById('login-button').addEventListener('click', () => {
          const username = document.getElementById('login-username').value;
          const password = document.getElementById('login-password').value;
          this.login(username, password);
        });
        
        document.getElementById('register-button').addEventListener('click', () => {
          const username = document.getElementById('register-username').value;
          const password = document.getElementById('register-password').value;
          const confirmPassword = document.getElementById('register-confirm-password').value;
          this.register(username, password, confirmPassword);
        });
        
        document.getElementById('continue-as-guest-button').addEventListener('click', () => {
          this.continueAsGuest();
        });
      }
    }, 100);
  }
  
  /**
   * Show edit profile form
   * @private
   */
  _showEditProfileForm() {
    // Create modal
    const modal = this._createModal('Edit Profile');
    
    // Get current profile
    const profile = this.profiles[this.currentUser];
    
    // Create form content
    modal.querySelector('.modal-content').innerHTML = `
      <div class="edit-profile-form">
        <div class="form-group">
          <label for="edit-username">Username:</label>
          <input type="text" id="edit-username" class="form-control" value="${this.currentUser}" disabled>
          <small class="form-note">Username cannot be changed</small>
        </div>
        <div class="form-group">
          <label for="edit-password">New Password:</label>
          <input type="password" id="edit-password" class="form-control" placeholder="Enter new password">
          <small class="form-note">Leave blank to keep current password</small>
        </div>
        <div class="form-group">
          <label for="edit-confirm-password">Confirm New Password:</label>
          <input type="password" id="edit-confirm-password" class="form-control" placeholder="Confirm new password">
        </div>
        <div class="form-actions">
          <button class="form-button save-button" id="save-profile-button">Save Changes</button>
          <button class="form-button cancel-button" id="cancel-edit-profile">Cancel</button>
        </div>
      </div>
    `;
    
    // Add event listeners
    document.getElementById('save-profile-button').addEventListener('click', () => {
      const newPassword = document.getElementById('edit-password').value;
      const confirmPassword = document.getElementById('edit-confirm-password').value;
      
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          this._showNotification('Passwords do not match', 'error');
          return;
        }
        
        // Update password
        profile.password = newPassword;
        this._saveProfiles();
        this._showNotification('Profile updated successfully');
      }
      
      this._closeModal(modal);
    });
    
    document.getElementById('cancel-edit-profile').addEventListener('click', () => {
      this._closeModal(modal);
    });
  }
  
  /**
   * Show watchlist manager
   * @private
   */
  _showWatchlistManager() {
    // Create modal
    const modal = this._createModal('Manage Watchlist');
    
    // Get current profile
    const profile = this.profiles[this.currentUser];
    const watchlist = profile.preferences.watchlist || [];
    
    // Create watchlist content
    let watchlistHTML = '';
    
    if (watchlist.length > 0) {
      watchlistHTML = `
        <div class="watchlist-items">
          ${watchlist.map((item, index) => `
            <div class="watchlist-item">
              <div class="watchlist-item-info">
                <div class="watchlist-item-symbol">${item.symbol}</div>
                <div class="watchlist-item-name">${item.name}</div>
              </div>
              <button class="remove-watchlist-item" data-index="${index}">&times;</button>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      watchlistHTML = `
        <div class="empty-watchlist">
          <p>Your watchlist is empty. Add stocks to track them easily.</p>
        </div>
      `;
    }
    
    // Create form content
    modal.querySelector('.modal-content').innerHTML = `
      <div class="watchlist-manager">
        <div class="watchlist-current">
          <h4>Current Watchlist</h4>
          ${watchlistHTML}
        </div>
        <div class="watchlist-add">
          <h4>Add to Watchlist</h4>
          <div class="form-group">
            <label for="watchlist-stock">Stock:</label>
            <select id="watchlist-stock" class="form-control">
              <option value="">Select a stock...</option>
              <!-- Stock options would be populated dynamically -->
              <option value="BHP.AX">BHP.AX - BHP Group</option>
              <option value="CBA.AX">CBA.AX - Commonwealth Bank</option>
              <option value="WBC.AX">WBC.AX - Westpac Banking</option>
              <option value="NAB.AX">NAB.AX - National Australia Bank</option>
              <option value="CSL.AX">CSL.AX - CSL Limited</option>
            </select>
          </div>
          <button class="form-button add-button" id="add-to-watchlist-button">Add to Watchlist</button>
        </div>
        <div class="form-actions">
          <button class="form-button save-button" id="save-watchlist-button">Save Changes</button>
          <button class="form-button cancel-button" id="cancel-watchlist">Cancel</button>
        </div>
      </div>
    `;
    
    // Add event listeners
    document.getElementById('add-to-watchlist-button').addEventListener('click', () => {
      const stockSelect = document.getElementById('watchlist-stock');
      const stockValue = stockSelect.value;
      const stockText = stockSelect.options[stockSelect.selectedIndex].text;
      
      if (!stockValue) {
        this._showNotification('Please select a stock', 'warning');
        return;
      }
      
      // Check if already in watchlist
      if (watchlist.some(item => item.symbol === stockValue)) {
        this._showNotification('Stock already in watchlist', 'warning');
        return;
      }
      
      // Add to watchlist
      const [symbol, name] = stockText.split(' - ');
      watchlist.push({ symbol, name });
      
      // Update UI
      this._showWatchlistManager();
    });
    
    // Add remove button listeners
    document.querySelectorAll('.remove-watchlist-item').forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'));
        watchlist.splice(index, 1);
        
        // Update UI
        this._showWatchlistManager();
      });
    });
    
    document.getElementById('save-watchlist-button').addEventListener('click', () => {
      // Save watchlist to profile
      profile.preferences.watchlist = watchlist;
      this._saveProfiles();
      this._showNotification('Watchlist saved successfully');
      this._closeModal(modal);
    });
    
    document.getElementById('cancel-watchlist').addEventListener('click', () => {
      this._closeModal(modal);
    });
  }
  
  /**
   * Show alert configurator
   * @private
   */
  _showAlertConfigurator() {
    // Create modal
    const modal = this._createModal('Configure Alerts');
    
    // Get current profile
    const profile = this.profiles[this.currentUser];
    const alerts = profile.preferences.alerts || [];
    
    // Create alerts content
    let alertsHTML = '';
    
    if (alerts.length > 0) {
      alertsHTML = `
        <div class="alert-items">
          ${alerts.map((alert, index) => `
            <div class="alert-item">
              <div class="alert-item-info">
                <div class="alert-item-symbol">${alert.symbol}</div>
                <div class="alert-item-condition">
                  ${alert.condition === 'above' ? '>' : '<'} $${alert.price.toFixed(2)}
                </div>
                <div class="alert-item-priority ${alert.priority}">${alert.priority}</div>
              </div>
              <button class="remove-alert-item" data-index="${index}">&times;</button>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      alertsHTML = `
        <div class="empty-alerts">
          <p>You have no alerts configured. Add alerts to be notified of price movements.</p>
        </div>
      `;
    }
    
    // Create form content
    modal.querySelector('.modal-content').innerHTML = `
      <div class="alert-configurator">
        <div class="alerts-current">
          <h4>Current Alerts</h4>
          ${alertsHTML}
        </div>
        <div class="alert-add">
          <h4>Add New Alert</h4>
          <div class="form-group">
            <label for="alert-stock">Stock:</label>
            <select id="alert-stock" class="form-control">
              <option value="">Select a stock...</option>
              <!-- Stock options would be populated dynamically -->
              <option value="BHP.AX">BHP.AX - BHP Group</option>
              <option value="CBA.AX">CBA.AX - Commonwealth Bank</option>
              <option value="WBC.AX">WBC.AX - Westpac Banking</option>
              <option value="NAB.AX">NAB.AX - National Australia Bank</option>
              <option value="CSL.AX">CSL.AX - CSL Limited</option>
            </select>
          </div>
          <div class="form-group">
            <label for="alert-condition">Condition:</label>
            <select id="alert-condition" class="form-control">
              <option value="above">Price Above</option>
              <option value="below">Price Below</option>
            </select>
          </div>
          <div class="form-group">
            <label for="alert-price">Price:</label>
            <input type="number" id="alert-price" class="form-control" step="0.01" min="0" placeholder="Enter price">
          </div>
          <div class="form-group">
            <label for="alert-priority">Priority:</label>
            <select id="alert-priority" class="form-control">
              <option value="high">High</option>
              <option value="medium" selected>Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <button class="form-button add-button" id="add-alert-button">Add Alert</button>
        </div>
        <div class="form-actions">
          <button class="form-button save-button" id="save-alerts-button">Save Changes</button>
          <button class="form-button cancel-button" id="cancel-alerts">Cancel</button>
        </div>
      </div>
    `;
    
    // Add event listeners
    document.getElementById('add-alert-button').addEventListener('click', () => {
      const stockSelect = document.getElementById('alert-stock');
      const stockValue = stockSelect.value;
      const stockText = stockSelect.options[stockSelect.selectedIndex].text;
      const condition = document.getElementById('alert-condition').value;
      const price = parseFloat(document.getElementById('alert-price').value);
      const priority = document.getElementById('alert-priority').value;
      
      if (!stockValue) {
        this._showNotification('Please select a stock', 'warning');
        return;
      }
      
      if (isNaN(price) || price <= 0) {
        this._showNotification('Please enter a valid price', 'warning');
        return;
      }
      
      // Add to alerts
      const [symbol] = stockText.split(' - ');
      alerts.push({ symbol, condition, price, priority });
      
      // Update UI
      this._showAlertConfigurator();
    });
    
    // Add remove button listeners
    document.querySelectorAll('.remove-alert-item').forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'));
        alerts.splice(index, 1);
        
        // Update UI
        this._showAlertConfigurator();
      });
    });
    
    document.getElementById('save-alerts-button').addEventListener('click', () => {
      // Save alerts to profile
      profile.preferences.alerts = alerts;
      this._saveProfiles();
      this._showNotification('Alerts saved successfully');
      this._closeModal(modal);
    });
    
    document.getElementById('cancel-alerts').addEventListener('click', () => {
      this._closeModal(modal);
    });
  }
  
  /**
   * Create modal
   * @param {string} title - Modal title
   * @returns {HTMLElement} Modal element
   * @private
   */
  _createModal(title) {
    // Remove any existing modals
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
      document.body.removeChild(existingModal);
    }
    
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="close-button" id="close-modal">&times;</button>
        </div>
        <div class="modal-content"></div>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add close button event listener
    document.getElementById('close-modal').addEventListener('click', () => {
      this._closeModal(modal);
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this._closeModal(modal);
      }
    });
    
    return modal;
  }
  
  /**
   * Close modal
   * @param {HTMLElement} modal - Modal element
   * @private
   */
  _closeModal(modal) {
    document.body.removeChild(modal);
  }
  
  /**
   * Show notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type
   * @private
   */
  _showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Hide and remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  /**
   * Login user
   * @param {string} username - Username
   * @param {string} password - Password
   */
  login(username, password) {
    if (!username || !password) {
      this._showNotification('Please enter username and password', 'warning');
      return;
    }
    
    // Check if profile exists
    if (!this.profiles[username]) {
      this._showNotification('User not found', 'error');
      return;
    }
    
    // Check password
    if (this.profiles[username].password !== password) {
      this._showNotification('Incorrect password', 'error');
      return;
    }
    
    // Set current user
    this.currentUser = username;
    this._saveProfiles();
    
    // Apply user preferences
    this._applyUserPreferences();
    
    // Update UI
    this._updateProfileUI();
    
    // Show success notification
    this._showNotification(`Welcome back, ${username}!`);
    
    // Close dropdown
    document.getElementById('profile-dropdown').style.display = 'none';
  }
  
  /**
   * Register new user
   * @param {string} username - Username
   * @param {string} password - Password
   * @param {string} confirmPassword - Confirm password
   */
  register(username, password, confirmPassword) {
    if (!username || !password || !confirmPassword) {
      this._showNotification('Please fill all fields', 'warning');
      return;
    }
    
    if (password !== confirmPassword) {
      this._showNotification('Passwords do not match', 'error');
      return;
    }
    
    // Check if username already exists
    if (this.profiles[username]) {
      this._showNotification('Username already exists', 'error');
      return;
    }
    
    // Create new profile
    this.profiles[username] = {
      password: password,
      preferences: JSON.parse(JSON.stringify(this.defaultPreferences)),
      created: new Date().toISOString()
    };
    
    // Set as current user
    this.currentUser = username;
    this._saveProfiles();
    
    // Apply user preferences
    this._applyUserPreferences();
    
    // Update UI
    this._updateProfileUI();
    
    // Show success notification
    this._showNotification(`Welcome, ${username}! Your account has been created.`);
    
    // Close dropdown
    document.getElementById('profile-dropdown').style.display = 'none';
  }
  
  /**
   * Continue as guest
   */
  continueAsGuest() {
    // Create guest profile if not exists
    if (!this.profiles['guest']) {
      this.profiles['guest'] = {
        password: '',
        preferences: JSON.parse(JSON.stringify(this.defaultPreferences)),
        created: new Date().toISOString()
      };
    }
    
    // Set as current user
    this.currentUser = 'guest';
    this._saveProfiles();
    
    // Apply user preferences
    this._applyUserPreferences();
    
    // Update UI
    this._updateProfileUI();
    
    // Show success notification
    this._showNotification('Continuing as guest. Preferences will be saved locally.');
    
    // Close dropdown
    document.getElementById('profile-dropdown').style.display = 'none';
  }
  
  /**
   * Logout user
   */
  logout() {
    // Clear current user
    this.currentUser = null;
    localStorage.removeItem('trumpTariffCurrentUser');
    
    // Reset to default preferences
    this._resetToDefaultPreferences();
    
    // Update UI
    this._updateProfileUI();
    
    // Show success notification
    this._showNotification('You have been logged out');
    
    // Close dropdown
    document.getElementById('profile-dropdown').style.display = 'none';
  }
  
  /**
   * Update profile UI
   * @private
   */
  _updateProfileUI() {
    // Update profile toggle
    const profileName = document.querySelector('.profile-name');
    if (profileName) {
      profileName.textContent = this.currentUser || 'Guest';
    }
    
    // Update dropdown content
    const profileContent = document.querySelector('.profile-content');
    if (profileContent) {
      profileContent.innerHTML = this._generateProfileContent();
      this._addProfileActionListeners();
    }
  }
  
  /**
   * Apply user preferences
   * @private
   */
  _applyUserPreferences() {
    if (!this.currentUser) return;
    
    const preferences = this.profiles[this.currentUser].preferences;
    
    // Apply layout preferences
    if (preferences.layout) {
      // Apply dark mode
      if (preferences.layout.darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      
      // Apply font size
      document.documentElement.style.setProperty('--font-size-multiplier', this._getFontSizeMultiplier(preferences.layout.fontSize));
      
      // Apply density
      document.documentElement.style.setProperty('--spacing-multiplier', this._getSpacingMultiplier(preferences.layout.density));
      
      // Apply panel layout
      const panelContainer = document.getElementById('panel-container');
      if (panelContainer) {
        panelContainer.className = 'panel-container';
        panelContainer.classList.add(`layout-${preferences.layout.panelLayout}`);
      }
    }
    
    // Apply dashboard preferences
    if (preferences.dashboard && preferences.dashboard.panels) {
      // Implementation would depend on dashboard structure
    }
    
    // Dispatch event for other components to apply preferences
    const event = new CustomEvent('userPreferencesApplied', { detail: preferences });
    document.dispatchEvent(event);
  }
  
  /**
   * Get font size multiplier based on settings
   * @param {string} fontSize - Font size setting
   * @returns {string} Font size multiplier
   * @private
   */
  _getFontSizeMultiplier(fontSize) {
    switch (fontSize) {
      case 'small':
        return '0.85';
      case 'large':
        return '1.15';
      case 'medium':
      default:
        return '1';
    }
  }
  
  /**
   * Get spacing multiplier based on settings
   * @param {string} density - Density setting
   * @returns {string} Spacing multiplier
   * @private
   */
  _getSpacingMultiplier(density) {
    switch (density) {
      case 'compact':
        return '0.85';
      case 'spacious':
        return '1.15';
      case 'comfortable':
      default:
        return '1';
    }
  }
  
  /**
   * Reset to default preferences
   * @private
   */
  _resetToDefaultPreferences() {
    // Apply default preferences
    document.body.classList.remove('dark-mode');
    document.documentElement.style.setProperty('--font-size-multiplier', '1');
    document.documentElement.style.setProperty('--spacing-multiplier', '1');
    
    // Reset panel layout
    const panelContainer = document.getElementById('panel-container');
    if (panelContainer) {
      panelContainer.className = 'panel-container';
      panelContainer.classList.add('layout-2-column');
    }
    
    // Dispatch event for other components to reset preferences
    const event = new CustomEvent('userPreferencesReset');
    document.dispatchEvent(event);
  }
  
  /**
   * Save current layout
   */
  saveCurrentLayout() {
    if (!this.currentUser) {
      this._showNotification('Please login to save layout', 'warning');
      return;
    }
    
    // Get current layout settings
    const layoutSettings = {
      darkMode: document.body.classList.contains('dark-mode'),
      fontSize: document.documentElement.style.getPropertyValue('--font-size-multiplier') === '0.85' ? 'small' :
                document.documentElement.style.getPropertyValue('--font-size-multiplier') === '1.15' ? 'large' : 'medium',
      density: document.documentElement.style.getPropertyValue('--spacing-multiplier') === '0.85' ? 'compact' :
               document.documentElement.style.getPropertyValue('--spacing-multiplier') === '1.15' ? 'spacious' : 'comfortable',
      panelLayout: '2-column' // Default
    };
    
    // Get panel layout
    const panelContainer = document.getElementById('panel-container');
    if (panelContainer) {
      if (panelContainer.classList.contains('layout-1-column')) {
        layoutSettings.panelLayout = '1-column';
      } else if (panelContainer.classList.contains('layout-3-column')) {
        layoutSettings.panelLayout = '3-column';
      } else if (panelContainer.classList.contains('layout-grid')) {
        layoutSettings.panelLayout = 'grid';
      }
    }
    
    // Get panel configurations
    const panelConfigs = [];
    if (panelContainer) {
      const panels = panelContainer.querySelectorAll('.content-panel');
      panels.forEach(panel => {
        const panelId = panel.id.replace('panel-', '');
        const contentSelect = panel.querySelector('.content-select');
        const contentType = contentSelect ? contentSelect.value : 'unknown';
        
        panelConfigs.push({
          id: panelId,
          contentType: contentType,
          position: {
            // In a real implementation, this would include position and size
            column: 0,
            row: 0,
            width: 1,
            height: 1
          }
        });
      });
    }
    
    // Save to profile
    const profile = this.profiles[this.currentUser];
    profile.preferences.layout = layoutSettings;
    profile.preferences.dashboard.panels = panelConfigs;
    this._saveProfiles();
    
    // Show success notification
    this._showNotification('Layout saved successfully');
  }
  
  /**
   * Reset preferences
   */
  resetPreferences() {
    if (!this.currentUser) {
      this._showNotification('Please login to reset preferences', 'warning');
      return;
    }
    
    // Confirm reset
    if (confirm('Are you sure you want to reset all preferences to default?')) {
      // Reset preferences to default
      this.profiles[this.currentUser].preferences = JSON.parse(JSON.stringify(this.defaultPreferences));
      this._saveProfiles();
      
      // Apply default preferences
      this._resetToDefaultPreferences();
      
      // Show success notification
      this._showNotification('Preferences reset to default');
    }
  }
  
  /**
   * Get user preferences
   * @returns {Object} User preferences
   */
  getUserPreferences() {
    if (!this.currentUser) {
      return this.defaultPreferences;
    }
    
    return this.profiles[this.currentUser].preferences;
  }
  
  /**
   * Update user preferences
   * @param {Object} preferences - New preferences
   */
  updateUserPreferences(preferences) {
    if (!this.currentUser) {
      this._showNotification('Please login to save preferences', 'warning');
      return;
    }
    
    // Update preferences
    this.profiles[this.currentUser].preferences = {
      ...this.profiles[this.currentUser].preferences,
      ...preferences
    };
    
    // Save profiles
    this._saveProfiles();
    
    // Apply updated preferences
    this._applyUserPreferences();
    
    // Show success notification
    this._showNotification('Preferences updated successfully');
  }
  
  /**
   * Get user watchlist
   * @returns {Array} User watchlist
   */
  getUserWatchlist() {
    if (!this.currentUser) {
      return [];
    }
    
    return this.profiles[this.currentUser].preferences.watchlist || [];
  }
  
  /**
   * Get user alerts
   * @returns {Array} User alerts
   */
  getUserAlerts() {
    if (!this.currentUser) {
      return [];
    }
    
    return this.profiles[this.currentUser].preferences.alerts || [];
  }
  
  /**
   * Check if stock is in watchlist
   * @param {string} symbol - Stock symbol
   * @returns {boolean} True if stock is in watchlist
   */
  isInWatchlist(symbol) {
    const watchlist = this.getUserWatchlist();
    return watchlist.some(item => item.symbol === symbol);
  }
  
  /**
   * Add stock to watchlist
   * @param {string} symbol - Stock symbol
   * @param {string} name - Stock name
   */
  addToWatchlist(symbol, name) {
    if (!this.currentUser) {
      this._showNotification('Please login to add to watchlist', 'warning');
      return;
    }
    
    // Check if already in watchlist
    if (this.isInWatchlist(symbol)) {
      this._showNotification('Stock already in watchlist', 'warning');
      return;
    }
    
    // Add to watchlist
    const profile = this.profiles[this.currentUser];
    if (!profile.preferences.watchlist) {
      profile.preferences.watchlist = [];
    }
    
    profile.preferences.watchlist.push({ symbol, name });
    this._saveProfiles();
    
    // Show success notification
    this._showNotification(`${symbol} added to watchlist`);
  }
  
  /**
   * Remove stock from watchlist
   * @param {string} symbol - Stock symbol
   */
  removeFromWatchlist(symbol) {
    if (!this.currentUser) {
      this._showNotification('Please login to remove from watchlist', 'warning');
      return;
    }
    
    // Remove from watchlist
    const profile = this.profiles[this.currentUser];
    if (!profile.preferences.watchlist) {
      return;
    }
    
    const index = profile.preferences.watchlist.findIndex(item => item.symbol === symbol);
    if (index !== -1) {
      profile.preferences.watchlist.splice(index, 1);
      this._saveProfiles();
      
      // Show success notification
      this._showNotification(`${symbol} removed from watchlist`);
    }
  }
  
  /**
   * Add alert
   * @param {string} symbol - Stock symbol
   * @param {string} condition - Alert condition
   * @param {number} price - Alert price
   * @param {string} priority - Alert priority
   */
  addAlert(symbol, condition, price, priority) {
    if (!this.currentUser) {
      this._showNotification('Please login to add alert', 'warning');
      return;
    }
    
    // Add alert
    const profile = this.profiles[this.currentUser];
    if (!profile.preferences.alerts) {
      profile.preferences.alerts = [];
    }
    
    profile.preferences.alerts.push({ symbol, condition, price, priority });
    this._saveProfiles();
    
    // Show success notification
    this._showNotification(`Alert added for ${symbol}`);
  }
  
  /**
   * Remove alert
   * @param {number} index - Alert index
   */
  removeAlert(index) {
    if (!this.currentUser) {
      this._showNotification('Please login to remove alert', 'warning');
      return;
    }
    
    // Remove alert
    const profile = this.profiles[this.currentUser];
    if (!profile.preferences.alerts || index >= profile.preferences.alerts.length) {
      return;
    }
    
    const symbol = profile.preferences.alerts[index].symbol;
    profile.preferences.alerts.splice(index, 1);
    this._saveProfiles();
    
    // Show success notification
    this._showNotification(`Alert removed for ${symbol}`);
  }
}

export default UserProfileSystem;
