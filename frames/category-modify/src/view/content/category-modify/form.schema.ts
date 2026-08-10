import * as yup from 'yup';

import type { CategoryModifyActionPayload } from '../../../classes/controller/category-modify/category-modify-controller.interface.ts';

export interface IFormData {
  parentUuid?: string;
  code: string;
  name: string;
  description: string;
  image?: CategoryModifyActionPayload['image'] | null;
}

export const schema: yup.ObjectSchema<IFormData> = yup.object({
  parentUuid: yup.string().uuid().optional(),
  code: yup.string().required('Необходимо заполнить'),
  name: yup.string().required('Необходимо заполнить'),
  description: yup.string().required('Необходимо заполнить'),
  image: yup.mixed().nullable().optional(),
});
