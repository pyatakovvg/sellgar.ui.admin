import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { PropertyServiceInterface } from './application/property-service.interface.ts';
import { PropertyService } from './application/property.service.ts';
import { PropertyGatewayInterface } from './data/gateway/property-gateway.interface.ts';
import { PropertyGateway } from './data/gateway/property.gateway.ts';

export class PropertyBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(PropertyGatewayInterface).to(PropertyGateway);
    registry.bind(PropertyServiceInterface).to(PropertyService);
  }
}
