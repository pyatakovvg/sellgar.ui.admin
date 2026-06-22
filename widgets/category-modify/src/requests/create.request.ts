import { useController } from '@tiyn/app';
import { CreateCategoryDto } from '@library/domain';

import { CategoryControllerInterface } from '../classes/controller/category-controller.interface.ts';

export const useCreateRequest = () => {
  const controller = useController(CategoryControllerInterface);

  return (async (data: CreateCategoryDto) => {
    await controller.create(data);
  });
};
