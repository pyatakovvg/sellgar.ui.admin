import type { CategoryResultEntity } from '@library/domain';

export abstract class CategoryOptionsControllerInterface {
  abstract loader(): Promise<CategoryResultEntity>;
}
