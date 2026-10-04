import { describe, expect, it } from 'vitest';

import type { CreateProductInput } from '../input/create-product.input.ts';
import { ProductDtoMapper } from './product-dto.mapper.ts';

const createInput = (file: File): CreateProductInput => ({
  typeUuid: 'f564dede-fd09-4a29-8375-59191b6ae793',
  typeVersion: 2,
  name: 'Товар',
  description: 'Описание',
  brandCode: 'brand',
  properties: [{ propertyCode: 'material', values: [{ valueOptionCode: 'cotton' }] }],
  variants: [
    {
      name: 'Вариант',
      description: 'Описание варианта',
      properties: [{ propertyCode: 'size', values: [{ valueOptionCode: 'm' }] }],
      images: [{ file }],
    },
  ],
});

describe('ProductDtoMapper', () => {
  it('создаёт валидируемый вложенный DTO и сохраняет File для multipart', () => {
    const file = new File(['image'], 'product.png', { type: 'image/png' });
    const dto = ProductDtoMapper.create(createInput(file));

    expect(dto.typeVersion).toBe(2);
    expect(dto.properties?.[0].values[0].valueOptionCode).toBe('cotton');
    expect(dto.variants[0].properties[0].values[0].valueOptionCode).toBe('m');
    expect(dto.variants[0].images?.[0].file).toBe(file);
  });

  it('сохраняет File при построении DTO обновления варианта', () => {
    const file = new File(['image'], 'product.png', { type: 'image/png' });
    const dto = ProductDtoMapper.updateVariant({
      version: 7,
      typeVersion: 2,
      name: 'Вариант',
      images: [{ file }],
    });

    expect(dto.version).toBe(7);
    expect(dto.images?.[0].file).toBe(file);
  });
});
