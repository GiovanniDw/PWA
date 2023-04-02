// /sw.js
self.addEventListener('install', (event) => {
  const cacheKey = 'MyFancyCacheName_v1';

  event.waitUntil(caches.open(cacheKey).then((cache) => {
    // Add all the assets in the array to the 'MyFancyCacheName_v1'
    // `Cache` instance for later use.
    return cache.addAll([
      '/css/main.css',
      '/Logo.png',
      '/manifest.webmanifest',
      '/favicon.ico',
      '/sw.js',
      'https://www.rijksmuseum.nl/api/en/collection?key=S3GLzVAr&involvedMaker=Rembrandt+van+Rijn',
      'https://www.rijksmuseum.nl/api/en/collection?key=S3GLzVAr&involvedMaker=Johannes+Vermeer'
    ]);
  }));
});