import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { ShopsBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(ShopsBindings)
@Module({
  view: ModuleView,
})
export class ShopsModule {}
