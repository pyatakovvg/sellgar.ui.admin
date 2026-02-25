import { useWidgetController } from '@library/app';
import { PropertyModifyControllerInterface } from '../classes/controller/property-modify-controller.interface.ts';

export const useUnits = () => {
  const controller = useWidgetController(PropertyModifyControllerInterface);

  return controller.formStore.units;
};
