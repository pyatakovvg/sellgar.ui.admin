import { type UnitResultEntity, type UnitServiceInterface } from '@library/domain';
import { describe, expect, it, vi } from 'vitest';

import { UnitListController } from '../unit-list.controller.ts';

describe('UnitListController', () => {
  it('возвращает размерности из результата предметного сервиса', async () => {
    const result = { items: [], total: 0, limit: 100, offset: 0 } as UnitResultEntity;
    const unitService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as UnitServiceInterface;
    const controller = new UnitListController(unitService);

    await expect(controller.loader()).resolves.toBe(result.items);
    expect(unitService.findAll).toHaveBeenCalledOnce();
  });
});
