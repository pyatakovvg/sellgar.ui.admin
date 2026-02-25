import { useRequest, useWidgetController } from '@library/app';

import { CreateUnitDto } from '../classes/controller/dto/create-unit.dto.ts';
import { UnitControllerInterface } from '../classes/controller/unit-controller.interface.ts';

export const useCreateRequest = () => {
  const controller = useWidgetController(UnitControllerInterface);

  return useRequest((data: CreateUnitDto) => controller.create(data));
};
