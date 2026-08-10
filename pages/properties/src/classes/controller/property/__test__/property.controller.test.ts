import { type PropertyResultEntity, type PropertyServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { PropertyController } from '../property.controller.ts';

describe('PropertyController', () => {
  it('загружает список свойств через предметный сервис', async () => {
    const result = { data: [], meta: {} } as PropertyResultEntity;
    const propertyService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as PropertyServiceInterface;
    const controller = new PropertyController(propertyService);

    await expect(controller.loader()).resolves.toBe(result);
    expect(propertyService.findAll).toHaveBeenCalledOnce();
  });
});
