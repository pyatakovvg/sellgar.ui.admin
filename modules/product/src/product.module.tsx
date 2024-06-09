import React from 'react';

import { Provider } from '@/root/product.context.ts';

import { Module } from '@/root/components';

import { container } from '@/classes/classes.di.ts';
import { ProductPresenter, ProductPresenterSymbol } from '@/classes/presenter/product.presenter.ts';

export default function ProductModule() {
  const presenter = container.get<ProductPresenter>(ProductPresenterSymbol);

  return () => (
    <Provider value={{ presenter }}>
      <Module />
    </Provider>
  );
}
