import { Controller } from '@sellgar/app-v2';

import { delay } from '../../../../../../shared/runtime/delay';
import { BrandControllerInterface, type BrandsLoaderData } from './brand-controller.interface.ts';

@Controller()
export class BrandController extends BrandControllerInterface {
  private static nextInstance = 0;

  private readonly instance = ++BrandController.nextInstance;
  private loads = 0;

  async loader({ signal }: Parameters<BrandControllerInterface['loader']>[0]): Promise<BrandsLoaderData> {
    const startedAt = Date.now();
    await delay(1200, signal);

    return Object.freeze({
      duration: Date.now() - startedAt,
      instance: this.instance,
      loads: ++this.loads,
    });
  }
}
