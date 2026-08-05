import { AuthServiceInterface, ProfileServiceInterface, ProfileEntity } from '@library/domain';
import { ApplicationStoreInterface, Controller, Inject, SessionRuntimeStateInterface } from '@sellgar/app';

import { SignInControllerInterface } from './sign-in-controller.interface.ts';

import { FormStoreInterface } from '../store/form-store.interface.ts';

@Controller()
export class SignInController implements SignInControllerInterface {
  constructor(
    @Inject(FormStoreInterface) readonly formStore: FormStoreInterface,
    @Inject(AuthServiceInterface) private readonly authService: AuthServiceInterface,
    @Inject(ProfileServiceInterface) private readonly profileService: ProfileServiceInterface,
    @Inject(ApplicationStoreInterface) private readonly store: ApplicationStoreInterface,
    @Inject(SessionRuntimeStateInterface) private readonly session: SessionRuntimeStateInterface,
  ) {}

  async signIn(login: string, password: string) {
    try {
      this.formStore.setProcess(true);

      await this.authService.signIn(login, password);
      const profile = await this.profileService.get();

      this.store.set(ProfileEntity, profile);
      this.session.setAuthenticated();
    } catch (error) {
      this.session.setAnonymous();
      console.error(error);
      throw error;
    } finally {
      this.formStore.setProcess(false);
    }
  }
}
