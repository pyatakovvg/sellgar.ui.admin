export type UpdateReloadVerificationResult = 'none' | 'updated' | 'verification-failed';

export abstract class ReloadServiceInterface {
  abstract verify(): UpdateReloadVerificationResult;
  abstract reload(): void;
}
