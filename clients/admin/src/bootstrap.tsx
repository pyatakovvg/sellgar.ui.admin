import React from 'react';
import ReactDOM from 'react-dom/client';
import { createWebRouterBridge } from '@sellgar/app/react';

import { AdminApplication } from './application';
import { RegisterAndUpdateServiceWorker } from './sw';

const app = new AdminApplication({
  routerBridge: createWebRouterBridge({
    basePath: import.meta.env['BASE_URL'],
  }),
});

app.compose();

const AppView = app.createView();

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(
  <React.StrictMode>
    <RegisterAndUpdateServiceWorker />
    <AppView />
  </React.StrictMode>,
);

void app.initialize().catch(() => {});

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    root.unmount();
    void app.dispose();
  });
}
