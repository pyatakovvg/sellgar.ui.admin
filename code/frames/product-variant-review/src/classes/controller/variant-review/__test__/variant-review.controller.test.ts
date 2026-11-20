import { describe, expect, it, vi } from 'vitest';
import type { ProductEntity, ProductVariantDetailEntity, ProductServiceInterface } from '@library/domain';
import type { NavigateServiceInterface } from '@sellgar/app';
import { VariantReviewController } from '../variant-review.controller.ts';

const productUuid = 'ae1e00f1-bbb2-4b88-b214-85e01c79ab17';
const variantUuid = 'a73b1ba5-d85b-4789-a017-ff8671df79bd';

it.each(['active', 'archived'] as const)('changes only the selected variant status from %s', async (status) => {
  const products = { archiveVariant: vi.fn(), restoreVariant: vi.fn() } as unknown as ProductServiceInterface;
  const navigate = { close: vi.fn() } as unknown as NavigateServiceInterface;
  const method = status === 'active' ? products.archiveVariant : products.restoreVariant;
  vi.mocked(method).mockResolvedValue({ uuid: productUuid } as ProductEntity);
  const controller = new VariantReviewController(products, navigate);
  await controller.action({
    payload: { productUuid, uuid: variantUuid, version: 9, status } as ProductVariantDetailEntity,
    request: new Request('http://localhost/variant'),
  });
  expect(method).toHaveBeenCalledExactlyOnceWith(productUuid, variantUuid, 9);
  expect(navigate.close).toHaveBeenCalledOnce();
});
