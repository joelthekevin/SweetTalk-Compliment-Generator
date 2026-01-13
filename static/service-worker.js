const CACHE_NAME = "compliment-cache-v1";
const OFFLINE_COMPLIMENT = "You are amazing — even offline 💖";

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
    );
});

self.addEventListener("fetch", event => {
    if (!navigator.onLine) {
        event.respondWith(
            new Response(
                JSON.stringify({ compliment: OFFLINE_COMPLIMENT }),
                { headers: { "Content-Type": "application/json" } }
            )
        );
    }
});
