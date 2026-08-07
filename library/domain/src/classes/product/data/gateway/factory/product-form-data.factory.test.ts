import { describe, expect, it } from 'vitest';

import { CreateProductDto } from '../dto/create-product.dto.ts';
import { ProductFormDataFactory } from './product-form-data.factory.ts';

describe('ProductFormDataFactory', () => {
  it('нумерует изображения варианта и отделяет новые файлы от payload', () => {
    const file = new File(['product'], 'product.png', { type: 'image/png' });
    const dto = Object.assign(new CreateProductDto(), {
      name: 'Product',
      description: 'Description',
      categoryUuid: 'f564dede-fd09-4a29-8375-59191b6ae793',
      brandUuid: '0dfe2598-3835-4dd1-9188-cde04915ee6e',
      variants: [
        {
          name: 'Variant',
          description: 'Description',
          properties: [],
          images: [
            { file },
            { uuid: '6ba55579-4c5b-48fd-8d1e-c334abf27970', imageUuid: '4d546f31-a74d-45ba-a881-ad781a70b24f' },
          ],
        },
      ],
    });

    const formData = new ProductFormDataFactory().create(dto);
    const payload = JSON.parse(String(formData.get('payload')));
    const localId = payload.variants[0].images[0].localId;

    expect(localId).toEqual(expect.any(String));
    expect(formData.get(`gallery:${localId}`)).toMatchObject({ name: 'product.png', type: 'image/png', size: 7 });
    expect(payload.variants[0].images).toEqual([
      { localId, fileName: 'product.png', order: 0, alt: null },
      {
        uuid: '6ba55579-4c5b-48fd-8d1e-c334abf27970',
        imageUuid: '4d546f31-a74d-45ba-a881-ad781a70b24f',
        order: 1,
        alt: null,
      },
    ]);
  });
});
