import { describe, expect, it, vi } from 'vitest';

import { UpdateController } from '../update.controller.ts';
import { UpdateStore } from '../../../store/update/update.store.ts';

describe('UpdateController', () => {
  it('читает актуальный статус и делегирует пользовательские действия сервису', async () => {
    const service = { start: vi.fn(), update: vi.fn(async () => undefined), close: vi.fn(), remindLater: vi.fn() };
    const store = new UpdateStore();
    const controller = new UpdateController(service, store);
    store.setStatus('error', 'activation-timeout');
    expect(controller.status).toBe('error');
    expect(controller.errorCode).toBe('activation-timeout');
    await controller.update();
    controller.close();
    controller.remindLater();
    expect(service.update).toHaveBeenCalledOnce();
    expect(service.close).toHaveBeenCalledOnce();
    expect(service.remindLater).toHaveBeenCalledOnce();
  });
});
