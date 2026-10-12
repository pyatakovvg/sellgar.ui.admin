/// <reference types="vite/client" />
/// <reference lib="esnext" />

interface ImportMetaEnv {
  readonly VITE_GATEWAY_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
