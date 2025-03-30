import { PropertyGroupEntity, MetaEntity } from '@library/domain';

export abstract class PropertyStoreInterface {
  abstract data: PropertyGroupEntity[];
  abstract meta: MetaEntity;

  abstract setData(data: PropertyGroupEntity[]): void;
  abstract setMeta(meta: MetaEntity): void;
}
