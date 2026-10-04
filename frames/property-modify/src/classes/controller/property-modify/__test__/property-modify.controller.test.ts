import type { PropertyEntity, PropertyServiceInterface } from '@library/domain';
import type { RevalidateServiceInterface } from '@sellgar/app';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { PropertyModifyController } from '../property-modify.controller.ts';
import type { PropertyModifyActionPayload } from '../property-modify-controller.interface.ts';

const createController = () => {
  const propertyService = {
    create: vi.fn(),
    createOption: vi.fn(),
    findByCode: vi.fn(),
    update: vi.fn(),
    updateOption: vi.fn(),
  } as unknown as PropertyServiceInterface;
  const navigateService = { close: vi.fn() } as unknown as NavigateServiceInterface;
  const revalidateService = { revalidate: vi.fn() } as unknown as RevalidateServiceInterface;

  return {
    controller: new PropertyModifyController(propertyService, navigateService, revalidateService),
    navigateService,
    propertyService,
    revalidateService,
  };
};

const createPayload: PropertyModifyActionPayload = {
  code: 'color',
  name: 'Цвет',
  kind: 'OPTIONS',
  unitCode: null,
  description: 'Цвет товара',
  options: [],
};

describe('PropertyModifyController', () => {
  it('не загружает свойство для create frame', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {},
        params: {},
        request: new Request('http://localhost/properties'),
        signal: new AbortController().signal,
      }),
    ).resolves.toBeUndefined();

    expect(fixture.propertyService.findByCode).not.toHaveBeenCalled();
  });

  it('загружает свойство по frame props', async () => {
    const fixture = createController();
    const property = { code: 'color' } as PropertyEntity;
    vi.mocked(fixture.propertyService.findByCode).mockResolvedValue(property);

    await expect(
      fixture.controller.loader({
        params: {},
        params: { code: property.code },
        request: new Request('http://localhost/properties'),
        signal: new AbortController().signal,
      }),
    ).resolves.toBe(property);

    expect(fixture.propertyService.findByCode).toHaveBeenCalledWith(property.code);
  });

  it('закрывает frame по пользовательской команде', async () => {
    const fixture = createController();

    await fixture.controller.close();

    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
  });

  it('создаёт свойство и завершает frame workflow', async () => {
    const fixture = createController();

    await fixture.controller.action({
      params: {},
      payload: createPayload,
      params: {},
      request: new Request('http://localhost/properties', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.propertyService.create).toHaveBeenCalledWith({
      code: createPayload.code,
      name: createPayload.name,
      description: createPayload.description,
      kind: createPayload.kind,
      unitCode: createPayload.unitCode,
      options: [],
    });
    expect(fixture.revalidateService.revalidate).toHaveBeenCalledOnce();
    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
  });

  it('обновляет свойство по коду из frame params', async () => {
    const fixture = createController();
    const payload: PropertyModifyActionPayload = {
      ...createPayload,
      version: 2,
    };
    const updated = { code: payload.code, version: 3 } as PropertyEntity;
    vi.mocked(fixture.propertyService.update).mockResolvedValue(updated);

    await fixture.controller.action({
      params: {},
      payload,
      params: { code: payload.code },
      request: new Request('http://localhost/properties', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.propertyService.update).toHaveBeenCalledWith(payload.code, {
      version: payload.version,
      name: payload.name,
      description: payload.description,
    });
    expect(fixture.propertyService.create).not.toHaveBeenCalled();
  });

  it('последовательно меняет опции с актуальной версией агрегата', async () => {
    const fixture = createController();
    const payload: PropertyModifyActionPayload = {
      ...createPayload,
      version: 2,
      options: [
        { persisted: true, code: 'red', name: 'Красный', sortOrder: 0, extras: [] },
        { persisted: false, code: 'blue', name: 'Синий', sortOrder: 1, extras: [] },
      ],
    };
    vi.mocked(fixture.propertyService.update).mockResolvedValue({ version: 3 } as PropertyEntity);
    vi.mocked(fixture.propertyService.updateOption).mockResolvedValue({ version: 4 } as PropertyEntity);
    vi.mocked(fixture.propertyService.createOption).mockResolvedValue({ version: 5 } as PropertyEntity);

    await fixture.controller.action({
      params: { code: payload.code },
      payload,
      request: new Request('http://localhost/properties', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.propertyService.updateOption).toHaveBeenCalledWith(payload.code, 'red', {
      version: 3,
      name: 'Красный',
      sortOrder: 0,
      extras: [],
    });
    expect(fixture.propertyService.createOption).toHaveBeenCalledWith(payload.code, 4, {
      code: 'blue',
      name: 'Синий',
      sortOrder: 1,
      extras: [],
    });
  });
});
