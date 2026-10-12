import type { BrandEntity, BrandServiceInterface } from '@library/domain';
import { BrandModifyRoute } from '@library/route-tokens';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';
import { BrandReviewController } from '../brand-review.controller.ts';

const createController = () => {
  const brandService = { findByCode: vi.fn<BrandServiceInterface['findByCode']>() };
  const navigateService = { to: vi.fn() };
  return {
    brandService,
    navigateService,
    controller: new BrandReviewController(
      brandService as unknown as BrandServiceInterface,
      navigateService as unknown as NavigateServiceInterface,
    ),
  };
};

describe('BrandReviewController', () => {
  it('загружает бренд по коду маршрута', async () => {
    const fixture = createController();
    const brand = { code: 'brand', name: 'Бренд' } as BrandEntity;
    fixture.brandService.findByCode.mockResolvedValue(brand);
    await expect(
      fixture.controller.loader({ params: { code: 'brand' }, signal: new AbortController().signal }),
    ).resolves.toBe(brand);
    expect(fixture.brandService.findByCode).toHaveBeenCalledWith('brand');
  });

  it('не вызывает сервис при пустом коде', async () => {
    const fixture = createController();
    await expect(
      fixture.controller.loader({ params: { code: '' }, signal: new AbortController().signal }),
    ).rejects.toThrow('Не указан код бренда');
    expect(fixture.brandService.findByCode).not.toHaveBeenCalled();
  });

  it('открывает редактирование выбранного бренда', async () => {
    const fixture = createController();
    await fixture.controller.toModify('brand');
    expect(fixture.navigateService.to).toHaveBeenCalledWith(BrandModifyRoute, { params: { code: 'brand' } });
  });
});
