import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { UserServiceInterface } from './application/user-service.interface.ts';
import { UserService } from './application/user.service.ts';
import { UserGatewayInterface } from './data/gateway/user-gateway.interface.ts';
import { UserGateway } from './data/gateway/user.gateway.ts';

export class UserBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(UserGatewayInterface).to(UserGateway);
    registry.bind(UserServiceInterface).to(UserService);
  }
}
