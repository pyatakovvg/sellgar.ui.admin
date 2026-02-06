import { AuthStoreInterface } from '../stores/auth/auth-store.interface.ts';
import { DataStoreInterface } from '../stores/data/data-store.interface.ts';

export abstract class ApplicationControllerInterface {
  abstract authStore: AuthStoreInterface;
  abstract dataStore: DataStoreInterface;
}
