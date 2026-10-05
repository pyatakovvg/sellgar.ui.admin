import type { ShopEntity, ShopServiceInterface } from '@library/domain';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { ShopModifyController } from '../shop-modify.controller.ts';
import { ShopFormMapper } from '../mapper/shop-form.mapper.ts';

const createController = () => {
  const shopService = {
    create: vi.fn(),
    findByUuid: vi.fn(),
    update: vi.fn(),
  } as unknown as ShopServiceInterface;
  const navigateService = { close: vi.fn(), to: vi.fn() } as unknown as NavigateServiceInterface;

  return {
    controller: new ShopModifyController(shopService, navigateService),
    navigateService,
    shopService,
  };
};

describe('ShopModifyController', () => {
  it('не загружает магазин для create frame', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {},
        request: new Request('http://localhost/shops'),
        signal: new AbortController().signal,
      }),
    ).resolves.toBeUndefined();

    expect(fixture.shopService.findByUuid).not.toHaveBeenCalled();
  });

  it('загружает магазин по frame props', async () => {
    const fixture = createController();
    const shop = { uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f' } as ShopEntity;
    vi.mocked(fixture.shopService.findByUuid).mockResolvedValue(shop);

    await expect(
      fixture.controller.loader({
        params: { uuid: shop.uuid },
        request: new Request('http://localhost/shops'),
        signal: new AbortController().signal,
      }),
    ).resolves.toEqual({ shop });

    expect(fixture.shopService.findByUuid).toHaveBeenCalledWith(shop.uuid);
  });

  it('закрывает frame по пользовательской команде', async () => {
    const fixture = createController();

    await fixture.controller.close();

    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
  });

  it('создаёт магазин и завершает frame workflow', async () => {
    const fixture = createController();
    const payload = { ...ShopFormMapper.fromEntity(), name: 'Основной магазин' };

    await fixture.controller.action({
      payload,
      params: {},
      request: new Request('http://localhost/shops', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.shopService.create).toHaveBeenCalledWith(expect.objectContaining({ name: payload.name }));
    expect(fixture.navigateService.to).toHaveBeenCalledOnce();
  });

  it('определяет update по uuid route и передаёт версию', async () => {
    const fixture = createController();
    const uuid = 'c7fd8d23-c843-4d47-8d23-33698a5f034f';
    const payload = {
      ...ShopFormMapper.fromEntity(),
      version: 3,
      name: 'Обновлённый магазин',
    };

    await fixture.controller.action({
      payload,
      params: { uuid },
      request: new Request('http://localhost/shops', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.shopService.update).toHaveBeenCalledWith(
      uuid,
      expect.objectContaining({ version: 3, name: payload.name }),
    );
    expect(fixture.shopService.create).not.toHaveBeenCalled();
  });
});
