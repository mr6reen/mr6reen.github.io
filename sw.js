const CACHE = 'caloriq-v1';

const FILES = [
  '/',
  '/index.html',
  '/onboarding-1.html',
  '/onboarding-2.html',
  '/presets.html',
  '/history.html',
  '/settings.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Install: cache all files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// ── Smart evening notification ─────────────────────────────────────────────
// Main app sends a 'SCHEDULE_NOTIFICATION' message with ms until 20:00.
// SW sets a timeout and fires notification only if user hasn't logged since 17:00.

self.addEventListener('message', e => {
  if (e.data?.type !== 'SCHEDULE_NOTIFICATION') return;

  const { msUntil8pm, todayKey } = e.data;

  setTimeout(() => {
    // Read today's logs from all open clients via a trick:
    // SW can't access localStorage directly — so we stored last log time
    // in the message. Check it here.
    const lastLogTime = e.data.lastLogTime || 0;
    const cutoff = new Date();
    cutoff.setHours(17, 0, 0, 0); // 17:00 today

    // Only notify if nothing logged after 17:00
    if (lastLogTime < cutoff.getTime()) {
      const remaining = e.data.remaining; // kcal remaining, sent from app
      const messages = [
        `Осталось ${remaining} ккал на сегодня. Закрой день! 🔥`,
        `Не забудь залогировать ужин. Ты на правильном пути 💪`,
        `День почти закончился. Как прошло с калориями? 📊`,
      ];
      const text = messages[Math.floor(Math.random() * messages.length)];

      self.registration.showNotification('Caloriq', {
        body: text,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'daily-reminder',   // replaces previous notification of same tag
        renotify: false,
        data: { url: '/index.html' },
      });
    }
  }, msUntil8pm);
});

// Tap on notification → open app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      // Focus existing window if open
      for (const client of list) {
        if (client.url.includes('/index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      return clients.openWindow(e.notification.data?.url || '/index.html');
    })
  );
});
