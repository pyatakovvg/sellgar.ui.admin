import { Module, UseBindings } from '@tiyn/app';

import { ModifyView } from './view';

import { StoreModifyBindings } from './classes/classes.di.ts';

@UseBindings(StoreModifyBindings)
@Module({
  view: ModifyView,
})
export class ClassModule {}
