import { afterEach, describe, expect, it, vi } from 'vitest';

import { ActivationService } from '../activation.service.ts';

class WorkerStub extends EventTarget {
  readonly postMessage = vi.fn();
  constructor(public state: ServiceWorkerState) {
    super();
  }
  transitionTo(state: ServiceWorkerState): void {
    this.state = state;
    this.dispatchEvent(new Event('statechange'));
  }
}

const asWorker = (worker: WorkerStub) => worker as unknown as ServiceWorker;
const registration = (fields: Partial<ServiceWorkerRegistration>) => fields as ServiceWorkerRegistration;

describe('ActivationService', () => {
  const service = new ActivationService();
  afterEach(() => vi.useRealTimers());

  it('активирует конкретный waiting worker и ждёт activated', async () => {
    const worker = new WorkerStub('installed');
    const result = service.activate(registration({ waiting: asWorker(worker) }), null, new AbortController().signal);
    expect(worker.postMessage).toHaveBeenCalledWith({ type: 'SKIP_WAITING' });
    worker.transitionTo('activating');
    worker.transitionTo('activated');
    await expect(result).resolves.toBe('activated');
  });

  it('дожидается worker, уже перешедшего из waiting в activating', async () => {
    const worker = new WorkerStub('activating');
    const result = service.activate(registration({ active: asWorker(worker) }), null, new AbortController().signal);
    worker.transitionTo('activated');
    await expect(result).resolves.toBe('activated');
    expect(worker.postMessage).not.toHaveBeenCalled();
  });

  it('возвращает already-current для версии, контролирующей вкладку', async () => {
    const worker = asWorker(new WorkerStub('activated'));
    await expect(
      service.activate(registration({ active: worker }), worker, new AbortController().signal),
    ).resolves.toBe('already-current');
  });

  it('при redundant принимает активировавшуюся replacement-версию', async () => {
    const waiting = new WorkerStub('installed');
    const active = asWorker(new WorkerStub('activated'));
    const mutable = { active, waiting: asWorker(waiting) };
    const result = service.activate(registration(mutable), active, new AbortController().signal);
    mutable.active = asWorker(new WorkerStub('activated'));
    waiting.transitionTo('redundant');
    await expect(result).resolves.toBe('activated');
  });

  it('сообщает о redundant, если замены нет', async () => {
    const waiting = new WorkerStub('installed');
    const result = service.activate(registration({ waiting: asWorker(waiting) }), null, new AbortController().signal);
    waiting.transitionTo('redundant');
    await expect(result).rejects.toMatchObject({ code: 'activation-redundant' });
  });

  it('при timeout освобождает listener и таймер', async () => {
    vi.useFakeTimers();
    const worker = new WorkerStub('installed');
    const remove = vi.spyOn(worker, 'removeEventListener');
    const result = service.activate(registration({ waiting: asWorker(worker) }), null, new AbortController().signal);
    const assertion = expect(result).rejects.toMatchObject({ code: 'activation-timeout' });
    await vi.advanceTimersByTimeAsync(60_000);
    await assertion;
    expect(remove).toHaveBeenCalledWith('statechange', expect.any(Function));
    expect(vi.getTimerCount()).toBe(0);
  });

  it('отменяет ожидание при завершении приложения', async () => {
    vi.useFakeTimers();
    const worker = new WorkerStub('installed');
    const remove = vi.spyOn(worker, 'removeEventListener');
    const lifetime = new AbortController();
    const result = service.activate(registration({ waiting: asWorker(worker) }), null, lifetime.signal);
    lifetime.abort();
    await expect(result).rejects.toMatchObject({ name: 'AbortError' });
    expect(remove).toHaveBeenCalledWith('statechange', expect.any(Function));
    expect(vi.getTimerCount()).toBe(0);
  });

  it('отменённое действие не отправляет SKIP_WAITING', async () => {
    const worker = new WorkerStub('installed');
    const lifetime = new AbortController();
    lifetime.abort();
    await expect(
      service.activate(registration({ waiting: asWorker(worker) }), null, lifetime.signal),
    ).rejects.toMatchObject({ name: 'AbortError' });
    expect(worker.postMessage).not.toHaveBeenCalled();
  });

  it('дожидается установки installing worker', async () => {
    const worker = new WorkerStub('installing');
    const result = service.activate(registration({ installing: asWorker(worker) }), null, new AbortController().signal);
    expect(worker.postMessage).not.toHaveBeenCalled();
    worker.transitionTo('installed');
    await Promise.resolve();
    expect(worker.postMessage).toHaveBeenCalledWith({ type: 'SKIP_WAITING' });
    worker.transitionTo('activated');
    await expect(result).resolves.toBe('activated');
  });

  it('не называет отсутствующее обновление успешным', async () => {
    await expect(service.activate(registration({}), null, new AbortController().signal)).rejects.toMatchObject({
      code: 'update-unavailable',
    });
  });
});
