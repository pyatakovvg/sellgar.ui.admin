import type { PropertyEntity, PropertyOptionExtraInput } from '@library/domain';
import type { PropertySaveInput } from '../../../../classes/service/property-save/input/property-save.input.ts';
import type { IFormData } from '../form.schema.ts';

type OptionMetadata = IFormData['options'][number]['metadata'][number];

export class PropertyFormSerializer {
  static serialize(values: IFormData, property?: PropertyEntity): PropertySaveInput {
    return {
      code: values.code,
      name: values.name,
      description: values.description || null,
      kind: values.kind,
      unitCode: values.kind === 'INTEGER' || values.kind === 'DECIMAL' ? values.unitCode || null : null,
      version: property?.version,
      options:
        values.kind === 'OPTIONS'
          ? values.options.map((option, optionOrder) => ({
              code: option.code,
              name: option.name,
              sortOrder: optionOrder,
              extras: option.metadata.map((metadata, index) => this.extra(metadata, index)),
            }))
          : [],
    };
  }
  private static extra(metadata: OptionMetadata, sortOrder: number): PropertyOptionExtraInput {
    if (metadata.valueType === 'COLOR') {
      return { type: 'COLOR', sortOrder, valueColor: metadata.colorValue ?? '' };
    }
    if (metadata.valueType === 'IMAGE') {
      return { type: 'IMAGE', sortOrder, imageUuid: metadata.imageUuid ?? '' };
    }
    return {
      type: 'TEXT',
      sortOrder,
      textDisplay: metadata.valueType === 'ICON' ? 'ICON' : 'TEXT',
      valueText: metadata.textValue ?? '',
    };
  }
}
