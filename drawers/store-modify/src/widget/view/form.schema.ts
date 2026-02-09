import * as yup from 'yup';

interface IForm {
  article: string;
  shopUuid: string;
  variantUuid: string;
  currentPrice: {
    value: number;
    currencyCode: string;
  };
  count: number;
  showing: boolean;
}

export const schema = yup.object({
  article: yup.string().required('Необходимо заполнить'),
  shopUuid: yup.string().required('Необходимо выбрать'),
  variantUuid: yup.string().required('Необходимо выбрать'),
  currentPrice: yup.object({
    value: yup.number().required('Необходимо заполнить'),
    currencyCode: yup.string().required('Необходимо выбрать'),
  }),
  count: yup.number().required('Необходимо заполнить'),
  showing: yup.boolean().required('Необходимо выбрать'),
}) as yup.ObjectSchema<IForm>;

export type IFormData = yup.InferType<typeof schema>;
