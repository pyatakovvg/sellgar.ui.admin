import { CategoryEntity, MetaEntity } from '@library/domain';

export abstract class CategoryStoreInterface {
  abstract data: CategoryEntity[];
  abstract meta: MetaEntity;

  abstract setData(data: CategoryEntity[]): void;
  abstract setMeta(meta: MetaEntity): void;
}
