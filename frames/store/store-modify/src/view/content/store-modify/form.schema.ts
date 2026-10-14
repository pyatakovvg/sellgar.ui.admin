import * as yup from 'yup';

export interface IFormData {
  shopUuid: string;
  productUuid: string;
  showing: boolean;
  offers: {
    uuid?: string;
    variantUuid: string;
    currentPrice: {
      value: string;
      currencyCode: string;
    };
    showing: boolean;
    records: {
      uuid?: string;
      article: string;
      clarifications: { value: string }[];
    }[];
  }[];
}

const priceSchema = yup.object({
  value: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, 'Некорректная цена')
    .required('Необходимо заполнить'),
  currencyCode: yup.string().required('Необходимо выбрать'),
});

const recordSchema = yup.object({
  uuid: yup.string().optional(),
  article: yup
    .string()
    .trim()
    .max(256, 'Не более 256 символов')
    .defined()
    .when('uuid', {
      is: (uuid: string | undefined) => Boolean(uuid),
      then: (field) => field.required('Укажите артикул'),
    }),
  clarifications: yup
    .array()
    .of(
      yup.object({
        value: yup.string().trim().max(4096, 'Не более 4096 символов').required('Укажите уточнение'),
      }),
    )
    .required(),
});

export const schema: yup.ObjectSchema<IFormData> = yup.object({
  shopUuid: yup.string().required('Необходимо выбрать'),
  productUuid: yup.string().required('Необходимо выбрать'),
  showing: yup.boolean().required('Необходимо выбрать'),
  offers: yup
    .array()
    .of(
      yup.object({
        uuid: yup.string().optional(),
        variantUuid: yup.string().required('Необходимо выбрать'),
        currentPrice: priceSchema,
        showing: yup.boolean().required('Необходимо выбрать'),
        records: yup.array().of(recordSchema).min(1, 'Нужна хотя бы одна учетная запись').required(),
      }),
    )
    .min(1, 'У товара должен быть хотя бы один вариант')
    .required('У товара должен быть хотя бы один вариант'),
});
