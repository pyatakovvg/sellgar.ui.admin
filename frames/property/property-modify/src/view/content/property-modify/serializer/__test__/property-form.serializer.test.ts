import { PropertyEntity } from '@library/domain';
import { plainToInstance } from 'class-transformer';
import { describe, expect, it } from 'vitest';
import { PropertyFormFactory } from '../../factory/property-form.factory.ts';
import { PropertyFormSerializer } from '../property-form.serializer.ts';

describe('Property form mapping', () => {
  it('round trips text, icon, color and image values without treating icon as a storage type', () => {
    const property = plainToInstance(PropertyEntity, {
      code: 'color',
      name: 'Цвет',
      kind: 'OPTIONS',
      unitCode: null,
      description: 'Строка 1\nСтрока 2',
      version: 2,
      options: [
        {
          code: 'red',
          name: 'Красный',
          sortOrder: 0,
          extras: [
            { type: 'TEXT', textDisplay: 'TEXT', valueText: 'Красный', sortOrder: 0 },
            { type: 'TEXT', textDisplay: 'ICON', valueText: 'icon-code', sortOrder: 1 },
            { type: 'COLOR', valueColor: '#FF0000', sortOrder: 2 },
            { type: 'IMAGE', imageUuid: '11111111-1111-4111-8111-111111111111', sortOrder: 3 },
          ],
        },
      ],
    });
    const values = PropertyFormFactory.create(property);
    expect(values.options[0].metadata.map((m) => m.valueType)).toEqual(['TEXT', 'ICON', 'COLOR', 'IMAGE']);
    const result = PropertyFormSerializer.serialize(values, property);
    expect(result.version).toBe(2);
    expect(result.description).toBe('Строка 1\nСтрока 2');
    expect(result.options[0].extras).toEqual([
      { type: 'TEXT', textDisplay: 'TEXT', valueText: 'Красный', sortOrder: 0 },
      { type: 'TEXT', textDisplay: 'ICON', valueText: 'icon-code', sortOrder: 1 },
      { type: 'COLOR', valueColor: '#FF0000', sortOrder: 2 },
      { type: 'IMAGE', imageUuid: '11111111-1111-4111-8111-111111111111', sortOrder: 3 },
    ]);
    expect(result.options[0]).not.toHaveProperty('persisted');
  });
  it('does not send hidden unit or options after selecting a text property', () => {
    const values = PropertyFormFactory.create();
    values.unitCode = 'cm';
    values.options = [{ persisted: false, code: 'red', name: 'Красный', metadata: [] }];
    expect(PropertyFormSerializer.serialize(values)).toMatchObject({
      kind: 'TEXT',
      unitCode: null,
      options: [],
      description: null,
    });
  });
  it('keeps a selected unit for numeric properties', () => {
    const values = PropertyFormFactory.create();
    values.kind = 'DECIMAL';
    values.unitCode = 'cm';
    expect(PropertyFormSerializer.serialize(values).unitCode).toBe('cm');
  });
});
