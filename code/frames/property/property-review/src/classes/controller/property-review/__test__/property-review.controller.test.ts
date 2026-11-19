import type { PropertyEntity, PropertyServiceInterface } from '@library/domain';
import { PropertyModifyRoute } from '@library/route-tokens';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';
import { PropertyReviewController } from '../property-review.controller.ts';

const createController = () => {
  const propertyService = { findByCode: vi.fn<PropertyServiceInterface['findByCode']>() };
  const navigateService = { to: vi.fn() };
  return {
    propertyService,
    navigateService,
    controller: new PropertyReviewController(
      propertyService as unknown as PropertyServiceInterface,
      navigateService as unknown as NavigateServiceInterface,
    ),
  };
};

describe('PropertyReviewController', () => {
  it('загружает свойство по коду маршрута', async () => {
    const fixture = createController();
    const property = { code: 'property', name: 'Свойство' } as PropertyEntity;
    fixture.propertyService.findByCode.mockResolvedValue(property);
    await expect(
      fixture.controller.loader({ params: { code: 'property' }, signal: new AbortController().signal }),
    ).resolves.toBe(property);
    expect(fixture.propertyService.findByCode).toHaveBeenCalledWith('property');
  });

  it('не вызывает сервис при пустом коде', async () => {
    const fixture = createController();
    await expect(
      fixture.controller.loader({ params: { code: '' }, signal: new AbortController().signal }),
    ).rejects.toThrow('Не указан код свойства');
    expect(fixture.propertyService.findByCode).not.toHaveBeenCalled();
  });

  it('открывает редактирование выбранного свойства', async () => {
    const fixture = createController();
    await fixture.controller.toModify('property');
    expect(fixture.navigateService.to).toHaveBeenCalledWith(PropertyModifyRoute, { params: { code: 'property' } });
  });
});
