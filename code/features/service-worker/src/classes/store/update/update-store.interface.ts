import type { ServiceWorkerActivationErrorCode } from '../../service/activation/service-worker-activation.error.ts';

export type UpdateStatus = 'idle' | 'available' | 'updating' | 'current' | 'updated' | 'error';
export type UpdateErrorCode = ServiceWorkerActivationErrorCode | 'verification-failed';

export abstract class UpdateStoreInterface {
  abstract readonly status: UpdateStatus;
  abstract readonly errorCode: UpdateErrorCode | undefined;
  abstract setStatus(status: UpdateStatus, errorCode?: UpdateErrorCode): void;
}
