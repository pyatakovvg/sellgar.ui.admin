import type { BrandEntity, CategoryEntity, PropertyEntity } from '@library/domain';
import type { ControllerLoaderArgs } from '@tiyn/app';

export interface ProductFormOptionsData {
  brands: BrandEntity[];
  categories: CategoryEntity[];
  properties: PropertyEntity[];
}

export abstract class ProductFormOptionsControllerInterface {
  abstract loader(args: ControllerLoaderArgs): Promise<ProductFormOptionsData>;
}
