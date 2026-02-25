import { useRequest, useWidgetController } from '@library/app';
import { PropertyGroupModifyControllerInterface } from '../classes/controller/property-group-modify-controller.interface.ts';

export const useFindByUuidRequest = () => {
  const controller = useWidgetController(PropertyGroupModifyControllerInterface);

  return useRequest((uuid: string) => controller.findByUuid(uuid));
};
