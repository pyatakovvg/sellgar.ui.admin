import { useRequest, useWidgetController } from '@library/app';
import { UpdateCategoryDto } from '@library/domain';

import { CategoryControllerInterface } from '../classes/controller/category-controller.interface.ts';

export const useUpdateRequest = () => {
  const controller = useWidgetController(CategoryControllerInterface);

  return useRequest(async (uuid: string, data: UpdateCategoryDto) => {
    return await controller.update(uuid, data);
  });
};
