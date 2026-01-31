// Service Worker for caching images and assets
const CACHE_NAME = 'fit4force-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/sitemap.xml',
  '/robots.txt'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - cache first strategy for images, network first for others
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache images aggressively
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          return response || fetch(request).then((fetchResponse) => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          }).catch(() => {
            // Return placeholder if offline
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#e0e0e0" width="100" height="100"/></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          });
        });
      })
    );
  } else {
    // Network first for HTML, CSS, JS
    event.respondWith(
      fetch(request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, response.clone());
          return response;
        });
      }).catch(() => {
        return caches.match(request);
      })
    );
  }
});
