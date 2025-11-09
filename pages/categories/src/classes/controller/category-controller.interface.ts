import { CategoryResultEntity } from '@library/domain';

export abstract class CategoryControllerInterface {
  abstract findAll(): Promise<CategoryResultEntity>;
}
