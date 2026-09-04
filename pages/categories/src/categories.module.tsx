import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { CategoriesBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(CategoriesBindings)
@Module({
  view: ModuleView,
})
export class CategoriesModule {}
