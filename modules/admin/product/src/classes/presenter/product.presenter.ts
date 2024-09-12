import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

import { BrandEntity, ProductEntity, CategoryEntity } from '@library/domain';

import { CreateProductCase, CreateProductCaseSymbol } from '../case/create-product.case.ts';
import { UpdateProductCase, UpdateProductCaseSymbol } from '../case/update-product.case.ts';
import { GetOptionalDataCase, GetOptionalDataCaseSymbol } from '../case/get-optional-data.case.ts';
import { GetProductByUuidCase, GetProductByUuidCaseSymbol } from '../case/get-product-by-uuid.case.ts';

export const ProductPresenterSymbol = Symbol.for('ProductPresenter');

@injectable()
export class ProductPresenter {
  @observable brands: BrandEntity[] = [];
  @observable categories: CategoryEntity[] = [];
  @observable product: Partial<ProductEntity> = {};

  @observable isError: boolean = false;
  @observable isLoading: boolean = true;

  constructor(
    @inject(CreateProductCaseSymbol) private readonly createProductCase: CreateProductCase,
    @inject(UpdateProductCaseSymbol) private readonly updateProductCase: UpdateProductCase,
    @inject(GetOptionalDataCaseSymbol) private readonly getOptionalDataCase: GetOptionalDataCase,
    @inject(GetProductByUuidCaseSymbol) private readonly getProductByUuidCase: GetProductByUuidCase,
  ) {
    makeObservable(this);
  }

  @action.bound
  private setLoading(state: boolean) {
    this.isLoading = state;
  }

  @action.bound
  private setProduct(product: ProductEntity) {
    this.product = product;
  }

  @action.bound
  async getData(uuid?: string) {
    try {
      this.isError = false;
      this.setLoading(true);

      const options = await this.getOptionalDataCase.execute();

      this.brands = options.brands.data;
      this.categories = options.category.data;

      if (!!uuid) {
        this.setProduct(await this.getProductByUuidCase.execute(uuid));
      }
    } catch (e) {
      console.log(e);
      this.isError = true;
    } finally {
      this.setLoading(false);
    }
  }

  @action.bound
  async save(body: any) {
    if (body.uuid) {
      await this.updateProductCase.execute(body.uuid, body);
    } else {
      await this.createProductCase.execute(body);
    }
  }
}
