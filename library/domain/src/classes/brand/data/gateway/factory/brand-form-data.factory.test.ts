import { describe, expect, it } from 'vitest';

import { CreateBrandDto } from '../dto/create-brand.dto.ts';
import { BrandFormDataFactory } from './brand-form-data.factory.ts';

describe('BrandFormDataFactory', () => {
  it('переносит файл в FormData и оставляет в payload только его описание', () => {
    const file = new File(['brand'], 'brand.png', { type: 'image/png' });
    const dto = Object.assign(new CreateBrandDto(), {
      code: 'brand',
      name: 'Brand',
      description: 'Description',
      image: { file, alt: 'Brand image' },
    });

    const formData = new BrandFormDataFactory().create(dto);
    const payload = JSON.parse(String(formData.get('payload')));
    const localId = payload.image.localId;

    expect(localId).toEqual(expect.any(String));
    expect(formData.get(`image:${localId}`)).toMatchObject({ name: 'brand.png', type: 'image/png', size: 5 });
    expect(payload.image).toEqual({ localId, fileName: 'brand.png', alt: 'Brand image' });
    expect(payload.image).not.toHaveProperty('file');
  });

  it('сохраняет ссылку на существующее изображение без файловой части', () => {
    const dto = Object.assign(new CreateBrandDto(), {
      code: 'brand',
      name: 'Brand',
      description: 'Description',
      image: { imageUuid: '16b16fc6-d252-4846-8840-c9241749711e', alt: null },
    });

    const formData = new BrandFormDataFactory().create(dto);
    const payload = JSON.parse(String(formData.get('payload')));

    expect([...formData.keys()]).toEqual(['payload']);
    expect(payload.image).toEqual({
      imageUuid: '16b16fc6-d252-4846-8840-c9241749711e',
      alt: null,
    });
  });
});
