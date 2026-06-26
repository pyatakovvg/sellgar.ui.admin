import {
  BrandServiceInterface,
  CategoryServiceInterface,
  FileServiceInterface,
  logger,
  ProductEntity,
  ProductServiceInterface,
  PropertyServiceInterface,
} from '@library/domain';

import { Controller, type ControllerLoaderArgs, Inject } from '@tiyn/app';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';
import { ProductControllerInterface } from './product-controller.interface.ts';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

type VariantImageFormData = NonNullable<CreateProductDto['variants'][number]['images']>[number];

@Controller()
export class ProductController implements ProductControllerInterface {
  constructor(
    @Inject(FormStoreInterface) public formStore: FormStoreInterface,
    @Inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
    @Inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
    @Inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface,
    @Inject(FileServiceInterface) private readonly fileService: FileServiceInterface,
  ) {}

  @logger()
  async findByUuid(uuid?: string) {
    const brands = await this.brandService.findAll();
    const categories = await this.categoryService.findAll();
    const properties = await this.propertyService.findAll();

    this.formStore.setBrands(brands.data);
    this.formStore.setCategories(categories.data);
    this.formStore.setProperties(properties.data);

    if (uuid) {
      return this.toFormProduct(await this.productService.findByUuid(uuid));
    }
  }

  async create(dto: CreateProductDto) {
    return await this.productService.create({
      name: dto.name,
      description: dto.description,
      brandUuid: dto.brandUuid,
      categoryUuid: dto.categoryUuid,
      variants: dto.variants,
    });
  }

  async update(uuid: string, dto: UpdateProductDto) {
    return await this.productService.update(uuid, {
      uuid,
      name: dto.name,
      description: dto.description,
      brandUuid: dto.brandUuid,
      categoryUuid: dto.categoryUuid,
      variants: dto.variants,
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

  private toFormProduct(product: ProductEntity): ProductEntity {
    return {
      ...product,
      variants:
        product.variants?.map((variant) => ({
          ...variant,
          images: variant.images?.map((image) => ({
            ...image,
            fileName: image.image?.fileName,
          })),
        })) ?? [],
    };
  }

  async loader(args: ControllerLoaderArgs) {
    return await this.findByUuid(args.params?.uuid);
  }
}
