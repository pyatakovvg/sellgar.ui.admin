import type { IFormData } from '../../../../../form.schema.ts';

export class MetadataFactory {
  static create(): IFormData['options'][number]['metadata'][number] {
    return {
      valueType: 'COLOR',
      textValue: '',
      colorValue: '#000000',
      imageUuid: null,
    };
  }
}
