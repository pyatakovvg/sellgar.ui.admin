import { CategoryEntity } from '@library/domain';

export abstract class FormStoreInterface {
  abstract inProcess: boolean;
  abstract categories: CategoryEntity[];

  abstract setProcess(state: boolean): void;
  abstract setCategories(data: CategoryEntity[]): void;
}
