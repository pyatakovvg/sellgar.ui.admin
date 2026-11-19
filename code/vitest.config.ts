/// <reference types="vitest" />

import { serviceWorker } from '@feature/service-worker/vite';
import reactSwc from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

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
    serviceWorker({
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
    }),
  ],
});
