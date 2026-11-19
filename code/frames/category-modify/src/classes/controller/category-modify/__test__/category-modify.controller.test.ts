import type { CategoryServiceInterface } from '@library/domain';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { CategoryModifyController } from '../category-modify.controller.ts';

const setup = () => {
  const categories = {
    create: vi.fn().mockResolvedValue({ shopUuid: 'shop' }),
    update: vi.fn().mockResolvedValue({ shopUuid: 'shop' }),
    findByUuid: vi.fn().mockResolvedValue({ uuid: 'category', shopUuid: 'shop', version: 2 }),
    getTree: vi.fn().mockResolvedValue({ shopUuid: 'shop', nodes: [] }),
  };
  const navigation = { close: vi.fn().mockResolvedValue(undefined) };
  const controller = new CategoryModifyController(
    categories as unknown as CategoryServiceInterface,
    navigation as unknown as NavigateServiceInterface,
  );
  return { categories, navigation, controller };
};
const signal = () => new AbortController().signal;
const payload = { name: 'Чай', description: null, parentUuid: null };

describe('CategoryModifyController', () => {
  it('loads parent choices for the creation shop without fetching a category', async () => {
    const fixture = setup();
    await expect(fixture.controller.loader({ params: { shopUuid: 'shop' }, signal: signal() })).resolves.toEqual({
      shopUuid: 'shop',
      category: null,
      parents: [],
    });
    expect(fixture.categories.findByUuid).not.toHaveBeenCalled();
    expect(fixture.categories.getTree).toHaveBeenCalledWith('shop');
  });

  it('derives the editing shop from the category', async () => {
    const fixture = setup();
    await fixture.controller.loader({ params: { uuid: 'category', shopUuid: 'another' }, signal: signal() });
    expect(fixture.categories.getTree).toHaveBeenCalledWith('shop');
  });

  it('creates through Store and closes without manually refreshing data', async () => {
    const fixture = setup();
    await fixture.controller.action({ params: { shopUuid: 'shop' }, payload, signal: signal() });
    expect(fixture.categories.create).toHaveBeenCalledWith({
      ...payload,
      shopUuid: 'shop',
      commandId: expect.any(String),
    });
    expect(fixture.categories.getTree).not.toHaveBeenCalled();
    expect(fixture.navigation.close).toHaveBeenCalledOnce();
  });

  it('sends the route UUID and expected version on edit', async () => {
    const fixture = setup();
    await fixture.controller.action({
      params: { uuid: 'category' },
      payload: { ...payload, expectedVersion: 2 },
      signal: signal(),
    });
    expect(fixture.categories.update).toHaveBeenCalledWith('category', {
      ...payload,
      uuid: 'category',
      expectedVersion: 2,
      commandId: expect.any(String),
    });
  });

  it('keeps the drawer open and does not refresh after a failed save', async () => {
    const fixture = setup();
    fixture.categories.create.mockRejectedValue(new Error('Duplicate name'));
    await expect(
      fixture.controller.action({ params: { shopUuid: 'shop' }, payload, signal: signal() }),
    ).rejects.toThrow('Duplicate name');
    expect(fixture.navigation.close).not.toHaveBeenCalled();
    expect(fixture.categories.getTree).not.toHaveBeenCalled();
  });

  it('rejects missing creation context and missing edit version', async () => {
    const fixture = setup();
    await expect(fixture.controller.loader({ params: {}, signal: signal() })).rejects.toThrow('Не выбран магазин');
    await expect(
      fixture.controller.action({ params: { uuid: 'category' }, payload, signal: signal() }),
    ).rejects.toThrow('версия категории');
    expect(fixture.categories.update).not.toHaveBeenCalled();
  });

  it('closes without refreshing loaders on cancel', async () => {
    const fixture = setup();
    await fixture.controller.close();
    expect(fixture.navigation.close).toHaveBeenCalledOnce();
    expect(fixture.categories.getTree).not.toHaveBeenCalled();
  });
});
