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
    "revision": "1dc3836db08866269a69d2b369d5a5d8"
  },
  {
    "url": "assets/css/dse.css",
    "revision": "f89467f373b547afe94018d282a8857d"
  },
  {
    "url": "assets/css/home.css",
    "revision": "0fd199b95d91717df25daccdad9fff4f"
  },
  {
    "url": "assets/css/styles.css",
    "revision": "405dec96680705e7d6f9329ed404d796"
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
    "revision": "b7a5581112f84a2e0e89c672365a8e8a"
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
    "revision": "94ba3b6da026783f1618176c8585841a"
  },
  {
    "url": "assets/source/data.json",
    "revision": "c27fc10b18df365bb20e8a42739380cf"
  },
  {
    "url": "index.html",
    "revision": "c2426ea7d3167a58b87e64eb47c2cd42"
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
    "revision": "3548d0b3b9411c6c78465dd6c4011903"
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
