// Service Worker for Pusat.Digital
// Enables offline support, fast caching, and instant loading

const CACHE_NAME = 'pusat-digital-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/router.php',
    '/system/config.json',
    '/css/style.css',
    '/js/app.js'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                // Return cached version
                return response;
            }
            
            // Clone request for network fetch
            const fetchRequest = event.request.clone();
            
            return fetch(fetchRequest).then((response) => {
                // Check valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                
                // Clone response for caching
                const responseToCache = response.clone();
                
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                
                return response;
            }).catch(() => {
                // Offline fallback
                if (event.request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }
            });
        })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

async function syncData() {
    // Sync pending actions when back online
    console.log('Service Worker: Syncing data');
}

// Push notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/icon-192.png',
        badge: '/badge-72.png',
        vibrate: [100, 50, 100],
        data: { dateOfArrival: Date.now() }
    };
    
    event.waitUntil(
        self.registration.showNotification('Pusat.Digital', options)
    );
});
