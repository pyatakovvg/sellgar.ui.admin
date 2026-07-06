import { PropertyEntity } from '@library/domain';

import * as yup from 'yup';

export interface IFormData {
  unitUuid?: string;
  code: string;
  name: string;
  type: PropertyEntity['type'];
  description: string;
  options: Array<{
    uuid?: string;
    code: string;
    name: string;
    metadata: Array<{
      uuid?: string;
      valueType: 'TEXT' | 'COLOR' | 'IMAGE' | 'ICON';
      textValue?: string | null;
      colorValue?: string | null;
      fileUuid?: string | null;
      iconCode?: string | null;
    }>;
  }>;
}

export const schema = yup.object({
  unitUuid: yup.string().uuid('Неверный формат').optional(),
  code: yup.string().required('Необходимо заполнить'),
  name: yup.string().required('Необходимо заполнить'),
  type: yup.mixed<PropertyEntity['type']>().oneOf(['TEXT', 'NUMBER', 'BOOLEAN', 'OPTION', 'DATE']).required('Необходимо выбрать'),
  description: yup.string().required('Необходимо заполнить'),
  options: yup
    .array(
      yup.object({
        uuid: yup.string().uuid().optional(),
        code: yup.string().required('Необходимо заполнить'),
        name: yup.string().required('Необходимо заполнить'),
        metadata: yup
          .array(
            yup
              .object({
                uuid: yup.string().uuid().optional(),
                valueType: yup
                  .mixed<IFormData['options'][number]['metadata'][number]['valueType']>()
                  .oneOf(['TEXT', 'COLOR', 'IMAGE', 'ICON'])
                  .required('Необходимо выбрать'),
                textValue: yup.string().nullable().optional(),
                colorValue: yup.string().nullable().optional(),
                fileUuid: yup.string().uuid('Неверный формат').nullable().optional(),
                iconCode: yup.string().nullable().optional(),
              })
              .test('metadata-value', 'Необходимо заполнить значение', (metadata) => {
                if (!metadata) {
                  return false;
                }

                switch (metadata.valueType) {
                  case 'TEXT':
                    return Boolean(metadata.textValue?.trim());
                  case 'COLOR':
                    return /^#[0-9A-Fa-f]{6}$/.test(metadata.colorValue ?? '');
                  case 'IMAGE':
                    return Boolean(metadata.fileUuid);
                  case 'ICON':
                    return Boolean(metadata.iconCode?.trim());
                  default:
                    return false;
                }
              }),
          )
          .required(),
      }),
    )
    .test('required-for-option', 'Нужно добавить хотя бы одну опцию', function (options) {
      return this.parent.type !== 'OPTION' || Boolean(options?.length);
    })
    .test('unique-option-code', 'Коды опций не должны повторяться', (options) => {
      const codes = (options ?? []).map((option) => option.code.trim()).filter(Boolean);

      return new Set(codes).size === codes.length;
    })
    .required(),
}) as yup.ObjectSchema<IFormData>;
