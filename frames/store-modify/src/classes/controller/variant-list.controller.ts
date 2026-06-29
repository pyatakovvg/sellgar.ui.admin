import { VariantEntity, VariantServiceInterface } from '@library/domain';
import { Controller, Inject, type FrameControllerLoaderArgs } from '@tiyn/app';

import { VariantListControllerInterface } from './variant-list-controller.interface.ts';
import { StoreModifyFrameParams } from '../params';

@Controller()
export class VariantListController implements VariantListControllerInterface {
  constructor(@Inject(VariantServiceInterface) private readonly variantService: VariantServiceInterface) {}

  async loader(_args: FrameControllerLoaderArgs<StoreModifyFrameParams>): Promise<VariantEntity[]> {
    const result = await this.variantService.findAll();

    return result.data;
  }
}
