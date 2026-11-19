import type { CategoryServiceInterface, ShopServiceInterface } from '@library/domain';
import type { RouteQueryServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { CategoryController } from '../category.controller.ts';
import { CategoryQuery } from '../query/category.query.ts';

const createFixture = (shopUuid?: string) => {
  const categories = { getTree: vi.fn().mockResolvedValue({ shopUuid: shopUuid ?? 'first', nodes: [] }) };
  const shops = {
    findAll: vi.fn().mockResolvedValue({ data: [{ uuid: 'first', name: 'Первый' }], meta: { totalRows: 1 } }),
  };
  const query = { get: vi.fn().mockReturnValue({ shopUuid }), set: vi.fn().mockResolvedValue(undefined) };
  const controller = new CategoryController(
    categories as unknown as CategoryServiceInterface,
    shops as unknown as ShopServiceInterface,
    query as unknown as RouteQueryServiceInterface,
  );
  return { categories, shops, query, controller };
};

describe('CategoryController', () => {
  it('opens the first shop when no shop is selected', async () => {
    const fixture = createFixture();
    const result = await fixture.controller.loader();
    expect(fixture.categories.getTree).toHaveBeenCalledWith('first');
    expect(result.tree).toEqual({ shopUuid: 'first', nodes: [] });
  });

  it('loads the selected shop rather than combining shops', async () => {
    const fixture = createFixture('second');
    await fixture.controller.loader();
    expect(fixture.categories.getTree).toHaveBeenCalledWith('second');
  });

  it('loads all shop pages for the selector', async () => {
    const fixture = createFixture();
    fixture.shops.findAll
      .mockResolvedValueOnce({ data: [{ uuid: 'first', name: 'Первый' }], meta: { totalRows: 2 } })
      .mockResolvedValueOnce({ data: [{ uuid: 'second', name: 'Второй' }], meta: { totalRows: 2 } });
    const result = await fixture.controller.loader();
    expect(result.shops).toHaveLength(2);
    expect(fixture.shops.findAll).toHaveBeenLastCalledWith({ limit: 200, offset: 1 });
  });

  it('does not request a tree when there are no shops', async () => {
    const fixture = createFixture();
    fixture.shops.findAll.mockResolvedValue({ data: [], meta: { totalRows: 0 } });
    await expect(fixture.controller.loader()).resolves.toEqual({ shops: [], tree: null });
    expect(fixture.categories.getTree).not.toHaveBeenCalled();
  });

  it('changes the selected shop through the module query', async () => {
    const fixture = createFixture();
    await fixture.controller.action({ payload: { shopUuid: 'second' }, signal: new AbortController().signal });
    expect(fixture.query.set).toHaveBeenCalledWith(CategoryQuery, { shopUuid: 'second' });
  });

  it('preserves a backend failure instead of substituting example categories', async () => {
    const fixture = createFixture();
    const error = new Error('Store unavailable');
    fixture.categories.getTree.mockRejectedValue(error);
    await expect(fixture.controller.loader()).rejects.toBe(error);
  });
});
