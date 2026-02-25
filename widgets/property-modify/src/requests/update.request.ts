import { useRequest, useWidgetController } from '@library/app';

import { UpdatePropertyDto } from '../classes/controller/dto/update-property.dto.ts';
import { PropertyModifyControllerInterface } from '../classes/controller/property-modify-controller.interface.ts';

export const useUpdateRequest = () => {
  const controller = useWidgetController(PropertyModifyControllerInterface);

  return useRequest(async (uuid: string, data: UpdatePropertyDto) => {
    return await controller.update(uuid, data);
  });
};
