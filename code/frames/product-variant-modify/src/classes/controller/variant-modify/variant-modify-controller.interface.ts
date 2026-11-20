import type { ControllerArgs, RouteParams, WithParams, WithPayload } from '@sellgar/app';
import type { ProductVariantCreateRoute, ProductVariantModifyRoute } from '@library/route-tokens';
import type { VariantFormInput } from './input/variant-form.input.ts';
import type { VariantModifyResultEntity } from './domain/variant-modify-result.entity.ts';

type Params = RouteParams<typeof ProductVariantCreateRoute> & Partial<RouteParams<typeof ProductVariantModifyRoute>>;

export abstract class VariantModifyControllerInterface {
  abstract loader(args: ControllerArgs<WithParams<Params>>): Promise<VariantModifyResultEntity>;
  abstract action(args: ControllerArgs<WithPayload<VariantFormInput, WithParams<Params>>>): Promise<void>;
}
