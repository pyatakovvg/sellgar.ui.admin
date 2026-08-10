import { Module, UseBindings } from '@sellgar/app';

import { SignInBindings } from './classes/classes.bindings.ts';

import { ModuleView } from './view/module.view.tsx';

@UseBindings(SignInBindings)
@Module({
  view: ModuleView,
})
export class SignInModule {}
