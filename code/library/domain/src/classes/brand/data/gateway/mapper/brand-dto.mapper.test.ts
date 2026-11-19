import { describe, expect, it } from 'vitest';

import type { CreateBrandInput } from '../input/create-brand.input.ts';
import type { UpdateBrandInput } from '../input/update-brand.input.ts';
import { BrandDtoMapper } from './brand-dto.mapper.ts';

const createInput = (file: File): CreateBrandInput => ({
  code: 'brand',
  name: 'Бренд',
  description: 'Описание',
  images: [{ file, sortOrder: 0 }],
});

describe('BrandDtoMapper', () => {
  it('сохраняет исходный File при создании вложенного DTO', () => {
    const file = new File(['image'], 'brand.png', { type: 'image/png' });
    const input = createInput(file);
    Object.freeze(input.images?.[0]);
    Object.freeze(input.images);
    Object.freeze(input);

    const dto = BrandDtoMapper.create(input);

    expect(dto).not.toBe(input);
    expect(dto.images).not.toBe(input.images);
    expect(dto.images?.[0].file).toBe(file);
  });

  it('сохраняет поля update и исходный File', () => {
    const file = new File(['image'], 'brand.png', { type: 'image/png' });
    const input: UpdateBrandInput = {
      ...createInput(file),
      version: 3,
    };
    Object.freeze(input.images?.[0]);
    Object.freeze(input.images);
    Object.freeze(input);

    const dto = BrandDtoMapper.update(input);

    expect(dto.version).toBe(input.version);
    expect(dto.images?.[0].file).toBe(file);
  });
});
