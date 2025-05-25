import { ProfileServiceInterface } from '@library/domain';

import { injectable, inject } from 'inversify';

import { ProfileStoreInterface } from '../stores/profile/profile-store.interface.ts';
import { ApplicationStoreInterface } from '../stores/application/application-store.interface.ts';

import { ApplicationControllerInterface } from './application-controller.interface.ts';

@injectable()
export class ApplicationController implements ApplicationControllerInterface {
  constructor(
    @inject(ProfileStoreInterface) readonly profileStore: ProfileStoreInterface,
    @inject(ApplicationStoreInterface) readonly applicationStore: ApplicationStoreInterface,
    @inject(ProfileServiceInterface) private readonly profileService: ProfileServiceInterface,
  ) {}

  async loadProfile() {
    try {
      const result = await this.profileService.get();

      this.profileStore.setProfile(result);
    } catch (error) {
      throw error;
    }
  }
}
