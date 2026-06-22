import { useController } from '@tiyn/app';
import { UnitControllerInterface } from '../classes/controller/unit-controller.interface.ts';

export const useFindByUuidRequest = () => {
  const controller = useController(UnitControllerInterface);

  return ((uuid: string) => controller.findByUuid(uuid));
};
