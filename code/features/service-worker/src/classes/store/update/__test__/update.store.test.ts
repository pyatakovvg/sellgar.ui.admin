import { reaction } from 'mobx';
import { describe, expect, it, vi } from 'vitest';

import { UpdateStore } from '../update.store.ts';

describe('UpdateStore', () => {
  it('атомарно публикует статус и ошибку, очищая ошибку при следующем состоянии', () => {
    const store = new UpdateStore();
    const changed = vi.fn();
    const dispose = reaction(() => [store.status, store.errorCode], changed);
    store.setStatus('error', 'activation-timeout');
    expect(changed).toHaveBeenCalledOnce();
    expect(changed.mock.calls[0][0]).toEqual(['error', 'activation-timeout']);
    store.setStatus('available');
    expect(store.errorCode).toBeUndefined();
    dispose();
  });
});
