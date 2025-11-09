/// <reference types="react" />
/// <reference types="vite/client" />

declare interface Window {
  env: {
    NODE_ENV: boolean;
    GATEWAY_HOST_API: string;
    GATEWAY_WALLETS_BFF_API: string;
  };
}
