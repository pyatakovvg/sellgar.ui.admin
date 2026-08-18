import { ProductEntity, ProductResultEntity } from '@library/domain';
import type { RuntimeProviderCleanup } from '@sellgar/app';
import { plainToInstance } from 'class-transformer';

import {
  ProductChangesHubInterface,
  type ProductChangesListener,
} from '../classes/hub/product-changes-hub.interface.ts';
import { ProductChangesProvider } from '../product-changes.provider.ts';

describe('ProductChangesProvider', () => {
  it('adds a created product to the start of an opened product collection', async () => {
    const existingProduct = createProduct('a438434d-4467-4c00-a61f-299ea4dd204f', 4, 'Existing');
    const createdProduct = createProduct('521524f6-06d1-4e42-9aa3-af1b6789d183', 1, 'Created');
    const result = plainToInstance(ProductResultEntity, {
      data: [existingProduct],
    });
    const hub = new TestProductChangesHub();
    const provider = new ProductChangesProvider(hub);

    const dispose = provider.setup();
    assertRuntimeProviderCleanup(dispose);

    await hub.emitCreated(createdProduct);

    expect(result.data).toEqual([createdProduct, existingProduct]);

    await dispose();
  });

  it('updates the opened entity from the delivered product', async () => {
    const productUuid = 'a438434d-4467-4c00-a61f-299ea4dd204f';
    const openedProduct = createProduct(productUuid, 4, 'Before');
    const updatedProduct = createProduct(productUuid, 5, 'After');
    const hub = new TestProductChangesHub();
    const provider = new ProductChangesProvider(hub);

    const dispose = provider.setup();
    assertRuntimeProviderCleanup(dispose);

    await hub.emitUpdated(updatedProduct);

    expect(openedProduct.version).toBe(5);
    expect(openedProduct.name).toBe('After');

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

  async emitCreated(product: ProductEntity): Promise<void> {
    if (!this.listener) {
      throw new Error('Product changes listener is not subscribed.');
    }

    await this.listener.created(product);
  }

  async emitUpdated(product: ProductEntity): Promise<void> {
    if (!this.listener) {
      throw new Error('Product changes listener is not subscribed.');
    }

    await this.listener.updated(product);
  }
}

const createProduct = (uuid: string, version: number, name: string): ProductEntity => {
  const product = new ProductEntity();

  product.uuid = uuid;
  product.version = version;
  product.name = name;

  return product;
};
