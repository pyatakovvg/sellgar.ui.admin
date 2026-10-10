import { ProductTypeServiceInterface } from '@library/domain';
import { TemplateCreateRoute, TemplateModifyRoute } from '@library/route-tokens';
import { Controller, Inject, NavigateServiceInterface } from '@sellgar/app';

import { TemplatesControllerInterface } from './templates-controller.interface.ts';

@Controller()
export class TemplatesController implements TemplatesControllerInterface {
  constructor(
    @Inject(ProductTypeServiceInterface) private readonly productTypeService: ProductTypeServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  loader() {
    return this.productTypeService.findAll();
  }

  create(): Promise<void> {
    return this.navigateService.to(TemplateCreateRoute);
  }

  open(uuid: string): Promise<void> {
    return this.navigateService.to(TemplateModifyRoute, { params: { uuid } });
  }
}
