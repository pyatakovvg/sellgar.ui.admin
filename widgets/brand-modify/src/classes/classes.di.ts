import { ContainerModule } from 'inversify';

import { BrandModifyController } from './controller/brand-modify.controller.ts';
import { BrandModifyControllerInterface } from './controller/brand-modify-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(BrandModifyControllerInterface).to(BrandModifyController);
});
