import { AuthServiceInterface, ProfileServiceInterface, ProfileEntity } from '@library/domain';
import { ApplicationStoreInterface, Controller, Inject, SessionRuntimeStateInterface } from '@sellgar/app-v2';

import { SignInMapper } from './mapper/sign-in.mapper.ts';
import { SignInControllerInterface } from './sign-in-controller.interface.ts';

@Controller()
export class SignInController implements SignInControllerInterface {
  constructor(
    @Inject(AuthServiceInterface) private readonly authService: AuthServiceInterface,
    @Inject(ProfileServiceInterface) private readonly profileService: ProfileServiceInterface,
    @Inject(ApplicationStoreInterface) private readonly store: ApplicationStoreInterface,
    @Inject(SessionRuntimeStateInterface) private readonly session: SessionRuntimeStateInterface,
  ) {}

  async action(args: Parameters<SignInControllerInterface['action']>[0]): Promise<void> {
    const credentials = SignInMapper.toAuthCredentials(args.payload);

    try {
      await this.authService.signIn(credentials.email, credentials.password);
      const profile = await this.profileService.get();

      this.store.set(ProfileEntity, profile);
      this.session.setAuthenticated();
    } catch (error) {
      this.session.setAnonymous();
      throw error;
    }
  }
}
