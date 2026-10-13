import { describe, expect, it } from 'vitest';
import { ValidationError } from 'yup';
import { PropertyFormFactory } from '../factory/property-form.factory.ts';
import { schema } from '../form.schema.ts';

describe('Property form validation', () => {
  it.each([
    ['TEXT', 'textValue', ' '],
    ['ICON', 'textValue', ''],
    ['COLOR', 'colorValue', '#nope'],
    ['IMAGE', 'imageUuid', 'not-a-uuid'],
  ] as const)('reports %s validation on the value field', async (valueType, valueField, invalidValue) => {
    const values = PropertyFormFactory.create();
    values.code = 'color';
    values.name = 'Цвет';
    values.kind = 'OPTIONS';
    values.options = [
      {
        persisted: false,
        code: 'red',
        name: 'Красный',
        metadata: [{ valueType, [valueField]: invalidValue }],
      },
    ];

    const error = await schema.validate(values, { abortEarly: false }).catch((error: ValidationError) => error);
    expect(error).toBeInstanceOf(ValidationError);
    expect((error as ValidationError).inner.map((issue) => issue.path)).toContain(
      `options[0].metadata[0].${valueField}`,
    );
  });

  it('ignores hidden incomplete options when the selected kind is text', async () => {
    const values = PropertyFormFactory.create();
    values.code = 'note';
    values.name = 'Примечание';
    values.options = [{ persisted: false, code: '', name: '', metadata: [{ valueType: 'TEXT', textValue: '' }] }];

    await expect(schema.validate(values)).resolves.toMatchObject({ kind: 'TEXT', options: [] });
  });
});
