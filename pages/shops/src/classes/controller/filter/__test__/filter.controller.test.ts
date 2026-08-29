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
  it('читает фильтр из @Query', () => {
    const fixture = createController('market');

    expect(fixture.controller.loader()).toEqual({ search: 'market' });
    expect(fixture.get).toHaveBeenCalledWith(FilterQuery);
  });

  it('передаёт query-модели параметры формы', async () => {
    const fixture = createController();

    await fixture.controller.action({
      payload: { search: '  market  ' },
      signal: new AbortController().signal,
    });

    expect(fixture.set).toHaveBeenCalledWith(FilterQuery, { search: '  market  ' });
  });
});
