import { type ShopResultEntity, type ShopServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { ShopController } from '../shop.controller.ts';

describe('ShopController', () => {
  it('загружает список магазинов через предметный сервис', async () => {
    const result = { data: [], meta: {} } as ShopResultEntity;
    const shopService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as ShopServiceInterface;
    const controller = new ShopController(shopService);

    await expect(controller.loader()).resolves.toBe(result);
    expect(shopService.findAll).toHaveBeenCalledOnce();
  });
});
