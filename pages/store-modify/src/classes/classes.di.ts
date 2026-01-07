import { ContainerModule } from 'inversify';

import { ProcessStore } from './store/process/process.store.ts';
import { ProcessStoreInterface } from './store/process/process-store.interface.ts';

import { VariantsStore } from './store/variants/variants.store.ts';
import { VariantsStoreInterface } from './store/variants/variants-store.interface.ts';

import { StoreController } from './controller/store.controller.ts';
import { StoreControllerInterface } from './controller/store-controller.interface.ts';

export const containerModule = new ContainerModule((container) => {
  container.bind(ProcessStoreInterface).to(ProcessStore);
  container.bind(VariantsStoreInterface).to(VariantsStore);

  container.bind(StoreControllerInterface).to(StoreController);
});
