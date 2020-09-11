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

// workbox.routing.registerRoute(
//     /(^|^[^:]+:\/\/|[^\.]+\.)fontawesome\.com/,
//     new workbox.strategies.CacheFirst({
//         cacheName: "fontawesome-kit",
//         plugins: [
//             new workbox.cacheableResponse.Plugin({
//                 statuses: [0, 200],
//             }),
//             new workbox.expiration.Plugin({
//                 maxEntries: 30,
//             }),
//         ],
//     })
// );

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/css/appbar.css",
    "revision": "5f9c4a0ff75a1ab170afdf55ddeb1bcd"
  },
  {
    "url": "assets/css/dse.css",
    "revision": "70f609f116b63bb4401e36747f132c21"
  },
  {
    "url": "assets/css/fab.css",
    "revision": "6b6121e9f5cc1cd061eabb09eab35936"
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
    "revision": "011d7775f553ec3c3ba9ed9ae957b1d0"
  },
  {
    "url": "assets/css/shadow.css",
    "revision": "6ef7c12b15edf6bbc2454183c1a510cd"
  },
  {
    "url": "assets/css/snackbar.css",
    "revision": "13f383f8e6565ad7c124951e8f45b621"
  },
  {
    "url": "assets/css/styles.css",
    "revision": "25eef0a75ec34a48ce8d0c7a1186007d"
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
    "revision": "dde87ea095e72d628a1bf66705d36a4e"
  },
  {
    "url": "assets/scripts/font-awesome.min.js",
    "revision": "6db763bc4e4a292c7520eb0a5bad0f5c"
  },
  {
    "url": "assets/scripts/home.js",
    "revision": "a8a868a7ca888be8ca28c159b97638be"
  },
  {
    "url": "assets/scripts/questions.js",
    "revision": "7a26d373ca5fa2cfd6a639ad36aeb43f"
  },
  {
    "url": "assets/scripts/snackbar.js",
    "revision": "b6a3c60a793330b555702d3a8b15eff8"
  },
  {
    "url": "assets/scripts/theme.js",
    "revision": "a404e9fb0ac6fb237b7a961f556d90a8"
  },
  {
    "url": "assets/scripts/utilities.js",
    "revision": "d26b748e2f465b2836611afa55ead0de"
  },
  {
    "url": "assets/source/chi.json",
    "revision": "fcfdb825487dc5f3333c67a3bfa56f87"
  },
  {
    "url": "assets/source/data.json",
    "revision": "37e815d86a0e9e1e38e04ee97792db50"
  },
  {
    "url": "assets/source/temp.json",
    "revision": "58e0494c51d30eb3494f7c9198986bb9"
  },
  {
    "url": "assets/source/temp2.json",
    "revision": "58e0494c51d30eb3494f7c9198986bb9"
  },
  {
    "url": "index.html",
    "revision": "26eb35a88ad6935c27759c530dfd0ad9"
  },
  {
    "url": "manifest.json",
    "revision": "40fc6ae0be923806796cafd7233cb503"
  },
  {
    "url": "questions/index.html",
    "revision": "2eec3f6742960febf96a556c3cf44eb3"
  },
  {
    "url": "src-sw.js",
    "revision": "eb5eef426d9067518f2ff3a5ff115518"
  },
  {
    "url": "sw_install.js",
    "revision": "2a25e19075683da2b24adf11c245f2b8"
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
