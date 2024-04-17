import React from 'react';

import { ShopView } from './View';

import { Provider } from './shop.context.ts';

import { container } from './classes/classes.di.ts';
import { ShopPresenter, ShopPresenterSymbol } from './classes/presenter/shop.presenter.ts';

export default function ShopModule() {
  return () => (
    <Provider value={{ presenter: container.get<ShopPresenter>(ShopPresenterSymbol) }}>
      <ShopView />
    </Provider>
  );
}
