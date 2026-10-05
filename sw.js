// Guarda o app no celular para abrir mesmo sem internet.
// Ao publicar uma versão nova, aumente o número abaixo.
const VERSAO = 'financas-v1';
const LOCAIS = ['./', 'index.html', 'firebase-config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(LOCAIS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Dados do Firebase nunca passam pelo cache daqui (o próprio Firebase cuida do modo offline).
  if (/firestore\.googleapis|identitytoolkit|securetoken|googleapis\.com\/identity/.test(url.host + url.pathname)) return;
  const local = url.origin === self.location.origin;
  const biblioteca = /gstatic\.com|unpkg\.com|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url.host);
  if (!local && !biblioteca) return;
  if (local) {
    // Arquivos do app: tenta a versão nova primeiro; sem internet, usa a guardada.
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSAO).then(x => x.put(req, c)); return r; }).catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
  } else {
    // Bibliotecas e fontes: usa a guardada; busca na rede só se ainda não tiver.
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const c = res.clone(); caches.open(VERSAO).then(x => x.put(req, c)); return res; })));
  }
});
