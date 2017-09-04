/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */


(function (self) {
  'use strict';

  // On install, cache resources and skip waiting so the worker won't
  // wait for clients to be closed before becoming active.
  self.addEventListener('install', event =>
    event.waitUntil(
      oghliner.cacheResources()
      .then(() => self.skipWaiting())
    )
  );

  // On activation, delete old caches and start controlling the clients
  // without waiting for them to reload.
  self.addEventListener('activate', event =>
    event.waitUntil(
      oghliner.clearOtherCaches()
      .then(() => self.clients.claim())
    )
  );

  // Retrieves the request following oghliner strategy.
  self.addEventListener('fetch', event => {
    if (event.request.method === 'GET') {
      event.respondWith(oghliner.get(event.request));
    } else {
      event.respondWith(self.fetch(event.request));
    }
  });

  var oghliner = self.oghliner = {

    // This is the unique prefix for all the caches controlled by this worker.
    CACHE_PREFIX: 'offline-cache:shvedovskiy/Shvedov_Oleg:' + (self.registration ? self.registration.scope : '') + ':',

    // This is the unique name for the cache controlled by this version of the worker.
    get CACHE_NAME() {
      return this.CACHE_PREFIX + 'a4273d4445acf8dab201e0f20efcc64b1298ad34';
    },

    // This is a list of resources that will be cached.
    RESOURCES: [
      './browserconfig.xml', // 9fd15b41a6e9d2e667177e2cbfa6538b6e762e9e
      './manifest.json', // 134a199db30a22282db7c466042a10bac9f22778
      './index.html', // 28b4dbab11d29cc3b9854d1ff1c88e3a32b9802e
      './offline-manager.js', // b4acb926fd2ba443c3a10e771a337e1da0b31dd3
      './dist/css/main.css', // ad0bdb85b5c6bff8cca870cea00def09ce55f8d6
      './dist/js/app.js', // 5067c27bb8de37f80f56d7c99200b1b4ca9cdb24
      './dist/images/icons/ms/mstile-144x144.png', // bd9908d78bf5bc5fd22feed4feff58e68f826609
      './dist/images/icons/ms/mstile-150x150.png', // 7a5cf1e1c31108fcc681927bebadf0d28f766ee0
      './dist/images/icons/ms/mstile-310x150.png', // b8b9d0913d01b116df4d78f6f0b8ae44b7ad010c
      './dist/images/icons/ms/mstile-310x310.png', // d0374256f8b170dbdf15ee8dfd1ed7c94ee1f2c4
      './dist/images/icons/ms/mstile-70x70.png', // 577c16e40fe8185f992e3438a83edf3e2af9f3f9
      './dist/images/icons/favicon-194x194.png', // 79c02970173f89123f789f8020afbb668abda5db
      './dist/images/icons/google/android-chrome-192x192.png', // b49ad13a0d21bc415afdc4bbc3ce27ec19e538a4
      './dist/images/icons/apple/safari-pinned-tab.svg', // c71b8239e067e4f2d38901a3df3648bc2639da7e
      './dist/images/icons/apple/apple-touch-icon-180x180.png', // e02caed3dddca7572f29bdf1394f168adbd4856a
      './favicon.ico', // ec0f6bf17f5fc77a63656d713adff57d2e97121f

    ],

    // Adds the resources to the cache controlled by this worker.
    cacheResources: function () {
      var now = Date.now();
      var baseUrl = self.location;
      return this.prepareCache()
      .then(cache => Promise.all(this.RESOURCES.map(resource => {
        // Bust the request to get a fresh response
        var url = new URL(resource, baseUrl);
        var bustParameter = (url.search ? '&' : '') + '__bust=' + now;
        var bustedUrl = new URL(url.toString());
        bustedUrl.search += bustParameter;

        // But cache the response for the original request
        var requestConfig = { credentials: 'same-origin' };
        var originalRequest = new Request(url.toString(), requestConfig);
        var bustedRequest = new Request(bustedUrl.toString(), requestConfig);
        return fetch(bustedRequest)
        .then(response => {
          if (response.ok) {
            return cache.put(originalRequest, response);
          }
          console.error('Error fetching ' + url + ', status was ' + response.status);
        });
      })));
    },

    // Remove the offline caches not controlled by this worker.
    clearOtherCaches: function () {
      var outOfDate = cacheName => cacheName.startsWith(this.CACHE_PREFIX) && cacheName !== this.CACHE_NAME;

      return self.caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
        .filter(outOfDate)
        .map(cacheName => self.caches.delete(cacheName))
      ));
    },

    // Get a response from the current offline cache or from the network.
    get: function (request) {
      return this.openCache()
      .then(cache => cache.match(() => this.extendToIndex(request)))
      .then(response => {
        if (response) {
          return response;
        }
        return self.fetch(request);
      });
    },

    // Make requests to directories become requests to index.html
    extendToIndex: function (request) {
      var url = new URL(request.url, self.location);
      var path = url.pathname;
      if (path[path.length - 1] !== '/') {
        return request;
      }
      url.pathname += 'index.html';
      return new Request(url.toString(), request);
    },

    // Prepare the cache for installation, deleting it before if it already exists.
    prepareCache: function () {
      return self.caches.delete(this.CACHE_NAME)
      .then(() => this.openCache());
    },

    // Open and cache the offline cache promise to improve the performance when
    // serving from the offline-cache.
    openCache: function () {
      if (!this._cache) {
        this._cache = self.caches.open(this.CACHE_NAME);
      }
      return this._cache;
    }

  };
}(self));
