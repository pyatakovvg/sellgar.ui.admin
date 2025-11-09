import { ContainerModule } from 'inversify';

import { FormStore } from './store/form/form.store.ts';
import { FormStoreInterface } from './store/form/form-store.interface.ts';

import { PropertyModifyController } from './controller/property-modify.controller.ts';
import { PropertyModifyControllerInterface } from './controller/property-modify-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(FormStoreInterface).to(FormStore);

  container.bind(PropertyModifyControllerInterface).to(PropertyModifyController);
});
