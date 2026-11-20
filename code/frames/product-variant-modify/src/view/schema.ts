import * as Yup from 'yup';
import { propertySchema } from '@library/product-form';
import type { VariantFormInput } from '../classes/controller/variant-modify/input/variant-form.input.ts';

export const schema: Yup.ObjectSchema<VariantFormInput> = Yup.object({
  version: Yup.number().integer().min(1).required(),
  typeVersion: Yup.number().integer().min(1).required(),
  name: Yup.string().trim().max(256).required('Необходимо заполнить'),
  description: Yup.string().defined(),
  properties: Yup.array().of(propertySchema).required(),
  images: Yup.array()
    .of(
      Yup.object({
        imageUuid: Yup.string().uuid().optional(),
        file: Yup.mixed<File>().optional(),
        sortOrder: Yup.number().integer().min(0).optional(),
      }),
    )
    .required(),
});
