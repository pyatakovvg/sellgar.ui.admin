import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { CategoryServiceInterface } from './application/category-service.interface.ts';
import { CategoryService } from './application/category.service.ts';
import { CategoryGatewayInterface } from './data/gateway/category-gateway.interface.ts';
import { CategoryGateway } from './data/gateway/category.gateway.ts';

export class CategoryBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(CategoryGatewayInterface).to(CategoryGateway);
    registry.bind(CategoryServiceInterface).to(CategoryService);
  }
}
