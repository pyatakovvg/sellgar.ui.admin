import { BrandServiceInterface, CreateBrandDto, UpdateBrandDto } from '@library/domain';

import { inject, injectable } from 'inversify';

import { BrandModifyControllerInterface } from './brand-modify-controller.interface.ts';

@injectable()
export class BrandModifyController implements BrandModifyControllerInterface {
  constructor(@inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface) {}

  async findByUuid(uuid: string) {
    return await this.brandService.findByUuid(uuid);
  }

  async create(brand: CreateBrandDto) {
    return await this.brandService.create(brand);
  }

  async update(uuid: string, brand: UpdateBrandDto) {
    return await this.brandService.update(uuid, brand);
  }
}
