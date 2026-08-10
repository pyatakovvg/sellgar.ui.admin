import type { StoreServiceInterface } from '@library/domain';
import type { FrameServiceInterface, RevalidateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { WriteOffInventoryController } from '../write-off-inventory.controller.ts';

describe('WriteOffInventoryController', () => {
  it('вызывает только команду списания остатка и завершает frame workflow', async () => {
    const storeService = { writeOffInventory: vi.fn() } as unknown as StoreServiceInterface;
    const frameService = { close: vi.fn() } as unknown as FrameServiceInterface;
    const revalidateService = { revalidate: vi.fn() } as unknown as RevalidateServiceInterface;
    const controller = new WriteOffInventoryController(storeService, frameService, revalidateService);

    await controller.action({
      params: {},
      payload: { expectedVersion: 8, quantity: 2, reason: 'Брак' },
      props: { storeProductUuid: 'store-product', offerUuid: 'offer' },
      request: new Request('http://localhost/store', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(storeService.writeOffInventory).toHaveBeenCalledWith({
      commandId: expect.any(String),
      offerUuid: 'offer',
      expectedVersion: 8,
      quantity: 2,
      reason: 'Брак',
    });
    expect(revalidateService.revalidate).toHaveBeenCalledOnce();
    expect(frameService.close).toHaveBeenCalledOnce();
  });
});
