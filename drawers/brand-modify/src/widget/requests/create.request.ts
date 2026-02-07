import { useRequest, useWidgetController } from '@library/app';
import { CreateBrandDto } from '@library/domain';

import { BrandModifyControllerInterface } from '../classes/controller/brand-modify-controller.interface.ts';

export const useCreateRequest = () => {
  const controller = useWidgetController(BrandModifyControllerInterface);

  return useRequest(async (brand: CreateBrandDto) => {
    await controller.create(brand);
  });
};
