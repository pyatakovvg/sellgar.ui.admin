import { HttpException, ProductVariantServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { FormStoreInterface } from './form-store.interface.ts';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

import { convertEntityToUpdateDtoUtil } from '../../utils/convert-entity-to-update-dto.util.ts';

@injectable()
export class FormStore implements FormStoreInterface {
  @observable inProcess: boolean = false;
  @observable error: HttpException | null = null;

  constructor(@inject(ProductVariantServiceInterface) private readonly productService: ProductVariantServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  setError(error: HttpException | null) {
    this.error = error;
  }

  @action.bound
  async create(dto: CreateProductDto): Promise<UpdateProductDto | null> {
    this.setProcess(true);

    try {
      const result = await this.productService.create(dto);
      if (result) {
        return convertEntityToUpdateDtoUtil(result);
      }
      return null;
    } catch (error) {
      if (error instanceof HttpException) {
        this.setError(error);
      }
    } finally {
      this.setProcess(false);
    }

    return null;
  }

  @action.bound
  async update(uuid: string, dto: UpdateProductDto): Promise<UpdateProductDto | null> {
    this.setProcess(true);

    try {
      const result = await this.productService.update(uuid, dto);
      if (result) {
        return convertEntityToUpdateDtoUtil(result);
      }
      return null;
    } catch (error) {
      if (error instanceof HttpException) {
        this.setError(error);
      }
    } finally {
      this.setProcess(false);
    }

    return null;
  }

  @action.bound
  async getByUuid(uuid: string): Promise<UpdateProductDto | null> {
    try {
      const result = await this.productService.findByUuid(uuid);
      if (result) {
        return convertEntityToUpdateDtoUtil(result);
      }
      return null;
    } catch (error) {
      if (error instanceof HttpException) {
        this.setError(error);
      }
    }

    return null;
  }
}
