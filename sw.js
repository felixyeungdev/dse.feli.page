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
    "revision": "a572359db1294f0c9709f8226888723d"
  },
  {
    "url": "assets/css/dse.css",
    "revision": "e88abe4ab4fdf1d38f2b97fc6ae4b58e"
  },
  {
    "url": "assets/css/fab.css",
    "revision": "b2d7df4cb14863cce94dd9fedfc1aec5"
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
    "revision": "e71bed0d4d048d6ced2af9c5b434a903"
  },
  {
    "url": "assets/css/shadow.css",
    "revision": "6ef7c12b15edf6bbc2454183c1a510cd"
  },
  {
    "url": "assets/css/styles.css",
    "revision": "eb76a28457f7bd4119d661c2a69e6544"
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
    "revision": "f6d28d0136629d02bb7813d580431b21"
  },
  {
    "url": "assets/scripts/home.js",
    "revision": "6b875c73e3d82c9e9550932a9e513782"
  },
  {
    "url": "assets/scripts/questions.js",
    "revision": "d12b6c8069802cc08e937136fefb4771"
  },
  {
    "url": "assets/scripts/utilities.js",
    "revision": "c693351448cae8d9c5cd794b4854b43e"
  },
  {
    "url": "assets/source/chi.json",
    "revision": "811f56c641555bebd74f4eb3253d3f56"
  },
  {
    "url": "assets/source/data.json",
    "revision": "c27fc10b18df365bb20e8a42739380cf"
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
    "revision": "04c8ccba21695cd5c879ed9499d52afa"
  },
  {
    "url": "manifest.json",
    "revision": "40fc6ae0be923806796cafd7233cb503"
  },
  {
    "url": "questions/index.html",
    "revision": "6b5505309664bed5075a0cef72198253"
  },
  {
    "url": "src-sw.js",
    "revision": "36874a0c418b2d0084232e39169b5206"
  },
  {
    "url": "sw_install.js",
    "revision": "0bfdb7c6b2180e867a44713b5748129f"
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
