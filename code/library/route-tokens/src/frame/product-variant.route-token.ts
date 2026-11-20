export class ProductVariantCreateRoute {
  declare readonly productUuid: string;
}

export class ProductVariantReviewRoute {
  declare readonly productUuid: string;
  declare readonly variantUuid: string;
}

export class ProductVariantModifyRoute {
  declare readonly productUuid: string;
  declare readonly variantUuid: string;
}
