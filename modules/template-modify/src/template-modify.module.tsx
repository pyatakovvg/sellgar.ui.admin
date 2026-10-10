import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { TemplateModifyBindings } from './classes/classes.bindings.ts';
import { ModuleView } from './view/module.view.tsx';

@UseBindings(TemplateModifyBindings)
@Module({ view: ModuleView })
export class TemplateModifyModule {}
