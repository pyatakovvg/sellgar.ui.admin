import { Module } from '@library/app';

import React from 'react';

import { ShopsView } from './view';

import { containerModule } from './classes/classes.di.ts';
import { ShopControllerInterface } from './classes/controller/shop-controller.interface.ts';

@Module({
  imports: [containerModule],
  controllers: [ShopControllerInterface],
  view: <ShopsView />,
})
export class ProductsModule {}
