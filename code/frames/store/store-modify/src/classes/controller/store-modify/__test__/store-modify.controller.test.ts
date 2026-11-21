import type { CategoryListControllerInterface } from '../../category-list/category-list-controller.interface.ts';
import type {
  ProductEntity,
  ProductServiceInterface,
  StoreProductEntity,
  StoreServiceInterface,
} from '@library/domain';
import type { NavigationBlockerServiceInterface, RevalidateServiceInterface } from '@sellgar/app';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { StoreReviewRoute } from '@library/route-tokens';

import type { StoreModifyActionPayload } from '../store-modify-controller.interface.ts';
import { StoreModifyController } from '../store-modify.controller.ts';

const createController = () => {
  const result = { uuid: 'store-product', shopUuid: 'shop', productUuid: 'catalog-product' } as StoreProductEntity;
  const product = { uuid: 'catalog-product', variants: [{ uuid: 'existing' }, { uuid: 'new' }] } as ProductEntity;
  const productService = { findByUuid: vi.fn().mockResolvedValue(product) } as unknown as ProductServiceInterface;
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

  const categories = { load: vi.fn().mockResolvedValue(undefined) };
  return {
    categories,
    controller: new StoreModifyController(
      storeService,
      navigateService,
      revalidateService,
      navigationBlocker,
      categories as unknown as CategoryListControllerInterface,
      productService,
    ),
    navigateService,
    result,
    revalidateService,
    storeService,
    navigationBlocker,
    product,
    productService,
  };
};

const payload: StoreModifyActionPayload = {
  shopUuid: 'shop',
  categoryUuids: ['leaf-one', 'leaf-two'],
  product: { uuid: 'product' },
  showing: true,
  offers: [
    {
      variantUuid: 'variant',
      records: [{ currentPrice: { value: '100.00', currencyCode: 'RUB' }, article: '', clarifications: [] }],
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
  it('не отправляет команду создания без выбранного объекта товара', async () => {
    const fixture = createController();

    await expect(fixture.controller.action(actionArgs({ ...payload, product: null }))).rejects.toThrow(
      'Не выбран товар.',
    );
    expect(fixture.storeService.create).not.toHaveBeenCalled();
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
  });

  it('не загружает складскую позицию для create frame', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {},
        signal: new AbortController().signal,
      }),
    ).resolves.toBeUndefined();

    expect(fixture.storeService.findByUuid).not.toHaveBeenCalled();
    expect(fixture.categories.load).not.toHaveBeenCalled();
    expect(fixture.productService.findByUuid).not.toHaveBeenCalled();
  });

  it('загружает складскую позицию по frame props', async () => {
    const fixture = createController();
    vi.mocked(fixture.storeService.findByUuid).mockResolvedValue(fixture.result);

    await expect(
      fixture.controller.loader({
        params: { uuid: fixture.result.uuid },
        signal: new AbortController().signal,
      }),
    ).resolves.toEqual({ storeProduct: fixture.result, product: fixture.product });

    expect(fixture.storeService.findByUuid).toHaveBeenCalledWith(fixture.result.uuid);
    expect(fixture.categories.load).toHaveBeenCalledWith(fixture.result.shopUuid);
    expect(fixture.productService.findByUuid).toHaveBeenCalledWith(fixture.result.productUuid);
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
      shopUuid: payload.shopUuid,
      productUuid: payload.product?.uuid,
      showing: true,
      categoryUuids: payload.categoryUuids,
      offers: [
        {
          ...payload.offers[0],
          records: [
            {
              uuid: undefined,
              article: undefined,
              order: 0,
              currentPrice: payload.offers[0].records![0].currentPrice,
              clarifications: [],
            },
          ],
        },
      ],
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
      uuid,
      expectedVersion: 5,
      showing: true,
      categoryUuids: payload.categoryUuids,
      offers: [
        {
          ...payload.offers[0],
          records: [
            {
              uuid: undefined,
              article: undefined,
              order: 0,
              currentPrice: payload.offers[0].records![0].currentPrice,
              clarifications: [],
            },
          ],
        },
      ],
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
              {
                currentPrice: { value: '100.00', currencyCode: 'RUB' },
                article: ' S-01 ',
                clarifications: [{ value: ' S евростандарт ' }],
              },
              { currentPrice: { value: '200.00', currencyCode: 'RUB' }, article: '', clarifications: [] },
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
              {
                currentPrice: { value: '100.00', currencyCode: 'RUB' },
                article: 'S-01',
                uuid: undefined,
                order: 0,
                clarifications: [{ value: 'S евростандарт' }],
              },
              {
                currentPrice: { value: '200.00', currencyCode: 'RUB' },
                article: undefined,
                uuid: undefined,
                order: 1,
                clarifications: [],
              },
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
              records: [
                {
                  currentPrice: { value: '100.00', currencyCode: 'RUB' },
                  uuid: 'record-uuid',
                  article: 'S-02',
                  clarifications: [],
                },
              ],
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
            records: [
              {
                currentPrice: { value: '100.00', currencyCode: 'RUB' },
                uuid: 'record-uuid',
                article: 'S-02',
                order: 0,
                clarifications: [],
              },
            ],
          }),
        ],
      }),
    );
  });

  it('передает порядок формы вместе с неизменными UUID учетных записей', async () => {
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
              records: [
                {
                  currentPrice: { value: '100.00', currencyCode: 'RUB' },
                  uuid: 'small-uuid',
                  article: 'S',
                  clarifications: [{ value: 'S' }],
                },
                {
                  currentPrice: { value: '100.00', currencyCode: 'RUB' },
                  uuid: 'medium-uuid',
                  article: 'M',
                  clarifications: [{ value: 'M' }],
                },
                {
                  currentPrice: { value: '100.00', currencyCode: 'RUB' },
                  uuid: 'large-uuid',
                  article: 'L',
                  clarifications: [{ value: 'L' }],
                },
              ],
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
            records: [
              expect.objectContaining({ uuid: 'small-uuid', order: 0 }),
              expect.objectContaining({ uuid: 'medium-uuid', order: 1 }),
              expect.objectContaining({ uuid: 'large-uuid', order: 2 }),
            ],
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
