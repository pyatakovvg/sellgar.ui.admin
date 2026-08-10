import { type ProductResultEntity, type ProductServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { ProductListController } from '../product-list.controller.ts';

describe('ProductListController', () => {
  it('возвращает товары из результата предметного сервиса', async () => {
    const result = { data: [], meta: {} } as ProductResultEntity;
    const productService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as ProductServiceInterface;
    const controller = new ProductListController(productService);

    await expect(controller.loader()).resolves.toBe(result.data);
    expect(productService.findAll).toHaveBeenCalledOnce();
  });
});
