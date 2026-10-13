import * as yup from 'yup';

export type PropertyKind = 'TEXT' | 'INTEGER' | 'DECIMAL' | 'BOOLEAN' | 'DATE' | 'OPTIONS';

export interface IFormData {
  unitCode?: string;
  code: string;
  name: string;
  kind: PropertyKind;
  description: string;
  options: Array<{
    persisted: boolean;
    code: string;
    name: string;
    metadata: Array<{
      valueType: 'TEXT' | 'ICON' | 'COLOR' | 'IMAGE';
      textValue?: string | null;
      colorValue?: string | null;
      imageUuid?: string | null;
    }>;
  }>;
}

export const schema: yup.ObjectSchema<IFormData> = yup.object({
  unitCode: yup.string().optional(),
  code: yup.string().required('Необходимо заполнить'),
  name: yup.string().required('Необходимо заполнить'),
  kind: yup
    .mixed<PropertyKind>()
    .oneOf(['TEXT', 'INTEGER', 'DECIMAL', 'BOOLEAN', 'DATE', 'OPTIONS'])
    .required('Необходимо выбрать'),
  description: yup.string().defined(),
  options: yup
    .array(
      yup.object({
        persisted: yup.boolean().required(),
        code: yup.string().required('Необходимо заполнить'),
        name: yup.string().required('Необходимо заполнить'),
        metadata: yup
          .array(
            yup.object({
              valueType: yup
                .mixed<'TEXT' | 'ICON' | 'COLOR' | 'IMAGE'>()
                .oneOf(['TEXT', 'ICON', 'COLOR', 'IMAGE'])
                .required('Необходимо выбрать'),
              textValue: yup
                .string()
                .nullable()
                .when('valueType', {
                  is: (type: string) => type === 'TEXT' || type === 'ICON',
                  then: (field) =>
                    field
                      .required('Необходимо заполнить значение')
                      .test('not-blank', 'Необходимо заполнить значение', (value) => Boolean(value?.trim())),
                }),
              colorValue: yup
                .string()
                .nullable()
                .when('valueType', {
                  is: 'COLOR',
                  then: (field) =>
                    field
                      .required('Необходимо заполнить значение')
                      .matches(/^#[0-9A-Fa-f]{6}(?:[0-9A-Fa-f]{2})?$/, 'Неверный формат цвета'),
                }),
              imageUuid: yup
                .string()
                .nullable()
                .when('valueType', {
                  is: 'IMAGE',
                  then: (field) => field.required('Необходимо выбрать изображение').uuid('Неверный формат'),
                }),
            }),
          )
          .required(),
      }),
    )
    .when('kind', { is: (kind: string) => kind !== 'OPTIONS', then: (field) => field.transform(() => []) })
    .test('required-for-options', 'Нужно добавить хотя бы одну опцию', function (options) {
      return this.parent.kind !== 'OPTIONS' || Boolean(options?.length);
    })
    .test('unique-option-code', 'Коды опций не должны повторяться', (options) => {
      const codes = (options ?? []).map((option) => option.code.trim()).filter(Boolean);
      return new Set(codes).size === codes.length;
    })
    .required(),
});
