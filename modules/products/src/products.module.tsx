import React from 'react';

import { View } from './components';

import { Provider } from './products.context.ts';

import { container } from './classes/classes.di.ts';
import { ProductPresenter, ProductPresenterSymbol } from './classes/presenter/product.presenter.ts';

export default function ProductsModule() {
  const presenter = container.get<ProductPresenter>(ProductPresenterSymbol);

  return () => (
    <Provider value={{ presenter }}>
      <View />
    </Provider>
  );
}
