import * as yup from 'yup';

export interface IFormData {
  name: string;
}

export const schema = yup.object({
  name: yup.string().required('Необходимо заполнить'),
}) as yup.ObjectSchema<IFormData>;
