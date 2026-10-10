import type { PluginOption } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { ServiceWorkerBuildPlugin } from './service-worker-build.plugin.ts';
import type { ServiceWorkerViteOptions } from './service-worker-vite.options.ts';
import { createRuntimeCaching } from './runtime-caching.ts';

export function serviceWorker(options: ServiceWorkerViteOptions = {}): PluginOption[] {
  return [
    new ServiceWorkerBuildPlugin(options.buildId),
    VitePWA({
      strategies: 'generateSW',
      minify: true,
      injectRegister: false,
      registerType: 'prompt',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: options.manifest ?? false,
      includeAssets: options.includeAssets,
      workbox: {
        skipWaiting: false,
        clientsClaim: false,
        cleanupOutdatedCaches: true,
        globIgnores: ['**/config.js'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        runtimeCaching: [...(options.runtimeCaching ?? []), ...createRuntimeCaching()],
      },
    }),
  ];
}
