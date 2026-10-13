import { PropertyServiceInterface } from '@library/domain';
import { PropertyModifyRoute } from '@library/route-tokens';
import { Controller, Inject, NavigateServiceInterface } from '@sellgar/app';
import { PropertyReviewControllerInterface } from './property-review-controller.interface.ts';

@Controller()
export class PropertyReviewController implements PropertyReviewControllerInterface {
  constructor(
    @Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  async loader(args: Parameters<PropertyReviewControllerInterface['loader']>[0]) {
    if (!args.params.code) {
      throw new Error('Не указан код свойства');
    }

    return this.propertyService.findByCode(args.params.code);
  }

  async toModify(code: string): Promise<void> {
    await this.navigateService.to(PropertyModifyRoute, { params: { code } });
  }
}
