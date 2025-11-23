import { InitStoreInterface } from '../stores/init/init-store.interface.ts';
import { AuthStoreInterface } from '../stores/auth/auth-store.interface.ts';
import { ProfileStoreInterface } from '../stores/profile/profile-store.interface.ts';

export abstract class ApplicationControllerInterface {
  abstract initStore: InitStoreInterface;
  abstract authStore: AuthStoreInterface;
  abstract profileStore: ProfileStoreInterface;

  abstract loadProfile(): Promise<void>;
}
