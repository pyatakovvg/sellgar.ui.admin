import type { StoreProductEntity, StoreServiceInterface } from '@library/domain';
import type { FrameServiceInterface, RevalidateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import type { StoreModifyActionPayload } from '../store-modify-controller.interface.ts';
import { StoreModifyController } from '../store-modify.controller.ts';

const createController = () => {
  const result = { uuid: 'store-product' } as StoreProductEntity;
  const storeService = {
    create: vi.fn().mockResolvedValue(result),
    findByUuid: vi.fn(),
    update: vi.fn().mockResolvedValue(result),
  } as unknown as StoreServiceInterface;
  const frameService = { close: vi.fn() } as unknown as FrameServiceInterface;
  const revalidateService = { revalidate: vi.fn() } as unknown as RevalidateServiceInterface;

  return {
    controller: new StoreModifyController(storeService, frameService, revalidateService),
    frameService,
    result,
    revalidateService,
    storeService,
  };
};

const payload: StoreModifyActionPayload = {
  shopUuid: 'shop',
  productUuid: 'product',
  showing: true,
  offers: [
    {
      variantUuid: 'variant',
      article: 'SKU-1',
      currentPrice: { value: '100.00', currencyCode: 'RUB' },
      showing: true,
    },
  ],
};

const actionArgs = (nextPayload: StoreModifyActionPayload, uuid?: string) => ({
  params: {},
  payload: nextPayload,
  props: { uuid },
  request: new Request('http://localhost/store', { method: 'POST' }),
  signal: new AbortController().signal,
});

describe('StoreModifyController', () => {
  it('не загружает складскую позицию для create frame', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {},
        props: {},
        request: new Request('http://localhost/store'),
        signal: new AbortController().signal,
      }),
    ).resolves.toBeUndefined();

    expect(fixture.storeService.findByUuid).not.toHaveBeenCalled();
  });

  it('загружает складскую позицию по frame props', async () => {
    const fixture = createController();
    vi.mocked(fixture.storeService.findByUuid).mockResolvedValue(fixture.result);

    await expect(
      fixture.controller.loader({
        params: {},
        props: { uuid: fixture.result.uuid },
        request: new Request('http://localhost/store'),
        signal: new AbortController().signal,
      }),
    ).resolves.toBe(fixture.result);

    expect(fixture.storeService.findByUuid).toHaveBeenCalledWith(fixture.result.uuid);
  });

  it('закрывает frame по пользовательской команде', async () => {
    const fixture = createController();

    await fixture.controller.close();

    expect(fixture.frameService.close).toHaveBeenCalledOnce();
  });

  it('создаёт складскую позицию, обновляет список и закрывает frame', async () => {
    const fixture = createController();

    await expect(fixture.controller.action(actionArgs(payload))).resolves.toBe(fixture.result);

    expect(fixture.storeService.create).toHaveBeenCalledWith({
      commandId: expect.any(String),
      shopUuid: payload.shopUuid,
      productUuid: payload.productUuid,
      article: 'SKU-1',
      showing: true,
      offers: payload.offers,
    });
    expect(fixture.revalidateService.revalidate).toHaveBeenCalledOnce();
    expect(fixture.frameService.close).toHaveBeenCalledOnce();
  });

  it('обновляет открытую позицию с обязательной версией', async () => {
    const fixture = createController();
    const uuid = 'c7fd8d23-c843-4d47-8d23-33698a5f034f';

    await fixture.controller.action(actionArgs({ ...payload, expectedVersion: 5 }, uuid));

    expect(fixture.storeService.update).toHaveBeenCalledWith({
      commandId: expect.any(String),
      uuid,
      expectedVersion: 5,
      shopUuid: payload.shopUuid,
      productUuid: payload.productUuid,
      article: 'SKU-1',
      showing: true,
      offers: payload.offers,
    });
  });

  it('не отправляет update без expectedVersion', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.action(actionArgs(payload, 'c7fd8d23-c843-4d47-8d23-33698a5f034f')),
    ).rejects.toThrow('Не передана версия товара на складе.');

    expect(fixture.storeService.update).not.toHaveBeenCalled();
  });
});
