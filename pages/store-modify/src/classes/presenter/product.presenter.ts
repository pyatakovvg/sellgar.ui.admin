import { StoreEntity, PriceServiceInterface, StoreServiceInterface, VariantServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';
import { PriceStoreInterface } from '../store/price/price-store.interface.ts';
import { VariantsStoreInterface } from '../store/variants/variants-store.interface.ts';

import { ProductPresenterInterface } from './product-presenter.interface.ts';

import { CreateProductStoreDto } from '../store/form/dto/create-product-store.dto.ts';
import { UpdateProductStoreDto } from '../store/form/dto/update-product-store.dto.ts';

@injectable()
export class ProductPresenter implements ProductPresenterInterface {
  constructor(
    @inject(FormStoreInterface) readonly formStore: FormStoreInterface,
    @inject(PriceStoreInterface) readonly priceStore: PriceStoreInterface,
    @inject(VariantsStoreInterface) readonly variantsStore: VariantsStoreInterface,
    @inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @inject(PriceServiceInterface) private readonly priceService: PriceServiceInterface,
    @inject(VariantServiceInterface) private readonly productVariantService: VariantServiceInterface,
  ) {}

  async getPriceHistory(storeUuid: string) {
    const result = await this.priceService.findAll(storeUuid);

    this.priceStore.setPrices(result.data);
  }

  async getProductVariants() {
    const result = await this.productVariantService.findAll();

    this.variantsStore.setVariants(result.data);
  }

  async findByUuid(uuid: string): Promise<StoreEntity> {
    try {
      return await this.storeService.findByUuid(uuid);
    } catch (error) {
      throw error;
    }
  }

  async create(dto: CreateProductStoreDto): Promise<StoreEntity> {
    return await this.storeService.create(dto);
  }

  async update(uuid: string, dto: UpdateProductStoreDto): Promise<StoreEntity> {
    return await this.storeService.update(uuid, dto);
  }
}
