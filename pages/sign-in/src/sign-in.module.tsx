import { UseBindings } from '@sellgar/app';
import { Module } from '@sellgar/app/react';

import { SignInBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(SignInBindings)
@Module({
  view: ModuleView,
})
export class SignInModule {}
