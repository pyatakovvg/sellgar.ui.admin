import { type StoreProductResultEntity, type StoreServiceInterface } from '@library/domain';
import type { LocationServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { StoreProductQueryDto } from '../dto/store-product-query.dto.ts';
import { StoreController } from '../store.controller.ts';

const createController = () => {
  const result = { data: [], meta: {} } as StoreProductResultEntity;
  const searchToObject = vi.fn(() => ({ search: 'молоко' }));
  const findAll = vi.fn().mockResolvedValue(result);
  const locationService = { searchToObject } as unknown as LocationServiceInterface;
  const storeService = { findAll } as unknown as StoreServiceInterface;

  return {
    controller: new StoreController(storeService, locationService),
    findAll,
    result,
    searchToObject,
  };
};

describe('StoreController', () => {
  it('читает query через DTO, маппит его и загружает складские позиции', async () => {
    const fixture = createController();

    await expect(fixture.controller.loader()).resolves.toBe(fixture.result);

    expect(fixture.searchToObject).toHaveBeenCalledWith(StoreProductQueryDto);
    expect(fixture.findAll).toHaveBeenCalledWith({ search: 'молоко' });
  });
});
