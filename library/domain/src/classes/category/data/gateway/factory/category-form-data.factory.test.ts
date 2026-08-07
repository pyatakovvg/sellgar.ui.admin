import { describe, expect, it } from 'vitest';

import { CreateCategoryDto } from '../dto/create-category.dto.ts';
import { CategoryFormDataFactory } from './category-form-data.factory.ts';

describe('CategoryFormDataFactory', () => {
  it('сохраняет ссылку на существующее изображение без файловой части', () => {
    const dto = Object.assign(new CreateCategoryDto(), {
      code: 'category',
      name: 'Category',
      description: 'Description',
      image: { imageUuid: '16b16fc6-d252-4846-8840-c9241749711e', fileName: 'category.png' },
    });

    const formData = new CategoryFormDataFactory().create(dto);
    const payload = JSON.parse(String(formData.get('payload')));

    expect([...formData.keys()]).toEqual(['payload']);
    expect(payload.image).toEqual({
      imageUuid: '16b16fc6-d252-4846-8840-c9241749711e',
      fileName: 'category.png',
      alt: null,
    });
  });
});
