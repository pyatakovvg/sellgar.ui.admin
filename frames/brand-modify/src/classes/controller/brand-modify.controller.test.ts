import type { BrandServiceInterface, CreateBrandInput, UpdateBrandInput } from '@library/domain';
import type { FrameServiceInterface, RevalidateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { BrandModifyController } from './brand-modify.controller.ts';

const createController = () => {
  const brandService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findByUuid: vi.fn(),
    update: vi.fn(),
  } as unknown as BrandServiceInterface;
  const frameService = {
    close: vi.fn(),
  } as unknown as FrameServiceInterface;
  const revalidateService = {
    revalidate: vi.fn(),
  } as unknown as RevalidateServiceInterface;

  return {
    brandService,
    controller: new BrandModifyController(brandService, frameService, revalidateService),
    frameService,
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
  it('передаёт объект формы и File в create без преобразования', async () => {
    const fixture = createController();
    const file = new File(['image'], 'brand.png', { type: 'image/png' });
    const payload = createPayload(file);

    await fixture.controller.action({
      params: {},
      payload,
      props: {},
      request: new Request('http://localhost/brands', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.brandService.create).toHaveBeenCalledWith(payload);
    expect(vi.mocked(fixture.brandService.create).mock.calls[0][0].image?.file).toBe(file);
    expect(fixture.revalidateService.revalidate).toHaveBeenCalledOnce();
    expect(fixture.frameService.close).toHaveBeenCalledOnce();
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
      props: { uuid: payload.uuid },
      request: new Request('http://localhost/brands', { method: 'POST' }),
      signal: new AbortController().signal,
    });

    expect(fixture.brandService.update).toHaveBeenCalledWith(payload.uuid, payload);
    expect(fixture.brandService.create).not.toHaveBeenCalled();
  });
});
