import { Module, UseBindings } from '@tiyn/app';

import { UnitView } from './view';

import { UnitsBindings } from './classes/classes.di.ts';

@UseBindings(UnitsBindings)
@Module({
  view: UnitView,
})
export class ClassModule {}
