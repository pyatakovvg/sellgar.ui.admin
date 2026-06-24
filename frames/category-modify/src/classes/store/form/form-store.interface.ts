import { CategoryEntity } from '@library/domain';

export abstract class FormStoreInterface {
  abstract categories: CategoryEntity[];

  abstract setCategories(data: CategoryEntity[]): void;
}
