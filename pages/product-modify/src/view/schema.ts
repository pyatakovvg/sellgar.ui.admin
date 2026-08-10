import * as Yup from 'yup';

import type { ProductFormInput } from '../classes/controller/product/input/product-form.input.ts';

const requiredUuidSelect = () => Yup.string().uuid('Необходимо выбрать').required('Необходимо выбрать');

export const schema: Yup.ObjectSchema<ProductFormInput> = Yup.object({
  uuid: Yup.string().uuid().optional(),
  version: Yup.number().integer().optional(),
  name: Yup.string().required('Необходимо заполнить'),
  brandUuid: Yup.string().required('Необходимо выбрать'),
  categoryUuid: Yup.string().required('Необходимо выбрать'),
  description: Yup.string().required('Необходимо заполнить'),
  properties: Yup.array()
    .of(
      Yup.object({
        uuid: Yup.string().optional(),
        propertyUuid: requiredUuidSelect(),
        optionUuid: Yup.string().uuid('Необходимо выбрать').nullable().optional(),
        value: Yup.string().required('Необходимо заполнить'),
      }),
    )
    .required(),
  variants: Yup.array()
    .of(
      Yup.object({
        images: Yup.array()
          .of(
            Yup.object({
              uuid: Yup.string().optional(),
              imageUuid: Yup.string().optional(),
              file: Yup.mixed<File>().optional(),
              alt: Yup.string().nullable().optional(),
            }),
          )
          .required(),
        uuid: Yup.string().optional(),
        name: Yup.string().required('Необходимо заполнить'),
        description: Yup.string().required('Необходимо заполнить'),
        properties: Yup.array()
          .of(
            Yup.object({
              uuid: Yup.string().optional(),
              propertyUuid: requiredUuidSelect(),
              optionUuid: Yup.string().uuid('Необходимо выбрать').nullable().optional(),
              value: Yup.string().required('Необходимо заполнить'),
            }),
          )
          .required(),
      }),
    )
    .min(1, 'Необходимо добавить вариант')
    .required(),
});

export type IFormData = Yup.InferType<typeof schema>;
