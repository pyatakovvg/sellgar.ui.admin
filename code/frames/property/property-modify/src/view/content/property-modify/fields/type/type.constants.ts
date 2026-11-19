import type { IFormData } from '../../form.schema.ts';

export const propertyTypes: Array<{ code: IFormData['kind']; name: string }> = [
  { code: 'TEXT', name: 'Текст' },
  { code: 'INTEGER', name: 'Целое число' },
  { code: 'DECIMAL', name: 'Десятичное число' },
  { code: 'BOOLEAN', name: 'Да/нет' },
  { code: 'DATE', name: 'Дата' },
  { code: 'OPTIONS', name: 'Список' },
];
