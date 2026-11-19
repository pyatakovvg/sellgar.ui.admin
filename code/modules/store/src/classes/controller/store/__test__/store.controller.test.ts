import { type StoreProductResultEntity, type StoreServiceInterface } from '@library/domain';
import type { RouteQueryServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { FilterQuery } from '../../filter/query/filter.query.ts';
import { StoreController } from '../store.controller.ts';

const createController = () => {
  const result = { data: [], meta: {} } as StoreProductResultEntity;
  const get = vi.fn(() => ({ search: 'молоко' }));
  const getAll = vi.fn().mockResolvedValue(result);
  const queryService = { get } as unknown as RouteQueryServiceInterface;
  const storeService = { getAll } as unknown as StoreServiceInterface;

  return {
    controller: new StoreController(storeService, queryService),
    getAll,
    result,
    get,
  };
};

describe('StoreController', () => {
  it('читает query-срез фильтра и загружает складские позиции', async () => {
    const fixture = createController();

    await expect(fixture.controller.loader()).resolves.toBe(fixture.result);

    expect(fixture.get).toHaveBeenCalledWith(FilterQuery);
    expect(fixture.getAll).toHaveBeenCalledWith({ search: 'молоко' });
  });
});
