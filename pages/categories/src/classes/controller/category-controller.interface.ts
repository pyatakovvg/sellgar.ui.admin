import { CategoryEntity, MetaEntity } from '@library/domain';

export abstract class CategoryControllerInterface {
  abstract getData(): CategoryEntity[];
  abstract getMeta(): MetaEntity;

  abstract findAll(): Promise<CategoryEntity[]>;
}
