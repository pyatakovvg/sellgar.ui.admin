import { StoreProductEntity, type StoreServiceInterface } from '@library/domain';
import type { NavigateServiceInterface } from '@sellgar/app';

import { plainToInstance } from 'class-transformer';
import { describe, expect, it, vi } from 'vitest';

import { StoreInventoryContextController } from '../store-inventory-context.controller.ts';

const createController = () => {
  const timestamp = '2026-08-10T10:00:00.000Z';
  const offerUuid = '00000000-0000-4000-8000-000000000002';
  const storeProduct = plainToInstance(StoreProductEntity, {
    uuid: '00000000-0000-4000-8000-000000000001',
    version: 1,
    status: 'active',
    showing: true,
    shopUuid: '00000000-0000-4000-8000-000000000003',
    shopSnapshot: {
      shopUuid: '00000000-0000-4000-8000-000000000003',
      sourceVersion: 1,
      name: 'Магазин',
      status: 'active',
      syncedAt: timestamp,
    },
    productUuid: '00000000-0000-4000-8000-000000000004',
    productSnapshot: {
      productUuid: '00000000-0000-4000-8000-000000000004',
      sourceVersion: 1,
      name: 'Товар',
      status: 'active',
      syncedAt: timestamp,
    },
    offers: [
      {
        uuid: offerUuid,
        version: 1,
        status: 'active',
        showing: true,
        storeProductUuid: '00000000-0000-4000-8000-000000000001',
        productUuid: '00000000-0000-4000-8000-000000000004',
        variantUuid: '00000000-0000-4000-8000-000000000007',
        variantSnapshot: {
          variantUuid: '00000000-0000-4000-8000-000000000007',
          productUuid: '00000000-0000-4000-8000-000000000004',
          sourceVersion: 1,
          name: 'Вариант',
          status: 'active',
          syncedAt: timestamp,
        },
        prices: [],
        records: [1, 2].map((number) => ({
          uuid: `00000000-0000-4000-8000-00000000001${number}`,
          offerUuid,
          article: `SKU-${number}`,
          version: 1,
          clarifications: [{ position: 0, value: number === 1 ? 'S евростандарт' : 'L евростандарт' }],
          inventory: {
            uuid: `00000000-0000-4000-8000-00000000002${number}`,
            recordUuid: `00000000-0000-4000-8000-00000000001${number}`,
            quantity: number * 5,
            reserved: number,
            available: number * 4,
            version: number,
            updatedAt: timestamp,
          },
          createdAt: timestamp,
          updatedAt: timestamp,
        })),
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ],
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  const offer = storeProduct.offers[0];
  const storeService = {
    findByUuid: vi.fn().mockResolvedValue(storeProduct),
  } as unknown as StoreServiceInterface;
  const navigateService = { close: vi.fn() } as unknown as NavigateServiceInterface;

  return {
    controller: new StoreInventoryContextController(storeService, navigateService),
    navigateService,
    offer,
    storeProduct,
    storeService,
  };
};

describe('StoreInventoryContextController', () => {
  it('загружает складскую позицию и выбирает конкретную учётную запись из params', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {
          storeProductUuid: fixture.storeProduct.uuid,
          recordUuid: fixture.offer.records[1].uuid,
        },
        request: new Request('http://localhost/store'),
        signal: new AbortController().signal,
      }),
    ).resolves.toEqual({
      storeProduct: fixture.storeProduct,
      offer: fixture.offer,
      record: fixture.offer.records[1],
    });

    expect(fixture.storeService.findByUuid).toHaveBeenCalledWith(fixture.storeProduct.uuid);
  });

  it('отклоняет неизвестное предложение', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {
          storeProductUuid: fixture.storeProduct.uuid,
          recordUuid: '00000000-0000-4000-8000-000000000099',
        },
        request: new Request('http://localhost/store'),
        signal: new AbortController().signal,
      }),
    ).rejects.toThrow('Учётная запись на складе не найдена.');
  });

  it('закрывает frame по пользовательской команде', async () => {
    const fixture = createController();

    await fixture.controller.close();

    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
  });
});
