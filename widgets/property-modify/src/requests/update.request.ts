import { useController } from '@tiyn/app';

import { UpdatePropertyDto } from '../classes/controller/dto/update-property.dto.ts';
import { PropertyModifyControllerInterface } from '../classes/controller/property-modify-controller.interface.ts';

export const useUpdateRequest = () => {
  const controller = useController(PropertyModifyControllerInterface);

  return (async (uuid: string, data: UpdatePropertyDto) => {
    return await controller.update(uuid, data);
  });
};
