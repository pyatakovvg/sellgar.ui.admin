import { Controller } from '@sellgar/app-v2';

import { delay } from '../../../../../../shared/runtime/delay';
import { BrandsControllerInterface, type BrandsLoaderData } from './brands-controller.interface.ts';

@Controller()
export class BrandsController extends BrandsControllerInterface {
  private static nextInstance = 0;

  private readonly instance = ++BrandsController.nextInstance;
  private loads = 0;

  async loader({ signal }: Parameters<BrandsControllerInterface['loader']>[0]): Promise<BrandsLoaderData> {
    const startedAt = Date.now();
    await delay(1200, signal);

    return Object.freeze({
      duration: Date.now() - startedAt,
      instance: this.instance,
      loads: ++this.loads,
    });
  }
}
