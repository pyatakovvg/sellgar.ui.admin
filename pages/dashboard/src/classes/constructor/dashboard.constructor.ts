import { ApplicationControllerInterface } from '@library/app';

import { injectable, inject } from 'inversify';

import { DashboardConstructorInterface } from './dashboard-constructor.interface.ts';

@injectable()
export class DashboardConstructor implements DashboardConstructorInterface {
  constructor(@inject(ApplicationControllerInterface) private applicationController: ApplicationControllerInterface) {
    console.log(applicationController.profileStore.data);
  }
}
