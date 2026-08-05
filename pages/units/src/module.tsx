import { Module, UseBindings } from '@sellgar/app';

import { UnitView } from './view';

import { UnitsBindings } from './classes/classes.di.ts';

@UseBindings(UnitsBindings)
@Module({
  view: UnitView,
})
export class ClassModule {}
