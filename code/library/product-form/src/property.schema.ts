import { PropertyKind } from '@library/domain';
import * as Yup from 'yup';

import type { ProductPropertyFormInput } from './property-form.input.ts';

const hasValue = (value: unknown): boolean => {
  return typeof value === 'boolean' || (typeof value === 'string' && value.length > 0);
};

export const propertySchema = Yup.object({
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
