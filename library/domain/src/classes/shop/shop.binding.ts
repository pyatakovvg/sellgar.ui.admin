import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { ShopServiceInterface } from './application/shop-service.interface.ts';
import { ShopService } from './application/shop.service.ts';
import { ShopGatewayInterface } from './data/gateway/shop-gateway.interface.ts';
import { ShopGateway } from './data/gateway/shop.gateway.ts';

export class ShopBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ShopGatewayInterface).to(ShopGateway);
    registry.bind(ShopServiceInterface).to(ShopService);
  }
}
