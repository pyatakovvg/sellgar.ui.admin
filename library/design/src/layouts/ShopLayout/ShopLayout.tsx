import React from 'react';

import { Layout } from './View';

import { container } from './classes/classes.di';

import { Provider } from './shop-layout.context';
import { ShopPresenter, ShopPresenterSymbol } from './classes/presenter/shop.presenter.ts';

export const ShopLayout: React.FC = () => {
  return (
    <Provider
      value={{
        presenter: container.get<ShopPresenter>(ShopPresenterSymbol),
      }}
    >
      <Layout />
    </Provider>
  );
};
