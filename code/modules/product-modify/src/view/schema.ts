import { PropertyKind } from '@library/domain';
import * as Yup from 'yup';

import type {
  ProductFormInput,
  ProductPropertyFormInput,
} from '../classes/controller/product/input/product-form.input.ts';

const hasValue = (value: unknown): boolean => {
  return typeof value === 'boolean' || (typeof value === 'string' && value.length > 0);
};

const propertySchema = Yup.object({
  propertyCode: Yup.string().required(),
  propertyName: Yup.string().required(),
  kind: Yup.mixed<PropertyKind>().oneOf(Object.values(PropertyKind)).required(),
  unitCode: Yup.string().nullable().defined(),
  required: Yup.boolean().required(),
  multiple: Yup.boolean().required(),
  options: Yup.array()
    .of(Yup.object({ code: Yup.string().required(), name: Yup.string().required() }))
    .required(),
  values: Yup.array()
    .of(Yup.object({ value: Yup.mixed<string | boolean>().nullable().defined() }))
    .min(1)
    .required()
    .test('required-property', 'Необходимо заполнить', function (values) {
      const property = this.parent as ProductPropertyFormInput;
      return !property.required || values.some((item) => hasValue(item.value));
    })
    .test('single-property', 'Свойство допускает только одно значение', function (values) {
      const property = this.parent as ProductPropertyFormInput;
      return property.multiple || values.filter((item) => hasValue(item.value)).length <= 1;
    })
    .test('value-format', 'Некорректное значение', function (values) {
      const property = this.parent as ProductPropertyFormInput;
      const filled = values.filter((item) => hasValue(item.value));

      if (property.kind === PropertyKind.INTEGER) {
        return filled.every((item) => typeof item.value === 'string' && /^-?\d+$/.test(item.value));
      }
      if (property.kind === PropertyKind.DECIMAL) {
        return filled.every(
          (item) => typeof item.value === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/.test(item.value),
        );
      }
      if (property.kind === PropertyKind.BOOLEAN) {
        return filled.every((item) => typeof item.value === 'boolean');
      }
      if (property.kind === PropertyKind.DATE) {
        return filled.every((item) => typeof item.value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.value));
      }
      return filled.every((item) => typeof item.value === 'string');
    }),
});

export const schema: Yup.ObjectSchema<ProductFormInput> = Yup.object({
  uuid: Yup.string().uuid().optional(),
  version: Yup.number().integer().min(1).optional(),
  typeUuid: Yup.string().uuid('Необходимо выбрать').required('Необходимо выбрать'),
  typeVersion: Yup.number().integer().min(1).required('Необходимо выбрать тип товара'),
  name: Yup.string().required('Необходимо заполнить'),
  brandCode: Yup.string().required('Необходимо выбрать'),
  description: Yup.string().defined(),
  properties: Yup.array().of(propertySchema).required(),
  variants: Yup.array()
    .of(
      Yup.object({
        uuid: Yup.string().uuid().optional(),
        name: Yup.string().required('Необходимо заполнить'),
        description: Yup.string().defined(),
        images: Yup.array()
          .of(
            Yup.object({
              imageUuid: Yup.string().uuid().optional(),
              file: Yup.mixed<File>().optional(),
              sortOrder: Yup.number().integer().min(0).optional(),
            }),
          )
          .required(),
        properties: Yup.array().of(propertySchema).required(),
      }),
    )
    .min(1, 'Необходимо добавить вариант')
    .required(),
});

export type IFormData = ProductFormInput;
