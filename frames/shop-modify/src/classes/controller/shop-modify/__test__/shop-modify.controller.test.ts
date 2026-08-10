import type { CreateShopInput, ShopEntity, ShopServiceInterface, UpdateShopInput } from '@library/domain';
import type { FrameServiceInterface, RevalidateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { ShopModifyController } from '../shop-modify.controller.ts';

const createController = () => {
  const shopService = {
    create: vi.fn(),
    findByUuid: vi.fn(),
    update: vi.fn(),
  } as unknown as ShopServiceInterface;
  const frameService = { close: vi.fn() } as unknown as FrameServiceInterface;
  const revalidateService = { revalidate: vi.fn() } as unknown as RevalidateServiceInterface;

  return {
    controller: new ShopModifyController(shopService, frameService, revalidateService),
    frameService,
    revalidateService,
    shopService,
  };
};

describe('ShopModifyController', () => {
  it('не загружает магазин для create frame', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {},
        props: {},
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
        params: {},
        props: { uuid: shop.uuid },
        request: new Request('http://localhost/shops'),
        signal: new AbortController().signal,
      }),
    ).resolves.toBe(shop);

    expect(fixture.shopService.findByUuid).toHaveBeenCalledWith(shop.uuid);
  });

  it('закрывает frame по пользовательской команде', async () => {
    const fixture = createController();

    await fixture.controller.close();

    expect(fixture.frameService.close).toHaveBeenCalledOnce();
  });

  it('создаёт магазин и завершает frame workflow', async () => {
    const fixture = createController();
    const payload: CreateShopInput = { name: 'Основной магазин' };

    await fixture.controller.action({
      params: {},
      payload,
      props: {},
      request: new Request('http://localhost/shops', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.shopService.create).toHaveBeenCalledWith(payload);
    expect(fixture.revalidateService.revalidate).toHaveBeenCalledOnce();
    expect(fixture.frameService.close).toHaveBeenCalledOnce();
  });

  it('определяет update по uuid в payload', async () => {
    const fixture = createController();
    const payload: UpdateShopInput = {
      uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f',
      name: 'Обновлённый магазин',
    };

    await fixture.controller.action({
      params: {},
      payload,
      props: { uuid: payload.uuid },
      request: new Request('http://localhost/shops', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.shopService.update).toHaveBeenCalledWith(payload.uuid, payload);
    expect(fixture.shopService.create).not.toHaveBeenCalled();
  });
});
