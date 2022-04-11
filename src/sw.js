const CACHE_NAME = 'offlinePage'
const cacheUrls = [
    './static/offline.gif'
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

const checkUrl = (url) => {
    const unUrl = {
        api: /\/api/,
        posters: /\/posters/,
        logos: /\/logos/,
        avatars: /\/avatars/,
        persons: /\/persons/,
    };

    let check = true;

    Object.values(unUrl).forEach(value => {
       if (url.match(value)) {
           check = false;
       }
    });

    return check;
}

this.addEventListener('fetch', (event) => {
    if (navigator.onLine) {
        if (event.request.method === 'GET' && checkUrl(event.request.url)) {
            caches.open(CACHE_NAME).then((cache) => {
                cache.add(event.request.url);
            });
        }

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