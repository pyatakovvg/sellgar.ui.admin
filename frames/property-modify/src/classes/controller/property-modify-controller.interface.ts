import { PropertyEntity } from '@library/domain';
import { type FrameControllerInterface, type FrameControllerLoaderArgs } from '@tiyn/app';
import { type PropertyModifyFrameParams } from '../../property-modify.frame.tsx';

import { CreatePropertyDto } from './dto/create-property.dto.ts';
import { UpdatePropertyDto } from './dto/update-property.dto.ts';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';

export abstract class PropertyModifyControllerInterface implements FrameControllerInterface<PropertyModifyFrameParams> {
  abstract formStore: FormStoreInterface;

  abstract loader(args: FrameControllerLoaderArgs<PropertyModifyFrameParams>): Promise<PropertyEntity>;
  abstract findByUuid(uuid?: string): Promise<PropertyEntity>;

  abstract create(data: CreatePropertyDto): Promise<PropertyEntity>;
  abstract update(uuid: string, data: UpdatePropertyDto): Promise<PropertyEntity>;
}
