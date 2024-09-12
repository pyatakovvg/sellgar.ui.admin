import { BucketEntity, BucketService, BucketServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const BucketStoreSymbol = Symbol.for('BucketStore');

@injectable()
export class BucketStore {
  @observable bucket: BucketEntity;

  constructor(@inject(BucketServiceSymbol) private readonly bucketService: BucketService) {
    makeObservable(this);
  }

  @action.bound
  private setBucket(bucket: BucketEntity) {
    this.bucket = bucket;
  }

  @action.bound
  async getByUuid(uuid: string) {
    const result = await this.bucketService.getByUuid(uuid);

    this.setBucket(result);

    return result;
  }
}
