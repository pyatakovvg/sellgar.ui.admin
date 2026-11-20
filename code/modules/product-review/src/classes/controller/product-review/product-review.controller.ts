import { ProductServiceInterface } from '@library/domain';
import { ProductModifyRoute, ProductVariantCreateRoute, ProductVariantReviewRoute } from '@library/route-tokens';
import { Controller, Inject, NavigateServiceInterface } from '@sellgar/app';

import { ProductReviewControllerInterface } from './product-review-controller.interface.ts';

@Controller()
export class ProductReviewController implements ProductReviewControllerInterface {
  constructor(
    @Inject(ProductServiceInterface) private readonly products: ProductServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigate: NavigateServiceInterface,
  ) {}

  loader(args: Parameters<ProductReviewControllerInterface['loader']>[0]) {
    return this.products.findByUuid(args.params.uuid);
  }

  edit(uuid: string) {
    return this.navigate.to(ProductModifyRoute, { params: { uuid } });
  }

  createVariant(productUuid: string) {
    return this.navigate.to(ProductVariantCreateRoute, { params: { productUuid }, revalidate: false });
  }

  openVariant(productUuid: string, variantUuid: string) {
    return this.navigate.to(ProductVariantReviewRoute, { params: { productUuid, variantUuid }, revalidate: false });
  }
}
