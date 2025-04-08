/**
 * Notification Integration Script for Trump Tariff Analysis Website
 * 
 * This script integrates the push notification system with the website,
 * handling initialization, UI interactions, and notification management.
 */

import PushNotificationSystem from '../components/notification/PushNotificationSystem.js';

// Initialize notification system
let notificationSystem;

// DOM elements
let notificationContainer;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeNotifications();
});

/**
 * Initialize notification integration
 */
function initializeNotifications() {
  // Create notification system instance
  notificationSystem = new PushNotificationSystem();
  
  // Get container element
  notificationContainer = document.getElementById('notification-container');
  if (!notificationContainer) {
    console.warn('Notification container not found');
    
    // Create notification button in header if container not found
    createNotificationButton();
  }
}

/**
 * Create notification button in header
 */
function createNotificationButton() {
  const header = document.querySelector('header');
  if (!header) return;
  
  const nav = header.querySelector('nav');
  if (!nav) return;
  
  // Create notification button
  const notificationButton = document.createElement('button');
  notificationButton.className = 'notification-header-button';
  notificationButton.innerHTML = `
    <span class="notification-icon"></span>
    <span class="notification-badge">0</span>
  `;
  
  // Add click event
  notificationButton.addEventListener('click', () => {
    window.location.href = '/notifications.html';
  });
  
  // Add to header
  nav.appendChild(notificationButton);
  
  // Update notification count
  updateNotificationCount();
}

/**
 * Update notification count
 */
function updateNotificationCount() {
  const badge = document.querySelector('.notification-badge');
  if (!badge) return;
  
  // Get unread notification count from local storage
  const unreadCount = localStorage.getItem('unreadNotificationCount') || 0;
  
  // Update badge
  badge.textContent = unreadCount;
  
  // Show/hide badge
  if (unreadCount > 0) {
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

/**
 * Show notification toast
 * @param {Object} notification - Notification data
 */
function showNotificationToast(notification) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'notification-toast';
  toast.innerHTML = `
    <div class="toast-icon ${notification.type || 'default'}"></div>
    <div class="toast-content">
      <div class="toast-title">${notification.title}</div>
      <div class="toast-body">${notification.body}</div>
    </div>
    <button class="toast-close">&times;</button>
  `;
  
  // Add click event
  toast.addEventListener('click', (event) => {
    if (event.target.classList.contains('toast-close')) {
      toast.remove();
    } else {
      // Navigate to notification URL
      if (notification.data && notification.data.url) {
        window.location.href = notification.data.url;
      }
      toast.remove();
    }
  });
  
  // Add to document
  document.body.appendChild(toast);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    toast.classList.add('toast-hide');
    
    // Remove from DOM after animation
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}

/**
 * Register notification event listeners
 */
function registerNotificationEvents() {
  // Listen for notification events from service worker
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'notification') {
      // Show notification toast
      showNotificationToast(event.data.notification);
      
      // Update notification count
      updateNotificationCount();
    }
  });
}

/**
 * Check for notification permission
 * @returns {Promise} Promise that resolves with permission status
 */
function checkNotificationPermission() {
  return new Promise((resolve) => {
    if (!('Notification' in window)) {
      resolve('not-supported');
      return;
    }
    
    resolve(Notification.permission);
  });
}

/**
 * Request notification permission
 * @returns {Promise} Promise that resolves with permission status
 */
function requestNotificationPermission() {
  return new Promise((resolve) => {
    if (!('Notification' in window)) {
      resolve('not-supported');
      return;
    }
    
    Notification.requestPermission().then((permission) => {
      resolve(permission);
    });
  });
}

// Export functions for use in other scripts
export default {
  initializeNotifications,
  showNotificationToast,
  checkNotificationPermission,
  requestNotificationPermission,
  updateNotificationCount
};
