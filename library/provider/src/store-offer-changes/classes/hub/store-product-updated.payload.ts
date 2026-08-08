import { isUUID } from 'class-validator';

export interface StoreProductUpdatedPayload {
  readonly storeProductUuid: string;
  readonly version: number;
}

export const parseStoreProductUpdatedPayload = (value: unknown): StoreProductUpdatedPayload => {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('storeProductUuid' in value) ||
    typeof value.storeProductUuid !== 'string' ||
    !isUUID(value.storeProductUuid) ||
    !('version' in value) ||
    typeof value.version !== 'number' ||
    !Number.isInteger(value.version) ||
    value.version < 1
  ) {
    throw new Error('store.product.updated has an invalid payload.');
  }

  return {
    storeProductUuid: value.storeProductUuid,
    version: value.version,
  };
};
