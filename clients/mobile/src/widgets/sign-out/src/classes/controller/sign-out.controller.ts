import { Controller, Inject, SessionRuntimeStateInterface } from '@sellgar/app-v2';

import { delay } from '../../../../../shared/runtime/delay';
import { SignOutControllerInterface } from './sign-out-controller.interface.ts';

@Controller()
export class SignOutController implements SignOutControllerInterface {
  constructor(
    @Inject(SessionRuntimeStateInterface)
    private readonly session: SessionRuntimeStateInterface,
  ) {}

  async action({ signal }: Parameters<SignOutControllerInterface['action']>[0]): Promise<void> {
    await delay(300, signal);
    this.session.setAnonymous();
  }
}
