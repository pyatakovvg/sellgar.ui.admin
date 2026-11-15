import { expect, it, vi } from 'vitest';
import { CategoryTreeEntity, type CategoryServiceInterface } from '@library/domain';
import type { CategoryChangesListener } from '../classes/hub/category-changes-hub.interface.ts';
import { CategoryChangesHubInterface } from '../classes/hub/category-changes-hub.interface.ts';
import { CategoryChangesProvider } from '../category-changes.provider.ts';

it('refreshes the delivered shop tree, preserves other shops and releases the subscription', async () => {
  const tree = Object.assign(new CategoryTreeEntity(), { shopUuid: 'shop', nodes: [{ uuid: 'stale' }] });
  const otherTree = Object.assign(new CategoryTreeEntity(), { shopUuid: 'other', nodes: [] });
  const currentNodes = [{ uuid: 'parent', children: [{ uuid: 'moved-child', children: [] }] }];
  const categories = { getTree: vi.fn().mockResolvedValue({ shopUuid: 'shop', nodes: currentNodes }) };
  let listener: CategoryChangesListener | undefined;
  const dispose = vi.fn();
  const hub = {
    subscribe: vi.fn((value: CategoryChangesListener) => {
      listener = value;
      return dispose;
    }),
  };
  const provider = new CategoryChangesProvider(
    hub as CategoryChangesHubInterface,
    categories as unknown as CategoryServiceInterface,
  );
  const cleanup = provider.activate();
  expect(categories.getTree).not.toHaveBeenCalled();
  await listener!.changed({ shopUuid: 'shop' } as Parameters<CategoryChangesListener['changed']>[0]);
  expect(categories.getTree).toHaveBeenCalledWith('shop');
  expect(tree.nodes).toEqual(currentNodes);
  expect(otherTree.nodes).toEqual([]);
  if (typeof cleanup !== 'function') throw new Error('Missing cleanup');
  await cleanup();
  expect(dispose).toHaveBeenCalledOnce();
});
