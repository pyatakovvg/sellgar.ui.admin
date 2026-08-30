import { UseBindings } from '@sellgar/app-v2';
import { Module } from '@sellgar/app-v2/native';

import { SignInBindings } from './classes/classes.bindings.ts';
import { ModuleView } from './view/module.view.tsx';

@UseBindings(SignInBindings)
@Module({ view: ModuleView })
export class SignInModule {}
