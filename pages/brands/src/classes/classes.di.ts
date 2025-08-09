import { ContainerModule } from 'inversify';

import { BrandController } from './controller/brand.controller.ts';
import { BrandsControllerInterface } from './controller/brand-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<BrandsControllerInterface>(BrandsControllerInterface).to(BrandController);
});
