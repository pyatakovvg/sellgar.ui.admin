import { useController } from '@tiyn/app';
import { UpdateBrandDto } from '@library/domain';

import { BrandModifyControllerInterface } from '../classes/controller/brand-modify-controller.interface.ts';

export const useUpdateRequest = () => {
  const controller = useController(BrandModifyControllerInterface);

  return (async (uuid: string, brand: UpdateBrandDto) => {
    return await controller.update(uuid, brand);
  });
};
