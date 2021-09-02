const CACHE_NAME_PREFIX = 'FORM_BUILDER';

// TODO: think of a smart way to update version (when the cache needs to be updated)
const version = 3;

const PREFETCH_CACHE_NAME = `${CACHE_NAME_PREFIX}_PREFETCH_${version}`;

let assetsToPrefetch = {};

let urls_to_prefetch = [];

self.addEventListener('install', (event) => {
  event.waitUntil(
    fetch('/assets-manifest.json')
      .then((data) => data.json())
      .then((assetsManifest) => {
        const urlsToPrefetch = Object.values(assetsManifest);
        urls_to_prefetch = urlsToPrefetch;
        assetsToPrefetch = assetsManifest;

        return caches.open(PREFETCH_CACHE_NAME).then((cache) => {
          return cache.addAll(urlsToPrefetch);
        });
      })
      .catch((error) => console.error(error))
  );
});

self.addEventListener('activate', (event) => {
  console.log('Activate');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return (
              cacheName.indexOf(CACHE_NAME_PREFIX) === 0 &&
              cacheName !== `${CACHE_NAME_PREFIX}_PREFETCH_${version}`
            );
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(PREFETCH_CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request)
            .then((response) => {
              if (urls_to_prefetch.includes(response.url)) {
                cache.put(event.request, response.clone());
              }

              return response;
            })
            .catch(() => {
              console.log('error', event.request);

              if (event.request.mode === 'navigate') {
                return cache.match(assetsToPrefetch['index.html']);
              }
            })
        );
      });
    })
  );
});
