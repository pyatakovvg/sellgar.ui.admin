import { useController } from '@tiyn/app';
import { PropertyGroupModifyControllerInterface } from '../classes/controller/property-group-modify-controller.interface.ts';

export const useFindByUuidRequest = () => {
  const controller = useController(PropertyGroupModifyControllerInterface);

  return ((uuid: string) => controller.findByUuid(uuid));
};
