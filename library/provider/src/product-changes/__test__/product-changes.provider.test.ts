import { ProductEntity, type ProductServiceInterface } from '@library/domain';
import type { RuntimeProviderCleanup } from '@sellgar/app';

import type { ProductChangesListener } from '../classes/hub/product-changes-listener.interface.ts';
import { ProductChangesHubInterface } from '../classes/hub/product-changes-hub.interface.ts';
import { ProductChangesProvider } from '../product-changes.provider.ts';

describe('ProductChangesProvider', () => {
  it('loads the canonical product and updates the opened entity', async () => {
    const productUuid = 'a438434d-4467-4c00-a61f-299ea4dd204f';
    const openedProduct = createProduct(productUuid, 4, 'Before');
    const updatedProduct = createProduct(productUuid, 5, 'After');
    const hub = new TestProductChangesHub();
    const products = createProductService(updatedProduct);
    const provider = new ProductChangesProvider(hub, products);

    const dispose = provider.setup();
    assertRuntimeProviderCleanup(dispose);

    await hub.emitUpdated(productUuid, 5);

    expect(products.findByUuid).toHaveBeenCalledWith(productUuid);
    expect(openedProduct.version).toBe(5);
    expect(openedProduct.name).toBe('After');

    await dispose();
  });

  it('does not update or acknowledge a delivery when the canonical product is behind', async () => {
    const productUuid = '9a2f2ce9-5458-4a16-831c-953ee3a6b68e';
    const openedProduct = createProduct(productUuid, 4, 'Before');
    const staleProduct = createProduct(productUuid, 4, 'Stale');
    const hub = new TestProductChangesHub();
    const provider = new ProductChangesProvider(hub, createProductService(staleProduct));

    const dispose = provider.setup();
    assertRuntimeProviderCleanup(dispose);

    await expect(hub.emitUpdated(productUuid, 5)).rejects.toThrow(
      `Product ${productUuid} version 4 is behind realtime version 5`,
    );
    expect(openedProduct.version).toBe(4);
    expect(openedProduct.name).toBe('Before');

    await dispose();
  });
});

const assertRuntimeProviderCleanup: (value: unknown) => asserts value is RuntimeProviderCleanup = (value) => {
  if (typeof value !== 'function') {
    throw new Error('Provider cleanup was not created.');
  }
};

class TestProductChangesHub extends ProductChangesHubInterface {
  private listener?: ProductChangesListener;

  subscribe(listener: ProductChangesListener): () => Promise<void> {
    this.listener = listener;

    return async () => {
      this.listener = undefined;
    };
  }

  async emitUpdated(productUuid: string, version: number): Promise<void> {
    if (!this.listener) {
      throw new Error('Product changes listener is not subscribed.');
    }

    await this.listener.updated(productUuid, version);
  }
}

const createProductService = (product: ProductEntity) => {
  return {
    create: vi.fn(),
    findAll: vi.fn(),
    findByUuid: vi.fn(async () => product),
    update: vi.fn(),
  } as unknown as ProductServiceInterface & {
    findByUuid: ReturnType<typeof vi.fn>;
  };
};

const createProduct = (uuid: string, version: number, name: string): ProductEntity => {
  const product = new ProductEntity();

  product.uuid = uuid;
  product.version = version;
  product.name = name;

  return product;
};
