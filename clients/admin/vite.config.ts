import { serviceWorker } from '@feature/service-worker/vite';

import { defineConfig } from 'vite';
import reactSwc from '@vitejs/plugin-react-swc';

function createCodeSplittingGroups(mapping: Record<string, string[]>) {
  const entries = Object.entries(mapping);

  return entries.map(([name, packages], index) => ({
    name,
    test: (id: string) => packages.some((pkg) => id.includes(pkg)),
    priority: entries.length - index,
  }));
}

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
