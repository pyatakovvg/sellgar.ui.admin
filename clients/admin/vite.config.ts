import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import reactSwc from '@vitejs/plugin-react-swc';

function createCodeSplittingGroups(mapping: Record<string, string[]>) {
  const entries = Object.entries(mapping);

  return entries.map(([name, packages], index) => ({
    name,
    test: (id: string) => packages.some((pkg) => id.includes(pkg)),
    priority: entries.length - index,
  }));
}

const ONE_DAY = 60 * 60 * 24;
const MAXIMUM_CACHE_FILE_SIZE = 10 * 1024 * 1024;

export default defineConfig({
  cacheDir: '/tmp/.vite',
  build: {
    modulePreload: false,
    outDir: 'build',
    chunkSizeWarningLimit: 4000,
    sourcemap: process.env.SOURCE_MAP === 'true',
    rolldownOptions: {
      output: {
        keepNames: true,
        codeSplitting: {
          groups: createCodeSplittingGroups({
            'react.vendor': ['react', 'react-dom', 'react-router'],
          }),
        },
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
      plugins: [],
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
        globIgnores: ['**/config.js'],
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
