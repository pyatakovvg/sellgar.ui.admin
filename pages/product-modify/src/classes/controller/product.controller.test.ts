import type { CreateProductInput, ProductEntity, ProductServiceInterface, UpdateProductInput } from '@library/domain';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { ProductController } from './product.controller.ts';

const createController = () => {
  const productService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findByUuid: vi.fn(),
    update: vi.fn(),
  } as unknown as ProductServiceInterface;
  const navigateService = {
    to: vi.fn(),
  } as unknown as NavigateServiceInterface;

  return {
    controller: new ProductController(productService, navigateService),
    navigateService,
    productService,
  };
};

const createPayload = (file: File): CreateProductInput => ({
  name: 'Товар',
  description: 'Описание',
  categoryUuid: 'f564dede-fd09-4a29-8375-59191b6ae793',
  brandUuid: '0dfe2598-3835-4dd1-9188-cde04915ee6e',
  properties: [],
  variants: [
    {
      name: 'Вариант',
      description: 'Описание варианта',
      properties: [],
      images: [{ file, alt: null }],
    },
  ],
});

describe('ProductController', () => {
  it('передаёт объект формы и File в create без преобразования', async () => {
    const fixture = createController();
    const file = new File(['image'], 'product.png', { type: 'image/png' });
    const payload = createPayload(file);
    const result = { uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f' } as ProductEntity;

    vi.mocked(fixture.productService.create).mockResolvedValue(result);

    await expect(
      fixture.controller.action({
        params: {},
        payload,
        request: new Request('http://localhost/products/create', { method: 'POST' }),
      }),
    ).resolves.toBe(result);

    expect(fixture.productService.create).toHaveBeenCalledWith(payload);
    expect(vi.mocked(fixture.productService.create).mock.calls[0][0].variants[0].images?.[0].file).toBe(file);
    expect(fixture.navigateService.to).toHaveBeenCalledWith('/products/' + result.uuid);
  });

  it('передаёт update payload в сервис без преобразования', async () => {
    const fixture = createController();
    const payload: UpdateProductInput = {
      ...createPayload(new File(['image'], 'product.png', { type: 'image/png' })),
      uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f',
      version: 3,
    };
    const result = { uuid: payload.uuid, version: 4 } as ProductEntity;

    vi.mocked(fixture.productService.update).mockResolvedValue(result);

    await expect(
      fixture.controller.action({
        params: { uuid: payload.uuid },
        payload,
        request: new Request(`http://localhost/products/${payload.uuid}`, { method: 'POST' }),
      }),
    ).resolves.toBe(result);

    expect(fixture.productService.update).toHaveBeenCalledWith(payload.uuid, payload);
    expect(fixture.navigateService.to).not.toHaveBeenCalled();
  });
});
