import { StoreEntity } from '@library/domain';

import { UpdateProductStoreDto } from '../store/form/dto/update-product-store.dto.ts';

export const convertEntityToUpdateDtoUtil = (entity: StoreEntity): UpdateProductStoreDto => {
  return {
    uuid: entity.uuid,
    variantUuid: entity.variantUuid,
    price: 0,
    currencyCode: 'RUB',
    count: entity.count,
    showing: entity.showing,
  };
};
