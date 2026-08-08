import { describe, expect, it } from 'vitest';

import type { CreateProductInput } from '../input/create-product.input.ts';
import type { UpdateProductInput } from '../input/update-product.input.ts';
import { ProductDtoMapper } from './product-dto.mapper.ts';

const createInput = (file: File): CreateProductInput => ({
  name: 'Товар',
  description: 'Описание',
  categoryUuid: 'f564dede-fd09-4a29-8375-59191b6ae793',
  brandUuid: '0dfe2598-3835-4dd1-9188-cde04915ee6e',
  properties: [],
  variants: [
    {
      name: 'Вариант',
      description: 'Описание варианта',
      properties: [],
      images: [{ file, alt: null }],
    },
  ],
});

describe('ProductDtoMapper', () => {
  it('сохраняет исходный File при создании вложенного DTO', () => {
    const file = new File(['image'], 'product.png', { type: 'image/png' });
    const input = createInput(file);
    Object.freeze(input.variants[0].images?.[0]);
    Object.freeze(input.variants[0].images);
    Object.freeze(input.variants[0]);
    Object.freeze(input.variants);
    Object.freeze(input);

    const dto = ProductDtoMapper.create(input);

    expect(dto).not.toBe(input);
    expect(dto.variants).not.toBe(input.variants);
    expect(dto.variants[0].images?.[0]).not.toBe(input.variants[0].images?.[0]);
    expect(dto.variants[0].images?.[0].file).toBe(file);
  });

  it('сохраняет поля update и исходный File', () => {
    const file = new File(['image'], 'product.png', { type: 'image/png' });
    const input: UpdateProductInput = {
      ...createInput(file),
      uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f',
      version: 3,
    };
    Object.freeze(input.variants[0].images?.[0]);
    Object.freeze(input.variants[0].images);
    Object.freeze(input.variants[0]);
    Object.freeze(input.variants);
    Object.freeze(input);

    const dto = ProductDtoMapper.update(input);

    expect(dto.uuid).toBe(input.uuid);
    expect(dto.version).toBe(input.version);
    expect(dto.variants[0].images?.[0].file).toBe(file);
  });
});
