import { Module } from '@library/app';

import React from 'react';

import { ProductsView } from './view';

import { containerModule } from './classes/classes.di.ts';
import { ProductsControllerInterface } from './classes/controller/products-controller.interface.ts';

@Module({
  imports: [containerModule],
  controllers: [ProductsControllerInterface],
  view: <ProductsView />,
})
export class ProductsModule {}
