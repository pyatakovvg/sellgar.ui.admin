export type ServiceWorkerActivationResult = 'activated' | 'already-current';

export abstract class ActivationServiceInterface {
  abstract activate(
    registration: ServiceWorkerRegistration,
    currentController: ServiceWorker | null,
    signal: AbortSignal,
  ): Promise<ServiceWorkerActivationResult>;
}
