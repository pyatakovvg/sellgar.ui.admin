import * as yup from 'yup';

export const schema = yup
  .object({
    login: yup.string().email('Неверный формат').required('Необходимо заполнить'),
    password: yup.string().required('Неверный формат'),
  })
  .required();
