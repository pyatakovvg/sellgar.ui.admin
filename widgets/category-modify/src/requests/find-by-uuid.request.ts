import { useRequest, useWidgetController } from '@library/app';

import { CategoryControllerInterface } from '../classes/controller/category-controller.interface.ts';

export const useFindByUuidRequest = () => {
  const controller = useWidgetController(CategoryControllerInterface);

  return useRequest((uuid?: string) => controller.findByUuid(uuid));
};
