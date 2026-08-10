import type { CategoryResultEntity } from '@library/domain';
import type { ControllerInterface } from '@sellgar/app';

export abstract class CategoryControllerInterface implements ControllerInterface {
  abstract loader(): Promise<CategoryResultEntity>;
}
