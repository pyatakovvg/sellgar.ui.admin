import { PropertyServiceInterface } from '@library/domain';
import { Controller, Inject } from '@sellgar/app-v2';

import { PropertyOptionsControllerInterface } from './property-options-controller.interface.ts';

@Controller()
export class PropertyOptionsController implements PropertyOptionsControllerInterface {
  constructor(@Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface) {}

  loader() {
    return this.propertyService.findAll();
  }
}
