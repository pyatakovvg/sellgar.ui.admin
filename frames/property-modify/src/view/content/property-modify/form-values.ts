import { CreatePropertyDto, PropertyEntity, UpdatePropertyDto } from '@library/domain';

import type { IFormData } from './form.schema.ts';

type OptionMetadata = IFormData['options'][number]['metadata'][number];

export const propertyTypes: Array<{ code: PropertyEntity['type']; name: string }> = [
  { code: 'TEXT', name: 'Текст' },
  { code: 'NUMBER', name: 'Число' },
  { code: 'BOOLEAN', name: 'Да/нет' },
  { code: 'OPTION', name: 'Опция' },
  { code: 'DATE', name: 'Дата' },
];

export const metadataValueTypes: Array<{ code: OptionMetadata['valueType']; name: string }> = [
  { code: 'TEXT', name: 'Текст' },
  { code: 'COLOR', name: 'Цвет' },
  { code: 'IMAGE', name: 'Изображение' },
  { code: 'ICON', name: 'Иконка' },
];

export const createEmptyOptionMetadata = (): OptionMetadata => ({
  valueType: 'COLOR',
  textValue: '',
  colorValue: '#000000',
  fileUuid: null,
  iconCode: '',
});

export const createEmptyOption = (): IFormData['options'][number] => ({
  code: '',
  name: '',
  metadata: [],
});

export const createDefaultValues = (property?: PropertyEntity): IFormData => {
  return {
    unitUuid: property?.type === 'NUMBER' ? property.unitUuid ?? undefined : undefined,
    code: property?.code ?? '',
    name: property?.name ?? '',
    type: property?.type ?? 'TEXT',
    description: property?.description ?? '',
    options:
      property?.type === 'OPTION'
        ? property.options?.map((option) => ({
            uuid: option.uuid,
            code: option.code,
            name: option.name,
            metadata:
              option.metadata?.map((metadata) => ({
                uuid: metadata.uuid,
                valueType: metadata.valueType,
                textValue: metadata.textValue,
                colorValue: metadata.colorValue,
                fileUuid: metadata.fileUuid,
                iconCode: metadata.iconCode,
              })) ?? [],
          })) ?? []
        : [],
  };
};

const createMetadataPayload = (metadata: OptionMetadata, sortOrder: number) => {
  const base = {
    uuid: metadata.uuid,
    valueType: metadata.valueType,
    sortOrder,
    textValue: null,
    colorValue: null,
    fileUuid: null,
    iconCode: null,
  };

  switch (metadata.valueType) {
    case 'TEXT':
      return { ...base, textValue: metadata.textValue ?? '' };
    case 'COLOR':
      return { ...base, colorValue: metadata.colorValue ?? '' };
    case 'IMAGE':
      return { ...base, fileUuid: metadata.fileUuid || null };
    case 'ICON':
      return { ...base, iconCode: metadata.iconCode ?? '' };
  }
};

export const createPropertyPayload = (values: IFormData, property?: PropertyEntity): CreatePropertyDto | UpdatePropertyDto => {
  const payload: CreatePropertyDto = {
    unitUuid: values.type === 'NUMBER' ? values.unitUuid || undefined : undefined,
    code: values.code,
    name: values.name,
    type: values.type,
    description: values.description,
    options:
      values.type === 'OPTION'
        ? values.options.map((option, optionOrder) => ({
            uuid: option.uuid,
            code: option.code,
            name: option.name,
            sortOrder: optionOrder,
            metadata: option.metadata.map((metadata, metadataOrder) => createMetadataPayload(metadata, metadataOrder)),
          }))
        : [],
  };

  if (!property) {
    return payload;
  }

  return {
    ...payload,
    uuid: property.uuid,
    version: property.version,
  };
};
