import { Module } from '@library/app';

import React from 'react';

import { BrandView } from './view';

import { BrandsControllerInterface } from './classes/controller/brand-controller.interface.ts';

import { containerModule } from './classes/classes.di.ts';

@Module({
  imports: [containerModule],
  controllers: [BrandsControllerInterface],
  view: <BrandView />,
})
export class BrandsModule {}
