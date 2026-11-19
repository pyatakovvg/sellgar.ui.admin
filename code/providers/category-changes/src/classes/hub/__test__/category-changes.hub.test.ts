import { expect, it, vi } from 'vitest';
import { CategoryChangesHub } from '../category-changes.hub.ts';

it('validates both category events before delivery and disposes both leases', async () => {
  const handlers = new Map<string, (value: unknown) => Promise<void>>();
  const dispose = vi.fn().mockResolvedValue(undefined);
  const connection = {
    subscribeDelivery: vi.fn((event: string, handler: (value: unknown) => Promise<void>) => {
      handlers.set(event, handler);
      return { dispose };
    }),
  };
  const hub = new CategoryChangesHub(
    { get: () => 'http://localhost' } as never,
    {} as never,
    { get: vi.fn().mockReturnValue(connection) } as never,
  );
  const changed = vi.fn().mockResolvedValue(undefined);
  const cleanup = hub.subscribe({ changed });
  const category = {
    uuid: '5b7e713c-f6c6-4450-b1dc-767a7458bf55',
    version: 2,
    shopUuid: '1d932a09-5015-4688-a50e-03822fdeb37c',
    parentUuid: null,
    name: 'Чай',
    description: null,
    sortOrder: 0,
    createdAt: '2026-08-08T12:00:00.000Z',
    updatedAt: '2026-08-08T12:00:00.000Z',
  };
  for (const event of ['store.category.created', 'store.category.updated']) {
    await expect(handlers.get(event)!({ shopUuid: 'invalid' })).rejects.toBeDefined();
    await handlers.get(event)!(category);
  }
  expect(changed).toHaveBeenCalledTimes(2);
  await cleanup();
  expect(dispose).toHaveBeenCalledTimes(2);
});
