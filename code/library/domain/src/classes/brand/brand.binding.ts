import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { BrandServiceInterface } from './application/brand-service.interface.ts';
import { BrandService } from './application/brand.service.ts';
import { BrandGatewayInterface } from './data/gateway/brand-gateway.interface.ts';
import { BrandGateway } from './data/gateway/brand.gateway.ts';
import { BrandFormDataFactory } from './data/gateway/factory/brand-form-data.factory.ts';
import { BrandFormDataFactoryInterface } from './data/gateway/factory/brand-form-data-factory.interface.ts';

export class BrandBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(BrandFormDataFactoryInterface).to(BrandFormDataFactory);
    registry.bind(BrandGatewayInterface).to(BrandGateway);
    registry.bind(BrandServiceInterface).to(BrandService);
  }
}
