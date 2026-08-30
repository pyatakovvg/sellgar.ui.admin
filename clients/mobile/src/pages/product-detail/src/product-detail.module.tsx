import { UseBindings } from '@sellgar/app-v2';
import { Module } from '@sellgar/app-v2/native';

import { ProductDetailBindings } from './classes/classes.bindings.ts';
import { ModuleView } from './view/module.view.tsx';

@UseBindings(ProductDetailBindings)
@Module({ view: ModuleView })
export class ProductDetailModule {}
