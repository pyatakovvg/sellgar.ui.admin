import type { ProductEntity } from '@library/domain';

export interface ProductChangesListener {
  readonly created: (payload: ProductEntity) => Promise<void>;
  readonly updated: (payload: ProductEntity) => Promise<void>;
}

export abstract class ProductChangesHubInterface {
  abstract subscribe(listener: ProductChangesListener): () => Promise<void>;
}
