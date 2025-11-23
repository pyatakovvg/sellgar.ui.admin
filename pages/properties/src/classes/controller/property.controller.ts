import { PropertyGroupServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { PropertyStoreInterface } from '../store/property-store.interface.ts';
import { PropertyControllerInterface } from './property-controller.interface.ts';

@injectable()
export class PropertyController implements PropertyControllerInterface {
  constructor(
    @inject(PropertyStoreInterface) private readonly propertyStore: PropertyStoreInterface,
    @inject(PropertyGroupServiceInterface) private readonly propertyGroupService: PropertyGroupServiceInterface,
  ) {}

  getData() {
    return this.propertyStore.data;
  }

  getMeta() {
    return this.propertyStore.meta;
  }

  async loader() {
    try {
      const result = await this.propertyGroupService.findAll();

      this.propertyStore.setData(result.data);
      this.propertyStore.setMeta(result.meta);

      return result.data;
    } catch (error) {
      console.log(111, error);
    } finally {
    }
  }
}
