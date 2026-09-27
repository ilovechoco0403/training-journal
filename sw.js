'use strict';
const CACHE='training-journal-v1.0.1';
const ROOT=new URL('./',self.location).href;
const ASSETS=['./','index.html','styles.css','app.js','vendor/xlsx.full.min.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(p=>new URL(p,ROOT).href)))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('training-journal-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(ROOT))return;
if(event.request.mode==='navigate'){event.respondWith(caches.open(CACHE).then(cache=>cache.match(new URL('index.html',ROOT).href)).then(cached=>cached||fetch(event.request)));return;}
event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
