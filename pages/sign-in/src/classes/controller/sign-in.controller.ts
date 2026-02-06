import { AuthServiceInterface, ProfileServiceInterface } from '@library/domain';
import { ApplicationControllerInterface } from '@library/app';

import { inject, injectable } from 'inversify';

import { SignInControllerInterface } from './sign-in-controller.interface.ts';

import { FormStoreInterface } from '../store/form-store.interface.ts';

@injectable()
export class SignInController implements SignInControllerInterface {
  constructor(
    @inject(FormStoreInterface) readonly formStore: FormStoreInterface,
    @inject(AuthServiceInterface) private readonly authService: AuthServiceInterface,
    @inject(ProfileServiceInterface) private readonly profileService: ProfileServiceInterface,
    @inject(ApplicationControllerInterface) private readonly applicationController: ApplicationControllerInterface,
  ) {}

  async signIn(login: string, password: string) {
    try {
      this.formStore.setProcess(true);

      await this.authService.signIn(login, password);
      const profile = await this.profileService.get();

      // await this.applicationController.dataStore();
      this.applicationController.authStore.setAuth(true);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.formStore.setProcess(false);
    }
  }
}
