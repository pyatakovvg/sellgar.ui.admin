import { type ProductResultEntity, type ProductServiceInterface } from '@library/domain';
import { ProductCreateRoute, ProductModifyRoute } from '@library/route-tokens';
import type { NavigateServiceInterface, RouteQueryServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { ProductController } from '../product.controller.ts';

const createController = (term?: string) => {
  const result = { items: [], total: 0, limit: 50, offset: 0 } as ProductResultEntity;
  const productService = { findAll: vi.fn().mockResolvedValue(result) } as unknown as ProductServiceInterface;
  const navigateService = { to: vi.fn().mockResolvedValue(undefined) } as unknown as NavigateServiceInterface;
  const query = { get: vi.fn().mockReturnValue({ term }) } as unknown as RouteQueryServiceInterface;

  return {
    controller: new ProductController(productService, navigateService, query),
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

  it('передает поисковый запрос из URL в серверный поиск каталога', async () => {
    const fixture = createController('майками');

    await fixture.controller.loader();

    expect(fixture.productService.findAll).toHaveBeenCalledWith({ term: 'майками' });
  });

  it('переходит к созданию товара', async () => {
    const fixture = createController();

    await fixture.controller.create();

    expect(fixture.navigateService.to).toHaveBeenCalledWith(ProductCreateRoute);
  });

  it('переходит к редактированию выбранного товара', async () => {
    const fixture = createController();

    await fixture.controller.open('product-uuid');

    expect(fixture.navigateService.to).toHaveBeenCalledWith(ProductModifyRoute, {
      params: { uuid: 'product-uuid' },
    });
  });
});
