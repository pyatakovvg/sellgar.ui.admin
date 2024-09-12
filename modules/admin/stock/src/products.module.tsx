import React from 'react';

import { Provider } from '@/root/products.context.ts';

import { Module } from '@/root/components';

import { container } from '@/root/classes/classes.di.ts';
import { ProductPresenter, ProductPresenterSymbol } from '@/root/classes/presenter/product.presenter.ts';

export default function ProductsModule() {
  const presenter = container.get<ProductPresenter>(ProductPresenterSymbol);

  return () => (
    <Provider value={{ presenter }}>
      <Module />
    </Provider>
  );
}
