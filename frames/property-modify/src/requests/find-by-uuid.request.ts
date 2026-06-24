import { useController } from '@tiyn/app';
import { PropertyModifyControllerInterface } from '../classes/controller/property-modify-controller.interface.ts';

export const useFindByUuidRequest = () => {
  const controller = useController(PropertyModifyControllerInterface);

  return ((uuid?: string) => controller.findByUuid(uuid));
};
