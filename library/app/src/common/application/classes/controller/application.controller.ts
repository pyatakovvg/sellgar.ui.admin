import { injectable, inject } from 'inversify';

import { AuthStoreInterface } from '../stores/auth/auth-store.interface.ts';
import { DataStoreInterface } from '../stores/data/data-store.interface.ts';
import { NavigateServiceInterface } from '../services/navigate/navigate-service.interface.ts';
import { LocationServiceInterface } from '../services/location/location-service.interface.ts';
import { RevalidateServiceInterface } from '../services/revalidate/revalidate-service.interface.ts';
import { WidgetRevalidateServiceInterface } from '../services/widget-revalidate/widget-revalidate-service.interface.ts';

import { ApplicationControllerInterface } from './application-controller.interface.ts';

@injectable()
export class ApplicationController implements ApplicationControllerInterface {
  constructor(
    @inject(AuthStoreInterface) readonly authStore: AuthStoreInterface,
    @inject(DataStoreInterface) readonly dataStore: DataStoreInterface,
    @inject(NavigateServiceInterface) readonly navigateService: NavigateServiceInterface,
    @inject(LocationServiceInterface) readonly locationService: LocationServiceInterface,
    @inject(RevalidateServiceInterface) readonly revalidateService: RevalidateServiceInterface,
    @inject(WidgetRevalidateServiceInterface) readonly widgetRevalidateService: WidgetRevalidateServiceInterface,
  ) {}
}
