import { AuthStoreInterface } from '../stores/auth/auth-store.interface.ts';

export abstract class ApplicationControllerInterface {
  abstract authStore: AuthStoreInterface;
}
