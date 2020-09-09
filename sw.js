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

workbox.routing.registerRoute(
    /(^|^[^:]+:\/\/|[^\.]+\.)fontawesome\.com/,
    new workbox.strategies.CacheFirst({
        cacheName: "fontawesome-kit",
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
    "revision": "c84c2282af28527903e8e0645df6dfea"
  },
  {
    "url": "assets/css/dse.css",
    "revision": "d4c11e8b15d7995a5778902d5f5159e5"
  },
  {
    "url": "assets/css/fab.css",
    "revision": "87fa799927c8adbab888e70b6b28d250"
  },
  {
    "url": "assets/css/home.css",
    "revision": "12686de3284f2bc5329cd2e7c9ea8408"
  },
  {
    "url": "assets/css/material-box-shadow.css",
    "revision": "93142434960c9bd55a1aa07c8d8ce85f"
  },
  {
    "url": "assets/css/questions.css",
    "revision": "010626ecf7b6ee17b086387d0ce641c9"
  },
  {
    "url": "assets/css/shadow.css",
    "revision": "6ef7c12b15edf6bbc2454183c1a510cd"
  },
  {
    "url": "assets/css/styles.css",
    "revision": "6058dbb8d90585187fe9be14b6821bc9"
  },
  {
    "url": "assets/css/variables.css",
    "revision": "207a5e618d42a1e4de9f9fb00fc8a163"
  },
  {
    "url": "assets/icons/dse-clean.png",
    "revision": "4e3df8decb55f258100ee6076032fbe2"
  },
  {
    "url": "assets/icons/dse.png",
    "revision": "fa0d4f41f2650ed6d90bd77f8766b1c4"
  },
  {
    "url": "assets/scripts/dse.js",
    "revision": "f6d28d0136629d02bb7813d580431b21"
  },
  {
    "url": "assets/scripts/home.js",
    "revision": "a8a868a7ca888be8ca28c159b97638be"
  },
  {
    "url": "assets/scripts/questions.js",
    "revision": "220550b38a408f3033bcb183b7be722d"
  },
  {
    "url": "assets/scripts/theme.js",
    "revision": "a404e9fb0ac6fb237b7a961f556d90a8"
  },
  {
    "url": "assets/scripts/utilities.js",
    "revision": "89542ae806551fe6c6ad495261036419"
  },
  {
    "url": "assets/source/chi.json",
    "revision": "b33eecd0619a58a3f243989b9fc51cfc"
  },
  {
    "url": "assets/source/data.json",
    "revision": "a58ea4e67e8299811b1639f2a999142c"
  },
  {
    "url": "assets/source/temp.json",
    "revision": "e33e9ceb44f77e779de28c8cb1e5ce5a"
  },
  {
    "url": "assets/source/temp2.json",
    "revision": "58e0494c51d30eb3494f7c9198986bb9"
  },
  {
    "url": "index.html",
    "revision": "31ceb4c8411df7c60313c41ca945b1a0"
  },
  {
    "url": "manifest.json",
    "revision": "40fc6ae0be923806796cafd7233cb503"
  },
  {
    "url": "questions/index.html",
    "revision": "898527aa1ff2f11ad2daf3a889248435"
  },
  {
    "url": "src-sw.js",
    "revision": "75161e8fc4ca93c18b915d1ceb38ed0e"
  },
  {
    "url": "sw_install.js",
    "revision": "94915ae31c4782278c8caf7882bcccb3"
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
