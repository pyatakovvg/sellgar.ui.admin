import type { ProductEntity, ProductServiceInterface, ProductTypeServiceInterface } from '@library/domain';
import { ProductReviewRoute } from '@library/route-tokens';
import type { NavigateServiceInterface, NavigationBlockerServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { ProductController } from '../product.controller.ts';
import type { ProductFormInput } from '../input/product-form.input.ts';

const productUuid = 'c7fd8d23-c843-4d47-8d23-33698a5f034f';
const typeUuid = 'f564dede-fd09-4a29-8375-59191b6ae793';
const createFixture = () => {
  const products = {
    create: vi.fn(),
    update: vi.fn(),
    findByUuid: vi.fn(),
    createVariant: vi.fn(),
    updateVariant: vi.fn(),
    archiveVariant: vi.fn(),
  } as unknown as ProductServiceInterface;
  const types = {
    findAll: vi.fn().mockResolvedValue({ items: [], total: 0, limit: 50, offset: 0 }),
  } as unknown as ProductTypeServiceInterface;
  const navigate = { to: vi.fn() } as unknown as NavigateServiceInterface;
  const blocker = {
    allow: vi.fn((callback: () => unknown) => callback()),
  } as unknown as NavigationBlockerServiceInterface;
  return { controller: new ProductController(products, types, navigate, blocker), products, navigate };
};
const input: ProductFormInput = {
  name: 'Товар',
  brandCode: 'brand',
  description: '',
  properties: [],
  typeUuid,
  typeVersion: 2,
};

describe('Product form as a separate process', () => {
  it('creates a product without variants and opens its review page', async () => {
    const fixture = createFixture();
    vi.mocked(fixture.products.create).mockResolvedValue({ uuid: productUuid } as ProductEntity);
    await fixture.controller.action({ payload: input, request: new Request('http://localhost/products/create') });
    expect(fixture.products.create).toHaveBeenCalledWith({ ...input, description: null, variants: [] });
    expect(fixture.navigate.to).toHaveBeenCalledWith(ProductReviewRoute, { params: { uuid: productUuid } });
    expect(fixture.products.createVariant).not.toHaveBeenCalled();
  });

  it('updates only product fields without reading, resaving or archiving variants', async () => {
    const fixture = createFixture();
    vi.mocked(fixture.products.update).mockResolvedValue({ uuid: productUuid, version: 4 } as ProductEntity);
    await fixture.controller.action({
      payload: { ...input, uuid: productUuid, version: 3 },
      request: new Request('http://localhost/products/edit'),
    });
    expect(fixture.products.update).toHaveBeenCalledWith(productUuid, {
      version: 3,
      typeVersion: 2,
      name: input.name,
      description: null,
      brandCode: 'brand',
      properties: [],
    });
    expect(fixture.products.findByUuid).not.toHaveBeenCalled();
    expect(fixture.products.updateVariant).not.toHaveBeenCalled();
    expect(fixture.products.archiveVariant).not.toHaveBeenCalled();
  });
});
