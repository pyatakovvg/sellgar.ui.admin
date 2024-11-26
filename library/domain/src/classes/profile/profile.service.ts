import { inject, injectable } from 'inversify';

import { ProfileGateway, ProfileGatewaySymbol } from './profile.gateway.ts';

export const ProfileServiceSymbol = Symbol.for('UserService');

@injectable()
export class ProfileService {
  constructor(@inject(ProfileGatewaySymbol) private readonly profileGateway: ProfileGateway) {}

  get() {
    return this.profileGateway.get();
  }
}
