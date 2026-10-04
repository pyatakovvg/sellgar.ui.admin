import { BrandServiceInterface } from '@library/domain';

import { Controller, Inject, RevalidateServiceInterface } from '@sellgar/app';
import { NavigateServiceInterface } from '@sellgar/app';

import { BrandModifyControllerInterface } from './brand-modify-controller.interface.ts';

@Controller()
export class BrandModifyController implements BrandModifyControllerInterface {
  constructor(
    @Inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<BrandModifyControllerInterface['loader']>[0]) {
    if (!args.params.code) {
      return void 0;
    }

    return this.brandService.findByCode(args.params.code);
  }

  async action(args: Parameters<BrandModifyControllerInterface['action']>[0]) {
    if (args.params.code) {
      if (args.payload.version === undefined) {
        throw new Error('Не передана версия бренда.');
      }

      await this.brandService.update(args.params.code, {
        version: args.payload.version,
        name: args.payload.name,
        description: args.payload.description,
        images: args.payload.images,
      });
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
