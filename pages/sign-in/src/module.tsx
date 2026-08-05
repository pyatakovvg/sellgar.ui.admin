import { Module, UseBindings } from '@sellgar/app';

import { SignInView } from './view';

import { SignInBindings } from './classes/classes.di.ts';

@UseBindings(SignInBindings)
@Module({
  view: SignInView,
})
export class SignInModule {}
