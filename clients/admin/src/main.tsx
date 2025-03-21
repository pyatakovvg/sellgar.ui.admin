import 'reflect-metadata';
import { registerSW } from 'virtual:pwa-register';

import '@sellgar/kit/font.css';
import '@sellgar/kit/theme.css';
import './styles/index.css';

import './bootstrap';

const intervalMS = 60 * 60 * 1000;

registerSW({
  onRegisteredSW(swUrl, r) {
    r &&
      setInterval(async () => {
        if (!(!r.installing && navigator)) return;

        if ('connection' in navigator && !navigator.onLine) return;

        const resp = await fetch(swUrl, {
          cache: 'no-store',
          headers: {
            cache: 'no-store',
            'cache-control': 'no-cache',
          },
        });

        if (resp?.status === 200) await r.update();
      }, intervalMS);
  },
});
