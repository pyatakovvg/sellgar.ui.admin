import { Inject, Injectable } from '@sellgar/app-v2';

import { ProfileServiceInterface } from './profile-service.interface.ts';
import { ProfileGatewayInterface } from '../data/gateway/profile-gateway.interface.ts';

@Injectable()
export class ProfileService implements ProfileServiceInterface {
  constructor(@Inject(ProfileGatewayInterface) private readonly profileGateway: ProfileGatewayInterface) {}

  async get() {
    return await this.profileGateway.get();
  }
}
