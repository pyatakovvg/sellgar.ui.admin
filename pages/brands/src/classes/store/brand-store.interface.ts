import { BrandEntity, MetaEntity } from '@library/domain';

export abstract class BrandStoreInterface {
  abstract data: BrandEntity[];
  abstract meta: MetaEntity;

  abstract setData(data: BrandEntity[]): void;
  abstract setMeta(meta: MetaEntity): void;
}
