import { ContainerModule } from 'inversify';

import { AdminController } from './controller/admin.controller.ts';
import { AdminControllerInterface } from './controller/admin-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(AdminControllerInterface).to(AdminController);
});
