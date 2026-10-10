import { Inject, Injectable } from '@sellgar/app';

import { ServiceWorkerConfiguration } from '../../configuration/service-worker/service-worker.configuration.ts';
import { ReloadServiceInterface, type UpdateReloadVerificationResult } from './reload-service.interface.ts';

const BUILD_ID_STORAGE_KEY = 'management-panel:pending-update-build-id';

@Injectable()
export class ReloadService implements ReloadServiceInterface {
  private reloading = false;

  constructor(@Inject(ServiceWorkerConfiguration) private readonly configuration: ServiceWorkerConfiguration) {}

  verify(): UpdateReloadVerificationResult {
    let previousBuildId: string | null;
    try {
      previousBuildId = window.sessionStorage.getItem(BUILD_ID_STORAGE_KEY);
      window.sessionStorage.removeItem(BUILD_ID_STORAGE_KEY);
    } catch {
      return 'none';
    }
    if (!previousBuildId) return 'none';
    return !this.configuration.requireBuildIdChange || previousBuildId !== this.configuration.buildId
      ? 'updated'
      : 'verification-failed';
  }

  reload(): void {
    if (this.reloading) return;
    this.reloading = true;
    try {
      window.sessionStorage.setItem(BUILD_ID_STORAGE_KEY, this.configuration.buildId);
    } catch (error) {
      console.warn('SW: Cannot persist update verification marker', error);
    }
    window.location.reload();
  }
}
