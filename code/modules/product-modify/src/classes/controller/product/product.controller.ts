import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { FileServiceInterface, ProductServiceInterface, ProductTypeServiceInterface } from '@library/domain';
import { ProductModifyRoute } from '@library/route-tokens';

import { Controller, Inject, NavigateServiceInterface, RevalidateServiceInterface } from '@sellgar/app';

import { ProductModifyResultEntity } from './domain/product-modify-result.entity.ts';
import { ProductFormMapper } from './mapper/product-form.mapper.ts';
import { ProductControllerInterface } from './product-controller.interface.ts';

@Controller()
export class ProductController implements ProductControllerInterface {
  constructor(
    @Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface,
    @Inject(ProductTypeServiceInterface) private readonly productTypeService: ProductTypeServiceInterface,
    @Inject(FileServiceInterface) private readonly fileService: FileServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async action(args: Parameters<ProductControllerInterface['action']>[0]) {
    const uuid = args.payload.uuid;
    const version = args.payload.version;

    if (uuid && version !== undefined) {
      const original = await this.productService.findByUuid(uuid);
      let result = await this.productService.update(uuid, ProductFormMapper.toUpdateInput(args.payload, version));

      for (const variant of args.payload.variants) {
        const input = ProductFormMapper.toVariantInput(variant);

        result = variant.uuid
          ? await this.productService.updateVariant(uuid, variant.uuid, {
              ...input,
              version: result.version,
              typeVersion: result.typeVersion,
            })
          : await this.productService.createVariant(uuid, {
              version: result.version,
              typeVersion: result.typeVersion,
              variant: input,
            });
      }

      const submittedVariantUuids = new Set(args.payload.variants.flatMap((variant) => variant.uuid ?? []));

      for (const variant of original.variants) {
        if (variant.status === 'active' && !submittedVariantUuids.has(variant.uuid)) {
          result = await this.productService.archiveVariant(uuid, variant.uuid, result.version);
        }
      }

      const persisted = await this.productService.findByUuid(uuid);
      await this.revalidateService.revalidate(ProductControllerInterface);

      return persisted;
    }

    const result = await this.productService.create(ProductFormMapper.toCreateInput(args.payload));

    await this.navigateService.to(ProductModifyRoute, { params: { uuid: result.uuid } });

    return result;
  }

  async loader(args: Parameters<ProductControllerInterface['loader']>[0]): Promise<ProductModifyResultEntity> {
    const uuid = args.params.uuid;
    const [product, productTypes] = await Promise.all([
      uuid ? this.productService.findByUuid(uuid) : Promise.resolve(undefined),
      this.productTypeService.findAll(),
    ]);
    const imageUrls: Record<string, string> = {};

    for (const variant of product?.variants ?? []) {
      for (const image of variant.images ?? []) {
        if (image.imageUuid) {
          imageUrls[image.imageUuid] = this.fileService.getPublicImageUrl(image.imageUuid);
        }
      }
    }

    const result = plainToInstance(ProductModifyResultEntity, { product, productTypes, imageUrls });

    await validateOrReject(result);

    return result;
  }
}
