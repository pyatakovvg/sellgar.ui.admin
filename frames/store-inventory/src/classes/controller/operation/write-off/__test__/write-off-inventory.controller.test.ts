import type { StoreServiceInterface } from '@library/domain';
import type { RevalidateServiceInterface } from '@sellgar/app-v2';
import type { NavigateServiceInterface } from '@sellgar/app-v2';
import { describe, expect, it, vi } from 'vitest';

import { WriteOffInventoryController } from '../write-off-inventory.controller.ts';

describe('WriteOffInventoryController', () => {
  it('вызывает только команду списания остатка и завершает frame workflow', async () => {
    const storeService = { writeOffInventory: vi.fn() } as unknown as StoreServiceInterface;
    const navigateService = { close: vi.fn() } as unknown as NavigateServiceInterface;
    const revalidateService = { revalidate: vi.fn() } as unknown as RevalidateServiceInterface;
    const controller = new WriteOffInventoryController(storeService, navigateService, revalidateService);

    await controller.action({
      params: {},
      payload: { expectedVersion: 8, quantity: 2, reason: 'Брак' },
      params: { storeProductUuid: 'store-product', offerUuid: 'offer' },
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
    expect(navigateService.close).toHaveBeenCalledOnce();
  });
});
