import * as yup from 'yup';

import type { SearchFormData } from './form.types.ts';

export const schema: yup.ObjectSchema<SearchFormData> = yup.object({
  term: yup.string().defined().max(256, 'Не более 256 символов'),
});
