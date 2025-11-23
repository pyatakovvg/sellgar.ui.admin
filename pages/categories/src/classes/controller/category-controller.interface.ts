import { CategoryResultEntity } from '@library/domain';

export abstract class CategoryControllerInterface {
  abstract loader(): Promise<CategoryResultEntity>;
}
