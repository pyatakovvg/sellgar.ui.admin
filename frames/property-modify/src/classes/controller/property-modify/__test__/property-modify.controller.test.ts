import type { CreatePropertyInput, PropertyEntity, PropertyServiceInterface, UpdatePropertyInput } from '@library/domain';
import type { RevalidateServiceInterface } from '@sellgar/app-v2';
import type { NavigateServiceInterface } from '@sellgar/app-v2';
import { describe, expect, it, vi } from 'vitest';

import { PropertyModifyController } from '../property-modify.controller.ts';

const createController = () => {
  const propertyService = {
    create: vi.fn(),
    findByUuid: vi.fn(),
    update: vi.fn(),
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

const createPayload: CreatePropertyInput = {
  code: 'color',
  name: 'Цвет',
  type: 'OPTION',
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

    expect(fixture.propertyService.findByUuid).not.toHaveBeenCalled();
  });

  it('загружает свойство по frame props', async () => {
    const fixture = createController();
    const property = { uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f' } as PropertyEntity;
    vi.mocked(fixture.propertyService.findByUuid).mockResolvedValue(property);

    await expect(
      fixture.controller.loader({
        params: {},
        params: { uuid: property.uuid },
        request: new Request('http://localhost/properties'),
        signal: new AbortController().signal,
      }),
    ).resolves.toBe(property);

    expect(fixture.propertyService.findByUuid).toHaveBeenCalledWith(property.uuid);
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

    expect(fixture.propertyService.create).toHaveBeenCalledWith(createPayload);
    expect(fixture.revalidateService.revalidate).toHaveBeenCalledOnce();
    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
  });

  it('определяет update по uuid в payload', async () => {
    const fixture = createController();
    const payload: UpdatePropertyInput = {
      ...createPayload,
      uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f',
      version: 2,
    };

    await fixture.controller.action({
      params: {},
      payload,
      params: { uuid: payload.uuid },
      request: new Request('http://localhost/properties', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.propertyService.update).toHaveBeenCalledWith(payload.uuid, payload);
    expect(fixture.propertyService.create).not.toHaveBeenCalled();
  });
});
