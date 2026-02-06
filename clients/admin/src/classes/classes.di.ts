import { ContainerModule } from 'inversify';

import { ApplicationController } from './controller/application.controller.ts';
import { ApplicationControllerInterface } from './controller/application-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(ApplicationControllerInterface).to(ApplicationController);
});
