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
    "revision": "fa0a2f286404903c759ccc7406631ed8"
  },
  {
    "url": "assets/css/dse.css",
    "revision": "027b03cabe683f924d36f83ba826b29f"
  },
  {
    "url": "assets/css/home.css",
    "revision": "10122aa69b9ccd1b9c6a83d4d4e7fd6c"
  },
  {
    "url": "assets/css/styles.css",
    "revision": "75eaa61af53a5fc30b8f6ff5dd994f04"
  },
  {
    "url": "assets/css/subject.css",
    "revision": "c38dfb4b61b8ed0f5ea3fd9caa60809b"
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
    "revision": "a296b177a18cc6cc84fea6e9aed281e4"
  },
  {
    "url": "assets/scripts/subject.js",
    "revision": "2df6dce952253823b0227c344417df53"
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
    "revision": "b7e17a32dac2b13a5e2c2595b3ec4b30"
  },
  {
    "url": "assets/source/temp.json",
    "revision": "58e0494c51d30eb3494f7c9198986bb9"
  },
  {
    "url": "index.html",
    "revision": "cbdc995d8c17895844c7e9578c347e24"
  },
  {
    "url": "manifest.json",
    "revision": "40fc6ae0be923806796cafd7233cb503"
  },
  {
    "url": "src-sw.js",
    "revision": "36874a0c418b2d0084232e39169b5206"
  },
  {
    "url": "subjects/index.html",
    "revision": "98d65f8466887d1a297ada7639625b03"
  },
  {
    "url": "sw_install.js",
    "revision": "b680083b4924e70bfb978066cf3bfb6a"
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
