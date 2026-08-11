import type { ProductEntity } from '@library/domain';

export interface ProductChangesListener {
  readonly updated: (payload: ProductEntity) => Promise<void>;
}
