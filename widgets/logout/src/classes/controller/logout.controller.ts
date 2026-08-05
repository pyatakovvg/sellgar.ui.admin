import { AuthServiceInterface } from '@library/domain';
import { ApplicationStoreInterface, Controller, Inject, SessionRuntimeStateInterface } from '@sellgar/app';

import { LogoutControllerInterface } from './logout-controller.interface.ts';

import { LogoutStoreInterface } from '../store/logout/logout-store.interface.ts';

@Controller()
export class LogoutController implements LogoutControllerInterface {
  constructor(
    @Inject(LogoutStoreInterface) readonly logoutStore: LogoutStoreInterface,
    @Inject(AuthServiceInterface) private readonly authService: AuthServiceInterface,
    @Inject(ApplicationStoreInterface) private readonly store: ApplicationStoreInterface,
    @Inject(SessionRuntimeStateInterface) private readonly session: SessionRuntimeStateInterface,
  ) {}

  async logout() {
    this.logoutStore.setProcess(true);

    try {
      await this.authService.signOut();

      this.store.clear();
      this.session.setAnonymous();
    } catch (error) {
      this.logoutStore.setProcess(false);
      throw error;
    }
  }
}
