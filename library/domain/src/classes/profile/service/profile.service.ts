import { inject, injectable } from 'inversify';

import { ProfileServiceInterface } from './profile-service.interface.ts';
import { ProfileGatewayInterface } from '../gateway/profile-gateway.interface.ts';

@injectable()
export class ProfileService implements ProfileServiceInterface {
  constructor(@inject(ProfileGatewayInterface) private readonly profileGateway: ProfileGatewayInterface) {}

  async get() {
    return await this.profileGateway.get();
  }
}
