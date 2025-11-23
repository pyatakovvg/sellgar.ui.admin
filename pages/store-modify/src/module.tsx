import { Module } from '@library/app';

import React from 'react';

import { ModifyView } from './view';

import { containerModule } from './classes/classes.di.ts';
import { ProductPresenterInterface } from './classes/presenter/product-presenter.interface.ts';

@Module({
  imports: [containerModule],
  controllers: [ProductPresenterInterface],
  view: <ModifyView />,
})
export class ClassModule {}
