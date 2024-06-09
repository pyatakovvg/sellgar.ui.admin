/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TAKE: number;
  readonly VITE_PUBLIC_URL: string;
  readonly VITE_GATEWAY_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
