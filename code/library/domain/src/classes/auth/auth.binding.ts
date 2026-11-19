import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { AuthServiceInterface } from './application/auth-service.interface.ts';
import { AuthService } from './application/auth.service.ts';
import { AuthGatewayInterface } from './data/gateway/auth-gateway.interface.ts';
import { AuthGateway } from './data/gateway/auth.gateway.ts';

export class AuthBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(AuthGatewayInterface).to(AuthGateway);
    registry.bind(AuthServiceInterface).to(AuthService);
  }
}
