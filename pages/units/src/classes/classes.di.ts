import { ContainerModule } from 'inversify';

import { UnitStore, UnitStoreSymbol } from './store/unit.store.ts';
import { UnitsController, UnitsControllerSymbol } from './controller/units.controller.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind<UnitStore>(UnitStoreSymbol).to(UnitStore).inSingletonScope();

  container.bind<UnitsController>(UnitsControllerSymbol).to(UnitsController);
});
