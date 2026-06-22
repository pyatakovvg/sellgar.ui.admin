import { PropertyGroupEntity } from '@library/domain';
import { type WidgetControllerInterface, type WidgetControllerLoaderArgs } from '@tiyn/app';
import { type PropertyGroupModifyWidgetProps } from '../../widget.context.tsx';

import { CreatePropertyGroupDto } from './dto/create-property-group.dto.ts';
import { UpdatePropertyGroupDto } from './dto/update-property-group.dto.ts';

export abstract class PropertyGroupModifyControllerInterface
  implements WidgetControllerInterface<PropertyGroupModifyWidgetProps>
{
  abstract loader(args: WidgetControllerLoaderArgs<PropertyGroupModifyWidgetProps>): Promise<PropertyGroupEntity | undefined>;
  abstract findByUuid(uuid?: string): Promise<PropertyGroupEntity>;

  abstract create(data: CreatePropertyGroupDto): Promise<PropertyGroupEntity>;
  abstract update(uuid: string, data: UpdatePropertyGroupDto): Promise<PropertyGroupEntity>;
}
