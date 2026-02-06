import { ApplicationControllerInterface, GuardInterface } from '@library/app';

import { inject, injectable } from 'inversify';

import { AdminControllerInterface } from '../../classes/controller/admin-controller.interface.ts';

@injectable()
export class CheckAuthGuard implements GuardInterface {
  constructor(@inject(AdminControllerInterface) private readonly adminController: AdminControllerInterface) {}

  async beforeRouter(app: ApplicationControllerInterface) {
    console.log('CheckAuthGuard beforeRouter', app);
  }

  async beforePrivate(app: ApplicationControllerInterface) {
    console.log('CheckAuthGuard beforePrivate', app);

    if (!app.authStore.isAuth) {
      await this.adminController.getProfile();
    } else {
      app.authStore.setAuth(true);
    }
  }

  async beforePublic(app: ApplicationControllerInterface) {
    console.log('CheckAuthGuard beforePublic', app);
  }
}
