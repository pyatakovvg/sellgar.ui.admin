import { useRequest, useWidgetController } from '@library/app';
import { UnitControllerInterface } from '../classes/controller/unit-controller.interface.ts';

export const useFindByUuidRequest = () => {
  const controller = useWidgetController(UnitControllerInterface);

  return useRequest((uuid: string) => controller.findByUuid(uuid));
};
