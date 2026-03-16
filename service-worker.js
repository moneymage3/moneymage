const CACHE_NAME = "money-mage-v2";

const urlsToCache = [
  "/",
  "index.html",
  "service.html",
  "support.html",
  "maintenance.html",
  "manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
      .then(response => {

        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(networkResponse => {

            return caches.open(CACHE_NAME)
              .then(cache => {

                cache.put(event.request, networkResponse.clone());

                return networkResponse;

              });

          });

      })

  );

});
