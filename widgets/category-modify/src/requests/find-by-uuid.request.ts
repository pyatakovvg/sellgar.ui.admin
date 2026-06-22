import { useController } from '@tiyn/app';

import { CategoryControllerInterface } from '../classes/controller/category-controller.interface.ts';

export const useFindByUuidRequest = () => {
  const controller = useController(CategoryControllerInterface);

  return ((uuid?: string) => controller.findByUuid(uuid));
};
