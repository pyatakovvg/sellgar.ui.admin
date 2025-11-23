import { Module } from '@library/app';

import React from 'react';

import { CategoryView } from './view';

import { containerModule } from './classes/classes.di.ts';
import { CategoryControllerInterface } from './classes/controller/category-controller.interface.ts';

@Module({
  imports: [containerModule],
  controllers: [CategoryControllerInterface],
  view: <CategoryView />,
})
export class CategoriesModule {}
