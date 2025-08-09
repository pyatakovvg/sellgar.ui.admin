import * as yup from 'yup';

export const schema = yup
  .object({
    login: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
