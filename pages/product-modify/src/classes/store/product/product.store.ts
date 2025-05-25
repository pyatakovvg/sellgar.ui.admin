import {
  HttpException,
  BrandEntity,
  CategoryEntity,
  CurrencyEntity,
  PropertyEntity,
  BrandServiceInterface,
  CategoryServiceInterface,
  PropertyServiceInterface,
  CurrencyServiceInterface,
} from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { ProductStoreInterface } from './product-store.interface.ts';

@injectable()
export class ProductStore implements ProductStoreInterface {
  @observable inProcess: boolean = true;
  @observable error: HttpException | null = null;

  @observable brands: BrandEntity[] = [];
  @observable categories: CategoryEntity[] = [];
  @observable properties: PropertyEntity[] = [];
  @observable currencies: CurrencyEntity[] = [];

  constructor(
    @inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
    @inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
    @inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @inject(CurrencyServiceInterface) private readonly currencyService: CurrencyServiceInterface,
  ) {
    makeObservable(this);
  }

  @action.bound
  setInProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  setError(error: HttpException | null) {
    this.error = error;
  }

  @action.bound
  setBrand(data: BrandEntity[]) {
    this.brands = data;
  }

  @action.bound
  setProperty(data: PropertyEntity[]) {
    this.properties = data;
  }

  @action.bound
  setCategories(data: CategoryEntity[]) {
    this.categories = data;
  }

  @action.bound
  setCurrencies(data: CurrencyEntity[]) {
    this.currencies = data;
  }

  @action.bound
  async findProperties() {
    this.setInProcess(true);

    try {
      const [brandResult, categoryResult, propertyResult] = await Promise.all([
        this.brandService.findAll(),
        this.categoryService.findAll(),
        this.propertyService.findAll(),
      ]);

      this.setBrand(brandResult.data);
      this.setCategories(categoryResult.data);
      this.setProperty(propertyResult.data);
    } catch (error) {
      this.setError(error as HttpException);
    } finally {
      this.setInProcess(false);
    }
  }
}
