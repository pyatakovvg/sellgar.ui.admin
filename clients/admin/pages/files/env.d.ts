/// <reference types="react" />
/// <reference types="vite/client" />

declare interface Window {
  env: {
    NODE_ENV: 'development' | 'production' | 'test';

    GATEWAY_API: string;
  };
}
