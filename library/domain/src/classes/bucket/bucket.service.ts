import { inject, injectable } from 'inversify';

import { BucketGateway, BucketGatewaySymbols } from './bucket.gateway.ts';

export const BucketServiceSymbol = Symbol.for('BucketService');

@injectable()
export class BucketService {
  constructor(@inject(BucketGatewaySymbols) private readonly bucketGateway: BucketGateway) {}

  getAll() {
    return this.bucketGateway.getAll();
  }

  getByUuid(uuid: string) {
    return this.bucketGateway.getByUuid(uuid);
  }

  remove(bucketName: string) {
    return this.bucketGateway.remove(bucketName);
  }
}
