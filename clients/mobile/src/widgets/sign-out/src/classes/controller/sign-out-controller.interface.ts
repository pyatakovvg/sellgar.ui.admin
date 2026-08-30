import type { ControllerArgs } from '@sellgar/app-v2';

export abstract class SignOutControllerInterface {
  abstract action(args: ControllerArgs): Promise<void>;
}
