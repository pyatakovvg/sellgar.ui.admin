import { UnitEntity, UnitResultEntity, type UnitServiceInterface, type CreateUnitInput } from '@library/domain';
import { UnitReviewRoute } from '@library/route-tokens';
import type { NavigateServiceInterface, NavigationBlockerServiceInterface } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { describe, expect, it, vi } from 'vitest';
import { UnitModifyController } from '../unit-modify.controller.ts';

const createController = () => {
  const unit = plainToInstance(UnitEntity, {
    code: 'unit',
    name: 'Размерность',
    symbol: 'ед',
    description: 'Описание\nРазмерность',
    version: 3,
    createdAt: '2026-10-11T00:00:00.000Z',
    updatedAt: '2026-10-11T00:00:00.000Z',
  });
  const list = plainToInstance(UnitResultEntity, { items: [unit], total: 1, limit: 50, offset: 0 });
  const unitService = {
    create: vi.fn<UnitServiceInterface['create']>().mockResolvedValue(unit),
    findByCode: vi.fn<UnitServiceInterface['findByCode']>().mockResolvedValue(unit),
    update: vi.fn<UnitServiceInterface['update']>().mockResolvedValue(unit),
  };
  const navigateService = { close: vi.fn(), to: vi.fn() };
  const navigationBlocker = {
    allow: vi.fn(async (operation: () => unknown) => operation()),
  };

  return {
    unit,
    list,
    unitService,
    navigateService,
    navigationBlocker,
    controller: new UnitModifyController(
      unitService as unknown as UnitServiceInterface,
      navigateService as unknown as NavigateServiceInterface,
      navigationBlocker as unknown as NavigationBlockerServiceInterface,
    ),
  };
};

const signal = new AbortController().signal;
const createPayload = (): CreateUnitInput => ({
  code: 'unit',
  name: 'Размерность',
  symbol: 'ед',
  description: 'Описание\nРазмерность',
});

describe('UnitModifyController', () => {
  it('не загружает размерность при создании', async () => {
    const fixture = createController();
    await expect(fixture.controller.loader({ params: {}, signal })).resolves.toBeUndefined();
    expect(fixture.unitService.findByCode).not.toHaveBeenCalled();
  });

  it('загружает размерность по коду маршрута', async () => {
    const fixture = createController();
    await expect(fixture.controller.loader({ params: { code: 'unit' }, signal })).resolves.toBe(fixture.unit);
    expect(fixture.unitService.findByCode).toHaveBeenCalledWith('unit');
  });

  it('после создания добавляет сущность в список и открывает просмотр результата', async () => {
    const fixture = createController();
    const payload = createPayload();
    const created = plainToInstance(UnitEntity, { ...fixture.unit, code: 'created-unit' });
    fixture.unitService.create.mockResolvedValue(created);
    await fixture.controller.action({ params: {}, payload, signal });
    expect(fixture.unitService.create).toHaveBeenCalledWith(payload);
    expect(fixture.list.items).toContain(created);
    expect(fixture.list.items).toHaveLength(2);
    expect(fixture.navigateService.to).toHaveBeenCalledWith(UnitReviewRoute, {
      params: { code: 'created-unit' },
      revalidate: false,
    });
    expect(fixture.navigateService.close).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).toHaveBeenCalledOnce();
  });

  it('обновляет загруженные экземпляры по коду маршрута и открывает просмотр без ревалидации', async () => {
    const fixture = createController();
    const payload = { ...createPayload(), code: 'ignored-form-code', version: 3 };
    const listed = fixture.list.items[0];
    const saved = plainToInstance(UnitEntity, {
      ...fixture.unit,
      name: 'Обновлённая размерность',
      symbol: 'шт',
      version: 4,
    });
    fixture.unitService.update.mockResolvedValue(saved);
    await fixture.controller.action({ params: { code: 'unit' }, payload, signal });
    expect(fixture.unitService.update).toHaveBeenCalledWith('unit', {
      version: 3,
      name: payload.name,
      symbol: payload.symbol,
      description: payload.description,
    });
    expect(fixture.navigateService.to).toHaveBeenCalledWith(UnitReviewRoute, {
      params: { code: 'unit' },
      revalidate: false,
    });
    expect(fixture.list.items[0]).toBe(listed);
    expect(listed.name).toBe('Обновлённая размерность');
    expect(listed.version).toBe(4);
    expect(listed.symbol).toBe('шт');
    expect(fixture.unit.name).toBe('Обновлённая размерность');
    expect(fixture.unitService.findByCode).not.toHaveBeenCalled();
    expect(fixture.unitService.create).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).toHaveBeenCalledOnce();
  });

  it('не сохраняет редактирование без версии', async () => {
    const fixture = createController();
    await expect(
      fixture.controller.action({ params: { code: 'unit' }, payload: createPayload(), signal }),
    ).rejects.toThrow('Не передана версия размерности');
    expect(fixture.unitService.update).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
  });

  it('сохраняет блокировку до успешного ответа сервиса', async () => {
    const fixture = createController();
    let resolveSave: (unit: UnitEntity) => void = () => {};
    fixture.unitService.update.mockReturnValue(
      new Promise((resolve) => {
        resolveSave = resolve;
      }),
    );

    const action = fixture.controller.action({
      params: { code: 'unit' },
      payload: { ...createPayload(), version: 3 },
      signal,
    });

    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
    expect(fixture.navigateService.to).not.toHaveBeenCalled();

    resolveSave(fixture.unit);
    await action;
    expect(fixture.navigationBlocker.allow).toHaveBeenCalledOnce();
    expect(fixture.navigateService.to).toHaveBeenCalledOnce();
  });

  it('не переходит в просмотр при ошибке сохранения', async () => {
    const fixture = createController();
    fixture.unitService.create.mockRejectedValue(new Error('Сбой сохранения'));
    await expect(fixture.controller.action({ params: {}, payload: createPayload(), signal })).rejects.toThrow(
      'Сбой сохранения',
    );
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
    expect(fixture.list.items).toHaveLength(1);
    expect(fixture.list.items[0].name).toBe('Размерность');
    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
  });

  it('не меняет загруженные экземпляры при ошибке обновления', async () => {
    const fixture = createController();
    fixture.unitService.update.mockRejectedValue(new Error('Сбой обновления'));

    await expect(
      fixture.controller.action({ params: { code: 'unit' }, payload: { ...createPayload(), version: 3 }, signal }),
    ).rejects.toThrow('Сбой обновления');
    expect(fixture.list.items[0].version).toBe(3);
    expect(fixture.list.items[0].name).toBe('Размерность');
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
  });

  it('возвращается в просмотр при отмене редактирования', async () => {
    const fixture = createController();
    await fixture.controller.close('unit');
    expect(fixture.navigateService.to).toHaveBeenCalledWith(UnitReviewRoute, {
      params: { code: 'unit' },
      revalidate: false,
    });
    expect(fixture.navigateService.close).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
  });

  it('закрывает frame при отмене создания', async () => {
    const fixture = createController();
    await fixture.controller.close();
    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
  });
});
