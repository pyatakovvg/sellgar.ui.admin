import React from 'react';

import { ProductView } from './View';

import { Provider } from './shops.context.ts';
import { container } from './classes/classes.di.ts';
import { ShopPresenter, ShopPresenterSymbol } from './classes/presenter/shop.presenter.ts';

export default function ShopsModule() {
  return () => (
    <Provider value={{ presenter: container.get<ShopPresenter>(ShopPresenterSymbol) }}>
      <ProductView />
    </Provider>
  );
}
