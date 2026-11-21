import type { CreateStoreProductInput } from '@library/domain';

import type { StoreModifyActionPayload } from '../store-modify-controller.interface.ts';

export class StoreModifyMapper {
  static toCreateInput(payload: StoreModifyActionPayload): CreateStoreProductInput {
    if (!payload.product) {
      throw new Error('Не выбран товар.');
    }

    return {
      shopUuid: payload.shopUuid,
      categoryUuids: payload.categoryUuids,
      productUuid: payload.product.uuid,
      showing: payload.showing,
      offers: payload.offers.map((offer) => ({
        uuid: offer.uuid,
        variantUuid: offer.variantUuid,
        showing: offer.showing,
        records: offer.records?.map((record, order) => ({
          order,
          uuid: record.uuid,
          currentPrice: record.currentPrice,
          article: record.article.trim() || undefined,
          clarifications: record.clarifications.map((clarification) => ({ value: clarification.value.trim() })),
        })),
      })),
    };
  }
}
