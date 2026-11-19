import type { IFormData } from '../../../form.schema.ts';

export class OptionFactory {
  static create(): IFormData['options'][number] {
    return {
      persisted: false,
      code: '',
      name: '',
      metadata: [],
    };
  }
}
