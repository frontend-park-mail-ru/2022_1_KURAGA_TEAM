const CACHE_NAME = 'offlinePage'
const cacheUrls = [
    '/',
    '/main.css',
    '/index.html',
    '/bundle.js',
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(cacheUrls);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.open: ', err);
            })
    );
});

this.addEventListener('fetch', (event) => {
    if (navigator.onLine) {
        return fetch(event.request);
    }

    event.respondWith(
        caches
            .match(event.request)
            .then((cachedResponse) => {
                return cachedResponse;
            })
            .catch((err) => {
                console.error('smth went wrong with caches.match: ', err);
            })
    );
});