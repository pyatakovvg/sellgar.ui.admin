import type { CategoryResultEntity } from '@library/domain';

export abstract class CategoryControllerInterface {
  abstract loader(): Promise<CategoryResultEntity>;
}
