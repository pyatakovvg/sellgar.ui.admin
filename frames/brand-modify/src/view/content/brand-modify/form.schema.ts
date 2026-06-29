import * as yup from 'yup';

import type { BrandModifyActionPayload } from '../../../classes/controller/brand-modify-controller.interface.ts';

export interface IFormData {
  code: string;
  name: string;
  description: string;
  image?: BrandModifyActionPayload['image'] | null;
}

export const schema = yup.object({
  code: yup.string().required('Необходимо заполнить'),
  name: yup.string().required('Необходимо заполнить'),
  description: yup.string().required('Необходимо заполнить'),
  image: yup.mixed().nullable().optional(),
}) as yup.ObjectSchema<IFormData>;
