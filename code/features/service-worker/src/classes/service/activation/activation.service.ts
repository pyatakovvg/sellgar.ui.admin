import { Injectable } from '@sellgar/app';

import { ActivationServiceInterface, type ServiceWorkerActivationResult } from './activation-service.interface.ts';
import { ServiceWorkerActivationError } from './service-worker-activation.error.ts';

const ACTIVATION_TIMEOUT = 60_000;

@Injectable()
export class ActivationService implements ActivationServiceInterface {
  async activate(
    registration: ServiceWorkerRegistration,
    currentController: ServiceWorker | null,
    signal: AbortSignal,
  ): Promise<ServiceWorkerActivationResult> {
    signal.throwIfAborted();
    const candidate = registration.waiting ?? registration.installing;

    if (candidate) {
      try {
        await this.activateCandidate(candidate, signal);
        return 'activated';
      } catch (error) {
        signal.throwIfAborted();
        const replacement = registration.active;
        if (replacement && replacement !== currentController) {
          await this.waitForActivation(replacement, signal);
          return 'activated';
        }
        throw error;
      }
    }

    const activeWorker = registration.active;
    if (activeWorker && activeWorker !== currentController) {
      await this.waitForActivation(activeWorker, signal);
      return 'activated';
    }
    if (activeWorker) return 'already-current';
    throw new ServiceWorkerActivationError('update-unavailable', 'Service Worker для обновления больше не доступен.');
  }

  private async activateCandidate(worker: ServiceWorker, signal: AbortSignal): Promise<void> {
    if (worker.state === 'parsed' || worker.state === 'installing') {
      const state = await this.waitForState(worker, ['installed', 'activating', 'activated', 'redundant'], signal);
      if (state === 'redundant') {
        throw new ServiceWorkerActivationError(
          'activation-redundant',
          'Service Worker был заменён во время установки.',
        );
      }
    }
    signal.throwIfAborted();
    if (worker.state === 'installed') worker.postMessage({ type: 'SKIP_WAITING' });
    if (worker.state !== 'activated') await this.waitForActivation(worker, signal);
  }

  private async waitForActivation(worker: ServiceWorker, signal: AbortSignal): Promise<void> {
    const state = await this.waitForState(worker, ['activated', 'redundant'], signal);
    if (state === 'redundant') {
      throw new ServiceWorkerActivationError(
        'activation-redundant',
        'Service Worker был заменён до завершения активации.',
      );
    }
  }

  private waitForState(
    worker: ServiceWorker,
    states: readonly ServiceWorkerState[],
    signal: AbortSignal,
  ): Promise<ServiceWorkerState> {
    signal.throwIfAborted();
    return new Promise((resolve, reject) => {
      let timeout: ReturnType<typeof setTimeout> | undefined;
      let settled = false;
      const cleanup = () => {
        worker.removeEventListener('statechange', onStateChange);
        signal.removeEventListener('abort', onAbort);
        if (timeout !== undefined) clearTimeout(timeout);
      };
      const settle = (callback: () => void) => {
        if (settled) return;
        settled = true;
        cleanup();
        callback();
      };
      const onStateChange = () => {
        if (states.includes(worker.state)) settle(() => resolve(worker.state));
      };
      const onAbort = () => settle(() => reject(signal.reason));

      worker.addEventListener('statechange', onStateChange);
      signal.addEventListener('abort', onAbort, { once: true });
      timeout = setTimeout(
        () =>
          settle(() =>
            reject(
              new ServiceWorkerActivationError(
                'activation-timeout',
                'Service Worker не завершил активацию за отведённое время.',
              ),
            ),
          ),
        ACTIVATION_TIMEOUT,
      );
      onStateChange();
    });
  }
}
