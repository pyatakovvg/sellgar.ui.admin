import { useRequest, useController } from '@library/app';

import { CreateProductDto } from '../classes/controller/dto/create-product.dto.ts';
import { ProductControllerInterface } from '../classes/controller/product-controller.interface.ts';

export const useCreate = () => {
  const controller = useController(ProductControllerInterface);

  return useRequest((dto: CreateProductDto) => controller.create(dto));
};
