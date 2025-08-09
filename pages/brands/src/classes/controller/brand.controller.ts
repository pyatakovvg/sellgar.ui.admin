import { BrandServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { BrandsControllerInterface } from './brand-controller.interface.ts';

@injectable()
export class BrandController implements BrandsControllerInterface {
  constructor(@inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface) {}

  async findAll() {
    return await this.brandService.findAll();
  }
}
