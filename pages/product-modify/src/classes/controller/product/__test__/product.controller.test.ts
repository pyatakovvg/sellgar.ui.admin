import type {
  FileServiceInterface,
  ProductEntity,
  ProductServiceInterface,
  ProductTypeResultEntity,
  ProductTypeServiceInterface,
} from '@library/domain';
import { ProductModifyRoute } from '@library/route-tokens';
import type { NavigateServiceInterface, RevalidateServiceInterface } from '@sellgar/app';
import { describe, expect, it, vi } from 'vitest';

import { ProductController } from '../product.controller.ts';
import { ProductControllerInterface } from '../product-controller.interface.ts';
import type { ProductFormInput } from '../input/product-form.input.ts';

const typeUuid = 'f564dede-fd09-4a29-8375-59191b6ae793';
const productUuid = 'c7fd8d23-c843-4d47-8d23-33698a5f034f';
const variantUuid = '6ba55579-4c5b-48fd-8d1e-c334abf27970';

const productTypes = {
  items: [],
  total: 0,
  limit: 50,
  offset: 0,
} as ProductTypeResultEntity;

const createController = () => {
  const productService = {
    archiveVariant: vi.fn(),
    create: vi.fn(),
    createVariant: vi.fn(),
    findAll: vi.fn(),
    findByUuid: vi.fn(),
    update: vi.fn(),
    updateVariant: vi.fn(),
  } as unknown as ProductServiceInterface;
  const productTypeService = {
    findAll: vi.fn().mockResolvedValue(productTypes),
    findByUuid: vi.fn(),
  } as unknown as ProductTypeServiceInterface;
  const navigateService = { to: vi.fn() } as unknown as NavigateServiceInterface;
  const fileService = {
    getPublicImageUrl: vi.fn((uuid: string) => '/media/' + uuid),
  } as unknown as FileServiceInterface;
  const revalidateService = { revalidate: vi.fn() } as unknown as RevalidateServiceInterface;

  return {
    controller: new ProductController(
      productService,
      productTypeService,
      fileService,
      navigateService,
      revalidateService,
    ),
    navigateService,
    productService,
    revalidateService,
  };
};

const createPayload = (): ProductFormInput => ({
  typeUuid,
  typeVersion: 2,
  name: 'Товар',
  description: 'Описание',
  brandCode: 'brand',
  properties: [],
  variants: [{ name: 'Вариант', description: '', properties: [], images: [] }],
});

describe('ProductController', () => {
  it('загружает список типов для маршрута создания', async () => {
    const fixture = createController();

    await expect(
      fixture.controller.loader({
        params: {},
        request: new Request('http://localhost/products/create'),
      }),
    ).resolves.toMatchObject({ imageUrls: {}, product: undefined, productTypes });

    expect(fixture.productService.findByUuid).not.toHaveBeenCalled();
  });

  it('создаёт товар атомарно с обязательным первым вариантом', async () => {
    const fixture = createController();
    const payload = createPayload();
    const result = { uuid: productUuid } as ProductEntity;
    vi.mocked(fixture.productService.create).mockResolvedValue(result);

    await expect(
      fixture.controller.action({
        params: {},
        payload,
        request: new Request('http://localhost/products/create', { method: 'POST' }),
      }),
    ).resolves.toBe(result);

    expect(fixture.productService.create).toHaveBeenCalledWith({
      typeUuid,
      typeVersion: 2,
      name: 'Товар',
      description: 'Описание',
      brandCode: 'brand',
      properties: [],
      variants: [{ name: 'Вариант', description: null, properties: [], images: [] }],
    });
    expect(fixture.navigateService.to).toHaveBeenCalledWith(ProductModifyRoute, { params: { uuid: productUuid } });
  });

  it('сохраняет агрегат последовательно и передаёт актуальную версию в вариант', async () => {
    const fixture = createController();
    const payload: ProductFormInput = {
      ...createPayload(),
      uuid: productUuid,
      version: 3,
      variants: [{ uuid: variantUuid, name: 'Вариант 2', description: '', properties: [], images: [] }],
    };
    const original = {
      uuid: productUuid,
      version: 3,
      variants: [{ uuid: variantUuid, status: 'active' }],
    } as ProductEntity;
    const afterProduct = { uuid: productUuid, version: 4, typeVersion: 2 } as ProductEntity;
    const afterVariant = { uuid: productUuid, version: 5, typeVersion: 2 } as ProductEntity;
    const persisted = { uuid: productUuid, version: 5, variants: [] } as unknown as ProductEntity;

    vi.mocked(fixture.productService.findByUuid).mockResolvedValueOnce(original).mockResolvedValueOnce(persisted);
    vi.mocked(fixture.productService.update).mockResolvedValue(afterProduct);
    vi.mocked(fixture.productService.updateVariant).mockResolvedValue(afterVariant);

    await expect(
      fixture.controller.action({
        params: { uuid: productUuid },
        payload,
        request: new Request(`http://localhost/products/${productUuid}`, { method: 'POST' }),
      }),
    ).resolves.toBe(persisted);

    expect(fixture.productService.updateVariant).toHaveBeenCalledWith(productUuid, variantUuid, {
      version: 4,
      typeVersion: 2,
      name: 'Вариант 2',
      description: null,
      properties: [],
      images: [],
    });
    expect(fixture.revalidateService.revalidate).toHaveBeenCalledWith(ProductControllerInterface);
  });
});
