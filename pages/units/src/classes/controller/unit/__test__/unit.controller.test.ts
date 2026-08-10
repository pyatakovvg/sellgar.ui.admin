import { type UnitResultEntity, type UnitServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { UnitController } from '../unit.controller.ts';

describe('UnitController', () => {
  it('загружает список единиц измерения через предметный сервис', async () => {
    const result = { data: [], meta: {} } as UnitResultEntity;
    const unitService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as UnitServiceInterface;
    const controller = new UnitController(unitService);

    await expect(controller.loader()).resolves.toBe(result);
    expect(unitService.findAll).toHaveBeenCalledOnce();
  });
});
