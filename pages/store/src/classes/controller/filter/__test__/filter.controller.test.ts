import type { RouteQueryServiceInterface } from '@sellgar/app-v2';
import { describe, expect, it, vi } from 'vitest';

import { FilterController } from '../filter.controller.ts';
import { FilterQuery } from '../query/filter.query.ts';

const createController = (search?: string) => {
  const get = vi.fn(() => ({ search }));
  const set = vi.fn().mockResolvedValue(undefined);
  const queryService = { get, set } as unknown as RouteQueryServiceInterface;

  return {
    controller: new FilterController(queryService),
    get,
    set,
  };
};

describe('FilterController', () => {
  it('возвращает данные фильтра из query', () => {
    const fixture = createController('молоко');

    expect(fixture.controller.loader()).toEqual({ search: 'молоко' });
    expect(fixture.get).toHaveBeenCalledWith(FilterQuery);
  });

  it('передаёт query-модели параметры формы', async () => {
    const fixture = createController();

    await fixture.controller.action({
      payload: { search: '  молоко  ' },
      signal: new AbortController().signal,
    });

    expect(fixture.set).toHaveBeenCalledWith(FilterQuery, { search: '  молоко  ' });
  });

  it('удаляет пустой search из query', async () => {
    const fixture = createController();

    await fixture.controller.action({
      payload: { search: '   ' },
      signal: new AbortController().signal,
    });

    expect(fixture.set).toHaveBeenCalledWith(FilterQuery, { search: '   ' });
  });
});
