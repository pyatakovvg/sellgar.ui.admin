import { ContainerModule } from 'inversify';

import { ShopController } from './controller/shop.controller.ts';
import { ShopControllerInterface } from './controller/shop-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(ShopControllerInterface).to(ShopController);
});
