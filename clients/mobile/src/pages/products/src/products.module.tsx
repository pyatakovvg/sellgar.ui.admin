import { UseBindings } from '@sellgar/app-v2';
import { Module } from '@sellgar/app-v2/native';

import { ProductsBindings } from './classes/classes.bindings.ts';
import { ModuleView } from './view/module.view.tsx';

@UseBindings(ProductsBindings)
@Module({ view: ModuleView })
export class ProductsModule {}
