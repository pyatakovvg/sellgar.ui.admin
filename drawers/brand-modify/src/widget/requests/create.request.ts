import { useController } from '@tiyn/app';
import { CreateBrandDto } from '@library/domain';

import { BrandModifyControllerInterface } from '../classes/controller/brand-modify-controller.interface.ts';

export const useCreateRequest = () => {
  const controller = useController(BrandModifyControllerInterface);

  return (async (brand: CreateBrandDto) => {
    await controller.create(brand);
  });
};
