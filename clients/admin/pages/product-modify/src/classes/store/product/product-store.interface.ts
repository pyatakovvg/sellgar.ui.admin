import { HttpException, BrandEntity, ProductEntity, CategoryEntity, PropertyEntity } from '@library/domain';

export abstract class ProductStoreInterface {
  abstract inProcess: boolean;
  abstract error: HttpException | null;

  abstract brands: BrandEntity[];
  abstract categories: CategoryEntity[];
  abstract properties: PropertyEntity[];

  abstract setInProcess(state: boolean): void;
  abstract setError(error: HttpException | null): void;

  abstract setBrand(data: BrandEntity[]): void;
  abstract setProperty(data: PropertyEntity[]): void;
  abstract setCategories(data: CategoryEntity[]): void;

  abstract findProperties(): Promise<void>;
}
