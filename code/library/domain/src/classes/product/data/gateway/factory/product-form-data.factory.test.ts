import { describe, expect, it } from 'vitest';

import { ProductDtoMapper } from '../mapper/product-dto.mapper.ts';
import { ProductFormDataFactory } from './product-form-data.factory.ts';

describe('ProductFormDataFactory', () => {
  it('выносит файл варианта из payload и связывает его через localId', () => {
    const file = new File(['product'], 'product.png', { type: 'image/png' });
    const dto = ProductDtoMapper.create({
      typeUuid: 'f564dede-fd09-4a29-8375-59191b6ae793',
      typeVersion: 2,
      name: 'Product',
      description: null,
      brandCode: 'brand',
      properties: [],
      variants: [{ name: 'Variant', properties: [], images: [{ file }] }],
    });

    const formData = new ProductFormDataFactory().createProduct(dto);
    const payload = JSON.parse(String(formData.get('payload')));
    const localId = payload.variants[0].images[0].localId;

    expect(localId).toEqual(expect.any(String));
    expect(formData.get(`image:${localId}`)).toMatchObject({ name: 'product.png', type: 'image/png', size: 7 });
    expect(payload.variants[0].images[0]).toEqual({ localId, sortOrder: 0 });
  });
});
