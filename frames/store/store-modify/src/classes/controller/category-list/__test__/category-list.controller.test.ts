import { describe, expect, it, vi } from 'vitest';
import type { CategoryServiceInterface, CategoryTreeEntity } from '@library/domain';

import { CategoryListController } from '../category-list.controller.ts';
import { CategoryOptionsStore } from '../../../store/category-options/category-options.store.ts';

const setup = () => {
  const categories = { getTree: vi.fn<() => Promise<CategoryTreeEntity>>() };
  const store = new CategoryOptionsStore();
  const controller = new CategoryListController(categories as unknown as CategoryServiceInterface, store);
  return { categories, store, controller };
};
const deferred = () => {
  let resolve!: (tree: CategoryTreeEntity) => void;
  const promise = new Promise<CategoryTreeEntity>((done) => {
    resolve = done;
  });
  return { promise, resolve };
};

describe('CategoryListController', () => {
  it('keeps the latest shop choices when responses arrive out of order', async () => {
    const fixture = setup(),
      first = deferred(),
      second = deferred();
    fixture.categories.getTree.mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
    const oldRequest = fixture.controller.load('first');
    const newRequest = fixture.controller.load('second');
    const nodes = [{ uuid: 'new', children: [] }] as unknown as CategoryTreeEntity['nodes'];
    second.resolve({ shopUuid: 'second', nodes });
    await newRequest;
    first.resolve({ shopUuid: 'first', nodes: [] });
    await oldRequest;
    expect(fixture.controller.options).toBe(nodes);
    expect(fixture.controller.loading).toBe(false);
  });

  it('reports an error and can retry without disguising failure as an empty tree', async () => {
    const fixture = setup();
    fixture.categories.getTree
      .mockRejectedValueOnce(new Error('unavailable'))
      .mockResolvedValueOnce({ shopUuid: 'shop', nodes: [] });
    await fixture.controller.load('shop');
    expect(fixture.controller.error).toBeDefined();
    expect(fixture.controller.loading).toBe(false);
    await fixture.controller.load('shop');
    expect(fixture.controller.error).toBeUndefined();
    expect(fixture.controller.options).toEqual([]);
  });

  it('ignores responses after clearing the shop or disposing the frame', async () => {
    for (const dispose of [false, true]) {
      const fixture = setup(),
        pending = deferred();
      fixture.categories.getTree.mockReturnValue(pending.promise);
      const request = fixture.controller.load('shop');
      if (dispose) fixture.controller.dispose();
      else await fixture.controller.load('');
      pending.resolve({ shopUuid: 'shop', nodes: [{ uuid: 'stale' }] as CategoryTreeEntity['nodes'] });
      await request;
      expect(fixture.controller.options).toEqual([]);
      expect(fixture.controller.loading).toBe(false);
    }
  });
});
