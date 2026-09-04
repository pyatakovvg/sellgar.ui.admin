import { StoreOfferChangesProvider } from '@library/provider';
import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { StoreBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(StoreBindings)
@Module({
  providers: [StoreOfferChangesProvider],
  view: ModuleView,
})
export class StoreModule {}
