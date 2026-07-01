import * as yup from 'yup';

export interface AdjustInventoryFormData {
  quantity: number;
  reason: string;
}

export const schema = yup.object({
  quantity: yup
    .number()
    .typeError('Необходимо указать число')
    .integer('Количество должно быть целым числом')
    .min(0, 'Количество не может быть меньше нуля')
    .required('Необходимо указать количество'),
  reason: yup.string().default(''),
}) as yup.ObjectSchema<AdjustInventoryFormData>;
