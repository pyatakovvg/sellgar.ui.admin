/// <reference types="vite/client" />

declare interface Window {
  env: {
    NODE_ENV: 'development' | 'production' | 'test';
    CDN_IMAGES_URL: string;
    GATEWAY_API: string;
    SOCKET_GATEWAY_API: string;
  };
}
