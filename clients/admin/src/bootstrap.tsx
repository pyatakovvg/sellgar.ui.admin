import React from 'react';
import ReactDOM from 'react-dom/client';

import { AdminApplication } from './application';
import { RegisterAndUpdateServiceWorker } from './sw';

const app = new AdminApplication();

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
