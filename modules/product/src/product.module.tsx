import React from 'react';

import { ProductView } from './View';

import { Provider } from './product.context.ts';
import { container } from './classes/classes.di.ts';
import { ProductPresenter, ProductPresenterSymbol } from './classes/presenter/product.presenter.ts';

export default function ProductModule() {
  return () => (
    <Provider value={{ presenter: container.get<ProductPresenter>(ProductPresenterSymbol) }}>
      <ProductView />
    </Provider>
  );
}
