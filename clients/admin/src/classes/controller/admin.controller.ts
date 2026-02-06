import { ProfileServiceInterface } from '@library/domain';

import { injectable, inject } from 'inversify';

import { AdminControllerInterface } from './admin-controller.interface.ts';

@injectable()
export class AdminController implements AdminControllerInterface {
  constructor(@inject(ProfileServiceInterface) private profileService: ProfileServiceInterface) {}

  getProfile() {
    return this.profileService.get();
  }
}
