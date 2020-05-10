module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{js,css,hbs,jpg,png,mp3,html,xml,ico,svg,webmanifest}"
  ],
  "maximumFileSizeToCacheInBytes": 3 * 1024**2,
  "swDest": "dist/sw.js",
  "swSrc": "src/sw/src-sw.js"
};
