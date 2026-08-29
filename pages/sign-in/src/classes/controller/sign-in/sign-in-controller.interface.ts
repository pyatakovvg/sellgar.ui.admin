import type { ControllerArgs, WithPayload } from '@sellgar/app-v2';

import type { SignInInput } from './input/sign-in.input.ts';

export abstract class SignInControllerInterface {
  abstract action(args: ControllerArgs<WithPayload<SignInInput>>): Promise<void>;
}
