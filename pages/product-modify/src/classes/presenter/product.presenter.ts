import { PriceEntity } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';
import { PriceStoreInterface } from '../store/price/price-store.interface.ts';
import { ProductPresenterInterface } from './product-presenter.interface.ts';
import { ProductStoreInterface } from '../store/product/product-store.interface.ts';

import { CreateProductDto } from '../store/form/dto/create-product.dto.ts';
import { UpdateProductDto } from '../store/form/dto/update-product.dto.ts';

@injectable()
export class ProductPresenter implements ProductPresenterInterface {
  constructor(
    @inject(FormStoreInterface) private readonly formStore: FormStoreInterface,
    @inject(PriceStoreInterface) private readonly priceStore: PriceStoreInterface,
    @inject(ProductStoreInterface) private readonly productStore: ProductStoreInterface,
  ) {}

  async findByUuid(uuid: string): Promise<UpdateProductDto | null> {
    await this.priceStore.findAll(uuid);
    return await this.formStore.getByUuid(uuid);
  }

  async create(dto: CreateProductDto): Promise<UpdateProductDto | null> {
    const result = await this.formStore.create(dto);
    if (result) {
      await this.priceStore.findAll(result.uuid);
    }
    return result;
  }

  async update(uuid: string, dto: UpdateProductDto): Promise<UpdateProductDto | null> {
    const result = await this.formStore.update(uuid, dto);
    if (result) {
      await this.priceStore.findAll(result.uuid);
    }
    return result;
  }

  getPricesData(): PriceEntity[] {
    return this.priceStore.data;
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
