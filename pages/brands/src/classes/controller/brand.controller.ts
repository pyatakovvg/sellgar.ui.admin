import { BrandServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { BrandsControllerInterface } from './brand-controller.interface.ts';

@injectable()
export class BrandController implements BrandsControllerInterface {
  constructor(@inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface) {
    console.log('BrandController: constructor');
  }

  destructor() {
    console.log('BrandController: destructor');
  }

  async loader() {
    console.log('BrandController: loader');

    return await this.brandService.findAll();
  }
}
