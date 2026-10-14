import type { StoreProductEntity, StoreServiceInterface } from '@library/domain';
import type { NavigationBlockerServiceInterface, RevalidateServiceInterface } from '@sellgar/app';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { StoreReviewRoute } from '@library/route-tokens';

import type { StoreModifyActionPayload } from '../store-modify-controller.interface.ts';
import { StoreModifyController } from '../store-modify.controller.ts';

const createController = () => {
  const result = { uuid: 'store-product' } as StoreProductEntity;
  const storeService = {
    create: vi.fn().mockResolvedValue(result),
    findByUuid: vi.fn(),
    update: vi.fn().mockResolvedValue(result),
  } as unknown as StoreServiceInterface;
  const navigateService = { close: vi.fn(), to: vi.fn() } as unknown as NavigateServiceInterface;
  const revalidateService = { revalidate: vi.fn() } as unknown as RevalidateServiceInterface;
  const navigationBlocker = {
    allow: vi.fn(async (navigate: () => Promise<unknown>) => navigate()),
  } as unknown as NavigationBlockerServiceInterface;

  return {
    controller: new StoreModifyController(storeService, navigateService, revalidateService, navigationBlocker),
    navigateService,
    result,
    revalidateService,
    storeService,
    navigationBlocker,
  };
};

const payload: StoreModifyActionPayload = {
  shopUuid: 'shop',
  productUuid: 'product',
  showing: true,
  offers: [
    {
      variantUuid: 'variant',
      currentPrice: { value: '100.00', currencyCode: 'RUB' },
      showing: true,
    },
  ],
};

const actionArgs = (nextPayload: StoreModifyActionPayload, uuid?: string) => ({
  payload: nextPayload,
  params: { uuid },
  signal: new AbortController().signal,
});

describe('StoreModifyController', () => {
  it('не загружает складскую позицию для create frame', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {},
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
        params: { uuid: fixture.result.uuid },
        signal: new AbortController().signal,
      }),
    ).resolves.toBe(fixture.result);

    expect(fixture.storeService.findByUuid).toHaveBeenCalledWith(fixture.result.uuid);
  });

  it('закрывает frame по пользовательской команде', async () => {
    const fixture = createController();

    await fixture.controller.close();

    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
  });

  it('возвращается из редактирования в просмотр исходного UUID', async () => {
    const fixture = createController();
    await fixture.controller.close('existing-store');
    expect(fixture.navigateService.to).toHaveBeenCalledWith(StoreReviewRoute, { params: { uuid: 'existing-store' } });
    expect(fixture.navigateService.close).not.toHaveBeenCalled();
  });

  it('создаёт складскую позицию, обновляет список и открывает просмотр', async () => {
    const fixture = createController();

    await expect(fixture.controller.action(actionArgs(payload))).resolves.toBe(fixture.result);

    expect(fixture.storeService.create).toHaveBeenCalledWith({
      commandId: expect.any(String),
      shopUuid: payload.shopUuid,
      productUuid: payload.productUuid,
      showing: true,
      offers: payload.offers,
    });
    expect(fixture.revalidateService.revalidate).toHaveBeenCalledOnce();
    expect(fixture.navigationBlocker.allow).toHaveBeenCalledOnce();
    expect(fixture.navigateService.to).toHaveBeenCalledWith(StoreReviewRoute, {
      params: { uuid: fixture.result.uuid },
    });
  });

  it('обновляет открытую позицию с обязательной версией', async () => {
    const fixture = createController();
    const uuid = 'c7fd8d23-c843-4d47-8d23-33698a5f034f';

    await fixture.controller.action(actionArgs({ ...payload, expectedVersion: 5 }, uuid));

    expect(fixture.storeService.update).toHaveBeenCalledWith({
      commandId: expect.any(String),
      uuid,
      expectedVersion: 5,
      showing: true,
      offers: payload.offers,
    });
  });

  it('создает несколько учетных записей с отдельными артикулами и уточнениями', async () => {
    const fixture = createController();
    await fixture.controller.action(
      actionArgs({
        ...payload,
        offers: [
          {
            ...payload.offers[0],
            records: [
              { article: ' S-01 ', clarifications: [{ value: ' S евростандарт ' }] },
              { article: '', clarifications: [] },
            ],
          },
        ],
      }),
    );
    expect(fixture.storeService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        offers: [
          expect.objectContaining({
            records: [
              { article: 'S-01', uuid: undefined, clarifications: [{ value: 'S евростандарт' }] },
              { article: undefined, uuid: undefined, clarifications: [] },
            ],
          }),
        ],
      }),
    );
  });

  it('сохраняет UUID записи при изменении артикула и очистке уточнений, не отправляя остатки', async () => {
    const fixture = createController();
    await fixture.controller.action(
      actionArgs(
        {
          ...payload,
          expectedVersion: 5,
          offers: [
            {
              ...payload.offers[0],
              uuid: 'offer-uuid',
              records: [{ uuid: 'record-uuid', article: 'S-02', clarifications: [] }],
            },
          ],
        },
        'store-uuid',
      ),
    );
    expect(fixture.storeService.update).toHaveBeenCalledWith(
      expect.objectContaining({
        offers: [
          expect.objectContaining({
            uuid: 'offer-uuid',
            records: [{ uuid: 'record-uuid', article: 'S-02', clarifications: [] }],
          }),
        ],
      }),
    );
  });

  it('не отправляет update без expectedVersion', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.action(actionArgs(payload, 'c7fd8d23-c843-4d47-8d23-33698a5f034f')),
    ).rejects.toThrow('Не передана версия товара на складе.');

    expect(fixture.storeService.update).not.toHaveBeenCalled();
  });
});
