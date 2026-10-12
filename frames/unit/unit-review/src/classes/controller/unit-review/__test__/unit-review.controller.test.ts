import type { UnitEntity, UnitServiceInterface } from '@library/domain';
import { UnitModifyRoute } from '@library/route-tokens';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';
import { UnitReviewController } from '../unit-review.controller.ts';

const createController = () => {
  const unitService = { findByCode: vi.fn<UnitServiceInterface['findByCode']>() };
  const navigateService = { to: vi.fn() };
  return {
    unitService,
    navigateService,
    controller: new UnitReviewController(
      unitService as unknown as UnitServiceInterface,
      navigateService as unknown as NavigateServiceInterface,
    ),
  };
};

describe('UnitReviewController', () => {
  it('загружает размерность по коду маршрута', async () => {
    const fixture = createController();
    const unit = { code: 'unit', name: 'Размерность' } as UnitEntity;
    fixture.unitService.findByCode.mockResolvedValue(unit);
    await expect(
      fixture.controller.loader({ params: { code: 'unit' }, signal: new AbortController().signal }),
    ).resolves.toBe(unit);
    expect(fixture.unitService.findByCode).toHaveBeenCalledWith('unit');
  });

  it('не вызывает сервис при пустом коде', async () => {
    const fixture = createController();
    await expect(
      fixture.controller.loader({ params: { code: '' }, signal: new AbortController().signal }),
    ).rejects.toThrow('Не указан код размерности');
    expect(fixture.unitService.findByCode).not.toHaveBeenCalled();
  });

  it('открывает редактирование выбранной размерности', async () => {
    const fixture = createController();
    await fixture.controller.toModify('unit');
    expect(fixture.navigateService.to).toHaveBeenCalledWith(UnitModifyRoute, { params: { code: 'unit' } });
  });
});
