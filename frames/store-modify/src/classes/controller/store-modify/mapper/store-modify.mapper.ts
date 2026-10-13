import type { CreateStoreProductInput } from '@library/domain';

import type { StoreModifyActionPayload } from '../store-modify-controller.interface.ts';

export class StoreModifyMapper {
  static toCreateInput(payload: StoreModifyActionPayload, commandId: string): CreateStoreProductInput {
    return {
      commandId,
      shopUuid: payload.shopUuid,
      productUuid: payload.productUuid,
      showing: payload.showing,
      offers: payload.offers.map((offer) => ({
        uuid: offer.uuid,
        variantUuid: offer.variantUuid,
        currentPrice: offer.currentPrice,
        showing: offer.showing,
      })),
    };
  }
}
