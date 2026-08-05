import { Module, UseBindings } from '@sellgar/app';

import { BrandView } from './view';

import { BrandsBindings } from './classes/classes.di.ts';

@UseBindings(BrandsBindings)
@Module({
  view: BrandView,
})
export class BrandsModule {}
