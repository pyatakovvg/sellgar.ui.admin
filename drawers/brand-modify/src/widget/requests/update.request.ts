import { useRequest, useWidgetController } from '@library/app';
import { UpdateBrandDto } from '@library/domain';

import { BrandModifyControllerInterface } from '../classes/controller/brand-modify-controller.interface.ts';

export const useUpdateRequest = () => {
  const controller = useWidgetController(BrandModifyControllerInterface);

  return useRequest(async (uuid: string, brand: UpdateBrandDto) => {
    return await controller.update(uuid, brand);
  });
};
