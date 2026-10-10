import type { VitePWAOptions } from 'vite-plugin-pwa';

export interface ServiceWorkerViteOptions {
  readonly manifest?: VitePWAOptions['manifest'];
  readonly includeAssets?: VitePWAOptions['includeAssets'];
  readonly runtimeCaching?: VitePWAOptions['workbox']['runtimeCaching'];
  readonly buildId?: string;
}
