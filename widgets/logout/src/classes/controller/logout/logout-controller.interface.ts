import type { ControllerArgs, WithPayload, WithProps } from '@sellgar/app';

export abstract class LogoutControllerInterface {
  abstract action(
    args: ControllerArgs<WithPayload<void, WithProps<Record<string, never>>>>,
  ): Promise<void>;
}
