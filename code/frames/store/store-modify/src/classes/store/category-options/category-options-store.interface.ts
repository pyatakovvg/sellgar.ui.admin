import type { CategoryNodeEntity } from '@library/domain';

export abstract class CategoryOptionsStoreInterface {
  abstract readonly options: CategoryNodeEntity[];
  abstract readonly loading: boolean;
  abstract readonly error: string | undefined;
  abstract start(): void;
  abstract complete(options: CategoryNodeEntity[]): void;
  abstract fail(message: string): void;
  abstract reset(): void;
}
