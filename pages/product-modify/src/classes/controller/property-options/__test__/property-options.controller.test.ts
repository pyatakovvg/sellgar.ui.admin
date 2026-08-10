import { type PropertyResultEntity, type PropertyServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { PropertyOptionsController } from '../property-options.controller.ts';

describe('PropertyOptionsController', () => {
  it('загружает свойства для формы', async () => {
    const result = { data: [], meta: {} } as PropertyResultEntity;
    const propertyService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as PropertyServiceInterface;
    const controller = new PropertyOptionsController(propertyService);

    await expect(controller.loader()).resolves.toBe(result);
    expect(propertyService.findAll).toHaveBeenCalledOnce();
  });
});
