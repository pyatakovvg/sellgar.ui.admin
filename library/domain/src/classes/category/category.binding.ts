import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { CategoryServiceInterface } from './application/category-service.interface.ts';
import { CategoryService } from './application/category.service.ts';
import { CategoryGatewayInterface } from './data/gateway/category-gateway.interface.ts';
import { CategoryGateway } from './data/gateway/category.gateway.ts';
import { CategoryFormDataFactory } from './data/gateway/factory/category-form-data.factory.ts';
import { CategoryFormDataFactoryInterface } from './data/gateway/factory/category-form-data-factory.interface.ts';

export class CategoryBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(CategoryFormDataFactoryInterface).to(CategoryFormDataFactory);
    registry.bind(CategoryGatewayInterface).to(CategoryGateway);
    registry.bind(CategoryServiceInterface).to(CategoryService);
  }
}
