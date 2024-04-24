import React from 'react';

import { ProductView } from './View';

import { Provider } from './shops.context.ts';
import { container } from './classes/classes.di.ts';
import { ShopPresenter, ShopPresenterSymbol } from './classes/presenter/shop.presenter.ts';

export default function ShopsModule() {
  const presenter = container.get<ShopPresenter>(ShopPresenterSymbol);

  return () => (
    <Provider value={{ presenter }}>
      <ProductView />
    </Provider>
  );
}
