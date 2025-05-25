import { inject, injectable } from 'inversify';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';
import { ProductPresenterInterface } from './product-presenter.interface.ts';
import { ProductStoreInterface } from '../store/product/product-store.interface.ts';

import { CreateProductDto } from '../store/form/dto/create-product.dto.ts';
import { UpdateProductDto } from '../store/form/dto/update-product.dto.ts';

@injectable()
export class ProductPresenter implements ProductPresenterInterface {
  constructor(
    @inject(FormStoreInterface) private readonly formStore: FormStoreInterface,
    @inject(ProductStoreInterface) private readonly productStore: ProductStoreInterface,
  ) {}

  async findByUuid(uuid: string): Promise<UpdateProductDto | null> {
    return await this.formStore.getByUuid(uuid);
  }

  async create(dto: CreateProductDto): Promise<UpdateProductDto | null> {
    return await this.formStore.create(dto);
  }

  async update(uuid: string, dto: UpdateProductDto): Promise<UpdateProductDto | null> {
    return await this.formStore.update(uuid, dto);
  }

  getBrandsData() {
    return this.productStore.brands;
  }

  getCategoriesData() {
    return this.productStore.categories;
  }

  getPropertiesData() {
    return this.productStore.properties;
  }

  getFormInProcess() {
    return this.formStore.inProcess;
  }

  getProductInProcess(): boolean {
    return this.productStore.inProcess;
  }

  async findProperties() {
    await this.productStore.findProperties();
  }
}
