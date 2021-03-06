const staticCacheName = 'restrev-v1';
const repository = '/mws-restaurant-stage-1';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([
        `${repository}/`,
        `${repository}/index.html`,
        `${repository}/sw.js`,
        `${repository}/css/styles.css`,
        `${repository}/css/responsive.css`,
        `${repository}/js/main.js`,
        `${repository}/js/dbhelper.js`,
        `${repository}/js/restaurant_info.js`,
        `${repository}/data/restaurants.json`,
        `${repository}/img/1.jpg`,
        `${repository}/img/2.jpg`,
        `${repository}/img/3.jpg`,
        `${repository}/img/4.jpg`,
        `${repository}/img/5.jpg`,
        `${repository}/img/6.jpg`,
        `${repository}/img/7.jpg`,
        `${repository}/img/8.jpg`,
        `${repository}/img/9.jpg`,
        `${repository}/img/10.jpg`,
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restrev-') && cacheName != staticCacheName;
        }).map(function(cacheName) {
          return cache.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function(response) {
          let responseClone = response.clone();
          caches.open(staticCacheName).then(function(cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        }).catch(function() {
          return new Response('<h1>Connection error!</h1>'
            + '<p>Sorry, Information is not available. Check your Internet coonnection!</p>', {
            headers: {'Content-Type': 'text/html'}
          });
        })
      }
    })
  )
});