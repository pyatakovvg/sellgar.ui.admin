export type {};
declare const self: ServiceWorkerGlobalScope;

self.addEventListener('push', function (event) {
  let notificationData: any = {};

  try {
    notificationData = event.data?.json();
  } catch (e) {
    notificationData = {
      title: 'Default title',
      body: 'Default message',
    };
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
    }),
  );
});

// Обработка клика по уведомлению
self.addEventListener('notificationclick', function (event) {
  event.notification.close(); // Закрываем уведомление

  event.waitUntil(self.clients.openWindow('http://localhost:4173/wallets/sign-in'));
});
