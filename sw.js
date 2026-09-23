const CACHE_NAME="adhkar-daily-v18";
const ASSETS=[
  "./",
  "./index.html",
  "./adhkar.html",
  "./duas.html",
  "./tasbeeh.html",
  "./ruqyah.html",
  "./style.css",
  "./morning-scene.png",
  "./evening-scene.png",
  "./app-icon.svg",
  "./assets/home-illustrations.jpg",
  "./assets/home-scenes.svg",
  "./assets/home-scenes-sprite.jpg",
  "./assets/morning_scene.jpg",
  "./assets/morning_card.png",
  "./assets/evening_scene.jpg",
  "./assets/evening_card.png",
  "./assets/sleep_scene.jpg",
  "./assets/sleep_card.png",
  "./assets/dua_scene.jpg",
  "./assets/dua_card.png",
  "./assets/tasbeeh_scene.jpg",
  "./assets/tasbeeh_card.png",
  "./assets/ruqyah_scene.jpg",
  "./assets/ruqyah_card.png"
];
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    const copy=response.clone();
    caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));
    return response;
  }).catch(()=>caches.match("./index.html"))));
});