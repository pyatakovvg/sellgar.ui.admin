import * as yup from 'yup';

export const schema = yup
  .object({
    uuid: yup.string().uuid().optional(),
    name: yup.string().required('Необходимо заполнить'),
    categoryUuid: yup.string().uuid().required('Необходимо заполнить'),
    brandUuid: yup.string().uuid().required('Необходимо заполнить'),
    properties: yup
      .array()
      .of(
        yup.object({
          propertyUuid: yup.string().uuid().required('Необходимо выбрать'),
          value: yup.string().required('Необходимо заполнить'),
        }),
      )
      .required('Необходимо заполнить'),
    variants: yup
      .array()
      .of(
        yup.object({
          article: yup.string().required('Необходимо заполнить'),
          name: yup.string().required('Необходимо заполнить'),
          description: yup.string().required('Необходимо заполнить'),
        }),
      )
      .required('Необходимо заполнить'),
    description: yup.string().required('Необходимо заполнить'),
  })
  .required();
