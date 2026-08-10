import { BrandServiceInterface } from '@library/domain';

import { Controller, Inject } from '@sellgar/app';

import { BrandControllerInterface } from './brand-controller.interface.ts';

@Controller()
export class BrandController implements BrandControllerInterface {
  constructor(@Inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface) {}

  loader() {
    return this.brandService.findAll();
  }
}
