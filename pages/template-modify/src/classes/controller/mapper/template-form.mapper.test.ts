import type { ProductTypeEntity } from '@library/domain';
import { describe, expect, it } from 'vitest';

import { TemplateFormMapper } from './template-form.mapper.ts';

describe('TemplateFormMapper', () => {
  it('формирует единый агрегат типа товара и назначает порядок полей', () => {
    const input = {
      name: 'Футболка',
      productFields: [
        { propertyCode: 'material', required: true, multiple: true },
        { propertyCode: 'country', required: false, multiple: false },
      ],
      variantFields: [{ propertyCode: 'size', required: true, multiple: false }],
    };

    expect(TemplateFormMapper.toCreateInput(input)).toEqual({
      name: 'Футболка',
      productFields: [
        { propertyCode: 'material', required: true, multiple: true, sortOrder: 0 },
        { propertyCode: 'country', required: false, multiple: false, sortOrder: 1 },
      ],
      variantFields: [{ propertyCode: 'size', required: true, multiple: false, sortOrder: 0 }],
    });
  });

  it('восстанавливает порядок полей из сохранённого шаблона', () => {
    const template = {
      uuid: '9655d169-05cd-47b1-a427-72406081487c',
      version: 3,
      name: 'Футболка',
      productFields: [
        { propertyCode: 'country', required: false, multiple: false, sortOrder: 1 },
        { propertyCode: 'material', required: true, multiple: true, sortOrder: 0 },
      ],
      variantFields: [],
    } as ProductTypeEntity;

    expect(TemplateFormMapper.toFormInput(template).productFields.map((field) => field.propertyCode)).toEqual([
      'material',
      'country',
    ]);
  });
});
