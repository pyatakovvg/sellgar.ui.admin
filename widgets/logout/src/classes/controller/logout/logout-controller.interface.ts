import { WidgetControllerInterface } from '@sellgar/app';
import type { WidgetControllerActionArgs } from '@sellgar/app';

export abstract class LogoutControllerInterface extends WidgetControllerInterface {
  abstract action(args: WidgetControllerActionArgs<Record<string, never>, void>): Promise<void>;
}
