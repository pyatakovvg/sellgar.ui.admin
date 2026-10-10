import { type BrandResultEntity, type BrandServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { BrandOptionsController } from '../brand-options.controller.ts';

describe('BrandOptionsController', () => {
  it('загружает бренды для формы', async () => {
    const result = { data: [], meta: {} } as BrandResultEntity;
    const brandService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as BrandServiceInterface;
    const controller = new BrandOptionsController(brandService);

    await expect(controller.loader()).resolves.toBe(result);
    expect(brandService.findAll).toHaveBeenCalledOnce();
  });
});
