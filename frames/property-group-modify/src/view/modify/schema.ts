import * as yup from 'yup';

interface IForm {
  name: string;
  description: string;
}

export const schema = yup.object({
  name: yup.string().required('Необходимо заполнить'),
  description: yup.string().required('Необходимо заполнить'),
}) as yup.ObjectSchema<IForm>;

export type IFormData = yup.InferType<typeof schema>;
