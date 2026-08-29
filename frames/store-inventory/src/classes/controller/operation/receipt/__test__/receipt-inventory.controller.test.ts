import type { StoreServiceInterface } from '@library/domain';
import type { RevalidateServiceInterface } from '@sellgar/app-v2';
import type { NavigateServiceInterface } from '@sellgar/app-v2';
import { describe, expect, it, vi } from 'vitest';

import { ReceiptInventoryController } from '../receipt-inventory.controller.ts';

describe('ReceiptInventoryController', () => {
  it('вызывает только команду приёмки остатка и завершает frame workflow', async () => {
    const storeService = { receiptInventory: vi.fn() } as unknown as StoreServiceInterface;
    const navigateService = { close: vi.fn() } as unknown as NavigateServiceInterface;
    const revalidateService = { revalidate: vi.fn() } as unknown as RevalidateServiceInterface;
    const controller = new ReceiptInventoryController(storeService, navigateService, revalidateService);

    await controller.action({
      params: {},
      payload: { expectedVersion: 7, quantity: 5, reason: 'Поставка' },
      params: { storeProductUuid: 'store-product', offerUuid: 'offer' },
      request: new Request('http://localhost/store', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(storeService.receiptInventory).toHaveBeenCalledWith({
      commandId: expect.any(String),
      offerUuid: 'offer',
      expectedVersion: 7,
      quantity: 5,
      reason: 'Поставка',
    });
    expect(revalidateService.revalidate).toHaveBeenCalledOnce();
    expect(navigateService.close).toHaveBeenCalledOnce();
  });
});
