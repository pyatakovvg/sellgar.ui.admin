import { PropertyEntity, PropertyResultEntity, type PropertyServiceInterface } from '@library/domain';
import { plainToInstance } from 'class-transformer';
import { describe, expect, it, vi } from 'vitest';
import { PropertySaveService } from '../property-save.service.ts';
import type { PropertySaveInput } from '../input/property-save.input.ts';

const snapshot = (version: number, codes: string[]) =>
  plainToInstance(PropertyEntity, {
    code: 'colors',
    name: 'Цвет',
    kind: 'OPTIONS',
    unitCode: null,
    description: 'Описание',
    version,
    options: codes.map((code, sortOrder) => ({ code, name: code, sortOrder, extras: [] })),
    createdAt: '2026-10-12T00:00:00.000Z',
    updatedAt: '2026-10-12T00:00:00.000Z',
  });
const input = (version = 2): PropertySaveInput => ({
  code: 'ignored',
  name: 'Цвет',
  kind: 'OPTIONS',
  unitCode: null,
  description: 'Описание',
  version,
  options: [
    { code: 'red', name: 'Красный', sortOrder: 0, extras: [{ type: 'COLOR', sortOrder: 0, valueColor: '#FF0000' }] },
    { code: 'blue', name: 'Синий', sortOrder: 1, extras: [] },
  ],
});
const fixture = () => {
  const loaded = snapshot(2, ['red']);
  const list = plainToInstance(PropertyResultEntity, { items: [loaded], total: 1, limit: 50, offset: 0 });
  const api = { create: vi.fn(), update: vi.fn(), createOption: vi.fn(), updateOption: vi.fn() };
  return { loaded, list, api, service: new PropertySaveService(api as unknown as PropertyServiceInterface) };
};

describe('PropertySaveService', () => {
  it('uses the latest aggregate version for every option command', async () => {
    const f = fixture();
    f.api.update.mockImplementation(async () => snapshot(3, ['red']));
    f.api.updateOption.mockImplementation(async () => snapshot(4, ['red']));
    f.api.createOption.mockImplementation(async () => snapshot(5, ['red', 'blue']));
    await f.service.update('colors', input());
    expect(f.api.update).toHaveBeenCalledWith('colors', { version: 2, name: 'Цвет', description: 'Описание' });
    expect(f.api.updateOption).toHaveBeenCalledWith('colors', 'red', {
      version: 3,
      name: 'Красный',
      sortOrder: 0,
      extras: [{ type: 'COLOR', sortOrder: 0, valueColor: '#FF0000' }],
    });
    expect(f.api.createOption).toHaveBeenCalledWith('colors', 4, {
      code: 'blue',
      name: 'Синий',
      sortOrder: 1,
      extras: [],
    });
    expect(f.loaded.version).toBe(5);
    expect(f.list.items).toHaveLength(1);
    expect(f.list.items[0].options.map((o) => o.code)).toEqual(['red', 'blue']);
  });

  it('keeps successful responses and does not duplicate a created option on retry', async () => {
    const f = fixture();
    const payload = {
      ...input(),
      options: [
        { code: 'blue', name: 'Синий', sortOrder: 0, extras: [] },
        { code: 'green', name: 'Зелёный', sortOrder: 1, extras: [] },
      ],
    };
    f.api.update.mockImplementation(async () => snapshot(3, ['red']));
    f.api.createOption
      .mockImplementationOnce(async () => snapshot(4, ['red', 'blue']))
      .mockRejectedValueOnce(new Error('Сбой'));
    await expect(f.service.update('colors', payload)).rejects.toThrow('Сбой');
    expect(f.loaded.version).toBe(4);
    expect(f.loaded.options.map((o) => o.code)).toEqual(['red', 'blue']);

    f.api.update.mockImplementation(async () => snapshot(4, ['red', 'blue']));
    f.api.updateOption.mockImplementation(async () => snapshot(4, ['red', 'blue']));
    f.api.createOption.mockImplementation(async () => snapshot(5, ['red', 'blue', 'green']));
    await f.service.update('colors', { ...payload, version: f.loaded.version });
    expect(f.api.updateOption).toHaveBeenCalledWith('colors', 'blue', {
      version: 4,
      name: 'Синий',
      sortOrder: 0,
      extras: [],
    });
    expect(f.api.createOption.mock.calls.filter(([, , option]) => option.code === 'blue')).toHaveLength(1);
    expect(f.loaded.version).toBe(5);
  });

  it('does not touch entities or options when the first command fails', async () => {
    const f = fixture();
    f.api.update.mockRejectedValue(new Error('Конфликт версии'));
    await expect(f.service.update('colors', input())).rejects.toThrow('Конфликт версии');
    expect(f.loaded.version).toBe(2);
    expect(f.api.updateOption).not.toHaveBeenCalled();
    expect(f.api.createOption).not.toHaveBeenCalled();
  });
});
