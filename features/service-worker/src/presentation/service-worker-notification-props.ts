import type { UpdateErrorCode, UpdateStatus } from '../classes/store/update/update-store.interface.ts';

export interface ServiceWorkerNotificationProps {
  readonly status: Exclude<UpdateStatus, 'idle'>;
  readonly errorCode: UpdateErrorCode | undefined;
  update(): Promise<void>;
  close(): void;
  remindLater(): void;
}
