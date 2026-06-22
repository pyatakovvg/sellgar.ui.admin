import { useController } from '@tiyn/app';
import { UpdateCategoryDto } from '@library/domain';

import { CategoryControllerInterface } from '../classes/controller/category-controller.interface.ts';

export const useUpdateRequest = () => {
  const controller = useController(CategoryControllerInterface);

  return (async (uuid: string, data: UpdateCategoryDto) => {
    return await controller.update(uuid, data);
  });
};
