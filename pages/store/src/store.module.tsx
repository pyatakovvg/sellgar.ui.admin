import { StoreOfferChangesProvider } from '@library/provider';
import { UseBindings } from '@sellgar/app-v2';
import { Module } from '@sellgar/app-v2/react';

import { StoreBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(StoreBindings)
@Module({
  providers: [StoreOfferChangesProvider],
  view: ModuleView,
})
export class StoreModule {}
