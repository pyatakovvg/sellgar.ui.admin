import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { CartServiceInterface } from './application/cart-service.interface.ts';
import { CartService } from './application/cart.service.ts';
import { CartGatewayInterface } from './data/gateway/cart-gateway.interface.ts';
import { CartGateway } from './data/gateway/cart.gateway.ts';

export class CartBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(CartGatewayInterface).to(CartGateway);
    registry.bind(CartServiceInterface).to(CartService);
  }
}
