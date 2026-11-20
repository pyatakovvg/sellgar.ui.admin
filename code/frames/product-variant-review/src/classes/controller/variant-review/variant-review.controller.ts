import { ProductEntity, ProductServiceInterface } from '@library/domain';
import { ProductVariantModifyRoute } from '@library/route-tokens';
import { Controller, Inject, NavigateServiceInterface, updateEntity } from '@sellgar/app';
import { VariantReviewControllerInterface } from './variant-review-controller.interface.ts';

@Controller()
export class VariantReviewController implements VariantReviewControllerInterface {
  constructor(
    @Inject(ProductServiceInterface) private readonly products: ProductServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigate: NavigateServiceInterface,
  ) {}

  loader(args: Parameters<VariantReviewControllerInterface['loader']>[0]) {
    return this.products.findVariant(args.params.productUuid, args.params.variantUuid);
  }

  edit(productUuid: string, variantUuid: string) {
    return this.navigate.to(ProductVariantModifyRoute, { params: { productUuid, variantUuid }, revalidate: false });
  }

  async action(args: Parameters<VariantReviewControllerInterface['action']>[0]) {
    const { productUuid, version, uuid, status } = args.payload;
    const result =
      status === 'archived'
        ? await this.products.restoreVariant(productUuid, uuid, version)
        : await this.products.archiveVariant(productUuid, uuid, version);
    updateEntity(ProductEntity, result);
    await this.navigate.close();
  }
}
