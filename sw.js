const CACHE = 'ultra-sniper-v1';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE))
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then(
        cached => cached || fetch(event.request)
      )
    );
  }
});
