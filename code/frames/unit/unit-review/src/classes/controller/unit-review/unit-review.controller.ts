import { UnitServiceInterface } from '@library/domain';
import { UnitModifyRoute } from '@library/route-tokens';
import { Controller, Inject, NavigateServiceInterface } from '@sellgar/app';
import { UnitReviewControllerInterface } from './unit-review-controller.interface.ts';

@Controller()
export class UnitReviewController implements UnitReviewControllerInterface {
  constructor(
    @Inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  async loader(args: Parameters<UnitReviewControllerInterface['loader']>[0]) {
    if (!args.params.code) {
      throw new Error('Не указан код размерности');
    }

    return this.unitService.findByCode(args.params.code);
  }

  async toModify(code: string): Promise<void> {
    await this.navigateService.to(UnitModifyRoute, { params: { code } });
  }
}
