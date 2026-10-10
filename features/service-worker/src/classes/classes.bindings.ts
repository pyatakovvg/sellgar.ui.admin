import { type BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app';
import { ServiceWorkerConfiguration } from './configuration/service-worker/service-worker.configuration.ts';

import { UpdateControllerInterface } from './controller/update/update-controller.interface.ts';
import { UpdateController } from './controller/update/update.controller.ts';
import { ActivationServiceInterface } from './service/activation/activation-service.interface.ts';
import { ActivationService } from './service/activation/activation.service.ts';
import { ReloadServiceInterface } from './service/reload/reload-service.interface.ts';
import { ReloadService } from './service/reload/reload.service.ts';
import { UpdateServiceInterface } from './service/update/update-service.interface.ts';
import { UpdateService } from './service/update/update.service.ts';
import { UpdateStoreInterface } from './store/update/update-store.interface.ts';
import { UpdateStore } from './store/update/update.store.ts';

export class ServiceWorkerBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(ServiceWorkerConfiguration).toConstantValue(
      Object.freeze({
        buildId: import.meta.env.VITE_APP_BUILD_ID ?? 'development',
        requireBuildIdChange: import.meta.env.PROD,
      }),
    );
    registry.bind(UpdateStoreInterface).to(UpdateStore).inSingletonScope();
    registry.bind(ActivationServiceInterface).to(ActivationService).inSingletonScope();
    registry.bind(ReloadServiceInterface).to(ReloadService).inSingletonScope();
    registry.bind(UpdateServiceInterface).to(UpdateService).inSingletonScope();
    registry.bind(UpdateControllerInterface).to(UpdateController).inSingletonScope();
  }
}
