/**
 * Push Notification System for Trump Tariff Analysis Website
 * 
 * This module implements a push notification system for alerting users
 * about market movements, prediction updates, and trading opportunities.
 */

class PushNotificationSystem {
  constructor() {
    this.isSubscribed = false;
    this.swRegistration = null;
    this.applicationServerPublicKey = 'BLceSSynHW5gM5W8-qFKLCgNYl0opvUgAysKXCrHXxqsJMcCpTfGPYoJwVmrSL4zQQWBDKvqxaGNGhD7JkXxnrM';
    this.notificationPreferences = {
      marketMovements: true,
      predictionUpdates: true,
      tradingOpportunities: true,
      tariffNews: true,
      technicalAlerts: true,
      priority: 'high' // 'all', 'high', 'critical'
    };
    
    // Initialize
    this._initialize();
  }
  
  /**
   * Initialize push notification system
   * @private
   */
  _initialize() {
    // Check if service workers and push messaging are supported
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push are supported');
      
      // Register event listeners
      document.addEventListener('DOMContentLoaded', () => {
        this._setupUI();
        this._registerServiceWorker();
      });
    } else {
      console.warn('Push messaging is not supported');
      this._showNotSupportedMessage();
    }
  }
  
  /**
   * Set up UI
   * @private
   */
  _setupUI() {
    // Check if notification container exists
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    // Create notification UI
    this._createNotificationUI(container);
  }
  
  /**
   * Create notification UI
   * @param {HTMLElement} container - Container element
   * @private
   */
  _createNotificationUI(container) {
    container.innerHTML = `
      <div class="notification-header">
        <h2>Push Notifications</h2>
        <p class="notification-description">Receive alerts about market movements, prediction updates, and trading opportunities</p>
      </div>
      
      <div class="notification-status">
        <div class="status-indicator ${this.isSubscribed ? 'subscribed' : 'unsubscribed'}">
          <div class="status-icon"></div>
          <div class="status-text">${this.isSubscribed ? 'Notifications Enabled' : 'Notifications Disabled'}</div>
        </div>
        <button id="notification-toggle" class="notification-toggle-button ${this.isSubscribed ? 'unsubscribe' : 'subscribe'}">
          ${this.isSubscribed ? 'Disable Notifications' : 'Enable Notifications'}
        </button>
      </div>
      
      <div class="notification-preferences">
        <h3>Notification Preferences</h3>
        <div class="preference-list">
          <div class="preference-item">
            <label for="market-movements">
              <input type="checkbox" id="market-movements" ${this.notificationPreferences.marketMovements ? 'checked' : ''}>
              Market Movements
            </label>
            <span class="preference-description">Alerts for significant market index movements</span>
          </div>
          <div class="preference-item">
            <label for="prediction-updates">
              <input type="checkbox" id="prediction-updates" ${this.notificationPreferences.predictionUpdates ? 'checked' : ''}>
              Prediction Updates
            </label>
            <span class="preference-description">Notifications when stock predictions are updated</span>
          </div>
          <div class="preference-item">
            <label for="trading-opportunities">
              <input type="checkbox" id="trading-opportunities" ${this.notificationPreferences.tradingOpportunities ? 'checked' : ''}>
              Trading Opportunities
            </label>
            <span class="preference-description">Alerts for new high-conviction trading opportunities</span>
          </div>
          <div class="preference-item">
            <label for="tariff-news">
              <input type="checkbox" id="tariff-news" ${this.notificationPreferences.tariffNews ? 'checked' : ''}>
              Tariff News
            </label>
            <span class="preference-description">Breaking news about tariff developments</span>
          </div>
          <div class="preference-item">
            <label for="technical-alerts">
              <input type="checkbox" id="technical-alerts" ${this.notificationPreferences.technicalAlerts ? 'checked' : ''}>
              Technical Alerts
            </label>
            <span class="preference-description">Alerts when stocks trigger technical indicators</span>
          </div>
        </div>
        
        <div class="priority-setting">
          <h4>Alert Priority Level</h4>
          <div class="priority-options">
            <label for="priority-all">
              <input type="radio" name="priority" id="priority-all" value="all" ${this.notificationPreferences.priority === 'all' ? 'checked' : ''}>
              All Alerts
            </label>
            <label for="priority-high">
              <input type="radio" name="priority" id="priority-high" value="high" ${this.notificationPreferences.priority === 'high' ? 'checked' : ''}>
              High Priority Only
            </label>
            <label for="priority-critical">
              <input type="radio" name="priority" id="priority-critical" value="critical" ${this.notificationPreferences.priority === 'critical' ? 'checked' : ''}>
              Critical Alerts Only
            </label>
          </div>
        </div>
        
        <button id="save-preferences" class="save-preferences-button">Save Preferences</button>
      </div>
      
      <div class="notification-history">
        <h3>Recent Notifications</h3>
        <div class="history-list" id="notification-history-list">
          ${this._generateNotificationHistory()}
        </div>
      </div>
      
      <div class="notification-test">
        <h3>Test Notifications</h3>
        <p>Send a test notification to verify your setup:</p>
        <button id="test-notification" class="test-notification-button">Send Test Notification</button>
      </div>
    `;
    
    // Add event listeners
    this._addEventListeners();
  }
  
  /**
   * Add event listeners
   * @private
   */
  _addEventListeners() {
    // Toggle notification subscription
    const toggleButton = document.getElementById('notification-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        if (this.isSubscribed) {
          this._unsubscribeUser();
        } else {
          this._subscribeUser();
        }
      });
    }
    
    // Save preferences
    const saveButton = document.getElementById('save-preferences');
    if (saveButton) {
      saveButton.addEventListener('click', () => {
        this._savePreferences();
      });
    }
    
    // Test notification
    const testButton = document.getElementById('test-notification');
    if (testButton) {
      testButton.addEventListener('click', () => {
        this._sendTestNotification();
      });
    }
    
    // Preference checkboxes
    const checkboxes = [
      document.getElementById('market-movements'),
      document.getElementById('prediction-updates'),
      document.getElementById('trading-opportunities'),
      document.getElementById('tariff-news'),
      document.getElementById('technical-alerts')
    ];
    
    checkboxes.forEach(checkbox => {
      if (checkbox) {
        checkbox.addEventListener('change', () => {
          this._updatePreferenceState();
        });
      }
    });
    
    // Priority radio buttons
    const radioButtons = [
      document.getElementById('priority-all'),
      document.getElementById('priority-high'),
      document.getElementById('priority-critical')
    ];
    
    radioButtons.forEach(radio => {
      if (radio) {
        radio.addEventListener('change', () => {
          this._updatePreferenceState();
        });
      }
    });
  }
  
  /**
   * Register service worker
   * @private
   */
  _registerServiceWorker() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(swReg => {
        console.log('Service Worker is registered', swReg);
        this.swRegistration = swReg;
        
        // Check if already subscribed
        this._checkSubscription();
      })
      .catch(error => {
        console.error('Service Worker Error', error);
      });
  }
  
  /**
   * Check subscription status
   * @private
   */
  _checkSubscription() {
    if (!this.swRegistration) return;
    
    this.swRegistration.pushManager.getSubscription()
      .then(subscription => {
        this.isSubscribed = !(subscription === null);
        
        if (this.isSubscribed) {
          console.log('User IS subscribed.');
          this._updateSubscriptionUI();
        } else {
          console.log('User is NOT subscribed.');
          this._updateSubscriptionUI();
        }
      });
  }
  
  /**
   * Subscribe user to push notifications
   * @private
   */
  _subscribeUser() {
    if (!this.swRegistration) return;
    
    const applicationServerKey = this._urlB64ToUint8Array(this.applicationServerPublicKey);
    
    this.swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
      .then(subscription => {
        console.log('User is subscribed:', subscription);
        
        // Send subscription to server
        this._sendSubscriptionToServer(subscription);
        
        this.isSubscribed = true;
        this._updateSubscriptionUI();
      })
      .catch(error => {
        console.error('Failed to subscribe the user: ', error);
        this._updateSubscriptionUI();
      });
  }
  
  /**
   * Unsubscribe user from push notifications
   * @private
   */
  _unsubscribeUser() {
    if (!this.swRegistration) return;
    
    this.swRegistration.pushManager.getSubscription()
      .then(subscription => {
        if (subscription) {
          return subscription.unsubscribe();
        }
      })
      .catch(error => {
        console.error('Error unsubscribing', error);
      })
      .then(() => {
        // Remove subscription from server
        this._removeSubscriptionFromServer();
        
        console.log('User is unsubscribed.');
        this.isSubscribed = false;
        this._updateSubscriptionUI();
      });
  }
  
  /**
   * Update subscription UI
   * @private
   */
  _updateSubscriptionUI() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    const toggleButton = document.getElementById('notification-toggle');
    
    if (statusIndicator) {
      statusIndicator.className = `status-indicator ${this.isSubscribed ? 'subscribed' : 'unsubscribed'}`;
    }
    
    if (statusText) {
      statusText.textContent = this.isSubscribed ? 'Notifications Enabled' : 'Notifications Disabled';
    }
    
    if (toggleButton) {
      toggleButton.textContent = this.isSubscribed ? 'Disable Notifications' : 'Enable Notifications';
      toggleButton.className = `notification-toggle-button ${this.isSubscribed ? 'unsubscribe' : 'subscribe'}`;
    }
  }
  
  /**
   * Update preference state
   * @private
   */
  _updatePreferenceState() {
    // Get checkbox values
    const marketMovements = document.getElementById('market-movements');
    const predictionUpdates = document.getElementById('prediction-updates');
    const tradingOpportunities = document.getElementById('trading-opportunities');
    const tariffNews = document.getElementById('tariff-news');
    const technicalAlerts = document.getElementById('technical-alerts');
    
    // Get priority value
    const priorityAll = document.getElementById('priority-all');
    const priorityHigh = document.getElementById('priority-high');
    const priorityCritical = document.getElementById('priority-critical');
    
    // Update preferences object
    if (marketMovements) this.notificationPreferences.marketMovements = marketMovements.checked;
    if (predictionUpdates) this.notificationPreferences.predictionUpdates = predictionUpdates.checked;
    if (tradingOpportunities) this.notificationPreferences.tradingOpportunities = tradingOpportunities.checked;
    if (tariffNews) this.notificationPreferences.tariffNews = tariffNews.checked;
    if (technicalAlerts) this.notificationPreferences.technicalAlerts = technicalAlerts.checked;
    
    if (priorityAll && priorityAll.checked) this.notificationPreferences.priority = 'all';
    if (priorityHigh && priorityHigh.checked) this.notificationPreferences.priority = 'high';
    if (priorityCritical && priorityCritical.checked) this.notificationPreferences.priority = 'critical';
  }
  
  /**
   * Save preferences
   * @private
   */
  _savePreferences() {
    // Update preference state
    this._updatePreferenceState();
    
    // Save to local storage
    localStorage.setItem('notificationPreferences', JSON.stringify(this.notificationPreferences));
    
    // Send to server
    this._sendPreferencesToServer();
    
    // Show success message
    this._showMessage('Notification preferences saved successfully!', 'success');
  }
  
  /**
   * Send test notification
   * @private
   */
  _sendTestNotification() {
    if (!this.isSubscribed) {
      this._showMessage('Please enable notifications first.', 'error');
      return;
    }
    
    // Simulate server sending a notification
    // In a real implementation, this would be handled by the server
    
    // Check if Notification API is supported
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
      return;
    }
    
    // Check permission
    if (Notification.permission === 'granted') {
      // Create notification
      const notification = new Notification('Trump Tariff Analysis', {
        body: 'This is a test notification. Your notification system is working correctly.',
        icon: '/images/notification-icon.png',
        badge: '/images/notification-badge.png',
        tag: 'test-notification',
        data: {
          type: 'test',
          url: '/notification-test'
        }
      });
      
      // Add click event
      notification.onclick = function() {
        window.focus();
        notification.close();
      };
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          this._sendTestNotification();
        }
      });
    }
  }
  
  /**
   * Show message
   * @param {string} message - Message text
   * @param {string} type - Message type ('success', 'error', 'info')
   * @private
   */
  _showMessage(message, type = 'info') {
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `notification-message ${type}`;
    messageElement.textContent = message;
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'message-close';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
      messageElement.remove();
    });
    
    messageElement.appendChild(closeButton);
    
    // Add to container
    const container = document.getElementById('notification-container');
    if (container) {
      container.appendChild(messageElement);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        messageElement.remove();
      }, 5000);
    }
  }
  
  /**
   * Show not supported message
   * @private
   */
  _showNotSupportedMessage() {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    container.innerHTML = `
      <div class="notification-header">
        <h2>Push Notifications</h2>
        <p class="notification-description">Receive alerts about market movements, prediction updates, and trading opportunities</p>
      </div>
      
      <div class="notification-not-supported">
        <div class="not-supported-icon"></div>
        <h3>Push Notifications Not Supported</h3>
        <p>Your browser does not support push notifications. Please try using a modern browser like Chrome, Firefox, or Edge.</p>
      </div>
    `;
  }
  
  /**
   * Generate notification history
   * @returns {string} HTML content
   * @private
   */
  _generateNotificationHistory() {
    // Sample data - in a real implementation, this would be fetched from the server
    const notificationHistory = [
      {
        title: 'New Trading Opportunity',
        body: 'FMG.AX has been identified as a high-conviction short opportunity with 85% probability of 15%+ movement.',
        type: 'trading-opportunity',
        priority: 'high',
        timestamp: '2025-04-08T00:15:23Z'
      },
      {
        title: 'Market Movement Alert',
        body: 'ASX 200 down 2.3% following Trump\'s announcement of new tariffs on Chinese imports.',
        type: 'market-movement',
        priority: 'high',
        timestamp: '2025-04-07T22:30:45Z'
      },
      {
        title: 'Prediction Update',
        body: 'BHP.AX tariff impact prediction updated from "High Negative" to "Very High Negative".',
        type: 'prediction-update',
        priority: 'medium',
        timestamp: '2025-04-07T18:12:37Z'
      },
      {
        title: 'Tariff News Alert',
        body: 'Trump announces 25% tariffs on $300B of Chinese goods, effective immediately.',
        type: 'tariff-news',
        priority: 'critical',
        timestamp: '2025-04-07T16:45:12Z'
      },
      {
        title: 'Technical Alert',
        body: 'TWE.AX has broken below key support level at $12.50, suggesting further downside.',
        type: 'technical-alert',
        priority: 'medium',
        timestamp: '2025-04-07T14:22:08Z'
      }
    ];
    
    if (notificationHistory.length === 0) {
      return '<div class="empty-history">No notifications yet</div>';
    }
    
    return notificationHistory.map(notification => `
      <div class="history-item ${notification.type} ${notification.priority}-priority">
        <div class="history-icon ${notification.type}"></div>
        <div class="history-content">
          <div class="history-title">${notification.title}</div>
          <div class="history-body">${notification.body}</div>
          <div class="history-meta">
            <span class="history-type">${this._formatNotificationType(notification.type)}</span>
            <span class="history-priority ${notification.priority}-priority">${this._formatPriority(notification.priority)}</span>
            <span class="history-time">${this._formatTimestamp(notification.timestamp)}</span>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  /**
   * Format notification type
   * @param {string} type - Notification type
   * @returns {string} Formatted type
   * @private
   */
  _formatNotificationType(type) {
    switch (type) {
      case 'trading-opportunity':
        return 'Trading Opportunity';
      case 'market-movement':
        return 'Market Movement';
      case 'prediction-update':
        return 'Prediction Update';
      case 'tariff-news':
        return 'Tariff News';
      case 'technical-alert':
        return 'Technical Alert';
      default:
        return type;
    }
  }
  
  /**
   * Format priority
   * @param {string} priority - Priority level
   * @returns {string} Formatted priority
   * @private
   */
  _formatPriority(priority) {
    switch (priority) {
      case 'critical':
        return 'Critical';
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return priority;
    }
  }
  
  /**
   * Format timestamp
   * @param {string} timestamp - ISO timestamp
   * @returns {string} Formatted timestamp
   * @private
   */
  _formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  }
  
  /**
   * Send subscription to server
   * @param {PushSubscription} subscription - Push subscription
   * @private
   */
  _sendSubscriptionToServer(subscription) {
    // In a real implementation, this would send the subscription to the server
    console.log('Sending subscription to server:', subscription);
    
    // Simulate server response
    setTimeout(() => {
      console.log('Subscription saved on server');
    }, 1000);
  }
  
  /**
   * Remove subscription from server
   * @private
   */
  _removeSubscriptionFromServer() {
    // In a real implementation, this would remove the subscription from the server
    console.log('Removing subscription from server');
    
    // Simulate server response
    setTimeout(() => {
      console.log('Subscription removed from server');
    }, 1000);
  }
  
  /**
   * Send preferences to server
   * @private
   */
  _sendPreferencesToServer() {
    // In a real implementation, this would send the preferences to the server
    console.log('Sending preferences to server:', this.notificationPreferences);
    
    // Simulate server response
    setTimeout(() => {
      console.log('Preferences saved on server');
    }, 1000);
  }
  
  /**
   * Convert base64 to Uint8Array
   * @param {string} base64String - Base64 string
   * @returns {Uint8Array} Uint8Array
   * @private
   */
  _urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
  }
}

export default PushNotificationSystem;
