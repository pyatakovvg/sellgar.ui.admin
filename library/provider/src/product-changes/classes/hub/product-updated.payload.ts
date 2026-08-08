import { isUUID } from 'class-validator';

export interface ProductUpdatedPayload {
  readonly productUuid: string;
  readonly version: number;
}

export const parseProductUpdatedPayload = (value: unknown): ProductUpdatedPayload => {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('productUuid' in value) ||
    typeof value.productUuid !== 'string' ||
    !isUUID(value.productUuid) ||
    !('version' in value) ||
    typeof value.version !== 'number' ||
    !Number.isInteger(value.version) ||
    value.version < 1
  ) {
    throw new Error('product.updated has an invalid payload.');
  }

  return {
    productUuid: value.productUuid,
    version: value.version,
  };
};
