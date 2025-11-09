import * as yup from 'yup';

export const schema = yup.object({
  code: yup.string().required('Необходимо заполнить'),
  name: yup.string().required('Необходимо заполнить'),
  description: yup.string().required('Необходимо заполнить'),
});
