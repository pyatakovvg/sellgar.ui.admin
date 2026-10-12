import { BrandEntity, BrandServiceInterface } from '@library/domain';
import { BrandReviewRoute } from '@library/route-tokens';

import {
  Controller,
  Inject,
  insertEntity,
  NavigateServiceInterface,
  NavigationBlockerServiceInterface,
  updateEntity,
} from '@sellgar/app';

import { BrandModifyControllerInterface } from './brand-modify-controller.interface.ts';
import type { BrandModifyInput } from './input/brand-modify.input.ts';
import { BrandModifyMapper } from './mapper/brand-modify.mapper.ts';

@Controller()
export class BrandModifyController implements BrandModifyControllerInterface {
  constructor(
    @Inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(NavigationBlockerServiceInterface) private readonly navigationBlocker: NavigationBlockerServiceInterface,
  ) {}

  async loader(args: Parameters<BrandModifyControllerInterface['loader']>[0]) {
    if (!args.params.code) {
      return void 0;
    }

    return this.brandService.findByCode(args.params.code);
  }

  action(args: Parameters<BrandModifyControllerInterface['action']>[0]): Promise<void> {
    if (args.params.code) {
      return this.update(args.params.code, args.payload);
    }
    return this.create(args.payload);
  }

  async close(code?: string) {
    if (code) {
      return this.navigateService.to(BrandReviewRoute, { params: { code }, revalidate: false });
    }
    await this.navigateService.close();
  }

  private async create(input: BrandModifyInput): Promise<void> {
    const brand = await this.brandService.create(BrandModifyMapper.create(input));
    insertEntity(BrandEntity, brand);

    await this.navigationBlocker.allow(() =>
      this.navigateService.to(BrandReviewRoute, { params: { code: brand.code }, revalidate: false }),
    );
  }

  private async update(code: string, input: BrandModifyInput): Promise<void> {
    const brand = await this.brandService.update(code, BrandModifyMapper.update(input));
    updateEntity(BrandEntity, brand);

    await this.navigationBlocker.allow(() =>
      this.navigateService.to(BrandReviewRoute, { params: { code: brand.code }, revalidate: false }),
    );
  }
}
