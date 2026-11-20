import { ProductEntity, ProductResultEntity, ProductVariantDetailEntity } from '@library/domain';
import type { ProviderCleanup } from '@sellgar/app';
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
      items: [existingProduct],
      total: 1,
      limit: 50,
      offset: 0,
    });
    const hub = new TestProductChangesHub();
    const provider = new ProductChangesProvider(hub);

    const dispose = provider.activate();
    assertProviderCleanup(dispose);

    await hub.emitCreated(createdProduct);

    expect(result.items).toHaveLength(2);
    expect(result.items[0]).toMatchObject({ uuid: createdProduct.uuid, version: 1, name: 'Created' });
    expect(result.items[1]).toMatchObject({ uuid: existingProduct.uuid, version: 4, name: 'Existing' });

    await dispose();
  });

  it('updates the opened variant and aggregate version directly from a full product event', async () => {
    const productUuid = 'a438434d-4467-4c00-a61f-299ea4dd204f';
    const variantUuid = '6067f4db-f8c7-4076-9a02-d31249125c20';
    const opened = plainToInstance(ProductVariantDetailEntity, {
      uuid: variantUuid,
      productUuid,
      version: 4,
      name: 'Before',
    });
    const product = createProduct(productUuid, 5, 'Product');
    product.typeUuid = '2f407a03-0532-4519-954b-077c73eb5256';
    product.typeVersion = 2;
    product.variants = [{ uuid: variantUuid, name: 'After' }] as ProductEntity['variants'];
    const hub = new TestProductChangesHub();
    const provider = new ProductChangesProvider(hub);
    const dispose = provider.activate();
    assertProviderCleanup(dispose);
    await hub.emitUpdated(product);
    expect(opened.name).toBe('After');
    expect(opened.version).toBe(5);
    expect(opened.typeVersion).toBe(2);
    await dispose();
  });

  it('updates the opened entity from the delivered product', async () => {
    const productUuid = 'a438434d-4467-4c00-a61f-299ea4dd204f';
    const openedProduct = createProduct(productUuid, 4, 'Before');
    const updatedProduct = createProduct(productUuid, 5, 'After');
    const hub = new TestProductChangesHub();
    const provider = new ProductChangesProvider(hub);

    const dispose = provider.activate();
    assertProviderCleanup(dispose);

    await hub.emitUpdated(updatedProduct);

    expect(openedProduct.version).toBe(5);
    expect(openedProduct.name).toBe('After');

    await dispose();
  });
});

const assertProviderCleanup: (value: unknown) => asserts value is ProviderCleanup = (value) => {
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
