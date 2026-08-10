import type { CategoryResultEntity } from '@library/domain';
import type { ControllerInterface } from '@sellgar/app';

export abstract class CategoryOptionsControllerInterface implements ControllerInterface {
  abstract loader(): Promise<CategoryResultEntity>;
}
