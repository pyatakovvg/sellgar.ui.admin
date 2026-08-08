import { describe, expect, it } from 'vitest';

import type { CreateCategoryInput } from '../input/create-category.input.ts';
import type { UpdateCategoryInput } from '../input/update-category.input.ts';
import { CategoryDtoMapper } from './category-dto.mapper.ts';

const createInput = (file: File): CreateCategoryInput => ({
  code: 'category',
  name: 'Категория',
  description: 'Описание',
  image: { file, alt: null },
});

describe('CategoryDtoMapper', () => {
  it('сохраняет исходный File при создании вложенного DTO', () => {
    const file = new File(['image'], 'category.png', { type: 'image/png' });
    const input = createInput(file);
    Object.freeze(input.image);
    Object.freeze(input);

    const dto = CategoryDtoMapper.create(input);

    expect(dto).not.toBe(input);
    expect(dto.image).not.toBe(input.image);
    expect(dto.image?.file).toBe(file);
  });

  it('сохраняет поля update и исходный File', () => {
    const file = new File(['image'], 'category.png', { type: 'image/png' });
    const input: UpdateCategoryInput = {
      ...createInput(file),
      uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f',
      version: 3,
    };
    Object.freeze(input.image);
    Object.freeze(input);

    const dto = CategoryDtoMapper.update(input);

    expect(dto.uuid).toBe(input.uuid);
    expect(dto.version).toBe(input.version);
    expect(dto.image?.file).toBe(file);
  });
});
