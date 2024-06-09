import { BucketEntity, BucketService, BucketServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { makeObservable, observable, action } from 'mobx';

export const BucketStoreSymbol = Symbol.for('BucketStore');

@injectable()
export class BucketStore {
  @observable buckets: BucketEntity[] = [];

  constructor(@inject(BucketServiceSymbol) private readonly bucketService: BucketService) {
    makeObservable(this);
  }

  @action.bound
  private setBuckets(buckets: BucketEntity[]) {
    this.buckets = buckets;
  }

  @action.bound
  async getAll() {
    const { data, meta } = await this.bucketService.getAll();

    this.setBuckets(plainToInstance(BucketEntity, data));
  }

  @action.bound
  async remove(bucketName: string) {
    await this.bucketService.remove(bucketName);
  }
}
