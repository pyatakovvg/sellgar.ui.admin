import { BrandEntity, BrandServiceInterface, HttpException } from '@library/domain';

import { inject, injectable } from 'inversify';

import { BrandStoreInterface } from '../store/brand/brand-store.interface.ts';
import { FormStoreInterface } from '../store/form/form-store.interface.ts';

import { BrandControllerInterface } from './brand-controller.interface.ts';

@injectable()
export class BrandController implements BrandControllerInterface {
  constructor(
    @inject(FormStoreInterface) private readonly formStore: FormStoreInterface,
    @inject(BrandStoreInterface) private readonly brandStore: BrandStoreInterface,
    @inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
  ) {}

  getData() {
    return this.brandStore.data;
  }

  getFormInProcess() {
    return this.formStore.inProcess;
  }

  async findByUuid(uuid?: string) {
    try {
      if (uuid) {
        const result = await this.brandService.findByUuid(uuid);

        this.brandStore.setData(result);

        return result;
      }
    } catch (error) {
      this.brandStore.setError(error as HttpException);
    } finally {
    }
  }

  async create(brand: BrandEntity) {
    this.formStore.setProcess(true);

    try {
      return await this.brandService.create(brand);
    } catch (error) {
      throw error;
    } finally {
      this.formStore.setProcess(false);
    }
  }

  async update(uuid: string, brand: BrandEntity) {
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
