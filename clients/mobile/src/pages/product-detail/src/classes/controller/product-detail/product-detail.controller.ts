import { Controller, Inject, RequestExecutorInterface, UnauthorizedException } from '@sellgar/app-v2';

import { delay } from '../../../../../../shared/runtime/delay';
import {
  ProductDetailControllerInterface,
  type ProductDetailLoaderData,
} from './product-detail-controller.interface.ts';

@Controller()
export class ProductDetailController extends ProductDetailControllerInterface {
  private static nextInstance = 0;

  private readonly instance = ++ProductDetailController.nextInstance;
  private loads = 0;

  constructor(
    @Inject(RequestExecutorInterface)
    private readonly requests: RequestExecutorInterface,
  ) {
    super();
  }

  action(): Promise<void> {
    return this.requests.run(() => Promise.reject(new UnauthorizedException({ title: 'Native 401 probe' })));
  }

  async loader({
    params,
    signal,
  }: Parameters<ProductDetailControllerInterface['loader']>[0]): Promise<ProductDetailLoaderData> {
    const startedAt = Date.now();
    await delay(1200, signal);

    return Object.freeze({
      duration: Date.now() - startedAt,
      instance: this.instance,
      loads: ++this.loads,
      uuid: params.uuid,
    });
  }
}
