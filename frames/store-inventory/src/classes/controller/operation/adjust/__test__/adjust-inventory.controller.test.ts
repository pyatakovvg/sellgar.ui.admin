import type { StoreServiceInterface } from '@library/domain';
import type { FrameServiceInterface, RevalidateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { AdjustInventoryController } from '../adjust-inventory.controller.ts';

describe('AdjustInventoryController', () => {
  it('вызывает только команду корректировки остатка и завершает frame workflow', async () => {
    const storeService = { adjustInventory: vi.fn() } as unknown as StoreServiceInterface;
    const frameService = { close: vi.fn() } as unknown as FrameServiceInterface;
    const revalidateService = { revalidate: vi.fn() } as unknown as RevalidateServiceInterface;
    const controller = new AdjustInventoryController(storeService, frameService, revalidateService);

    await controller.action({
      params: {},
      payload: { expectedVersion: 3, quantity: 12, reason: '' },
      props: { storeProductUuid: 'store-product', offerUuid: 'offer' },
      request: new Request('http://localhost/store', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(storeService.adjustInventory).toHaveBeenCalledWith({
      commandId: expect.any(String),
      offerUuid: 'offer',
      expectedVersion: 3,
      quantity: 12,
      reason: null,
    });
    expect(revalidateService.revalidate).toHaveBeenCalledOnce();
    expect(frameService.close).toHaveBeenCalledOnce();
  });
});
