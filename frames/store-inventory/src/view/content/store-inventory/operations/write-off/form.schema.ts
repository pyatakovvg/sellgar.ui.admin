import * as yup from 'yup';

export interface WriteOffInventoryFormData {
  quantity: number;
  reason: string;
}

export const schema = yup.object({
  quantity: yup
    .number()
    .typeError('Необходимо указать число')
    .integer('Количество должно быть целым числом')
    .min(1, 'Количество списания должно быть больше нуля')
    .required('Необходимо указать количество'),
  reason: yup.string().default(''),
}) as yup.ObjectSchema<WriteOffInventoryFormData>;
