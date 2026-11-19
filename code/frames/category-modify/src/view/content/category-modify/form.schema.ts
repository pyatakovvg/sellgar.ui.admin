import * as yup from 'yup';

export interface IFormData {
  parentUuid: string | null;
  name: string;
  description: string;
}

export const schema: yup.ObjectSchema<IFormData> = yup.object({
  parentUuid: yup.string().uuid().nullable().defined(),
  name: yup.string().trim().required('Введите название категории').max(512, 'Не более 512 символов'),
  description: yup.string().defined(),
});
