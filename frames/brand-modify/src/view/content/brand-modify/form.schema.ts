import * as yup from 'yup';

import type { BrandModifyActionPayload } from '../../../classes/controller/brand-modify/brand-modify-controller.interface.ts';

export interface IFormData {
  code: string;
  name: string;
  description: string;
  images: NonNullable<BrandModifyActionPayload['images']>;
}

export const schema: yup.ObjectSchema<IFormData> = yup.object({
  code: yup.string().required('Необходимо заполнить'),
  name: yup.string().required('Необходимо заполнить'),
  description: yup.string().defined(),
  images: yup.array().of(yup.mixed().required()).required(),
});
