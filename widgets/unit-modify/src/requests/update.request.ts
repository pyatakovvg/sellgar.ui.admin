import { useRequest, useWidgetController } from '@library/app';

import { UpdateUnitDto } from '../classes/controller/dto/update-unit.dto.ts';
import { UnitControllerInterface } from '../classes/controller/unit-controller.interface.ts';

export const useUpdateRequest = () => {
  const controller = useWidgetController(UnitControllerInterface);

  return useRequest((uuid: string, data: UpdateUnitDto) => controller.update(uuid, data));
};
