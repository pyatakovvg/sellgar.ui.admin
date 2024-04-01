import React from 'react';

import { ShopView } from './View';
import { Provider } from './shop.context.ts';
import { ShopController } from './shop.controller.ts';

export default function ShopModule() {
  const controller = new ShopController();

  return () => (
    <Provider value={{ controller }}>
      <ShopView />
    </Provider>
  );
}
