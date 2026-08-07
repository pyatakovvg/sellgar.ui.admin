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
      image: { localId: 'local-image', file, alt: 'Brand image' },
    });

    const formData = new BrandFormDataFactory().create(dto);
    const payload = JSON.parse(String(formData.get('payload')));

    expect(formData.get('image:local-image')).toMatchObject({ name: 'brand.png', type: 'image/png', size: 5 });
    expect(payload.image).toEqual({ localId: 'local-image', fileName: 'brand.png', alt: 'Brand image' });
    expect(payload.image).not.toHaveProperty('file');
  });
});
