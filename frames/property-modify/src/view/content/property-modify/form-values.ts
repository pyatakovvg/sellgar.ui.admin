import type { PropertyEntity } from '@library/domain';

import type { PropertyModifyActionPayload } from '../../../classes/controller/property-modify/property-modify-controller.interface.ts';
import type { IFormData, PropertyKind } from './form.schema.ts';

type OptionMetadata = IFormData['options'][number]['metadata'][number];

export const propertyTypes: Array<{ code: PropertyKind; name: string }> = [
  { code: 'TEXT', name: 'Текст' },
  { code: 'INTEGER', name: 'Целое число' },
  { code: 'DECIMAL', name: 'Десятичное число' },
  { code: 'BOOLEAN', name: 'Да/нет' },
  { code: 'DATE', name: 'Дата' },
  { code: 'OPTIONS', name: 'Список' },
];

export const metadataValueTypes: Array<{ code: OptionMetadata['valueType']; name: string }> = [
  { code: 'TEXT', name: 'Текст' },
  { code: 'ICON', name: 'Иконка' },
  { code: 'COLOR', name: 'Цвет' },
  { code: 'IMAGE', name: 'Изображение' },
];

export const createEmptyOptionMetadata = (): OptionMetadata => ({
  valueType: 'COLOR',
  textValue: '',
  colorValue: '#000000',
  imageUuid: null,
});

export const createEmptyOption = (): IFormData['options'][number] => ({
  persisted: false,
  code: '',
  name: '',
  metadata: [],
});

export const createDefaultValues = (property?: PropertyEntity): IFormData => ({
  unitCode: property?.unitCode ?? undefined,
  code: property?.code ?? '',
  name: property?.name ?? '',
  kind: property ? (property.kind as PropertyKind) : 'TEXT',
  description: property?.description ?? '',
  options: property?.options.map((option) => ({
    persisted: true,
    code: option.code,
    name: option.name,
    metadata: option.extras.map((extra) => ({
      valueType: extra.type === 'TEXT' && extra.textDisplay === 'ICON' ? 'ICON' : extra.type,
      textValue: extra.valueText,
      colorValue: extra.valueColor,
      imageUuid: extra.imageUuid,
    })),
  })) ?? [],
});

const createExtra = (metadata: OptionMetadata, sortOrder: number) => {
  if (metadata.valueType === 'COLOR') {
    return { type: 'COLOR' as const, sortOrder, valueColor: metadata.colorValue ?? '' };
  }
  if (metadata.valueType === 'IMAGE') {
    return { type: 'IMAGE' as const, sortOrder, imageUuid: metadata.imageUuid ?? '' };
  }
  return {
    type: 'TEXT' as const,
    sortOrder,
    textDisplay: metadata.valueType === 'ICON' ? ('ICON' as const) : ('TEXT' as const),
    valueText: metadata.textValue ?? '',
  };
};

export const createPropertyPayload = (
  values: IFormData,
  property?: PropertyEntity,
): PropertyModifyActionPayload => ({
  code: values.code,
  name: values.name,
  description: values.description || null,
  kind: values.kind,
  unitCode: values.unitCode || null,
  version: property?.version,
  options: values.kind === 'OPTIONS'
    ? values.options.map((option, optionOrder) => ({
        persisted: option.persisted,
        code: option.code,
        name: option.name,
        sortOrder: optionOrder,
        extras: option.metadata.map(createExtra),
      }))
    : [],
});
