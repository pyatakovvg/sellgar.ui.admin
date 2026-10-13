import type { IFormData } from '../../../../../../form.schema.ts';

export const metadataValueTypes: Array<{
  code: IFormData['options'][number]['metadata'][number]['valueType'];
  name: string;
}> = [
  { code: 'TEXT', name: 'Текст' },
  { code: 'ICON', name: 'Иконка' },
  { code: 'COLOR', name: 'Цвет' },
  { code: 'IMAGE', name: 'Изображение' },
];
