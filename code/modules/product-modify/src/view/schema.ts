import * as Yup from 'yup';
import { propertySchema } from '@library/product-form';
import type { ProductFormInput } from '../classes/controller/product/input/product-form.input.ts';

export const schema: Yup.ObjectSchema<ProductFormInput> = Yup.object({
  uuid: Yup.string().uuid().optional(),
  version: Yup.number().integer().min(1).optional(),
  typeUuid: Yup.string().uuid('Необходимо выбрать').required('Необходимо выбрать'),
  typeVersion: Yup.number().integer().min(1).required('Необходимо выбрать тип товара'),
  name: Yup.string().required('Необходимо заполнить'),
  brandCode: Yup.string().required('Необходимо выбрать'),
  description: Yup.string().defined(),
  properties: Yup.array().of(propertySchema).required(),
});

export type IFormData = ProductFormInput;
