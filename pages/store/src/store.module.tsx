import { StoreOfferChangesProvider } from '@library/provider';
import { Module, UseBindings } from '@sellgar/app';

import { StoreBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(StoreBindings)
@Module({
  providers: [StoreOfferChangesProvider],
  view: ModuleView,
})
export class StoreModule {}
