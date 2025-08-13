import { LogoutStoreInterface } from '../store/logout/logout-store.interface.ts';

export abstract class LogoutControllerInterface {
  abstract readonly logoutStore: LogoutStoreInterface;

  abstract logout(): Promise<void>;
}
