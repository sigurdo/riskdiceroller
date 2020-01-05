const staticCacheName = "site-static";
const assets = [
	"index.html",
	"css/grid.css",
	"css/riskDiceRoller.css",
	"css/settings.css",
	"css/skjema.css",
	"css/tutorial.css",
	"js/generelleFunksjoner.js",
	"js/oppstart.js",
	"js/settings.js",
	"js/sigurdsStandardFunksjoner.js",
	"media/add.png",
	"media/bakgrunn.jpg",
	"media/checkmark.png",
	"media/d1.png",
	"media/d2.png",
	"media/d3.png",
	"media/d4.png",
	"media/d5.png",
	"media/d6.png",
	"media/favicon.ico",
	"media/fullscreen.png",
	"media/gloriousMorning.mp3",
	"media/s1.png",
	"media/s2.png",
	"media/s3.png",
	"media/s4.png",
	"media/s5.png",
	"media/s6.png",
	"media/s7.png",
	"media/slett.png",
	"manifest.json",
	"settings.html",
	"sw.js",
	"tutorial.html"
];

self.addEventListener('install', evt => {
	evt.waitUntil(caches.open(staticCacheName).then(cache => {
		cache.addAll(assets);
	}));
});

self.addEventListener('fetch', evt => {
	evt.respondWith(caches.match(evt.request).then(cacheRes => {
		return cacheRes || fetch(evt.request);
	}));
});