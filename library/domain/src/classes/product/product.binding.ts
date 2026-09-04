import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ProductServiceInterface } from './application/product-service.interface.ts';
import { ProductService } from './application/product.service.ts';
import { ProductGatewayInterface } from './data/gateway/product-gateway.interface.ts';
import { ProductGateway } from './data/gateway/product.gateway.ts';
import { ProductFormDataFactory } from './data/gateway/factory/product-form-data.factory.ts';
import { ProductFormDataFactoryInterface } from './data/gateway/factory/product-form-data-factory.interface.ts';

export class ProductBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ProductFormDataFactoryInterface).to(ProductFormDataFactory);
    registry.bind(ProductGatewayInterface).to(ProductGateway);
    registry.bind(ProductServiceInterface).to(ProductService);
  }
}
