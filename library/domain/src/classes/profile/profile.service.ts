import { inject, injectable } from 'inversify';

import { ProfileGateway, ProfileGatewaySymbols } from './profile.gateway.ts';

export const ProfileServiceSymbol = Symbol.for('UserService');

@injectable()
export class ProfileService {
  constructor(@inject(ProfileGatewaySymbols) private readonly profileGateway: ProfileGateway) {}

  get() {
    return this.profileGateway.get();
  }
}
