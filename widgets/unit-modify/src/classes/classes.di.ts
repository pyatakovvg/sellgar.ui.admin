import { ContainerModule } from 'inversify';

import { UnitController } from './controller/unit.controller.ts';
import { UnitControllerInterface } from './controller/unit-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(UnitControllerInterface).to(UnitController);
});
