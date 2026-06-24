import * as yup from 'yup';

interface IForm {
  groupUuid: string;
  unitUuid?: string;
  code: string;
  name: string;
  type: string;
  description: string;
}

export const schema = yup.object({
  groupUuid: yup.string().uuid().required('Необходимо заполнить'),
  unitUuid: yup.string().uuid('Неверный формат').optional(),
  code: yup.string().required('Необходимо заполнить'),
  name: yup.string().required('Необходимо заполнить'),
  type: yup.string().required('Необходимо выбрать'),
  description: yup.string().required('Необходимо заполнить'),
}) as yup.ObjectSchema<IForm>;

export type IFormData = yup.InferType<typeof schema>;
