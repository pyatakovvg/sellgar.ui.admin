import { LoaderArgs } from '@library/app';
import {
  StoreEntity,
  StoreServiceInterface,
  VariantServiceInterface,
  CurrencyServiceInterface,
  ShopServiceInterface,
} from '@library/domain';

import { inject, injectable } from 'inversify';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ShopStoreInterface } from '../store/shop/shop-store.interface.ts';
import { ProcessStoreInterface } from '../store/process/process-store.interface.ts';
import { VariantsStoreInterface } from '../store/variants/variants-store.interface.ts';
import { CurrencyStoreInterface } from '../store/currency/currency-store.interface.ts';

import { StoreControllerInterface } from './store-controller.interface.ts';

import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

@injectable()
export class StoreController implements StoreControllerInterface {
  constructor(
    @inject(ShopStoreInterface) readonly shopStore: ShopStoreInterface,
    @inject(ProcessStoreInterface) readonly processStore: ProcessStoreInterface,
    @inject(VariantsStoreInterface) readonly variantsStore: VariantsStoreInterface,
    @inject(CurrencyStoreInterface) readonly currencyStore: CurrencyStoreInterface,

    @inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface,
    @inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @inject(CurrencyServiceInterface) private readonly currencyService: CurrencyServiceInterface,
    @inject(VariantServiceInterface) private readonly productVariantService: VariantServiceInterface,
  ) {}

  async create(dto: CreateDto, cb: (result: StoreEntity) => Promise<void>) {
    this.processStore.setProcess(true);

    try {
      const data = plainToInstance(CreateDto, dto);

      await validateOrReject(data);

      const result = await this.storeService.create(data);

      await cb(result);
    } catch (error) {
      console.log(123, error);
      this.processStore.setProcess(false);
    }
  }

  async update(dto: UpdateDto, cb: (result: StoreEntity) => Promise<void>) {
    this.processStore.setProcess(true);

    try {
      const data = plainToInstance(UpdateDto, dto);

      await validateOrReject(data);

      const result = await this.storeService.update(data);

      await cb(result);
    } catch (error) {
      console.log(123, error);
    } finally {
      this.processStore.setProcess(false);
    }
  }

  async loader(args: LoaderArgs) {
    const shops = await this.shopService.findAll();
    const currencies = await this.currencyService.findAll();
    const variants = await this.productVariantService.findAll();

    this.shopStore.setShops(shops.data);
    this.variantsStore.setVariants(variants.data);
    this.currencyStore.setCurrency(currencies.data);

    if (args.params?.uuid) {
      return await this.storeService.findByUuid(args.params.uuid);
    }
  }
}
