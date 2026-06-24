import { useController } from '@tiyn/app';
import { PropertyModifyControllerInterface } from '../classes/controller/property-modify-controller.interface.ts';

export const useUnits = () => {
  const controller = useController(PropertyModifyControllerInterface);

  return controller.formStore.units;
};
