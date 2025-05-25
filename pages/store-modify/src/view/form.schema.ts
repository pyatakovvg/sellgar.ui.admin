import * as yup from 'yup';

export const formSchema = yup
  .object({
    variantUuid: yup.string().required('Необходимо выбрать'),
    price: yup.string().required('Необходимо заполнить').optional(),
    count: yup.string().required('Необходимо заполнить'),
    showing: yup.boolean().required('Необходимо выбрать'),
  })
  .required();
