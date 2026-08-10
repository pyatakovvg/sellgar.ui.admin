import { type ShopResultEntity, type ShopServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { ShopListController } from '../shop-list.controller.ts';

describe('ShopListController', () => {
  it('возвращает магазины из результата предметного сервиса', async () => {
    const result = { data: [], meta: {} } as ShopResultEntity;
    const shopService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as ShopServiceInterface;
    const controller = new ShopListController(shopService);

    await expect(controller.loader()).resolves.toBe(result.data);
    expect(shopService.findAll).toHaveBeenCalledOnce();
  });
});
