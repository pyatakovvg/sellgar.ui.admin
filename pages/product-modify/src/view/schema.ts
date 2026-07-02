import * as yup from 'yup';

interface IForm {
  name: string;
  brandUuid: string;
  categoryUuid: string;
  description: string;
  properties: {
    uuid?: string;
    propertyUuid: string;
    value: string;
    order: number;
  }[];
  variants: {
    images: {
      uuid?: string;
      localId?: string;
      imageUuid?: string;
      file?: File;
      fileName?: string;
      alt?: string | null;
    }[];
    uuid?: string;
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
  properties: yup.array().of(
    yup.object({
      uuid: yup.string().optional(),
      propertyUuid: yup.string().uuid().required('Необходимо выбрать'),
      value: yup.string().required('Необходимо заполнить'),
      order: yup.number(),
    }),
  ),
  variants: yup.array().of(
    yup.object({
      images: yup.array().of(
        yup.object({
          uuid: yup.string().optional(),
          localId: yup.string().optional(),
          imageUuid: yup.string().optional(),
          file: yup.mixed<File>().optional(),
          fileName: yup.string().optional(),
          alt: yup.string().nullable().optional(),
        }),
      ),
      uuid: yup.string().optional(),
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
