import { Inject, Injectable } from '@sellgar/app';

import { ProfileServiceInterface } from './profile-service.interface.ts';
import { ProfileGatewayInterface } from '../gateway/profile-gateway.interface.ts';

@Injectable()
export class ProfileService implements ProfileServiceInterface {
  constructor(@Inject(ProfileGatewayInterface) private readonly profileGateway: ProfileGatewayInterface) {}

  async get() {
    return await this.profileGateway.get();
  }
}
