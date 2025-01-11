import * as yup from 'yup';

export const schema = yup
  .object({
    uuid: yup.string().uuid().optional(),
    name: yup.string().required('Необходимо заполнить'),
    categoryUuid: yup.string().uuid().required('Необходимо заполнить'),
    brandUuid: yup.string().uuid().required('Необходимо заполнить'),
    price: yup
      .number()
      .typeError('Цена должна быть числом')
      .min(1, 'Цена должна быть больше ноля')
      .positive('Цена должна быть положительным числом')
      .optional(),
    variants: yup
      .array()
      .of(
        yup.object().shape({
          article: yup.string().required('Необходимо заполнить'),
          name: yup.string().required('Необходимо заполнить'),
          description: yup.string().required('Необходимо заполнить'),
        }),
      )
      .required(),
    properties: yup
      .array()
      .of(
        yup.object().shape({
          propertyUuid: yup.string().uuid().required('Необходимо выбрать'),
          value: yup.string().required('Необходимо заполнить'),
        }),
      )
      .required(),
    description: yup.string().required('Необходимо заполнить'),
  })
  .required();
