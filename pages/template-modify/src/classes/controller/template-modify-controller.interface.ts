import type { ProductTypeEntity } from '@library/domain';
import { TemplateModifyRoute } from '@library/route-tokens';
import type { ControllerArgs, RouteParams, WithParams, WithPayload } from '@sellgar/app';

import type { TemplateModifyResultEntity } from './domain/template-modify-result.entity.ts';
import type { TemplateFormInput } from './input/template-form.input.ts';

export abstract class TemplateModifyControllerInterface {
  abstract loader(
    args: ControllerArgs<WithParams<Partial<RouteParams<typeof TemplateModifyRoute>>>>,
  ): Promise<TemplateModifyResultEntity>;
  abstract action(args: ControllerArgs<WithPayload<TemplateFormInput>>): Promise<ProductTypeEntity>;
}
