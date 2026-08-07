import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';

import { UnitServiceInterface } from './application/unit-service.interface.ts';
import { UnitService } from './application/unit.service.ts';
import { UnitGatewayInterface } from './data/gateway/unit-gateway.interface.ts';
import { UnitGateway } from './data/gateway/unit.gateway.ts';

export class UnitBinding extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(UnitGatewayInterface).to(UnitGateway);
    registry.bind(UnitServiceInterface).to(UnitService);
  }
}
