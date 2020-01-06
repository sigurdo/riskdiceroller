console.log('Kjører sw.js');
const staticCacheName = "site-static";
const assets = [
	"./",
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
	"media/icon-72.png",
	"media/icon-96.png",
	"media/icon-128.png",
	"media/icon-144.png",
	"media/icon-152.png",
	"media/icon-192.png",
	"media/icon-384.png",
	"media/icon-512.png",
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
	"tutorial.html",
	"sw.js"
];

self.addEventListener('install', evt => {
	console.log('Installing...');
	evt.waitUntil(caches.open(staticCacheName).then(cache => {
		console.log('Pre-caching assets...');
		for (let i = 0; i < assets.length; i++) {
			console.log('Caching', assets[i]);
			cache.add(assets[i]).then((ting) => {
				console.log('Successfully cached', assets[i]);
			}).catch(err => {
				console.log('Could not cache', assets[i], err);
			});
		}
	}));
});

self.addEventListener('activate', evt => {
	console.log('Activating...', evt);
});

self.addEventListener('fetch', evt => {
	console.log('Fetching', evt.request);
	evt.respondWith(caches.match(evt.request).then(cacheRes => {
		console.log('cacheRes:', cacheRes);
		return cacheRes || fetch(evt.request);
	}).catch(err => console.log(err)));
});
