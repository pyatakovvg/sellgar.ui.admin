import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { registerSW } from 'virtual:pwa-register';

import { UpdateStore } from '../../../store/update/update.store.ts';
import { ActivationService } from '../../activation/activation.service.ts';
import { ServiceWorkerActivationError } from '../../activation/service-worker-activation.error.ts';
import { UpdateService } from '../update.service.ts';

const mocks = vi.hoisted(() => ({ register: vi.fn() }));
vi.mock('virtual:pwa-register', () => ({ registerSW: mocks.register }));

describe('UpdateService', () => {
  let store: UpdateStore;
  let service: UpdateService;
  let lifetime: AbortController;
  let callbacks: NonNullable<Parameters<typeof registerSW>[0]>;
  const reload = { verify: vi.fn(() => 'none' as const), reload: vi.fn() };
  const activation = { activate: vi.fn(async () => 'activated' as 'activated' | 'already-current') };
  const registration = {
    waiting: { state: 'installed' },
    active: null,
    installing: null,
    update: vi.fn(async () => undefined),
  } as unknown as ServiceWorkerRegistration;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    mocks.register.mockImplementation((options) => {
      callbacks = options;
    });
    activation.activate.mockResolvedValue('activated');
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: {
        controller: null,
        getRegistration: vi.fn(async () => registration),
      },
    });
    Object.defineProperty(navigator, 'onLine', { configurable: true, value: true });
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' });
    store = new UpdateStore();
    lifetime = new AbortController();
    service = new UpdateService(store, activation, reload);
    service.start(lifetime.signal);
    callbacks.onRegisteredSW?.('/sw.js', registration);
  });

  afterEach(() => {
    lifetime.abort();
    vi.useRealTimers();
  });

  it('регистрирует один раз независимо от повторных вызовов start', () => {
    service.start(lifetime.signal);
    expect(mocks.register).toHaveBeenCalledOnce();
    expect(callbacks.immediate).toBe(true);
  });

  it('показывает обновление по waiting-событию', () => {
    callbacks.onNeedRefresh?.();
    expect(store.status).toBe('available');
  });

  it('проверяет раз в час и учитывает offline', async () => {
    window.dispatchEvent(new Event('online'));
    expect(registration.update).not.toHaveBeenCalled();
    Object.defineProperty(navigator, 'onLine', { configurable: true, value: false });
    await vi.advanceTimersByTimeAsync(3_600_000);
    expect(registration.update).not.toHaveBeenCalled();
    Object.defineProperty(navigator, 'onLine', { configurable: true, value: true });
    window.dispatchEvent(new Event('online'));
    await Promise.resolve();
    expect(registration.update).toHaveBeenCalledOnce();
    document.dispatchEvent(new Event('visibilitychange'));
    expect(registration.update).toHaveBeenCalledOnce();
  });

  it('напоминает через 15 минут и отменяет напоминание при закрытии', async () => {
    callbacks.onNeedRefresh?.();
    service.remindLater();
    expect(store.status).toBe('idle');
    await vi.advanceTimersByTimeAsync(900_000);
    expect(store.status).toBe('available');
    service.remindLater();
    service.close();
    await vi.advanceTimersByTimeAsync(900_000);
    expect(store.status).toBe('idle');
  });

  it('перезагружает только после активации', async () => {
    await service.update();
    expect(activation.activate).toHaveBeenCalledWith(registration, null, expect.any(AbortSignal));
    expect(reload.reload).toHaveBeenCalledOnce();
  });

  it('не перезагружает уже текущую версию', async () => {
    activation.activate.mockResolvedValue('already-current');
    await service.update();
    expect(store.status).toBe('current');
    expect(reload.reload).not.toHaveBeenCalled();
  });

  it('сохраняет конкретную ошибку активации для уведомления', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    activation.activate.mockRejectedValueOnce(new ServiceWorkerActivationError('activation-timeout', 'timeout'));
    await service.update();
    expect(store.status).toBe('error');
    expect(store.errorCode).toBe('activation-timeout');
    vi.restoreAllMocks();
  });

  it('подавляет повторное действие и смену статуса во время активации', async () => {
    let finish: (value: 'activated') => void = () => {};
    activation.activate.mockReturnValueOnce(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    const updating = service.update();
    callbacks.onNeedRefresh?.();
    service.close();
    service.remindLater();
    await service.update();
    expect(store.status).toBe('updating');
    expect(activation.activate).toHaveBeenCalledOnce();
    finish('activated');
    await updating;
  });

  it('очищает ресурсы и игнорирует поздние callbacks после dispose', async () => {
    service.remindLater();
    lifetime.abort();
    callbacks.onNeedRefresh?.();
    callbacks.onNeedReload?.();
    callbacks.onRegisteredSW?.('/sw.js', registration);
    window.dispatchEvent(new Event('online'));
    await service.update();
    expect(store.status).toBe('idle');
    expect(vi.getTimerCount()).toBe(0);
    expect(reload.reload).not.toHaveBeenCalled();
    expect(registration.update).not.toHaveBeenCalled();
    expect(activation.activate).not.toHaveBeenCalled();
  });

  it('при dispose прекращает ожидание worker и не перезагружает страницу', async () => {
    const worker = new EventTarget();
    const pending = {
      waiting: Object.assign(worker, { state: 'installed', postMessage: vi.fn() }),
    } as unknown as ServiceWorkerRegistration;
    lifetime.abort();
    lifetime = new AbortController();
    service = new UpdateService(store, new ActivationService(), reload);
    service.start(lifetime.signal);
    callbacks.onRegisteredSW?.('/sw.js', pending);
    const updating = service.update();
    lifetime.abort();
    await updating;
    expect(vi.getTimerCount()).toBe(0);
    expect(reload.reload).not.toHaveBeenCalled();
  });

  it('ошибка регистрации не блокирует инициализацию приложения', () => {
    lifetime.abort();
    lifetime = new AbortController();
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    mocks.register.mockImplementationOnce(() => {
      throw new Error('registration');
    });
    service = new UpdateService(store, activation, reload);
    expect(() => service.start(lifetime.signal)).not.toThrow();
    expect(store.status).toBe('idle');
    vi.restoreAllMocks();
  });

  it('не регистрирует SW в неподдерживаемом браузере', () => {
    lifetime.abort();
    Reflect.deleteProperty(navigator, 'serviceWorker');
    mocks.register.mockClear();
    lifetime = new AbortController();
    service = new UpdateService(store, activation, reload);
    service.start(lifetime.signal);
    expect(mocks.register).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });
});
