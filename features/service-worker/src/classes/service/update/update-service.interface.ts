import type { ApplicationFeatureCleanup } from '@sellgar/app';

export abstract class UpdateServiceInterface {
  abstract start(signal: AbortSignal): ApplicationFeatureCleanup;
  abstract update(): Promise<void>;
  abstract close(): void;
  abstract remindLater(): void;
}
