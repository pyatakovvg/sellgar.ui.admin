import { ProfileEntity } from '@library/domain';
import { ApplicationStoreInterface, Controller, Inject } from '@tiyn/app';

import { DashboardConstructorInterface } from './dashboard-constructor.interface.ts';

@Controller()
export class DashboardConstructor implements DashboardConstructorInterface {
  constructor(@Inject(ApplicationStoreInterface) private readonly store: ApplicationStoreInterface) {
    console.log(this.store.get(ProfileEntity));
  }
}
