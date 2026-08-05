import { Module, UseBindings } from '@sellgar/app';

import { CategoryView } from './view';

import { CategoriesBindings } from './classes/classes.di.ts';

@UseBindings(CategoriesBindings)
@Module({
  view: CategoryView,
})
export class CategoriesModule {}
