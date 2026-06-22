import { PropertyGroupServiceInterface } from '@library/domain';

import { Controller, Inject } from '@tiyn/app';

import { PropertyStoreInterface } from '../store/property-store.interface.ts';
import { PropertyControllerInterface } from './property-controller.interface.ts';

@Controller()
export class PropertyController implements PropertyControllerInterface {
  constructor(
    @Inject(PropertyStoreInterface) private readonly propertyStore: PropertyStoreInterface,
    @Inject(PropertyGroupServiceInterface) private readonly propertyGroupService: PropertyGroupServiceInterface,
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
