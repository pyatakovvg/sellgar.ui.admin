import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ProfileServiceInterface } from './application/profile-service.interface.ts';
import { ProfileService } from './application/profile.service.ts';
import { ProfileGatewayInterface } from './data/gateway/profile-gateway.interface.ts';
import { ProfileGateway } from './data/gateway/profile.gateway.ts';

export class ProfileBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ProfileGatewayInterface).to(ProfileGateway);
    registry.bind(ProfileServiceInterface).to(ProfileService);
  }
}
