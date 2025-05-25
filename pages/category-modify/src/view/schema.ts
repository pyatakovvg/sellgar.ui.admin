import * as yup from 'yup';

export const schema = yup
  .object({
    uuid: yup.string().optional(),
    parentUuid: yup.string().nullable().optional(),
    name: yup.string().required('Необходимо заполнить'),
    description: yup.string().required('Необходимо заполнить'),
  })
  .required();
