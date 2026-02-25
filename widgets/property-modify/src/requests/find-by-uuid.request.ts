import { useRequest, useWidgetController } from '@library/app';
import { PropertyModifyControllerInterface } from '../classes/controller/property-modify-controller.interface.ts';

export const useFindByUuidRequest = () => {
  const controller = useWidgetController(PropertyModifyControllerInterface);

  return useRequest((uuid?: string) => controller.findByUuid(uuid));
};
