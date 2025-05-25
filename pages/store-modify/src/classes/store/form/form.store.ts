import { HttpException, StoreEntity, StoreServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { FormStoreInterface } from './form-store.interface.ts';

import { CreateProductStoreDto } from './dto/create-product-store.dto.ts';
import { UpdateProductStoreDto } from './dto/update-product-store.dto.ts';

import { convertEntityToUpdateDtoUtil } from '../../utils/convert-entity-to-update-dto.util.ts';

@injectable()
export class FormStore implements FormStoreInterface {
  @observable inProcess: boolean = false;
  @observable error: HttpException | null = null;

  constructor(@inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface) {
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
  async create(dto: CreateProductStoreDto): Promise<UpdateProductStoreDto | null> {
    this.setProcess(true);

    try {
      const result = await this.storeService.create(dto);
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
  async update(uuid: string, dto: UpdateProductStoreDto): Promise<UpdateProductStoreDto | null> {
    this.setProcess(true);

    try {
      const result = await this.storeService.update(uuid, dto);
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
  async getByUuid(uuid: string): Promise<StoreEntity | null> {
    try {
      return await this.storeService.findByUuid(uuid);
    } catch (error) {
      if (error instanceof HttpException) {
        this.setError(error);
      }
    }
    return null;
  }
}
