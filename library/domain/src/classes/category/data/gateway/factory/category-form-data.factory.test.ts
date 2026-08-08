import { describe, expect, it } from 'vitest';

import { CreateCategoryDto } from '../dto/create-category.dto.ts';
import { CategoryFormDataFactory } from './category-form-data.factory.ts';

describe('CategoryFormDataFactory', () => {
  it('сохраняет ссылку на существующее изображение без файловой части', () => {
    const dto = Object.assign(new CreateCategoryDto(), {
      code: 'category',
      name: 'Category',
      description: 'Description',
      image: { imageUuid: '16b16fc6-d252-4846-8840-c9241749711e' },
    });

    const formData = new CategoryFormDataFactory().create(dto);
    const payload = JSON.parse(String(formData.get('payload')));

    expect([...formData.keys()]).toEqual(['payload']);
    expect(payload.image).toEqual({
      imageUuid: '16b16fc6-d252-4846-8840-c9241749711e',
      alt: null,
    });
  });

  it('переносит новый файл в FormData и генерирует транспортные поля', () => {
    const file = new File(['category'], 'category.png', { type: 'image/png' });
    const dto = Object.assign(new CreateCategoryDto(), {
      code: 'category',
      name: 'Category',
      description: 'Description',
      image: { file, alt: 'Category image' },
    });

    const formData = new CategoryFormDataFactory().create(dto);
    const payload = JSON.parse(String(formData.get('payload')));
    const localId = payload.image.localId;

    expect(localId).toEqual(expect.any(String));
    expect(formData.get(`image:${localId}`)).toMatchObject({ name: 'category.png', type: 'image/png', size: 8 });
    expect(payload.image).toEqual({ localId, fileName: 'category.png', alt: 'Category image' });
    expect(payload.image).not.toHaveProperty('file');
  });
});
