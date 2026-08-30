import { UseBindings } from '@sellgar/app-v2';
import { Module } from '@sellgar/app-v2/native';

import { BrandsBindings } from './classes/classes.bindings.ts';
import { ModuleView } from './view/module.view.tsx';

@UseBindings(BrandsBindings)
@Module({ view: ModuleView })
export class BrandsModule {}
