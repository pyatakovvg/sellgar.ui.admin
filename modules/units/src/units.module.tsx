import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { UnitsBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(UnitsBindings)
@Module({
  view: ModuleView,
})
export class UnitsModule {}
