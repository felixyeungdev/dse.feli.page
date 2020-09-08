importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

workbox.setConfig({ debug: false });

self.addEventListener("message", function (event) {
    if (event.data.action === "skipWaiting") {
        self.skipWaiting();
    }
});

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxEntries: 30,
            }),
        ],
    })
);

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/css/appbar.css",
    "revision": "2c0ae1faa504f2965b4284b0e60ffe14"
  },
  {
    "url": "assets/css/dse.css",
    "revision": "c5b5ed24b11f74906302f3dc98e89922"
  },
  {
    "url": "assets/css/home.css",
    "revision": "10122aa69b9ccd1b9c6a83d4d4e7fd6c"
  },
  {
    "url": "assets/css/material-box-shadow.css",
    "revision": "93142434960c9bd55a1aa07c8d8ce85f"
  },
  {
    "url": "assets/css/questions.css",
    "revision": "9e8087ad9774b4f82a835978881289e8"
  },
  {
    "url": "assets/css/shadow.css",
    "revision": "6ef7c12b15edf6bbc2454183c1a510cd"
  },
  {
    "url": "assets/css/styles.css",
    "revision": "aee1551ed37e22d9b109197212c6a095"
  },
  {
    "url": "assets/css/variables.css",
    "revision": "207a5e618d42a1e4de9f9fb00fc8a163"
  },
  {
    "url": "assets/icons/dse.png",
    "revision": "fa0d4f41f2650ed6d90bd77f8766b1c4"
  },
  {
    "url": "assets/scripts/dse.js",
    "revision": "4d96bd8401e87163d69b91fd5a59b0cf"
  },
  {
    "url": "assets/scripts/home.js",
    "revision": "6b875c73e3d82c9e9550932a9e513782"
  },
  {
    "url": "assets/scripts/questions.js",
    "revision": "5b1afc256da1636e33249c30a043b1a0"
  },
  {
    "url": "assets/scripts/utilities.js",
    "revision": "d6c6047330706425d598c9ac6b69ef33"
  },
  {
    "url": "assets/source/chi.json",
    "revision": "6f64236a27954a5715ca0783c756e263"
  },
  {
    "url": "assets/source/data.json",
    "revision": "c27fc10b18df365bb20e8a42739380cf"
  },
  {
    "url": "assets/source/temp.json",
    "revision": "58e0494c51d30eb3494f7c9198986bb9"
  },
  {
    "url": "index.html",
    "revision": "73cea3f44796612cfa6716d0d5d016c1"
  },
  {
    "url": "manifest.json",
    "revision": "40fc6ae0be923806796cafd7233cb503"
  },
  {
    "url": "questions/index.html",
    "revision": "feb18cfafd9fc6c59ac96dac82bb3464"
  },
  {
    "url": "src-sw.js",
    "revision": "36874a0c418b2d0084232e39169b5206"
  },
  {
    "url": "sw_install.js",
    "revision": "ec75e6bd80ee0ebf69e157c384ebb4ca"
  },
  {
    "url": "workbox-config.js",
    "revision": "fec4cea1ed748deb14d931341a4585c7"
  },
  {
    "url": "workbox-dev-config.js",
    "revision": "88ee6fa5c7cd761cbf1acd60c4f1e8e4"
  }
]);
