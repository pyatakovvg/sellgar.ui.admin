import { type ProductResultEntity, type ProductServiceInterface } from '@library/domain';
import type { NavigateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { ProductController } from '../product.controller.ts';

const createController = () => {
  const result = { data: [], meta: {} } as ProductResultEntity;
  const productService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as ProductServiceInterface;
  const navigateService = { to: vi.fn().mockResolvedValue(undefined) } as unknown as NavigateServiceInterface;

  return {
    controller: new ProductController(productService, navigateService),
    navigateService,
    productService,
    result,
  };
};

describe('ProductController', () => {
  it('загружает список товаров через предметный сервис', async () => {
    const fixture = createController();

    await expect(fixture.controller.loader()).resolves.toBe(fixture.result);
    expect(fixture.productService.findAll).toHaveBeenCalledOnce();
  });

  it('переходит к созданию товара', async () => {
    const fixture = createController();

    await fixture.controller.create();

    expect(fixture.navigateService.to).toHaveBeenCalledWith('/products/create');
  });

  it('переходит к редактированию выбранного товара', async () => {
    const fixture = createController();

    await fixture.controller.open('product-uuid');

    expect(fixture.navigateService.to).toHaveBeenCalledWith('/products/product-uuid');
  });
});
