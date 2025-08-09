import { ContainerModule } from 'inversify';

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';

import { UnitController } from './controller/unit.controller.ts';
import { UnitControllerInterface } from './controller/unit-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(FormStoreInterface).to(FormStore);

  container.bind(UnitControllerInterface).to(UnitController);
});
