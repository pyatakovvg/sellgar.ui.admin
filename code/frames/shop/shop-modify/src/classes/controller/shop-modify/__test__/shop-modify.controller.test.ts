import type { ShopServiceInterface } from '@library/domain';
import { ShopReviewRoute } from '@library/route-tokens';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { ShopFormMapper } from '../mapper/shop-form.mapper.ts';
import { ShopModifyController } from '../shop-modify.controller.ts';

const createFixture = () => {
  const shopService = {
    findAll: vi.fn(),
    findByUuid: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  } satisfies ShopServiceInterface;
  const navigateService = { to: vi.fn(), close: vi.fn() };

  return {
    controller: new ShopModifyController(shopService, navigateService as unknown as NavigateServiceInterface),
    shopService,
    navigateService,
  };
};

const createActionArgs = () => ({
  params: { uuid: 'ddb201c7-f373-4393-8d45-f6b067c5490a' },
  payload: { ...ShopFormMapper.fromEntity(), version: 2, name: 'Магазин' },
  signal: new AbortController().signal,
});

describe('ShopModifyController', () => {
  it('открывает создание без загрузки существующего магазина', async () => {
    const fixture = createFixture();

    await expect(
      fixture.controller.loader({ params: {}, signal: new AbortController().signal }),
    ).resolves.toBeUndefined();

    expect(fixture.shopService.findByUuid).not.toHaveBeenCalled();
  });

  it('обновляет магазин и открывает просмотр с UUID маршрута, которого нет в форме', async () => {
    const fixture = createFixture();
    const args = createActionArgs();

    await fixture.controller.action(args);

    expect(fixture.shopService.update).toHaveBeenCalledWith(
      args.params.uuid,
      ShopFormMapper.toUpdateInput(args.payload),
    );
    expect(fixture.navigateService.to).toHaveBeenCalledWith(ShopReviewRoute, {
      params: { uuid: args.params.uuid },
      revalidate: true,
    });
  });

  it('сохраняет форму открытой, если обновление завершилось ошибкой', async () => {
    const fixture = createFixture();
    fixture.shopService.update.mockRejectedValue(new Error('Ошибка обновления'));

    await expect(fixture.controller.action(createActionArgs())).rejects.toThrow('Ошибка обновления');

    expect(fixture.navigateService.to).not.toHaveBeenCalled();
  });

  it('создаёт магазин и открывает просмотр созданного магазина', async () => {
    const fixture = createFixture();
    const args = { ...createActionArgs(), params: {} };
    const shop = {
      uuid: 'ddb201c7-f373-4393-8d45-f6b067c5490a',
      version: 1,
      name: args.payload.name,
      legalDetails: null,
      contacts: [],
      addresses: [],
      createdAt: '2026-11-19T00:00:00Z',
      updatedAt: '2026-11-19T00:00:00Z',
    };
    fixture.shopService.create.mockResolvedValue(shop);

    await fixture.controller.action(args);

    expect(fixture.shopService.create).toHaveBeenCalledWith(ShopFormMapper.toCreateInput(args.payload));
    expect(fixture.shopService.update).not.toHaveBeenCalled();
    expect(fixture.navigateService.to).toHaveBeenCalledWith(ShopReviewRoute, {
      params: { uuid: shop.uuid },
      revalidate: true,
    });
  });

  it('сохраняет форму открытой, если создание завершилось ошибкой', async () => {
    const fixture = createFixture();
    fixture.shopService.create.mockRejectedValue(new Error('Ошибка создания'));

    await expect(fixture.controller.action({ ...createActionArgs(), params: {} })).rejects.toThrow('Ошибка создания');

    expect(fixture.navigateService.to).not.toHaveBeenCalled();
  });

  it('закрывает создание при отмене без перехода к несуществующему магазину', async () => {
    const fixture = createFixture();

    await fixture.controller.toReview();

    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
  });
});
