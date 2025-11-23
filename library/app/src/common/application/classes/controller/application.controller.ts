import { ProfileServiceInterface } from '@library/domain';

import { injectable, inject } from 'inversify';

import { InitStoreInterface } from '../stores/init/init-store.interface.ts';
import { AuthStoreInterface } from '../stores/auth/auth-store.interface.ts';
import { ProfileStoreInterface } from '../stores/profile/profile-store.interface.ts';

import { ApplicationControllerInterface } from './application-controller.interface.ts';

@injectable()
export class ApplicationController implements ApplicationControllerInterface {
  constructor(
    @inject(InitStoreInterface) readonly initStore: InitStoreInterface,
    @inject(AuthStoreInterface) readonly authStore: AuthStoreInterface,
    @inject(ProfileStoreInterface) readonly profileStore: ProfileStoreInterface,
    @inject(ProfileServiceInterface) private readonly profileService: ProfileServiceInterface,
  ) {}

  async loadProfile() {
    try {
      const result = await this.profileService.get();

      this.profileStore.setData(result);
      this.authStore.setAuth(true);
    } catch (error) {
      throw error;
    }
  }
}
