import { PropertyEntity } from '@library/domain';

import * as yup from 'yup';

export interface IFormData {
  groupUuid: string;
  unitUuid?: string;
  code: string;
  name: string;
  type: PropertyEntity['type'];
  description: string;
}

export const schema = yup.object({
  groupUuid: yup.string().uuid().required('Необходимо заполнить'),
  unitUuid: yup.string().uuid('Неверный формат').optional(),
  code: yup.string().required('Необходимо заполнить'),
  name: yup.string().required('Необходимо заполнить'),
  type: yup.mixed<PropertyEntity['type']>().oneOf(['TEXT', 'CHECKBOX', 'RADIO', 'DATE', 'RANGE']).required('Необходимо выбрать'),
  description: yup.string().required('Необходимо заполнить'),
}) as yup.ObjectSchema<IFormData>;
