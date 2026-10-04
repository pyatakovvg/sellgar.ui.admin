import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ProductTypeServiceInterface } from './application/product-type-service.interface.ts';
import { ProductTypeService } from './application/product-type.service.ts';
import { ProductTypeGatewayInterface } from './data/gateway/product-type-gateway.interface.ts';
import { ProductTypeGateway } from './data/gateway/product-type.gateway.ts';

export class ProductTypeBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ProductTypeGatewayInterface).to(ProductTypeGateway);
    registry.bind(ProductTypeServiceInterface).to(ProductTypeService);
  }
}
