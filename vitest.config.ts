/// <reference types="vitest" />

import { VitePWA } from 'vite-plugin-pwa';
import reactSwc from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

const ONE_DAY = 60 * 60 * 24;
const MAXIMUM_CACHE_FILE_SIZE = 10 * 1024 * 1024;

export default defineConfig({
  cacheDir: '/tmp/.vite',
  test: {
    cache: {
      dir: '/tmp/',
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup-tests.ts',
    logHeapUsage: true,
    server: {
      deps: {
        inline: ['@sellgar/kit'],
      },
    },
  },
  optimizeDeps: {
    include: ['nanoid/non-secure'],
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      drafts: {
        customMedia: true,
      },
      cssModules: true,
    },
  },
  plugins: [
    reactSwc({
      tsDecorators: true,
    }),
    VitePWA({
      minify: true,
      registerType: 'prompt',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        id: '/terminals-management',
        lang: 'ru',
        name: 'Tiyn management terminals',
        short_name: 'TmT',
        theme_color: '#ffffff',
        display: 'fullscreen',
        background_color: '#ffffff',
        start_url: '.',
      },
      workbox: {
        skipWaiting: false,
        clientsClaim: false,
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: MAXIMUM_CACHE_FILE_SIZE,
        runtimeCaching: [
          {
            urlPattern: /.*\.(ico|png|svg|webp|webv)/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-images-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: ONE_DAY,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /.*\.(ttf|woff|woff2|eot)/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: ONE_DAY * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
