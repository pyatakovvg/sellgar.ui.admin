import { Controller } from '@sellgar/app-v2';

import { delay } from '../../../../../../shared/runtime/delay';
import { BrandCreateControllerInterface, type BrandCreateLoaderData } from './brand-create-controller.interface.ts';

@Controller()
export class BrandCreateController extends BrandCreateControllerInterface {
  async loader({ signal }: Parameters<BrandCreateControllerInterface['loader']>[0]): Promise<BrandCreateLoaderData> {
    const startedAt = Date.now();
    await delay(900, signal);

    return Object.freeze({ duration: Date.now() - startedAt });
  }
}
