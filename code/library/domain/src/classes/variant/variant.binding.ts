import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { VariantServiceInterface } from './application/variant-service.interface.ts';
import { VariantService } from './application/variant.service.ts';
import { VariantGatewayInterface } from './data/gateway/variant-gateway.interface.ts';
import { VariantGateway } from './data/gateway/variant.gateway.ts';

export class VariantBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(VariantGatewayInterface).to(VariantGateway);
    registry.bind(VariantServiceInterface).to(VariantService);
  }
}
