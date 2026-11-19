import type { ProductSummaryEntity } from '@library/domain';

export abstract class ProductListControllerInterface {
  abstract readonly options: ProductSummaryEntity[];
  abstract readonly loading: boolean;
  abstract readonly error: string | undefined;
  abstract search(term: string): Promise<void>;
  abstract dispose(): void;
}
