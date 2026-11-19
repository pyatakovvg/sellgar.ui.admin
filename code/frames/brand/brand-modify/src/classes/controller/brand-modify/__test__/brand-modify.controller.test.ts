import { BrandEntity, BrandResultEntity, type BrandServiceInterface, type CreateBrandInput } from '@library/domain';
import { BrandReviewRoute } from '@library/route-tokens';
import type { NavigateServiceInterface, NavigationBlockerServiceInterface } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';
import { describe, expect, it, vi } from 'vitest';
import { BrandModifyController } from '../brand-modify.controller.ts';

const createController = () => {
  const brand = plainToInstance(BrandEntity, {
    code: 'brand',
    name: 'Бренд',
    description: 'Описание',
    version: 3,
    images: [],
    createdAt: '2026-10-11T00:00:00.000Z',
    updatedAt: '2026-10-11T00:00:00.000Z',
  });
  const list = plainToInstance(BrandResultEntity, { items: [brand], total: 1, limit: 50, offset: 0 });
  const brandService = {
    create: vi.fn<BrandServiceInterface['create']>().mockResolvedValue(brand),
    findByCode: vi.fn<BrandServiceInterface['findByCode']>().mockResolvedValue(brand),
    update: vi.fn<BrandServiceInterface['update']>().mockResolvedValue(brand),
  };
  const navigateService = { close: vi.fn(), to: vi.fn() };
  const navigationBlocker = {
    allow: vi.fn(async (operation: () => unknown) => operation()),
  };

  return {
    brand,
    list,
    brandService,
    navigateService,
    navigationBlocker,
    controller: new BrandModifyController(
      brandService as unknown as BrandServiceInterface,
      navigateService as unknown as NavigateServiceInterface,
      navigationBlocker as unknown as NavigationBlockerServiceInterface,
    ),
  };
};

const signal = new AbortController().signal;
const createPayload = (): CreateBrandInput => ({
  code: 'brand',
  name: 'Бренд',
  description: 'Описание',
  images: [{ file: new File(['image'], 'brand.png', { type: 'image/png' }), sortOrder: 0 }],
});

describe('BrandModifyController', () => {
  it('не загружает бренд при создании', async () => {
    const fixture = createController();
    await expect(fixture.controller.loader({ params: {}, signal })).resolves.toBeUndefined();
    expect(fixture.brandService.findByCode).not.toHaveBeenCalled();
  });

  it('загружает бренд по коду маршрута', async () => {
    const fixture = createController();
    await expect(fixture.controller.loader({ params: { code: 'brand' }, signal })).resolves.toBe(fixture.brand);
    expect(fixture.brandService.findByCode).toHaveBeenCalledWith('brand');
  });

  it('после создания передаёт File без преобразования и открывает просмотр результата', async () => {
    const fixture = createController();
    const payload = createPayload();
    const created = plainToInstance(BrandEntity, { ...fixture.brand, code: 'created-brand' });
    fixture.brandService.create.mockResolvedValue(created);
    await fixture.controller.action({ params: {}, payload, signal });
    expect(fixture.brandService.create).toHaveBeenCalledWith(payload);
    expect(fixture.brandService.create.mock.calls[0]?.[0].images?.[0].file).toBe(payload.images?.[0].file);
    expect(fixture.list.items).toContain(created);
    expect(fixture.list.items).toHaveLength(2);
    expect(fixture.navigateService.to).toHaveBeenCalledWith(BrandReviewRoute, {
      params: { code: 'created-brand' },
      revalidate: false,
    });
    expect(fixture.navigateService.close).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).toHaveBeenCalledOnce();
  });

  it('обновляет загруженные экземпляры по коду маршрута и открывает просмотр без ревалидации', async () => {
    const fixture = createController();
    const payload = { ...createPayload(), code: 'ignored-form-code', version: 3 };
    const listed = fixture.list.items[0];
    const saved = plainToInstance(BrandEntity, { ...fixture.brand, name: 'Обновлённый бренд', version: 4 });
    fixture.brandService.update.mockResolvedValue(saved);
    await fixture.controller.action({ params: { code: 'brand' }, payload, signal });
    expect(fixture.brandService.update).toHaveBeenCalledWith('brand', {
      version: 3,
      name: payload.name,
      description: payload.description,
      images: payload.images,
    });
    expect(fixture.navigateService.to).toHaveBeenCalledWith(BrandReviewRoute, {
      params: { code: 'brand' },
      revalidate: false,
    });
    expect(fixture.list.items[0]).toBe(listed);
    expect(listed.name).toBe('Обновлённый бренд');
    expect(listed.version).toBe(4);
    expect(fixture.brand.name).toBe('Обновлённый бренд');
    expect(fixture.brandService.findByCode).not.toHaveBeenCalled();
    expect(fixture.brandService.create).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).toHaveBeenCalledOnce();
  });

  it('не сохраняет редактирование без версии', async () => {
    const fixture = createController();
    await expect(
      fixture.controller.action({ params: { code: 'brand' }, payload: createPayload(), signal }),
    ).rejects.toThrow('Не передана версия бренда');
    expect(fixture.brandService.update).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
  });

  it('сохраняет блокировку до успешного ответа сервиса', async () => {
    const fixture = createController();
    let resolveSave: (brand: BrandEntity) => void = () => {};
    fixture.brandService.update.mockReturnValue(
      new Promise((resolve) => {
        resolveSave = resolve;
      }),
    );

    const action = fixture.controller.action({
      params: { code: 'brand' },
      payload: { ...createPayload(), version: 3 },
      signal,
    });

    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
    expect(fixture.navigateService.to).not.toHaveBeenCalled();

    resolveSave(fixture.brand);
    await action;
    expect(fixture.navigationBlocker.allow).toHaveBeenCalledOnce();
    expect(fixture.navigateService.to).toHaveBeenCalledOnce();
  });

  it('не переходит в просмотр при ошибке сохранения', async () => {
    const fixture = createController();
    fixture.brandService.create.mockRejectedValue(new Error('Сбой сохранения'));
    await expect(fixture.controller.action({ params: {}, payload: createPayload(), signal })).rejects.toThrow(
      'Сбой сохранения',
    );
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
    expect(fixture.list.items).toHaveLength(1);
    expect(fixture.list.items[0].name).toBe('Бренд');
    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
  });

  it('не меняет загруженные экземпляры при ошибке обновления', async () => {
    const fixture = createController();
    fixture.brandService.update.mockRejectedValue(new Error('Сбой обновления'));

    await expect(
      fixture.controller.action({ params: { code: 'brand' }, payload: { ...createPayload(), version: 3 }, signal }),
    ).rejects.toThrow('Сбой обновления');
    expect(fixture.list.items[0].version).toBe(3);
    expect(fixture.list.items[0].name).toBe('Бренд');
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
    expect(fixture.navigationBlocker.allow).not.toHaveBeenCalled();
  });

  it('возвращается в просмотр при отмене редактирования', async () => {
    const fixture = createController();
    await fixture.controller.close('brand');
    expect(fixture.navigateService.to).toHaveBeenCalledWith(BrandReviewRoute, {
      params: { code: 'brand' },
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
