/**
 * Service Worker for Trump Tariff Analysis Website
 * 
 * This service worker handles push notifications and offline functionality.
 */

// Cache name
const CACHE_NAME = 'trump-tariff-analysis-cache-v1';

// Files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/styles/push-notification.css',
  '/scripts/main.js',
  '/scripts/notificationIntegration.js',
  '/images/notification-icon.png',
  '/images/notification-badge.png'
];

// Install event - cache assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  return self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetch', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// Push event - handle push notifications
self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
  // Parse notification data
  let notificationData;
  try {
    notificationData = JSON.parse(event.data.text());
  } catch (e) {
    notificationData = {
      title: 'Trump Tariff Analysis',
      body: event.data.text(),
      icon: '/images/notification-icon.png',
      badge: '/images/notification-badge.png',
      data: {
        url: '/'
      }
    };
  }
  
  // Set notification options
  const options = {
    body: notificationData.body || 'New notification from Trump Tariff Analysis',
    icon: notificationData.icon || '/images/notification-icon.png',
    badge: notificationData.badge || '/images/notification-badge.png',
    data: notificationData.data || { url: '/' },
    tag: notificationData.tag || 'default',
    actions: notificationData.actions || []
  };
  
  // Show notification
  event.waitUntil(
    self.registration.showNotification(notificationData.title || 'Trump Tariff Analysis', options)
  );
});

// Notification click event - handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click received');
  
  // Close notification
  event.notification.close();
  
  // Get notification data
  const notificationData = event.notification.data;
  
  // Handle action clicks
  if (event.action) {
    console.log(`[Service Worker] Action clicked: ${event.action}`);
    
    // Handle specific actions
    switch (event.action) {
      case 'view-details':
        // Open specific URL for details
        event.waitUntil(
          clients.openWindow(notificationData.detailsUrl || notificationData.url || '/')
        );
        break;
      case 'dismiss':
        // Just close the notification
        break;
      default:
        // Open default URL
        event.waitUntil(
          clients.openWindow(notificationData.url || '/')
        );
    }
    
    return;
  }
  
  // Handle notification click (not action)
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then(clientList => {
        // Check if a window is already open
        for (const client of clientList) {
          if (client.url === notificationData.url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // If no window is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(notificationData.url || '/');
        }
      })
  );
});

// Notification close event - handle notification closes
self.addEventListener('notificationclose', event => {
  console.log('[Service Worker] Notification close received');
  
  // Log notification close
  const notificationData = event.notification.data;
  console.log('[Service Worker] Notification closed', notificationData);
});

// Sync event - handle background sync
self.addEventListener('sync', event => {
  console.log('[Service Worker] Sync event', event.tag);
  
  if (event.tag === 'sync-notifications') {
    event.waitUntil(syncNotifications());
  }
});

/**
 * Sync notifications
 * @returns {Promise} Promise that resolves when sync is complete
 */
function syncNotifications() {
  return fetch('/api/notifications/sync')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to sync notifications');
      }
      
      return response.json();
    })
    .then(data => {
      console.log('[Service Worker] Notifications synced', data);
      
      // Show new notifications
      if (data.notifications && data.notifications.length > 0) {
        return Promise.all(
          data.notifications.map(notification => {
            return self.registration.showNotification(notification.title, {
              body: notification.body,
              icon: notification.icon || '/images/notification-icon.png',
              badge: notification.badge || '/images/notification-badge.png',
              data: notification.data || { url: '/' },
              tag: notification.tag || 'default',
              actions: notification.actions || []
            });
          })
        );
      }
      
      return Promise.resolve();
    })
    .catch(error => {
      console.error('[Service Worker] Failed to sync notifications', error);
    });
}
