import { BrandServiceInterface } from '@library/domain';
import { BrandModifyRoute } from '@library/route-tokens';
import { Controller, Inject, NavigateServiceInterface } from '@sellgar/app';
import { BrandReviewControllerInterface } from './brand-review-controller.interface.ts';

@Controller()
export class BrandReviewController implements BrandReviewControllerInterface {
  constructor(
    @Inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  async loader(args: Parameters<BrandReviewControllerInterface['loader']>[0]) {
    if (!args.params.code) {
      throw new Error('Не указан код бренда');
    }

    return this.brandService.findByCode(args.params.code);
  }

  async toModify(code: string): Promise<void> {
    await this.navigateService.to(BrandModifyRoute, { params: { code } });
  }
}
