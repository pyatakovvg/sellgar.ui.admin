import type { StoreProductEntity, StoreServiceInterface } from '@library/domain';
import { StoreInventoryRoute, StoreModifyRoute } from '@library/route-tokens';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';
import { StoreReviewController } from '../store-review.controller.ts';

const createController = () => {
  const storeService = { findByUuid: vi.fn<StoreServiceInterface['findByUuid']>() };
  const navigateService = { to: vi.fn() };
  return {
    storeService,
    navigateService,
    controller: new StoreReviewController(
      storeService as unknown as StoreServiceInterface,
      navigateService as unknown as NavigateServiceInterface,
    ),
  };
};

describe('StoreReviewController', () => {
  it('загружает товар витрины по UUID маршрута', async () => {
    const fixture = createController();
    const product = { uuid: 'store' } as StoreProductEntity;
    fixture.storeService.findByUuid.mockResolvedValue(product);
    await expect(
      fixture.controller.loader({ params: { uuid: 'store' }, signal: new AbortController().signal }),
    ).resolves.toBe(product);
    expect(fixture.storeService.findByUuid).toHaveBeenCalledWith('store');
  });

  it('не вызывает сервис при пустом UUID', async () => {
    const fixture = createController();
    await expect(
      fixture.controller.loader({ params: { uuid: '' }, signal: new AbortController().signal }),
    ).rejects.toThrow('Не указан UUID товара витрины');
    expect(fixture.storeService.findByUuid).not.toHaveBeenCalled();
  });

  it('открывает редактирование выбранного стора', async () => {
    const fixture = createController();
    await fixture.controller.toModify('store');
    expect(fixture.navigateService.to).toHaveBeenCalledWith(StoreModifyRoute, { params: { uuid: 'store' } });
  });

  it('открывает остатки выбранной учетной записи в ее сторе', async () => {
    const fixture = createController();
    await fixture.controller.toInventory('store-uuid', 'selected-record-uuid');
    expect(fixture.navigateService.to).toHaveBeenCalledWith(StoreInventoryRoute, {
      params: { storeProductUuid: 'store-uuid', recordUuid: 'selected-record-uuid' },
    });
    expect(fixture.storeService.findByUuid).not.toHaveBeenCalled();
  });
});
