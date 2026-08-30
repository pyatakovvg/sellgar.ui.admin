import { AppRegistry } from 'react-native';

import { createNativeLinkingTransport, createNativeRouterBridge } from '@sellgar/app-v2/native';

import { name as appName } from '../app.json';
import { MobileApplication } from './application';

const app = new MobileApplication({
  routerBridge: createNativeRouterBridge({
    transport: createNativeLinkingTransport({ prefixes: ['sellgar-app-v2://'] }),
  }),
});

app.compose();

const AppView = app.createView();

AppRegistry.registerComponent(appName, () => AppView);

void app.initialize().catch(() => {});

declare const module: {
  readonly hot?: {
    dispose(callback: () => void): void;
  };
};

if (module.hot) {
  module.hot.dispose(() => {
    void app.dispose();
  });
}
