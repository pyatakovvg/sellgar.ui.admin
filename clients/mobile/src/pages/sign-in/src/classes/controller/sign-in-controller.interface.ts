import type { ControllerArgs } from '@sellgar/app-v2';

export abstract class SignInControllerInterface {
  abstract loader(args: ControllerArgs): Promise<void>;
  abstract action(args: ControllerArgs): Promise<void>;
}
