import { makeObservable, observable, action } from 'mobx';

import { BrandService } from '../service/brand.service.ts';
import { ProductService } from '../service/product.service.ts';
import { CategoryService } from '../service/category.service.ts';

export class ProductController {
  @observable brands: any[] = [];
  @observable categories: any[] = [];
  @observable product: any = {};

  @observable isError: boolean = false;
  @observable isLoading: boolean = true;

  private readonly brandService: BrandService = new BrandService();
  private readonly productService: ProductService = new ProductService();
  private readonly categoryService: CategoryService = new CategoryService();

  constructor() {
    makeObservable(this);
  }

  @action
  async getData(uuid?: string) {
    try {
      this.isError = false;
      this.isLoading = true;

      this.brands = await this.brandService.getAll();
      this.categories = await this.categoryService.getAll();

      if (!!uuid) {
        this.product = await this.productService.getByUuid(uuid);
      }
    } catch (e) {
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  @action
  async save(body: any) {
    if (body.uuid) {
      await this.productService.updateProductByUuid(body.uuid, body);
    } else {
      await this.productService.createProduct(body);
    }
  }
}
