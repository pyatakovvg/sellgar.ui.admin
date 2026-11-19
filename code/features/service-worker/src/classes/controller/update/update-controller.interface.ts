import type { UpdateErrorCode, UpdateStatus } from '../../store/update/update-store.interface.ts';

export abstract class UpdateControllerInterface {
  abstract readonly status: UpdateStatus;
  abstract readonly errorCode: UpdateErrorCode | undefined;
  abstract update(): Promise<void>;
  abstract close(): void;
  abstract remindLater(): void;
}
