import { PropertyEntity } from '@library/domain';
import { type WidgetControllerInterface, type WidgetControllerLoaderArgs } from '@tiyn/app';
import { type PropertyModifyWidgetProps } from '../../widget.context.tsx';

import { CreatePropertyDto } from './dto/create-property.dto.ts';
import { UpdatePropertyDto } from './dto/update-property.dto.ts';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';

export abstract class PropertyModifyControllerInterface implements WidgetControllerInterface<PropertyModifyWidgetProps> {
  abstract formStore: FormStoreInterface;

  abstract loader(args: WidgetControllerLoaderArgs<PropertyModifyWidgetProps>): Promise<PropertyEntity>;
  abstract findByUuid(uuid?: string): Promise<PropertyEntity>;

  abstract create(data: CreatePropertyDto): Promise<PropertyEntity>;
  abstract update(uuid: string, data: UpdatePropertyDto): Promise<PropertyEntity>;
}
