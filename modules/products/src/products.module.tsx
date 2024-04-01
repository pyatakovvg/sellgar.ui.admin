import React from 'react';

import { ProductView } from './View';
import { Provider } from './products.context.ts';
import { ProductsController } from './products.controller.ts';

export default function ProductsModule() {
  const controller = new ProductsController();

  return () => (
    <Provider value={{ controller }}>
      <ProductView />
    </Provider>
  );
}
