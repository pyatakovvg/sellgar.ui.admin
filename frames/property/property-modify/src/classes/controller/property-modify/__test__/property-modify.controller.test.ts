import {
  PropertyEntity,
  PropertyResultEntity,
  type PropertyServiceInterface,
  type CreatePropertyInput,
} from '@library/domain';
import { PropertyReviewRoute } from '@library/route-tokens';
import type { NavigateServiceInterface, NavigationBlockerServiceInterface } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { describe, expect, it, vi } from 'vitest';
import { PropertyModifyController } from '../property-modify.controller.ts';
import { PropertySaveService } from '../../../service/property-save/property-save.service.ts';

const createController = () => {
  const property = plainToInstance(PropertyEntity, {
    code: 'property',
    name: 'Свойство',
    kind: 'TEXT',
    unitCode: null,
    options: [],
    description: 'Описание\nСвойство',
    version: 3,
    createdAt: '2026-10-11T00:00:00.000Z',
    updatedAt: '2026-10-11T00:00:00.000Z',
  });
  const list = plainToInstance(PropertyResultEntity, { items: [property], total: 1, limit: 50, offset: 0 });
  const propertyService = {
    create: vi.fn<PropertyServiceInterface['create']>().mockResolvedValue(property),
    findByCode: vi.fn<PropertyServiceInterface['findByCode']>().mockResolvedValue(property),
    update: vi.fn<PropertyServiceInterface['update']>().mockResolvedValue(property),
  };
  const navigateService = { close: vi.fn(), to: vi.fn() };
  const navigationBlocker = {
    allow: vi.fn(async (operation: () => unknown) => operation()),
  };

  return {
    property,
    list,
    propertyService,
    navigateService,
    navigationBlocker,
    controller: new PropertyModifyController(
      propertyService as unknown as PropertyServiceInterface,
      navigateService as unknown as NavigateServiceInterface,
      new PropertySaveService(propertyService as unknown as PropertyServiceInterface),
      navigationBlocker as unknown as NavigationBlockerServiceInterface,
    ),
  };
};

const signal = new AbortController().signal;
const createPayload = (): CreatePropertyInput => ({
  code: 'property',
  name: 'Свойство',
  kind: 'TEXT',
  unitCode: null,
  options: [],
  description: 'Описание\nСвойство',
});

describe('PropertyModifyController', () => {
  it('не загружает свойство при создании', async () => {
    const fixture = createController();
    await expect(fixture.controller.loader({ params: {}, signal })).resolves.toBeUndefined();
    expect(fixture.propertyService.findByCode).not.toHaveBeenCalled();
  });

  it('загружает свойство по коду маршрута', async () => {
    const fixture = createController();
    await expect(fixture.controller.loader({ params: { code: 'property' }, signal })).resolves.toBe(fixture.property);
    expect(fixture.propertyService.findByCode).toHaveBeenCalledWith('property');
  });

  it('после создания добавляет сущность в список и открывает просмотр результата', async () => {
    const fixture = createController();
    const payload = createPayload();
    const created = plainToInstance(PropertyEntity, { ...fixture.property, code: 'created-property' });
    fixture.propertyService.create.mockResolvedValue(created);
    await fixture.controller.action({ params: {}, payload, signal });
    expect(fixture.propertyService.create).toHaveBeenCalledWith(payload);
    expect(fixture.list.items).toContain(created);
    expect(fixture.list.items).toHaveLength(2);
    expect(fixture.navigateService.to).toHaveBeenCalledWith(PropertyReviewRoute, {
      params: { code: 'created-property' },
      revalidate: false,
    });
    expect(fixture.navigateService.close).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).toHaveBeenCalledOnce();
  });

  it('обновляет загруженные экземпляры по коду маршрута и открывает просмотр без ревалидации', async () => {
    const fixture = createController();
    const payload = { ...createPayload(), code: 'ignored-form-code', version: 3 };
    const listed = fixture.list.items[0];
    const saved = plainToInstance(PropertyEntity, {
      ...fixture.property,
      name: 'Обновлённое свойство',

      version: 4,
    });
    fixture.propertyService.update.mockResolvedValue(saved);
    await fixture.controller.action({ params: { code: 'property' }, payload, signal });
    expect(fixture.propertyService.update).toHaveBeenCalledWith('property', {
      version: 3,
      name: payload.name,
      description: payload.description,
    });
    expect(fixture.navigateService.to).toHaveBeenCalledWith(PropertyReviewRoute, {
      params: { code: 'property' },
      revalidate: false,
    });
    expect(fixture.list.items[0]).toBe(listed);
    expect(listed.name).toBe('Обновлённое свойство');
    expect(listed.version).toBe(4);
    expect(fixture.property.name).toBe('Обновлённое свойство');
    expect(fixture.propertyService.findByCode).not.toHaveBeenCalled();
    expect(fixture.propertyService.create).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).toHaveBeenCalledOnce();
  });

  it('не сохраняет редактирование без версии', async () => {
    const fixture = createController();
    await expect(
      fixture.controller.action({ params: { code: 'property' }, payload: createPayload(), signal }),
    ).rejects.toThrow('Не передана версия свойства');
    expect(fixture.propertyService.update).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
  });

  it('сохраняет блокировку до успешного ответа сервиса', async () => {
    const fixture = createController();
    let resolveSave: (property: PropertyEntity) => void = () => {};
    fixture.propertyService.update.mockReturnValue(
      new Promise((resolve) => {
        resolveSave = resolve;
      }),
    );

    const action = fixture.controller.action({
      params: { code: 'property' },
      payload: { ...createPayload(), version: 3 },
      signal,
    });

    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
    expect(fixture.navigateService.to).not.toHaveBeenCalled();

    resolveSave(fixture.property);
    await action;
    expect(fixture.navigationBlocker.allow).toHaveBeenCalledOnce();
    expect(fixture.navigateService.to).toHaveBeenCalledOnce();
  });

  it('не переходит в просмотр при ошибке сохранения', async () => {
    const fixture = createController();
    fixture.propertyService.create.mockRejectedValue(new Error('Сбой сохранения'));
    await expect(fixture.controller.action({ params: {}, payload: createPayload(), signal })).rejects.toThrow(
      'Сбой сохранения',
    );
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
    expect(fixture.list.items).toHaveLength(1);
    expect(fixture.list.items[0].name).toBe('Свойство');
    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
  });

  it('не меняет загруженные экземпляры при ошибке обновления', async () => {
    const fixture = createController();
    fixture.propertyService.update.mockRejectedValue(new Error('Сбой обновления'));

    await expect(
      fixture.controller.action({ params: { code: 'property' }, payload: { ...createPayload(), version: 3 }, signal }),
    ).rejects.toThrow('Сбой обновления');
    expect(fixture.list.items[0].version).toBe(3);
    expect(fixture.list.items[0].name).toBe('Свойство');
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
  });

  it('возвращается в просмотр при отмене редактирования', async () => {
    const fixture = createController();
    await fixture.controller.close('property');
    expect(fixture.navigateService.to).toHaveBeenCalledWith(PropertyReviewRoute, {
      params: { code: 'property' },
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
