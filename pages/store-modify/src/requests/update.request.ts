import { useController, useRequest } from '@library/app';
import { StoreEntity } from '@library/domain';

import { UpdateDto } from '../classes/controller/dto/update.dto.ts';

import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const useUpdateRequest = () => {
  const presenter = useController(StoreControllerInterface);

  return useRequest(async (dto: UpdateDto, cb: (result: StoreEntity) => Promise<void>) => {
    return await presenter.update(dto, cb);
  });
};
