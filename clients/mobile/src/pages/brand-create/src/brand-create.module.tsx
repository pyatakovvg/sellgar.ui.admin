import { UseBindings } from '@sellgar/app-v2';
import { Module } from '@sellgar/app-v2/native';

import { BrandCreateBindings } from './classes/classes.bindings.ts';
import { ModuleView } from './view/module.view.tsx';

@UseBindings(BrandCreateBindings)
@Module({ view: ModuleView })
export class BrandCreateModule {}
