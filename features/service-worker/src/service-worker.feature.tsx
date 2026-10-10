import React from 'react';
import {
  Inject,
  UseBindings,
  type ApplicationFeatureInterface,
  type ApplicationFeatureInitializeContextInterface,
  type ApplicationFeatureToken,
} from '@sellgar/app';
import { Feature } from '@sellgar/app/react';

import type { ServiceWorkerFeatureOptions } from './service-worker-feature.options.ts';
import { ServiceWorkerLayer } from './presentation/service-worker-layer.tsx';

import { ServiceWorkerBindings } from './classes/classes.bindings.ts';
import { UpdateServiceInterface } from './classes/service/update/update-service.interface.ts';

export class ServiceWorkerFeature {
  private constructor() {}

  static configure(options: ServiceWorkerFeatureOptions): ApplicationFeatureToken {
    @UseBindings(ServiceWorkerBindings)
    @Feature({
      presentation: {
        layer: 'notification',
        view: <ServiceWorkerLayer presentation={options.presentation} />,
      },
    })
    class ConfiguredServiceWorkerFeature implements ApplicationFeatureInterface {
      constructor(@Inject(UpdateServiceInterface) private readonly service: UpdateServiceInterface) {}

      initialize(context: ApplicationFeatureInitializeContextInterface) {
        return this.service.start(context.signal);
      }
    }

    return ConfiguredServiceWorkerFeature;
  }
}
