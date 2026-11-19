// DES iApps Hub — isolated PWA worker.
// This worker may only cache URLs inside /ides-apps-hub/ and only manages its own cache namespace.
const CACHE_NAME = "des-iapps-hub-shell-v3";
const CACHE_PREFIX = "des-iapps-hub-";
const APP_SCOPE = new URL(self.registration.scope);
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/des-iapps-icon.png",
  "./assets/des-school-logo.png",
  "./assets/iAttend.png",
  "./assets/iRecords.png",
  "./assets/iDES.png",
  "./assets/iSupply.png",
  "./assets/iCSM.png",
  "./assets/iDocs.png",
  "./assets/iProperties.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
].map(path => new URL(path, APP_SCOPE).href);

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== APP_SCOPE.origin || !url.pathname.startsWith(APP_SCOPE.pathname)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    // Prefer the cached shell for navigation when offline; otherwise refresh from network.
    if (request.mode === "navigate") {
      try {
        const response = await fetch(request);
        if (response && response.ok) cache.put(request, response.clone());
        return response;
      } catch (_) {
        return cached || cache.match(new URL("index.html", APP_SCOPE).href);
      }
    }

    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    } catch (_) {
      return Response.error();
    }
  })());
});
