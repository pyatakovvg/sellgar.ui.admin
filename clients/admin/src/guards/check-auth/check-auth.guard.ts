import { ApplicationControllerInterface, GuardInterface } from '@library/app';
import { ProfileEntity } from '@library/domain';

import { inject, injectable } from 'inversify';

import { AdminControllerInterface } from '../../classes/controller/admin-controller.interface.ts';

@injectable()
export class CheckAuthGuard implements GuardInterface {
  constructor(@inject(AdminControllerInterface) private readonly adminController: AdminControllerInterface) {}

  async beforePrivate(app: ApplicationControllerInterface) {
    console.log('CheckAuthGuard beforePrivate', app);

    if (!app.authStore.isAuth) {
      const profile = await this.adminController.getProfile();

      app.dataStore.set(ProfileEntity, profile);
    } else {
      app.authStore.setAuth(true);
    }
  }

  async beforePublic(app: ApplicationControllerInterface) {
    console.log('CheckAuthGuard beforePublic', app);
  }
}
