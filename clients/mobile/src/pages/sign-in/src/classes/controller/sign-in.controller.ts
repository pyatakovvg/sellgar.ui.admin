import { Controller, Inject, SessionRuntimeStateInterface } from '@sellgar/app-v2';

import { delay } from '../../../../../shared/runtime/delay';
import { SignInControllerInterface } from './sign-in-controller.interface.ts';

@Controller()
export class SignInController implements SignInControllerInterface {
  constructor(
    @Inject(SessionRuntimeStateInterface)
    private readonly session: SessionRuntimeStateInterface,
  ) {}

  async loader({ signal }: Parameters<SignInControllerInterface['loader']>[0]) {
    await delay(400, signal);
  }

  async action({ signal }: Parameters<SignInControllerInterface['action']>[0]): Promise<void> {
    await delay(400, signal);
    this.session.setAuthenticated();
  }
}
