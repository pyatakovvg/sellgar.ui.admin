import type { CategoryEntity } from '@library/domain';

export abstract class CategoryListControllerInterface {
  abstract loader(): Promise<CategoryEntity[]>;
}
