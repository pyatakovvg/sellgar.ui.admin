import { StoreProductEntity } from '@library/domain';
import { FrameControllerInterface, type FrameControllerLoaderArgs } from '@tiyn/app';
import { type StoreModifyFrameParams } from '../../store-modify.frame.tsx';

import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

import { ShopStoreInterface } from '../store/shop/shop-store.interface.ts';
import { ProcessStoreInterface } from '../store/process/process-store.interface.ts';
import { VariantsStoreInterface } from '../store/variants/variants-store.interface.ts';
import { CurrencyStoreInterface } from '../store/currency/currency-store.interface.ts';

export abstract class StoreControllerInterface extends FrameControllerInterface<StoreModifyFrameParams> {
  abstract readonly shopStore: ShopStoreInterface;
  abstract readonly processStore: ProcessStoreInterface;
  abstract readonly variantsStore: VariantsStoreInterface;
  abstract readonly currencyStore: CurrencyStoreInterface;

  abstract loader(args: FrameControllerLoaderArgs<StoreModifyFrameParams>): Promise<StoreProductEntity | undefined>;
  abstract create(dto: CreateDto, cb: (result: StoreProductEntity) => Promise<void>): Promise<void>;
  abstract update(dto: UpdateDto, cb: (result: StoreProductEntity) => Promise<void>): Promise<void>;
}
