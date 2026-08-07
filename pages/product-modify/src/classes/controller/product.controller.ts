import { ProductServiceInterface } from '@library/domain';

import {
  Controller,
  type ControllerActionArgs,
  type ControllerLoaderArgs,
  Inject,
  NavigateServiceInterface,
} from '@sellgar/app';

import { ProductActionPayload, ProductControllerInterface } from './product-controller.interface.ts';

@Controller()
export class ProductController implements ProductControllerInterface {
  constructor(
    @Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  async action(args: ControllerActionArgs<ProductActionPayload>) {
    if ('uuid' in args.payload) {
      return await this.productService.update(args.payload.uuid, args.payload);
    }

    const result = await this.productService.create(args.payload);

    await this.navigateService.to('/products/' + result.uuid);

    return result;
  }

  async loader(args: ControllerLoaderArgs) {
    const uuid = args.params?.uuid;

    return uuid ? await this.productService.findByUuid(uuid) : undefined;
  }
}
