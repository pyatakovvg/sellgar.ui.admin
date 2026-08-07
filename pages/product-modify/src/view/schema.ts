import * as yup from 'yup';

import type { ProductFormData } from './form-values.ts';

const requiredUuidSelect = () => yup.string().uuid('Необходимо выбрать').required('Необходимо выбрать');

export const schema = yup.object({
  name: yup.string().required('Необходимо заполнить'),
  brandUuid: yup.string().required('Необходимо выбрать'),
  categoryUuid: yup.string().required('Необходимо выбрать'),
  description: yup.string().required('Необходимо заполнить'),
  properties: yup
    .array()
    .of(
      yup.object({
        uuid: yup.string().optional(),
        propertyUuid: requiredUuidSelect(),
        optionUuid: yup.string().uuid('Необходимо выбрать').nullable().optional(),
        value: yup.string().required('Необходимо заполнить'),
      }),
    )
    .required(),
  variants: yup
    .array()
    .of(
      yup.object({
        images: yup
          .array()
          .of(
            yup.object({
              uuid: yup.string().optional(),
              imageUuid: yup.string().optional(),
              file: yup.mixed<File>().optional(),
              alt: yup.string().nullable().optional(),
            }),
          )
          .required(),
        uuid: yup.string().optional(),
        name: yup.string().required('Необходимо заполнить'),
        description: yup.string().required('Необходимо заполнить'),
        properties: yup
          .array()
          .of(
            yup.object({
              uuid: yup.string().optional(),
              propertyUuid: requiredUuidSelect(),
              optionUuid: yup.string().uuid('Необходимо выбрать').nullable().optional(),
              value: yup.string().required('Необходимо заполнить'),
            }),
          )
          .required(),
      }),
    )
    .min(1, 'Необходимо добавить вариант')
    .required(),
}) as yup.ObjectSchema<ProductFormData>;

export type IFormData = yup.InferType<typeof schema>;
