import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { FileServiceInterface, ProductServiceInterface } from '@library/domain';

import { Controller, Inject, NavigateServiceInterface, RevalidateServiceInterface } from '@sellgar/app';

import { ProductModifyResultEntity } from './domain/product-modify-result.entity.ts';
import { ProductFormMapper } from './mapper/product-form.mapper.ts';
import { ProductControllerInterface } from './product-controller.interface.ts';

@Controller()
export class ProductController implements ProductControllerInterface {
  constructor(
    @Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface,
    @Inject(FileServiceInterface) private readonly fileService: FileServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async action(args: Parameters<ProductControllerInterface['action']>[0]) {
    const uuid = args.payload.uuid;
    const version = args.payload.version;

    if (uuid && version !== undefined) {
      const result = await this.productService.update(
        uuid,
        ProductFormMapper.toUpdateInput(args.payload, uuid, version),
      );

      await this.revalidateService.revalidate(ProductControllerInterface);

      return result;
    }

    const result = await this.productService.create(ProductFormMapper.toCreateInput(args.payload));

    await this.navigateService.to('/products/' + result.uuid);

    return result;
  }

  async loader(args: Parameters<ProductControllerInterface['loader']>[0]): Promise<ProductModifyResultEntity> {
    const uuid = args.params.uuid;
    const product = uuid ? await this.productService.findByUuid(uuid) : undefined;
    const imageUrls: Record<string, string> = {};

    for (const variant of product?.variants ?? []) {
      for (const image of variant.images ?? []) {
        if (image.imageUuid) {
          imageUrls[image.imageUuid] = this.fileService.getPublicImageUrl(image.imageUuid);
        }
      }
    }

    const result = plainToInstance(ProductModifyResultEntity, { product, imageUrls });

    await validateOrReject(result);

    return result;
  }
}
