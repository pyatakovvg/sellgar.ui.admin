import { type BrandResultEntity, type BrandServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { BrandController } from '../brand.controller.ts';

describe('BrandController', () => {
  it('загружает список брендов через предметный сервис', async () => {
    const result = { data: [], meta: {} } as BrandResultEntity;
    const brandService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as BrandServiceInterface;
    const controller = new BrandController(brandService);

    await expect(controller.loader()).resolves.toBe(result);
    expect(brandService.findAll).toHaveBeenCalledOnce();
  });
});
