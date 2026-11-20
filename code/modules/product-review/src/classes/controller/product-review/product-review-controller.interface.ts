import type { ProductEntity } from '@library/domain';
import type { ProductReviewRoute } from '@library/route-tokens';
import type { ControllerArgs, RouteParams, WithParams } from '@sellgar/app';

export abstract class ProductReviewControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<RouteParams<typeof ProductReviewRoute>>>): Promise<ProductEntity>;
  abstract edit(uuid: string): Promise<void>;
  abstract createVariant(productUuid: string): Promise<void>;
  abstract openVariant(productUuid: string, variantUuid: string): Promise<void>;
}
