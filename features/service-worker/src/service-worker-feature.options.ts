import type { ServiceWorkerPresentation } from './presentation/service-worker-presentation.ts';

export interface ServiceWorkerFeatureOptions {
  readonly presentation: ServiceWorkerPresentation;
}
