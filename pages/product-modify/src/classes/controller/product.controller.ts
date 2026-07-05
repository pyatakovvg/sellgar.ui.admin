import { ProductEntity, ProductServiceInterface } from '@library/domain';

import { Controller, type ControllerActionArgs, type ControllerLoaderArgs, Inject, NavigateServiceInterface } from '@tiyn/app';

import { ProductActionPayload, ProductControllerInterface } from './product-controller.interface.ts';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

@Controller()
export class ProductController implements ProductControllerInterface {
  constructor(
    @Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
  ) {}

  private async findByUuid(uuid?: string): Promise<ProductEntity | undefined> {
    if (uuid) {
      return await this.productService.findByUuid(uuid);
    }

    return undefined;
  }

  private async create(dto: CreateProductDto) {
    return await this.productService.create({
      name: dto.name,
      description: dto.description,
      brandUuid: dto.brandUuid,
      categoryUuid: dto.categoryUuid,
      properties: dto.properties ?? [],
      variants: dto.variants ?? [],
    });
  }

  private async update(uuid: string, dto: UpdateProductDto) {
    return await this.productService.update(uuid, {
      uuid,
      version: dto.version,
      name: dto.name,
      description: dto.description,
      brandUuid: dto.brandUuid,
      categoryUuid: dto.categoryUuid,
      properties: dto.properties ?? [],
      variants: dto.variants ?? [],
    });
  }

  async action(args: ControllerActionArgs<ProductActionPayload>) {
    if ('uuid' in args.payload && args.payload.uuid) {
      return await this.update(args.payload.uuid, args.payload);
    }

    const result = await this.create(args.payload);

    await this.navigateService.to('/products/' + result.uuid);

    return result;
  }

  async loader(args: ControllerLoaderArgs) {
    return await this.findByUuid(args.params?.uuid);
  }
}
