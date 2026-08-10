import * as yup from 'yup';

export interface IFormData {
  name: string;
}

export const schema: yup.ObjectSchema<IFormData> = yup.object({
  name: yup.string().required('Необходимо заполнить'),
});
