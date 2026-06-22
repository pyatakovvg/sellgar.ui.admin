import { useController } from '@tiyn/app';

import { CreatePropertyGroupDto } from '../classes/controller/dto/create-property-group.dto.ts';
import { PropertyGroupModifyControllerInterface } from '../classes/controller/property-group-modify-controller.interface.ts';

export const useCreateRequest = () => {
  const controller = useController(PropertyGroupModifyControllerInterface);

  return (async (data: CreatePropertyGroupDto) => {
    return await controller.create(data);
  });
};
