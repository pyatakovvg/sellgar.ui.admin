import { ProductEntity, MetaEntity } from '@library/domain';

export abstract class ProductsStoreInterface {
  abstract inProcess: boolean;
  abstract data: ProductEntity[];
  abstract meta: MetaEntity;

  abstract setData(data: ProductEntity[]): void;
  abstract setMeta(meta: MetaEntity): void;
  abstract setProcess(state: boolean): void;
}
