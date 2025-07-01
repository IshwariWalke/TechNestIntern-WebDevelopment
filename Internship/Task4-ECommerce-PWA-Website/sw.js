const CACHE_NAME = 'eshop-cache-v1';

const urlsToCache = [
  // Core app pages
  '/Technest_internship/Internship/Task4-ECommerce-PWA-Website/',
  '/Technest_internship/Internship/Task4-ECommerce-PWA-Website/index.html',
  '/Technest_internship/Internship/Task4-ECommerce-PWA-Website/products.html',
  '/Technest_internship/Internship/Task4-ECommerce-PWA-Website/product_details.html',
  '/Technest_internship/Internship/Task4-ECommerce-PWA-Website/cart.html',

  // Manifest & Icons
  '/Technest_internship/Internship/Task4-ECommerce-PWA-Website/manifest.json',
  '/Technest_internship/Internship/Task4-ECommerce-PWA-Website/assets/icon-192.png',
  '/Technest_internship/Internship/Task4-ECommerce-PWA-Website/assets/icon-512.png',

  // Static Assets
  '/Technest_internship/Internship/Task4-ECommerce-PWA-Website/data/products.json',
  'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
];

// Install event – cache core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (let url of urlsToCache) {
        try {
          await cache.add(url);
          console.log('✅ Cached:', url);
        } catch (err) {
          console.error('❌ Failed to cache:', url, err);
        }
      }
    })
  );
});

// Activate event – clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Fetch event – serve cached files if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() =>
      caches.match('/Technest_internship/Internship/Task4-ECommerce-PWA-Website/index.html')
    )
  );
});


