import React from 'react';

import { ProductView } from './View';
import { Provider } from './product.context.ts';
import { ProductController } from './product.controller.ts';

export default function ProductModule() {
  const controller = new ProductController();

  return () => (
    <Provider value={{ controller }}>
      <ProductView />
    </Provider>
  );
}
