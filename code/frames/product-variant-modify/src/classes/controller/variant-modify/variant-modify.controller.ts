import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import {
  ProductEntity,
  ProductFieldEntity,
  ProductServiceInterface,
  ProductTypeServiceInterface,
  FileServiceInterface,
} from '@library/domain';
import {
  Controller,
  Inject,
  NavigateServiceInterface,
  NavigationBlockerServiceInterface,
  updateEntity,
} from '@sellgar/app';

import { VariantFormMapper } from './mapper/variant-form.mapper.ts';
import { VariantModifyResultEntity } from './domain/variant-modify-result.entity.ts';
import { VariantModifyControllerInterface } from './variant-modify-controller.interface.ts';

@Controller()
export class VariantModifyController implements VariantModifyControllerInterface {
  constructor(
    @Inject(ProductServiceInterface) private readonly products: ProductServiceInterface,
    @Inject(ProductTypeServiceInterface) private readonly types: ProductTypeServiceInterface,
    @Inject(FileServiceInterface) private readonly files: FileServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigate: NavigateServiceInterface,
    @Inject(NavigationBlockerServiceInterface) private readonly blocker: NavigationBlockerServiceInterface,
  ) {}

  async loader(args: Parameters<VariantModifyControllerInterface['loader']>[0]) {
    const { productUuid, variantUuid } = args.params;
    const data = variantUuid
      ? await this.products.findVariant(productUuid, variantUuid)
      : await this.products.findVariants(productUuid);
    const variant = 'uuid' in data ? data : undefined;
    let fields = variant?.properties;
    let typeVersion = data.typeVersion;
    if (!fields) {
      const type = await this.types.findByUuid(data.typeUuid);
      fields = type.variantFields.map((field) => plainToInstance(ProductFieldEntity, { ...field, values: [] }));
      typeVersion = type.version;
    }
    const imageUrls = Object.fromEntries(
      (variant?.images ?? []).map((image) => [image.imageUuid, this.files.getPublicImageUrl(image.imageUuid)]),
    );
    const result = plainToInstance(VariantModifyResultEntity, {
      productUuid,
      version: data.version,
      typeVersion,
      variant,
      fields,
      imageUrls,
    });
    await validateOrReject(result);
    return result;
  }

  async action(args: Parameters<VariantModifyControllerInterface['action']>[0]): Promise<void> {
    const input = args.payload;
    const variant = VariantFormMapper.toVariantInput(input);
    const result = args.params.variantUuid
      ? await this.products.updateVariant(args.params.productUuid, args.params.variantUuid, {
          ...variant,
          version: input.version,
          typeVersion: input.typeVersion,
        })
      : await this.products.createVariant(args.params.productUuid, {
          version: input.version,
          typeVersion: input.typeVersion,
          variant,
        });
    updateEntity(ProductEntity, result);
    await this.blocker.allow(() => this.navigate.close());
  }
}
