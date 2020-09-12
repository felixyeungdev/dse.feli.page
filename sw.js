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
    "revision": "e313298eb4eb028965ae4ef465e09e77"
  },
  {
    "url": "assets/css/fab.css",
    "revision": "e841b8e527007eda0748f732b4e3faa9"
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
    "revision": "0ee3702cf07ac19f9417815a06c6d0a2"
  },
  {
    "url": "assets/css/styles.css",
    "revision": "cfd92f59fec1dc22a1c983e3fc2f33f5"
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
    "revision": "1f61525b23a3a482851c2a60cbf6f142"
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
    "revision": "43e51ec2c809d6df3e99b88dc1243331"
  },
  {
    "url": "assets/scripts/showdown.min.js",
    "revision": "41596d3910b883d17d61d6d7efda9184"
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
    "revision": "ea61875760e27528fcc4565f3dd7d1d9"
  },
  {
    "url": "assets/source/chi.json",
    "revision": "12a5a2c1c92a7c6486a46c2ae63111fe"
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
    "revision": "fcfdb825487dc5f3333c67a3bfa56f87"
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
    "revision": "973335131ce2820aefceb3aac52d2924"
  },
  {
    "url": "src-sw.js",
    "revision": "eb5eef426d9067518f2ff3a5ff115518"
  },
  {
    "url": "sw_install.js",
    "revision": "5b0f09d28612f7b769381a2f626cc2f9"
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
