import { useController } from '@tiyn/app';

import { UpdatePropertyGroupDto } from '../classes/controller/dto/update-property-group.dto.ts';
import { PropertyGroupModifyControllerInterface } from '../classes/controller/property-group-modify-controller.interface.ts';

export const useUpdateRequest = () => {
  const controller = useController(PropertyGroupModifyControllerInterface);

  return (async (uuid: string, data: UpdatePropertyGroupDto) => {
    return await controller.update(uuid, data);
  });
};
