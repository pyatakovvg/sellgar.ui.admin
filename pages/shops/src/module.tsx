import { Module, UseBindings } from '@sellgar/app';

import { ShopsView } from './view';

import { ShopsBindings } from './classes/classes.di.ts';

@UseBindings(ShopsBindings)
@Module({
  view: ShopsView,
})
export class ShopsModule {}
