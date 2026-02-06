import { ProfileServiceInterface } from '@library/domain';

import { injectable, inject } from 'inversify';

import { ApplicationControllerInterface } from './application-controller.interface.ts';

@injectable()
export class ApplicationController implements ApplicationControllerInterface {
  constructor(@inject(ProfileServiceInterface) private profileService: ProfileServiceInterface) {}

  getProfile() {
    return this.profileService.get();
  }
}
