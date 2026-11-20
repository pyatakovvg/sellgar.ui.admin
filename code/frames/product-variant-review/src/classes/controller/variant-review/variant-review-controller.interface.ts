import type { ProductVariantDetailEntity } from '@library/domain';
import type { ProductVariantReviewRoute } from '@library/route-tokens';
import type { ControllerArgs, RouteParams, WithParams, WithPayload } from '@sellgar/app';

export abstract class VariantReviewControllerInterface {
  abstract loader(
    args: ControllerArgs<WithParams<RouteParams<typeof ProductVariantReviewRoute>>>,
  ): Promise<ProductVariantDetailEntity>;
  abstract edit(productUuid: string, variantUuid: string): Promise<void>;
  abstract action(args: ControllerArgs<WithPayload<ProductVariantDetailEntity>>): Promise<void>;
}
