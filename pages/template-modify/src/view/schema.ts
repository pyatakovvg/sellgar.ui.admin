import * as Yup from 'yup';

import type { TemplateFieldFormInput, TemplateFormInput } from '../classes/controller/input/template-form.input.ts';

const fieldSchema: Yup.ObjectSchema<TemplateFieldFormInput> = Yup.object({
  propertyCode: Yup.string().required('Необходимо выбрать свойство'),
  required: Yup.boolean().required(),
  multiple: Yup.boolean().required(),
});

const fieldsSchema = Yup.array()
  .of(fieldSchema)
  .test('unique-property', 'Свойство не должно повторяться', (fields) => {
    const codes = (fields ?? []).map((field) => field.propertyCode).filter(Boolean);
    return new Set(codes).size === codes.length;
  })
  .required();

export const schema: Yup.ObjectSchema<TemplateFormInput> = Yup.object({
  uuid: Yup.string().uuid().optional(),
  version: Yup.number().integer().min(1).optional(),
  name: Yup.string().trim().required('Необходимо заполнить'),
  productFields: fieldsSchema,
  variantFields: fieldsSchema,
});
