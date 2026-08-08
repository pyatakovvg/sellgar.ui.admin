import { describe, expect, it } from 'vitest';

import type { CreateBrandInput } from '../input/create-brand.input.ts';
import type { UpdateBrandInput } from '../input/update-brand.input.ts';
import { BrandDtoMapper } from './brand-dto.mapper.ts';

const createInput = (file: File): CreateBrandInput => ({
  code: 'brand',
  name: 'Бренд',
  description: 'Описание',
  image: { file, alt: null },
});

describe('BrandDtoMapper', () => {
  it('сохраняет исходный File при создании вложенного DTO', () => {
    const file = new File(['image'], 'brand.png', { type: 'image/png' });
    const input = createInput(file);
    Object.freeze(input.image);
    Object.freeze(input);

    const dto = BrandDtoMapper.create(input);

    expect(dto).not.toBe(input);
    expect(dto.image).not.toBe(input.image);
    expect(dto.image?.file).toBe(file);
  });

  it('сохраняет поля update и исходный File', () => {
    const file = new File(['image'], 'brand.png', { type: 'image/png' });
    const input: UpdateBrandInput = {
      ...createInput(file),
      uuid: 'c7fd8d23-c843-4d47-8d23-33698a5f034f',
      version: 3,
    };
    Object.freeze(input.image);
    Object.freeze(input);

    const dto = BrandDtoMapper.update(input);

    expect(dto.uuid).toBe(input.uuid);
    expect(dto.version).toBe(input.version);
    expect(dto.image?.file).toBe(file);
  });
});
