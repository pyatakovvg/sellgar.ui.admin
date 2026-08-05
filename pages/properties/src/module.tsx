import { Module, UseBindings } from '@sellgar/app';

import { PropertyView } from './view';

import { PropertiesBindings } from './classes/classes.di.ts';

@UseBindings(PropertiesBindings)
@Module({
  view: PropertyView,
})
export class ClassModule {}
