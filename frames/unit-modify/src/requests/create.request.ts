import { useController } from '@tiyn/app';

import { CreateUnitDto } from '../classes/controller/dto/create-unit.dto.ts';
import { UnitControllerInterface } from '../classes/controller/unit-controller.interface.ts';

export const useCreateRequest = () => {
  const controller = useController(UnitControllerInterface);

  return ((data: CreateUnitDto) => controller.create(data));
};
