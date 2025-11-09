import * as yup from 'yup';

interface IForm {
  name: string;
  brandUuid: string;
  categoryUuid: string;
  description: string;
  variants: {
    article: string;
    name: string;
    description: string;
    properties: {
      uuid?: string;
      propertyUuid: string;
      value: string;
      order: number;
    }[];
  }[];
}

export const schema = yup.object({
  name: yup.string().required('Необходимо заполнить'),
  brandUuid: yup.string().required('Необходимо выбрать'),
  categoryUuid: yup.string().required('Необходимо выбрать'),
  description: yup.string().required('Необходимо заполнить'),
  variants: yup.array().of(
    yup.object({
      article: yup.string().required('Необходимо заполнить'),
      name: yup.string().required('Необходимо заполнить'),
      description: yup.string().required('Необходимо заполнить'),
      properties: yup.array().of(
        yup.object({
          propertyUuid: yup.string().uuid().required('Необходимо выбрать'),
          value: yup.string().required('Необходимо заполнить'),
          order: yup.number(),
        }),
      ),
    }),
  ),
}) as yup.ObjectSchema<IForm>;

export type IFormData = yup.InferType<typeof schema>;
