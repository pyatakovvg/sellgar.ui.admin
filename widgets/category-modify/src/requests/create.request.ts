import { useRequest, useWidgetController } from '@library/app';
import { CreateCategoryDto } from '@library/domain';

import { CategoryControllerInterface } from '../classes/controller/category-controller.interface.ts';

export const useCreateRequest = () => {
  const controller = useWidgetController(CategoryControllerInterface);

  return useRequest(async (data: CreateCategoryDto) => {
    await controller.create(data);
  });
};
