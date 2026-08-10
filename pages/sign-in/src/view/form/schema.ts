import * as yup from 'yup';

import type { SignInInput } from '../../classes/controller/sign-in/input/sign-in.input.ts';

export const schema: yup.ObjectSchema<SignInInput> = yup
  .object({
    login: yup.string().email('Неверный формат').required('Необходимо заполнить'),
    password: yup.string().required('Неверный формат'),
  })
  .required();
