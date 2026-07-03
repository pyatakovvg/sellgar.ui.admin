import { FileServiceInterface, ProductEntity, ProductServiceInterface } from '@library/domain';

import { Controller, type ControllerLoaderArgs, Inject } from '@tiyn/app';

import { ProductControllerInterface } from './product-controller.interface.ts';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

type VariantImageFormData = NonNullable<CreateProductDto['variants'][number]['images']>[number];

@Controller()
export class ProductController implements ProductControllerInterface {
  constructor(
    @Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface,
    @Inject(FileServiceInterface) private readonly fileService: FileServiceInterface,
  ) {}

  async findByUuid(uuid?: string): Promise<ProductEntity | undefined> {
    if (uuid) {
      return await this.productService.findByUuid(uuid);
    }

    return undefined;
  }

  async create(dto: CreateProductDto) {
    return await this.productService.create({
      name: dto.name,
      description: dto.description,
      brandUuid: dto.brandUuid,
      categoryUuid: dto.categoryUuid,
      properties: dto.properties ?? [],
      variants: dto.variants ?? [],
    });
  }

  async update(uuid: string, dto: UpdateProductDto) {
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

  getFileImageUrl(fileUuid: string) {
    return this.fileService.getPublicImageUrl(fileUuid);
  }

  addGalleryImages(currentImages: VariantImageFormData[], files: File[]): VariantImageFormData[] {
    return currentImages.concat(
      files.map((file) => ({
        localId: globalThis.crypto.randomUUID(),
        file,
        fileName: file.name,
        alt: null,
      })),
    );
  }

  async loader(args: ControllerLoaderArgs) {
    return await this.findByUuid(args.params?.uuid);
  }
}
