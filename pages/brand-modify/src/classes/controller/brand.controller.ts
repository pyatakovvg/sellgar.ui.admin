import { BrandServiceInterface, CreateBrandDto, UpdateBrandDto } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';

import { BrandControllerInterface } from './brand-controller.interface.ts';

@injectable()
export class BrandController implements BrandControllerInterface {
  constructor(
    @inject(FormStoreInterface) private readonly formStore: FormStoreInterface,
    @inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
  ) {}

  inProcess() {
    return this.formStore.inProcess;
  }

  async findByUuid(uuid: string) {
    return await this.brandService.findByUuid(uuid);
  }

  async create(brand: CreateBrandDto) {
    this.formStore.setProcess(true);

    try {
      return await this.brandService.create(brand);
    } catch (error) {
      throw error;
    } finally {
      this.formStore.setProcess(false);
    }
  }

  async update(uuid: string, brand: UpdateBrandDto) {
    this.formStore.setProcess(true);

    try {
      return await this.brandService.update(uuid, brand);
    } catch (error) {
      throw error;
    } finally {
      this.formStore.setProcess(false);
    }
  }
}
