import { BrandServiceInterface } from '@library/domain';

import { Controller, Inject, RevalidateServiceInterface } from '@sellgar/app-v2';
import { NavigateServiceInterface } from '@sellgar/app-v2';

import { BrandModifyControllerInterface } from './brand-modify-controller.interface.ts';

@Controller()
export class BrandModifyController implements BrandModifyControllerInterface {
  constructor(
    @Inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<BrandModifyControllerInterface['loader']>[0]) {
    if (!args.params.uuid) {
      return void 0;
    }

    return this.brandService.findByUuid(args.params.uuid);
  }

  async action(args: Parameters<BrandModifyControllerInterface['action']>[0]) {
    if ('uuid' in args.payload) {
      await this.brandService.update(args.payload.uuid, args.payload);
    } else {
      await this.brandService.create(args.payload);
    }

    await this.revalidateService.revalidate();
    await this.navigateService.close();
  }

  async close() {
    await this.navigateService.close();
  }
}
