import { ProfileStoreInterface } from '../stores/profile/profile-store.interface.ts';
import { ApplicationStoreInterface } from '../stores/application/application-store.interface.ts';

export abstract class ApplicationControllerInterface {
  abstract readonly profileStore: ProfileStoreInterface;
  abstract readonly applicationStore: ApplicationStoreInterface;

  abstract loadProfile(): Promise<void>;
}
