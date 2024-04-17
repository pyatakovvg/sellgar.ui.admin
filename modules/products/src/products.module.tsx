import React from 'react';

import { View } from './View';

import { Provider } from './products.context.ts';

import { container } from './classes/classes.di.ts';
import { ProductPresenter, ProductPresenterSymbol } from './classes/presenter/product.presenter.ts';

export default function ProductsModule() {
  return () => (
    <Provider value={{ presenter: container.get<ProductPresenter>(ProductPresenterSymbol) }}>
      <View />
    </Provider>
  );
}
