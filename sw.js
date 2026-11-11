// Sure Power Photo Report — BETA service worker. Keeps the beta on the phone so it opens with no signal.
// Separate from the main app: its own cache names (prefix "beta-"), and it only ever deletes its own old caches.
// Weak signal: if the network hasn't answered in 3 seconds, the saved copy opens instead.
// To publish an update: change VERSION, upload. Phones pick it up the next time they open the beta with signal.
const VERSION = "beta-2026-11-11a";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("beta-") && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
const cached = () => caches.open(VERSION).then(c => c.match("index.html", {ignoreSearch: true}).then(m => m || c.match("./")));
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  if (r.mode === "navigate") {
    // network first (fresh when signal is good), but give up after 3 s and open the saved copy
    const net = fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(VERSION).then(x => x.put("index.html", c)); } return res; });
    const timeout = new Promise(res => setTimeout(() => cached().then(m => m && res(m)), 3000));
    e.respondWith(Promise.race([net.catch(() => cached()), timeout]));
    return;
  }
  e.respondWith(caches.open(VERSION).then(c => c.match(r, {ignoreSearch: true})).then(m => m || fetch(r)));
});
