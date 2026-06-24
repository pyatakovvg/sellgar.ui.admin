import { useController } from '@tiyn/app';

import { UpdateUnitDto } from '../classes/controller/dto/update-unit.dto.ts';
import { UnitControllerInterface } from '../classes/controller/unit-controller.interface.ts';

export const useUpdateRequest = () => {
  const controller = useController(UnitControllerInterface);

  return ((uuid: string, data: UpdateUnitDto) => controller.update(uuid, data));
};
