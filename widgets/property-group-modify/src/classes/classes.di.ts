import { ContainerModule } from 'inversify';

import { PropertyGroupModifyController } from './controller/property-group-modify.controller.ts';
import { PropertyGroupModifyControllerInterface } from './controller/property-group-modify-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(PropertyGroupModifyControllerInterface).to(PropertyGroupModifyController);
});
