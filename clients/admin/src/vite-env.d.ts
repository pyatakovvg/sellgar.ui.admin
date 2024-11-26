/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-pwa/info" />

/// <reference lib="esnext" />

/// <reference lib="webworker" />

interface ImportMetaEnv {
  readonly VITE_USE_SERVICE_WORKER: 'true' | 'false';

  readonly VITE_TAKE: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare interface Window {
  env: {
    NODE_ENV: 'development' | 'production' | 'test';

    GATEWAY_API: string;
  };
}
