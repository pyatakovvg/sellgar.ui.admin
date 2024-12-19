import { injectable } from 'inversify';

export const BucketStoreSymbol = Symbol.for('BucketStore');

@injectable()
export class BucketStore {}
