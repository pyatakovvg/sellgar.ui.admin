import { useController } from '@tiyn/app';

import { CreatePropertyDto } from '../classes/controller/dto/create-property.dto.ts';
import { PropertyModifyControllerInterface } from '../classes/controller/property-modify-controller.interface.ts';

export const useCreateRequest = () => {
  const controller = useController(PropertyModifyControllerInterface);

  return (async (data: CreatePropertyDto) => {
    return await controller.create(data);
  });
};
