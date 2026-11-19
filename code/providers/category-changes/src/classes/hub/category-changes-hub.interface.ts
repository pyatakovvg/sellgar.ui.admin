import type { CategoryEntity } from '@library/domain';

export interface CategoryChangesListener {
  readonly changed: (payload: CategoryEntity) => Promise<void>;
}

export abstract class CategoryChangesHubInterface {
  abstract subscribe(listener: CategoryChangesListener): () => Promise<void>;
}
