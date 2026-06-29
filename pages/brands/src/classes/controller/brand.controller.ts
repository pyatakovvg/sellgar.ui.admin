import { BrandServiceInterface } from '@library/domain';

import { Controller, Inject } from '@tiyn/app';

import { BrandsControllerInterface } from './brand-controller.interface.ts';

@Controller()
export class BrandController implements BrandsControllerInterface {
  constructor(@Inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface) {}

  async loader() {
    return await this.brandService.findAll();
  }
}
