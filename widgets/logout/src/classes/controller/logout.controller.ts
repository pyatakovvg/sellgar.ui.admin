import { AuthServiceInterface } from '@library/domain';

import { injectable, inject } from 'inversify';

import { LogoutControllerInterface } from './logout-controller.interface.ts';

import { LogoutStoreInterface } from '../store/logout/logout-store.interface.ts';

@injectable()
export class LogoutController implements LogoutControllerInterface {
  constructor(
    @inject(LogoutStoreInterface) readonly logoutStore: LogoutStoreInterface,
    @inject(AuthServiceInterface) private readonly authService: AuthServiceInterface,
  ) {}

  async logout() {
    this.logoutStore.setProcess(true);

    try {
      await this.authService.signOut();
    } catch (error) {
      this.logoutStore.setProcess(false);
      throw error;
    }
  }
}
