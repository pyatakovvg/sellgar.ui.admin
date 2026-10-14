import type { ProductSummaryEntity } from '@library/domain';

export abstract class ProductListControllerInterface {
  abstract loader(): Promise<ProductSummaryEntity[]>;
}
