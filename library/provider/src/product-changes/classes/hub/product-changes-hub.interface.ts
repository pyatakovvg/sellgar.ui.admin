import type { ProductEntity } from '@library/domain';

export interface ProductChangesListener {
  readonly updated: (payload: ProductEntity) => Promise<void>;
}

export abstract class ProductChangesHubInterface {
  abstract subscribe(listener: ProductChangesListener): () => Promise<void>;
}
