import { Inject, Injectable, type ApplicationFeatureCleanup } from '@sellgar/app';
import { registerSW } from 'virtual:pwa-register';

import { UpdateStoreInterface } from '../../store/update/update-store.interface.ts';
import { ActivationServiceInterface } from '../activation/activation-service.interface.ts';
import { ServiceWorkerActivationError } from '../activation/service-worker-activation.error.ts';
import { ReloadServiceInterface } from '../reload/reload-service.interface.ts';
import { UpdateServiceInterface } from './update-service.interface.ts';

const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000;
const UPDATE_REMINDER_INTERVAL = 15 * 60 * 1000;

@Injectable()
export class UpdateService implements UpdateServiceInterface {
  private readonly lifetime = new AbortController();
  private started = false;
  private registration: ServiceWorkerRegistration | undefined;
  private interval: ReturnType<typeof setInterval> | undefined;
  private reminder: ReturnType<typeof setTimeout> | undefined;
  private lastUpdateCheckAt = 0;
  private checking = false;

  constructor(
    @Inject(UpdateStoreInterface) private readonly store: UpdateStoreInterface,
    @Inject(ActivationServiceInterface) private readonly activation: ActivationServiceInterface,
    @Inject(ReloadServiceInterface) private readonly reload: ReloadServiceInterface,
  ) {}

  start(signal: AbortSignal): ApplicationFeatureCleanup {
    const dispose = () => this.dispose();
    if (this.started) return dispose;
    this.started = true;
    if (signal.aborted) {
      this.dispose();
      return dispose;
    }
    signal.addEventListener('abort', dispose, { once: true });
    this.lifetime.signal.addEventListener('abort', () => signal.removeEventListener('abort', dispose), { once: true });

    const verification = this.reload.verify();
    if (verification !== 'none') {
      this.store.setStatus(
        verification === 'updated' ? 'updated' : 'error',
        verification === 'verification-failed' ? verification : undefined,
      );
    }

    if (!('serviceWorker' in navigator)) return dispose;
    this.lastUpdateCheckAt = Date.now();
    document.addEventListener('visibilitychange', this.checkWhenVisible);
    window.addEventListener('online', this.checkWhenOnline);
    this.interval = setInterval(this.checkWhenOnline, UPDATE_CHECK_INTERVAL);

    try {
      registerSW({
        immediate: true,
        onNeedRefresh: () => {
          if (!this.lifetime.signal.aborted && this.store.status !== 'updating') this.store.setStatus('available');
        },
        onNeedReload: () => this.reloadIfActive(),
        onRegisteredSW: (url, registration) => {
          if (this.lifetime.signal.aborted) return;
          this.registration = registration;
          if (registration) console.info(`SW: Registered ${url} (scope: ${registration.scope})`);
        },
        onRegisterError: (error) => {
          if (!this.lifetime.signal.aborted) console.warn('SW: Registration error', error);
        },
      });
    } catch (error) {
      console.warn('SW: Registration error', error);
    }
    return dispose;
  }

  async update(): Promise<void> {
    if (!this.started || this.lifetime.signal.aborted || this.store.status === 'updating') return;
    this.clearReminder();
    this.store.setStatus('updating');
    try {
      const registration = this.registration ?? (await navigator.serviceWorker?.getRegistration());
      this.lifetime.signal.throwIfAborted();
      if (!registration)
        throw new ServiceWorkerActivationError('update-unavailable', 'Регистрация Service Worker не найдена.');
      const result = await this.activation.activate(
        registration,
        navigator.serviceWorker.controller,
        this.lifetime.signal,
      );
      if (this.lifetime.signal.aborted) return;
      if (result === 'already-current') {
        this.store.setStatus('current');
      } else {
        this.reloadIfActive();
      }
    } catch (error) {
      if (this.lifetime.signal.aborted) return;
      console.warn('SW: Activation error', error);
      this.store.setStatus('error', error instanceof ServiceWorkerActivationError ? error.code : undefined);
    }
  }

  close(): void {
    if (this.lifetime.signal.aborted || this.store.status === 'updating') return;
    this.clearReminder();
    this.store.setStatus('idle');
  }

  remindLater(): void {
    if (this.lifetime.signal.aborted || this.store.status === 'updating') return;
    this.close();
    this.reminder = setTimeout(() => {
      this.reminder = undefined;
      if (!this.lifetime.signal.aborted && this.registration?.waiting) this.store.setStatus('available');
    }, UPDATE_REMINDER_INTERVAL);
  }

  private readonly checkWhenVisible = () => {
    if (document.visibilityState === 'visible') void this.checkForUpdate();
  };

  private readonly checkWhenOnline = () => void this.checkForUpdate();

  private async checkForUpdate(): Promise<void> {
    if (this.lifetime.signal.aborted || !this.registration || !navigator.onLine || this.checking) return;
    const now = Date.now();
    if (now - this.lastUpdateCheckAt < UPDATE_CHECK_INTERVAL) return;
    this.lastUpdateCheckAt = now;
    this.checking = true;
    try {
      await this.registration.update();
    } catch (error) {
      if (!this.lifetime.signal.aborted) console.warn('SW: Update check error', error);
    } finally {
      this.checking = false;
    }
  }

  private reloadIfActive(): void {
    if (!this.lifetime.signal.aborted) this.reload.reload();
  }

  private clearReminder(): void {
    if (this.reminder !== undefined) clearTimeout(this.reminder);
    this.reminder = undefined;
  }

  private dispose(): void {
    if (this.lifetime.signal.aborted) return;
    this.lifetime.abort();
    this.clearReminder();
    if (this.interval !== undefined) clearInterval(this.interval);
    document.removeEventListener('visibilitychange', this.checkWhenVisible);
    window.removeEventListener('online', this.checkWhenOnline);
    this.registration = undefined;
    this.store.setStatus('idle');
  }
}
