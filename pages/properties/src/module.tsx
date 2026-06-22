import { Module, UseBindings } from '@tiyn/app';

import { PropertyView } from './view';

import { PropertiesBindings } from './classes/classes.di.ts';

@UseBindings(PropertiesBindings)
@Module({
  view: PropertyView,
})
export class ClassModule {}
