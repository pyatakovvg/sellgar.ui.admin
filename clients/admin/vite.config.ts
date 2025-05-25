import { defineConfig, PluginOption } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// import federation from '@originjs/vite-plugin-federation';

import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // Указываем использовать современный компилятор
      },
    },
  },
  plugins: [
    tsconfigPaths(),
    VitePWA({
      minify: true,
      registerType: 'prompt',
      manifest: {
        id: '/',
        lang: 'ru',
        name: 'Sellgar',
        short_name: 'SG',
        theme_color: 'white',
        display: 'fullscreen',
        background_color: '#ffffff',
        start_url: '.',
        screenshots: [{ src: 'pwa/pwa-512x512.png', sizes: '512x512', form_factor: 'wide' }],
        icons: [
          {
            src: 'pwa/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globDirectory: 'build',
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
        maximumFileSizeToCacheInBytes: 9000000,
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
    process.env.NODE_ENV === 'production' &&
      (visualizer({
        template: 'treemap', // or sunburst
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'build/analyse.html', // will be saved in project's root
      }) as PluginOption),
  ],
});
