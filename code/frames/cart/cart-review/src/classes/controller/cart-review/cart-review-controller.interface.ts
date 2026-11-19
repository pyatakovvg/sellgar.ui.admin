import type { ControllerArgs, RouteParams, WithParams } from '@sellgar/app';

import type { CartEntity } from '@library/domain';
import type { CartReviewRoute } from '@library/route-tokens';

export abstract class CartReviewControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<RouteParams<typeof CartReviewRoute>>>): Promise<CartEntity | null>;
}
