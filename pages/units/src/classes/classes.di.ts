import { ContainerModule } from 'inversify';

import { UnitsController } from './controller/units.controller.ts';
import { UnitsControllerInterface } from './controller/units-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<UnitsController>(UnitsControllerInterface).to(UnitsController);
});
