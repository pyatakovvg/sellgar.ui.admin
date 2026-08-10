import type { ControllerActionArgs, ControllerInterface } from '@sellgar/app';

import type { SignInInput } from './input/sign-in.input.ts';

export abstract class SignInControllerInterface implements ControllerInterface {
  abstract action(args: ControllerActionArgs<SignInInput>): Promise<void>;
}
