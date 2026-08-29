import { AuthServiceInterface } from '@library/domain';
import { ApplicationStoreInterface, Controller, Inject, SessionRuntimeStateInterface } from '@sellgar/app-v2';

import { LogoutControllerInterface } from './logout-controller.interface.ts';

@Controller()
export class LogoutController extends LogoutControllerInterface {
  constructor(
    @Inject(AuthServiceInterface) private readonly authService: AuthServiceInterface,
    @Inject(ApplicationStoreInterface) private readonly applicationStore: ApplicationStoreInterface,
    @Inject(SessionRuntimeStateInterface) private readonly session: SessionRuntimeStateInterface,
  ) {
    super();
  }

  async action(args: Parameters<LogoutControllerInterface['action']>[0]): Promise<void> {
    args.signal.throwIfAborted();

    await this.authService.signOut();

    this.applicationStore.clear();
    this.session.setAnonymous();
  }
}
