import * as yup from 'yup';

interface IForm {
  shopUuid: string;
  productUuid: string;
  showing: boolean;
  offers: {
    uuid?: string;
    variantUuid: string;
    article: string;
    currentPrice: {
      value: string;
      currencyCode: string;
    };
    showing: boolean;
  }[];
}

const priceSchema = yup.object({
  value: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, 'Некорректная цена')
    .required('Необходимо заполнить'),
  currencyCode: yup.string().required('Необходимо выбрать'),
});

export const schema = yup.object({
  shopUuid: yup.string().required('Необходимо выбрать'),
  productUuid: yup.string().required('Необходимо выбрать'),
  showing: yup.boolean().required('Необходимо выбрать'),
  offers: yup
    .array()
    .of(
      yup.object({
        uuid: yup.string().optional(),
        variantUuid: yup.string().required('Необходимо выбрать'),
        article: yup.string().required('Необходимо заполнить'),
        currentPrice: priceSchema,
        showing: yup.boolean().required('Необходимо выбрать'),
      }),
    )
    .min(1, 'У товара должен быть хотя бы один вариант')
    .required('У товара должен быть хотя бы один вариант'),
}) as yup.ObjectSchema<IForm>;

export type IFormData = yup.InferType<typeof schema>;
