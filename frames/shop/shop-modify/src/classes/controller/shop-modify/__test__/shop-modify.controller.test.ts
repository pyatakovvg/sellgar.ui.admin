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
  const navigateService = { to: vi.fn() } as unknown as NavigateServiceInterface;

  return {
    controller: new ShopModifyController(shopService, navigateService),
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

  it('не отправляет обновление без UUID маршрута', async () => {
    const fixture = createFixture();

    await expect(fixture.controller.action({ ...createActionArgs(), params: {} })).rejects.toThrow(
      'Не указан uuid магазина',
    );

    expect(fixture.shopService.update).not.toHaveBeenCalled();
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
  });
});
