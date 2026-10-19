import { type ShopResultEntity, type ShopServiceInterface } from '@library/domain';
import type { RouteQueryServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { ShopController } from '../shop.controller.ts';
import { FilterQuery } from '../query/filter.query.ts';

describe('ShopController', () => {
  it('загружает список магазинов через предметный сервис', async () => {
    const result = { data: [], meta: {} } as ShopResultEntity;
    const shopService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as ShopServiceInterface;
    const filter = Object.assign(new FilterQuery(), { term: 'магазин' });
    const query = { get: vi.fn().mockReturnValue(filter) } as unknown as RouteQueryServiceInterface;
    const controller = new ShopController(shopService, query);

    await expect(controller.loader()).resolves.toBe(result);
    expect(query.get).toHaveBeenCalledWith(FilterQuery);
    expect(shopService.findAll).toHaveBeenCalledWith(filter);
  });
});
