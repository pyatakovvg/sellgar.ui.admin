import { ProductModifyRoute } from '@library/route-tokens';
import type { ControllerArgs, RouteParams, WithParams } from '@sellgar/app-v2';

export interface ProductDetailLoaderData {
  readonly duration: number;
  readonly instance: number;
  readonly loads: number;
  readonly uuid: string;
}

export abstract class ProductDetailControllerInterface {
  abstract action(args: ControllerArgs): Promise<void>;

  abstract loader(
    args: ControllerArgs<WithParams<RouteParams<typeof ProductModifyRoute>>>,
  ): Promise<ProductDetailLoaderData>;
}
