/* いっしょにパシャ: でんぱが なくても ひらける。ネットがあるときは いつも新しい版を取りに行くので、GitHubに上げるだけで自動で新しくなる */
const C='pasha-300';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./sprites/yuji.png','./sprites/shizu.png','./sprites/saki.png','./sprites/karen.png','./sprites/aki.png','./sprites/shichan.png','./sprites/yoppy.png','./sprites/santa.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(FILES.map(f=>c.add(new Request(f,{cache:'reload'})).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})
  .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match('./index.html').then(x=>x||caches.match('./')):undefined))))});
