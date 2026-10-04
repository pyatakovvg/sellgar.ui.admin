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
  kind: yup.mixed<PropertyKind>()
    .oneOf(['TEXT', 'INTEGER', 'DECIMAL', 'BOOLEAN', 'DATE', 'OPTIONS'])
    .required('Необходимо выбрать'),
  description: yup.string().defined(),
  options: yup.array(yup.object({
    persisted: yup.boolean().required(),
    code: yup.string().required('Необходимо заполнить'),
    name: yup.string().required('Необходимо заполнить'),
    metadata: yup.array(yup.object({
      valueType: yup.mixed<'TEXT' | 'ICON' | 'COLOR' | 'IMAGE'>()
        .oneOf(['TEXT', 'ICON', 'COLOR', 'IMAGE'])
        .required('Необходимо выбрать'),
      textValue: yup.string().nullable().optional(),
      colorValue: yup.string().nullable().optional(),
      imageUuid: yup.string().uuid('Неверный формат').nullable().optional(),
    }).test('metadata-value', 'Необходимо заполнить значение', (metadata) => {
      if (!metadata) return false;
      if (metadata.valueType === 'COLOR') return /^#[0-9A-Fa-f]{6}(?:[0-9A-Fa-f]{2})?$/.test(metadata.colorValue ?? '');
      if (metadata.valueType === 'IMAGE') return Boolean(metadata.imageUuid);
      return Boolean(metadata.textValue?.trim());
    })).required(),
  }))
    .test('required-for-options', 'Нужно добавить хотя бы одну опцию', function (options) {
      return this.parent.kind !== 'OPTIONS' || Boolean(options?.length);
    })
    .test('unique-option-code', 'Коды опций не должны повторяться', (options) => {
      const codes = (options ?? []).map((option) => option.code.trim()).filter(Boolean);
      return new Set(codes).size === codes.length;
    })
    .required(),
});
