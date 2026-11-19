import type { ProductSummaryEntity } from '@library/domain';

export abstract class ProductSearchStoreInterface {
  abstract readonly options: ProductSummaryEntity[];
  abstract readonly loading: boolean;
  abstract readonly error: string | undefined;
  abstract start(): void;
  abstract complete(options: ProductSummaryEntity[]): void;
  abstract fail(message: string): void;
  abstract reset(): void;
}
