import {
  ProductServiceInterface,
  BrandServiceInterface,
  CategoryServiceInterface,
  PropertyServiceInterface,
} from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';
import { ProductControllerInterface } from './product-controller.interface.ts';

import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';

@injectable()
export class ProductController implements ProductControllerInterface {
  constructor(
    @inject(FormStoreInterface) public formStore: FormStoreInterface,
    @inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
    @inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
    @inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @inject(ProductServiceInterface) private readonly productService: ProductServiceInterface,
  ) {}

  async findByUuid(uuid?: string) {
    const brands = await this.brandService.findAll();
    const categories = await this.categoryService.findAll();
    const properties = await this.propertyService.findAll();

    this.formStore.setBrands(brands.data);
    this.formStore.setCategories(categories.data);
    this.formStore.setProperties(properties.data);

    if (uuid) {
      return await this.productService.findByUuid(uuid);
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
}
