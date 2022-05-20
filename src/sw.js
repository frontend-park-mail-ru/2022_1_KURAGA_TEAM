const CACHE_NAME = "offlinePage";
const cacheUrls = ["./static/offline.gif"];

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(cacheUrls))
            .catch((err) => {
                console.error("smth went wrong with caches.open: ", err);
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
        trailers: /\/trailers/,
    }
    const checkS = (value) => url.match(value);

    return Object.values(unUrl).some(checkS);
};

this.addEventListener("fetch", (event) => {
    if (navigator.onLine) {
        if (event.request.method === "GET" && !checkUrl(event.request.url)) {
            caches.open(CACHE_NAME).then((cache) => {
                cache.add(event.request.url);
            });
        }

        return fetch(event.request);
    }

    event.respondWith(
        caches
            .match(event.request)
            .then((cachedResponse) => cachedResponse)
            .catch((err) => {
                console.error("smth went wrong with caches.match: ", err);
            })
    );
});
