import { PropertyServiceInterface } from '@library/domain';

import { Controller, Inject } from '@sellgar/app-v2';

import { PropertyControllerInterface } from './property-controller.interface.ts';

@Controller()
export class PropertyController implements PropertyControllerInterface {
  constructor(@Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface) {}

  loader() {
    return this.propertyService.findAll();
  }
}
