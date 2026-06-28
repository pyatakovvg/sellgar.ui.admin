import { useController } from '@tiyn/app';
import { StoreProductEntity } from '@library/domain';

import { CreateDto } from '../classes/controller/dto/create.dto.ts';

import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const useCreateRequest = () => {
  const presenter = useController(StoreControllerInterface);

  return (async (dto: CreateDto, cb: (result: StoreProductEntity) => Promise<void>) => {
    return await presenter.create(dto, cb);
  });
};
