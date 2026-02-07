import { AuthStoreInterface } from '../stores/auth/auth-store.interface.ts';
import { DataStoreInterface } from '../stores/data/data-store.interface.ts';
import { NavigateServiceInterface } from '../services/navigate/navigate-service.interface.ts';
import { RevalidateServiceInterface } from '../services/revalidate/revalidate-service.interface.ts';

export abstract class ApplicationControllerInterface {
  abstract authStore: AuthStoreInterface;
  abstract dataStore: DataStoreInterface;
  abstract navigateService: NavigateServiceInterface;
  abstract revalidateService: RevalidateServiceInterface;
}
