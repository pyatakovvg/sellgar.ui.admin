export type ServiceWorkerActivationErrorCode = 'activation-redundant' | 'activation-timeout' | 'update-unavailable';

export class ServiceWorkerActivationError extends Error {
  constructor(
    readonly code: ServiceWorkerActivationErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'ServiceWorkerActivationError';
  }
}
