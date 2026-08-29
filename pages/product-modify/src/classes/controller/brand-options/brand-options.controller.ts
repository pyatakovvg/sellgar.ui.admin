import { BrandServiceInterface } from '@library/domain';
import { Controller, Inject } from '@sellgar/app-v2';

import { BrandOptionsControllerInterface } from './brand-options-controller.interface.ts';

@Controller()
export class BrandOptionsController implements BrandOptionsControllerInterface {
  constructor(@Inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface) {}

  loader() {
    return this.brandService.findAll();
  }
}
