import type { VitePWAOptions } from 'vite-plugin-pwa';

const ONE_DAY = 60 * 60 * 24;

export function createRuntimeCaching(): NonNullable<VitePWAOptions['workbox']['runtimeCaching']> {
  return [
    {
      urlPattern: ({ request, url }) =>
        request.destination === 'image' && /\.(ico|png|svg|webp|webv)$/i.test(url.pathname),
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-images-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: ONE_DAY,
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: ({ request, url }) => request.destination === 'font' && /\.(ttf|woff|woff2|eot)$/i.test(url.pathname),
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-fonts-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: ONE_DAY * 365,
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
  ];
}
