import type { LocationServiceInterface, NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { FilterDto } from '../dto/filter.dto.ts';
import { FilterController } from '../filter.controller.ts';

const createController = (search?: string) => {
  const searchToObject = vi.fn(() => ({ search }));
  const searchParams = vi.fn().mockResolvedValue(undefined);
  const locationService = { searchToObject } as unknown as LocationServiceInterface;
  const navigateService = { searchParams } as unknown as NavigateServiceInterface;

  return {
    controller: new FilterController(locationService, navigateService),
    searchParams,
    searchToObject,
  };
};

describe('FilterController', () => {
  it('читает фильтр из query через DTO', () => {
    const fixture = createController('nike');

    expect(fixture.controller.loader()).toEqual({ search: 'nike' });
    expect(fixture.searchToObject).toHaveBeenCalledWith(FilterDto);
  });

  it('нормализует и обновляет query', async () => {
    const fixture = createController();

    await fixture.controller.apply({ search: '  nike  ' });

    expect(fixture.searchParams).toHaveBeenCalledWith({ search: 'nike' }, { merge: true });
  });
});
