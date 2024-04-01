/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-pwa/info" />

/// <reference lib="esnext" />

/// <reference lib="webworker" />

interface ImportMetaEnv {
  readonly NODE_ENV: 'development';

  readonly VITE_PUBLIC_URL: string;

  readonly VITE_WEBSITE_NAME: string;
  readonly VITE_GATEWAY_API: string;

  readonly VITE_USE_SERVICE_WORKER: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
