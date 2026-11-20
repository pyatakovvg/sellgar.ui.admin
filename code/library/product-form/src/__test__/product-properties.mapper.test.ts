import { describe, expect, it } from 'vitest';
import { PropertyKind } from '@library/domain';
import type { ProductFieldEntity } from '@library/domain';
import { ProductPropertiesMapper } from '../product-properties.mapper.ts';

const field = (kind: PropertyKind, values: ProductFieldEntity['values']): ProductFieldEntity =>
  ({
    propertyCode: 'test',
    propertyKind: kind,
    required: false,
    multiple: true,
    sortOrder: 0,
    values,
    property: { code: 'test', name: 'Test', kind, unitCode: null, options: [] },
  }) as ProductFieldEntity;

describe('Product property form mapping', () => {
  it('preserves integer and decimal precision during a form round trip', () => {
    for (const [kind, value] of [
      [PropertyKind.INTEGER, '9007199254740993'],
      [PropertyKind.DECIMAL, '123456789.123456'],
    ] as const) {
      const key = kind === PropertyKind.INTEGER ? 'valueInteger' : 'valueDecimal';
      const form = ProductPropertiesMapper.createProperties([field(kind, [{ [key]: value }])]);
      expect(ProductPropertiesMapper.toAssignments(form)[0].values).toEqual([{ [key]: value }]);
    }
  });

  it('keeps false as a selected boolean rather than treating it as an empty value', () => {
    const form = ProductPropertiesMapper.createProperties([field(PropertyKind.BOOLEAN, [{ valueBoolean: false }])]);
    expect(ProductPropertiesMapper.toAssignments(form)[0].values).toEqual([{ valueBoolean: false }]);
  });

  it('copies editable values so typing does not mutate a loaded entity', () => {
    const loaded = field(PropertyKind.TEXT, [{ valueText: 'Original' }]);
    const form = ProductPropertiesMapper.createProperties([loaded]);
    form[0].values[0].value = 'Draft';
    expect(loaded.values[0].valueText).toBe('Original');
  });
});
