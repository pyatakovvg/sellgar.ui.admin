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
  it('возвращает данные фильтра из query', () => {
    const fixture = createController('молоко');

    expect(fixture.controller.loader()).toEqual({ search: 'молоко' });
    expect(fixture.searchToObject).toHaveBeenCalledWith(FilterDto);
  });

  it('обновляет query параметрами формы', async () => {
    const fixture = createController();

    await fixture.controller.apply({ search: '  молоко  ' });

    expect(fixture.searchParams).toHaveBeenCalledWith({ search: 'молоко' }, { merge: true });
  });

  it('удаляет пустой search из query', async () => {
    const fixture = createController();

    await fixture.controller.apply({ search: '   ' });

    expect(fixture.searchParams).toHaveBeenCalledWith({ search: undefined }, { merge: true });
  });
});
