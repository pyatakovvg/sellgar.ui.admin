import { PropertyEntity, MetaEntity } from '@library/domain';

export abstract class PropertyStoreInterface {
  abstract data: PropertyEntity[];
  abstract meta: MetaEntity;

  abstract setData(data: PropertyEntity[]): void;
  abstract setMeta(meta: MetaEntity): void;
}
