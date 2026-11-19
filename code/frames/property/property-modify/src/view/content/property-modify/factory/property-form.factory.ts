import type { PropertyEntity } from '@library/domain';
import type { IFormData } from '../form.schema.ts';

export class PropertyFormFactory {
  static create(property?: PropertyEntity): IFormData {
    return {
      unitCode: property?.unitCode ?? undefined,
      code: property?.code ?? '',
      name: property?.name ?? '',
      kind: property?.kind ?? 'TEXT',
      description: property?.description ?? '',
      options:
        property?.options.map((option) => ({
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
    };
  }
}
