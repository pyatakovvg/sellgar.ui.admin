import { PropertyEntity, PropertyServiceInterface } from '@library/domain';
import { Inject, Injectable, updateEntity } from '@sellgar/app';

import type { PropertySaveInput } from './input/property-save.input.ts';
import { PropertySaveMapper } from './mapper/property-save.mapper.ts';
import { PropertySaveServiceInterface } from './property-save-service.interface.ts';

@Injectable()
export class PropertySaveService implements PropertySaveServiceInterface {
  constructor(@Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface) {}

  create(input: PropertySaveInput): Promise<PropertyEntity> {
    return this.propertyService.create(PropertySaveMapper.create(input));
  }

  async update(code: string, input: PropertySaveInput): Promise<PropertyEntity> {
    let property = await this.propertyService.update(code, PropertySaveMapper.update(input));
    updateEntity(PropertyEntity, property);

    for (const option of input.options) {
      const persisted = property.options.some((savedOption) => savedOption.code === option.code);
      property = persisted
        ? await this.propertyService.updateOption(
            code,
            option.code,
            PropertySaveMapper.updateOption(option, property.version),
          )
        : await this.propertyService.createOption(code, property.version, PropertySaveMapper.option(option));
      updateEntity(PropertyEntity, property);
    }
    return property;
  }
}
