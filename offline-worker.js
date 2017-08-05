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
      return this.CACHE_PREFIX + 'b631da890fbdae2966d24469854e5b93eb0e95d0';
    },

    // This is a list of resources that will be cached.
    RESOURCES: [
      './browserconfig.xml', // d14afc548622da78db97832f37943eaec0693db6
      './dist/css/main.css', // 4952e3e9b909a83c506b5b57e05fb00a7ad943d2
      './dist/css/main.css.map', // 6b69e74fe9ab05dccfbe4fe9ad28a9e3205e4b02
      './dist/images/icons/apple/apple-touch-icon-120x120.png', // 98ba22db4be9a5b2f194e22661a343e0f02488c5
      './dist/images/icons/apple/apple-touch-icon-152x152.png', // fb0201a6f36c702b54fcc979762cd1481792761c
      './dist/images/icons/apple/apple-touch-icon-180x180.png', // e02caed3dddca7572f29bdf1394f168adbd4856a
      './dist/images/icons/apple/apple-touch-icon-57x57.png', // 71f823c9a7f7da685f815e966cbb659dc34e8b0f
      './dist/images/icons/apple/apple-touch-icon-60x60.png', // 1ae2db5f2ddf25afff1860feafdd072cb6d01efa
      './dist/images/icons/apple/apple-touch-icon-76x76.png', // 2d9b74f0fb4b1de92c313db59a10d5a3fa170e7b
      './dist/images/icons/apple/apple-touch-icon.png', // 1a927a7eafbc2d7f44c3fab58238021b7afab3d2
      './dist/images/icons/apple/safari-pinned-tab.svg', // c71b8239e067e4f2d38901a3df3648bc2639da7e
      './dist/images/icons/favicon-16x16.png', // 2f676fbf731f24d98635b99da00da5dec0b8015f
      './dist/images/icons/favicon-194x194.png', // 79c02970173f89123f789f8020afbb668abda5db
      './dist/images/icons/favicon-32x32.png', // 15ba4b81dedf7cb83d395eb1820413505c1ad2e1
      './dist/images/icons/favicon-48x48.png', // ee87b95e168667ac2035573372d0478a4af95288
      './dist/images/icons/favicon-96x96.png', // c1941155f9bd5f127099d6630f609e4548c38151
      './dist/images/icons/google/android-chrome-144x144.png', // 55a9d212b7918b27774db41dc4a4c02a814ba377
      './dist/images/icons/google/android-chrome-192x192.png', // b49ad13a0d21bc415afdc4bbc3ce27ec19e538a4
      './dist/images/icons/google/android-chrome-256x256.png', // 655441fa8e7f699a8157de26940a05211a6dcefe
      './dist/images/icons/google/android-chrome-36x36.png', // 2b102791ea1ae2a381df7220f481475e91ed2e66
      './dist/images/icons/google/android-chrome-384x384.png', // 55a436c83d2ca834ba3c59c757200eaf0b9decfa
      './dist/images/icons/google/android-chrome-48x48.png', // c5ab9c1becafe9631b32f7172972dfd63d17de8a
      './dist/images/icons/google/android-chrome-512x512.png', // c76f6fa3f328c3e704456ed92fcc2296d5c2ceb6
      './dist/images/icons/google/android-chrome-72x72.png', // ae247acca1fbbf3ab8a09b4593dab7d486660238
      './dist/images/icons/google/android-chrome-96x96.png', // 5f32edbfc2d5456cb00435bb9744d655cc95a8ab
      './dist/images/icons/ms/mstile-144x144.png', // bd9908d78bf5bc5fd22feed4feff58e68f826609
      './dist/images/icons/ms/mstile-150x150.png', // 7a5cf1e1c31108fcc681927bebadf0d28f766ee0
      './dist/images/icons/ms/mstile-310x150.png', // b8b9d0913d01b116df4d78f6f0b8ae44b7ad010c
      './dist/images/icons/ms/mstile-310x310.png', // d0374256f8b170dbdf15ee8dfd1ed7c94ee1f2c4
      './dist/images/icons/ms/mstile-70x70.png', // 577c16e40fe8185f992e3438a83edf3e2af9f3f9
      './dist/js/app.js', // 713188c14fb34d8fa3730fe95dc87dfbf8a25e4b
      './dist/js/app.js.map', // 9e5c231791a76141cddece627c142b2e2564054a
      './index.html', // 169f169bd5f8897177795d5b598144091f76a10e
      './manifest.json', // ff18f2090682bc881a984b595c9e1bf299179ab7
      './offline-manager.js', // 66eee9a121acf84e027e87bc73264faaa900ca8b

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
