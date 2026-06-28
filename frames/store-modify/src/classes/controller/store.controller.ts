import {
  StoreEntity,
  StoreServiceInterface,
  VariantServiceInterface,
  CurrencyServiceInterface,
  ShopServiceInterface,
} from '@library/domain';

import { Controller, Inject, type FrameControllerLoaderArgs } from '@tiyn/app';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ShopStoreInterface } from '../store/shop/shop-store.interface.ts';
import { ProcessStoreInterface } from '../store/process/process-store.interface.ts';
import { VariantsStoreInterface } from '../store/variants/variants-store.interface.ts';
import { CurrencyStoreInterface } from '../store/currency/currency-store.interface.ts';

import { StoreControllerInterface } from './store-controller.interface.ts';
import { type StoreModifyFrameParams } from '../../store-modify.frame.tsx';

import { CreateDto } from './dto/create.dto.ts';
import { UpdateDto } from './dto/update.dto.ts';

@Controller()
export class StoreController implements StoreControllerInterface {
  constructor(
    @Inject(ShopStoreInterface) readonly shopStore: ShopStoreInterface,
    @Inject(ProcessStoreInterface) readonly processStore: ProcessStoreInterface,
    @Inject(VariantsStoreInterface) readonly variantsStore: VariantsStoreInterface,
    @Inject(CurrencyStoreInterface) readonly currencyStore: CurrencyStoreInterface,

    @Inject(ShopServiceInterface) private readonly shopService: ShopServiceInterface,
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(CurrencyServiceInterface) private readonly currencyService: CurrencyServiceInterface,
    @Inject(VariantServiceInterface) private readonly productVariantService: VariantServiceInterface,
  ) {}

  async create(dto: CreateDto, cb: (result: StoreEntity) => Promise<void>) {
    this.processStore.setProcess(true);

    try {
      const data = plainToInstance(CreateDto, dto);

      await validateOrReject(data);

      const result = await this.storeService.create(this.toStoreProductDto(data));

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

      const result = await this.storeService.update({
        uuid: data.uuid,
        expectedVersion: data.expectedVersion,
        ...this.toStoreProductDto(data, data.offerUuid),
      });

      await cb(result);
    } catch (error) {
      console.log(123, error);
    } finally {
      this.processStore.setProcess(false);
    }
  }

  async loader(args: FrameControllerLoaderArgs<StoreModifyFrameParams>) {
    const shops = await this.shopService.findAll();
    const currencies = await this.currencyService.findAll();
    const variants = await this.productVariantService.findAll();

    this.shopStore.setShops(shops.data);
    this.variantsStore.setVariants(variants.data);
    this.currencyStore.setCurrency(currencies.data);

    if (args.props.uuid) {
      return await this.storeService.findByUuid(args.props.uuid);
    }
  }

  private toStoreProductDto(dto: CreateDto, offerUuid?: string) {
    const variant = this.variantsStore.variants.find((item) => item.uuid === dto.variantUuid);
    const productUuid = variant?.product?.uuid;

    if (!productUuid) {
      throw new Error('Не удалось определить товар по выбранному варианту');
    }

    return {
      commandId: crypto.randomUUID(),
      shopUuid: dto.shopUuid,
      productUuid,
      article: dto.article,
      showing: dto.showing,
      offers: [
        {
          uuid: offerUuid,
          variantUuid: dto.variantUuid,
          article: dto.article,
          currentPrice: dto.currentPrice,
          quantity: dto.count,
          showing: dto.showing,
        },
      ],
    };
  }
}
