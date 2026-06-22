import { useController } from '@tiyn/app';

import { ProductControllerInterface } from '../classes/controller/product-controller.interface.ts';
import { UpdateProductDto } from '../classes/controller/dto/update-product.dto.ts';

export const useUpdate = () => {
  const controller = useController(ProductControllerInterface);

  return ((uuid: string, dto: UpdateProductDto) => controller.update(uuid, dto));
};
