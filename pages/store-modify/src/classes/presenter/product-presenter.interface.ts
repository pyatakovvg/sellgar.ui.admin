import { PriceEntity, StoreEntity } from '@library/domain';

import { CreateProductStoreDto } from '../store/form/dto/create-product-store.dto.ts';
import { UpdateProductStoreDto } from '../store/form/dto/update-product-store.dto.ts';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';
import { PriceStoreInterface } from '../store/price/price-store.interface.ts';
import { VariantsStoreInterface } from '../store/variants/variants-store.interface.ts';

export abstract class ProductPresenterInterface {
  abstract readonly formStore: FormStoreInterface;
  abstract readonly priceStore: PriceStoreInterface;
  abstract readonly variantsStore: VariantsStoreInterface;

  abstract getPriceHistory(storeUuid: string): Promise<void>;
  abstract getProductVariants(): Promise<void>;

  abstract findByUuid(uuid: string): Promise<StoreEntity>;
  abstract create(dto: CreateProductStoreDto): Promise<StoreEntity>;
  abstract update(uuid: string, dto: UpdateProductStoreDto): Promise<StoreEntity>;
}
