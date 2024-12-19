import { BrandEntity, CategoryEntity, PriceEntity, ProductEntity, PropertyEntity } from '@library/domain';

import { CreateProductDto } from '../store/form/dto/create-product.dto.ts';
import { UpdateProductDto } from '../store/form/dto/update-product.dto.ts';

export abstract class ProductPresenterInterface {
  abstract findByUuid(uuid: string): Promise<UpdateProductDto | null>;
  abstract create(dto: CreateProductDto): Promise<UpdateProductDto | null>;
  abstract update(uuid: string, dto: UpdateProductDto): Promise<UpdateProductDto | null>;

  abstract getBrandsData(): BrandEntity[];
  abstract getPricesData(): PriceEntity[];
  abstract getCategoriesData(): CategoryEntity[];
  abstract getPropertiesData(): PropertyEntity[];

  abstract getFormInProcess(): boolean;
  abstract getProductInProcess(): boolean;

  abstract findProperties(): Promise<void>;
}
