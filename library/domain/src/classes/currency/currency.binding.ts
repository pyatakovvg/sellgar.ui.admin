import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { CurrencyServiceInterface } from './application/currency-service.interface.ts';
import { CurrencyService } from './application/currency.service.ts';
import { CurrencyGatewayInterface } from './data/gateway/currency-gateway.interface.ts';
import { CurrencyGateway } from './data/gateway/currency.gateway.ts';

export class CurrencyBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(CurrencyGatewayInterface).to(CurrencyGateway);
    registry.bind(CurrencyServiceInterface).to(CurrencyService);
  }
}
