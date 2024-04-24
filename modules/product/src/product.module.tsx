import React from 'react';

import { ProductView } from './View';

import { Provider } from './product.context.ts';
import { container } from './classes/classes.di.ts';
import { ProductPresenter, ProductPresenterSymbol } from './classes/presenter/product.presenter.ts';

export default function ProductModule() {
  const presenter = container.get<ProductPresenter>(ProductPresenterSymbol);

  return () => (
    <Provider value={{ presenter }}>
      <ProductView />
    </Provider>
  );
}
