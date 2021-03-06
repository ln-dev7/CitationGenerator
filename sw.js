const PREFIX = "V39"
const BASE = location.protocol + "//" + location.host
const cached_FILES = [
    `${BASE}/style.css`,
    `${BASE}/offline.html`,
    `${BASE}/favicon.ico`,
    `${BASE}/img/github-fill.svg`,
    `${BASE}/img/icons/512.png`,
    `${BASE}/img/icons/copy.png`,
]

const LAZY_CACHE = [`${BASE}/scripts/app.js`, `${BASE}/scripts/citations.js`]

self.addEventListener("fetch", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(PREFIX)
            await cache.addAll(cached_FILES)
        })())
    if (event.request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    const preloadResponse = await event.preloadResponse
                    if (preloadResponse) {
                        return preloadResponse
                    }
                    return await fetch(event.request)
                } catch (e) {
                    const cache = await caches.open(PREFIX)
                    return await cache.match("/offline.html")
                }
            })()
        )
    } else if (cached_FILES.includes(event.request.url)) {
        event.respondWith(caches.match(event.request))
    } else if (LAZY_CACHE.includes(event.request.url)) {
        event.respondWith(
            (async () => {
                try {
                    const cache = await caches.open(PREFIX)
                    const preloadResponse = await event.preloadResponse
                    if (preloadResponse) {
                        cache.put(event.request, preloadResponse.clone())
                        return preloadResponse
                    }
                    const networkResponse = await fetch(event.request)
                    cache.put(event.request, networkResponse.clone())
                    return networkResponse
                } catch (e) {
                    return await caches.match(event.request)
                }
            })()
        )
    }
})

self.addEventListener("install", (event) => {
    self.skipWaiting()
    event.waitUntil(
        (async () => {
            const cache = await caches.open(PREFIX)
            await Promise.all(cached_FILES.map((path) => {
                return cache.add(new Request(path))
            }))
        })())
})

self.addEventListener("activate", (event) => {
    self.skipWaiting()
    clients.claim()
    event.waitUntil((async () => {
        const keys = await caches.keys()
        console.log("Keys:" + keys)
        await Promise.all(
            keys.map((key) => {
                if (!key.includes(PREFIX)) {
                    return caches.delete(key)
                }
            })
        )
    })())
})
