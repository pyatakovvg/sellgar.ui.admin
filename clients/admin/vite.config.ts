import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, PluginOption } from 'vite';

import react from '@vitejs/plugin-react-swc';
import {} from '@vite-pwa/assets-generator';
// import federation from '@originjs/vite-plugin-federation';

// import { visualizer } from 'rollup-plugin-visualizer';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  plugins: [
    react({
      tsDecorators: true,
    }),
    chunkSplitPlugin({
      strategy: 'default',
      customSplitting: {
        'react.vendor': ['react', 'react-dom', 'react-router-dom'],
        'mobx.vendor': ['mobx', 'mobx-react'],

        'app.vendor': ['@library/app'],
        'library.vendor': ['@library/kit', '@library/design'],
      },
    }),
    VitePWA({
      minify: true,
      registerType: 'autoUpdate',
      manifest: {
        id: '/',
        lang: 'ru',
        name: 'Sellgar',
        short_name: 'SG',
        theme_color: 'white',
        display: 'fullscreen',
        background_color: '#ffffff',
        start_url: '.',
        screenshots: [{ src: 'pwa-512x512.png', sizes: '512x512', form_factor: 'wide' }],
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globDirectory: 'build',
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
    // federation({
    //   name: 'pokemonList',
    //   filename: 'remoteEntry.js',
    //   exposes: {
    //     './PokemonList': './src/components/PokemonList',
    //     './Pokemon': './src/atoms/Pokemon.ts',
    //   },
    //   shared: ['react', 'react-dom'],
    // }),
    // process.env.NODE_ENV === 'production' &&
    //   (visualizer({
    //     template: 'treemap', // or sunburst
    //     open: true,
    //     gzipSize: true,
    //     brotliSize: true,
    //     filename: 'build/analyse.html', // will be saved in project's root
    //   }) as PluginOption),
  ],
});
