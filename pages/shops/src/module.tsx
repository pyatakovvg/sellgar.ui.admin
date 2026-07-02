import { Module, UseBindings } from '@tiyn/app';

import { ShopsView } from './view';

import { ShopsBindings } from './classes/classes.di.ts';

@UseBindings(ShopsBindings)
@Module({
  view: ShopsView,
})
export class ShopsModule {}
