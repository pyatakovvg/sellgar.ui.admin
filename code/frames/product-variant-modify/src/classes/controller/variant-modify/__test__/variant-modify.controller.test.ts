import type {
  FileServiceInterface,
  ProductEntity,
  ProductServiceInterface,
  ProductTypeServiceInterface,
} from '@library/domain';
import type { NavigateServiceInterface, NavigationBlockerServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { VariantModifyController } from '../variant-modify.controller.ts';
import type { VariantFormInput } from '../input/variant-form.input.ts';

const productUuid = '21973aca-19a9-4a14-87d0-f8ed1cec1e31';
const variantUuid = '3c21dd6a-ac1b-42bd-87cf-1c42df685aac';
const createFixture = () => {
  const products = {
    findVariant: vi.fn(),
    findVariants: vi.fn(),
    createVariant: vi.fn(),
    updateVariant: vi.fn(),
    update: vi.fn(),
    archiveVariant: vi.fn(),
  } as unknown as ProductServiceInterface;
  const types = { findByUuid: vi.fn() } as unknown as ProductTypeServiceInterface;
  const files = { getPublicImageUrl: vi.fn() } as unknown as FileServiceInterface;
  const navigate = { close: vi.fn() } as unknown as NavigateServiceInterface;
  const blocker = {
    allow: vi.fn((callback: () => unknown) => callback()),
  } as unknown as NavigationBlockerServiceInterface;
  return {
    controller: new VariantModifyController(products, types, files, navigate, blocker),
    products,
    navigate,
    types,
  };
};
const input: VariantFormInput = {
  version: 5,
  typeVersion: 2,
  name: 'Чёрный · 256 ГБ',
  description: '',
  properties: [],
  images: [],
};

describe('Single variant save process', () => {
  it('creates only the submitted variant and closes after success', async () => {
    const fixture = createFixture();
    vi.mocked(fixture.products.createVariant).mockResolvedValue({ uuid: productUuid } as ProductEntity);
    await fixture.controller.action({
      params: { productUuid },
      payload: input,
      request: new Request('http://localhost/variant/new'),
    });
    expect(fixture.products.createVariant).toHaveBeenCalledExactlyOnceWith(productUuid, {
      version: 5,
      typeVersion: 2,
      variant: { name: input.name, description: null, properties: [], images: [] },
    });
    expect(fixture.products.update).not.toHaveBeenCalled();
    expect(fixture.products.updateVariant).not.toHaveBeenCalled();
    expect(fixture.navigate.close).toHaveBeenCalledOnce();
  });

  it('updates only the chosen variant with the version of the edited draft', async () => {
    const fixture = createFixture();
    vi.mocked(fixture.products.updateVariant).mockResolvedValue({ uuid: productUuid } as ProductEntity);
    await fixture.controller.action({
      params: { productUuid, variantUuid },
      payload: input,
      request: new Request('http://localhost/variant/edit'),
    });
    expect(fixture.products.updateVariant).toHaveBeenCalledExactlyOnceWith(productUuid, variantUuid, {
      version: 5,
      typeVersion: 2,
      name: input.name,
      description: null,
      properties: [],
      images: [],
    });
    expect(fixture.products.createVariant).not.toHaveBeenCalled();
    expect(fixture.products.archiveVariant).not.toHaveBeenCalled();
  });

  it('keeps the frame open when the backend rejects an outdated version', async () => {
    const fixture = createFixture();
    vi.mocked(fixture.products.updateVariant).mockRejectedValue(new Error('conflict'));
    await expect(
      fixture.controller.action({
        params: { productUuid, variantUuid },
        payload: input,
        request: new Request('http://localhost/variant/edit'),
      }),
    ).rejects.toThrow('conflict');
    expect(fixture.navigate.close).not.toHaveBeenCalled();
  });
});
