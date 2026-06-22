import { type WidgetControllerInterface } from '@tiyn/app';

import { LogoutStoreInterface } from '../store/logout/logout-store.interface.ts';

export abstract class LogoutControllerInterface implements WidgetControllerInterface {
  abstract readonly logoutStore: LogoutStoreInterface;

  abstract logout(): Promise<void>;
}
