import React from 'react';

import { Module } from './components';

import { Provider } from './shop.context.ts';

import { container } from './classes/classes.di.ts';
import { ShopPresenter, ShopPresenterSymbol } from './classes/presenter/shop.presenter.ts';

export default function ShopModule() {
  const presenter = container.get<ShopPresenter>(ShopPresenterSymbol);

  return () => (
    <Provider value={{ presenter }}>
      <Module />
    </Provider>
  );
}
