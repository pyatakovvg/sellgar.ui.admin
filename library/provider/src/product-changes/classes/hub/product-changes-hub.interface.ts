import type { ProductChangesListener } from './product-changes-listener.interface.ts';

export abstract class ProductChangesHubInterface {
  abstract subscribe(listener: ProductChangesListener): () => Promise<void>;
}
