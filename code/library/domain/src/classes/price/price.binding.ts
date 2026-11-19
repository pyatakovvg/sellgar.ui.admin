import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { PriceServiceInterface } from './application/price-service.interface.ts';
import { PriceService } from './application/price.service.ts';
import { PriceGatewayInterface } from './data/gateway/price-gateway.interface.ts';
import { PriceGateway } from './data/gateway/price.gateway.ts';

export class PriceBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(PriceGatewayInterface).to(PriceGateway);
    registry.bind(PriceServiceInterface).to(PriceService);
  }
}
