import { UnitEntity, UnitServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';

import { UnitControllerInterface } from './unit-controller.interface.ts';

@injectable()
export class UnitController implements UnitControllerInterface {
  constructor(
    @inject(FormStoreInterface) readonly formStore: FormStoreInterface,
    @inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface,
  ) {}

  async update(uuid: string, entity: UnitEntity) {
    this.formStore.setProcess(true);

    try {
      return await this.unitService.update(uuid, entity);
    } catch (error) {
      this.formStore.setProcess(false);
      throw error;
    }
  }

  async create(entity: UnitEntity) {
    this.formStore.setProcess(true);

    try {
      return await this.unitService.create(entity);
    } catch (error) {
      this.formStore.setProcess(false);
      throw error;
    }
  }

  getByUuid(uuid: string) {
    return this.unitService.findByUuid(uuid);
  }
}
