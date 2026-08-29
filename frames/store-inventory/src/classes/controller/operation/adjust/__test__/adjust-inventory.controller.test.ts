import type { StoreServiceInterface } from '@library/domain';
import type { RevalidateServiceInterface } from '@sellgar/app-v2';
import type { NavigateServiceInterface } from '@sellgar/app-v2';
import { describe, expect, it, vi } from 'vitest';

import { AdjustInventoryController } from '../adjust-inventory.controller.ts';

describe('AdjustInventoryController', () => {
  it('вызывает только команду корректировки остатка и завершает frame workflow', async () => {
    const storeService = { adjustInventory: vi.fn() } as unknown as StoreServiceInterface;
    const navigateService = { close: vi.fn() } as unknown as NavigateServiceInterface;
    const revalidateService = { revalidate: vi.fn() } as unknown as RevalidateServiceInterface;
    const controller = new AdjustInventoryController(storeService, navigateService, revalidateService);

    await controller.action({
      params: {},
      payload: { expectedVersion: 3, quantity: 12, reason: '' },
      params: { storeProductUuid: 'store-product', offerUuid: 'offer' },
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
    expect(navigateService.close).toHaveBeenCalledOnce();
  });
});
