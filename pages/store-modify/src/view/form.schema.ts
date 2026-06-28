import * as yup from 'yup';

interface IForm {
  article: string;
  shopUuid: string;
  variantUuid: string;
  currentPrice: {
    value: string;
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
    value: yup.string().matches(/^\d+(\.\d{1,2})?$/, 'Некорректная цена').required('Необходимо заполнить'),
    currencyCode: yup.string().required('Необходимо выбрать'),
  }),
  count: yup.number().required('Необходимо заполнить'),
  showing: yup.boolean().required('Необходимо выбрать'),
}) as yup.ObjectSchema<IForm>;

export type IFormData = yup.InferType<typeof schema>;
