import { BrandEntity, CategoryEntity, PropertyEntity } from '@library/domain';

export abstract class FormStoreInterface {
  abstract brands: BrandEntity[];
  abstract categories: CategoryEntity[];
  abstract properties: PropertyEntity[];

  abstract setBrands(brands: BrandEntity[]): void;
  abstract setCategories(categories: CategoryEntity[]): void;
  abstract setProperties(properties: PropertyEntity[]): void;
}
