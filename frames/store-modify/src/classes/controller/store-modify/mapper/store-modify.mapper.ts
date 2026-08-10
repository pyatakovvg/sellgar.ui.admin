import type { CreateStoreProductInput } from '@library/domain';

import type { StoreModifyActionPayload } from '../store-modify-controller.interface.ts';

export class StoreModifyMapper {
  static toCreateInput(payload: StoreModifyActionPayload, commandId: string): CreateStoreProductInput {
    return {
      commandId,
      shopUuid: payload.shopUuid,
      productUuid: payload.productUuid,
      article: payload.offers[0]?.article ?? '',
      showing: payload.showing,
      offers: payload.offers.map((offer) => ({
        uuid: offer.uuid,
        variantUuid: offer.variantUuid,
        article: offer.article,
        currentPrice: offer.currentPrice,
        showing: offer.showing,
      })),
    };
  }
}
