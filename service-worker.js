const CACHE_NAME = "firstpwa-v3";
var urlToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/css/materialize.min.css",
    "/images/icon.png",
    "/manifest.json",
];

self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlToCache);
        })
    );
});

self.addEventListener("fetch", function(e){
    e.respondWith(
        caches
        .match(e.request, {cacheName: CACHE_NAME})
        .then(function(response){
            if(response){
                console.log("ServiceWorker : gunakan akses dari cache: ", response.url);
                return response;
            }else{
                console.log("ServiceWorker : memuat asset dari server:", e.request.url);
                return fetch(e.request);
            }
        })
    );
});

self.addEventListener("activate", function(e){
    e.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if(cacheName != CACHE_NAME){
                        console.log("ServiceWorker: cache "+ cacheName + " dihapus.");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
});