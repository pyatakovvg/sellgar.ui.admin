import { useRequest, useController } from '@library/app';
import { StoreEntity } from '@library/domain';

import { CreateDto } from '../classes/controller/dto/create.dto.ts';

import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const useCreateRequest = () => {
  const presenter = useController(StoreControllerInterface);

  return useRequest(async (dto: CreateDto, cb: (result: StoreEntity) => Promise<void>) => {
    return await presenter.create(dto, cb);
  });
};
