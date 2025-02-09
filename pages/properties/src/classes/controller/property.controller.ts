import { inject, injectable } from 'inversify';

import { PropertyStore, PropertyStoreSymbol } from '../store/property.store.ts';

export const PropertyControllerSymbol = Symbol.for('PropertyController');

@injectable()
export class PropertyController {
  constructor(@inject(PropertyStoreSymbol) private readonly propertyStore: PropertyStore) {}

  getData() {
    return this.propertyStore.data;
  }

  getMeta() {
    return this.propertyStore.meta;
  }

  getInProcess() {
    return this.propertyStore.inProcess;
  }

  async findAll() {
    return await this.propertyStore.findAll();
  }
}
