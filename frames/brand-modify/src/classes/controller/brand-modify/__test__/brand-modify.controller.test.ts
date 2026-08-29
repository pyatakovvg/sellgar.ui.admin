import type { BrandEntity, BrandServiceInterface, CreateBrandInput, UpdateBrandInput } from '@library/domain';
import type { RevalidateServiceInterface } from '@sellgar/app-v2';
import type { NavigateServiceInterface } from '@sellgar/app-v2';
import { describe, expect, it, vi } from 'vitest';

import { BrandModifyController } from '../brand-modify.controller.ts';

const createController = () => {
  const brandService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findByUuid: vi.fn(),
    update: vi.fn(),
  } as unknown as BrandServiceInterface;
  const navigateService = {
    close: vi.fn(),
  } as unknown as NavigateServiceInterface;
  const revalidateService = {
    revalidate: vi.fn(),
  } as unknown as RevalidateServiceInterface;

  return {
    brandService,
    controller: new BrandModifyController(brandService, navigateService, revalidateService),
    navigateService,
    revalidateService,
  };
};

const createPayload = (file: File): CreateBrandInput => ({
  code: 'brand',
  name: 'Бренд',
  description: 'Описание',
  image: { file, alt: null },
});

describe('BrandModifyController', () => {
  it('не загружает бренд для create frame', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {},
        params: {},
        request: new Request('http://localhost/brands'),
        signal: new AbortController().signal,
      }),
    ).resolves.toBeUndefined();

    expect(fixture.brandService.findByUuid).not.toHaveBeenCalled();
  });

  it('загружает бренд по frame props', async () => {
    const fixture = createController();
    const brand = { uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f' } as BrandEntity;
    vi.mocked(fixture.brandService.findByUuid).mockResolvedValue(brand);

    await expect(
      fixture.controller.loader({
        params: {},
        params: { uuid: brand.uuid },
        request: new Request('http://localhost/brands'),
        signal: new AbortController().signal,
      }),
    ).resolves.toBe(brand);

    expect(fixture.brandService.findByUuid).toHaveBeenCalledWith(brand.uuid);
  });

  it('закрывает frame по пользовательской команде', async () => {
    const fixture = createController();

    await fixture.controller.close();

    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
  });

  it('передаёт объект формы и File в create без преобразования', async () => {
    const fixture = createController();
    const file = new File(['image'], 'brand.png', { type: 'image/png' });
    const payload = createPayload(file);

    await fixture.controller.action({
      params: {},
      payload,
      params: {},
      request: new Request('http://localhost/brands', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.brandService.create).toHaveBeenCalledWith(payload);
    expect(vi.mocked(fixture.brandService.create).mock.calls[0][0].image?.file).toBe(file);
    expect(fixture.revalidateService.revalidate).toHaveBeenCalledOnce();
    expect(fixture.navigateService.close).toHaveBeenCalledOnce();
  });

  it('передаёт update payload в сервис без преобразования', async () => {
    const fixture = createController();
    const payload: UpdateBrandInput = {
      ...createPayload(new File(['image'], 'brand.png', { type: 'image/png' })),
      uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f',
      version: 3,
    };

    await fixture.controller.action({
      params: {},
      payload,
      params: { uuid: payload.uuid },
      request: new Request('http://localhost/brands', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.brandService.update).toHaveBeenCalledWith(payload.uuid, payload);
    expect(fixture.brandService.create).not.toHaveBeenCalled();
  });
});
