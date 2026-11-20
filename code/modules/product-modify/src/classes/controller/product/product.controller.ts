import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { ProductServiceInterface, ProductTypeServiceInterface } from '@library/domain';
import { ProductReviewRoute } from '@library/route-tokens';

import { Controller, Inject, NavigateServiceInterface, NavigationBlockerServiceInterface } from '@sellgar/app';

import { ProductModifyResultEntity } from './domain/product-modify-result.entity.ts';
import { ProductFormMapper } from './mapper/product-form.mapper.ts';
import { ProductControllerInterface } from './product-controller.interface.ts';

@Controller()
export class ProductController implements ProductControllerInterface {
  constructor(
    @Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface,
    @Inject(ProductTypeServiceInterface) private readonly productTypeService: ProductTypeServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(NavigationBlockerServiceInterface) private readonly blocker: NavigationBlockerServiceInterface,
  ) {}

  async action(args: Parameters<ProductControllerInterface['action']>[0]) {
    const uuid = args.payload.uuid;
    const version = args.payload.version;

    if (uuid && version !== undefined) {
      const result = await this.productService.update(uuid, ProductFormMapper.toUpdateInput(args.payload, version));
      await this.blocker.allow(() =>
        this.navigateService.to(ProductReviewRoute, { params: { uuid: result.uuid }, revalidate: false }),
      );
      return result;
    }

    const result = await this.productService.create(ProductFormMapper.toCreateInput(args.payload));

    await this.blocker.allow(() => this.navigateService.to(ProductReviewRoute, { params: { uuid: result.uuid } }));

    return result;
  }

  async loader(args: Parameters<ProductControllerInterface['loader']>[0]): Promise<ProductModifyResultEntity> {
    const uuid = args.params.uuid;
    const [product, productTypes] = await Promise.all([
      uuid ? this.productService.findByUuid(uuid) : Promise.resolve(undefined),
      this.productTypeService.findAll(),
    ]);
    const result = plainToInstance(ProductModifyResultEntity, { product, productTypes });

    await validateOrReject(result);

    return result;
  }
}
