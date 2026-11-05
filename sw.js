/* Helenback offline cache */
const V="hb14-v15";
const PRE=["photos/reel/2012d.jpg","photos/fun/2012d.jpg","photos/reel/2010b.jpg","photos/fun/2010a.jpg","photos/reel/2020d.jpg","photos/reel/2020e.jpg","photos/reel/2021d.jpg","photos/reel/2021e.jpg","photos/reel/2022d.jpg","photos/reel/2022e.jpg","photos/reel/2023d.jpg","photos/reel/2023e.jpg","photos/reel/2024d.jpg","photos/reel/2024e.jpg","photos/reel/2025d.jpg","photos/reel/2025f.jpg","./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "helenback-xiv.ics", "photos/2012.jpg", "photos/2024.jpg", "photos/2025.jpg", "photos/2013.jpg", "photos/2020.jpg", "photos/2016.jpg", "photos/2021.jpg", "photos/2008.jpg", "photos/2023.jpg", "photos/2022.jpg", "photos/fun/2025b.jpg", "photos/fun/2016b.jpg", "photos/fun/2025c.jpg", "photos/fun/2012a.jpg", "photos/fun/2013b.jpg", "photos/fun/2020b.jpg", "photos/fun/2021c.jpg", "photos/fun/2013a.jpg", "photos/fun/2022a.jpg", "photos/fun/2024a.jpg", "photos/fun/2016a.jpg", "photos/fun/2023a.jpg", "photos/fun/2022b.jpg", "photos/fun/2020c.jpg", "photos/fun/2021a.jpg", "photos/fun/2023c.jpg", "photos/fun/2020a.jpg", "photos/fun/2022c.jpg", "photos/fun/2012c.jpg", "photos/fun/2024b.jpg", "photos/fun/2023b.jpg", "photos/fun/2024c.jpg", "photos/fun/2012b.jpg", "photos/fun/2021b.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET")return;
  const sameOrigin=u.origin===location.origin;
  const fonts=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if(!sameOrigin&&!fonts)return; /* live data (weather, scores) always goes to the network */
  e.respondWith(caches.open(V).then(c=>c.match(e.request,{ignoreSearch:sameOrigin}).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==="opaque"))c.put(e.request,r.clone());return r}).catch(()=>hit);
    return hit||net;
  })));
});
