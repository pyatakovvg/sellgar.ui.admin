import { useController } from '@tiyn/app';
import { StoreProductEntity } from '@library/domain';

import { UpdateDto } from '../classes/controller/dto/update.dto.ts';

import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const useUpdateRequest = () => {
  const presenter = useController(StoreControllerInterface);

  return (async (dto: UpdateDto, cb: (result: StoreProductEntity) => Promise<void>) => {
    return await presenter.update(dto, cb);
  });
};
