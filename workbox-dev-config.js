module.exports = {
    globDirectory: "./",
    globPatterns: ["**/*.{html,css,png,js,json,ttf}"],
    globIgnores: ["**/404.html"],
    swDest: "./sw.js",
    maximumFileSizeToCacheInBytes: 5000000,
    swSrc: "src-sw.js",
};
