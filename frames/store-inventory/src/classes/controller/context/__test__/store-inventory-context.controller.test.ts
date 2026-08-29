import { StoreProductEntity, type StoreServiceInterface } from '@library/domain';
import type { NavigateServiceInterface } from '@sellgar/app-v2';

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
    article: 'article',
    shop: {
      uuid: '00000000-0000-4000-8000-000000000003',
      name: 'Магазин',
      status: 'active',
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    product: {
      uuid: '00000000-0000-4000-8000-000000000004',
      name: 'Товар',
      status: 'active',
      brand: {
        uuid: '00000000-0000-4000-8000-000000000005',
        name: 'Бренд',
        createdAt: timestamp,
        updatedAt: timestamp,
      },
      category: {
        uuid: '00000000-0000-4000-8000-000000000006',
        name: 'Категория',
        createdAt: timestamp,
        updatedAt: timestamp,
      },
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    offers: [
      {
        uuid: offerUuid,
        version: 1,
        status: 'active',
        showing: true,
        article: 'offer-article',
        variant: {
          uuid: '00000000-0000-4000-8000-000000000007',
          name: 'Вариант',
          status: 'active',
          properties: [],
          images: [],
          createdAt: timestamp,
          updatedAt: timestamp,
        },
        prices: [],
        inventoryMovements: [],
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
  it('загружает складскую позицию и находит предложение из frame props', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {},
        params: {
          storeProductUuid: fixture.storeProduct.uuid,
          offerUuid: fixture.offer.uuid,
        },
        request: new Request('http://localhost/store'),
        signal: new AbortController().signal,
      }),
    ).resolves.toEqual({
      storeProduct: fixture.storeProduct,
      offer: fixture.offer,
    });

    expect(fixture.storeService.findByUuid).toHaveBeenCalledWith(fixture.storeProduct.uuid);
  });

  it('отклоняет неизвестное предложение', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {},
        params: {
          storeProductUuid: fixture.storeProduct.uuid,
          offerUuid: '00000000-0000-4000-8000-000000000099',
        },
        request: new Request('http://localhost/store'),
        signal: new AbortController().signal,
      }),
    ).rejects.toThrow('Предложение товара на складе не найдено.');
  });

  it('закрывает frame по пользовательской команде', async () => {
    const fixture = createController();

    await fixture.controller.close();

    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
  });
});
