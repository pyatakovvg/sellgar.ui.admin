import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { CartsBindings } from './classes/classes.bindings.ts';
import { ModuleView } from './view/module.view.tsx';

@UseBindings(CartsBindings)
@Module({ view: ModuleView })
export class CartsModule {}
