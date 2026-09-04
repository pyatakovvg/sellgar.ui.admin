import type { ProductEntity } from '@library/domain';
import { ProductModifyRoute } from '@library/route-tokens';
import type { ControllerArgs, RouteParams, WithParams, WithPayload } from '@sellgar/app';

import type { ProductModifyResultEntity } from './domain/product-modify-result.entity.ts';
import type { ProductFormInput } from './input/product-form.input.ts';

export abstract class ProductControllerInterface {
  abstract loader(
    args: ControllerArgs<WithParams<Partial<RouteParams<typeof ProductModifyRoute>>>>,
  ): Promise<ProductModifyResultEntity>;
  abstract action(args: ControllerArgs<WithPayload<ProductFormInput>>): Promise<ProductEntity>;
}
